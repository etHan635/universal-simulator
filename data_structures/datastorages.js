data["DataStorages"] = 
{
	visualisation:{
		shortname:"Data Storage",
	},
	pcHardDrive:{
		visualisation:{
			shortname:"PC Harddrives",
		},
		harddrive1:{
			visualisation:{
				shortname:"2TB Hard Drive",
				manufacturer:"Seagate",
				brand:"BarraCuda Compute",
			},
			
			properties:{
				connectedToComputer:"Computers/pc/homePC",
				accounts:{
					public:{
						visualisation:{
							shortname:"public Account",
						},
						applications:["Applications/webBrowser/chrome"],
						files:{},
					},
					jackBurton:{
						visualisation:{
							shortname:"JackBurton Account",
						},
						username:"JackBurton",
						password:"1234",
						applications:{},
						files:{
							"helloworld.txt":{
								//A file on a PC may be infected with malware
								malware:{
									//A control ip, or location to send extracted data/receive commands
								},
							},
						},
					},
				},
			},
		},
	},
	memoryStick:{
		jackBurtonsMemoryStick1:{
			visualisation:{
				shortname:"Memory Stick",
				manufacturer:"SanDisk",
				brand:"Ultra",
			},
			properties:{
				connectedToComputer:undefined,
				accounts:{
					public:{		
						visualisation:{
							shortname:"public Account",
						},
						applications:{},
						files:{},
					},
				},
			},
		},
	},
	smartPhoneStorage:{
		peteCharlesPhone:{
			visualisation:{
				shortname:"Samsung Internal",
				manufacturer:"Samsung",
				brand:"Samsung A12",
			},
			properties:{
				connectedToComputer:"Computers/smartPhone/peteCharlesPhone",
				accounts:{
					peteCharles:{	
						visualisation:{
							shortname:"peteCharles@gmail.com Account",
						},
						phoneNumber:"02890 555 556",
						username:"peteCharles@gmail.com",
						password:"1234",
						applications:["Applications/messaging/androidMessages",
										"Applications/webBrowser/chrome"],
						files:{
							androidMessagesInbox:{
							},
							androidMessagesSent:{
							},
							androidMessagesDraft:{
							},
						},
					},
				},
			},
		},
		frankPetersPhone:{
			visualisation:{
				shortname:"Samsung Internal",
				manufacturer:"Samsung",
				brand:"Samsung A12",
			},
			properties:{
				connectedToComputer:"Computers/smartPhone/frankPetersPhone",
				accounts:{
					frankPeters:{	
						visualisation:{
							shortname:"frankPeters@gmail.com Account",
						},
						phoneNumber:"02890 555 556",
						username:"frankPeters@gmail.com",
						password:"1234",
						applications:["Applications/messaging/androidMessages",
										"Applications/webBrowser/chrome"],
						files:{
							androidMessagesInbox:{
							},
							androidMessagesSent:{
							},
							androidMessagesDraft:{
							},
						},
					},
				},
			},
		},
		jackBurtonsPhone:{
			visualisation:{
				shortname:"Pixel 4a Internal",
				manufacturer:"Google",
				brand:"Pixel 4a",
			},
			properties:{
				connectedToComputer:"Computers/smartPhone/jackBurtonsPhone",
				accounts:{
					jackBurton:{	
						visualisation:{
							shortname:"jackBurton@gmail.com Account",
						},
						phoneNumber:"02890 555 555",
						username:"jackBurton@gmail.com",
						password:"1234",
						applications:["Applications/messaging/androidMessages",
										"Applications/webBrowser/chrome"],
						files:{
							androidMessagesInbox:{
								mail0:{
									sender:"",
									recipient:"",
									message:"I'm good",
								},
							},
							androidMessagesSent:{
								mail1:{
									sender:"",
									recipient:"",
									message:"I'm good",
								},
							},
							androidMessagesDraft:{
								mail2:{
									sender:"",
									recipient:"",
									message:"I'm good",
								},
							},
						},
					},
				},
			},
		},
	},
	smartTVStorage:{
		jackBurtonsTVStorage:{
			visualisation:{
				shortname:"LG TV Internal",
				manufacturer:"LG",
				brand:"43UN74006LB",
			},
			properties:{
				connectedToComputer:"Computers/smartTV/jackBurtonsTV",
				accounts:{
					public:{		
						visualisation:{
							shortname:"public Account",
						},
						applications:["Applications/digitalTV/BBC1"],
						files:{
						},
					},
				},
			},
		},
	},
		
	bankAccounts:{
		halifax:{
			visualisation:{
				shortname:"Halifax Bank Accounts",
				manufacturer:"Halifax",
				brand:"Amazon Server Farm",
			},			
			properties:{
				connectedToComputer:"Computers/bankingServer/halifaxServer",
				accounts:{
					royalMail:{
						businessAccounts:{
							account0:{
								quantity:1000.0,
								sortcode:"010101",
								accountcode:"00123456",
								transactions:{
									fromAmazonForJackBurton:{
										from:"DataStorages/bankAccounts/amazonInternal/properties/accounts/internal/businessAccounts/account0",
										to:"DataStorages/bankAccounts/halifax/properties/accounts/royalMail/businessAccounts/account0",
										quantity:"0.1",
									}									
								},
							},
						},
					},
					jackBurton:{
						visualisation:{
							shortname:"JackBurton Banking",
						},
						currentAccounts:{
							account0:{
								quantity:1000.0,
								sortcode:"010101",
								accountcode:"00123456",
								cards:{
									"0123 0123 0123 0123":{
										type:"VISA Debit",
										number:"0123 0123 0123 0123",
										validFrom:"0101",
										expiresEnd:"0104",
										cvv:"012",
										pin:"0123",
										transactions:{
											amazonPurchase:{
												from:"DataStorages/bankAccounts/halifax/properties/accounts/jackBurton/currentAccounts/account0/cards/0123 0123 0123 0123",
												to:"DataStorages/bankAccounts/amazonInternal/properties/accounts/internal/businessAccounts/account0",
												quantity:"1.0",
											}
										},
									},
								},
							},
						},
					},
				},
			},
		},
		amazonInternal:{
			properties:{
				connectedToComputer:"Computers/bankingServer/amazonServer",
				accounts:{
					internal:{
						businessAccounts:{
							account0:{
								quantity:1000.0,
								sortcode:"010101",
								accountcode:"00123456",
								transactions:{
									fromJackBurton:{
										from:"DataStorages/bankAccounts/halifax/properties/accounts/jackBurton/currentAccounts/account0/cards/0123 0123 0123 0123",
										to:"DataStorages/bankAccounts/amazonInternal/properties/accounts/internal/businessAccounts/account0",
										quantity:"1.0",
									},
									toRoyalMailForJackBurton:{
										from:"DataStorages/bankAccounts/amazonInternal/properties/accounts/internal/businessAccounts/account0",
										to:"DataStorages/bankAccounts/halifax/properties/accounts/royalMail/businessAccounts/account0",
										quantity:"0.1",
									},
									forJackBurton:{
										from:"DataStorages/bankAccounts/amazonInternal/properties/accounts/internal/businessAccounts/account0",
										to:"DataStorages/bankAccounts/ukGovernmentInternal/properties/accounts/VAT/businessAccounts/account0",
										quantity:"0.2",
									},
								},
							},
						},
					},
				},
			},
		},
		ukGovernmentInternal:{
			properties:{
				connectedToComputer:"Computers/bankingServer/ukGovernmentServer",
				accounts:{
					VAT:{
						businessAccounts:{
							account0:{
								quantity:1000.0,
								sortcode:"010101",
								accountcode:"00123456",
								transactions:{
									forJackBurton:{
										from:"DataStorages/bankAccounts/amazonInternal/properties/accounts/internal/businessAccounts/account0",
										to:"DataStorages/bankAccounts/ukGovernmentInternal/properties/accounts/VAT/businessAccounts/account0",
										quantity:"0.2",
									},
								},
								cheques:{
									jobSeekersAllowance:[
										"Objects/cheque/unemploymentCheque",
									],
									//Housing Benefit.
									//income-related Employment and Support Allowance (ESA)
									//income-based Jobseeker's Allowance (JSA)
									//Child Tax Credit.
									//Working Tax Credit.
									//Income Support.									
								},
							},
						},
					},
				},
			},
		},
	},
		
	onlineProducts:{
		amazonProducts:{
			visualisation:{
				shortname:"Amazon Product Databases",
				manufacturer:"Amazon",
				brand:"Amazon Server Farm",
			},
			properties:{
				connectedToComputer:"Computers/internetServer/amazonServer",
				accounts:{
					public:{
						files:{
							food:{
								sweets:{
									chewits:{
										visualisation:{
											shortname:"Stick of Pineapple Chewits",
										},

										price:1.0,
										
										//This data is also used to manage the resources in a warehouse
										location:"Locations/amazonWarehouse/amazonWarehouse0/resources/food/sweets/chewits",
										
										//A data entry can have malware in it, 
										//if viewed, the machine viewing it may be compromised
										//or the account or payment data entered in an order may be
										//compromised
										malware:{
											//A control ip, or location to send extracted data
											//A virus to infect a pc
										},
									},
								},
							},
							issues:{
								//This data may have one or more problems with it
								//Can be caused by code errors or user errors
							},
							//A log of the changes to the database
							//That may contain errors
							commits:{
							},
							
						},						
					},
				},
			},
		},
	},
	
		
	onlineShoppingAccounts:{
		amazonShoppingBaskets:{
			visualisation:{
				shortname:"Amazon Shopping Baskets",
				manufacturer:"Amazon",
				brand:"Amazon Server Farm",
			},
			properties:{
				connectedToComputer:"Computers/internetServer/amazonServer",
				accounts:{
					jackBurton:{
						visualisation:{
							shortname:"JackBurton Shopping",
						},
						username:"JackBurton",
						password:"1234",
						files:{
							completedOrders:{
								order0:{
									products:[
									{
										productid:"DataStorages/onlineProducts/amazonProducts/properties/accounts/public/files/food/sweets/chewits",
										quantity:1,
										price:1.0, //At time of order may be different from current price
									},
									],
									delivery:"DataStorages/deliveries/royalMail/properties/accounts/amazon/completedOrders/order0",
									payment:"DataStorages/bankAccounts/halifax/properties/accounts/jackBurton/currentAccounts/account0/transactions/amazonPurchase",
								},
							},
							waitingOrders:{
							},
							openCart:{
								products:{},
								totalCost:0,
							},
							wishlist:{
							},
							//An account can have malware in it, 
							//if viewed, the machine viewing it may be compromised
							//or the account or payment data entered in an order may be
							//compromised
							malware:{
								//A control ip, or location to send extracted data
								//A virus to infect a pc
							},
						},
						issues:{
							//This data may have one or more problems with it
							//Can be caused by code errors or user errors
						},
						//A log of the changes to the database
						//That may contain errors
						commits:{
						},
					},
				},
			},
		},
	},
	emailInbox:{
		jackBurtonInbox:{
			visualisation:{
				shortname:"Gmail Storage",
				manufacturer:"Google",
				brand:"Google Server Farm",
			},
			properties:{
				connectedToComputer:"Computers/internetServer/gmailServer",
				accounts:{
					jackBurton:{
						visualisation:{
							shortname:"JackBurton Account",
						},
						username:"JackBurton",
						password:"1234",
						files:{
							inbox:{
								mail0:{
									sender:"",
									recipient:"",
									message:"I'm good",
									//Emails may include malware
									malware:{
										//A control ip, or location to send extracted data
										//A virus to infect a pc
									},
								},
							},
							sent:{
								mail1:{
									sender:"",
									recipient:"",
									message:"I'm good",
								},
							},
							draft:{
								mail2:{
									sender:"",
									recipient:"",
									message:"I'm good",
								},
							},
						},
					},
				},
			},
		},
	},
		
	ticketing:{
		royalMail:{
			delivery:{
				visualisation:{
					shortname:"Royal Mail Delivery",
					manufacturer:"Amazon",
					brand:"AWS",
				},
				properties:{
					connectedToComputer:"Computers/ticketing/royalMail/delivery",
					accounts:{
						public:{
							files:{
								paymentAccount:"DataStorages/bankAccounts/halifax/properties/accounts/royalMail/businessAccounts/account0",
								//Kanban
								todo:{
									/*
									order0:{	
										details:"DataStorages/onlineShoppingAccounts/amazonShoppingBaskets/properties/accounts/jackBurton/files/waitingOrders/order0",
										owner:undefined
									},
									*/
								},
								inProgress:{},
								done:{},
							},
						},
					},
				},			
			},
		},
		amazon:{
			shoppingOrders:{
				visualisation:{
					shortname:"Amazon Shopping Order Fulfilment",
					manufacturer:"Amazon",
					brand:"AWS",
				},
				properties:{
					connectedToComputer:"Computers/ticketing/amazon/orderFulfilment",
					accounts:{
						public:{
							files:{
								paymentAccount:"DataStorages/bankAccounts/amazonInternal/properties/accounts/internal/businessAccounts/account0",
								//Kanban
								todo:{
									/*
									order0:{	
										details:"DataStorages/onlineShoppingAccounts/amazonShoppingBaskets/properties/accounts/jackBurton/files/waitingOrders/order0",
										owner:undefined
									},
									*/
								},
								inProgress:{},
								done:{},
							},
						},
					},
				},
			},
			jira:{
				visualisation:{
					shortname:"Amazon Shopping Source Control",
					manufacturer:"Amazon",
					brand:"AWS",
				},
				properties:{
					connectedToComputer:"Computers/ticketing/amazon/softwareDevelopment",
					files:{
						projectOwner:undefined,
						bugTracking:{
							bug0:{
								howIdentified:undefined,
								whoRaisedIt:undefined,
								tasksToReproduce:[
								],
								issues:{
									//The reproduction tasks may be missing
									//Or the reproduction task may not actually trigger the bug
								},
							},
						},
						backlog:{
							epics:{
								epic0:{
									writtenBy:undefined,
									assignedTo:undefined,
									//The documented end date of the project
									estimatedCompletionDate:undefined,
									//How far through the design process of this epic 
									state:"maintenance",
									stories:{
										story0:{
											writtenBy:undefined,
											assignedTo:undefined,
											tasks:{
												task0:{
													writtenBy:undefined,
													storyPoints:3,
													assignedTo:undefined,
													sourceCodeCommits:[
													],
													issues:{
														//A story might not reflect what a user wants to do
													},
												},
											},
											//A story can have tests written for it and these can be part
											//of the ticket specification
											tests:[
											],
											//Actions (Transforms) in other applications may provide inspiration
											similarTo:[
											],
											//Designs can have issues
											issues:{
												//A story might not reflect what a user wants to do
												//This ticket may not reflect the idea of how this story should work
												//as imagined by the project
											},
										},
									},
									//Designs can have issues
									issues:{
										//An epic might not reflect what a user wants to do
									},
								},
							},					
						},
						currentSprint:{
						},
						plannedNextSprint:{
						},
						//The changes in the tickets over time
						commits:{
						},
					},
				},
			},
		},
	},
	
	sourceControl:{
		amazonShopping:{
			visualisation:{
				shortname:"Amazon Shopping Source Control",
				manufacturer:"Amazon",
				brand:"AWS",
			},
			properties:{
				connectedToComputer:"Computers/sourceControl/amazonServer",
				accounts:{
					files:{
						repository0:{
							//The project that created/updates this repository
							project:"",
							
							production:{
								sourceFiles:{
									"main.java":{
										name:"main.java",
										dependencies:{
										},
										issues:{
											//Coding Design
												//Doesn't match prefered coding style of another developer e.g. tabs not spaces
												//Doesn't match prefered architecture of another developer e.g. uses too many callbacks/singletons/dependencies etc.
												//Doesn't match common language programming style e.g. not Pythonic enough
												//Doesn't match common framework programming style e.g. not Django enough
												//Could be easier to understand (and thus build on without introducing bugs) e.g. more comments needed, better variable names
											//Compile time issue (might not compile)
										},
									},
								},
								uiFiles:{
									"index.html":{
										name:"main.java",
										dependencies:{
										},
										issues:{
											//Graphic Design
												//inconsistent with the style of the rest of the site
												//inconsistent with the technological sophistication of the rest of the site
										},
									},
									"attractivePeople.png":{
										name:"attractivePeople.png",
										dependencies:{
										},
										issues:{
										},
									},
									"logo.svg":{
										name:"logo.svg",
										dependencies:{
										},
										issues:{
										},
									},
								},
								libraries:{
									jQuery:{
										name:"jQuery",
										issues:{	
										},
									},
								},
								
								//Tests that can be run automatically
								automatedTests:{
									test0:{
										//Each test can detect one or more issues with one or more transforms
									},
								},

								//Tests that need a tester to perform them
								//Could be stored in the design of the project
								manualTests:{
								},
								
								//A reference to the object that represents the completed result of this software
								//which includes the actions (transforms) that agents can perform on the system
								application:"",

								//What you can DO with the software (its user stories)
								transforms:{
									webAppShopping_addToCart:{
										//A mapping between the action and the sourceFiles that are used when performing the action
										//this helps with tracking the introduction of bugs and other issues
										sourceFiles:[],
										
										//A mapping between the action and the uiFiles used in the project
										//this helps with tracking the introduction of bugs and other issues
										uiFiles:[],

										ticket:"DataStorages/ticketing/amazonShoppingJira/properties/file/epics/epic0/stories/story0",

										//Issues, some but not all found that could cause problems when using the system
										issues:{
											//Specific to different devices/computational power
												//Design
													//Doesn't match the user stories a customer thinks is valuable e.g. I want to be able to view the site in chinese
													//Doesn't match the user stories a user has e.g. I want to pay with paypal
													//Doesn't match ticket e.g. the ticket says the site should have a chinese option
												//Graphic design
													//style - gives impression that a certain person is the target
														//Doesn't match the associations a customer has with what they want to do e.g. I wanted it to look like it was for richer people
														//Doesn't match the associations a user has with what they want to do e.g. looks like a site for people richer than me
														//Doesn't match ticket e.g. design said these should look expensive
												//Usability
													//time consuming (due to computational speed or poor layout etc.)
													//Can accidentally perform action in error
													//Can fail to perform action as it isn't clear how
												//Coding
													//Could be more efficient
													//Could be easier to understand (and thus build on without introducing bugs) e.g. cross fewer files to perform action
												//Functionality
													//Corupted state
														//Server stops running and won't restart without rolling back to previous version
													//Cybersecurity issue
														//Vulnerable to cyber attack that enables control of server
														//Vulnerable to cyber attack that enables control of users machine
													//Crash bug
														//Server stops running
													//Perform action in error
														//You ask for A and get B e.g. request to order 1 and get 10
													//Fail to perform action
														//e.g. You simply can't order items to Ireland
										},
									},
									//A repository can have malware in it, 
									//if run the PC running the server may be compromised
									//or the computer of a connected user, or their data input into the website may be compromised
									malware:{
										//A control ip, or location to send extracted data
										//A virus to infect a pc
									},
									commits:{
										//What was updated and by whom
										//What 'ticket' is associated with this commit
										//Each commit can add or remove transforms, tests and issues with them
									},
								},
							},
							developmentBranches:{
								newPaymentFeature:{
									sourceFiles:{
									},
									commits:{
									},
								},
							},
							testingBranches:{
							},
						},
					},
				},
			},
		},
	},
};