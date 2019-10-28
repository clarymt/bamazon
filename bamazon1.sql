DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price VARCHAR(100),
  stock_quantity INTEGER(11),
  title VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE authors(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Bacon-Scented Pillow', 'Home', '12.00', '40');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Lottery Prayer Candle', 'Home', '6.99', '100');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Pickle-Flavored Popsicles', 'Food', '3.99', '25');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Plastic Beach Umbrella Anchor', 'Outdoors', '13.45', '40');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Inspirational Message Stones', 'Garden', '7.30', '15');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Dolphin Hand Puppet', 'Toys', '9.00', '125');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Live Maine Lobster', 'Food', '20.00', '30');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('As Seen on TV Roach Gel', 'Home', '9.88', '30');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Facial Hair Remover', 'Cosmetics', '15.99', '50');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Infrared Sauna', 'Health', '2800.00', '10');


SELECT * FROM products;


SELECT item_id, product_name, department_name, price, stock_quantity
FROM products