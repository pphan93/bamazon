var connection = require("./connector.js");
var inquirer = require("inquirer");
//console.log(connection);

listProducts();

function listProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        //console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name +
                " | " + res[i].price + "| " + res[i].quantity);
        }

        showOptions();
        //console.log(items)


    });
}

function showOptions() {
    inquirer.prompt([{
            name: "selectedID",
            message: "Enter ID of the Product: "
        }, {
            name: "userQuantity",
            message: "Enter Quantity : "
        }

    ]).then(function (user) {
        //AddItems(guess.name,guess.category,guess.starting_bid);
        checkQuantity(user.selectedID, user.userQuantity)
    });
}

function checkQuantity(selectedID, userQuantity) {
    selectedID = parseInt(selectedID);
    userQuantity = parseInt(userQuantity);
    console.log(selectedID);
    connection.query("SELECT * FROM products where item_id = ?", [selectedID], function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        //console.log(res);
        var storeQuantity = res[0].quantity;
        var storePrice = res[0].price;

        if (userQuantity > storeQuantity) {
            console.log("Insufficient Quantity!");
        } else {
            var userTotalPrice = storePrice * userQuantity;
            var remainingQuantity = storeQuantity - userQuantity;
            console.log("Your total amount is: " + userTotalPrice);
            updateStoreQuantity(selectedID, remainingQuantity)
        }

    });

}

function updateStoreQuantity(selectedID, remainingQuantity) {
    connection.query("UPDATE products SET quantity = ? where item_id = ? ", [remainingQuantity, selectedID], function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        //console.log(res);
        closeConnection();
    });
}


function closeConnection() {
    connection.end();
}