var pathDiv = document.getElementById("path");
var contentDiv = document.getElementById("content");

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

/* Generate Tree GUI for the current node and all children, including links */
function treeGuiOf(node, nodeAddress){
	if(Array.isArray(node)){
		let ol = document.createElement("ol");
		ol.id = nodeAddress;
		for(i = 0; i < node.length; i++){
			//(skip label, as array)
			let li = document.createElement("li");
			li.appendChild(treeGuiOf(node[i], nodeAddress + "/" + i));
			ol.appendChild(li);
		}
		return ol;
	} else if(typeof node == "object"){
		let ul = document.createElement("ul");
		ul.id = nodeAddress;
		for(key in node){
			if(key == "_parent"){ continue; }
			let li = document.createElement("li");
			
			//Show title as click option
			let link = document.createElement("a");
			link.classList.add("key");
			link.id = nodeAddress + "/" + key;
			link.href = urlWithoutParameters + "?view=" + nodeAddress + "/" + key;
			link.textContent = key;
			link.addEventListener("click", view(nodeAddress));
			li.appendChild(link);
			
			//Show space between key and value
			let span = document.createElement("span");
			span.textContent = ": ";
			li.appendChild(span);

			li.appendChild(treeGuiOf(node[key], nodeAddress + "/" + key));
			ul.appendChild(li);
		}
		return ul;
	} else if(couldBePath(node)){
		let absNode = resolvePath(nodeAddress, node);

		let link = document.createElement("a");
		link.id = nodeAddress;
		link.href = urlWithoutParameters + "?view=" + absNode;
		link.textContent = node;
		link.addEventListener("click", view(absNode));
		return link;
	} else {
		let span = document.createElement("span");
		span.id = nodeAddress;
		span.innerHTML = node;
		return span;
	}
}


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

//Build the menu buttons and then recursively print out the properties
function updateView(){
	let path = "@";
	let nodeName = "@";
	let node = data;
	//Build a URL display for the parents of the current node
	pathDiv.textContent="";
	
	for(i = 1; i <= currentView.length; i++){
		//Create link to current ancestor
		let link = document.createElement("a");
		link.href = urlWithoutParameters + "?view=" + path;
		link.textContent = nodeName;
		link.addEventListener("click", function(){ view(path); })
		pathDiv.appendChild(link);

		//If not final node, add '/' and get the next node in the sequence
		if(i < currentView.length){
			let spacer = document.createElement("span");
			spacer.textContent = " / ";
			pathDiv.appendChild(spacer);

			nodeName = currentView[i];
			path += "/" + nodeName;
			node = node[nodeName];
		}
	}

	if(path.length==0){
		path = undefined;
	}

	//render the property that the currentView is focused on
	contentDiv.textContent="";
	contentDiv.appendChild(treeGuiOf(node, path));
	currentViewNeedsUpdating = false;
}
