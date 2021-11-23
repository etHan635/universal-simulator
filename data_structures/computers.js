data["Computers"] =
{
	_visualisation:{
		shortname:"Computing Devices",
	},
	pc:{
		_visualisation:{
			shortname:"PCs",
		},
		homePC:{
			_visualisation:{
				shortname:"PC",
				manufacturer:"Dell",
				brand:"Inspiron",
			},

			type:"Computers/pc",
			example:"ObjectExamples/pcs/pc",

			properties:{
				location:"Locations/garage/homeGarage/objects/default",								
				state:"ScreenLock",
				currentAccount:"DataStorages/pcHardDrive/harddrive1/properties/accounts/jackBurton",
				activeApplication:"Computers/pc/homePC/properties/runningWebPages/chrome0",

				runningWebPages:{
					chrome0:{
						application:"Applications/webBrowser/chrome",
						webSession:"Computers/internetServer/gmailServer/properties/runningWebSessions/gmailJack",
						//This webpage maybe running malware
						malware:{
							//A control ip, or location to send extracted data/receive commands
						},
					},
				},
				runningGuiApplications:{
				},

				//This computer may be running malware in the background
				runningMalware:{
					//A control ip, or location to send extracted data/receive commands
				},

				mountedStorage:["DataStorages/pcHardDrive/harddrive1"],
			},
		},
	},
	smartPhone:{
		peteCharlesPhone:{
			_visualisation:{
				shortname:"Samsung Galaxy A12",
				manufacturer:"Samsung",
				brand:"Galaxy A12",
			},
			
			type:"Computers/smartPhone",
			example:"ObjectExamples/smartPhones/smartPhone",

			properties:{
				location:"Agents/deliveryPeople/deliveryGuy/objects/default",
			
				state:"ScreenLock",
				currentAccount:"DataStorages/smartPhoneStorage/peteCharlesPhone/properties/accounts/peteCharles",
				activeApplication:undefined,

				runningWebPages:{
				},
				runningGuiApplications:{
				},				
				mountedStorage:["DataStorages/smartPhoneStorage/peteCharlesPhone"],
			},
		},
		frankPetersPhone:{
			_visualisation:{
				shortname:"Samsung Galaxy A12",
				manufacturer:"Samsung",
				brand:"Galaxy A12",
			},
			
			type:"Computers/smartPhone",
			example:"ObjectExamples/smartPhones/smartPhone",

			properties:{
				location:"Agents/fulfilmentWorker/amazonWorker/objects/default",
			
				state:"ScreenLock",
				currentAccount:"DataStorages/smartPhoneStorage/frankPetersPhone/properties/accounts/frankPeters",
				activeApplication:undefined,

				runningWebPages:{
				},
				runningGuiApplications:{
				},				
				mountedStorage:["DataStorages/smartPhoneStorage/frankPetersPhone"],
			},
		},
		jackBurtonsPhone:{
			
			_visualisation:{
				shortname:"Pixel 4a",
				manufacturer:"Google",
				brand:"Pixel 4a",
			},
			
			type:"Computers/smartPhone",
			example:"ObjectExamples/smartPhones/smartPhone",

			properties:{
				location:"Agents/player/me/objects/default",
			
				state:"ScreenLock",
				currentAccount:"DataStorages/smartPhoneStorage/jackBurtonsPhone/properties/accounts/jackBurton",
				activeApplication:undefined,

				runningWebPages:{
				},
				runningGuiApplications:{
				},				
				mountedStorage:["DataStorages/smartPhoneStorage/jackBurtonsPhone"],
			},
		},
	},
	smartTV:{
		jackBurtonsTV:{
			_visualisation:{
				shortname:"TV",
				manufacturer:"LG",
				brand:"43UN74006LB",
			},
		},
	},
	bankingServer:{
		halifaxServer:{
			_visualisation:{
				shortname:"Halifax Banking",
				manufacturer:"Amazon",
				brand:"AWS",
			},
			properties:{
				location:undefined,
				internetIpAddress:"",
				internetDomain:"www.halifax.com",
				webApp:"Applications/banking/halifax",

				runningWebSessions:{
				},
				mountedStorage:["DataStorages/bankAccounts/halifax"],
			},
		},
		amazonServer:{
			_visualisation:{
				shortname:"Amazon Banking",
				manufacturer:"Amazon",
				brand:"AWS",
			},
		},
		ukGovernmentServer:{
			_visualisation:{
				shortname:"UK Government Banking",
				manufacturer:"Amazon",
				brand:"AWS",
			},
		},
	},
	internetServer:{
		gmailServer:{
			_visualisation:{
				shortname:"Gmail Server",
				manufacturer:"Google",
				brand:"Google Server Farm",
			},
			//A server farm somewhere in Ireland probably
			properties:{
				location:undefined,
				internetIpAddress:"",
				internetDomain:"www.gmail.com",
				webApp:"Applications/messaging/gmail",
				
				emailAccounts:{
					jackBurton:{
						address:"jackBurton@gmail.com",
						mailBox:"DataStorages/emailInbox/jackBurtonInbox/properties/accounts/jackBurton",
					},
				},

				//Applications that can be connected to via browser
				runningWebSessions:{
					default:{
						//Login screen
					},
					gmailJack:{
						state:"Inbox",
						connectedClient:"Computers/pc/homePC/properties/runningWebPages/chrome0",
						currentAccount:"DataStorages/emailInbox/jackBurtonInbox/properties/accounts/jackBurton",						
					},
				},

				mountedStorage:["DataStorages/emailInbox/jackBurtonInbox"],

			},
			
		},
		amazonServer:{
			_visualisation:{
				shortname:"Amazon.com",
				manufacturer:"Amazon",
				brand:"AWS",
			},
			//A server farm somewhere in Ireland probably
			properties:{
				location:undefined,
				internetIpAddress:"",
				internetDomain:"www.amazon.com",
				webApp:"Applications/onlineShop/amazon",
				warehouse:"Locations/amazonWarehouse/amazonWarehouse0",
				usingApis:{
					taxation:"DataStorages/bankAccounts/ukGovernmentInternal/properties/accounts/VAT/businessAccounts/account0",
					orderFulfilment:"DataStorages/ticketing/amazon/shoppingOrders/properties/accounts/public/files",
					delivery:["DataStorages/ticketing/royalMail/delivery/properties/accounts/public/files"],
				},
				//Applications that can be connected to via browser
				runningWebSessions:{
					default:{
						//Login screen
					},
					/*
					gmailJack:{
						state:"Inbox",
						connectedClient:"Computers/pc/homePC/properties/runningWebPages/chrome0",
						currentAccount:"DataStorages/onlineShoppingAccounts/amazonShoppingBaskets/properties/accounts/jackBurton",
						productDatabase:"DataStorages/onlineProducts/amazonProducts/properties/accounts/public"
					},
					*/
				},

				mountedStorage:["DataStorages/onlineShoppingAccounts/amazonShoppingBaskets",
							"DataStorages/onlineProducts/amazonProducts"],
			},
			
		},
	},

	ticketing:{
		royalMail:{
			delivery:{
				_visualisation:{
					shortname:"Royal Mail delivery server",
					manufacturer:"Amazon",
					brand:"AWS",
				},
				properties:{
					location:undefined,
					internetIpAddress:"",
					internetDomain:"",
					webApp:"Applications/ticketing/kanban",
					runningWebSessions:{
					},
					mountedStorage:["DataStorages/ticketing/royalMail/delivery"],
				},
			},
		},
		amazon:{
			orderFulfilment:{
				_visualisation:{
					shortname:"Amazon order fulfilment server",
					manufacturer:"Amazon",
					brand:"AWS",
				},
				properties:{
					location:undefined,
					internetIpAddress:"",
					internetDomain:"",
					webApp:"Applications/ticketing/kanban",
					runningWebSessions:{
					},
					mountedStorage:["DataStorages/ticketing/amazon/shoppingOrders"],
				},
			},
			softwareDevelopment:{
				_visualisation:{
					shortname:"Amazon software development server",
					manufacturer:"Amazon",
					brand:"AWS",
				},
				properties:{
					location:undefined,
					internetIpAddress:"",
					internetDomain:"www.amazon.com",
					webApp:"Applications/onlineShop/amazon",
					runningWebSessions:{
					},
					mountedStorage:["DataStorages/ticketing/amazon/jira"],
				},
			},
		},
	},
	/*
	//A local machine that a programmer develops on
	//Can perform builds, can test locally, can run tests locally
	//Can 
	developmentPC:{
	},
	//Handles internal management of an organisation
		//Handles communication e.g. email, slack
		//Handles ticketing requirements
		//Might include a document repository like a wiki
		//Might include a group calendar
		//Might include information about employees
		//Might include custom webapps that help run the organisation e.g. finance, holiday requests
		//Might include a VPN that external connections can be made to
	organisationServer:{
	},
	//Compiles a branch from github and deploys it onto another machine so it can be tested
	buildServer:{
	},
	//Runs a build of a project, and can run automated tests over it
	//Typically selenium tests
	testServer:{
	},
	//Like a test server but available for a programming to run their branch of the project before 
	//officially sending it off to be tested
	developmentServer:{
	},
	//A machine on which a web application is running on and being used by the organisation
	productionServer:{
	},
	//Machine on which data is stored
	sourceControlServer:{
	},
	//A machine that automates the backup of files from other servers
	backupServer:{
	},
	*/
};
