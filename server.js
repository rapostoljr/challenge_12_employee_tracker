const inquirer = require("inquirer");
const mysql = require("mysql2");
require('dotenv').config();

// create a MySQL connection
const connection = mysql.createConnection(
    {
    host: "localhost",
    port: 3306,
    // logs into mysql using .env file
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    },
    console.log('Connected to database!')
);

function beginPrompt() {
    inquirer.prompt({
        type: "list",
        name: "user_selection",
        message: "Pick one of the following options:",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role",
            // BONUS, WILL DO IF HAVE TIME
            // "View Employees by Manager",
            // "View Employees by Department",
            // "Delete Departments",
            // "Delete Roles",
            // "Delete Employees",
            // "View Total Department Budget",
            "Exit",
        ]
    })
    .then((answers) => {
        console.log(`You have chose to "${answers.user_selection}"`);
        if (answers.user_selection === "View Departments") {
            viewDepartments();
        }
        if (answers.user_selection === "View Roles") {
            viewRoles();
        }
        if (answers.user_selection === "View Employees") {
            viewEmployees();
        }
        if (answers.user_selection === "Add a Department") {
            addDepartment();
        }
        if (answers.user_selection === "Add a Role") {
            addRole();
        }
        if (answers.user_selection === "Add an Employee") {
            addEmployee();
        }
        if (answers.user_selection === "Exit") {
            connection.end();
            console.log('Thank you for using Employee Tracker.')
        }
    });
}

// Ask if user wants to keep using application
function continuePrompt() {
    inquirer.prompt({
        type: "confirm",
        name: "continue",
        message: "Would you like to continue?"
    })
   .then((answer) => {
    if (answer.continue) {
        beginPrompt();
    } else {
        connection.end();
        console.log('Thank you for using Employee Tracker.')
    }
    })
}

function viewDepartments() {
    const departmentsQuery = 'SELECT * FROM departments'
    connection.query(departmentsQuery, (err,res) => {
        if (err) throw err;
        console.table(res);
        continuePrompt();
    })
}

function viewRoles() {
    const rolesQuery = 'SELECT * FROM roles'
    connection.query(rolesQuery, (err,res) => {
        if (err) throw err;
        console.table(res);
        continuePrompt();
    })
}

function viewEmployees() {
    const employeesQuery = 'SELECT * FROM employees'
    connection.query(employeesQuery, (err,res) => {
        if (err) throw err;
        console.table(res);
        continuePrompt()
    })
}

function addDepartment() {
    inquirer
    .prompt({
        type: "input",
        name: "newDepartment",
        message: "Enter New Department Name:",
    })
    .then((answer) => {
        const newDepartmentQuery = `INSERT INTO departments (department_name) VALUES ("${answer.newDepartment}")`;
        connection.query(newDepartmentQuery, (err, res) => {
            if (err) throw err;
            console.log(`Successfully added ${answer.newDepartment} department to the database!`);
            continuePrompt();
        });
    });
}

function addRole() {
    // fetches values from departments and stores it as departmentsQuery
    const departmentsQuery = 'SELECT * FROM departments'
    connection.query(departmentsQuery, (err,res) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                type: "input",
                name: "newRole",
                message: "Enter title of new role:",
            },
            {
                type: "input",
                name: "newRoleSalary",
                message: "Enter salary of new role:",
            },
            {
                type: "list",
                name: "newRoleDepartment",
                message: "Enter department of new role:",
                // displays copy of existing departments in departmentsQuery as choices and returns value
                choices: res.map(departments => ({
                    name: departments.department_name,
                    value: departments.id,
                }))
            },
        ])
        .then((answer) => {
            const newRoleQuery = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            connection.query(newRoleQuery, [answer.newRole, answer.newRoleSalary, answer.newRoleDepartment], (err, res) => {
                if (err) throw err;
                console.log(`Successfully added ${answer.newRole} role with a salary of ${answer.newRoleSalary} to the database!`);
                continuePrompt();
            });
        });
    });  
}

function addEmployee() {
    const rolesQuery = 'SELECT id, title FROM roles'
    connection.query(rolesQuery, (err,res) => {
        if (err) throw err;
    });
    const roles = res.map(({ id, title }) => ({
        name: title,
        value: id,
    }));
}

beginPrompt();
