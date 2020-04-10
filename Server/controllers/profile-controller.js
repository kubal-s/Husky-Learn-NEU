'use strict';

const  profileService= require('./../services/profile-services');
const mongoose = require('mongoose');
const User = mongoose.model('User');
/**
 * get userprofile sets the response.
 *
 * @param request
 * @param response
*/
//get userprofile 
exports.getProfile = (req, res ,next) => {

    retriveUser(req,callback)
    function callback(){
        if(req.payload){
            profileService.get(req.payload.id).then(function(user){
              if(!user){
                return res.json({profile:req.profile.toProfileJSONFor(false)});
              }
              return res.json({profile: req.profile.toProfileJSONFor(user)});
            });
          }else{
            return res.json({profile: req.profile.toProfileJSONFor(false)});
          } 
    }
};


//Retrieve user usign username  
function retriveUser(req,next){
    profileService.find(req.params.username).then(function(user){
        if (!user) { return res.sendStatus(404); }
        req.profile = user;
        return next();
      }).catch(next);
}