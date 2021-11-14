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


/* //When an option is changed the selected options are altered
function updateSelection(optionid,actionid,id){
	let selectelem = document.getElementById(optionid);
	selectedOption[optionid] = selectelem.value;

	let actid = (id+"|"+actionid).replace(new RegExp('/', 'g'),"||");
	let actionelem = document.getElementById(actid);

	let property = getProperty(id);
	let action = getProperty(actionid);
	actionelem.innerHTML = printAction(property,id,action,actionid);

	//Run the validation code to check that the current set of options are valid
	let reasonElementID = actid+"|reason";
	validateAction(id,actionid,reasonElementID);
}

//When creating the form for an action try to create a UI enabling the action to be performed
function printAction(property,id,action,actionid){
	let beginningHTML = "";
	beginningHTML += "\n<table>";
	beginningHTML += "\n<tr>";
	let innerHTML = "";
	let actid = (id+"|"+actionid).replace(new RegExp('/', 'g'),"||");

	//innerHTML +=  "\n<div id='"+actid+"'>";

	let reasonElementID = actid+"|reason";
	let reason = "";
	let canAct = true;

	let numSubroutines = 1;
	if("subRoutines" in action)	{
		numSubroutines += action.subRoutines.length;
	}

	let params = {"this":id};

	for(let sind = 0; sind < numSubroutines; sind++)	{
		let subParams = params;
		let reverseSubParams = undefined;
		let subAction = action;
		let subActionId = actionid;
		if(sind>0){
			let subRoutine = action.subRoutines[sind-1];
			subParams = JSON.parse(JSON.stringify(params));
			reverseSubParams = subRoutine.params;
			for(let spk in subRoutine.params){
				subParams[spk] = params[subRoutine.params[spk]];
			}
			subActionId = getPropertyIdFromContext(data,subRoutine.action,params,undefined);
			subAction = getProperty(subActionId);
		}
		if(subAction!=undefined){
			for(let kc in subAction.canAct)	{
				let canActRule = subAction.canAct[kc];
				canAct = canAct&&validateCanAct(property,id,canActRule,{"this":id});
			}
		}
	}

	if(canAct){
		//function actClick(thisAgent,actionid,reasonElementID)
		beginningHTML += "\n<td>";
		beginningHTML += "\n<button id='"+id+"|"+actionid+"' onClick='actClick(\""+id+"\",\""+actionid+"\",\""+reasonElementID+"\");'>"+action.visualisation.shortname+"</button><br>";
		beginningHTML += "\n</td>";

		let parametersAvailable = true;
		let params = {"this":id};

		for(let sind = 0; sind < numSubroutines; sind++){
			let subParams = params;
			let reverseSubParams = undefined;
			let subAction = action;
			let subActionId = actionid;
			if(sind>0){
				let subRoutine = action.subRoutines[sind-1];
				subParams = JSON.parse(JSON.stringify(params));
				reverseSubParams = subRoutine.params;
				for(let spk in subRoutine.params){
					subParams[spk] = params[subRoutine.params[spk]];
					//reverseSubParams[subRoutine.params[spk]] = spk;
				}
				subActionId = getPropertyIdFromContext(data,subRoutine.action,params,undefined);
				subAction = getProperty(subActionId);
			}


			if(subAction!=undefined){
				for(let kp in subAction.parameters){
					let subParam = subAction.parameters[kp];
					let param = subParam;
					let possibleObjectIds = [];
					let toSelect = param.toSelect;
					if("number" in toSelect){
						let optionid = (actid+"|"+param.name).replace(new RegExp('/', 'g'),"||");
						let existingKey = selectedOption[optionid];
						if(existingKey==undefined){
							existingKey = toSelect.number;
						}
						innerHTML += "\n<td>";
						innerHTML += "<input id='"+optionid+"' type='number' value="+existingKey+" onchange='updateSelection(\""+optionid+"\",\""+actionid+"\",\""+id+"\")';>"
						innerHTML += "\n</td>";
					} else {
						possibleObjectIds = getListOfOptions(property,id,param,subParams,possibleObjectIds,toSelect);

						if(possibleObjectIds.length==0)	{
							if(reason.length>0){
								reason += " ";
							}
							reason += "No valid value for "+param.name;
							//possibleObjectIds = getListOfOptions(property,id,param,params,possibleObjectIds,toSelect);
							parametersAvailable = false;
						} else {
							//The id of the param that is active
							let paramName = param.name;
							if(reverseSubParams!=undefined)	{
								if(param.name in reverseSubParams) {
									paramName = reverseSubParams[param.name];
								}
							}
							let optionid = (actid+"|"+paramName).replace(new RegExp('/', 'g'),"||");
							innerHTML += "\n<td>";
							innerHTML += "<select id='"+optionid+"' onchange='updateSelection(\""+optionid+"\",\""+actionid+"\",\""+id+"\")';>"
							let innerHTML_options = "";
							let existingKey = selectedOption[optionid];
							let foundKey = false;
							for(let kop in possibleObjectIds){
								let possibleObj = possibleObjectIds[kop];
								if(existingKey==undefined){
									existingKey = possibleObj.id;
									selectedOption[optionid] = possibleObj.id;
									subParams[param.name] = existingKey;
									if(reverseSubParams!=undefined)	{
										if(param.name in reverseSubParams){
											params[reverseSubParams[param.name]] = existingKey;
										} else {
											params[param.name] = existingKey;
										}
									}
									foundKey = true;
									innerHTML_options += "\n<option value='"+possibleObj.id+"' selected>"+possibleObj.shortname+"</option>"
								} else if(existingKey==possibleObj.id)	{
									subParams[param.name] = possibleObj.id;
									if(reverseSubParams!=undefined)	{
										if(param.name in reverseSubParams){
											params[reverseSubParams[param.name]] = possibleObj.id;
										} else {
											params[param.name] = possibleObj.id;
										}
									}
									foundKey = true;
									innerHTML_options += "\n<option value='"+possibleObj.id+"' selected>"+possibleObj.shortname+"</option>"
								}
								else
								{
									innerHTML_options += "\n<option value='"+possibleObj.id+"'>"+possibleObj.shortname+"</option>"											
								}
							}
							if(!foundKey)
							{
								subParams[param.name] = undefined;
								if(reverseSubParams!=undefined)
								{
									if(param.name in reverseSubParams)
									{
										params[reverseSubParams[param.name]] = undefined;
									}
									else
									{
										params[param.name] = undefined;
									}
								}
								selectedOption[optionid] = undefined;
								existingKey = undefined;

								innerHTML_options = "";
								for(let kop in possibleObjectIds)
								{
									let possibleObj = possibleObjectIds[kop];
									if(existingKey==undefined)
									{
										existingKey = possibleObj.id;
										selectedOption[optionid] = possibleObj.id;
										subParams[param.name] = existingKey;

										if(reverseSubParams!=undefined)
										{
											if(param.name in reverseSubParams)
											{
												params[reverseSubParams[param.name]] = existingKey;
											}
											else
											{
												params[param.name] = existingKey;
											}
										}

										foundKey = true;
										innerHTML_options += "\n<option value='"+possibleObj.id+"' selected>"+possibleObj.shortname+"</option>"
									}
									else
										if(existingKey==possibleObj.id)
										{
											subParams[param.name] = possibleObj.id;
											if(reverseSubParams!=undefined)
											{
												if(param.name in reverseSubParams)
												{
													params[reverseSubParams[param.name]] = existingKey;
												}
												else
												{
													params[param.name] = existingKey;
												}
											}
											foundKey = true;
											innerHTML_options += "\n<option value='"+possibleObj.id+"' selected>"+possibleObj.shortname+"</option>"
										}
									else
									{
										innerHTML_options += "\n<option value='"+possibleObj.id+"'>"+possibleObj.shortname+"</option>"											
									}
								}

							}
							innerHTML += innerHTML_options;
							innerHTML += "</select>"
							innerHTML += "\n</td>";
						}
					}
				}
			}
		}
		if(parametersAvailable)
		{
			let performReason = reasonCantPerformAction(params,action);
			if(performReason!=undefined)
			{
				parametersAvailable = false;
				if(reason.length>0)
				{
					reason += " ";
				}
				reason += performReason;
			}
		}

		if(!parametersAvailable)
		{
			beginningHTML = "";
			beginningHTML += "\n<table>";
			beginningHTML += "\n<tr>";

			beginningHTML += "\n<td>";
			beginningHTML += "\n<b>"+action.visualisation.shortname+"</b><br>";
			beginningHTML += "\n</td>";	
		}
		innerHTML = beginningHTML+innerHTML;
	}
	else
	{
		innerHTML += "\n<td>";
		innerHTML += "\n"+action.visualisation.shortname+"<br>";
		innerHTML += "\n</td>";
	}

	innerHTML += "\n<td>";
	innerHTML +=  "\n<div id='"+(id+"|"+actionid).replace(new RegExp('/', 'g'),"||")+"|reason'>";
	innerHTML += reason;
	innerHTML +=  "\n</div>";
	innerHTML += "\n</td>";

	innerHTML += "\n</tr>";
	innerHTML += "\n</table>";
	return innerHTML;
} */



