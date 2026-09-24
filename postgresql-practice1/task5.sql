SELECT
      categories.category_name,
      SUM(orders.quantity * products.price) AS total_revenue
FROM orders
      JOIN products ON orders.product_id = products.product_id
      JOIN categories ON products.category_id = categories.category_id
GROUP BY categories.category_name;

SELECT
      products.product_name,
      COUNT(orders.order_id) AS order_count
FROM products
      LEFT JOIN orders ON products.product_id = orders.product_id
GROUP BY products.product_id,products.product_name;


SELECT
      categories.category_name,
      SUM(orders.quantity * products.price) AS total_revenue
FROM orders
      JOIN products ON orders.product_id = products.product_id
      JOIN categories ON products.category_id = categories.category_id
GROUP BY
      categories.category_id,
      categories.category_name
HAVING SUM(orders.quantity * products.price) > 100;