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
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, results) {
      //similar code when comparing inquirer results and DB
      if (err) throw err;
      // Log all results of the SELECT statement
      for (var i = 0; i < results.length; i++) {
        console.log(results[i].item_id);
        console.log(results[i].product_name);
        console.log(results[i].department_name);
        console.log(results[i].price);
        console.log(results[i].stock_quantity);
        console.log("\n");
      }
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
        connection.query("SELECT * FROM products WHERE Id=?", itemSelected, function(
            err,
            res
          ) {
            if (err) throw err;
            if (res.length === 0) {
              console.log(
                "We ran all out of that particular produce, I however implore you to purchase another."
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
                        console.log(res[0].stock_quantity + "... Good choice! ");
                        console.log("You bought " + quantityChosen + " of this particular essential and paid $ " + res[0].price);
                        var newQuantity = res[0].stock_quantity - quantity;
                        connection.query(
                          "UPDATE products SET stock_quantity = " +
                            newQuantity +
                            " WHERE id = " +
                            res[0].id,
                          function(err, resUpdate) {
                            if (err) throw err;
                            console.log("");
                            console.log("Your Order has been Processed");
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
        runSearch();
