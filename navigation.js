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
function followPath(node, path){
	if(!couldBePath(path)){
		return undefined;
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
		let step = path[i];
		if(step == ".."){
			//Not ideal, as will only work for objects and arrays.
			//Can't get parent of primitives, but shouldn't need to for
			//our purposes.
			node = followPath(node, node._parent);
		} else if(step in node){
			node = node[step];
		} else {
			return undefined;
		}

		//Try to resolve a suspected address
		if(couldBePath(node)){
			node = followPath(node, node);
		}
	}
	return node;
}
