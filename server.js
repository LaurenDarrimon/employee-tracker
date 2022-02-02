// Import (require) all the goodies (node modules)
const fs = require("fs");
const conTable = require('console.table');
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
//const mysql = require('mysql2/promise'); 
const internal = require("stream");


//import required files 
const add = require("./lib/add");
//const view = require("./lib/view");
const questions = require("./lib/questions");
const { response } = require("express");
//const { exit } = require("process");


//const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const company = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);
  
const init = () => {
    //prompt user for what they would like to do 
    inquirer.prompt(questions.startQuestion).then((response) => {
        
        //object destructing to pull out repsonse 
        const { startOption }  = response;

        console.log (startOption);
     
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

const viewTableFunction = (table_name) => {
    company.query(`SELECT * FROM ${table_name}`, function (err, results) {
        console.log ("\n")
        console.table(results);
        continueQ();
    });
}

const addDepartment = () => {
    inquirer.prompt(questions.department).then((response) => {

        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        const department_name = [response.department];
            
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
    inquirer.prompt(questions.role).then((response) => {
            
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const newRole = [
            response.role, 
            response.salary, 
            response.department_id,
        ]

        company.query(sql, newRole, (err, result) => {
            if (err) {
                console.log({ error: err.message });
                return;
            }
            console.log(`All Roles (plus newly added role)`)
            viewTableFunction("role");
        });
    });
};

const addEmployee = () => {
    inquirer.prompt(questions.employee).then((response) => {

        console.log(response);

        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const newEmployee = [
            response.first_name, 
            response.last_name, 
            response.role_id, 
            response.manager_id,
        ]

        console.log(newEmployee);

        company.query(sql, newEmployee, (err, result) => {
            if (err) {
                console.log({ error: err.message });
                return;
            }
            console.log(`All Employees (plus newly added employee)`)
            viewTableFunction("employee");
        });
    });
};

const updateEmployee = () => {

    inquirer.prompt(questions.updateRoleQuestions).then((response) => {

        console.log(response);

        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        const update = [ response.role_id, response.id ]

        console.log(update);

        company.query(sql, update, (err, result) => {
            if (err) {
                console.log({ error: err.message });
                return;
            }
            console.log(` Employee's role has been updated.`)
            viewTableFunction("employee");
        });
    });


    
}



const continueQ = () => {
    inquirer.prompt(questions.continueYN).then((response) => {
        if (response.continue === 'yes'){  
            init(); 
        } else {
            console.log("Thank you for using this program.");
            process.exit();
        }
    })   
}


init();

    


