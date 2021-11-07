var data={
	visualisation:{
		layout:"Tabs",
		shortname:"Data"
	},
};

data["Test"] = {
	foo:{
		name:"foo",
		x:10,
		bar:"@/Test/bar",
		barAbs:"@../../bar",
	},
	bar:{
		name:"bar",
		x:15,
		y:['a','b','c'],
	}
	/* battery:{
		name:"9V Battery",
		voltage:9,
		connectionPoints:{
			"anode":{},
			"cathode":{},
		},
	},
	bulb:{
		name:"25W Bulb",
		power:25,
		connectionPoints:{
			"leg1":{},
			"leg2":{},
		}
	},
	wireA:{
		colour:"red",
		connects:{
			point1:"Test/battery/connectionPoints/anode",
			point2:"Test/bulb/connectionPoints/leg1",
		}
	},
	wireB:{
		colour:"black",
		connects:{
			point1:"",
			point2:""
		}
	} */

}
