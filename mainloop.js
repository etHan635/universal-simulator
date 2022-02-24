(root => {
	var simulationTimestep = 1000, /// 60,
		frameDelta = 0,
		lastFrameTimeMs = 0,
		fps = 60,
		fpsAlpha = 0.9,
		fpsUpdateInterval = 1000,
		lastFpsUpdate = 0,
		framesSinceLastFpsUpdate = 0,
		numUpdateSteps = 0,
		minFrameDelay = 0,
		running = false,
		started = false,
		panic = false,
		windowOrRoot = typeof window === 'object' ? window : root,
		requestAnimationFrame = windowOrRoot.requestAnimationFrame || (function() {
			var lastTimestamp = Date.now(),
				now,
				timeout;
			return function(callback) {
				now = Date.now();
				timeout = Math.max(0, simulationTimestep - (now - lastTimestamp));
				lastTimestamp = now + timeout;
				return setTimeout(function() {
					callback(now + timeout);
				}, timeout);
			};
		})(),
		cancelAnimationFrame = windowOrRoot.cancelAnimationFrame || clearTimeout,
		NOOP = function() {},
		begin = NOOP,
		update = NOOP,
		draw = NOOP,
		end = NOOP,
		rafHandle;
	
	root.MainLoop = {
		getSimulationTimestep: function() {
			return simulationTimestep;
		},
		setSimulationTimestep: function(timestep) {
			simulationTimestep = timestep;
			return this;
		},
		getFPS: function() {
			return fps;
		},
		getMaxAllowedFPS: function() {
			return 1000 / minFrameDelay;
		},
		setMaxAllowedFPS: function(fps) {
			if (typeof fps === 'undefined') {
				fps = Infinity;
			}
			if (fps === 0) {
				this.stop();
			}
			else {
				// Dividing by Infinity returns zero.
				minFrameDelay = 1000 / fps;
			}
			return this;
		},
		resetFrameDelta: function() {
			var oldFrameDelta = frameDelta;
			frameDelta = 0;
			return oldFrameDelta;
		},
		setBegin: function(fun) {
			begin = fun || begin;
			return this;
		},
		setUpdate: function(fun) {
			update = fun || update;
			return this;
		},
		setDraw: function(fun) {
			draw = fun || draw;
			return this;
		},
		setEnd: function(fun) {
			end = fun || end;
			return this;
		},
		start: function() {
			if (!started) {
				// Since the application doesn't start running immediately, track
				// whether this function was called and use that to keep it from
				// starting the main loop multiple times.
				started = true;

				// In the main loop, draw() is called after update(), so if we
				// entered the main loop immediately, we would never render the
				// initial state before any updates occur. Instead, we run one
				// frame where all we do is draw, and then start the main loop with
				// the next frame.
				rafHandle = requestAnimationFrame(function(timestamp) {
					// Render the initial state before any updates occur.
					draw(1);

					// The application isn't considered "running" until the
					// application starts drawing.
					running = true;

					// Reset variables that are used for tracking time so that we
					// don't simulate time passed while the application was paused.
					lastFrameTimeMs = timestamp;
					lastFpsUpdate = timestamp;
					framesSinceLastFpsUpdate = 0;

					// Start the main loop.
					rafHandle = requestAnimationFrame(animate);
				});
			}
			return this;
		},
		stop: function() {
			running = false;
			started = false;
			cancelAnimationFrame(rafHandle);
			return this;
		},
		isRunning: function() {
			return running;
		},
	};
	function animate(timestamp) {
		rafHandle = requestAnimationFrame(animate);
		if (timestamp < lastFrameTimeMs + minFrameDelay) {
			return;
		}
		frameDelta += timestamp - lastFrameTimeMs;
		lastFrameTimeMs = timestamp;

		begin(timestamp, frameDelta);

		if (timestamp > lastFpsUpdate + fpsUpdateInterval) {
			// Compute the new exponential moving average.
			fps =
				// Divide the number of frames since the last FPS update by the
				// amount of time that has passed to get the mean frames per second
				// over that period. This is necessary because slightly more than a
				// second has likely passed since the last update.
				fpsAlpha * framesSinceLastFpsUpdate * 1000 / (timestamp - lastFpsUpdate) +
				(1 - fpsAlpha) * fps;

			// Reset the frame counter and last-updated timestamp since their
			// latest values have now been incorporated into the FPS estimate.
			lastFpsUpdate = timestamp;
			framesSinceLastFpsUpdate = 0;
		}
		// Count the current frame in the next frames-per-second update. This
		// happens after the previous section because the previous section
		// calculates the frames that occur up until `timestamp`, and `timestamp`
		// refers to a time just before the current frame was delivered.
		framesSinceLastFpsUpdate++;

		numUpdateSteps = 0;
		while (frameDelta >= simulationTimestep) {
			update(simulationTimestep);
			frameDelta -= simulationTimestep;
			
			if (++numUpdateSteps >= 240) {
				panic = true;
				break;
			}
		}
		
		draw(frameDelta / simulationTimestep);

		// Run any updates that are not dependent on time in the simulation. See
		// `MainLoop.setEnd()` for additional details on how to use this.
		end(fps, panic);

		panic = false;
	}

	// AMD support
	if (typeof define === 'function' && define.amd) {
		define(root.MainLoop);
	}
	// CommonJS support
	else if (typeof module === 'object' && module !== null && typeof module.exports === 'object') {
		module.exports = root.MainLoop;
	}

})(this);
