//A human grouping that performs a repetitive sequence of actions
	//In response to triggering input transforms (actions)
	//The organisation causes actions (transforms) by it's members
data["Organisation"] = {

	//All organisations react to their inputs
		//They can also trigger issues which they react to
		//One of these issues can trigger a new project to be undertaken
		//Another organisation may help realise that project
		//The issue may also be an issue related to the previous project of the organisation

	shop:{
		consumerGoods:{
			amazon:{
				
			},
		},

		clothes:{
		},

		superMarket:{
			coop:{
				
			},
			tesco:{
				
			},
		},

		//Provides raw materials or products 
		//that another firm
		//modifies/uses to make stuff and then sells on
		importSupplier:{
		},
	},

	carryOut:{
		hotWok:{
			_visualisation:{
				shortname:"Hot Wok",
			},
			
			//Organisations that provide services for this organisation
			inputOrganisations:{
			},
			
			//Organisations that make use of services that this organisation provides
			outputOrganisations:{
			},
			
			//An organisation has different interfaces that trigger behaviour
				//One of these can be an online webapp

			//An organisation was created by a project
			//Which in turn was caused by an issue
			cause:undefined,
		},
	},

	delivery:{
		royalMail:{
		},
	},

	bank:{
	},
	
	softwareDeveloper:{
		
	},
};