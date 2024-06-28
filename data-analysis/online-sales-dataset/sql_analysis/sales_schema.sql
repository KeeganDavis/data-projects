DROP TABLE IF EXISTS online_sales;

CREATE TABLE online_sales (
    transaction_ID INTEGER PRIMARY KEY,
    date VARCHAR(10),
    month_ INTEGER,
    product_category VARCHAR(30),
    product_name VARCHAR(60),
    units_sold INTEGER,
    unit_price NUMERIC(10, 2),
    total_revenue NUMERIC(10,2),
    region VARCHAR(30),
    payment_method VARCHAR(30)
);