const URL_WITHOUT_PARAMETERS = window.location.protocol + '//' + window.location.host + window.location.pathname;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlObjectID = urlParams.get('view');	//The address of the node to use as root

var rootAddress = "";
var guiUpdateTrigger = true;

var selectedOption = {};

function navigateTo(address,dontBackup=false)
{
	if(couldBePath(address)){
		rootAddress = address;
	} else {
		rootAddress = "@";
	}

	selectedOption = {};

	guiUpdateTrigger = true;
}

/*
 * Follows the path, starting at 'node', returning whatever is found at the end.
 * */
function followPath(node, path, value = undefined){
	if(!couldBePath(path)){
		return undefined;
	}
	//(from here on, assume valid)
	//Remove @/ (as we know we have to start at data)
	let workingPath = path.substring(1);

	//If no path, we don't need to do any further operations
	if(workingPath.length == 0){
		return node;
	}

	workingPath = workingPath.split('/');
	
	//If first stage of path is empty, i.e. '/foo/bar',
	//start at root (data) 
	if(workingPath[0] == ""){
		node = data;
		workingPath = workingPath.slice(1, workingPath.length);
	}

	//try to traverse hierarchy
	for(let i = 0; i < workingPath.length; i++){
		if(!(typeof node == "object")){
			return undefined;
		}
		let step = workingPath[i];
		if(step == ".."){
			//Not ideal, as will only work for objects and arrays.
			//Can't get parent of primitives, but shouldn't need to for
			//our purposes.
			node = followPath(node, node._parent);
		} else if(step == "*"){
			if(i == workingPath.length - 1){
				//Get addresses of children
				let children = [];
				for(key in node){
					if(key[0] != "_"){
						children.push(path.slice(0, -1) + key);
					}
				}
				return children;
			} else {
				return undefined;
			}
		} else {
			if(value != undefined){
				//About to go to final point, 
				//check whether we need to set anything
				if(i == workingPath.length - 1){
					node[step] = value;
				}
			}

			if(step in node){
				node = node[step];

				//Try to resolve a suspected address
				//(ABSOLUTE ONLY TODO fix for relative also)
				if(couldBePath(node, true)){
					node = followPath(node, node);
				}

			} else {
				return undefined;
			}
		} 	
	}

	if(value != undefined){

	}
	return node;
}
