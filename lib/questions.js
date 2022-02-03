//declare series of questions that will run based on user input direction 

const startQuestion = {
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
    message: 'Would you like to continue working or quit?',
    name: 'continue',
    choices: ["continue", "quit"],
};

const department = [
    //prompted to enter the name of the department 
    {
        type: 'input',
        message: 'Department:',
        name: 'department',
        default: "Soul"
    }
];

const role = [
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
        default: 108000
    },
    {
        type: 'input',
        message: 'Department ID',
        name: 'department_id',
        default: 3
    }
];



const employee = [
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
        message: 'Employee role ID',
        name: 'role_id',
        default: 5
    },
    {
        type: 'input',
        message: 'Employees manager ID:',
        name: 'manager_id',
        default: 1
    }
];



module.exports = {
    startQuestion,
    department,
    role,
    employee,
    continueYN
}