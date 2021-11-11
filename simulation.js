var frame = 0;
var absoluteTime = 0.0;
var previous = 0.0;
var next = 0.0;
var previousAction = {};
var nextAction = {};
var nextClick = {};

var currentActions = {};

/*
 * Follows the path, starting at 'node', returning whatever is found at the end.
 * 
 *
 * */
function getProperty(node, path, validatePath = true){
	if(validatePath){
		if(!couldBePath(path)){
			return undefined;
		}
	}
	//(from here on, assume valid)
	//Remove @/ (as we know we have to start at data)
	path = path.substring(1);
	path = path.split('/');
	
	//If first stage of path is empty, i.e. '/foo/bar',
	//start at root (data) 
	if(path[0] == ""){
		node = data;
		path = path.slice(1, path.length);
	}

	//try to traverse hierarchy
	for(let i = 0; i < path.length; i++){
		if(!(typeof node == "object")){
			return undefined;
		}
		let child = path[i];
		if(child == ".."){
			//Not ideal, as will only work for objects and arrays.
			//Can't get parent of primitives, but shouldn't need to for
			//our purposes.
			node = getProperty(node, node._parent);
		} else if(child in node){
			node = node[child];
		} else {
			return undefined;
		}

		//Try to resolve a suspected address
		if(couldBePath(node)){
			node = getProperty(node, node);
		}
	}
	return node;
}

//Some logic that restricts whether actions can be performed
//or whether an option can be added to the list of actions that can be selected
function validateCanAct(property,id,canActRule,params)
{
	let value = null;
	if("customFunction" in canActRule)
	{
		return canActRule.customFunction(data,property,id,canActRule,params);
	}
	else
		if("id" in canActRule)
		{
			value = id;
		}
	else
		if("property" in canActRule)
		{
			value = property;
		}
	else
		if("relativeProperty" in canActRule)
		{
			let realid = getPropertyIdFromContext(property,canActRule.relativeProperty,params,id);
			value = getProperty(realid);
		}
	else
		if("relativePropertyId" in canActRule)
		{
			value = getPropertyIdFromContext(property,canActRule.relativePropertyId,params,id);
		}
	else
		if("relativeChildId" in canActRule)
		{
			value = getPropertyIdFromContext(property,canActRule.relativeChildId,params,id);
			value = getParentAndChildId(value).child;
		}
	else
		if("relativePropertyNumberOfProperties" in canActRule)
		{
			let realid = getPropertyIdFromContext(property,canActRule.relativePropertyNumberOfProperties,params,id);
			value = getProperty(realid);
			value = Object.keys(value).length
		}

	if("type" in canActRule)
	{
		return (typeof value == canActRule.type);
	}
	else
		if("startsWithLiteral" in canActRule)
		{
			if(typeof value == "string")
			{
				return value.startsWith(canActRule.startsWithLiteral);
			}
			return false;
		}
	else
		if(value==undefined)
		{
			if("exists" in canActRule)
			{
				return !canActRule.exists;
			}
			return false;
		}
	else
		if("isNot" in canActRule)
		{
			return !validateCanAct(value,id,canActRule.isNot,params);
		}
	else
		if("either" in canActRule)
		{
			let oneTrue = false;
			for(let i in canActRule.either)
			{
				let subCanAct = canActRule.either[i];
				oneTrue = oneTrue||validateCanAct(value,id,subCanAct,params);						
			}
			return oneTrue;
		}
	else
		if("isNotId" in canActRule)
		{
			let propid = canActRule.isNotId;
			let pid = getPropertyIdFromContext(data,propid,params,undefined);

			return value!=pid;
		}
	else
		if("isId" in canActRule)
		{
			let propid = canActRule.isId;
			let pid = getPropertyIdFromContext(data,propid,params,undefined);

			return value==pid;
		}
	else
		if("isGreaterThan" in canActRule)
		{
			return value>canActRule.isGreaterThan;
		}
	else
		if("isOneOfLiteral" in canActRule)
		{
			for(let i in canActRule.isOneOfLiteral)
			{
				let propid = canActRule.isOneOfLiteral[i];
				if(propid==value)
				{
					return true;
				}
			}
			return false;
		}
	else
		if("isOneOf" in canActRule)
		{
			for(let i in canActRule.isOneOf)
			{
				let propid = canActRule.isOneOf[i];
				//property or list of properties
				let pid = getPropertyIdFromContext(data,propid,params,undefined);
				let p = getProperty(pid);
				for(let pe in p)
				{
					if(p[pe]==value)
					{
						return true;
					}
				}
			}
			return false;
			//return canActRule.isOneOf.includes(value);
		}
	else
		if("relativeOneOf" in canActRule)
		{
			for(let i in canActRule.relativeOneOf)
			{
				let propid = canActRule.relativeOneOf[i];
				//property or list of properties
				let pid = getPropertyIdFromContext(data,propid,params,undefined);
				let p = getProperty(pid);
				for(let pe in p)
				{
					if(p[pe][canActRule.relativeOneOfProperty]==value)
					{
						return true;
					}
				}
			}					
			return false;
		}
	else
		if("exists" in canActRule)
		{
			return canActRule.exists;
		}
	else
		if("numberOfProperties" in canActRule)
		{
			let numberOfProperties = canActRule.numberOfProperties;
			if(typeof numberOfProperties=="number")
			{
				let num = Object.keys(value).length;
				return num == canActRule.numberOfProperties;
			}
		}
	else
		if("isDeepEqual" in canActRule)
		{				
			let skipProperties = canActRule.isDeepEqual.skipProperties;
			let pid = getPropertyIdFromContext(data,canActRule.isDeepEqual.id,params,undefined);
			let p = getProperty(pid);
			return deepEquals(value,p,skipProperties);					
		}
	return false;
}

