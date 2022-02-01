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
                company.query('SELECT * FROM department', function (err, results) {
                    console.log ("\n")
                    console.table(results);
                    console.log ("\n");
                    continueQ();
                });
            } break;;

            case "View All Roles": { 
                company.query('SELECT * FROM role', function (err, results) {
                    console.log (" \n");
                    console.table(results);
                    console.log (" \n");
                    continueQ();
                });
            } break;

            case "View All Employees": {
                company.query('SELECT * FROM employee', function (err, results) {
                    console.log ("\n");
                    console.table(results);
                    console.log ("\n");
                    continueQ();
                });
            } break; 

            case  "Add a Department": {
                add.addDepartment();
            } break;

           case  "Add a Role": {
               add.addRole();
            } break; 

            case "Add an Employee" :{
                add.addEmployee();
            } break; 

            case "Update an Employee Role":{
                add.updateRole(); 
            } break; 
        }
    }) 
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

    


