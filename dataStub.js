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
			"@/actionTest/addTenToX",
			{
				_visualisation:{shortname:"Create/Reset agent.x",},
				duration:1.0,
				transforms:{pre:[["set", "@x", 0]]}
			},
			"@/actionTest/removeX",
		],
		name:"foo",
		// x:10,
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
		arguments:[],		//The arguments provided, used in transforms
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
	addTenToX:{
		_visualisation:{shortname:"Increment agent.x by 10",},
		duration:0.0,
		transforms:{pre:[["add", "@x", 10]]}
	},
	removeX:{
		_visualisation:{shortname:"Delete agent.x"},
		duration:0.0,
		transforms:{pre:[["delete", "@x"]]}
	}
};
