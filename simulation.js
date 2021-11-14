var frame = 0;
var absoluteTime = 0.0;
var previous = 0.0;
var next = 0.0;
var previousAction = {};
var nextAction = {};
var nextClick = {};
var currentActions = {};

function updateSimulation(){
	//Placeholder for MainLoop
	if(guiUpdateTrigger){
		updateView();
		guiUpdateTrigger = false;
	}	
}

function drawSimulation(){
	//Placeholder for MainLoop
}

function endSimulation(fps, panic) 
{
	// fpsCounter.textContent = Math.round(fps) + ' FPS';
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

// Start the main loop.
MainLoop.setUpdate(updateSimulation).setDraw(drawSimulation).setEnd(endSimulation).start();
if(urlObjectID!=undefined){
	navigateTo(urlObjectID,true);
}

generateParentRefsInChildren(data, "@");
