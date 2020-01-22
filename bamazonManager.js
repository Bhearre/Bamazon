var mysql = require("mysql");
var inquirer = require("inquirer");
var utility = require("./utility");

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

function start() {

    inquirer.prompt({
        name: "option",
        type: "list",
        message: "What do you want to manage?",
        choices:
            ["View Products for Sale",
                "View Products with Low Inventory",
                "Add to Inventory",
                "Add a New Product"]
    })
        .then(function (answer) {


            console.log("this is the one that works - answer name: " + answer.option);

            //for (i=0;i<answer.choices.length;i++)

            switch (answer.option) {
                case "View Products for Sale":
                    viewProducts();
                    console.log("we're in case 0 " + answer.option);
                    break;
                case "View Products with Low Inventory":
                    viewLowInventory();
                    console.log("we're in case 1 " + answer.option);
                    break;
                case "Add to Inventory":
                    addInventory();
                    console.log("we're in case 2 " + answer.option);
                    break;
                case "Add a New Product":
                    addNewProduct();
                    console.log("we're in case 3 " + answer.option);
                    //managerChoice = $(addNewProduct);
                    break;

            }
        }) //closes then function answer
    //} //closes connection
}//closes start function

//Managers view of items for sale
var viewProducts = function () {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(utility.getDisplayProductFromDBResults(results));
        start();
    })
}

// Manager's view of low inventory items
var viewLowInventory = function () {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
        if (err) throw err;
        console.log(utility.getDisplayProductFromDBResults(results));
        start();
    })
}

// Manager's function to add additional items to inventory of existing items
function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(utility.getDisplayProductFromDBResults(results));
        inquirer
            .prompt(
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Which item would you like to add to inventory?"
                }).then(function (answer) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].product_name == answer.choice) {
                            var chosenProduct = results[i];

                            inquirer.prompt({
                                name: "quantity",
                                type: "input",
                                message: "How many do you want to add to inventory?",
                                validate: function (value) {
                                    if (isNaN(value) == false) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            }).then(function (answer) {
                                var newQuantity = chosenProduct.stock_quantity + parseInt(answer.quantity);

                                connection.query("UPDATE products SET ? WHERE ?", [{

                                    stock_quantity: newQuantity
                                }, {
                                    item_id: chosenProduct.item_id
                                }], function (err, results) {
                                    console.log(answer.quantity + " was successfully added to " + chosenProduct.product_name);
                                    console.log("Current stock of " + chosenProduct.product_name + " is " + newQuantity);
                                    start();
                                });

                            })
                        }
                    }
                })
    })
};
// Manager's ability to add new products for sale 
function addNewProduct() {
    //connection.connect(function (err) {
    connection.query("SELECT product_name FROM products", function (err) {
        //console.log("connected as " + connection.threadId);
        if (err) throw err;
        //run the start function after the connection is made to prompt the user


        inquirer
            .prompt([
                {
                    name: "product_name",
                    type: "input",
                    message: "What is the name of the new Product?"
                },
                {
                    name: "department_name",
                    type: "input",
                    message: "What is the department name?"
                },
                {
                    name: "price",
                    type: "input",
                    message: "What is the price??",
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                {
                    name: "stock_quantity",
                    type: "input",
                    message: "How many do you want to put in inventory?",
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

                console.log("this is answer : " + answer.product_name + " " + answer.stock_quantity);

                //if (err) throw err;
                // console.log("Connected!");
                queryString = "INSERT INTO products (product_name, product_sales, department_name, price, stock_quantity) VALUES ('" + answer.product_name + "', '" + 0 + "', '" + answer.department_name + "', '" + answer.price + "', '" + answer.stock_quantity + "')";
                connection.query(queryString, function (err, result) {

                    if (err) throw err;
                    
                    console.log("You have added " + answer.stock_quantity + " units of " + answer.product_name + ".");
                 
                
                });   start(); //closes connection query

    }); //closes then function answer





})//closes connection

    } //closes addtoinventory function


