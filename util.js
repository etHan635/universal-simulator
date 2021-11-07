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
 * This doesn't check whether data.foo.bar.fiz actually exists.
 * */
function couldBePath(path){
	if(typeof path === "string"){
		if(path.length > 1){
			if(path[0] == '@'){
				return true;
			}
		}
	}
	return false;
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


