// const router = require('express').Router();
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
// const auth = require('../auth');


// module.exports = router;

// // PrePopulate profile when username parameter is contained within a route.
// router.param('username', function(req, res, next, username){
//   User.findOne({username: username}).then(function(user){
//     if (!user) { return res.sendStatus(404); }

//     req.profile = user;

//     return next();
//   }).catch(next);
// });

// // Endpoint to fetch User's Profile by their username
// router.get('/:username', auth.optional, function(req, res, next){
//   if(req.payload){
//     User.findById(req.payload.id).then(function(user){
//       if(!user){
//         return res.json({profile:req.profile.toProfileJSONFor(false)});
//       }
//       return res.json({profile: req.profile.toProfileJSONFor(user)});
//     });
//   }else{
//     return res.json({profile: req.profile.toProfileJSONFor(false)});
//   }  
// });
// //follow a user
// router.post('/:username/follow', auth.required, function(req, res, next){
//   var profileId = req.profile._id;

//   User.findById(req.payload.id).then(function(user){
//     if (!user) { return res.sendStatus(401); }

//     return user.follow(profileId).then(function(){
//       return res.json({profile: req.profile.toProfileJSONFor(user)});
//     });
//   }).catch(next);
// });
// //unfollow a user 
// router.delete('/:username/follow', auth.required, function(req, res, next){
//   var profileId = req.profile._id;

//   User.findById(req.payload.id).then(function(user){
//     if (!user) { return res.sendStatus(401); }

//     return user.unfollow(profileId).then(function(){
//       return res.json({profile: req.profile.toProfileJSONFor(user)});
//     });
//   }).catch(next);
// });