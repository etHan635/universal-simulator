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


