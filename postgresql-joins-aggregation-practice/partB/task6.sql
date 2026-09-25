-- SELECT authors.name, SUM(articles.views)
-- FROM authors
-- JOIN articles
-- ON authors.author_id = articles.author_id
-- GROUP BY authors.name 
-- ORDER BY SUM(articles.views) DESC
-- LIMIT 1;

SELECT books.title, AVG(reviews.rating)
FROM books
JOIN reviews
ON books.book_id = reviews.book_id
GROUP BY books.title
HAVING COUNT(reviews.review_id) >= 2
ORDER BY AVG(reviews.rating) DESC
LIMIT 1;
