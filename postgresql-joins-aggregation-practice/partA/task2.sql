-- SELECT authors.name, SUM(articles.views)
-- FROM articles
-- JOIN authors ON articles.author_id = authors.author_id
-- GROUP BY authors.name;

-- SELECT authors.name, SUM(articles.views)
-- FROM articles
-- JOIN authors ON articles.author_id = authors.author_id
-- GROUP BY authors.name
-- HAVING SUM(articles.views) > 1000;

-- SELECT articles.title,COUNT(comments.comment_id)
-- FROM articles
-- LEFT JOIN comments ON articles.article_id = comments.article_id
-- GROUP BY articles.title;

-- SELECT articles.title,COUNT(comments.comment_id)
-- FROM articles
-- LEFT JOIN comments ON articles.article_id = comments.article_id
-- GROUP BY articles.title
-- ORDER BY COUNT(comments.comment_id) DESC
-- LIMIT 1;

