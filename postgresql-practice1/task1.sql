CREATE TABLE categories (
      category_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      category_name TEXT 
);


INSERT INTO categories (category_name)
VALUES ('Electronics'),
('Furniture'),
('Stationery'),
('Books'),
('Toys');

SELECT * FROM categories;
SELECT * FROM categories ORDER BY category_id;

UPDATE categories SET category_name = 'Toys & Games' WHERE category_name = 'Toys';
SELECT * FROM categories;

INSERT INTO categories (category_name) VALUES ('tmp');
SELECT * FROM categories;
DELETE FROM categories WHERE category_name = 'tmp';
SELECT * FROM categories;

