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