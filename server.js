// Import (require) all the goodies (node modules)
const fs = require("fs");
const conTable = require('console.table');
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');


//import required files 
const add = require("./lib/add");
const view = require("./lib/view");
const questions = require("./lib/questions")


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const init = () => {
    //prompt user for what they would like to do 
    inquirer.prompt(questions.startQuestion).then((response) => {

        
        //object destructing to pull out repsonse 
        const { startOption }  = response;

        console.log (startOption);

        //switch statement to call fxn based on input 
        switch (startOption) {
            case "View All Departments":{
                view.viewDepartments();
            } break;

            case "View All Roles": { 
                view.viewRoles();
            } break;

            case "View All Employees": {
                view.viewEmployees();
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

init();



