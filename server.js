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
app.use("/static", express.static("views"))
app.use("/static", express.static("."))



var reportDataCapturer = require('./routes/reportDataCapturer');

app.get(["/criteria", "/"], reportDataCapturer.render_criteria);

app.post("/criteria_post", reportDataCapturer.save_report);

app
http.listen(3000, function(server){
    console.log('listening on *: 3000');
});
