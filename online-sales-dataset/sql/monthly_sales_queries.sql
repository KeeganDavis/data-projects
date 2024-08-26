-- find total revenue per item category by month
SELECT 
	month_,
	product_category,
	SUM(total_revenue) AS sum_total_revenue
FROM
	online_sales
GROUP BY
	month_,
	product_category
ORDER BY 
	month_ ASC;

-- find percentage of revenue by month
SELECT
	month_,
	SUM(total_revenue) as sum_total_revenue,
	ROUND((SUM(total_revenue) / overall_revenue) * 100, 2) AS monthly_revenue_percentage
FROM
	online_sales,
	(SELECT SUM(total_revenue) AS overall_revenue FROM online_sales) AS overall
GROUP BY
	month_,
	overall.overall_revenue
ORDER BY
	monthly_revenue_percentage DESC;

-- find total units sold per item category by month
SELECT 
	month_,
	product_category,
	SUM(units_sold) AS sum_units_sold
FROM
	online_sales
GROUP BY
	month_,
	product_category
ORDER BY 
	month_ ASC;

-- find percentage of units sold by month
SELECT
	month_,
	SUM(units_sold) as sum_units_sold,
	(SUM(units_sold)::FLOAT / overall_units_sold) * 100 AS units_sold_percentage
FROM
	online_sales,
	(SELECT SUM(units_sold) AS overall_units_sold FROM online_sales) AS overall
GROUP BY
	month_,
	overall.overall_units_sold
ORDER BY
	units_sold_percentage DESC;

-- find counts of payment methods used per month
SELECT
	month_,
	payment_method,
	COUNT(payment_method) AS payment_method_count
FROM
	online_sales
GROUP BY
	month_,
	payment_method
ORDER BY
	month_ ASC,
	payment_method ASC;