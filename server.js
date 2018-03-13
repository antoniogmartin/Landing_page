var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    flash    = require('connect-flash'),
    routes=require('./routes.js');
    
var app = express();
/*Establecer  EJS template Engine*/
app.set('views','./public/view');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(expressValidator());

var connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(

    connection(mysql,{
        database: process.env.SQL_DATABASE,
        user     : process.env.SQL_USER,
        password : process.env.SQL_PASSWORD,
        debug    : false,
        multipleStatements: true
    },'request')
); 

app.get('/',function(req,res){
    res.render('index');
});



routes(app,passport);

//Iniciar el server
const PORT = process.env.PORT || 8080;
var server = app.listen(PORT,function(){

   console.log("Listening to port %s",server.address().port);

});
