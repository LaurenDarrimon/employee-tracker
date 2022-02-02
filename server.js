// Import all the node goodies (modules)
const conTable = require('console.table');
const inquirer = require('inquirer');
//const mysql = require('mysql2');
const mysql = require('mysql2/promise'); 

const questions = require("./lib/questions"); //import required files 
//const add = require("./lib/add");
//const view = require("./lib/view");


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

    inquirer.prompt(questions.startQuestion).then((response) => {
        
        //object destructing to pull out repsonse 
        const { startOption }  = response;
     
        //switch statement to call fxn based on input 
        switch (startOption) {

            case "View All Departments":{
                viewTableFunction("department"); //display department table, then prompt if user would like to continue
            } break;;

            case "View All Roles" : { 
                viewTableFunction("role"); //display role table
            } break;

            case "View All Employees": {
                viewTableFunction("employee");   //display employee table,
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
const viewTableFunction = (table_name) => {  
    company.query(`SELECT * FROM ${table_name}`, function (err, results) {
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
            viewTableFunction("department"); 
        });
    });
};

const addRole = () => {
     //ask the array of inquirer questions for a new role, imported from questions.js
    inquirer.prompt(questions.role).then((response) => {
            
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;  //sql preapred statement 
        const newRole = [   //assign response into new array
            response.role, 
            response.salary, 
            response.department_id,
        ]

        //query the company database for the row insert that we need
        company.query(sql, newRole, (err, result) => {
            if (err) {
                console.log({ error: err.message });
                return;
            }
            console.log(`All Roles (plus newly added role)`)
            viewTableFunction("role"); //show updated table 
        });
    });
};

const addEmployee = () => {
     //ask the array of inquirer questions for a new employee, imported from questions.js
    inquirer.prompt(questions.employee).then((response) => {

        //console.log(response);

        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const newEmployee = [ //assign response into new array
            response.first_name, 
            response.last_name, 
            response.role_id, 
            response.manager_id,
        ]

        //query the company database for the row insert that we need
        company.query(sql, newEmployee, (err, result) => {
            if (err) {
                console.log({ error: err.message });
                return;
            }
            console.log(`All Employees (plus newly added employee)`)
            viewTableFunction("employee"); //show updated table 
        });
    });
};

let employeeArray; 
let roleArray; 


const getEmployeeArray = async() => {
    employeeArray= []; 
    company.promise().query(`SELECT first_name, last_name FROM employee`)
        .then ((results) => {

            console.log(results);

            results.forEach(employee => {
                let fullName  = employee.first_name + " " +  employee.last_name; 
                employeeArray.push(fullName);    
            });
            console.log(employeeArray); 
            return employeeArray;
        })
        // .catch(console.log)
        // .then(() => company.end());                     
}
  
  


const getRoleArray = () => {
    roleArray= []; 
    company.promise().query(`SELECT title FROM role`, function (err, results) {
        
        results.forEach(role => {
            let title = role.title
            employeeArray.push(title);    
        });
        console.log(roleArray); 
    });
}



const updateEmployee = async () => {

         
    var eArray = await getEmployeeArray();
            

    inquirer.prompt(
        [
            //prompted to select an employee to update and their new role
            {
                type: 'list',
                message: 'Which Employee would you like to update?',
                name: 'fullName',
                choices: eArray,
            }, 
            // {
            //     type: 'input',
            //     message: 'What is the employees new job title',
            //     name: 'title',
            //     choices: roleArray,
            // }
        ]
    ).then((response) => {

        console.log(response);
        // const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        // const update = [ response.role_id, response.id ]

        // //query the company database for the row insert that we need with update sql preapred statement 
        // company.query(sql, update, (err, result) => {
        //     if (err) {
        //         console.log({ error: err.message });
        //         return;
        //     }
        //     console.log(` Employee's role has been updated.`)
        //     viewTableFunction("employee"); //show updated table 
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

    


