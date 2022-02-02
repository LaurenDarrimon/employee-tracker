INSERT INTO department (department_name )
VALUES  ("Engineering"), 
        ("Marketing"),
        ("Inspiration");

INSERT INTO role (title, salary, department_id)
VALUES  ("Engineer", 130000, 1),
        ("Cheif Engineer", 200000, 1),
        ("Social Media Specialist", 120000, 2),
        ("Head of Marketing", 190000, 2),
        ("Poet", 120000, 3);
     
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Joni", "Mitchell", 2, null),  
        ("Neil", "Young", 4, null),  
        ("Cat", "Stevens", 1, 1),
        ("Bram", "Stoker", 1, 1),
        ("Dr.", "Frankenstein", 3, 2);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


SELECT role.id, title, salary, department_name
FROM role
LEFT JOIN department ON department_id = department.id;