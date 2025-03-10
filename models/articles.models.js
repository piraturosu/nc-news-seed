const db = require("../db/connection");

function fetchArticles(article_id) {
  if (article_id) {
    return db
      .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
      .then(({ rows }) => {
        const article = rows[0];
        if (!article) {
          return Promise.reject({
            status: 404,
            message: "Article not found",
          });
        } else {
          return article;
        }
      });
  } else {
    return db
      .query(
        "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC",
      )
      .then(({ rows }) => {
        return rows;
      });
  }
}

module.exports = { fetchArticles };
