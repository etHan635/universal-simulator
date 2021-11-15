var frame = 0;
var absoluteTime = 0.0;

var currentActions = [];

/**
 * Initialises an action given a local address (i.e. the ref to the action in the agent calling it).
 * Supports both an action embedded within an object, and a separate action to which an actor merely has a reference.
 */
function initialiseAction(actionAddress){
	let action = followPath(data, actionAddress);
	
	console.log(action);
}

/*
 * Updates the simulation, updating absoluteTime according to the delta that has passed
 */
function updateSimulation(delta){
	let delta_s = delta * 0.001;	//Convert delta to seconds
	absoluteTime += delta_s;
	frame += 1;

	document.getElementById("frame").textContent = "frame: " + frame;
	document.getElementById("time").textContent = Math.round(absoluteTime) + "s";


	//Placeholder for MainLoop
	if(guiUpdateTrigger){
		if(data._visualisation.layout == "tree"){
			updateTreeGui();
		}
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
