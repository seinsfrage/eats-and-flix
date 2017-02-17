// ----------Initialize Express app--------
var express = require('express');
var app = express();
var PORT = process.env.PORT || 9001;

var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session'); 
var methodOverride = require('method-override');


// Sets up the Express app to handle data parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// static directory
app.use(express.static('public'));

//Method Override
app.use(methodOverride('_method'));


//Handlebars Config
// var exphbs = require('express-handlebars');
// app.engine('handlebars', exphbs({
// 	defaultLayout: 'main'
// }));
// app.set('view engine', 'handlebars');

//For serving front-end static content 
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
var routes = require('./controllers/controller.js');
app.use('/', routes);


// listen on port 9001
app.listen(PORT, function(){
	console.log("Listening on PORT " + PORT )
})