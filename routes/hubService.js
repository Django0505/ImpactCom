var	notificationService = require('./notificationService'),
	dataAggregator = require('./dataAggregator'),
	reportCriteriaCreator = require('./reportCriteriaCreator'),
	reportDataCapturer = require('./reportDataCapturer'),
	reportService = require('./reportService');


	var MongoClient = require('mongodb').MongoClient;

	//Connect to mongodb [ConnectionURL]
	var url = 'mongodb://localhost:27017/impact';

module.exports = {

	view_report : function(req, res, next){

		MongoClient.connect(url, function(err, db) {
	        if (err) {
	            console.log(err, "\n");
	        }

	        var collection = db.collection('CriteriaReports');
	        // Insert some documents
	        collection.find().toArray(function(err, result) {
	            if (err) {
	                console.log(err);
	            }
	            var report_number = req.params.rep_num;

	            var report = result[report_number];
	            
	            db.close();
	            res.render('view_report', {report : report});
	        });
	    });
	},
	list_startups : function(req, res, next){
		res.redirect('/criteria')
	},

	create_startup_criteria : reportCriteriaCreator.create_startup_criteria,

	hub_page : function(req, res, next){

		MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err, "\n");
            }

            var CriteriaCreator = db.collection('CriteriaCreator');
            var CriteriaReports = db.collection('CriteriaReports');

            CriteriaCreator.find({"For" : {$nin : ["startups"]}}).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }
                var last_index = result.length-1;
	            var criteria_temp = result[last_index].criteria_template ? JSON.parse(result[last_index].criteria_template) : {};

	            var profile_template = 	[
	            							{detail : "Name of Organisation"},		
	            							{detail : "Discription of Organisation"},
	            							{detail : "Years active"},
	            							{detail : "Contact Person"},
	            							{detail : "Contact Email"}
	            						];

	            CriteriaReports.find().toArray(function(err, allReports){
	                db.close();
	                
	                var allReports_copy = [];

					res.render('hub_page', {
											profile_template : profile_template,
											criteria_template : criteria_temp,
											view_hub_report	: allReports
										});
	            });
            });
        });
	},
	create_startup_criteria : reportCriteriaCreator.create_startup_criteria,

	add_new_startup : function (req, res, next) {
		
		var profile_template = 	[
									{detail : "Name of Organisation"},		
									{detail : "Discription of Organisation"},
									{detail : "Years active"},
									{detail : "Contact Person"},
									{detail : "Contact Email"}
								];

		var inputData = JSON.stringify(JSON.parse(req.body));

		res.redirect("/hub_page");
	}
}