//Outer loop going through all the conditions of a parameter or the action
//as a whole determining if it can be used
function meetsConditions(parent,parentid,obj,id,param,params)
{
	let valid = true;
	if(param == undefined)
	{
		let test = true;
	}
	for(let c in param.conditions)
	{
		let condition = param.conditions[c];

		valid = valid&&validateCanAct(obj,id,condition,params);
	}
	return valid;
}

//When selecting options from a list (all elements could be added as options)
function getListOption(parent,parentid,pid,options,param,params)
{
	let p = getProperty(pid);

	if(Array.isArray(p))
	{
		for(let pi in p)
		{
			let peid = p[pi];
			let preal = getProperty(peid);
			let shortname = peid;
			if("visualisation" in preal)
			{
				shortname = preal.visualisation.shortname;
			}
			if(meetsConditions(parent,parentid,preal,peid,param,params))
			{
				options.push({"id":peid,"shortname":shortname});
			}
		}
	}
	else
		if(typeof p == "object")
		{
			for(let pi in p)
			{
				let peid = pid+"/"+pi;
				let preal = p[pi];
				let shortname = peid;
				if(preal == undefined)
				{
					let test = true;
				}
				else
					if(typeof preal == "string")
					{
						peid = preal;
						shortname = peid;
						preal = getProperty(peid);
					}
				if(preal == undefined)
				{
				}
				else
					if(typeof preal == "number")
					{
					}						
				else
					if(typeof preal == "boolean")
					{
					}						
				else
				{
					if("visualisation" in preal)
					{
						shortname = preal.visualisation.shortname;
					}
					if(meetsConditions(parent,parentid,preal,peid,param,params))
					{
						options.push({"id":peid,"shortname":shortname});
					}
				}
			}
		}
	else
	{
		let test=true;
	}
}

//Instead of a list of options this is just picking one
function getOption(parent,parentid,pid,options,param,params)
{
	let p = getProperty(pid);
	if(typeof p == "string")
	{
		let preal = getProperty(p);
		let shortname = p;
		if(preal==undefined)
		{
		}
		else
		{
			if(typeof preal == "object")
			{
				if("visualisation" in preal)
				{
					shortname = preal.visualisation.shortname;
				}
				if(meetsConditions(parent,parentid,preal,p,param,params))
				{
					options.push({"id":p,"shortname":shortname});
				}
			}
		}
	}
	else
		if(typeof p == "object")
		{
			let shortname = pid;
			if("visualisation" in p)
			{
				shortname = p.visualisation.shortname;
			}
			if(meetsConditions(parent,parentid,p,pid,param,params))
			{
				options.push({"id":pid,"shortname":shortname});
			}
		}
	else
	{
		let test=true;
	}
}

