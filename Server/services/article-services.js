'use strict';
const mongoose = require('mongoose'),
    Article = mongoose.model('Article');
/**
 * Saves the new article object.
 *
 * @param article
*/
exports.save = (article) => {
    const newArticle = new Article(article);
    return newArticle.save();
};
/**
 * Gets the article using slug
 *
 * @param username
*/
exports.find = (slug) => {
    return Article.findOne({slug: slug});
};
/**
 * Deletes an existing article.
 *
 * @param articleId
 * its the same as article ID
*/
exports.delete = (articleId) => {
    const promise = Article.findByIdAndRemove(articleId).exec();
    return promise;
};