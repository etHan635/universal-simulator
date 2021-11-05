//An abstract concept of a group project, typically a piece of paid work
data["Projects"] = {
	
	//The idea of creating a new shop organisation
	newShop:{
	},

	//Abstract stages of a project:

	//Stage 0: Get approval to investigate
		//Someone has an idea of a useful improvement (or problem)
		//Designs basic requirements
		//Designs basic stages
		//Identifies some types of people to help work on it		
		//Creates proposal that work be done (as email? as suggestion at meeting)
		//Gets approval for first stage

	//Stage 1: Find someone to create proposal
		//Get internal resources to build plan (people/time)
	//or
		//a: Find contractor
			//i: find and contact contractor
			//or
			//i: advertise
		//b: Request tender from contractor/s

	//Stage 2: Done by contract or internal team : Detailed plan (with resource requirements)
		//Discussions with contractor regarding work
		//Stages of development
		//'Epics' associated with each stage
		//Time period/staff requirements
		//Core technical decisions (language etc.)
		//Hardware purchase requirements e.g. cloud computing resources

	//Stage 3: Select/Negotiate plan

	//Stage 4: Get approval to instigate plan (including resource commitments)

	//Stage 5: Start work on project
	
	//Stage 6: Prototype stage
		//Create initial technical infrastructure
		//Start taking 'tickets' and refining them into specific tasks

		//Obtains initial resources (approval of use of time)
		//Obtains initial team (or time from different people)
		
		//Builds advertisement for others to start project

	//Stage 7: Ticketing stage (partial overlap with prototype stage)
		//Every 2/4 weeks loop
		//Discuss what epics to pursue in this loop
		//Identify bugs to focus on this loop

		//Do work
			//Design
				//Take an 'Epic' ticket
				//Discuss with client
				//Create individual task tickets
			//Manage Code
				//Discuss design with junior technical staff
				//Review code and request changes/approve
				//Help with bugfix
			//Program
				//Discuss design of work for ticket from senior staff
				//Complete the work for the ticket
				//Create tests for work
				//Get clarification from customer if unclear what needed
				//Fix bugs detected in work
			//UI
				//Develop the design/implementation of the UI for the ticket
				//Get approval from customer

		//Test new technical work
			//Run automated tests
			//Perform manual tests
			//Fix bugs
			//Ask for help with bugs

		//Get approval of work
			//Get UI approval of work
			//Get peer review of code/approval 
			//Get project owner approval
			//Get customer approval

		//Review progress against schedule
			//Refine 'Epic' ticket list
			//Get part of the money from customer

	//Stage 8: Handoff

	//Stage 9: Maintenance
		//Every 2/4 weeks loop, 
		//Identify bugs to fix
		//Fix issues (not bugs) to improve software
		//Trigger new project to create related project for new customer? 
			//or address a new issue for an existing customer
	
	//This represents the idea of a project, it refers to: 
	//the digital artifacts produced in creating an idea, 
	//the people who influence its development including those who do work towards making it real
	softwareProject:{
		//Projects to make or improve an online shop experience
		onlineShop:{
			//A clothing site is also a an online shop
			nextDirect:{
				
			},
			//A fast food delivery site is also an online shop
			dominosOnline:{
				
			},
			amazonShopping:{
				visualisation:{
					shortname:"Amazon shopping project",
				},		
				properties:{
					
					//The cause of a project is a problem (issue)
						//A new shop wants an online order as part of it's creation
						//Existing shop wants an online ordering
						//Existing online shop wants an improved online shop (is this a new project or simply an adaptation of the original?)
					cause:undefined,
					
					stage:"Maintenance",

					//People who follow the design direction of the leader
					//Realistically each person will have their own ideas which may be inconsistent
					//But these can be modelled as issues rather than needing to be modelled independently
					members:{
						//Members have influence over each other (but this is stored within the agents themselves)
					},

					//People who have a say in whether the project is a success
					stakeholders:{
						//Stakeholders have influence over each other and project members
						//(but this is stored within the agents themselves)
					},

					roles:["dataEntry",
							"shopper"],

					ticketing:"DataStorages/ticketing/amazonShoppingJira",
					bugTracking:"DataStorages/ticketing/amazonShoppingJira",
					sourceCode:"DataStorages/sourceControl/amazonShopping/properties/accounts/files/repository0",

					//Usecases may be documented
					//Plausible sequences of actions that a user with a particular role might make of the system
					//ideally each sub task is identified as a user story
					useCases:{
						dataEntry:{
						},
						shopper:{
							buysomething:{
								steps:[
									
								],
								issues:{
									//this might not actually reflect a usecase that occurs with the project
								},
							},
						},
					},
					
					//Changes in the idea of the project over time
					commits:{
					},
				},
			},
		},
	},
};
