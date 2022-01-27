data["actions"] = {
	walk:{
		_visualisation:{shortname:"Walk",},
		duration:1.0,
		params:{
			thatLocation:{type:"pick", options:"@agent/_visible/locations/*"},
			// thatPosition:{type:"pick", options:"@args/thatLocation/agents/*"},
			motivationCost:{type:"readonly", value:1},
		},
		transforms:{
			pre:[
				"nAppend(\"@agent/resources/motivation/quantity\", -1, actionInstance)",
				// or: "actionInstance.agent.resources.motivation.quantity -= 1",
				//Storing starting location for later
				"nSet(\"@args/thisLocation'\", nContents(actionInstance.agent.properties.location, actionInstance), actionInstance)",
				// "console.log(nContents(actionInstance.args[\"thisLocation'\"]._parent, actionInstance))",
				"nDeleteFromArray(actionInstance.agent.properties.location, actionInstance.agent.properties._parent, actionInstance)",
				"nSet(\"@agent/properties/location\", \"@/Locations/traveling\", actionInstance)",
				//Just storing the *actual* destination for easy reference
				"nSet(\"@args/thatLocation'\", nContents(nContents(\"@args/thatLocation\", actionInstance), actionInstance), actionInstance)",
				"nAppend(\"@args/thatLocation'/resources/space/quantity\", -1, actionInstance)"
			],
			post:[
				"nSet(\"@agent/properties/location\", actionInstance.args[\"thatLocation'\"].resources._parent + \"/agents\", actionInstance)",
				//TODO: add agent to location.agents array
				"console.log(nContents(\"@args/thatLocation'\", actionInstance))",
				"nAddToArray(\"@args/thatLocation'/agents\", actionInstance.agent.properties._parent, actionInstance)",
				"nAppend(\"@args/thisLocation'/../resources/space/quantity\", 1, actionInstance)"
			]
		}
	}
}
