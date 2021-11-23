if(frame == undefined){
	
}
var frame = 0;
var absoluteTime = 0.0;

var currentActions = [];

function performTransform(transform, actionInstance){
	console.log(transform);
	if(transform[0] == "add"){
		let nodeAddress = followPath(actionInstance, transform[1]);
		let delta = followPath(actionInstance, transform[2]);
		followPath(
			actionInstance, nodeAddress, 
			followPath(actionInstance, nodeAddress) + delta
		);
	} else if(transform[0] == "set"){
		followPath(
			actionInstance,
			followPath(actionInstance, transform[1]),
			followPath(actionInstance, transform[2])
		);
		// followPath(actionInstance.agent, transform[1], transform[2]);
	} else if(transform[0] == "remove"){
		//This is a bit more awkward - we need to delete the property via its parent
		let toDeleteAddress = followPath(actionInstance, transform[1]);
		let parentOfToDeleteAddress = toDeleteAddress.substring(1).split('/');
		let toDelete = parentOfToDeleteAddress.pop();
		parentOfToDeleteAddress = "@" + parentOfToDeleteAddress.join('/');

		let parentOfToDelete = followPath(actionInstance, parentOfToDeleteAddress);
		delete parentOfToDelete[toDelete];
	}
}

function performAction(actionInstance, stage){
	if(actionInstance.action != undefined){
		let action = actionInstance.action;
		if(action.transforms != undefined){
			let transforms = action.transforms;
			if(transforms[stage] != undefined){
				//Do transforms for that stage
				transforms = transforms[stage];
				for(i = 0; i < transforms.length; i++){
					let transform = transforms[i];
					performTransform(transform, actionInstance);
				}
				guiUpdateTrigger = true;
			}
		}
	}
}

/**
 * Adds an action instance to currentActions.
 */
function invokeAction(actionInstance){
	if(!checkActionPrerequisitesMet(actionInstance)){ return; }
	actionInstance.timeElapsed = 0.0;
	currentActions.push(actionInstance);
	guiUpdateTrigger = true;
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
