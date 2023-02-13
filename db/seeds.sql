INSERT INTO department (dept_name)
VALUES ('Sales'),
('Software Development'),
('Legal'),
('Finance');

INSERT INTO roles (title, salary, dept_id)
VALUES ('Sales Lead', 100000, 1),
('Sales Person', 80000, 2),
('Lead Engineer', 150000, 3),
('Software Engineer', 120000, 4),
('Account Manager', 160000, 5),
('Accountant', 125000, 6),
('Legal Team Lead', 250000, 7),
('Lawyer', 190000, 8);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2, 1),
('Katherine', 'Lantto', 3, NULL),
('Ashley', 'Rodriguez', 4, 3),
('Kunal', 'Singh', 5, NULL),
('Malia', 'Brown', 6, 5),
('Sarah', 'Lourd', 7, NULL),
('Tom', 'Allen', 8, 7);