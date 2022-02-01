INSERT INTO department (department_name )
VALUES   ("Engineering"), 
        ("Marketing");

INSERT INTO job (title, salary, department_id)
VALUES  ("Engineer", 130000, 1),
        ("Cheif Engineer", 200000, 1),
        ("Social Media Specialist", 120000, 2),
        ("Head of Marketing", 190000, 2);
     
INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES   ("Elliot", "Smith", 1, 3),
        ("Igor", "Stein", 1, 3),
        ("Amira", "Afzal", 2, 2), 
        ("Christoper", "Lee", 3, 5),
        ("Verónica", "Rodriguez", 4, 3);


SELECT * FROM department;
SELECT * FROM job;
SELECT * FROM employee;


