var connection = require("./connector.js");
var inquirer = require("inquirer");
//console.log(connection);

//listProducts();

function listProducts() {
    connection.runQuery("SELECT item_id as id,product_name,price FROM products", "", function (result) {
        console.table(result);
        showOptions();
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
        if ((isNaN(user.selectedID) || isNaN(user.userQuantity)) || (user.selectedID == "" || user.userQuantity == "")) {
            console.log("****************ENTER VALID INPUT**********");
            showOptions();
        } else {
            checkQuantity(user.selectedID, user.userQuantity);
        }

    });
}

function checkQuantity(selectedID, userQuantity) {
    selectedID = parseInt(selectedID);
    userQuantity = parseInt(userQuantity);
    connection.query("SELECT price,quantity FROM products where item_id = ?", [selectedID], function (err, res) {
        if (err) throw err;
        //console.log(res.length);

        if (res === undefined || res.length == 0) {
            console.log("_______________________________");
            console.log("Product not found. Please make sure you enter correct ID.");
            listProducts();
        } else {
            var storeQuantity = res[0].quantity;
            var storePrice = res[0].price;

            if (userQuantity > storeQuantity) {
                console.log("Insufficient Quantity!");
                showOptions();
            } else {
                var userTotalPrice = storePrice * userQuantity;
                console.log("Your total amount is $" + userTotalPrice);
                updateStoreQuantity(selectedID, userQuantity, userTotalPrice);
            }
        }


    });

}

function updateStoreQuantity(selectedID, remainingQuantity, userTotalPrice) {
    connection.query("UPDATE products SET quantity = quantity - ?, product_sales = product_sales + ?  where item_id = ? ", [remainingQuantity, userTotalPrice, selectedID], function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res.message);
        closeConnection();
    });
}


function closeConnection() {
    connection.end();
}

module.exports.run = listProducts;