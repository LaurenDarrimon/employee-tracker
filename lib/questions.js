//declare series of questions that will run based on user input direction 

const startQuestions  = {
    type: 'list',
    message: 'What would you like to do',
    name: 'Start Options',
    choices: [ 
        "View All Departments", 
        "View All Roles", 
        "View All Employees", 
        "Add a Department", 
        "Add a Role", 
        "Add an Employee", 
        "Update an Employee Role"
    ],
};

