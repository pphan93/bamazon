var inquirer = require("inquirer");
var connection = require("./connector.js");




function showOptions() {
    inquirer.prompt([{
            type: "list",
            name: "menu",
            message: "Menu Options",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        }

    ]).then(function (option) {

        switch (option.menu) {
            case "View Products for Sale":
                viewProductsForSale();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                runAddNewProduct();
                break;
            default:
                connection.end();
        }
    });
}

//showOptions();

function viewProductsForSale() {

    connection.runQuery("SELECT item_id as id,product_name,price,quantity FROM products", "", function (result) {
        console.table(result);
        showOptions();
    });


}


function viewLowInventory() {
    connection.runQuery("SELECT item_id as id,product_name,price,quantity FROM products where quantity < 5;", "", function (result) {
        console.table(result);
        showOptions();
    });
}

function addToInventory() {
    connection.runQuery("SELECT item_id as id,product_name,price,quantity FROM products", "", function (result) {
        console.log("_________ADD TO INVENTORY___________");
        console.table(result);
        inquirer.prompt([{
                name: "productIDToADD",
                message: "Enter product ID to add to Inventory: "
            },
            {
                name: "quantityToADD",
                message: "Quantity to Add: "
            }

        ]).then(function (input) {

            if ((isNaN(input.productIDToADD) || isNaN(input.quantityToADD)) || (input.productIDToADD == "" || input.quantityToADD == "")) {
                console.log("****************ENTER VALID INPUT**********");
                addToInventory();
            } else {
                quantityToADD = parseInt(input.quantityToADD);
                connection.runQuery("UPDATE products SET quantity = quantity +" + quantityToADD + " WHERE item_id = " + input.productIDToADD, "", function (result) {
                    console.log("Updated quantity " + quantityToADD + " for item ID " + input.productIDToADD);
                    console.log("__________________________________");
                    showOptions();
                });
            }

        });
    });
}

function addNewProduct(departmentName) {
    console.log("________ADD PRODUCT______");
    inquirer.prompt([{
            name: "product_name",
            message: "Enter the product name: "
        },
        {
            type: "list",
            name: "department_name",
            message: "Select the department name:",
            choices: departmentName

        },
        {
            name: "price",
            message: "Enter the price: "
        },
        {
            name: "quantity",
            message: "Enter the quantity: "
        }

    ]).then(function (input) {

        if ((isNaN(input.price) || isNaN(input.quantity)) || (input.product_name == "" || input.price == "" || input.quantity == "")) {
            console.log("****************ENTER VALID INPUT**********");
            runAddNewProduct();
        } else {
            connection.runQuery("INSERT INTO products (product_name, department_name, price,quantity) VALUES (?,?,?,?)", [input.product_name, input.department_name, input.price, input.quantity], function (res) {
                console.log("Product have been added into the store");
                console.log("__________________________________");
                showOptions();
            });
        }


    });

}

function runAddNewProduct() {
    //get depertmentName
    connection.query("select department_name from departments", function (err, res) {
        if (err) throw err;
        var departmentName = [];
        for (var i in res) {
            departmentName.push(res[i].department_name);
        }
        addNewProduct(departmentName);
    });
}

module.exports.run = showOptions;