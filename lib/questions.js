//declare series of questions that will run based on user input direction 

const startQuestion  = {
    type: 'list',
    message: 'What would you like to do',
    name: 'startOption',
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

const continueYN = {
    type: 'list',
    message: 'Do you have more work to do?',
    name: 'contine',
    choices: [ "yes", "no"],
};

const departmentQuestions = [
 //prompted to enter the name of the department 
    {
        type: 'input',
        message: 'Department:',
        name: 'department',
        default: "Soul"
    }
];

const roleQuestions = [
    //prompted to enter the name, salary, and department for the role
    {
        type: 'input',
        message: 'Job Title:',
        name: 'role',
        default: "poet"
    },
    {
        type: 'input',
        message: 'Salary:',
        name: 'salary',
        default: "108000"
    },
    {
        type: 'input',
        message: 'Department:',
        name: 'department',
        default: "Soul"
    }
];



const employeeQuestions  = [
    //prompted to enter the employee’s first name, last name, role, and manager
    {
        type: 'input',
        message: 'Employee first name',
        name: 'first_name',
        default: "Bob"
    },
    {
        type: 'input',
        message: 'Employee last name',
        name: 'last_name',
        default: "Dylan"
    },
    {
        type: 'input',
        message: 'Employee role',
        name: 'role',
        default: "poet"
    },
    {
        type: 'input',
        message: 'Employees manager:',
        name: 'manager_name',
        default: "The muse"
    }
];


const updateRoleQuestions = [
    //prompted to select an employee to update and their new role
    {
        type: 'input',
        message: 'What is the employees new role?',
        name: 'role',
        default: "New Job Title"
    }
];


module.exports = { 
    startQuestion, 
    departmentQuestions, 
    roleQuestions, 
    employeeQuestions, 
    updateRoleQuestions, 
    continueYN 
}