var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcryptjs');

// Get Users model
var User = require('../models/user');

/*
GET register
 */
router.get('/register', function (req, res) {

    res.render('register', {
        title: 'Register'
    });

});


// POST register

router.post('/signup', function (req, res) {

   
  
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var address = req.body.address;
    var state = req.body.state;
    var city = req.body.city;
   
  
    req.checkBody('username', 'Username is required!').notEmpty();
    req.checkBody('password', 'Password is required!').notEmpty();
    req.checkBody('email', 'Email is required!').isEmail();
    req.checkBody('address','address is required').notEmpty();
    req.checkBody('state','state is required').notEmpty();
    req.checkBody('city','city is required').notEmpty();




    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors,
            user: null,
            title: 'Register'
        });
    } else {
        User.findOne({username: username}, function (err, user) {
            if (err)
                console.log(err);

            if (user) {
                req.flash('danger', 'Username exists, choose another!');
                res.redirect('/users/register');
            } else {
                var user = new User({
                    email: email,
                    username: username,
                    password: password,
                    address: address,
                    city: city,
                    state: state
                   
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err)
                            console.log(err);

                        user.password = hash;

                        user.save(function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                req.flash('success', 'You are now registered!');
                                res.redirect('/users/login')
                            }
                        });
                    });
                });
            }
        });
    }

});


