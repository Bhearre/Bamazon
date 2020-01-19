var mysql = require("mysql");
var inquirer = require("inquirer");

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
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(results);
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
                    message: "What would you like to buy?"
                }).then(function (answer) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].product_name == answer.choice) {
                            var chosenProduct = results[i];

                            inquirer.prompt({
                                name: "quantity",
                                type: "input",
                                message: "How many do you want to buy?",
                                validate: function (value) {
                                    if (isNaN(value) == false) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            }).then(function (answer) {
                                if (chosenProduct.stock_quantity > parseInt(answer.quantity)) {
                                    console.log("Chosen Product is " + chosenProduct.product_name);
                                    console.log("Chosen Product is " + chosenProduct.item_id);

                                    var newQuantity = chosenProduct.stock_quantity - answer.quantity;
                                    var totalOrderCost = chosenProduct.stock_quantity * chosenProduct.price;
                                    console.log("Your order will be " + totalOrderCost);
                                    connection.query("UPDATE products SET ? WHERE ?", [{
                                        
                                        stock_quantity: newQuantity
                                    }, {
                                        item_id: chosenProduct.item_id
                                    }], function (err, results) {
                                        console.log("Order successfully placed and your total cost will be " + totalOrderCost);
                                        start();
                                    });
                                } else {
                                    console.log("Insufficient Quantity: There are only " + chosenProduct.stock_quantity + " of this item in inventory at this time");
                                    start();
                                }
                            })
                        }
                    }
                })
            })
        };

