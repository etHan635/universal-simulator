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
				"@/actionTest/appendTest",
				"@/actionTest/addTest",
				"@/actionTest/setTest",
				"@/actionTest/removeTest",
				"@/actionTest/newTest",
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
	appendTest:{
		_visualisation:{shortname:"Append 'Test' to Selection",},
		duration:0.0,
		params:{
			field:{	type:"pick", options:"@agent/*", },
			delta:{	type:"readonly", value:"Test", },
		},
		transforms:{pre:["nAppend(nContents(\"@args/field\", actionInstance), nContents(\"@args/delta\", actionInstance), actionInstance)"]}
	},
	addTest:{
		_visualisation:{shortname:"Add to Selection",},
		duration:0.0,
		params:{
			field:{ type:"pick", options:"@agent/*", },
			delta:{ type:"enter", inputType:"number", },
		},
		transforms:{pre:["nAppend(nContents(\"@args/field\", actionInstance), nContents(\"@args/delta\", actionInstance), actionInstance)"]}
	},
	setTest:{
		_visualisation:{shortname:"Set Node",},
		duration:0.0,
		params:{ 
			field:{ type:"pick", options:"@agent/*",},
			value:{	type:"enter",},
		},
		transforms:{pre:["nSet(nContents(\"@args/field\", actionInstance), nContents(\"@args/value\", actionInstance), actionInstance)"]}
	},
	removeTest:{
		_visualisation:{shortname:"Remove Node"},
		duration:0.0,
		params:{
			field:{ type:"pick", options:"@agent/*" },
		},
		transforms:{pre:["nDelete(nContents(\"@args/field\", actionInstance), actionInstance)"]}
	},
	newTest:{
		_visualisation:{shortname:"Add New Node",},
		duration:0.0,
		params:{
			field:{ type:"enter", },
			value:{ type:"enter", },
		},
		transforms:{pre:["nNew(nContents(\"@args/field\", actionInstance), nContents(\"@args/value\", actionInstance), actionInstance)"]}
	}
}
