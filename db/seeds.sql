INSERT INTO departments (department_name)
VALUES
('Human Resources'),
('Marketing'),
('Finance'),
('Information Technology');

INSERT INTO roles (title, salary, department_id)
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

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Doe', 2, 1),
('Maria', 'King', 3, NULL),
('Erick', 'Johnson', 4, NULL),
('Lucas', 'Edwards', 5, NULL),
('Samantha', 'Myers', 6, 5),
('Timothy', 'Cannon', 7, 8),
('Rachel', 'Katamina', 8, NULL);
