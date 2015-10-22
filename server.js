var express = require('express');
var app = express();
var http = require('http').Server(app);
var exphbs  = require('express-handlebars'),
    MongoClient = require('mongodb').MongoClient,
    session = require('express-session'),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(session({secret: "bookworms", cookie: {maxAge: 600000}, resave:true, saveUninitialized: false}));
app.use(express.static("public"))
app.use("/static", express.static("."));



var reportDataCapturer = require('./routes/reportDataCapturer'),
	reportCriteriaCreator = require('./routes/reportCriteriaCreator');
var	startupService = require('./routes/startupService'),
	hubService = require('./routes/hubService'),
	funderService = require('./routes/fundService');

app.get(["/criteria", "/"], reportDataCapturer.render_criteria);

app.post("/criteria_post", reportDataCapturer.save_report);

app.post("/create_startup_criteria", hubService.create_startup_criteria);

app.get("/startup_criteria", startupService.render_criteria);
app.post("/startup_criteria", startupService.save_report);

app.get('/create_hub_criteria', reportCriteriaCreator.get_create_hub_criteria);

app.post('/create_hub_criteria', reportCriteriaCreator.create_hub_criteria);

app.get('/hubs/:hub_name/view_report', hubService.view_report);
app.get('/hubs/startups', hubService.list_startups);
app.get('/hubs/startups/:startup_name', startupService.view_report);

app.get('/startup/view_report/:startup_name', startupService.view_report);

app.get('/hubs', funderService.	list_hubs);
app.get('/hubs/:hub_name', hubService.view_report);
app.get('/hubs/:hub_name/startups', hubService.list_startups);
app.get('/hubs/:hub_name/startups/startup_name', startupService.view_report);

http.listen(3000, function(server){
    console.log('listening on :::3000');
});
