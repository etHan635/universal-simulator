data["AIs"] = {
	//When a task is complete
	agent0:{
		agent:"Agents/fulfilmentWorker/amazonWorker",

		fulfilment_fulfilOrder:{
			//if no current order taking responsibility for
				//If phone not on -> turn it on
				//If phone not logged in -> login
				//If not completing a task && If a task available on the ticketing system -> take ownership
			//else
				//If orderbox doesn't exist -> spawn box for order in warehouse
				//If orderbox is empty -> Spawn an instance of the ordered objects into the box
				//Create a delivery order to transport this box -> Move task from inProgress to done
		},

		delivery_deliverOrder:{
			//if no current order taking responsibility for
				//If phone not on -> turn it on
				//If phone not logged in -> login
				//If not completing a task && If a task available on the ticketing system -> take ownership
			//else
				//Travel to source of package in van
				//Move object from location to van
				//Travel to destination
				//Move object from van to location
				//Update clients software to indicate delivery complete
				//Move task from inProgress to done
		},

	},	
};