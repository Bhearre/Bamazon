var mysql = require("mysql");
var inquirer = require("inquirer");
var utility = require("./utility");
var Table = require('cli-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Fergaburga1",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    console.log("connected as " + connection.threadId);
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// Provide supervisor with a choise prompt
function start() {

    inquirer.prompt({
        name: "option",
        type: "list",
        message: "What do you want to manage?",
        choices: [
            "View Product Sales by Department",
            "Create New Department",
        ]
    })
        .then(function (answer) {

            switch (answer.option) {
                case "View Product Sales by Department":
                    viewProductSalesByDepartment();
                    break;
                case "Create New Department":
                    createNewDepartment();
                    break;
            }
        })
}

// Supervisors view of sales by department
var viewProductSalesByDepartment = function () {
    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS total_sales " +
        "FROM departments LEFT JOIN products ON departments.department_id = products.department_id " +
        "GROUP BY departments.department_id ORDER BY total_sales DESC"
    connection.query(query, function (err, results) {
        if (err) throw err;
        var table = new Table({
            head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit']
        });
        
        for (var i = 0; i < results.length; i++) {
            const r = results[i]
            table.push([r.department_id, r.department_name, r.over_head_costs, r.total_sales, (r.total_sales - r.over_head_costs)])
        }
        console.log(table.toString());
        start();
    })
}

// Supervisor's ability to create a new department 
function createNewDepartment() {
    inquirer
        .prompt([
            {
                name: "department_name",
                type: "input",
                message: "What is the department name?"
            },
            {
                name: "over_head_costs",
                type: "input",
                message: "What are the overhead costs??",
                validate: function (value) {
                    if (isNaN(value) == false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ])

        .then(function (answer) {

            queryString = "INSERT INTO departments (department_name, over_head_costs) VALUES ('" + answer.department_name + "', '" + answer.over_head_costs + "')";
            connection.query(queryString, function (err, result) {

                if (err) throw err;

                console.log("You have added " + answer.department_name + " with overhead costs of " + answer.over_head_costs + ".");


            }); start(); 

        }); 

} 


