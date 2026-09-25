-- SELECT books.title, AVG(reviews.rating), COUNT(reviews.review_id)
-- FROM books
-- LEFT JOIN reviews
--     ON books.book_id = reviews.book_id
-- GROUP BY books.book_id, books.title;

-- SELECT books.title, AVG(reviews.rating), COUNT(reviews.review_id)
-- FROM books
-- LEFT JOIN reviews
--     ON books.book_id = reviews.book_id
-- GROUP BY books.book_id, books.title
-- HAVING AVG(reviews.rating) >= 4;

-- SELECT books.title, AVG(reviews.rating), COUNT(reviews.review_id)
-- FROM books
-- LEFT JOIN reviews
--     ON books.book_id = reviews.book_id
-- GROUP BY books.book_id, books.title
-- HAVING COUNT(reviews.review_id) >= 2;