const router = require('express').Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

module.exports = router;

//Creating a route for getting set of tags used on an article
router.get('/', function (req, res, next) {
    Article.find().distinct('tagList').then(function (tags) {
        return res.json({ tags: tags });
    }).catch(next);
});