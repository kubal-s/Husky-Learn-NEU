const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const UserSchema = new mongoose.Schema({
  username: {
    type: String, 
    lowercase: true, 
    unique: true, 
    required: [true, "can't be blank"], 
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true},
  email: {
    type: String, 
    lowercase: true, 
    unique: true, 
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true},
  favorites: [{ type: mongoose.Schema.Types.ObjectId,
             ref: 'Article' }],
  bio: String,
  image: String,
  hash: String,
  salt: String,
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, 

{timestamps: true});

UserSchema.plugin(uniqueValidator, {message: ' is already taken.'});

UserSchema.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
  let today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UserSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT()
  };
};

// Creating profile to get user by username
UserSchema.methods.toProfileJSONFor = function(user){
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || 'https://cdn0.iconfinder.com/data/icons/avatar-2/500/man-2-512.png',
    following:  false  // following feature implementation later
  };
};

//Favorite an Article
UserSchema.methods.favorite = function(id){
  if(this.favorites.indexOf(id) === -1){
    this.favorites.push(id);
  }

  return this.save();
};
//UnFavorite and Article
UserSchema.methods.unfavorite = function(id){
  this.favorites.remove( id );
  return this.save();
};

//Check if article is favorite
UserSchema.methods.isFavorite = function(id){
  return this.favorites.some(function(favoriteId){
    return favoriteId.toString() === id.toString();
  });
};

//follow another user 
UserSchema.methods.follow = function(id){
  if(this.following.indexOf(id) === -1){
    this.following.push(id);
  }

  return this.save();
};
//unfollow a user 
UserSchema.methods.unfollow = function(id){
  this.following.remove(id);
  return this.save();
};
mongoose.model('User', UserSchema);
