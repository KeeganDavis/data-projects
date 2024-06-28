-- find average unit price for each product category
SELECT 
	product_category, 
		ROUND(AVG(unit_price), 2) as avg_unit_price
FROM 
	online_sales
GROUP BY 
	product_category
ORDER BY 
	avg_unit_price DESC;

-- find total units sold for each product category
SELECT 
	product_category, 
	SUM(units_sold) as sum_units_sold
FROM 
	online_sales
GROUP BY 
	product_category
ORDER BY 
	sum_units_sold DESC;

-- find total revenue for each product category
SELECT 
	product_category, 
	SUM(total_revenue) as category_total_revenue
FROM 
	online_sales
GROUP BY 
	product_category
ORDER BY 
	category_total_revenue DESC;

-- find percentage of overall revenue for each product category
SELECT 
    product_category,
    SUM(total_revenue) AS category_total_revenue,
    ROUND((SUM(total_revenue) / total_overall_revenue) * 100, 2) AS percentage_of_total_revenue
FROM 
    online_sales,
    (SELECT SUM(total_revenue) AS total_overall_revenue FROM online_sales) AS overall
GROUP BY 
    product_category,
    overall.total_overall_revenue
ORDER BY 
	percentage_of_total_revenue DESC;

-- find percentage of payment methods used for all transactions
SELECT
	payment_method,
	COUNT(payment_method) AS payment_method_count,
	(COUNT(payment_method)::FLOAT / total_payments) * 100 AS percentage_of_payment_methods
FROM
	online_sales,
	(SELECT COUNT(payment_method) AS total_payments FROM online_sales) AS overall
GROUP BY 
	payment_method,
	overall.total_payments
ORDER BY
	payment_method_count DESC;

-- find revenue per payment method used
SELECT 	
	payment_method,
	SUM(total_revenue) as sum_total_revenue
FROM
	online_sales
GROUP BY
	payment_method
ORDER BY 
	sum_total_revenue DESC;