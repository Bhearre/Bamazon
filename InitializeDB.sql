DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs INT(10) default 0,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (1, "produce", 20);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (2, "bakery", 10);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (3, "dairy", 7);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (4, "grocery", 7);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (5, "recreational", 7);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (6, "miscellaneous", 7);


CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  product_sales INT NOT NULL,
  department_id INT NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, product_sales, department_id, price, stock_quantity)
VALUES (1, "bread", 5, 2, 3, 20 );

INSERT INTO products (item_id, product_name, product_sales, department_id, price, stock_quantity)
VALUES (2, "butter", 2, 3, 3, 15 );

INSERT INTO products (item_id, product_name, product_sales, department_id, price, stock_quantity)
VALUES (3, "milk", 4, 3, 3, 20 );

INSERT INTO products (item_id, product_name, product_sales, department_id, price, stock_quantity)
VALUES (4, "eggs", 3, 3, 2, 15 );

INSERT INTO products (item_id, product_name, product_sales, department_id, price, stock_quantity)
VALUES (5, "tea", 1, 4, 4, 5 );

INSERT INTO products (item_id, product_name, product_sales, department_id, price, stock_quantity)
VALUES (6, "coffee", 2, 4, 5, 9 );

INSERT INTO products (item_id, product_name, product_sales, department_id, price, stock_quantity)
VALUES (7, "potatoes", 2, 1, 3, 20 );

INSERT INTO products (item_id, product_name, product_sales, department_id, price, stock_quantity)
VALUES (8, "tomatoes", 2, 1, 4, 8 );

INSERT INTO products (item_id, product_name, product_sales, department_id, price, stock_quantity)
VALUES (9, "hookie-dookies", 1, 5, 25, 5 );

INSERT INTO products (item_id, product_name, product_sales, department_id, price, stock_quantity)
VALUES (10, "A one way ticket to New Jersey", 1, 6, 75, 7 );

INSERT INTO products (item_id, product_name, product_sales, department_id, price, stock_quantity)
VALUES (11, "beers", 1, 5, 12, 10 );



