'use strict';

const  userService= require('./../services/user-services');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');

/**
 * Creates a new user and sets the response.
 *
 * @param request
 * @param response
*/
//creates a new user 
exports.save = (request, response ,next) => {
    
    var user = new User();

    user.username = request.body.user.username;
    user.email = request.body.user.email;
    user.setPassword(request.body.user.password);
  
    userService.save(user).then(function(){
      return response.json({user: user.toAuthJSON()});
    }).catch(next);
};

/**
 * login user sets the response.
 *
 * @param request
 * @param response
*/
//login user
exports.login = (req, res ,next) => {
    
    if(!req.body.user.email){
      return res.status(422).json({errors: {email: "can't be blank"}});
    }
  
    if(!req.body.user.password){
      return res.status(422).json({errors: {password: "can't be blank"}});
    }
  
    passport.authenticate('local', {session: false}, function(err, user, info){
      if(err){ return next(err); }
  
      if(user){
        user.token = user.generateJWT();
        return res.json({user: user.toAuthJSON()});
      } else {
        return res.status(422).json(info);
      }
    })(req, res, next);
  };
  