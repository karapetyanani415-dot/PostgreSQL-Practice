ALTER TABLE categories ALTER COLUMN category_name SET NOT NULL;

ALTER TABLE categories ADD CONSTRAINT unique_category_name UNIQUE (category_name);
ALTER TABLE categories ADD CONSTRAINT check_category_name CHECK (char_length(category_name) >= 3);

ALTER TABLE categories ADD COLUMN description TEXT;

ALTER TABLE categories ADD COLUMN is_active BOOLEAN DEFAULT true;

\d categories;

INSERT INTO categories (category_name) VALUES ('Electronics');

INSERT INTO categories (category_name) VALUES ('TV');

INSERT INTO categories (category_name) VALUES ('');

INSERT INTO categories (category_name, description) VALUES ('Sport', 'shoes');
SELECT * FROM categories;