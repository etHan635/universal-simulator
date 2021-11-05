//This code gets param values by grabbing the form elements and getting their values
//It prints out any errors to the reasonElementID
//It can handle subroutines, renaming some of the parameters to be variables that
//it can use (these variables must also be global), when these copy variables are updated
//the paired global variables are also updated
function validateAction(id,actionid,reasonElementID)
{
	let agent = getProperty(id);
	let action = getProperty(actionid);
	let valid = true;
	let notValidReason = "Not valid";
	let params = {"this":id,"thisAction":actionid};
	let actid = (id+"|"+actionid).replace(new RegExp('/', 'g'),"||");
	let paramsid = actid;

	let numSubroutines = 1;
	if("subRoutines" in action)
	{
		numSubroutines += action.subRoutines.length;
	}

	let paramReason = "";
	for(let sind = 0; sind < numSubroutines; sind++)
	{
		let subParams = params;
		let reverseSubParams = undefined;
		let subAction = action;
		let subActionId = actionid;
		if(sind>0)
		{
			let subRoutine = action.subRoutines[sind-1];
			subParams = JSON.parse(JSON.stringify(params));
			reverseSubParams = subRoutine.params;
			for(let spk in subRoutine.params)
			{
				subParams[spk] = params[subRoutine.params[spk]];
				//reverseSubParams[subRoutine.params[spk]] = spk;
			}
			subActionId = getPropertyIdFromContext(data,subRoutine.action,params,undefined);
			subAction = getProperty(subActionId);
		}

		for(let kp in subAction.parameters)
		{
			let subParam = subAction.parameters[kp];
			let param = subParam;
			let paramName = param.name;
			if(reverseSubParams!=undefined)
			{
				if(paramName in reverseSubParams)
				{							
					paramName = reverseSubParams[paramName];
				}
			}
			let optionid = (actid+"|"+paramName).replace(new RegExp('/', 'g'),"||");
			let paramElement = document.getElementById(optionid);
			if(paramElement==null)
			{
				params[paramName] = undefined;
				if(paramReason.length>0)
				{
					paramReason += " ";
				}
				paramReason += "No valid value for "+param.name;
			}
			else
			{
				paramsid += "|"+paramElement.value;
				params[paramName] = paramElement.value;
			}
		}
		params["id"] = paramsid.replace(new RegExp('/', 'g'),"||");
	}				
	if(paramReason.length>0)
	{
		let reasonElement = document.getElementById(reasonElementID);
		reasonElement.innerHTML = paramReason;
	}
	else
	{
		//Here reasonCantPerformAction focuses on the input and output changes
		//and checks that these can be performed
		let reason = reasonCantPerformAction(params,action);
		if(reason!=undefined)
		{
			let reasonElement = document.getElementById(reasonElementID);
			reasonElement.innerHTML = reason;
		}
		else
		{
			let reasonElement = document.getElementById(reasonElementID);
			reasonElement.innerHTML = "";
			return params;
		}
	}
	return undefined;
}

//When trying to do something 
function actClick(thisAgent,actionid,reasonElementID)
{
	//A click should always be possible so params should always be defined
	let params = validateAction(thisAgent,actionid,reasonElementID);
	if(params!=undefined)
	{
		nextClick[params.id] = params;
	}
}


//This should only be called when all the params are available
//It checks if the input and outputs can be performed (at the moment it just checks inputs)
function reasonCantPerformAction(params,action)
{
	let canComplete = true;
	let reasonCantComplete = "";
	//Check if currentActions might prevent the action from being performed
	let thisAgent = getProperty(params.this);
	if(
		("interuptsOtherActions" in action)&&
		(action.interuptsOtherActions==false)
	)
	{
		let numActions = Object.keys(thisAgent.currentActions).length;
		if(numActions!=0)
		{
			if(reasonCantComplete.length>0)
			{
				reasonCantComplete+= " ";
			}
			reasonCantComplete += "You are busy";
		}

	}  

	let numSubroutines = 1;
	if("subRoutines" in action)
	{
		numSubroutines += action.subRoutines.length;
	}

	for(let sind = 0; sind < numSubroutines; sind++)
	{
		let subParams = params;
		let reverseSubParams = undefined;
		let subAction = action;
		//let subActionId = actionid;
		if(sind>0)
		{
			let subRoutine = action.subRoutines[sind-1];
			subParams = JSON.parse(JSON.stringify(params));
			reverseSubParams = subRoutine.params;
			for(let spk in subRoutine.params)
			{
				subParams[spk] = params[subRoutine.params[spk]];
				//reverseSubParams[subRoutine.params[spk]] = spk;
			}
			let subActionId = getPropertyIdFromContext(data,subRoutine.action,params,undefined);
			subAction = getProperty(subActionId);
		}

		//We can't actually test this as 
		//the results of the calculation
		//and the updates to the state of the world
		//can be used
		//therefore it is not possible to test a function before it is applied
		//Get the inputs
		for(let ki in subAction.input)
		{
			let input = subAction.input[ki];

			if("customFunction" in input)
			{
				if("reasonCantPerform" in input)
				{
					let reason = input.reasonCantPerform(data,action,subAction,input,params);
					if(reason != undefined)
					{
						canComplete = false;
						if(reasonCantComplete.length>0)
						{
							reasonCantComplete += " ";
						}
						reasonCantComplete += reason;
					}
				}
			}
		}
		//There was stuff commented out here, removed in working copy
	}

	if(canComplete)
	{
		return undefined;
	}
	else
	{
		return reasonCantComplete;
	}
}

