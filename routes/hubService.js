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
	        collection.find({"Organisation" : req.params.hub_name}).toArray(function(err, result) {
	            if (err) {
	                console.log(err);
	            }
	            var report = result[0];
	            
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
            // Insert some documents
            CriteriaCreator.find({"For" : {$nin : ["startups"]}}).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }
                var last_index = result.length-1;
	            var criteria_temp = result[last_index].criteria_template ? JSON.parse(result[last_index].criteria_template) : {};

                db.close();
             
				var profile_template = 	{
											Organisation : "Name of Organisation",		
											OrganisationDescrption : "Discription of Organisation",
											YearsActive : "Years active",
											ContactPerson : "Contact Person",
											ContactEmail : "Contact Email"
										};

				res.render('hub_page', {profile_template : profile_template,
										criteria_template : criteria_temp
									});
            });
        });
	},
	create_startup_criteria : reportCriteriaCreator.create_startup_criteria
}