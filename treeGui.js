var pathDiv = document.getElementById("path");
var contentDiv = document.getElementById("content");

/* Generate Tree GUI for the current node and all children, including links */
function treeGuiOf(node, nodeAddress){
	if(typeof node == "object"){
		let array = Array.isArray(node);

		let ul = document.createElement("ul");
		ul.id = nodeAddress;
		if(array){
			ul.classList.add("array");
		}
		for(key in node){
			if(key[0] == '_'){
				if(key == "_visible"){
					if(node._visible.actions != undefined){
						let visibleActions = node._visible.actions;
						ul.appendChild(treeGuiOfActions(visibleActions, nodeAddress + "/_visible/actions"));
					}
				}
				continue; 
			}

			let li = document.createElement("li");

			//Show key as click option
			let link = document.createElement("a");
			link.classList.add("key");
			link.id = nodeAddress + "/" + key;
			link.href = URL_WITHOUT_PARAMETERS + "?view=" + nodeAddress + "/" + key;
			link.textContent = getNodeText(node[key], key);
			link.addEventListener("click", function(){ navigateTo(nodeAddress); });
			li.appendChild(link);
			
			//Show space between key and value
			let span = document.createElement("span");
			if(array){
				span.textContent = ". ";
			} else {
				span.textContent = ": ";
			}
			li.appendChild(span);

			li.appendChild(treeGuiOf(node[key], nodeAddress + "/" + key));
			ul.appendChild(li);
		}
		return ul;
	} else if(couldBePath(node)){
		let absNode = resolvePath(nodeAddress, node);
		let nodeAtAddress = followPath(node, absNode);
		let nodeName = getNodeText(nodeAtAddress, nodeAtAddress);
		nodeName += "    (" + node + ")";
		let link = document.createElement("a");
		link.id = nodeAddress;
		link.href = URL_WITHOUT_PARAMETERS + "?view=" + absNode;
		link.textContent = nodeName;
		link.addEventListener("click", function(){ navigateTo(absNode); });
		return link;
	} else {
		let span = document.createElement("span");
		span.id = nodeAddress;
		span.innerHTML = node;
		return span;
	}
}

function treeGuiOfActions(visibleActions, visibleActionsAddress){
	let fieldSet = document.createElement("fieldset");
	let legend = document.createElement("legend");

	let buttonHolder = document.createElement("span");

	let actionDiv = document.createElement("div");
	let actionSelect = document.createElement("select");
	for(i = 0; i < visibleActions.length; i++){
		let option = document.createElement("option");
		option.value = visibleActionsAddress + "/" + i;
		option.textContent = getNodeText(visibleActions[i], visibleActions[i]);
		actionSelect.appendChild(option);
	}
	actionSelect.selectedIndex = -1;
	actionSelect.addEventListener("change", function(){
		actionDiv.textContent = "";
		buttonHolder.textContent = "";
		let actionAddress = visibleActionsAddress + "/" + actionSelect.selectedIndex;

		let action = followPath(data, actionAddress);
		let agent = followPath(visibleActions, "@../..");
		let args = {};

		//Initialise Action Instance
		let actionInstance = {
			action: action,
			agent: agent,
			args: args,
		};

		//Populate all readonly args
		let keys = Object.keys(actionInstance.action.params);
		for(i = 0; i < keys.length; i++){
			let param = actionInstance.action.params[keys[i]];
			if(param.type == "readonly"){
				let key = Object.keys(actionInstance.action.params)[i];
				actionInstance.args[key] = param.value;
			}
		}
			
		if(!checkActionPrerequisitesMet(actionInstance)){
			let errorMessage = document.createElement("span");
			errorMessage.textContent = "Prerequisites not met for this action.";
			actionDiv.appendChild(errorMessage);
			return;
		}

		actionDiv.appendChild(treeGuiOfActionInstance(actionInstance, actionAddress));


		let button = document.createElement("button");
		button.textContent = "Execute";
		button.addEventListener("click", function(){
			invokeAction(actionInstance);
		});
		buttonHolder.appendChild(button);
	});

	legend.textContent = "Actions: ";

	legend.appendChild(actionSelect);
	legend.appendChild(buttonHolder);

	fieldSet.appendChild(legend);
	fieldSet.appendChild(actionDiv);
	return fieldSet;
}

