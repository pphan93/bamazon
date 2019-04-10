var customer = require("./bamazonCustomer");
var manager = require("./bamazonManager");
var supervisor = require("./bamazonSupervisor");
var inquirer = require("inquirer");

(function showOptions() {
    inquirer.prompt([{
            type: "list",
            name: "menu",
            message: "Are you a?",
            choices: [
                "Customer",
                "Manager",
                "Supervisor",
                "Exit"
            ]
        }

    ]).then(function (option) {

        switch (option.menu) {
            case "Customer":
                customer.run();
                break;
            case "Manager":
                manager.run();
                break;
            case "Supervisor":
                supervisor.run();
                break;
            default:
                //customer.connection.end();
                process.exit()
                break;

        }
    });
}());

//showOptions();