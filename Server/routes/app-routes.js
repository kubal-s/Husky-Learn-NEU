'use strict';

const userController = require('../controllers/user-controller');
const profileController = require('../controllers/profile-controller');
const auth = require('./auth');

//API's for routing toa specified request
module.exports = (app) => {
    app.route('/users')
        .post(userController.save);
    app.route('/users/login')
        .post(userController.login);
    app.route('/user')
        .get(auth.required,userController.get)
        .put(auth.required,userController.update);
    app.route('/profile/:username')
        .get(auth.optional,profileController.getProfile);
    app.route('/profiles/:username/follow')
        .post(auth.required,profileController.follow);



    app.use(function (err, req, res, next) {
        if (err.name === 'ValidationError') {
            return res.status(422).json({
                errors: Object.keys(err.errors).reduce(function (errors, key) {
                    errors[key] = err.errors[key].message;        
                    return errors;
                }, {})
            });
        }
        return next(err);
    });
}