//When creating a new object recursively go through the children
//They may reference variables and relative variables
//This code will resolve them into real content
function resolveReferences(clone,actioninfo)
{
	if(
		(typeof clone == "object")||
		(Array.isArray(clone))
	)
	{
		for(let eid in clone)
		{
			let e = clone[eid];
			if(typeof e == "string")
			{
				clone[eid] = getPropertyIdFromContext(data,e,actioninfo);
			}
			else
			{
				resolveReferences(e,actioninfo);
			}
		}
	}
	return clone;
}

function performTemporaryActionStep(input,actioninfo,params,reverseSubParams)
{
	if("quantity" in input)
	{
		let quantity = evaluateExpression(input.quantity,actioninfo);
		if("addToParams" in input)
		{
			actioninfo[input.addToParams] = quantity;
			if(reverseSubParams!=undefined)
			{
				if(input.addToParams in reverseSubParams)
				{
					params[reverseSubParams[input.addToParams]] = quantity;
				}
				else
				{
					params[input.addToParams] = quantity;
				}
			}
		}
	}
}
//Perform an input or output step, with the current params for the action
//And the params of the root action (global variable)
function performActionStep(input,actioninfo,params,reverseSubParams)
{
	if("customFunction" in input)
	{
		input.customFunction(data,input,actioninfo,params,reverseSubParams);
		return;
	}
	if("temporary" in input)
	{
		performTemporaryActionStep(input,actioninfo,params,reverseSubParams);
		return;
	}

	if(!("id" in input))
	{
		return;
	}

	let inputid = getPropertyIdFromContext(data,input.id,actioninfo);
	let resource = getProperty(inputid);
	let parentAndChildId = getParentAndChildId(inputid);
	let parent = getProperty(parentAndChildId.parent);

	if("quantity" in input)
	{
		let quantity = evaluateExpression(input.quantity,actioninfo);
		parent[parentAndChildId.child] += quantity;
		if("addToParams" in input)
		{
			actioninfo[input.addToParams] = inputid;
			if(reverseSubParams!=undefined)
			{
				if(input.addToParams in reverseSubParams)
				{
					params[reverseSubParams[input.addToParams]] = inputid;
				}
				else
				{
					params[input.addToParams] = inputid;
				}
			}
		}
	}
	else
		if("setProperty" in input)
		{
			let setProperty = getPropertyIdFromContext(data,input.setProperty,actioninfo);
			parent[parentAndChildId.child] = setProperty;
			if("addToParams" in input)
			{
				actioninfo[input.addToParams] = setProperty;
				if(reverseSubParams!=undefined)
				{
					if(input.addToParams in reverseSubParams)
					{
						params[reverseSubParams[input.addToParams]] = setProperty;
					}
					else
					{
						params[input.addToParams] = setProperty;
					}
				}
			}
		}
	else
		if("addProperty" in input)
		{
			let addProperty = getPropertyIdFromContext(data,input.addProperty,actioninfo);
			resource.push(addProperty);
			if("addToParams" in input)
			{
				actioninfo[input.addToParams] = addProperty;
				if(reverseSubParams!=undefined)
				{
					if(input.addToParams in reverseSubParams)
					{
						params[reverseSubParams[input.addToParams]] = addProperty;
					}
					else
					{
						params[input.addToParams] = addProperty;
					}
				}
			}
		}
	else
		if("removeProperty" in input)
		{
			let removeProperty = getPropertyIdFromContext(data,input.removeProperty,actioninfo);
			if(Array.isArray(resource))
			{
				if("addToParams" in input)
				{
					actioninfo[input.addToParams] = removeProperty;
					if(reverseSubParams!=undefined)
					{
						if(input.addToParams in reverseSubParams)
						{
							params[reverseSubParams[input.addToParams]] = removeProperty;
						}
						else
						{
							params[input.addToParams] = removeProperty;
						}
					}
				}
				resource.splice(resource.indexOf(removeProperty), 1);
			}
			else
				if(typeof resource == "object")
				{
					let parentAndChildId = getParentAndChildId(removeProperty);
					if("addToParams" in input)
					{
						actioninfo[input.addToParams] = resource[parentAndChildId.child];
						if(reverseSubParams!=undefined)
						{
							if(input.addToParams in reverseSubParams)
							{
								params[reverseSubParams[input.addToParams]] = resource[parentAndChildId.child];
							}
							else
							{
								params[input.addToParams] = resource[parentAndChildId.child];
							}
						}
					}
					delete resource[parentAndChildId.child];
				}
		}
	else
		if("addObject" in input)
		{
			let objData = input.addObject;
			if(typeof objData == "string")
			{
				if(objData in actioninfo)
				{
					objData = actioninfo[objData];
				}
				else
				{
					let objDataId = getPropertyIdFromContext(data,objData,actioninfo,undefined);
					objData = getProperty(objDataId);
				}
			}
			let clone = JSON.parse(JSON.stringify(objData));
			clone = resolveReferences(clone,actioninfo);
			if(resource==undefined)
			{
				parent[parentAndChildId.child] = clone;
				if("addToParams" in input)
				{
					actioninfo[input.addToParams] = inputid;
					if(reverseSubParams!=undefined)
					{
						if(input.addToParams in reverseSubParams)
						{
							params[reverseSubParams[input.addToParams]] = inputid;
						}
						else
						{
							params[input.addToParams] = inputid;
						}
					}
				}
			}
			else//TODO: add in different option for Array (no name needed)
			{
				let cloneName = newID(clone);
				resource[cloneName] = clone;						
				if("addToParams" in input)
				{
					actioninfo[input.addToParams] = inputid+"/"+cloneName;
					if(reverseSubParams!=undefined)
					{
						if(input.addToParams in reverseSubParams)
						{
							params[reverseSubParams[input.addToParams]] = inputid+"/"+cloneName;
						}
						else
						{
							params[input.addToParams] = inputid+"/"+cloneName;
						}
					}
				}
			}
		}
	else
		if("ifTest" in input)
		{
			let test = input.ifTest.test;
			if(validateCanAct(resource,inputid,test,actioninfo))
			{
				let subinput = input.ifTest.ifTrue;
				performActionStep(subinput,actioninfo,params,reverseSubParams);
			}
			else
			{
				let subinput = input.ifTest.ifFalse;
				performActionStep(subinput,actioninfo,params,reverseSubParams);
			}
		}
}

