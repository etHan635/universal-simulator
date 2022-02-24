if(window.Worker){
	console.log(data);
	const simulation = new Worker(URL.createObjectURL(new Blob(['(' + simulate.toString() + ")()"], {type:"text/javascript"})));
	
	simulation.onmessage = function(e){
		console.log("Message recieved from worker...");
		document.querySelector("#content").appendChild(treeGuiOf(e.data.state, "@"));
	}

	simulation.postMessage({address:"@", state:data});	
}
