var	notificationService = require('./notificationService'),
	dataAggregator = require('./dataAggregator'),
	reportCriteriaCreator = require('./reportCriteriaCreator'),
	reportDataCapturer = require('./reportDataCapturer'),
	reportService = require('./reportService');

var MongoClient = require('mongodb').MongoClient;

//Connect to mongodb [ConnectionURL]
var url = 'mongodb://localhost:27017/impact';
	
module.exports = {
	list_hubs : function(req, res, next){
		var hubs = [
					{hub_name : "mlab"},
					{hub_name : "codex"},
					{hub_name : "mlab"},
					{hub_name : "codex"}
					];

		return res.render('list_hubs', {hubs : hubs});
	},
	//render funder page
	funder_page : function(req,res, next){
		res.render('funder');
	},
	//View a single report of the hub using array index called rep_num
	view_hub_report : function(req, res, next){
		MongoClient.connect(url, function(err, db) {
	        if (err) {
	            console.log(err, "\n");
	        }

	        var collection = db.collection('CriteriaReports');
	        // Insert some documents
	        collection.find({
		        	Criteria:{
		        		$elemMatch:{
		        			value:{
		        				$exists : true,
		        				$nin:[""]
			        		}
			        	}
			        }
		    	}).toArray(function(err, result) {
	            if (err) {
	                console.log(err);
	            }
	            var report_number = req.params.rep_num;

	            var report = result[report_number];
	            
	            db.close();
	            res.render('view_report', {report : report,
	            			home_page : "/funder_page"
	            			});
	        });
	    });
	}
}