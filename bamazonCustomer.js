var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon",
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});


function runSearch() {
    console.log("\n");
    console.log("Recieving shipment...\n");
    connection.query("SELECT * FROM products", function(err, results) {
      //similar code when comparing inquirer results and DB
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log("");
      for (var i = 0; i < results.length; i++) {
        console.log(results[i].item_id + " | ",
          results[i].product_name + " | ", 
          "Department: " + results[i].department_name + " | ", 
          "$" + results[i].price + " | ", 
          "stock: " + results[i].stock_quantity);
      }
      console.log("");

      //to be used after no longer searchign database connection.end()
      itemChoice();
      
    });
  

  var itemChoice = function() {
    inquirer
      .prompt(
        {
          name: "userPurchase",
          type: "input",
          message: "Which product would you like to purchase? (Enter Id_#) "
     
        }
      )
      .then(function(answer) {
        var itemSelected = answer.userPurchase;
        connection.query("SELECT * FROM products WHERE item_id=?", itemSelected, function(
            err,
            res
          ) {
            if (err) throw err;
            if (res.length === 0) {
              console.log(
                "That is unfortunately not an option, I however implore you to purchase another."
              );
    
              itemChoice(); 

            } 
            else {
              inquirer
                .prompt 
               ({
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase? "
                
                })
                .then(function(secondAnswer) {
                    var quantityChosen = secondAnswer.quantity;
                    if (quantityChosen > res[0].stock_quantity) {
                        console.log(
                            "Hey I appreciate your business, but we're waiting on another shipment. Only " + res[0].stock_quantity + " on hand!!!"
                        );
                    itemChoice();
                    } else {
                        var math = quantityChosen*res[0].price
                        console.log("");
                        console.log(res[0].product_name + "... Good choice! ");
                        console.log("");
                        console.log("You bought " + quantityChosen + " unit(s) of this essential and paid a total of ONLY $" + math);
                        var newQuantity = res[0].stock_quantity - quantityChosen;
                        connection.query(
                          "UPDATE products SET stock_quantity = " +
                            newQuantity +
                            " WHERE item_id = " +
                            res[0].item_id,
                          function(err, resUpdate) {
                            if (err) throw err;
                            console.log("");
                            console.log("Your Order has been Processed");
                            console.log("");
                            console.log("Thank you for Shopping with us...!");
                            console.log("");
                           connection.end();
                          }
                        );
                      }
                    });
                }
              });
            });
        };
    }
    //runSearch(); 
