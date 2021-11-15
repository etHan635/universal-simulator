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
				_visualisation:{shortname:"X = -90",},
				duration:1.0,
			},
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
	addTenToX:{
		_visualisation:{shortname:"X += 10",},
		duration:1.0,		//The duration of the action
		preconditions:[],	//What must be true for action to be executed
		arguments:[],		//The arguments provided, used in transforms
		transforms:[
			{
				time:0.0,
				message:"Pre-action",
			},
			{
				time:0.5,
				message:"Peri-action",
			},
			{
				time:1.0,
				message:"Post-action",
			}
		]
	}
}
