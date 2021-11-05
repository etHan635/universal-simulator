data["Agents"] = {
	visualisation:{
		shortname:"Agent Types",
	},
	//Type of agent
	player:
	{
		visualisation:{
			shortname:"Players",
		},
		me:{
			visualisation:{
				shortname:"Jack",
				firstname:"Jack",
				lastname:"Burton",
				title:"Mr",
			},
			resources:{
				funds:{
					name:"Funds",
					quantity:100,
				},
				motivation:{
					name:"Motivation",
					quantity:100,
					maxQuantity:100,
				},
				productivity:{
					name:"Productivity",
					quantity:100,
					maxQuantity:100,
				},
				rawMaterial:{
					name:"Raw Material",
					quantity:0
				},
				product:{
					name:"Product",
					quantity:0
				},
			},

			properties:{
				role:[],
				location:"Locations/garage/homeGarage/agents/default",
			},

			mind:{
				loginDetails:[
					"DataStorages/pcHardDrive/harddrive1/properties/accounts/jackBurton",
					"DataStorages/smartPhoneStorage/jackBurtonsPhone/properties/accounts/jackBurton",
					"DataStorages/onlineShoppingAccounts/amazonShoppingBaskets/properties/accounts/jackBurton",
					"DataStorages/bankAccounts/halifax/properties/accounts/jackBurton/currentAccounts/account0",
					"DataStorages/bankAccounts/halifax/properties/accounts/jackBurton/currentAccounts/account0/cards/0123 0123 0123 0123"],
			},

			objects:{
				default:["Computers/smartPhone/jackBurtonsPhone",
						 "Objects/debitCard/0123 0123 0123 0123",
						 "Objects/cheque/unemploymentCheque"],
			},

			//what actions are now visible for this character
			visibleActions:{
				//make:"TransformByAgent/make",
				//buy:"TransformByAgent/buy",
				//sell:"TransformByAgent/sell",
				//pickup:"TransformByAgent/pickup",
				//store:"TransformByAgent/store",

				walk:"TransformByAgent/walk",
				drive:"TransformByAgent/drive",
				
				//*
				computerPowerOff:"TransformByAgent/computerPowerOff",
				computerPowerOn:"TransformByAgent/computerPowerOn",
				computerLogin:"TransformByAgent/computerLogin",
				computerOpenWebApp:"TransformByAgent/computerOpenWebApp",
				computerCloseActiveWebApp:"TransformByAgent/computerCloseActiveWebApp",
				computerUseWebApp:"TransformByAgent/computerUseWebApp",
				computerSwitchActiveApp:"TransformByAgent/computerSwitchActiveApp",
				//*/
				
				moveObject:"TransformByAgent/moveObject",
				getObjectInstance:"TransformByAgent/getObjectInstance",
				storeObjectInstance:"TransformByAgent/storeObjectInstance",
				//*/
			},

			visibleInternetAccounts:{
				bank:"DataStorages/bankAccounts/halifax/properties/accounts/jackBurton",
				shopping:"DataStorages/onlineShoppingAccounts/amazonShoppingBaskets/properties/accounts/jackBurton",
			},
			
			//Places that this agent knows about
			visibleLocations:{
				home:"Locations/garage/homeGarage",
				livingRoom:"Locations/livingroom/homeLivingroom",
				bedRoom:"Locations/bedroom/homeBedroom",
				buildingSupplies:"Locations/shop/buildingSupplies",
				marketStall:"Locations/marketStall/marketStall",
			},

			visibleVehicles:{
				car:"Vehicles/car/car"
			},
			
			//Agents that this agent knows about
			visibleAgents:{
			},
			
			//what actions is this character currently doing
			//when the action is complete the output is generated
			currentActions:{
				//Actions are enabled or paused
				//They have an amount of work todo motivation*productivity*time
			},
		},
	},
	fulfilmentWorker:{
		visualisation:{
			shortname:"Fulfilment Worker",
		},
		amazonWorker:{
			visualisation:{
				shortname:"Frank",
				firstname:"Frank",
				lastname:"Peters",
				title:"Mr",
			},
			resources:{
				motivation:{
					name:"Motivation",
					quantity:100,
					maxQuantity:100,
				},
				productivity:{
					name:"Productivity",
					quantity:100,
					maxQuantity:100,
				},
			},

			properties:{
				role:[],
				location:"Locations/amazonWarehouse/amazonWarehouse0/agents/default",
			},

			ai:"AIs/agent0",

			mind:{
				loginDetails:[
					"DataStorages/smartPhoneStorage/frankPetersPhone/properties/accounts/frankPeters",	
					"DataStorages/ticketing/amazon/shoppingOrders/properties/accounts/public",
				],
			},

			objects:{
				default:["Computers/smartPhone/frankPetersPhone"],
			},

			//what actions are now visible for this character
			visibleActions:{
				//*
				computerPowerOff:"TransformByAgent/computerPowerOff",
				computerPowerOn:"TransformByAgent/computerPowerOn",
				computerLogin:"TransformByAgent/computerLogin",
				computerOpenWebApp:"TransformByAgent/computerOpenWebApp",
				computerCloseActiveWebApp:"TransformByAgent/computerCloseActiveWebApp",
				computerUseWebApp:"TransformByAgent/computerUseWebApp",
				computerSwitchActiveApp:"TransformByAgent/computerSwitchActiveApp",
				//*/
				getObjectInstance:"TransformByAgent/getObjectInstance",
				storeObjectInstance:"TransformByAgent/storeObjectInstance",
				moveObject:"TransformByAgent/moveObject",
			},
			
			//Places that this agent knows about
			visibleLocations:{
			},

			visibleVehicles:{
			},
			
			//Agents that this agent knows about
			visibleAgents:{
			},
			
			visibleInternetAccounts:{
				work:"DataStorages/ticketing/amazon/shoppingOrders/properties/accounts/public",
			},
			//what actions is this character currently doing
			//when the action is complete the output is generated
			currentActions:{
				//Actions are enabled or paused
				//They have an amount of work todo motivation*productivity*time
			},
		},
	},
	deliveryPeople:
	{
		visualisation:{
			shortname:"Delivery People",
		},
		deliveryGuy:{
			visualisation:{
				shortname:"Pete",
				firstname:"Pete",
				lastname:"Charles",
				title:"Mr",
			},
			resources:{
				motivation:{
					name:"Motivation",
					quantity:100,
					maxQuantity:100,
				},
				productivity:{
					name:"Productivity",
					quantity:100,
					maxQuantity:100,
				},
			},

			properties:{
				role:[],
				location:"Locations/amazonWarehouse/amazonWarehouse0/agents/default",
			},

			mind:{
				loginDetails:[
					"DataStorages/smartPhoneStorage/peteCharlesPhone/properties/accounts/peteCharles",	
					"DataStorages/ticketing/royalMail/delivery/properties/accounts/public",
				],
			},

			objects:{
				default:["Computers/smartPhone/peteCharlesPhone"],
			},

			//what actions are now visible for this character
			visibleActions:{
				walk:"TransformByAgent/walk",
				drive:"TransformByAgent/drive",

				computerPowerOff:"TransformByAgent/computerPowerOff",
				computerPowerOn:"TransformByAgent/computerPowerOn",
				computerLogin:"TransformByAgent/computerLogin",
				computerOpenWebApp:"TransformByAgent/computerOpenWebApp",
				computerCloseActiveWebApp:"TransformByAgent/computerCloseActiveWebApp",
				computerUseWebApp:"TransformByAgent/computerUseWebApp",
				computerSwitchActiveApp:"TransformByAgent/computerSwitchActiveApp",

				getObjectInstance:"TransformByAgent/getObjectInstance",
				storeObjectInstance:"TransformByAgent/storeObjectInstance",
				moveObject:"TransformByAgent/moveObject",
			},
			
			//Places that this agent knows about
			visibleLocations:{
				amazon:"Locations/amazonWarehouse/amazonWarehouse0",
				deliveryDestination:"Locations/garage/homeGarage",
			},

			visibleVehicles:{
				van:"Vehicles/van/van",
			},
			
			//Agents that this agent knows about
			visibleAgents:{
			},
			
			visibleInternetAccounts:{
				work:"DataStorages/ticketing/royalMail/delivery/properties/accounts/public",
			},

			//what actions is this character currently doing
			//when the action is complete the output is generated
			currentActions:{
				//Actions are enabled or paused
				//They have an amount of work todo motivation*productivity*time
			},
		},
	},
	shopKeeper:
	{
		visualisation:{
			shortname:"Shopkeepers",
		},
		owner:{
			visualisation:{
				shortname:"Shopkeeper",
				firstname:"Peter",
				lastname:"James",
				title:"Mr",
			},
						
			resources:{
				motivation:{
					name:"Motivation",
					quantity:100,
					maxQuantity:100,
				},
				funds:{
					name:"Funds",
					quantity:100000,
				},
			},

			properties:{
				role:["salesperson"],
				location:"Locations/shop/buildingSupplies/agents/behindCounter",
			},

			//what actions are now visible for this character
			visibleActions:{
			},
			//Places that this agent knows about
			visibleLocations:{
				buildingSupplies:"Locations/shop/buildingSupplies",
			},
			//Agents that this agent knows about
			visibleAgents:{
			},
			
			//what actions is this character currently doing
			//when the action is complete the output is generated
			currentActions:{
				//Actions are enabled or paused
				//They have an amount of work todo motivation*productivity*time
			},
		},
	},
	stallKeeper:
	{
		visualisation:{
			shortname:"Stallkeepers",
		},
		//When obtained an instance is created
		owner:{
			visualisation:{
				shortname:"Stallkeeper",
				firstname:"Jessica",
				lastname:"Brown",
				title:"Mrs",
			},
						
			resources:{
				motivation:{
					name:"Motivation",
					quantity:100,
					maxQuantity:100,
				},
				funds:{
					name:"Funds",
					quantity:1000,
				},
			},

			properties:{
				role:["salesperson","buyer"],
				location:"Locations/marketStall/marketStall/agents/behindCounter",
			},

			//what actions are now visible for this character
			visibleActions:{
			},
			//Places that this agent knows about
			visibleLocations:{
				marketStall:"Locations/marketStall/marketStall",
			},
			//Agents that this agent knows about
			visibleAgents:{
			},
			
			//what actions is this character currently doing
			//when the action is complete the output is generated
			currentActions:{
				//Actions are enabled or paused
				//They have an amount of work todo motivation*productivity*time
			},
		},
	},
	receptionist:
	{
		visualisation:{
			shortname:"Receptionists",
		},
		//When obtained an instance is created
		receptionist:{
			visualisation:{
				shortname:"Receptionist",
				firstname:"Jessica",
				lastname:"Franks",
				title:"Miss",
			},
						
			resources:{
				motivation:{
					name:"Motivation",
					quantity:100,
					maxQuantity:100,
				},
			},

			properties:{
				role:["receptionist"],
				location:"Locations/officeReception/officeReception/agents/behindCounter",
			},

			//what actions are now visible for this character
			visibleActions:{
			},
			//Places that this agent knows about
			visibleLocations:{
				officeReception:"Locations/officeReception/officeReception",
			},
			//Agents that this agent knows about
			visibleAgents:{
			},
			
			//what actions is this character currently doing
			//when the action is complete the output is generated
			currentActions:{
				//Actions are enabled or paused
				//They have an amount of work todo motivation*productivity*time
			},
		},
	},
	projectManager:
	{
		visualisation:{
			shortname:"Project Managers",
		},
		//When obtained an instance is created
		projectManager:{
			visualisation:{
				shortname:"Manager",
				firstname:"Barry",
				lastname:"Thomas",
				title:"Mr",
			},
						
			resources:{
				motivation:{
					name:"Motivation",
					quantity:100,
					maxQuantity:100,
				},
			},

			properties:{
				role:["manager"],
				location:"Locations/officeOpenPlan/officeOpenPlan/agents/default",
			},

			//what actions are now visible for this character
			visibleActions:{
			},
			//Places that this agent knows about
			visibleLocations:{
				officeReception:"Locations/officeOpenPlan/officeOpenPlan",
			},
			//Agents that this agent knows about
			visibleAgents:{
			},
			
			//what actions is this character currently doing
			//when the action is complete the output is generated
			currentActions:{
				//Actions are enabled or paused
				//They have an amount of work todo motivation*productivity*time
			},
		},
	},
};
