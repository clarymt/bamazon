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
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});


function runSearch() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      //similar code when comparing inquirer results and DB
      if (err) throw err;
      // Log all results of the SELECT statement
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id);
        console.log(res[i].product_name);
        console.log(res[i].department_name);
        console.log(res[i].price);
        console.log(res[i].stock_quantity);
        console.log("\n");
      }
      //to be used after no longer searchign database connection.end()
      rangeSearch();
      
    });
  }

  function rangeSearch() {
    inquirer
      .prompt([
        {
          name: "userPurchase",
          type: "input",
          message: "Which product would you like to purchase? (Enter Id_#) ",
     
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to purchase? ",
         
        }
      ])
      
      .then(function(answer) {
        console.log(answer.userPurchase);
        console.log(answer.quantity);
        var query = "SELECT product_name, stock_quantity FROM bamazon WHERE item_id=answer.userPurchase";
      connection.query(query, [answer.userPurchase, answer.quantity], function(err, res) {
          console.log(
            res
          );
        
        //runSearch();
      });
    });

}
        
        

    

    
  