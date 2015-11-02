var	notificationService = require('./notificationService'),
	dataAggregator = require('./dataAggregator'),
	reportCriteriaCreator = require('./reportCriteriaCreator'),
	reportDataCapturer = require('./reportDataCapturer'),
	reportService = require('./reportService');

//Connect to mongodb [ConnectionURL]
var url = 'mongodb://localhost:27017/impact';
var MongoClient = require('mongodb').MongoClient;

module.exports = {
	render_criteria : function(req, res, next){

		MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err, "\n");
            }

            var collection = db.collection('CriteriaCreator');
            // Insert some documents
            collection.find({"For" : "startups"}).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }

                console.log(JSON.stringify(result))
	            var create_template = result[0] ? JSON.parse(result[0]) : {};

                db.close();

                return res.render("criteria_for_startup", {
                		create_template : create_template,
                		OrganisationType : "StartUp"
                	});
            });
        });
	},
	save_report : function(req, res, next){

	return res.redirect('/startup_criteria');
	},
	view_report : function(req, res, next){
		var report = reportService.hub_report();

		res.render('view_report', {report : report});
	}
}