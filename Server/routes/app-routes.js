'use strict';

const userController = require('../controllers/user-controller');
const auth = require('./auth');

//API's for routing toa specified request
module.exports = (app) => {
    app.route('/users')
        .post(userController.save);
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