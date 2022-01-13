var data={
	_visualisation:{
		layout:"tree",
		shortname:"Data"
	},

};

data["test"] = {
	_visualisation:{shortname:"Address Test Data"},
	foo:{
		_visualisation:{shortname:"Foo",},
		_visible: {
			actions:[
				"@/actionTest/addTen",
				"@/actionTest/addToX",
				"@/actionTest/set",
				"@/actionTest/remove",
			],
		},	
		name:"foo",
		x:10,
		y:[{fizz:907, buzz:908, woof:true},'b','c'],
		bar:"@/test/bar",
		barAbs:"@../../bar",
	},
	bar:{
		_visualisation:{shortname:"Bar",},
		name:"bar",
		x:15,
		y:[{fizz:907, buzz:908, woof:true},'b','c'],
	},
	baz:{
		_visualisation:{shortname:"Baz"},
		name:"baz",
		x:25,
		y:{
			fizz:"fizz",
			buzz:"buzz",
			fizzbuzz:[
				'@../../fizz',
				'@../../buzz',
			],
		},
	},
};
data["actionTest"] = {
	_visualisation:{shortname:"Action Test Data"},
	sampleAction:{
		_visualisation:{shortname:"Example",},
		duration:5.0,		//The duration of the action
		prerequisites:[],	//What must be true for action to be executed
		parameters:[],		//The parameters needed, used in transforms
		transforms:{
			pre:[
				{ message:"Beginning", },
			],
			post:[
				{ message:"Ending", },
			],
			peri:[
				{ message:"Ongoing", },
			]
		},
	},
	addToX:{
		_visualisation:{shortname:"Change agent.x by Delta"},
		duration:0.0,
		prerequisites:[
			["exists", "@args/numberAddress"],
		],
		params:{
			numberAddress:{	type:"readonly", value:"@agent/x", },
			delta:{ type:"enter", inputType:"number", },
		},
		transforms:{pre:[["add", "@args/numberAddress", "@args/delta"]]}
	},
	addTen:{
		_visualisation:{shortname:"Add 'Ten' to Node",},
		duration:0.0,
		params:{
			numberAddress:{	type:"pick", options:"@agent/*", },
			delta:{	type:"readonly", value:"Ten", },
		},
		transforms:{pre:[["add", "@args/numberAddress", "@args/delta"]]}
	},
	set:{
		_visualisation:{shortname:"Set Node",},
		duration:0.0,
		params:{ 
			nodeAddress:{ type:"enter",},
			value:{	type:"enter",},
		},
		transforms:{pre:[["set", "@args/nodeAddress", "@args/value"]]}
	},
	remove:{
		_visualisation:{shortname:"Remove Node"},
		duration:0.0,
		params:{
			nodeAddress:{ type:"pick", options:"@agent/*" },
		},
		transforms:{pre:[["remove", "@args/nodeAddress"]]}
	}
};
