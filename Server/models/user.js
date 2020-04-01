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
  bio: String,
  image: String,
  hash: String,
  salt: String
}, {timestamps: true});

mongoose.model('User', UserSchema);
