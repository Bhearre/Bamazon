DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  product_sales INT(10) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, product_sales, department_name, price, stock_quantity)
VALUES (1, "bread", 5, "bakery", 3, 20 );

INSERT INTO products (item_id, product_name, product_sales, department_name, price, stock_quantity)
VALUES (2, "butter", 2, "dairy", 3, 15 );

INSERT INTO products (item_id, product_name, product_sales, department_name, price, stock_quantity)
VALUES (3, "milk", 4, "dairy", 3, 20 );

INSERT INTO products (item_id, product_name, product_sales, department_name, price, stock_quantity)
VALUES (4, "eggs", 3, "dairy", 2, 15 );

INSERT INTO products (item_id, product_name, product_sales, department_name, price, stock_quantity)
VALUES (5, "tea", 1, "grocery", 4, 5 );

INSERT INTO products (item_id, product_name, product_sales, department_name, price, stock_quantity)
VALUES (6, "coffee", 2, "grocery", 5, 9 );

INSERT INTO products (item_id, product_name, product_sales, department_name, price, stock_quantity)
VALUES (7, "potatoes", 2, "produce", 3, 20 );

INSERT INTO products (item_id, product_name, product_sales, department_name, price, stock_quantity)
VALUES (8, "tomatoes", 2, "produce", 4, 8 );

INSERT INTO products (item_id, product_name, product_sales, department_name, price, stock_quantity)
VALUES (9, "hookie-dookies", 1, "recreational", 25, 5 );

INSERT INTO products (item_id, product_name, product_sales, department_name, price, stock_quantity)
VALUES (10, "A one way ticket to New Jersey", 1, "miscellaneous", 75, 7 );

INSERT INTO products (item_id, product_name, product_sales, department_name, price, stock_quantity)
VALUES (11, "beers", 1, "recreational", 12, 10 );


CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs INT(10) default 0,
  PRIMARY KEY (item_id) 
);

