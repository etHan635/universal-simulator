function simulate(){
	let data = {foo:"This is foo", bar:"This is bar"};
	let guiUpdateTrigger = true;

	//			START MAIN LOOP

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
		root.frame = 0;
		root.absoluteTime = 0.0;
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

	(root => {
		var currentActions = [];
		root.Choreographer = {
			performAction: function(actionInstance, stage){
				// console.log(followPath(actionInstance, actionInstance.args.numberAddress))
				if(actionInstance.action != undefined){
					let action = actionInstance.action;
					if(action.transforms != undefined){
						let transforms = action.transforms;
						if(transforms[stage] != undefined){
							//Do transforms for that stage
							transforms = transforms[stage];
							for(i = 0; i < transforms.length; i++){
								let transform = transforms[i];
								eval(transform);
							}
							guiUpdateTrigger = true;
						}
					}
				}
			},
			/**
			 * Adds an action instance to currentActions.
			 */
			/* invokeAction: function(actionInstance){
	if(!checkActionPrerequisitesMet(actionInstance)){ return; }
	actionInstance.timeElapsed = 0.0;
	currentActions.push(actionInstance);
	guiUpdateTrigger = true;
}, */
			tick: function(delta){
				// console.log(root.absoluteTime);

				let delta_s = delta * 0.001;	//Convert delta to seconds
				root.absoluteTime += delta_s;
				root.frame += 1;

				let toRemove = [];

				for(i = 0; i < currentActions.length; i++){
					let action = currentActions[i];
					
					//Choose which set of transforms to perform depending on time elapsed
					if(action.timeElapsed <= 0.0){
						performAction(action, "pre");
					} else if(action.timeElapsed > action.action.duration){
						toRemove.push(i);
						performAction(action, "post");
					} else {
						performAction(action, "peri");
					}
					action.timeElapsed += delta_s;
				}

				for(i = 0; i < toRemove.length; i++){
					currentActions.splice(toRemove[i], 1);
				}

				if(guiUpdateTrigger){
					refreshGUI();
				}
			},
			endSimulation: function(fps, panic) 
			{
				if (panic) {
					// This pattern introduces non-deterministic behavior, but in this case
					// it's better than the alternative (the application would look like it
					// was running very quickly until the simulation caught up to real
					// time). See the documentation for `MainLoop.setEnd()` for additional
					// explanation.
					var discardedTime = Math.round(MainLoop.resetFrameDelta());
					console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
				}
			}
		}
	})(this);

	/*
	 * Follows the path, starting at 'node', returning whatever is found at the end.
	 * */
	function followPath(node, path, value = undefined){
		if(!couldBePath(path)){
			return undefined;
		}
		//(from here on, assume valid)
		//Remove @/ (as we know we have to start at data)
		let workingPath = path.substring(1);

		//If no path, we don't need to do any further operations
		if(workingPath.length == 0){
			return node;
		}

		workingPath = workingPath.split('/');

		//If first stage of path is empty, i.e. '/foo/bar',
		//start at root (data) 
		if(workingPath[0] == ""){
			node = data;
			workingPath = workingPath.slice(1, workingPath.length);
		}

		//try to traverse hierarchy
		for(let i = 0; i < workingPath.length; i++){
			if(!(typeof node == "object")){
				return undefined;
			}
			let step = workingPath[i];
			if(step == ".."){
				//Not ideal, as will only work for objects and arrays.
				//Can't get parent of primitives, but shouldn't need to for
				//our purposes.
				node = followPath(node, node._parent);
			} else if(step == "*"){
				if(i == workingPath.length - 1){
					//Get addresses of children
					let childAddresses = [];
					for(key in node){
						if(key[0] != "_"){
							childAddresses.push(path.slice(0, -1) + key);
						}
					}
					return childAddresses;
				} else {
					return undefined;
				}
			} else {
				if(value != undefined){
					//About to go to final point, 
					//check whether we need to set anything
					if(i == workingPath.length - 1){
						node[step] = value;
					}
				}

				if(step in node){
					node = node[step];

					//Try to resolve a suspected address
					//(ABSOLUTE ONLY TODO fix for relative also)
					if(couldBePath(node, true)){
						node = followPath(node, node);
					}

				} else {
					return undefined;
				}
			} 	
		}

		return node;
	}

	/*
	 * Generates a '_parent' field in all children of the provided node.
	 * */
	function generateParentRefsInChildren(node, nodeAddress){
		if(typeof node != "object"){
			return;
		}
		for(key in node){
			generateParentRef(node[key], nodeAddress, key);
		}
	}

	/*
	 * Generates a '_parent' field for the provided node,
	 * giving the address of its parent.
	 * 
	 * */
	function generateParentRef(node, parentAddress, nodeKey){
		if(typeof node != "object"){
			return;
		}

		node._parent = parentAddress;
		let nodeAddress = node._parent + "/" + nodeKey;
		for(key in node){
			generateParentRef(node[key], nodeAddress, key);
		}
	}

	/*
	 * Checks whether 'path' could be a path
	 * i.e. matches '@foo/bar/fiz'.
	 * 
	 * If 'abs' is true, only returns affirmative if 'path'
	 * could be an absolute path.
	 *
	 * This doesn't check whether data.foo.bar.fiz actually exists.
	 * */
	function couldBePath(path, abs = false){
		if(typeof path === "string"){
			//4 cases:	non-abs('@', '@foo'), 
			//		abs('@/', '@/foo')
			if(path.length > 0){
				if(path[0] == '@'){
					if(abs){
						//Explore further, make sure next char is '/'
						if(path.length > 1){
							if(path[1] == '/'){
								return true;
							}
						}
					} else {
						return true;
					}
				}
			}
		}
		return false;
	}

	/*
	 * Creates an absolute path by combining a relative path
	 * with that of the source.
	 * */
	function resolvePath(source, path){
		if(!couldBePath(path)){
			return undefined;
		}
		if(path[1] == '/'){//Absolute, so don't need to resolve.
			return path;
		}

		//Relative, need to resolve
		source = source.substring(1).split('/');
		path = path.substring(1).split('/');
		for(i = 0; i < path.length; i++){
			if(path[i] == ".."){
				source.pop();
			} else {
				source.push(path[i]);
			}
		}

		//Reform path
		absPath = "@";
		for(i = 0; i < source.length; i++){
			absPath += source[i];
			if(i < source.length - 1){
				absPath += "/";
			}
		}
		return absPath;
	}

	function refreshGUI() {
		postMessage({address:"@" , state: data});
		guiUpdateTrigger = false;
	}

	onmessage = function(e){
		console.log("Worker: Message recieved from main.")
		if(e.data.address == "@"){
			data = e.data.state;
		}

		refreshGUI();
	}

	// Start the main loop.
	MainLoop.setUpdate(Choreographer.tick).setDraw(function(){}).setEnd(Choreographer.endSimulation).start();

	generateParentRefsInChildren(data, "@");

}

//apparently duplicate frames fixed themselves? keep an eye out anyway.
//TODO: do proper messaging with different nodes returned
//TODO: add onmessage to recieve actions + set + get requests
