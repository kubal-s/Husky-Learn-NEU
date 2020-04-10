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
        // console.log(article)
         articleService.save(article).then(function () {
          return res.json({ article: article.toJSONFor(user) });
        });
    })

};
// router.post('/', auth.required, function (req, res, next) {
//     User.findById(req.payload.id).then(function (user) {
//       if (!user) { return res.sendStatus(401); }
  
//       let article = new Article(req.body.article);
  
//       article.author = user;
  
//       return article.save().then(function () {
//         console.log(article.author);
//         return res.json({ article: article.toJSONFor(user) });
//       });
//     }).catch(next);
//   });