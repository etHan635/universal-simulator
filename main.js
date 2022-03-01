if(window.Worker){
	console.log(data);
	const simulation = new Worker(URL.createObjectURL(new Blob(['(' + simulate.toString() + ")()"], {type:"text/javascript"})));
	
	simulation.onmessage = function(e){
		console.log("Message recieved from worker...");
		document.querySelector("#content").textContent = e.data.state;
	}
	
}
