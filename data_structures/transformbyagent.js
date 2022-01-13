//Action by an agent (the player or an instance of an agent)
data["TransformByAgent"] = {
	//Move to another location
	walk:{
		_visualisation:{
			shortname:"Walk",
		},
		duration:1.0,
		parameters:[
		{
			name:"thisLocation",
			//Path to the lists of possible objects
			toSelect:{
				isRelative:"properties/location",
			},
			//List of conditions that an object is a valid option
			conditions:[
			],
		},
		{
			name:"thatLocation",
			//Path to the lists of possible objects
			toSelect:{
				isOneOfRelative:["visibleLocations"],
			},
			//List of conditions that an object is a valid option
			conditions:[
				{
					id:true,
					isNotId:"thisLocation/../..",
				}
			],
		},
		{
			name:"thatPosition",
			//Path to the lists of possible objects
			toSelect:{
				isOneOf:["thatLocation/agents"],
			},
			//List of conditions that an object is a valid option
			conditions:[
			],
		},
		],
		input:{
			//Make the properties that are consumed based on the properties
			//of the agent
			agentMotivation:{
				id:"this/resources/motivation/quantity",
				quantity:-1,
			},
			agentLocation:{
				id:"this/properties/location",
				setProperty:"Locations/traveling",
			},
			locationAgents:{
				id:"thisLocation",
				removeProperty:"this",
			},
			//Takes up space of target at begining of action
			targetSpace:{
				id:"thatLocation/resources/space/quantity",
				quantity:-1,
			},
		},
		output:{
			agentLocation:{
				id:"this/properties/location",
				setProperty:"thatPosition",
			},
			locationAgents:{
				id:"thatPosition",
				addProperty:"this",
			},
			//Removing the space taken up by the person moving
			space:{
				id:"thisLocation/../../resources/space/quantity",
				quantity:1,
			},
		},
	},

	drive:{
		_visualisation:{
			shortname:"Drive",
		},
		
		duration:1.0,

		//List of conditions on whether this action can be performed by this object
		canAct:
		[
		],

		parameters:
		[
		{
			name:"thisLocation",
			//Path to the lists of possible objects
			toSelect:{
				isRelative:"properties/location",
			},
			//List of conditions that an object is a valid option
			conditions:[
			],
		},
		{
			name:"thisVehicle",
			//Path to the lists of possible objects
			toSelect:{
				isOneOfRelative:["visibleVehicles"],
			},
			//List of conditions that an object is a valid option
			conditions:[
			{
				relativePropertyId:"properties/location/../../",
				isId:"thisLocation/../../",
			},
			],
		},
		{
			name:"thatLocation",
			//Path to the lists of possible objects
			toSelect:{
				isOneOfRelative:["visibleLocations"],
			},
			//List of conditions that an object is a valid option
			conditions:[
			{
				id:true,
				isNotId:"thisLocation/../..",
			},
			{
				relativeProperty:"vehicles",
				exists:true,
			}
			],
		},
		{
			name:"thatPosition",
			toSelect:{
				isOneOf:["thatLocation/agents"],
			},
			conditions:[
			],
		},
		{
			name:"thatParkingSpace",
			toSelect:{
				isOneOf:["thatLocation/vehicles"],
			},
			conditions:[
			],
		},
		],
	
		input:{
			//Make the properties that are consumed based on the properties
			//of the agent
			agentMotivation:{
				id:"this/resources/motivation/quantity",
				quantity:-1,
			},
			agentLocation:{
				id:"this/properties/location",
				setProperty:"Locations/traveling",
			},
			vehicleLocation:{
				id:"thisVehicle/properties/location",
				setProperty:"Locations/traveling",
			},
			locationAgents:{
				id:"thisLocation",
				removeProperty:"this",
			},
			locationVehicles:{
				id:"thisVehicle/properties/location/..",
				removeProperty:"thisVehicle",
			},
			//Takes up space of target at begining of action
			targetSpace:{
				id:"thatLocation/resources/space/quantity",
				quantity:-1,
			},
			targetParkingSpace:{
				id:"thatLocation/resources/parkingSpace/quantity",
				quantity:-1,
			},
		},
		output:{
			agentLocation:{
				id:"this/properties/location",
				setProperty:"thatPosition",
			},
			vehicleLocation:{
				id:"thisVehicle/properties/location",
				setProperty:"thatParkingSpace",
			},
			locationAgents:{
				id:"thatPosition",
				addProperty:"this",
			},
			locationVehicles:{
				id:"thatParkingSpace",
				addProperty:"thisVehicle",
			},
			//Removing the space taken up by the person moving
			space:{
				id:"thisLocation/../../resources/space/quantity",
				quantity:1,
			},
			parkingSpace:{
				id:"thisLocation/../../resources/parkingSpace/quantity",
				quantity:1,
			},
		},
	},

	//All actions are generic
	computerPowerOff:{
		_visualisation:{
			shortname:"Power Off",
		},
		
		duration:0.2,

		//List of conditions on whether this action can be performed by this object
		canAct:
		[
		{
			relativeProperty:"resources/motivation/quantity",
			isGreaterThan:0,
		},
		],

		parameters:
		[
		//Which computer
		{
			name:"thisComputer",
			//Path to the lists of possible objects
			toSelect:{
				isOneOfRelative:["properties/location/../../objects/default","objects/default"],
			},
			//List of conditions that an object is a valid option
			conditions:[
			{
				relativeProperty:"properties/state",
				isOneOfLiteral:[
					"On",
					"ScreenLock",
				],
			},
			//Need to have all the apps closed before turning it off
			{
				relativeProperty:"properties/runningWebPages",
				numberOfProperties:0,
			},
			{
				relativeProperty:"properties/runningGuiApplications",
				numberOfProperties:0,
			},
			],
		},
		],

		input:{
		},
		output:{
			state:{
				id:"thisComputer/properties/state",
				setProperty:"Off",
			},
		},
	},
	computerPowerOn:{
		_visualisation:{
			shortname:"Power On",
		},
		
		duration:0.2,

		//List of conditions on whether this action can be performed by this object
		canAct:
		[
		{
			relativeProperty:"resources/motivation/quantity",
			isGreaterThan:0,
		},
		],

		parameters:
		[
		//Which computer
		{
			name:"thisComputer",
			//Path to the lists of possible objects
			toSelect:{
				isOneOfRelative:["properties/location/../../objects/default","objects/default"],
			},
			//List of conditions that an object is a valid option
			conditions:[
			{
				relativeProperty:"properties/state",
				isOneOfLiteral:[
					"Off",
				],
			}
			],
		},
		],

		input:{
		},
		output:{
			state:{
				id:"thisComputer/properties/state",
				setProperty:"ScreenLock",
			},
		},
	},
	computerLogin:{
		_visualisation:{
			shortname:"Login",
		},
		
		duration:0.2,

		canAct:
		[
		],
		
		parameters:
		[
		//Which computer
		{
			name:"thisComputer",
			//Path to a reference to another object
			toSelect:{
				isOneOfRelative:["properties/location/../../objects/default","objects/default"],
			},
			conditions:[
			{
				relativeProperty:"properties/state",
				isOneOfLiteral:[
					"ScreenLock",
				],
			}
			],
		},
		//Which storage
		{
			//The agent knows the login details
			name:"thisStorage",
			toSelect:{
				isOneOf:["thisComputer/properties/mountedStorage"],
			},
			conditions:[
				//either no accounts
				
				//
			],
		},		
		{
			//The agent knows the login details
			name:"thisAccount",
			toSelect:{
				isOneOf:["thisStorage/properties/accounts"],
			},
			conditions:[
			{
				relativePropertyId:"",
				isOneOf:["this/mind/loginDetails"],
			},
			],
		},	
		],

		input:{
		},
		output:{
			state:{
				id:"thisComputer/properties/state",
				setProperty:"On",
			},
		},
	},

	computerUseWebApp:{
		_visualisation:{
			shortname:"Use Web App",
		},
		
		duration:0.2,

		canAct:
		[
			
		],
		
		parameters:
		[
		//Which computer
		{
			name:"thisComputer",
			//Path to a reference to another object
			toSelect:{
				isOneOfRelative:["properties/location/../../objects/default","objects/default"],
			},
			conditions:[
			{
				relativeProperty:"properties/state",
				isOneOfLiteral:["On"],
			}
			],
		},			
		{
			name:"thisWebSession",
			toSelect:{
				is:"thisComputer/properties/activeApplication/webSession",
			},
		},
		{
			name:"thisAction",
			toSelect:{
				isOneOf:["thisComputer/properties/activeApplication/webSession/../../webApp/transforms"],
			},
		},
		],
		
		//Sub tasks to be executed
		subRoutines:[{action:"thisAction",params:{}}],
	},

	computerSwitchActiveApp:{
				_visualisation:{
			shortname:"Switch Active Web App",
		},
		
		duration:0.2,

		canAct:
		[
			
		],
		
		parameters:
		[
		//Which computer
		{
			name:"thisComputer",
			//Path to a reference to another object
			toSelect:{
				isOneOfRelative:["properties/location/../../objects/default","objects/default"],
			},
			conditions:[
			{
				relativeProperty:"properties/state",
				isOneOfLiteral:["On"],
			}
			],
		},			
		{
			name:"thisApplication",
			toSelect:{
				isOneOf:["thisComputer/properties/runningWebPages",
							"thisComputer/properties/runningGuiApplications"],
			},
			conditions:[
			{
				id:true,
				isNotId:"*thisComputer/properties/activeApplication",
			}
			],
		},
		//Get the next application that isn't the active one
		//That will become the active application
		],
		
		input:{
			activeApplicaiton:{
				id:"thisComputer/properties/activeApplication",
				setProperty:"thisApplication",
			},
		},
		output:{
		},
	},
	
	computerCloseActiveWebApp:{
		_visualisation:{
			shortname:"Close Active Web App",
		},
		
		duration:0.2,

		canAct:
		[
			
		],
		
		parameters:
		[
		//Which computer
		{
			name:"thisComputer",
			//Path to a reference to another object
			toSelect:{
				isOneOfRelative:["properties/location/../../objects/default","objects/default"],
			},
			conditions:[
			{
				relativeProperty:"properties/state",
				isOneOfLiteral:["On"],
			}
			],
		},			
		{
			name:"thisApplication",
			toSelect:{
				is:"thisComputer/properties/activeApplication",
			},
			conditions:[
			{
				//Has a websession connection
				relativeProperty:"webSession",
				exists:true,
			},				
			],
		},
		//Get the next application that isn't the active one
		//That will become the active application
		],
		
		input:{
			/*
			thisWebPage:{
				id:"thisComputer/properties/runningWebPages",
				addObject:{
					application:"thisApplication",
					webSession:undefined,
					malware:"",
				},
				addToParams:"thisWebPage",
			},
			activeApplicaiton:{
				id:"thisComputer/properties/activeApplication",
				setProperty:"thisWebPage",
			},
			*/
		},
		output:{
			//Remove the websession from the server
			/*
			thisWebSession:{
				//Find the computer that the web account is attached to
				id:"thisWebAccount/../../connectedToComputer/properties/runningWebSessions",
				//Add a websession to the server
				//Set the connected client
				//Set the current Account
				addObject:{
					state:"default",
					connectedClient:"thisWebPage",
					currentAccount:"thisWebAccount",
				},
				addToParams:"thisWebSession",
			},
			*/
		},
	},
	
	computerOpenWebApp:{
		_visualisation:{
			shortname:"Open Web App",
		},
		
		duration:0.2,

		canAct:
		[
		],
		
		parameters:
		[
		//Which computer
		{
			name:"thisComputer",
			//Path to a reference to another object
			toSelect:{
				isOneOfRelative:["properties/location/../../objects/default","objects/default"],
			},
			conditions:[
			{
				relativeProperty:"properties/state",
				isOneOfLiteral:["On"],
			}
			],
		},
		//Which hard drive do we look for a web browser?
		{
			//The agent knows the login details
			name:"thisAccount",
			toSelect:{
				is:"thisComputer/properties/currentAccount",
			},
			conditions:[
			],
		},		
		//Which storage
		{
			//The agent knows the login details
			name:"thisStorage",
			toSelect:{
				isOneOf:["thisComputer/properties/mountedStorage"],
			},
			conditions:[
			],
		},		
		{
			//The agent knows the login details
			name:"thisApplication",
			toSelect:{
				either:[
				{
					isOneOf:["thisStorage/properties/accounts/public/applications"],
				},
				{
					isOneOf:["thisAccount/applications"],
				},
				]
			},
			conditions:[
			{
				relativeProperty:"properties/isWebBrowser",
				isOneOfLiteral:[true],
			},
			],
		},		
		//Which application that is a web browser?		
		//Which known web address do we use?
		{
			name:"thisWebAccount",
			toSelect:{
				isOneOfRelative:["visibleInternetAccounts"],
			},
			conditions:[
			//{
				//The account is attached to a computer that is on and connected to the internet
			//},
			],
		},		
		],

		input:{
			thisWebPage:{
				id:"thisComputer/properties/runningWebPages",
				addObject:{
					application:"thisApplication",
					webSession:undefined,
					malware:"",
				},
				addToParams:"thisWebPage",
			},
			activeApplicaiton:{
				id:"thisComputer/properties/activeApplication",
				setProperty:"thisWebPage",
			},
		},
		output:{
			thisWebSession:{
				//Find the computer that the web account is attached to
				id:"thisWebAccount/../../connectedToComputer/properties/runningWebSessions",
				//Add a websession to the server
				//Set the connected client
				//Set the current Account
				addObject:{
					state:"default",
					connectedClient:"thisWebPage",
					currentAccount:"thisWebAccount",
				},
				addToParams:"thisWebSession",
			},
			thisWebPageSession:{
				id:"thisWebPage/webSession",
				setProperty:"thisWebSession",
			},
			//Malware?
		},
	},
	
	webAppShopping_addToCart:{
		_visualisation:{
			shortname:"Add to cart",
		},
		
		duration:0.2,

		canAct:
		[
		],
		
		parameters:
		[
		//Where are the products stored
		{
			name:"thisProductStorage",
			toSelect:{
				isOneOf:["thisWebSession/../../mountedStorage"],
			},
			conditions:[
			],
		},
		{
			name:"thisProduct",
			toSelect:{
				isRecursiveChildOf:"thisProductStorage/properties/accounts/public/files",
				numRedirections:10,
			},
			conditions:[
			{
				//Has a price
				relativeProperty:"price",
				exists:true,
			},
			{
				id:true,
				isNot:{
					id:true,
					relativeOneOf:["thisWebSession/currentAccount/files/openCart/products"],
					relativeOneOfProperty:"productid",
				},
			},
			],
		},
		{
			name:"thisQuantity",
			toSelect:{
				number:1,
			},
			conditions:[],
		},
		],

		input:{
		},
		output:{
			//*
			addToCart:{
				id:"thisWebSession/currentAccount/files/openCart/products",
				addObject:{
					_visualisation:{
						shortname:"*thisProduct/visualisation/shortname",
					},
					productid:"thisProduct",
					quantity:"thisQuantity",
					price:"*thisProduct/price",
				},
			},
			totalCost:{
				id:"thisWebSession/currentAccount/files/openCart/totalCost",
				quantity:{
					multiply:[
						"thisProduct/price",
						"thisQuantity",
					],
				},
			},
		},
	},
	webAppShopping_removeFromCart:{
		_visualisation:{
			shortname:"Remove from cart",
		},
		
		duration:0.2,

		canAct:
		[
		],
		
		parameters:
		[
		//Where are the products stored
		{
			name:"thisProduct",
			toSelect:{
				isOneOf:["thisWebSession/currentAccount/files/openCart/products"],
			},
			conditions:[
			],
		},
		],

		input:{
		},
		output:{
			removeFromCart:{
				id:"thisWebSession/currentAccount/files/openCart",
				removeProperty:"thisProduct",
			},
		},
	},
	webAppShopping_completeOrder:{
		_visualisation:{
			shortname:"Complete order",
		},
		
		duration:0.2,

		canAct:
		[
		],
		
		parameters:
		[
		//Where fulfilment goes
		{
			name:"thisFulfilmentTasks",
			
			toSelect:{
				is:"thisWebSession/../../usingApis/orderFulfilment",
			},
			conditions:[
			],
		},
		{
			name:"thisDeliveryTasks",
			
			toSelect:{
				isOneOf:["thisWebSession/../../usingApis/delivery"],
			},
			conditions:[
			],
		},
		//Where the money is paid to
		{
			name:"thisShopAccount",
			
			toSelect:{
				is:"thisFulfilmentTasks/paymentAccount",
			},
			conditions:[
			],
		},		

		{
			name:"thisDeliveryAccount",
			
			toSelect:{
				is:"thisDeliveryTasks/paymentAccount",
			},
			conditions:[
			],
		},		

		{
			name:"thisTaxationAccount",
			
			toSelect:{
				is:"thisWebSession/../../usingApis/taxation",
			},
			conditions:[
			],
		},		

		//Select the payment account
		{
			name:"thisCustomerAccount",
			
			toSelect:{
				isOneOf:["this/mind/loginDetails"],
			},
			conditions:[
			{
				//Is a payment card
				relativeProperty:"pin",
				exists:true,
			},
			],
		},
		
		//Where are the products are stored
		{
			name:"thisOrder",
			toSelect:{
				is:"thisWebSession/currentAccount/files/openCart",
			},
			conditions:[
			{
				relativePropertyNumberOfProperties:"products",
				isGreaterThan:0,
			}
			],
		},
		{
			name:"thisWarehouse",
			
			toSelect:{
				is:"thisWebSession/../../warehouse",
			},
			conditions:[
			],
		},
		{
			name:"thisDestination",
			
			toSelect:{
				isOneOf:["this/visibleLocations"],
			},
			conditions:[
			],
		},
		{
			name:"thisDeliveryCost",
			
			toSelect:{
				number:1.0,
			},
			conditions:[
			],
		},
		],

		input:{
			//Setup delivery information for openCart
			//Remove from openCart
			removeCart:{
				id:"thisWebSession/currentAccount/files",
				removeProperty:"thisWebSession/currentAccount/files/openCart",
				addToParams:"thisCart",
			},			
			addCart:{
				id:"thisWebSession/currentAccount/files/waitingOrders",
				addObject:"thisCart",
				addToParams:"thisFulfilmentTask",
			},
			addDeliveryInformation:{
				id:"thisFulfilmentTask/delivery",
				addObject:{
					source:"thisWarehouse",
					destination:"thisDestination",
					price:"thisDeliveryCost",
				},
				addToParams:"thisDeliveryTask",
			},
			addDeliveryCostToTotal:{
				id:"thisFulfilmentTask/totalCost",
				quantity:"thisDeliveryCost",
				addToParams:"thisTotalCost",
			},
			calcVAT:{
			//doesn't alter the data, just performs a calculation and adds to params
				temporary:true, 
				quantity:{
					multiply:[
						"thisTotalCost",
						0.2,
					],
				},
				addToParams:"thisVAT",
			},
			newCart:{
				id:"thisWebSession/currentAccount/files/openCart",
				addObject:{
					objects:{}, //These are the physical objects that are the products of the order
					products:{},
					totalCost:0,					
				},
			},
			//Place in waiting to complete

		},
		output:{
			//Pay the VAT to the government
		},
		
		//Fullfilment server add to ticketing system
		subRoutines:[
		{
			action:"TransformByAgent/kanban_addTask",
			params:{thisTask:"thisFulfilmentTask",thisTasks:"thisFulfilmentTasks"}
		},
		{
			action:"TransformByAgent/kanban_addTask",
			params:{thisTask:"thisDeliveryTask",thisTasks:"thisDeliveryTasks"}
		},
		//Get the money from the customer
		{
			action:"TransformByAgent/payment_transferFunds",
			params:{fromAccount:"thisCustomerAccount",toAccount:"thisShopAccount",thisQuantity:"thisTotalCost",thisRecord:"thisFulfilmentTask"},
		},
		//Pay the delivery company
		{
			action:"TransformByAgent/payment_transferFunds",
			params:{fromAccount:"thisShopAccount",toAccount:"thisDeliveryAccount",thisQuantity:"thisDeliveryCost",thisRecord:"thisDeliveryTask"},
		},
		//Pay the government VAT
		{
			action:"TransformByAgent/payment_transferFunds",
			params:{fromAccount:"thisShopAccount",toAccount:"thisTaxationAccount",thisQuantity:"thisVAT"},
		},
		],

	},
	
	//A subroutine, the caller must know the parameters
	//That need to be setup before calling this function
	kanban_addTask:{
		_visualisation:{
			shortname:"Add Task",
		},
		
		duration:0.2,

		canAct:
		[
		],
		
		parameters:
		[
		],

		input:{
		},

		output:{
			addTask:{
				id:"thisTasks/todo",
				addObject:{
					details:"thisTask",
					owner:undefined,
				},
			},
		},
	},

	//Add to a kanban task details
		//For example add a reference to a physical object
	kanban_addObjectToTaskDetail:{
		_visualisation:{
			shortname:"Add Object reference to Task",
		},
		
		duration:0.2,

		canAct:
		[
		],
		
		parameters:
		[
		{
			name:"thisObject",
			toSelect:{
				either:[
				{
					isRecursiveChildOf:"this/objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				//*
				{
					isRecursiveChildOf:"this/properties/location/../../objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				//*/
				{
					isRecursiveChildOf:"this/properties/location/../../vehicles",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				]
			},
			conditions:[
			{
				//Has properties (so is probably an object, although might need to check this)
				relativeProperty:"example",
				exists:true,
			},				
			{
				//Has properties (so is probably an object, although might need to check this)
				relativeProperty:"",
				either:[
				{
					relativeProperty:"type",
					startsWithLiteral:"Objects",
				},
				{
					relativeProperty:"type",
					startsWithLiteral:"Computers",
				},
				],
			},				
			],
		},
		{
			name:"thisTask",
			toSelect:{
				isOneOf:["thisWebSession/currentAccount/files/inProgress"],
			},
			conditions:[
			{
				relativeProperty:"owner",
				isId:"this",
			},				
			],
		},
		{
			name:"thisDetail",
			toSelect:{
				isRecursiveChildOf:"*thisTask/details",
				//numRedirections:0,
				//skipProperties:["location","example","type"],
			},
			conditions:[
			{
				property:true,
				type:"object",
			},				
			],
		},
		],

		input:{
		},

		output:{
			setOwner:{
				id:"thisDetail",
				addProperty:"thisObject",
			},
		},
	},

	//A subroutine, the caller must know the parameters
	//That need to be setup before calling this function
	kanban_assignOwnershipOfTask:{
		_visualisation:{
			shortname:"Assign Ownership",
		},
		
		duration:0.2,

		canAct:
		[
		],
		
		parameters:
		[
		{
			name:"thisTask",
			toSelect:{
				isOneOf:["thisWebSession/currentAccount/files/todo"],
			},
			conditions:[
			],
		},
		{
			name:"thisOwner",
			toSelect:{
				either:[
				{
					is:"&this",
				},
				{
					isOneOf:["this/visibleAgents"],
				},
				],
			},
			conditions:[
			],
		},
		],

		input:{
			removeTask:{
				id:"thisWebSession/currentAccount/files/todo",
				removeProperty:"thisTask",
				addToParams:"thisOldTask",
			},
		},

		output:{
			addTask:{
				id:"thisWebSession/currentAccount/files/inProgress",
				addObject:"thisOldTask",
				addToParams:"thisNewTask",
			},
			setOwner:{
				id:"thisNewTask/owner",
				setProperty:"thisOwner",
			},
		},
	},
	kanban_completeTask:{
		_visualisation:{
			shortname:"Complete Task",
		},
		
		duration:0.2,

		canAct:
		[
		],
		
		parameters:
		[
		{
			name:"thisTask",
			toSelect:{
				isOneOf:["thisWebSession/currentAccount/files/inProgress"],
			},
			conditions:[
			{
				relativeProperty:"owner",
				isId:"this",
			},
			],
		},
		],

		input:{
			removeTask:{
				id:"thisWebSession/currentAccount/files/inProgress",
				removeProperty:"thisTask",
				addToParams:"thisOldTask",
			},
		},

		output:{
			addTask:{
				id:"thisWebSession/currentAccount/files/done",
				addObject:"thisOldTask",
			},
		},
	},

	payment_transferFunds:{
		_visualisation:{
			shortname:"Transfer Funds",
		},
		
		duration:0.1,

		canAct:
		[
		],
		
		parameters:
		[
		],

		input:{
			removeQuantity:{
				id:"fromAccount/quantity",
				quantity:{
					multiply:[
						-1.0,
						"thisQuantity",
					]
				},
			},
		},

		output:{
			addQuantity:{
				id:"toAccount/quantity",
				quantity:"thisQuantity",
			},
			addFrom:{
				id:"fromAccount/transactions",
				addObject:{
					from:"fromAccount",
					to:"toAccount",
					quantity:"thisQuantity",
				},
				addToParams:"thisFromTransaction",
			},
			addTo:{
				id:"toAccount/transactions",
				addObject:{
					from:"fromAccount",
					to:"toAccount",
					quantity:"thisQuantity",
				},
				addToParams:"thisToTransaction",
			},
			recordTransaction:{
				id:"thisRecord",
				ifTest:{
					test:{
						property:true,
						exists:true,
					},
					ifTrue:{
						id:"thisRecord/payment",
						addObject:{
							from:"thisFromTransaction",
							to:"thisToTransaction",
							quantity:"thisQuantity",
						},
					},
					ifFalse:{
					},
				},
			},
			
		},
	},

	//Take a quantity that is expressed as a resource
	//Convert into a unique instance
	getObjectInstance:{
		_visualisation:{
			shortname:"Get Object",
		},
		
		duration:0.2,

		canAct:
		[
		],
		
		parameters:
		[
		{
			name:"thisResource",
			toSelect:{
				either:[
				{
					isRecursiveChildOf:"this/resources",
					skipProperties:["location","example","type"],
				},
				{
					isRecursiveChildOf:"this/properties/location/../../resources",
					skipProperties:["location","example","type"],
				},
				{
					isRecursiveChildOf:"this/properties/location/../../objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				{
					isRecursiveChildOf:"this/properties/location/../../vehicles",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				{
					isRecursiveChildOf:"this/objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				]
			},
			conditions:[
			{
				//Has a objects
				relativeProperty:"example",
				exists:true,
			},				
			{
				//Has a objects
				relativeProperty:"quantity",
				exists:true,
			},				
			],
		},
		{
			name:"thisLocation",
			toSelect:{
				either:[
				{
					isRecursiveChildOf:"this/objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				//*
				{
					isRecursiveChildOf:"this/properties/location/../../objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				//*/
				{
					isRecursiveChildOf:"this/properties/location/../../vehicles",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				]
			},
			conditions:[
			//Is a place that can take objects
			{
				//Has a objects
				relativeChildId:"..",
				isOneOfLiteral:["objects"],
			},				
			],
		},
		],

		input:{
			//Remove resource
			removeResource:{
				id:"thisResource/quantity",
				quantity:-1,
			},
		},

		output:{
			addObject:{
				id:"*thisResource/example/type",
				addObject:"*thisResource/example",
				addToParams:"thisNewObject",
			},
			placeInLocation:{
				id:"thisLocation", //points to the array that is a type of location for the objects
				addProperty:"thisNewObject",
				addToParams:"thisNewLocation",
			},
			updateLocation:{
				id:"thisNewObject/properties/location",
				setProperty:"thisLocation", 
			},
		},
	},
	
	moveObject:{
		_visualisation:{
			shortname:"Move Object",
		},
		
		duration:0.2,

		canAct:
		[
		],
		
		parameters:
		[
		{
			name:"thisObject",
			toSelect:{
				either:[
				{
					isRecursiveChildOf:"this/objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				//*
				{
					isRecursiveChildOf:"this/properties/location/../../objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				//*/
				{
					isRecursiveChildOf:"this/properties/location/../../vehicles",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				]
			},
			conditions:[
			{
				//Has properties (so is probably an object, although might need to check this)
				relativeProperty:"example",
				exists:true,
			},				
			{
				//Has properties (so is probably an object, although might need to check this)
				relativeProperty:"",
				either:[
				{
					relativeProperty:"type",
					startsWithLiteral:"Objects",
				},
				{
					relativeProperty:"type",
					startsWithLiteral:"Computers",
				},
				],
			},				
			],
		},
		{
			name:"thatLocation",
			toSelect:{
				either:[
				{
					isRecursiveChildOf:"this/objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				//*
				{
					isRecursiveChildOf:"this/properties/location/../../objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				//*/
				{
					isRecursiveChildOf:"this/properties/location/../../vehicles",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				]
			},
			conditions:[
			//Is a place that can take objects
			{
				//Has a objects
				relativeChildId:"..",
				isOneOfLiteral:["objects"],
			},				
			],
		},
		],

		input:{
			//Make the properties that are consumed based on the properties
			//of the agent
			agentMotivation:{
				id:"this/resources/motivation/quantity",
				quantity:-1,
			},
			agentLocation:{
				id:"thisObject/properties/location",
				setProperty:"Locations/traveling",
			},
		},
		output:{
			agentLocation:{
				id:"thisObject/properties/location",
				setProperty:"thatLocation",
			},
			locationAgents:{
				id:"thatLocation",
				addProperty:"thisObject",
			},
		},
	},
	
	//Take an object and turn into a resource to save space
	storeObjectInstance:{
		_visualisation:{
			shortname:"Store Object",
		},
		
		duration:0.2,

		canAct:
		[
		],
		
		parameters:
		[
		{
			name:"thisObject",
			toSelect:{
				either:[
				{
					isRecursiveChildOf:"this/objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				//*
				{
					isRecursiveChildOf:"this/properties/location/../../objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				//*/
				{
					isRecursiveChildOf:"this/properties/location/../../vehicles",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				]
			},
			conditions:[
			{
				//Has properties (so is probably an object, although might need to check this)
				relativeProperty:"example",
				exists:true,
			},				
			{
				//Has properties (so is probably an object, although might need to check this)
				relativeProperty:"",
				either:[
				{
					relativeProperty:"type",
					startsWithLiteral:"Objects",
				},
				{
					relativeProperty:"type",
					startsWithLiteral:"Computers",
				},
				],
			},				
			],
		},
		{
			name:"thisResource",
			toSelect:{
				either:[
				{
					isRecursiveChildOf:"this/resources",
					skipProperties:["location","example","type"],
				},
				{
					isRecursiveChildOf:"this/properties/location/../../resources",
					skipProperties:["location","example","type"],
				},
				{
					isRecursiveChildOf:"this/properties/location/../../objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				{
					isRecursiveChildOf:"this/properties/location/../../vehicles",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				{
					isRecursiveChildOf:"this/objects",
					numRedirections:1,
					skipProperties:["location","example","type"],
				},
				]
			},
			conditions:[
			{
				//Has a objects
				relativeProperty:"example",
				exists:true,
			},
			{
				//Has a objects
				relativePropertyId:"*example",
				isId:"*thisObject/example",
			},				
			{
				//The object is unmodified from the example
				relativeProperty:"*example",
				isDeepEqual:{
					id:"thisObject",
					skipProperties:["location"],
				},
			},				
			{
				//Has a objects
				relativeProperty:"quantity",
				exists:true,
			},				
			],
		},
		],

		input:{
			//Remove object from Objects
			//removeObject:{
			//	id:"thisResource/quantity",
			//	quantity:-1,
			//},
			//Remove reference to object in location of object
			//removeObject:{
			//	id:"thisResource/quantity",
			//	quantity:-1,
			//},
			locationAgents:{
				id:"*thisObject/properties/location",
				removeProperty:"thisObject",
			},
			objectsList:{
				id:"*thisObject/type",
				removeProperty:"thisObject",
			},
		},

		output:{
			addResource:{
				id:"thisResource/quantity",
				quantity:1,
			},
			//Add the resource to the resources
			//If it already exists then increment the quantity
			//Otherwise create an new resource
			/*
			addObject:{
				id:"thisResource/example/type",
				addObject:"thisResource/example",
				addToParams:"thisNewObject",
			},
			placeInLocation:{
				id:"thisLocation", //points to the array that is a type of location for the objects
				addProperty:"thisNewObject",
				addToParams:"thisNewLocation",
			},
			updateLocation:{
				id:"thisNewObject/properties/location",
				addProperty:"thisNewLocation", 
			},
			*/
		},
	},	
};
