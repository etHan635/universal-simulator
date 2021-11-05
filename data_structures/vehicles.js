data["Vehicles"] = {
	visualisation:{
		layout:"Grid"
	},
	car:
	{
		visualisation:{
			layout:"Grid"
		},
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
				location:"Locations/garage/homeGarage/vehicles/default",
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
	},
	van:
	{
		visualisation:{
			layout:"Grid"
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
				location:"Locations/amazonWarehouse/amazonWarehouse0/vehicles/default",
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