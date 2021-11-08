var data={
	_visualisation:{
		layout:"Tabs",
		shortname:"Data"
	},
};

data["test"] = {
	_visualisation:{shortname:"Address Test Data"},
	foo:{
		_visualisation:{shortname:"Foo",},
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
