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
});

function viewDepartments() {
    const departmentsQuery = 'SELECT * FROM departments'
    connection.query(departmentsQuery, (err,res) => {
        if (err) throw err;
        console.table(res);
    })
}

function viewRoles() {
    const rolesQuery = 'SELECT * FROM roles'
    connection.query(rolesQuery, (err,res) => {
        if (err) throw err;
        console.table(res);
    })
}

function viewEmployees() {
    const employeesQuery = 'SELECT * FROM employees'
    connection.query(employeesQuery, (err,res) => {
        if (err) throw err;
        console.table(res);
    })
}