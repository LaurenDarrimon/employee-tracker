const classes = require("./classes")


// define functions to run based on employee input to add or update company data


const addDepartment = () => {
    //prompted to enter the name of the department 
    //and that department is added to the database
    console.log("fxn to add department is running");

};

const addRole = () => {
    //prompted to enter the name, salary, and department for the role and 
    //that role is added to the database
    console.log("fxn to add role is running");

};

const addEmployee = () => {
    //prompted to enter the employee’s first name, last name, role, and manager, 
    //and that employee is added to the database

    console.log("fxn to add employee is running");

};

const updateRole = () => {
    //prompted to select an employee to update and their new 
    //role and this information is updated in the database 
    console.log("fxn to update role is running");
    
};

module.exports = {addDepartment, addEmployee, addRole, updateRole};