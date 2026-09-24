ALTER TABLE products
ADD CONSTRAINT fk_products_category
FOREIGN KEY (category_id)
REFERENCES categories(category_id);

ALTER TABLE orders
ADD CONSTRAINT fk_orders_product
FOREIGN KEY (product_id)
REFERENCES products(product_id);

INSERT INTO products (product_name, price, category_id, stock_quantity)
VALUES ('Test Product', 10.00, 999, 5);

DELETE FROM categories
WHERE category_name = 'Electronics';


