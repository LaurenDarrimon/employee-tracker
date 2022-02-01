INSERT INTO department (department_name )
VALUES   ("Engineering"), 
        ("Marketing");

INSERT INTO job (title, salary, department_id)
VALUES  ("Engineer", 130000, 1),
        ("Cheif Engineer", 200000, 1),
        ("Social Media Specialist", 120000, 2),
        ("Head of Marketing", 190000, 2);
     
INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES  ("Amira", "Afzal", 2, null),  
        ("Verónica", "Rodriguez", 4, null),  
        ("Elliot", "Smith", 1, 1),
        ("Igor", "Stein", 1, 1),
        ("Christoper", "Lee", 3, 2);


SELECT * FROM department;
SELECT * FROM job;
SELECT * FROM employee;