//Recursively print out the tree, with buttons to view any part of it
function printProperties(property,id)
{
	let innerHTML = "";
	if(property==undefined)
		return "\n<td>"+"undefined"+"</td>";
	if(Number.isFinite(property))
		return "\n<td>"+property+"</td>";
	if (typeof property === "boolean"){
		return "\n<td>"+property+"</td>";
	}
	if(Array.isArray(property))
	{
		innerHTML += "\n<td style=\"border-left: 1px solid #cdd0d4;border-bottom: 1px solid #cdd0d4;\">";
		innerHTML += "\n<table>";
		for(let kv in property)
		{
			let childid = kv;
			if(id!=undefined)
				childid = id+"/"+kv;
			let objectValue = property[kv];
			innerHTML += "\n<tr>";
			innerHTML += "\n<td style=\"vertical-align:top; \">";
			//innerHTML += "\n"+kv+"";
			if((typeof objectValue == "object")&&("visualisation" in objectValue)&&("shortname" in objectValue.visualisation))
			{
				innerHTML += "\n<button id='"+childid+"' onClick='view(\""+childid+"\");'>"+objectValue.visualisation.shortname+"</button><br>";								
			}
			else
			{
				innerHTML += "\n<button id='"+childid+"' onClick='view(\""+childid+"\");'>"+kv+"</button><br>";								
			}
			innerHTML += "\n</td>";

			innerHTML += printProperties(objectValue,childid);

			innerHTML += "\n</tr>";
		}
		innerHTML += "\n</table>";
		innerHTML += "\n</td>";
	}
	else
		if(typeof property == "string")
		{
			innerHTML += "\n<td>";

			if(isNavigatableProperty(property))
			{
				let prop = getProperty(property);
				if((typeof prop == "object")&&("visualisation" in prop)&&("shortname" in prop.visualisation))
				{
					innerHTML += "\n<button id='"+property+"' onClick='view(\""+property+"\");'>"+prop.visualisation.shortname+"</button><br>";								
				}
				else
				{
					innerHTML += "\n<button id='"+property+"' onClick='view(\""+property+"\");'>"+property+"</button><br>";								
				}
			}
			else
			{
				innerHTML += "\n"+property+"";						
			}
			innerHTML += "\n</td>";
		}
	else
		if(typeof property == "object")
		{
			innerHTML += "\n<td style=\"border-left: 1px solid #cdd0d4;border-bottom: 1px solid #cdd0d4; \">";
			innerHTML += "\n<table>";
			for(let kv in property)
			{
				let objectValue = property[kv];

				let childid = kv;
				if(id!=undefined)
					childid = id+"/"+kv;
				if(kv=="timeRemaining")
				{
					innerHTML += "\n<tr>";
					innerHTML += "\n<td >";
					innerHTML += "\n"+kv;
					innerHTML += "\n</td>";
					innerHTML += "\n<td>";
					innerHTML += "\n<div id='"+id+"/timeRemaining'>";
					innerHTML += "\n"+objectValue.toFixed(1);
					innerHTML += "\n</div>";
					innerHTML += "\n</tr>";
				}
				else
					if(kv=="visibleActions")
					{
						innerHTML += "\n<tr>";
						innerHTML += "\n<td>";
						if((typeof objectValue == "object")&&("visualisation" in objectValue)&&("shortname" in objectValue.visualisation))
						{
							innerHTML += "\n<button id='"+childid+"' onClick='view(\""+childid+"\");'>"+objectValue.visualisation.shortname+"</button><br>";								
						}
						else
						{
							innerHTML += "\n<button id='"+childid+"' onClick='view(\""+childid+"\");'>"+kv+"</button><br>";								
						}
						innerHTML += "\n</td>";
						innerHTML += "\n<td style=\"border-left: 1px solid #cdd0d4;border-bottom: 1px solid #cdd0d4;\">";
						innerHTML += "\n<table>";
						//Show an action control
						for(let ka in property.visibleActions)
						{
							innerHTML += "\n<tr>";
							let actionid = property.visibleActions[ka];
							let action = getProperty(actionid);

							if(action==undefined)
							{
								innerHTML += "\n<td>";										
								innerHTML +=  "\nMISSING:"+actionid;
								innerHTML += "\n</td>";										
							}
							else
							{
								let actid = (id+"|"+actionid).replace(new RegExp('/', 'g'),"||");

								innerHTML += "\n<td>";										
								innerHTML +=  "\n<div id='"+actid+"'>";
								innerHTML += printAction(property,id,action,actionid);
								innerHTML +=  "\n</div>"
								innerHTML += "\n</td>";										
							}
							innerHTML += "\n</tr>";
						}
						innerHTML += "\n</table>";
						innerHTML += "\n</td>";
						innerHTML += "\n</tr>";
					}
				else
				{
					innerHTML += "\n<tr>";
					innerHTML += "\n<td style=\"vertical-align:top \">";
					//innerHTML += "\n"+kv+"";
					if((typeof objectValue == "object")&&("visualisation" in objectValue)&&("shortname" in objectValue.visualisation))
					{
						innerHTML += "\n<button id='"+childid+"' onClick='view(\""+childid+"\");'>"+objectValue.visualisation.shortname+"</button><br>";								
					}
					else
					{
						innerHTML += "\n<button id='"+childid+"' onClick='view(\""+childid+"\");'>"+kv+"</button><br>";								
					}
					innerHTML += "\n</td>";
					innerHTML += printProperties(objectValue,childid);
					innerHTML += "\n</tr>";
				}
			}
			innerHTML += "\n</table>";
			innerHTML += "\n</td>";
		}
	return innerHTML;
}
