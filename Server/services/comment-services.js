'use strict';
const mongoose = require('mongoose'),
    Comment = mongoose.model('Comment');
/**
 * Saves the new comment object.
 *
 * @param comment
*/
exports.save = (comment) => {
    const newComment = new Comment(comment);
    return newComment.save();
};