//Follows the logic for providing a set of valid parameters based on the current
//selection
function getListOfOptions(parent,parentid,param,params,options,toSelect)
{
	if("either" in toSelect)
	{
		for(let e in toSelect.either)
		{
			getListOfOptions(parent,parentid,param,params,options,toSelect.either[e]);
		}
	}
	else
		if("is" in toSelect)
		{
			let is = toSelect.is;
			let pid = getPropertyIdFromContext(data,is,params,undefined);
			getOption(parent,parentid,pid,options,param,params);
		}
	else
		if("isRelative" in toSelect)
		{
			let isRelative = toSelect.isRelative;
			let pid = getPropertyIdFromContext(parent,isRelative,params,parentid);
			getOption(parent,parentid,pid,options,param,params);
		}
	else
		if("isOneOf" in toSelect)
		{
			let isOneOf = toSelect.isOneOf;
			for(let i in isOneOf)
			{
				let propid = isOneOf[i];
				//property or list of properties
				let pid = getPropertyIdFromContext(data,propid,params,undefined);
				getListOption(parent,parentid,pid,options,param,params);
			}
		}
	else
		if("isOneOfRelative" in toSelect)
		{
			let isOneOfRelative = toSelect.isOneOfRelative;
			for(let i in isOneOfRelative)
			{
				let propid = isOneOfRelative[i];
				//property or list of properties
				let pid = getPropertyIdFromContext(parent,propid,params,parentid);
				getListOption(parent,parentid,pid,options,param,params);
			}
		}
	else
		if("isRecursiveChildOf" in toSelect)
		{
			let isRecursiveChildOf = toSelect.isRecursiveChildOf;
			let pid = getPropertyIdFromContext(data,isRecursiveChildOf,params,undefined);
			let remainingRedirections = 0;
			if("numRedirections" in toSelect)
			{
				remainingRedirections = toSelect.numRedirections;
			}
			let skipProperties = [];
			if("skipProperties" in toSelect)
			{
				skipProperties = toSelect.skipProperties;
			}
			addRecursiveChildren(pid,parent,parentid,options,param,params,remainingRedirections,skipProperties);
		}
	return options;
}

//A sweeping and potentially problematic choice that recurses through the graph
//adding any options that pass conditions
//excluding named properties to try to minimise cyclic loops
function addRecursiveChildren(objid,parent,parentid,options,param,params,remainingRedirections,skipProperties)
{
	getOption(parent,parentid,objid,options,param,params);
	let property = getProperty(objid);
	if(typeof property == "object")
	{
		for(let e in property)
		{
			if(skipProperties.includes(e))
			{
			}
			else
			{
				addRecursiveChildren(objid+"/"+e,parent,parentid,options,param,params,remainingRedirections,skipProperties);
			}
		}
	}
	if(remainingRedirections>0)
	{				
		if(typeof property == "string")
		{
			objid = property;
			property = getProperty(property);
			if(typeof property == "object")
			{
				for(let e in property)
				{
					if(skipProperties.includes(e))
					{
					}
					else
					{
						addRecursiveChildren(objid+"/"+e,parent,parentid,options,param,params,remainingRedirections-1,skipProperties);
					}
				}
			}
		}
	}
}

/**
 *
 * @param {Number} interpolationPercentage
 *   How much to interpolate between frames.
 */
function draw(interpolationPercentage) 
{
	if(interpolationPercentage>1.0)
	{
		interpolationPercentage = 1.0;
	}
	let iinterpolation = 1.0-interpolationPercentage;

	//var locationsDiv = document.getElementById('Locations');
	//var agentsDiv = document.getElementById('Agents');
	//var metricsDiv = document.getElementById('Metrics');

	let anyChange = false;

	if(currentViewNeedsUpdating)
	{
		updateView();
	}
}

function end(fps, panic) 
{
	//fpsCounter.textContent = Math.round(fps) + ' FPS';
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

//TODO reenable MainLoop
// Start the main loop.
MainLoop.setUpdate(update).setDraw(draw).setEnd(end).start();
if(urlObjectID!=undefined)
{
	view(urlObjectID,true);
}

generateParentRefsInChildren(data, "@");

// console.log(data);
