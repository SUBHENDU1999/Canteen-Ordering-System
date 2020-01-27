var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-sessions');
var validatior = require('express-validator');
// var passport = require('passport');
// var mongoose = require('mongoose');



var app = express();
 

/* view Engine Setup */
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

// for Public Folder
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, 'public')));




/*
require('./core/passport');


//passport
app.use(passport.initialize());
app.use(passport.session());*/




app.get('/', (req,res) =>{
    res.render('signup');
    
});
 
// server setup

var port = 3000;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});
