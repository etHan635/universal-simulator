data["ObjectExamples"] = {
	pineappleChewits:{
		visualisation:{
			shortname:"Stick of Pineapple Chewits",
			manufacturer:"Cloetta",
			brand:"Chewits",
		},
		type:"Objects/chewits",
		example:"ObjectExamples/pineappleChewits",
		resources:{
			sweets:{
				quantity:10,
				example:"ObjectExamples/pineappleChewit",
			},
		},					
		properties:
		{
		},
	},
	pineappleChewit:{
		visualisation:{
			shortname:"Pineapple Chewit",
			manufacturer:"Cloetta",
			brand:"Chewits",
		},
		type:"Objects/chewit",
		example:"ObjectExamples/pineappleChewit",
		resources:{
			wrapper:{
				quantity:1,
				example:"ObjectExamples/chewitWrapper",
			},
		},					
		properties:
		{
		},
	},
	chewitWrapper:{
		visualisation:{
			shortname:"Chewit Wrapper",
			manufacturer:"Cloetta",
			brand:"Chewits",
		},
		type:"Objects/chewitWrapper",
		example:"ObjectExamples/chewitWrapper",
		resources:{
		},					
		properties:
		{
		},
	},
	amazonCardboardBox:{
		visualisation:{
			shortname:"Amazon Cardboard Box",
			manufacturer:"Amazon",
			brand:"Carboard box",
		},
		type:"Objects/cardboardBox",
		example:"ObjectExamples/amazonCardboardBox",
		resources:{
		},					
		properties:
		{
			destination:undefined,
		},
		objects:{
			default:[],
		},
	},
	beds:{
		doubleBed:{
			visualisation:{
				shortname:"Double Bed",
				manufacturer:"Ikea",
				brand:"HEMNES",
			},
			type:"Objects/bed",
			example:"ObjectExamples/beds/doubleBed",
			resources:{
				space:{
					name:"Space m^2",
					quantity:4 //can take at most 4 people in it at once
				},
			},
			properties:
			{
			},
			agents:{
				default:[],
			},
			objects:{
				default:[],
				under:[],
			},
		},
	},
	chairs:{
		deskChair:{
			visualisation:{
				shortname:"Desk Chair",
				manufacturer:"Ikea",
				brand:"FLINTAN",
			},
			type:"Objects/deskChair",
			example:"ObjectExamples/chairs/deskChair",
			resources:{
				space:{
					name:"Space m^2",
					quantity:1
				},
			},					
			properties:
			{
			},
			agents:{
				default:[],
			},
			objects:{
				default:[],
			},
		},
		sofa:{
			visualisation:{
				shortname:"Sofa",
				manufacturer:"Ikea",
				brand:"LANDSKRONA",
			},
			type:"Objects/sofa",
			example:"ObjectExamples/chairs/sofa",
			resources:{
				space:{
					name:"Space m^2",
					quantity:2 //can take at most 2 people in it at once
				},
			},
			properties:
			{
			},
			agents:{
				default:[],
			},
			objects:{
				default:[],
				under:[],
			},
		},
	},
	tables:{
		desk:{
			visualisation:{
				shortname:"Desk",
				manufacturer:"Ikea",
				brand:"BEKANT",
			},
			type:"Objects/table",
			example:"ObjectExamples/tables/desk",
			resources:{
				space:{
					name:"Space m^2",
					quantity:2
				},
			},					
			properties:
			{
			},
			agents:{
				default:[],
			},
			objects:{
				default:[],
				under:[],
			},
		},
	},
	cards:{
		debitCard:{
			visualisation:{
				shortname:"Visa Debit Card",
				manufacturer:"Halifax",
				brand:"Visa Debit",
			},
			type:"Objects/debitCard",
			example:"ObjectExamples/cards/debitCard",
			resources:{
			},					
			properties:
			{
				accountCard:undefined,
			},
		},
	},
	cheques:{
		cheque:{
			visualisation:{
				shortname:"JobSeekers Allowance Cheque",
				manufacturer:"Halifax",
				brand:"Cheque",
			},
			type:"Objects/cheque",
			example:"ObjectExamples/cheques/cheque",
			resources:{
			},					
			properties:
			{
				fromAccount:undefined,
				toPerson:undefined,
				quantity:undefined,
			},
		},
	},
	pcs:{
		pc:{
			visualisation:{
				shortname:"PC",
				manufacturer:"Dell",
				brand:"Inspiron",
			},

			type:"Computers/pc",
			example:"ObjectExamples/pcs/pc",

			properties:{
				state:"Off",
				currentAccount:undefined,
				activeApplication:undefined,

				runningWebPages:{
				},
				runningGuiApplications:{
				},

				//This computer may be running malware in the background
				runningMalware:{
					//A control ip, or location to send extracted data/receive commands
				},

				mountedStorage:[],
			},
		},
	},
	smartPhones:{
		smartPhone:{
			visualisation:{
				shortname:"Samsung Galaxy A12",
				manufacturer:"Samsung",
				brand:"Galaxy A12",
			},
			
			type:"Computers/smartPhone",
			example:"ObjectExamples/smartPhones/smartPhone",

			properties:{
				state:"Off",
				currentAccount:undefined,
				activeApplication:undefined,

				runningWebPages:{
				},
				runningGuiApplications:{
				},

				//This computer may be running malware in the background
				runningMalware:{
					//A control ip, or location to send extracted data/receive commands
				},

				mountedStorage:[],
			},
		},		
	},
	cars:{
		car:{
			//properties for visualisation
			visualisation:{
				shortname:"Grey Honda Jazz",
				colour:"Grey",
				manufacturer:"Honda",
				brand:"Jazz",
				numberplate:"EZ2 3PR",
				yearOfManufacture:2001,
			},
			type:"Vehicles/car",
			example:"ObjectExamples/cars/car",
			resources:{
				fuel:{
					name:"Fuel",
					quantity:100
				},
				space:{
					name:"Boot Space m^2",
					quantity:10
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
			properties:
			{
			},
			agents:{
				driver:[],
				frontSide:[],
				backLeft:[],
				backRight:[],
				backMiddle:[],
				boot:[],
			},
			//https://www.volvocars.com/lb/support/manuals/xc90-twin-engine/2016w46/get-to-know-the-car/get-to-know-the-car/passenger-compartment-interior
			objects:{
				boot:[],
				cupHolder:[],
				driverSeat:[],
				driverFootwell:[],
				driverDoor:[],
				frontSideGloveBox:[],
			},
		},
		van:{
			//properties for visualisation
			visualisation:{
				shortname:"VW Van",
				colour:"Grey",
				manufacturer:"Honda",
				brand:"Jazz",
				numberplate:"EZ2 3PR",
				yearOfManufacture:2001,
			},
			type:"Vehicles/van",
			example:"ObjectExamples/cars/van",
			resources:{
				fuel:{
					name:"Fuel",
					quantity:100
				},
				space:{
					name:"Boot Space m^2",
					quantity:10
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
			properties:
			{
			},
			agents:{
				driver:[],
				frontSide:[],
				boot:[],
			},
			//https://www.volvocars.com/lb/support/manuals/xc90-twin-engine/2016w46/get-to-know-the-car/get-to-know-the-car/passenger-compartment-interior
			objects:{
				boot:[],
				cupHolder:[],
				driverSeat:[],
				driverFootwell:[],
				driverDoor:[],
				frontSideGloveBox:[],
			},
		},
	},
};