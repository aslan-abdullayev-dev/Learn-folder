--  ! ===================================== create "customers" table ========================================
create table customers (
    id INT,
    first_name STRING,
    last_name STRING,
    address STRING,
    PRIMARY KEY (id)
);
insert into customers
values (1, "John", "Doe", "32 Cherry Blvd"),
    (2, "Aslan", "Abdullayev", "21 Sunset Drive");
--  ! ===================================== end "customers" table ========================================
--  ! ===================================== create "products" table ========================================
create table products (
    id INT,
    name STRING,
    price MONEY,
    stock INT,
    PRIMARY KEY (id)
);
insert into products
values (1, "Pen", 1.20, 32),
    (2, "Pencil", 0.80, 12);
--  ! ===================================== end "products" table ========================================
--  ! ===================================== create "orders" table ========================================
create table orders (
    id INT,
    order_number INT,
    customer_id INT,
    product_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id) references customers (id),
    FOREIGN KEY (product_id) references products (id)
);
insert into orders
values (1, 4362, 2, 1);
--  ! ===================================== end "orders" table ========================================
-- ! ================================== CALLING DATA FROM ALL 3 TABLES =============================
select *
from customers;
select *
from products;
select *
from orders;
-- ! ================================== CALLING DATA FROM ALL 3 TABLES =============================
--  ! =================================== JOINING TABLES =====================================
select orders.order_number,
    customers.first_name,
    customers.last_name,
    customers.address
from orders
    inner join customers on orders.customer_id = customers.id;
select orders.order_number,
    products.name,
    products.price,
    products.stock
from orders
    inner join products on orders.product_id = products.id;
select orders.order_number,
    customers.first_name,
    customers.last_name,
    customers.address,
    products.name,
    products.price,
    products.stock
from orders
    inner join customers on orders.customer_id = customers.id,
    products on orders.product_id = products.id;
--  ! =================================== JOINING TABLES =====================================