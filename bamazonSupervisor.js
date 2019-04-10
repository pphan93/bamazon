var inquirer = require("inquirer");
var connection = require("./connector.js");
//var Table = require('cli-table3');


function showOptions() {
    inquirer.prompt([{
            type: "list",
            name: "menu",
            message: "Menu Options",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
                "Exit"
            ]
        }

    ]).then(function (option) {

        switch (option.menu) {
            case "View Product Sales by Department":
                viewProductSalesbyDepartment();
                break;
            case "Create New Department":
                createNewDepartment();
                break;
            default:
                connection.end();
        }
    });
}

//showOptions();

function viewProductSalesbyDepartment() {
    connection.runQuery("SELECT lpad(d.department_id,2,0) as id ,d.department_name,d.over_head_costs,ifnull(sum(p.product_sales),0) product_sales,ifnull(sum(p.product_sales),0) - d.over_head_costs as total_profit FROM departments d LEFT JOIN products p ON d.department_name = p.department_name group by department_id,department_name,over_head_costs;", "", function (res) {
        var result = {};
        for (var i = 0; i < res.length; i++) {
            result[res[i].department_id] = {
                Department_name: res[i].department_name,
                Over_Head_Costs: res[i].over_head_costs,
                Product_Sales: res[i].product_sales,
                Total_Profit: res[i].total_profit
            };
        }
        console.table(res);
        showOptions();
    });
}

function createNewDepartment() {

    console.log("________ADD NEW DEPARTMENT______");
    inquirer.prompt([{
            name: "department_name",
            message: "Enter the department name: "
        },
        {
            name: "over_head_costs",
            message: "Enter the over head costs: "
        }

    ]).then(function (input) {
        connection.query("INSERT INTO departments (department_name, over_head_costs) values (?,?)", [input.department_name, input.over_head_costs], function (err, res) {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY' || err.errno == 1062) {
                    console.log('Error: Department is already exist');
                } else {
                    throw err;
                }
            } else {
                console.log(res);
                
            }
            showOptions();
        });
    });
}

module.exports.run = showOptions;