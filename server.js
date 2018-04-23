var ghost = require('ghost'),  
    express = require('express'),
    hbs  = require('express-hbs'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    methodOverride = require('method-override'),
    path = require('path'),
    parentApp = express();
    
    parentApp.set('views','./public/view');
    parentApp.set('view engine','ejs');
    parentApp.use(express.static(path.join(__dirname, 'public')));
    parentApp.use(bodyParser.urlencoded({ extended: true })); 
    parentApp.use(bodyParser.json());
    parentApp.use(methodOverride('_method'));
    parentApp.use(expressValidator());


function processBuffer( buffer, app ){  
  while( buffer.length ){
    var request = buffer.pop();
    app( request[0], request[1] );
  }
}

function makeGhostMiddleware(cb, options) {  
  var requestBuffer = [];
  var app = false;

  ghost( options ).then( function( ghost ){
    app = ghost.rootApp;
    processBuffer( requestBuffer, app );
    cb();
  });

  return function handleRequest(req, res){
    if(!app) {
      requestBuffer.unshift( [req, res] );
    } else {
      app( req, res );
    }
  };
}

parentApp.set('port', (process.env.PORT || 2368));

parentApp.engine('hbs', hbs.express4({}));  
parentApp.set('view engine', 'hbs');  
parentApp.set('views', path.join(process.cwd(), 'views'));  
parentApp.use(express.static(path.join(process.cwd(), 'public')));

parentApp.get('/', function (req, res) {  
  res.render('index');
});

parentApp.use( '/blog', makeGhostMiddleware(function(ghostServer) {  
  require('./helpers')();
}, {
  config: path.join(process.cwd(), 'config.js')
}));