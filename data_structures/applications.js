data["Applications"] =
{
	webBrowser:
	{
		chrome:{
			_visualisation:{
				shortname:"Chrome",
			},
			properties:{
				isWebBrowser:true,
			},
		},
	},
	email:
	{
		chromeGmail:{
			_visualisation:{
				shortname:"Gmail",
			},
			properties:{
			},
		},
	},
	internetSearch:
	{
		chromeGoogleSearch:{
			_visualisation:{
				shortname:"Google Search",
			},
			properties:{
			},
		},
	},	
	messaging:
	{
		gmail:
		{
			_visualisation:{
				shortname:"Gmail",
			},
			properties:{
			},
		},
		slack:
		{
			_visualisation:{
				shortname:"Slack",
			},
			properties:{
			},
		},
		androidMessages:
		{
			_visualisation:{
				shortname:"Messages",
			},
			properties:{
			},
		},
		discord:
		{
			_visualisation:{
				shortname:"Discord",
			},
			properties:{
			},
		},
	},
	banking:{
		halifax:
		{
			_visualisation:{
				shortname:"Halifax Online",
			},
			properties:{
			},
			//What can you do with the application?
			transforms:{
				webAppBanking_:"TransformByAgent/webAppBanking_",
			},
		},
	},
	ticketing:
	{
		kanban:
		{
			_visualisation:{
				shortname:"Kanban",
			},

			properties:{
			},
			
			transforms:{
				//addTask:"TransformByAgent/kanban_addTask",
				addObjectToTaskDetail:"TransformByAgent/kanban_addObjectToTaskDetail",
				assignOwnershipOfTask:"TransformByAgent/kanban_assignOwnershipOfTask",
				completeTask:"TransformByAgent/kanban_completeTask",
			},
		},
		jira:
		{
			_visualisation:{
				shortname:"Jira",
			},

			properties:{
				//The process that was/is used to create/maintain this application
				project:undefined,

				//The source control used to build this application
				sourceCode:undefined,
			},

			//What can you do with the application?
			transforms:{
				webAppTicketing_:"TransformByAgent/webAppTicketing_",
			},
		},
	},
	sourceControl:
	{
		github:
		{
			_visualisation:{
				shortname:"Github",
			},
			properties:{
			},
		},
	},
	digitalTV:
	{
		BBC1:
		{
			_visualisation:{
				shortname:"BBC1",
			},
			properties:{
			},
		},
	},
	onlineShop:
	{
		amazon:
		{
			_visualisation:{
				shortname:"amazon",
			},

			properties:{
				//The process that was/is used to create/maintain this application
				project:"Projects/softwareProject/amazonShopping",

				//The source control used to build this application
				sourceCode:"DataStorages/sourceControl/amazonShopping/properties/accounts/files/repository0",
			},

			//What can you do with the application?
			transforms:{
				webAppShopping_addToCart:"TransformByAgent/webAppShopping_addToCart",
				webAppShopping_removeFromCart:"TransformByAgent/webAppShopping_removeFromCart",
				webAppShopping_completeOrder:"TransformByAgent/webAppShopping_completeOrder",
			},
		},
	},
	/*
	contractWork:
	{
		ukGovFindTender:
		{
		},
		eSourcingNI:
		{
		},
		crownCommercialService:
		{
		}
	},
	*/
};