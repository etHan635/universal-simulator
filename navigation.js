const urlWithoutParameters = window.location.protocol + '//' + window.location.host + window.location.pathname;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlObjectID = urlParams.get('view');

var previousViews = [];
var nextViews = [];
var currentViewId = "";
var currentView = [];
var currentViewNeedsUpdating = true;

var selectedOption = {};

window.onpopstate = function(e){
	if(e.state){
		if(previousViews.length>0)
		{
			let previousView = previousViews.pop();
			nextViews.push(previousView);
			view(previousView,true);
		}
		else
		{
		}
	}
};

function view(objectID,dontBackup=false)
{
	if(objectID.length==0)
	{
		currentView = [];					
	}
	else
	{
		var parts = objectID.substring(1).split("/");
		currentView = parts;
	}
	selectedOption = {};
	currentViewNeedsUpdating = true;
	
	if(dontBackup==false)
	{
		let urlPath = urlWithoutParameters+"?view="+objectID;
		// window.history.pushState({"title":""+currentViewId},"", urlPath);
		// previousViews.push(currentViewId);
	}
	currentViewId = objectID;
}