/*
 * Make treeGui for an instance of an action.
 * 
 */
function treeGuiOfActionInstance(actionInstance, actionLocalAddress){
	let ul = document.createElement("ul");

	let agentAddress = resolvePath(actionLocalAddress, "@../../..")
	let params = actionInstance.action.params;
	if(params == undefined){
		return ul;
	}

	let keys = Object.keys(params);
	for(i = 0; i < keys.length; i++){
		let key = keys[i];
		if(key[0] == "_"){ continue; }
		let param = params[key];
		
		let li = document.createElement("li");
		let link = document.createElement("a");
		link.textContent = key + " = ";
		li.appendChild(link);

		let type = param.type;
		if(type == "readonly"){	
			//Merely display a predefined value.
			let value = param.value;
			if(couldBePath(value)){
				if(value.includes("@agent")){
					value = value.replace("@agent", agentAddress);
				}
			}
			li.appendChild(treeGuiOf(value, actionLocalAddress + "/params/" + key));
			
		} else if(type == "enter"){
			//Get the value from user input.
			let inputType = param.inputType;
			let input = document.createElement("input");
			input.type = inputType;
			input.addEventListener("change", function(){
				let value = input.value;
				if(inputType == "number"){
					value = Number(value);
				}
				actionInstance.args[key] = value;
			});
			li.appendChild(input);
		} else if(type == "pick"){
			//Have the user pick the value from a predefined range of options
			let possibilities = param.options;
			if(couldBePath(possibilities)){
				possibilities = followPath(actionInstance, param.options)
			}

			let select = document.createElement("select");
			for(j = 0; j < possibilities.length; j++){
				let possibility = possibilities[j];
				if(couldBePath(possibility)){
					if(possibility.includes("@agent")){
						possibility = possibility.replace("@agent", agentAddress);
					}
				}
				let option = document.createElement("option");
				option.value = possibilities[j];
				option.textContent = possibility;
				select.appendChild(option);
			}
			select.selectedIndex = -1;
			let keyLocal = key.slice(); //Quick fix to create local copy of key for use in event listener
			select.addEventListener("change", function(){
				actionInstance.args[keyLocal] = select.value;
			})

			li.appendChild(select);
		}

		ul.appendChild(li);
	}

	return ul;
}

//Build the menu buttons and then recursively print out the properties
function updateTreeGui(){
	let path = "@";
	let nodeName = "@";
	let node = data;
	//Build a URL display for the parents of the current node
	pathDiv.textContent="";
	
	//Always put link for root node, regardless for contents of currentView
	let rootLink = document.createElement("a");
	rootLink.href = URL_WITHOUT_PARAMETERS + "?view=@";
	rootLink.textContent = nodeName;
	rootLink.addEventListener("click", function(){ navigateTo(path); });
	pathDiv.appendChild(rootLink);

	let currentView = rootAddress.split('/');

	for(i = 1; i < currentView.length; i++){
		//Get next node
		nodeName = currentView[i];
		path += "/" + nodeName;
		node = node[nodeName];

		//Put spacer to prepare for next path segment
		let spacer = document.createElement("span");
		spacer.textContent = " / ";
		pathDiv.appendChild(spacer);

		//Create link to path segment
		if(typeof node == "object"){
			if(node._visualisation != undefined){
				nodeName = node._visualisation.shortname;
			}
		}
		let link = document.createElement("a");
		link.href = URL_WITHOUT_PARAMETERS + "?view=" + path;
		link.textContent = nodeName;
		link.addEventListener("click", function(){ navigateTo(path); });
		pathDiv.appendChild(link);
	}

	if(path.length==0){
		path = undefined;
	}

	//render the property that the currentView is focused on
	contentDiv.textContent="";
	contentDiv.appendChild(treeGuiOf(node, path));
	currentViewNeedsUpdating = false;
}
