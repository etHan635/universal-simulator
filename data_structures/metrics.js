data["Metrics"] = {
	visualisation:{
		layout:"Grid"
	},
	totalProduced:{
		visualisation:{
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