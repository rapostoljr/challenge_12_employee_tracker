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
        "Add a Manager",
        "Update an Employee Role",
        "View Employees by Manager",
        "View Employees by Department",
        "Delete Departments",
        "Delete Roles",
        "Delete Employees",
        "View Total Department Budget",
        "Exit",
    ]
})