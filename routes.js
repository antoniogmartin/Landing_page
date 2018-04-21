

//RESTful route
var express = require('express'),
    router = express.Router();
var moment = require('moment');
var iban =require('iban');
var  expressValidator = require('express-validator');
var passport= require('passport');      

module.exports = function(app) {


    // =====================================
    // Index ========
    // =====================================
    app.get('/blog',function(req, res) {

            res.render('/blog');
        
    });


    app.use(router);

};