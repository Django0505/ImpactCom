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

            var CriteriaCreator = db.collection('CriteriaCreator');
            // Insert some documents
            CriteriaCreator.find({"For" : "startups"}).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }

	            var create_template = result[result.length-1] ? JSON.parse(JSON.stringify(result[result.length-1])) : {};

                db.close();

                return res.render("startup_report", {
                		create_template : create_template,
                		OrganisationType : "StartUp"
                	});
            });
        });
	},
	confirm_save_report : function(req, res, next){

        var inputData = JSON.parse(JSON.stringify(req.body));

        if(inputData.save_report){
            return res.redirect('/save_startup_criteria');
        }

        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err, "\n");
            }

            var CriteriaCreator = db.collection('CriteriaCreator');
            // Insert some documents
            CriteriaCreator.find({"For" : "startups"}).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }

                var create_template = result[result.length-1] ? JSON.parse(JSON.stringify(result[result.length-1])) : {};

                for(key in inputData){
                    if (/metric_/.exec(key)) {
                        var num = Number(/\d+/.exec(key)[0]);

                        create_template["Criteria"][num].Value = inputData[key];
                    }
                    else if (/indicator_/.exec(key)){
                        var num = Number(/\d+/.exec(key)[0]);

                        create_template["Indicator"][num].Value = inputData[key];
                    };
                }

                db.close();

                return res.render("startup_confirm_page", {
                        create_template : create_template,
                        heading : "Report"
                    });
            });
        });
    	// return res.redirect('/startup_criteria');
	},
    save_report : function(req, res, next){
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err, "\n");
            }

            var CriteriaCreator = db.collection('CriteriaCreator');
            // Insert some documents
            CriteriaCreator.find({"For" : "startups"}).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }

                var create_template = result[result.length-1] ? JSON.parse(JSON.stringify(result[result.length-1])) : {};

                var inputData = JSON.parse(JSON.stringify(req.body));

                for(key in inputData){
                    if (/metric_/.exec(key)) {
                        var num = Number(/\d+/.exec(key)[0]);

                        create_template["Criteria"][num].Value = inputData[key];
                    }
                    else if (/indicator_/.exec(key)){
                        var num = Number(/\d+/.exec(key)[0]);

                        create_template["Indicator"][num].Value = inputData[key];
                    };
                }

                db.close();

                var msg = "Report saved successfully!";
                if(inputData.save_profile)
                    msg = "Profile saved successfully!";

                return res.render("startup_page", {msg : msg});
            });
        });
        // return res.redirect('/startup_criteria');
    },
	view_report : function(req, res, next){
		var report = reportService.get_report({});

		res.render('view_report', {
            report : report,
            OrganisationType : "StartUp"
        });
	},
    startup_page : function(req, res, next){

        res.render('startup_page')
    }
}