var express = require('express');
var app = express();
var http = require('http').Server(app);
var exphbs  = require('express-handlebars'),
    // MongoClient = require('mongodb').MongoClient,
    session = require('express-session'),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(session({secret: "bookworms", cookie: {maxAge: 600000}, resave:true, saveUninitialized: false}));
app.use(express.static('public'));

var create_program_template = require('./data/funder_criteria')

app.get(["/criteria", "/"], function(req, res, next){
	res.render("criteria", {create_program_template : create_program_template});
});

http.listen(3000, function(server){
    console.log('listening on *: 3000');
});
