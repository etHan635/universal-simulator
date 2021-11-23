data["Agents"] = {
	_visualisation:{
		shortname:"Agent Types",
	},
	//Type of agent
	player:
	{
		_visualisation:{
			shortname:"Players",
		},
		me:{
			_visualisation:{
				shortname:"Jack",
				firstname:"Jack",
				lastname:"Burton",
				title:"Mr",
			},
			_visible:{
				//what actions are now visible for this character
				actions:{
					walk:"TransformByAgent/walk",
					drive:"TransformByAgent/drive",

					computerPowerOff:"TransformByAgent/computerPowerOff",
					computerPowerOn:"TransformByAgent/computerPowerOn",
					computerLogin:"TransformByAgent/computerLogin",
					computerOpenWebApp:"TransformByAgent/computerOpenWebApp",
					computerCloseActiveWebApp:"TransformByAgent/computerCloseActiveWebApp",
					computerUseWebApp:"TransformByAgent/computerUseWebApp",
					computerSwitchActiveApp:"TransformByAgent/computerSwitchActiveApp",

					moveObject:"TransformByAgent/moveObject",
					getObjectInstance:"TransformByAgent/getObjectInstance",
					storeObjectInstance:"TransformByAgent/storeObjectInstance",
				},
				internetAccounts:{
					bank:"DataStorages/bankAccounts/halifax/properties/accounts/jackBurton",
					shopping:"DataStorages/onlineShoppingAccounts/amazonShoppingBaskets/properties/accounts/jackBurton",
				},
				//Places that this agent knows about
				locations:{
					home:"Locations/garage/homeGarage",
					livingRoom:"Locations/livingroom/homeLivingroom",
					bedRoom:"Locations/bedroom/homeBedroom",
					buildingSupplies:"Locations/shop/buildingSupplies",
					marketStall:"Locations/marketStall/marketStall",
				},
				vehicles:{
					car:"Vehicles/car/car"
				},
				//Agents that this agent knows about
				agents:{},
			},
			resources:{
				funds:{	name:"Funds", quantity:100, },
				motivation:{ name:"Motivation", quantity:100, maxQuantity:100, },
				productivity:{ name:"Productivity", quantity:100, maxQuantity:100, },
				rawMaterial:{ name:"Raw Material", quantity:0, },
				product:{ name:"Product", quantity:0 },
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
		},
	},
	fulfilmentWorker:{
		_visualisation:{
			shortname:"Fulfilment Worker",
		},
		amazonWorker:{
			_visualisation:{
				shortname:"Frank",
				firstname:"Frank",
				lastname:"Peters",
				title:"Mr",
			},
			_visible:{
				actions:{
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
				locations:{},
				vehicles:{},
				agents:{},
				internetAccounts:{
					work:"DataStorages/ticketing/amazon/shoppingOrders/properties/accounts/public",
				},
			},
			resources:{
				motivation:{ name:"Motivation", quantity:100, maxQuantity:100,},
				productivity:{ name:"Productivity", quantity:100, maxQuantity:100,},
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
		},
	},
	deliveryPeople:{
		_visualisation:{
			shortname:"Delivery People",
		},
		deliveryGuy:{
			_visualisation:{
				shortname:"Pete",
				firstname:"Pete",
				lastname:"Charles",
				title:"Mr",
			},	
			_visible:{
				actions:{
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
				locations:{
					amazon:"Locations/amazonWarehouse/amazonWarehouse0",
					deliveryDestination:"Locations/garage/homeGarage",
				},
				vehicles:{
					van:"Vehicles/van/van",
				},
				agents:{},
				internetAccounts:{
					work:"DataStorages/ticketing/royalMail/delivery/properties/accounts/public",
				},
			},

			resources:{ 
				motivation:{ name:"Motivation", quantity:100, maxQuantity:100,},
				productivity:{ name:"Productivity", quantity:100, maxQuantity:100,},
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
		},
	},
	shopKeeper:{
		_visualisation:{
			shortname:"Shopkeepers",
		},
		owner:{
			_visualisation:{
				shortname:"Shopkeeper",
				firstname:"Peter",
				lastname:"James",
				title:"Mr",
			},
			_visible:{
				locations:{
					buildingSupplies:"Locations/shop/buildingSupplies",
				},
			},
			resources:{ 
				motivation:{ name:"Motivation", quantity:100, maxQuantity:100,},
				funds:{	name:"Funds", quantity:100000,},
			},
			properties:{
				role:["salesperson"],
				location:"Locations/shop/buildingSupplies/agents/behindCounter",
			},
		},
	},
	stallKeeper:{
		_visualisation:{
			shortname:"Stallkeepers",
		},
		//When obtained an instance is created
		owner:{
			_visualisation:{
				shortname:"Stallkeeper",
				firstname:"Jessica",
				lastname:"Brown",
				title:"Mrs",
			},
			_visible:{
				locations:{
					marketStall:"Locations/marketStall/marketStall",
				},
			},
			resources:{ 
				motivation:{ name:"Motivation", quantity:100, maxQuantity:100,},
				funds:{ name:"Funds", quantity:1000,},
			},
			properties:{
				role:["salesperson","buyer"],
				location:"Locations/marketStall/marketStall/agents/behindCounter",
			},
		},
	},
	receptionist:{
		_visualisation:{
			shortname:"Receptionists",
		},
		//When obtained an instance is created
		receptionist:{
			_visualisation:{
				shortname:"Receptionist",
				firstname:"Jessica",
				lastname:"Franks",
				title:"Miss",
			},
			_visible:{
				locations:{
					officeReception:"Locations/officeReception/officeReception",
				},
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
		},
	},
	projectManager:{
		_visualisation:{
			shortname:"Project Managers",
		},
		//When obtained an instance is created
		projectManager:{
			_visualisation:{
				shortname:"Manager",
				firstname:"Barry",
				lastname:"Thomas",
				title:"Mr",
			},
			_visible:{
				locations:{
					officeReception:"Locations/officeOpenPlan/officeOpenPlan",
				},
			},
			resources:{
				motivation:{ name:"Motivation",quantity:100,maxQuantity:100,},
			},
			properties:{
				role:["manager"],
				location:"Locations/officeOpenPlan/officeOpenPlan/agents/default",
			},
		},
	},
};
