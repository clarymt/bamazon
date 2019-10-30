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
  

  function itemChoice() {
    inquirer
      .prompt([
        {
          name: "userPurchase",
          type: "rawlist",
          message: "Which product would you like to purchase? (Enter Id_#) ",
     
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to purchase? ",
      
         
        }
      ])
      
      .then(function(answer) {
       /* var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.userPurchase) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE auctions SET ? WHERE ?",
            [
              {
                stock_quantity: stock_quantity - answer.quantity
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Bid placed successfully!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your bid was too low. Try again...");
          runSearch();
        }
      });*/
          var itemSelected = answer.userPurchase;
          var quantityChosen = answer.quantity;
           console.log(itemSelected);
        console.log(answer.quantity);
        for (var i = 0; i < results.length; i++){
          if (quantityChosen > results[itemSelected].stock_quantity) {
              console.log("We simply cannot supply your needs at this moment in time.")
          }
          else {
            console.log("Thanks for your business! You have purchased " + answer.quantity +" " + itemSelected + "(s)")
          }}
          
       
     //   var query = "SELECT product_name, stock_quantity FROM bamazon WHERE item_id=answer.userPurchase";
      //connection.query(query, [answer.userPurchase, answer.quantity], function(err, res) {
       //    console.log(
        //     res
         //);
        
        //runSearch();
          
    

          
        
        

    

    
  