//Called when the click is first pressed
//Performs the input steps and sets up the current actions
function startAction(actioninfo,index)
{
	let params = actioninfo;
	let thisAgent = getProperty(actioninfo.this);
	let action = getProperty(actioninfo.thisAction);

	let numSubroutines = 1;
	if("subRoutines" in action)
	{
		numSubroutines += action.subRoutines.length;
	}

	let duration = 0.0;
	let interuptsOtherActions = action.interuptsOtherActions;
	for(let sind = 0; sind < numSubroutines; sind++)
	{
		let subParams = params;
		let reverseSubParams = undefined;
		let subAction = action;
		let subActionId = params.thisAction;
		if(sind>0)
		{
			let subRoutine = action.subRoutines[sind-1];
			subParams = JSON.parse(JSON.stringify(params));
			reverseSubParams = subRoutine.params;
			for(let spk in subRoutine.params)
			{
				subParams[spk] = params[subRoutine.params[spk]];
				//reverseSubParams[subRoutine.params[spk]] = spk;
			}
			subActionId = getPropertyIdFromContext(data,subRoutine.action,params,undefined);
			subAction = getProperty(subActionId);
		}

		//interuptsOtherActions = interuptsOtherActions&&subAction.interuptsOtherActions;
		duration += subAction.duration;

		for(let ki in subAction.input)
		{
			let input = subAction.input[ki];

			performActionStep(input,subParams,params,reverseSubParams);
		}
	}

	let currentId = actioninfo.id+index+"_"+frame;

	let numExistingActions = Object.keys(thisAgent.currentActions).length;
	if(numExistingActions==0)
	{
		//Add the action to the agents
		actioninfo["timeRemaining"] = duration;
		actioninfo["totalTime"] = duration;
		actioninfo["paused"] = false;
		thisAgent.currentActions[currentId] = actioninfo;
	}
	else
		if(action.interuptsOtherActions)
		{
			for(let ka in thisAgent.currentActions)
			{
				let actioninfo = thisAgent.currentActions[ka];
				if(!actioninfo.paused)
				{
					actioninfo.paused = true;
				}
			}
			//Add the action to the agents
			actioninfo["timeRemaining"] = duration;
			actioninfo["totalTime"] = duration;
			actioninfo["paused"] = false;
			thisAgent.currentActions[currentId] = actioninfo;					
		}
	else
	{
		//Add the action to the agents
		actioninfo["timeRemaining"] = duration;
		actioninfo["totalTime"] = duration;
		actioninfo["paused"] = true;
		thisAgent.currentActions[currentId] = actioninfo;
	}
	currentActions[currentId] = actioninfo;
	currentViewNeedsUpdating = true;
}

