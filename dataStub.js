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
		_visibleActions:[
			"@/actionTest/add",
			"@/actionTest/set",
			"@/actionTest/remove",
		],
		name:"foo",
		x:10,
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
}
data["actionTest"] = {
	_visualisation:{shortname:"Action Test Data"},
	sampleAction:{
		_visualisation:{shortname:"Example",},
		duration:5.0,		//The duration of the action
		preconditions:[],	//What must be true for action to be executed
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
	add:{
		_visualisation:{shortname:"Add 10 to Node",},
		duration:0.0,
		params:{
			numberAddress:{
				options:"@agent/*",	//'working directory' is actionInstance
			},
			delta:{
				_const:true,
				value:10,
			},
		},
		transforms:{pre:[["add", "@args/numberAddress", "@args/delta"]]}
	},
	set:{
		_visualisation:{shortname:"Set Node",},
		duration:0.0,
		params:{
			nodeAddress:{
			},
			value:{
			}
		},
		transforms:{pre:[["set", "@args/nodeAddress", "@args/value"]]}
	},
	remove:{
		_visualisation:{shortname:"Remove Node"},
		duration:0.0,
		params:{
			nodeAddress:{options:"@agent/*"},
		},
		transforms:{pre:[["remove", "@args/nodeAddress"]]}
	}
};
