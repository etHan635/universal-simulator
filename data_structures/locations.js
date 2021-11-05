data["Locations"] = {
	visualisation:{
		layout:"Grid",
		shortname:"Locations",
	},
	traveling : {
		//properties for visualisation
		visualisation:{
			shortname:"Traveling",
		},
	},
	garage:
	{
		visualisation:{
			layout:"Grid",
			shortname:"Garages",
		},
		//When bought an instance is created
		homeGarage:{
			//properties for visualisation
			visualisation:{
				shortname:"Garage",
				addressNumber:"1",
				street:"Main Street",
				town:"Capital",
				country:"CountryOne",
			},
			resources:{
				space:{
					name:"Space m^2",
					quantity:100
				},
				parkingSpace:{
					name:"Parking Space",
					quantity:0
				},
				rawMaterial:{
					name:"Raw Material",
					quantity:0,
				},
				product:{
					name:"Product",
					quantity:0,
				},
			},
			objects:{
				default:["Objects/sofa/homeSofa",
						 "Computers/pc/homePC",
						 "Objects/deskChair/homeChair",
						 "Objects/table/homeDesk"],
			},
			agents:{
				default:["Agents/player/me"],
			},
			vehicles:{
				default:["Vehicles/car/car"],
			},
		},
	},
	livingroom:
	{
		visualisation:{
			layout:"Grid",
			shortname:"Livingrooms",
		},
		//When bought an instance is created
		homeLivingroom:{
			//properties for visualisation
			visualisation:{
				shortname:"Livingroom",
				addressNumber:"1",
				street:"Main Street",
				town:"Capital",
				country:"CountryOne",
			},
			resources:{
				space:{
					name:"Space m^2",
					quantity:80
				},
			},
			agents:{
				default:[],
			},
		},
	},
	bedroom:
	{
		visualisation:{
			layout:"Grid",
			shortname:"Bedrooms",
		},
		homeBedroom:{
			//properties for visualisation
			visualisation:{
				shortname:"Bedroom",
				addressNumber:"1",
				street:"Main Street",
				town:"Capital",
				country:"CountryOne",
			},
			resources:{
				space:{
					name:"Space m^2",
					quantity:80
				},
			},
			objects:{
				default:["Objects/bed/homeBed"],
			},
			agents:{
				default:[],
			},
		},
	},
	shop:
	{
		visualisation:{
			layout:"Grid",
			shortname:"Shops",
		},
		//When bought an instance is created
		buildingSupplies:{
			//properties for visualisation
			visualisation:{
				shortname:"Building Supplies",
				addressNumber:"1",
				street:"High Street",
				town:"Capital",
				country:"CountryOne",
			},
			resources:{
				space:{
					name:"Space m^2",
					quantity:20 //can take about 20 people in it at once
				},
				parkingSpace:{
					name:"Parking Space",
					quantity:10 //can take about 10 cars
				},
				rawMaterial:{
					name:"Raw Material For Sale",
					quantity:100,
					properties:
					{
						salePrice:1,
						forSale:true,
						transportable:false,
					},
				},
				product:{
					name:"Product For Sale",
					quantity:0,
					properties:
					{
						salePrice:10,
						forSale:true,
						transportable:false,
						manufacturable:false,
					},
				},
			},
			agents:{
				default:[],
				behindCounter:["Agents/shopKeeper/owner"],
			},
			vehicles:{
				default:[],
			},
		},
	},
	marketStall:
	{
		visualisation:{
			layout:"Grid"
		},
		//When bought an instance is created
		marketStall:{
			//properties for visualisation
			visualisation:{
				shortname:"Market Stall",
				addressNumber:"1",
				street:"Central Square",
				town:"Capital",
				country:"CountryOne",
			},
			resources:{
				space:{
					name:"Space m^2",
					quantity:4 //can take about 4 people in it at once
				},
				parkingSpace:{
					name:"Parking Space",
					quantity:1 //can take about 10 cars
				},
				product:{
					name:"Product For Sale (will buy)",
					quantity:20,
					properties:
					{
						buyPrice:5,
						willBuy:true,
						salePrice:10,
						forSale:true,
						transportable:false,
						manufacturable:false,
					},
				},
			},
			agents:{
				default:[],
				behindCounter:["Agents/stallKeeper/owner"],
			},
			vehicles:{
				default:[],
			},
		},
	},
	officeReception:
	{
		visualisation:{
			layout:"Grid"
		},
		officeReception:{
			//properties for visualisation
			visualisation:{
				shortname:"Reception",
				addressNumber:"10",
				street:"High Street",
				town:"Capital",
				country:"CountryOne",
			},
			resources:{
				space:{
					name:"Space m^2",
					quantity:80,
				},
				parkingSpace:{
					name:"Parking Space",
					quantity:10,
				},
			},
			objects:{
				default:[
				/*
				"Objects/sofa/receptionSofa",
						 "Computers/pc/receptionPC",
						 "Objects/deskChair/receptionChair",
						 "Objects/table/receptionDesk"
						*/
						],
			},
			agents:{
				default:[],
				behindCounter:["Agents/receptionist/receptionist"],
			},
		},
	},
	officeOpenPlan:{
		visualisation:{
			layout:"Grid"
		},
		officeOpenPlan:{
			//properties for visualisation
			visualisation:{
				shortname:"Open Plan Office",
				addressNumber:"10",
				street:"High Street",
				town:"Capital",
				country:"CountryOne",
			},
			resources:{
				space:{
					name:"Space m^2",
					quantity:80,
				},
			},
			objects:{
				default:[
				/*
				"Computers/pc/openPlanPC0",
						 "Objects/deskChair/openPlanChair0",
						 "Objects/table/openPlanDesk0"
						 */
				],
			},
			agents:{
				default:["Agents/projectManager/projectManager"],
			},
		},
	},
	amazonWarehouse:
	{
		visualisation:{
			layout:"Grid",
			shortname:"Amazon Warehouses",
		},
		//When bought an instance is created
		amazonWarehouse0:{
			//properties for visualisation
			visualisation:{
				shortname:"Amazon Warehouse 0",
				addressNumber:"1",
				street:"Back Street",
				town:"Capital",
				country:"CountryOne",
			},
			resources:{
				space:{
					name:"Space m^2",
					quantity:10000
				},
				food:{
					sweets:{
						chewits:{
							quantity:1000,
							example:"ObjectExamples/pineappleChewits",
						},
					},
				},
				storageBoxes:{
					quantity:10000,
					example:"ObjectExamples/amazonCardboardBox",
				},
				parkingSpace:{
					name:"Parking Space",
					quantity:99
				},
			},
			objects:{
				default:[],
			},
			agents:{
				default:["Agents/fulfilmentWorker/amazonWorker",
				"Agents/deliveryPeople/deliveryGuy"],
			},
			vehicles:{
				default:["Vehicles/van/van"],
			},
		},
	},
};