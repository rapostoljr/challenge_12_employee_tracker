INSERT INTO departments (department_name)
VALUES
('Human Resources'),
('Marketing'),
('Finance'),
('Information Technology');

INSERT INTO role (title, salary, department_id)
VALUES
('Training and Development', 100000, 1),
('Recruiter', 50000, 1),
('Marketing Manager', 175000, 2),
('Digital Media Manager', 133000, 2),
('Actuary', 155000, 3),
('Payroll', 70000, 3),
('IT Technician', 51000, 4),
('Software Engineer', 115000, 4),
('Database Administrator', 95000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, 1),
('Jane', 'Doe', 1, 1),
('Erick', 'Johnson', 2, 2),
('Maria', 'King', 2, 2),
('Lucas', 'Edwards', 3, 3),
('Samantha', 'Myers', 3, 3),
('Rachel', 'Katamina', 4, 4),
('Timothy', 'Cannon', 4, 4);
