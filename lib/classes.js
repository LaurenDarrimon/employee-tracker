// create Classes for making a new instances of role, new department, and new employee

//DEPARTMENT structure
class Department {
    constructor(id, department_name){
        this.id = id; 
        this.department_name = department_name;
    }
};

//ROLE structure
class Role {
    constructor(id, title, salary, department_id){
        //ATTRIBUTES of role
        this.id = id; 
        this.title = title;
        this.salary =  salary; 
        this.department_id = department_id;
    }
};

//EMPLOYEE - structure for employee object 
class Employee {
    constructor(id, first_name, last_name, job_id, manager_id){
        //ATTRIBUTES of employee
        this.id = id; 
        this.first_name = first_name;
        this.last_name = last_name;
        this.job_id = job_id; 
        this.manager_id = manager_id;
    }
};

module.exports = { Department, Role, Employee };
