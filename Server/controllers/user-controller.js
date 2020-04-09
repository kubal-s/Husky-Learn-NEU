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