//Called when the action time is complete
//Performs the output steps
function completeAction(actioninfo)
{
	let params = actioninfo;
	let thisAgent = getProperty(actioninfo.this);
	let action = getProperty(actioninfo.thisAction);

	let numSubroutines = 1;
	if("subRoutines" in action)
	{
		numSubroutines += action.subRoutines.length;
	}

	for(let sind = 0; sind < numSubroutines; sind++)
	{
		let subParams = params;
		let reverseSubParams = undefined;
		let subAction = action;
		if(sind>0)
		{
			let subRoutine = action.subRoutines[sind-1];
			subParams = JSON.parse(JSON.stringify(params));
			reverseSubParams = subRoutine.params;
			for(let spk in subRoutine.params)
			{
				subParams[spk] = params[subRoutine.params[spk]];
				//reverseSubParams[subRoutine.params[spk]] = spk;
			}
			let subActionId = getPropertyIdFromContext(data,subRoutine.action,params,undefined);
			subAction = getProperty(subActionId);
		}

		for(let ki in subAction.output)
		{
			let output = subAction.output[ki];

			performActionStep(output,subParams,params,reverseSubParams);
		}					
	}
}


/**
 * @param {Number} delta
 *   The amount of time since the last update, in seconds.
 */
function update(delta) {

	let timedelta = delta*0.001;
	absoluteTime += timedelta;
	frame += 1;

	var anyChanges = false;

	//Go through the AIs and potentially start actions for each AI
	for(let a in data.AIs)
	{
		let agentAI = data.AIs[a];
		let thisAgent = getProperty(agentAI.agent);
		//Find something to do
		let numActions = Object.keys(thisAgent.currentActions).length;
		if(numActions==0)
		{
			//Find something to do
		}
	}

	let index = 0;
	for(let k in nextClick)
	{
		anyChanges = true;

		let actioninfo = nextClick[k];
		startAction(actioninfo,index);
		index += 1;
	}

	if(currentViewNeedsUpdating)
	{
		updateView();
	}

	for(let ka in currentActions)
	{
		let a = currentActions[ka];
		if(!a.paused)
		{
			if(timedelta>a.timeRemaining)
			{
				completeAction(a);

				let inputid = getPropertyIdFromContext(data,"this",a);
				let actionsid = inputid+"/currentActions";
				let actions = getProperty(actionsid);

				actionCompleted = true;
				delete currentActions[ka];
				delete actions[ka];
				currentViewNeedsUpdating = true;
			}
			else
			{
				let prev = a.timeRemaining.toFixed(1);
				a.timeRemaining -= timedelta;
				let post = a.timeRemaining.toFixed(1);

				//Build the id of the div
				let thisAgent = getPropertyIdFromContext

				let inputid = getPropertyIdFromContext(data,"this",a);
				let divid = inputid+"/currentActions/"+ka+"/timeRemaining";
				let divelem = document.getElementById(divid);
				divelem.innerHTML = ""+a.timeRemaining.toFixed(1);

				if(frame%60==0)
				{
				}
			}

		}
	}

	if(currentViewNeedsUpdating)
	{
		updateView();
	}

	previous = next;
	next = absoluteTime;
	previousAction = nextAction;
	nextAction = {};
	Object.assign(previousAction, nextAction);
	nextClick = {};
}


