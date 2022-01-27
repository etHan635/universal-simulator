/*
 * Checks whether all conditions are met for a given actionInstance to be invoked
 * */
function checkActionPrerequisitesMet(actionInstance){
	let conditions = actionInstance.action.prerequisites;
	if(conditions == undefined){ return true; }
	for(let i = 0; i < conditions.length; i++){
		let condition = conditions[i];
		if(condition[0] == "exists"){
			let value = condition[1];
			while(couldBePath(value)){
				value = followPath(actionInstance, value);
			}
			if(value == undefined){
				return false;
			}
		} else {
			//More condition types will go here...
		}
	}
	return true;
}

/*
 * Returns either the value of a node, or it's _visualisation.shortname if one can be found.
 * */
function getNodeText(node, defaultText){
	if(couldBePath(node, true)){
		//Try to follow path
		node = followPath(data, node);
	}

	if(typeof node == "object"){
		if(node._visualisation != undefined){
			if(node._visualisation.shortname != undefined){
				defaultText = node._visualisation.shortname;
			} 
		}
	}
	return defaultText;
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

function isNumericString(str) {
	if (typeof str != "string") return false // we only process strings!  
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function deepEquals(p0,p1,skipProperties)
{
	if((typeof p0) != (typeof p1))
		return false;

	if(Number.isFinite(p0))
		return p0==p1;
	if (typeof p0 === "boolean"){
		return p0==p1;
	}
	if (typeof p0 === "string"){
		return p0==p1;
	}
	if(Array.isArray(p0))
	{
		if(p0.length != p1.length)
		{
			return false;
		}

		for(let i in p0)
		{
			if(!deepEquals(p0[i],p1[i],skipProperties))
			{
				return false;
			}
		}
	}
	else	
		if(typeof p0=="object")
		{
			let p1Keys = Object.keys(p1);
			for(let k in p0)
			{
				let skip = false;
				if(skipProperties.includes(k))
				{
					skip = true;
				}
				if(p1Keys.includes(k))
				{
					p1Keys.splice(p1Keys.indexOf(k), 1);
					if(!deepEquals(p0[k],p1[k],skipProperties))
					{
						return false;
					}
				}
				else
					if(!skip)
					{
						return false;
					}
			}
			for(let i in p1Keys)
			{
				if(!skipProperties.includes(p1Keys[i]))
				{
					return false;
				}
			}
			return true;
		}
}

function evaluateExpression(quantity,params)
{
	if(typeof quantity == "string")
	{
		if(typeof quantity=="number")
		{
			return quantity;
		}
		if(isNumericString(quantity))
		{
			return parseFloat(quantity);
		}
		let id = getPropertyIdFromContext(data,quantity,params,undefined);
		//If the property comes from a text input then it isn't a property
		if(typeof id=="number")
		{
			return id;
		}
		if(isNumericString(id))
		{
			return parseFloat(id);
		}
		let p = getProperty(id);
		if(typeof p=="number")
		{
			return p;
		}
		//Don't think this should ever happen
		return parseFloat(p);
	}
	else
		if(Number.isFinite(quantity))
		{
			return quantity;
		}
	else
		if("multiply" in quantity)
		{
			let total = 1.0;
			for(elemInd in quantity.multiply)
			{
				let elem = quantity.multiply[elemInd];
				total *= evaluateExpression(elem,params);
			}
			return total;
		}
	else
		if("customFunction" in quantity)
		{
			return quantity.customFunction(data,quantity,params);
		}
}

//Create a unique id for a new object
function newID(inObject)
{
	let id = "id"+frame;
	for(let existing in inObject)
	{
		if(existing==id)
		{
			id = id+"i";
		}
	}
	return id;
}

//Split address into parent and child - useful for deletion etc.
function splitAddress(address){
	let segments = address.substring(1).split('/');
	let kChild = segments.pop();
	let aParent = "@" + segments.join('/');
	return { "aParent":aParent, "kChild":kChild};
}
