DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  product_sales DECIMAL(10,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price,quantity)
VALUES ('Samsung UN65NU7100FXZC 65" 4K Ultra HD Smart LED TV', 'Electronic', 1097.99,10);

INSERT INTO products (product_name, department_name, price,quantity)
VALUES ('Playstation 4 - 1TB Slim', 'Video Games',  379.99,5);

INSERT INTO products (product_name, department_name, price,quantity)
VALUES ('ASUS GL504GV-DS74 ROG Strix Gaming Laptop, 15.6” FHD', 'Electronic', 2199.00,9);

INSERT INTO products (product_name, department_name, price,quantity)
VALUES ('Pulaski Power Home Theatre Recliner, USB Port, Tray, Blanche Black', 'Furniture', 898.26,2);

INSERT INTO products (product_name, department_name, price,quantity)
VALUES ('Sauder 420011 Coffee Table', 'Furniture', 259.99,6);

INSERT INTO products (product_name, department_name, price,quantity)
VALUES ('AmazonBasics 1/2-Inch Extra Thick Exercise Mat with Carrying Strap', 'Sports & Outdoors', 23.66,5);

INSERT INTO products (product_name, department_name, price,quantity)
VALUES ('NordicTrack T 6.5 S Treadmill', 'Sports & Outdoors', 738.82,3);

INSERT INTO products (product_name, department_name, price,quantity)
VALUES ('Nintendo Switch Console Neon Edition', 'Video Games', 373.98,7);

INSERT INTO products (product_name, department_name, price,quantity)
VALUES ('Hanes Mens EcoSmart Fleece Sweatshirt', 'Clothing', 9.99,11);

INSERT INTO products (product_name, department_name, price,quantity)
VALUES ('Haggar Mens Travel Stretch Tailored Fit 2Button Side Vent Solid Blazer', 'Clothing', 105.75,4);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(255) NULL,
  over_head_costs FLOAT ,
  PRIMARY KEY (department_id)
);

ALTER TABLE departments
ADD UNIQUE (department_name);

INSERT INTO departments (department_name, over_head_costs) values ('Electronic',20000),('Video Games',10000),('Furniture',5000),('Sports & Outdoors',5000),('Clothing',1000);


-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);