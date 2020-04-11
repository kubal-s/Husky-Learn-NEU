'use strict';

const  userService= require('./../services/user-services');
const  articleService= require('./../services/article-services');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Article = mongoose.model('Article');
/**
 * save an article sets the response.
 *
 * @param request
 * @param response
*/
exports.save = (req, res ,next) => {
    userService.get(req.payload.id).then(function(user){
        if (!user) { return res.sendStatus(401); }
  
        let article = new Article(req.body.article);
    
        article.author = user;
         articleService.save(article).then(function () {
          return res.json({ article: article.toJSONFor(user) });
        });
    })

};

/**
 * get an article sets the response.
 *
 * @param request
 * @param response
*/
exports.get = (req, res ,next) => {
    retriveArticle(req,callback);
    function callback(){
        Promise.all([
            req.payload ? userService.get(req.payload.id) : null,
            req.article.populate('author').execPopulate()
          ]).then(function (results) {
            let user = results[0];
        
            return res.json({ article: req.article.toJSONFor(user) });
          }).catch(next);
    }
};

/**
 * update an article sets the response.
 *
 * @param request
 * @param response
*/
exports.update = (req, res ,next) => {
    retriveArticle(req,callback);
    function callback(){
        userService.get(req.payload.id).then(function (user) {
 
            if (req.article.author._id.toString() === req.payload.id.toString()) {
              if (typeof req.body.article.title !== 'undefined') {
                req.article.title = req.body.article.title;
              }
        
              if (typeof req.body.article.description !== 'undefined') {
                req.article.description = req.body.article.description;
              }
        
              if (typeof req.body.article.body !== 'undefined') {
                req.article.body = req.body.article.body;
              }
        
              articleService.save(req.article).then(function (article) {
                return res.json({ article: article.toJSONFor(user) });
              }).catch(next);
            } else {
              return res.sendStatus(403);
            }
          });
    }

};
/**
 * delete an article sets the response.
 *
 * @param request
 * @param response
*/
exports.delete = (req, res ,next) => {
  retriveArticle(req,callback);

  function callback(){
    userService.get(req.payload.id).then(function () {
      if (req.article.author._id.toString() === req.payload.id.toString()) {
        return articleService.delete(req.article._id).then(function () {
          return res.sendStatus(204);
        });
      } else {
        return res.sendStatus(403);
      }
    });

  } 
}
/**
 * favorite an article sets the response.
 *
 * @param request
 * @param response
*/
exports.favorite = (req, res ,next) => {
  retriveArticle(req,callback);

  function callback(){
    let articleId = req.article._id;

    userService.get(req.payload.id).then(function (user) {
      if (!user) { return res.sendStatus(401); }
  
      return user.favorite(articleId).then(function () {
        return req.article.updateFavoriteCount().then(function (article) {
          return res.json({ article: article.toJSONFor(user) });
        });
      });
    }).catch(next);

  } 
}

/**
 * unfavorite an article sets the response.
 *
 * @param request
 * @param response
*/
exports.unfavorite = (req, res ,next) => {
  retriveArticle(req,callback);

  function callback(){
    let articleId = req.article._id;

    userService.get(req.payload.id).then(function (user) {
      if (!user) { return res.sendStatus(401); }
  
      return user.unfavorite(articleId).then(function () {
        return req.article.updateFavoriteCount().then(function (article) {
          return res.json({ article: article.toJSONFor(user) });
        });
      });
    }).catch(next);
  } 
}

//Retrieve article given slug 
function retriveArticle(req,next){
    articleService.find(req.params.slug)
    .populate('author')
    .then(function (article) {
      if (!article) { return res.sendStatus(404); }
      req.article = article;

      return next();
    }).catch(next);
}