data["Applications"] =
{
	webBrowser:
	{
		chrome:{
			visualisation:{
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
			visualisation:{
				shortname:"Gmail",
			},
			properties:{
			},
		},
	},
	internetSearch:
	{
		chromeGoogleSearch:{
			visualisation:{
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
			visualisation:{
				shortname:"Gmail",
			},
			properties:{
			},
		},
		slack:
		{
			visualisation:{
				shortname:"Slack",
			},
			properties:{
			},
		},
		androidMessages:
		{
			visualisation:{
				shortname:"Messages",
			},
			properties:{
			},
		},
		discord:
		{
			visualisation:{
				shortname:"Discord",
			},
			properties:{
			},
		},
	},
	banking:{
		halifax:
		{
			visualisation:{
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
			visualisation:{
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
			visualisation:{
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
			visualisation:{
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
			visualisation:{
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
			visualisation:{
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