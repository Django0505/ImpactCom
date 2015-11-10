var express = require('express');
var app = express();
var http = require('http').Server(app);
var exphbs  = require('express-handlebars'),
    MongoClient = require('mongodb').MongoClient,
    session = require('express-session'),
    bodyParser = require('body-parser');
var url = 'mongodb://localhost:27017/impact';
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
var	startupService = require('./routes/startupService');
	hubService = require('./routes/hubService'),
	funderService = require('./routes/fundService');


app.get(['/', '/home'], function(req, res, next){
	res.render('home');
})

app.get("/criteria", reportDataCapturer.render_criteria);
app.get("/funder_page", funderService.funder_page);

app.post("/criteria_post", reportDataCapturer.save_report);

app.post("/create_startup_criteria", hubService.create_startup_criteria);
app.post("/add_new_startup", hubService.add_new_startup);

app.get("/startup_criteria", startupService.render_criteria);
app.post("/confirm_startup_criteria", startupService.confirm_save_report);
app.post(["/save_startup_criteria", "/startup_profile"], startupService.save_report);

app.get(["/save_startup_criteria", "/startup_profile"], startupService.save_report);

app.get('/create_hub_criteria', reportCriteriaCreator.get_create_hub_criteria);

app.post('/create_hub_criteria', reportCriteriaCreator.create_hub_criteria);

app.get('/hub_page', hubService.hub_page)
app.get('/hubs/:hub_name/view_report', hubService.view_report);
app.get('/hubs/startups', hubService.list_startups);
app.get('/hubs/startups/:startup_name', startupService.view_report);
//app.get('/hubs/:hub_name/view_report/',hubService.view_profile);
app.get('/startup_page', startupService.startup_page);
app.get('/startups/view_report/:startup_name', startupService.view_report);

app.get('/hubs', funderService.list_hubs);
app.get(['/hubs/:hub_name', '/hub_page/view_report/:rep_num'], hubService.view_report);
app.get('/hubs/:hub_name/startups', hubService.list_startups);
app.get('/hubs/:hub_name/startups/startup_name', startupService.view_report);

app.get('/funder_new', function(req,res, next){
	res.render('funder');
})

app.all('*',function(req, res){

	res.send(404);
})
http.listen(3000, function(server){
    console.log('listening on :::3000');
});
