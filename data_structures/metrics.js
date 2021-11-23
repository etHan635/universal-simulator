data["Metrics"] = {
	_visualisation:{
		layout:"Grid"
	},
	totalProduced:{
		_visualisation:{
			shortname:"Total Products Created",
		},
		properties:
		{
			total:0,
		},
		
		visible:false,
		conditionOnVisibleAsTarget:{
			hasSome:{
				id:"Metrics/totalProduced/properties/total",
				quantityGreaterThan:0
			},
		},
	},
};