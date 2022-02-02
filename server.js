// Import all the node goodies (modules)
const conTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');  

const questions = require("./lib/questions"); //import required files 
//const add = require("./lib/add");
//const view = require("./lib/view");

let employeeArray; 
let roleArray; 
let departmentArray; 

// Connect to the database of departments, roles, and employees that makes up this company
const company = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);


  
const init = () => { //prompt user for what they would like to do 

    getEmployeeArray();
    getRoleArray();
    getDepartmentArray();

    inquirer.prompt(questions.startQuestion).then((response) => {
        
        //object destructing to pull out repsonse 
        const { startOption }  = response;
     
        //switch statement to call fxn based on input 
        switch (startOption) {

            case "View All Departments":{
                let sql = `SELECT * FROM department`
                viewTableFunction(sql); //display department table, then prompt if user would like to continue
            } break;;

            case "View All Roles" : { 
                let sql = 
                    `SELECT role.id, title, salary , department_name
                    FROM role
                    LEFT JOIN department ON department_id = department.id`;
                viewTableFunction(sql); 
            } break;

            case "View All Employees": {
                let sql = 
                    `SELECT employee.id, employee.first_name, employee.last_name, title, salary, department_name, manager.last_name AS manager
                    FROM employee
                    LEFT JOIN role ON role_id = role.id
                    LEFT JOIN department ON department_id = department.id
                    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;
                viewTableFunction(sql);   //display employee table,
            } break; 

            case  "Add a Department": {
                addDepartment();   //add a department, then display all, prompt if user would like to continue
            } break;

           case  "Add a Role": {
               addRole(); //add a role, display all, prompt to continue or quit
            } break; 

            case "Add an Employee" :{
                addEmployee(); //add an employee, display all, prompt to continue or quit
            } break; 

            case "Update an Employee Role":{
                updateEmployee(); 
            } break; 
        }
    }) 
}

//function to display a table from sql prepared statement, gets passed the table name as an argument
const viewTableFunction = (sql) => {  
    company.query(sql, function (err, results) {
        console.log ("\n")
        console.table(results);  //console.table makes a nice display of tables from the command line 
        continueQ();  //once table is displayed, prompt user if they would like to quit or continue
    });
}


const addDepartment = () => {
    //ask the array of inquirer questions for a new department, imported from questions.js
    inquirer.prompt(questions.department).then((response) => {

        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        const department_name = [response.department]; //assign response into new array
        
        //query the company database for the row insert that we need
        company.query(sql, department_name, (err, result) => {
            if (err) {
                console.log.json({ error: err.message });
                return;
            }
            console.log(`All Departments (with newly added ${department_name}`)
            let sql = `SELECT * FROM department`
            viewTableFunction(sql);
        });
    });
};

const addRole = () => {
     //ask the array of inquirer questions for a new role,

    inquirer.prompt(
        [            
            {
                type: 'input',
                message: 'What is the title of role:',
                name: 'title',
                default: "Songwriter",
            },
            {
                type: 'input',
                message: 'What is the salary of the role:',
                name: 'salary',
                default: 75000,
            },
            {
                type: 'list',
                message: 'Department:',
                name: 'department',
                choices: departmentArray,
            }
        ]
    ).then((response) => {

        console.log(response);
            
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;  //sql preapred statement 
        const newRole = [   //assign response into new array
            response.title, 
            response.salary, 
            response.department.split(" ")[0],
        ]

        //query the company database for the row insert that we need
        company.query(sql, newRole, (err, result) => {
            if (err) {
                console.log({ error: err.message });
                return;
            }
            console.log(`All Roles (plus newly added role)`)
            let sql = 
                `SELECT role.id, title, salary , department_name
                FROM role
                LEFT JOIN department ON department_id = department.id`;
            viewTableFunction(sql); 
        });
    });
};

const addEmployee = () => {

     //ask the array of inquirer questions for a new employee, imported from questions.js
    inquirer.prompt(
        [
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
                type: 'list',
                message: 'Employee job title:',
                name: 'title',
                choices: roleArray,
            },
            {
                type: 'list',
                message: 'Employees manager:',
                name: 'manager',
                choices: employeeArray,
            }
        ]
    ).then((response) => {

        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const newEmployee = [ //assign response into new array
            response.first_name, 
            response.last_name, 
            response.title.split(" ")[0], 
            response.manager.split(" ")[0],
        ];

        console.log(newEmployee);

        //query the company database for the row insert that we need
        company.query(sql, newEmployee, (err, result) => {
            if (err) {
                console.log({ error: err.message });
                return;
            }
            console.log(`All Employees (plus newly added employee)`)
            let sql = 
                    `SELECT employee.id, employee.first_name, employee.last_name, title, salary, department_name, manager.last_name AS manager
                    FROM employee
                    LEFT JOIN role ON role_id = role.id
                    LEFT JOIN department ON department_id = department.id
                    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;
            viewTableFunction(sql);   //show updated table 
        });
    });
};


const updateEmployee = () => {

    inquirer.prompt(  //prompted to select an employee to update and their new role
        [
            {
                type: 'list',
                message: 'Which Employee would you like to update?',
                name: 'fullName',
                choices: employeeArray,
            }, 
            {
                type: 'list',
                message: 'What is the employee\'s new job title',
                name: 'title',
                choices: roleArray,
            }
        ]
    ).then((response) => {

        employee_id = response.fullName.split(" ")[0]; 
        role_id = response.title.split(" ")[0]; 

        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        const update = [ role_id, employee_id ]

        //query the company database for the row insert that we need with update sql preapred statement 
        company.query(sql, update, (err, result) => {
            if (err) {
                console.log({ error: err.message });
                return;
            }
            console.log(` Employee's role has been updated.`)
            let sql = 
                    `SELECT employee.id, employee.first_name, employee.last_name, title, salary, department_name, manager.last_name AS manager
                    FROM employee
                    LEFT JOIN role ON role_id = role.id
                    LEFT JOIN department ON department_id = department.id
                    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;
            viewTableFunction(sql);  //show updated table 
        });
    });
};

const getEmployeeArray = () => {
    employeeArray= []; 
    company.query(`SELECT id, first_name, last_name FROM employee`, function (err, results) {  
        results.forEach(employee => {
            let fullName  = employee.id + " - " + employee.first_name + " " +  employee.last_name; 
            employeeArray.push(fullName);    
        });
    });                     
}

const getRoleArray = () => {
    roleArray = []; 
    company.query(`SELECT id, title FROM role`, function (err, results) {   
        results.forEach(role => {
            let title = role.id + " - " + role.title
            roleArray.push(title);    
        });
    });
}

const getDepartmentArray = () => {
    departmentArray = []; 
    company.query(`SELECT id, department_name FROM department`, function (err, results) {   
        results.forEach(department => {
            let newDep = department.id + " - " + department.department_name
            departmentArray.push(newDep);    
        });
    });
}

const continueQ = () => {  //prompt the user if they would like to continue or quit
    inquirer.prompt(questions.continueYN).then((response) => {
        if (response.continue === 'continue'){  
            init();  //ask start option question again. 
        } else {
            console.log("Thank you for using this program! \n");
            process.exit(); //exit application 
        }
    })   
}

init();  //call the first function, asking the user what work they would like to perform 


company.connect(function (err) {
     if (err) throw err;
 });
    


