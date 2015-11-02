var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

//Connect to mongodb [ConnectionURL]
var url = 'mongodb://localhost:27017/impact';

var save_data = function(data, filename){

	var path = require('path');

	fs.writeFile(path.join(__dirname, filename), JSON.stringify(data), function(err){
		if(err){
			throw err;
		}
		console.log("Saved to",filename)
	});

}

module.exports = {

	read_data : function(filename){
		var data = fs.readFileSync(filename);
		console.log(JSON.parse(JSON.stringify(data)));
		return data;
	},
	render_criteria : function(req, res, next){

		MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err, "\n");
            }

            var CriteriaCreator = db.collection('CriteriaCreator');
            // Insert some documents
            CriteriaCreator.find({}).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }
                var last_index = result.length-1;
	            var criteria_temp = result[last_index].criteria_template ? JSON.parse(result[last_index].criteria_template) : {};

                db.close();
                return res.render("criteria", {
				criteria_template : criteria_temp	
				});
            });
        });
	},
	save_report : function(req, res, next){
		// var report_template = require('../data/hub_criteria.json'),
			// answers = JSON.parse(JSON.stringify(req.body));

    	var inputData = JSON.parse(JSON.stringify(req.body));
            inputData["Organisation"] = "mlab"


        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err, "\n");
            }

            var CriteriaReports = db.collection('CriteriaReports'),
                CriteriaCreator = db.collection('CriteriaCreator');
            // Insert some documents
            
            CriteriaCreator.find({"For" : {$nin : ["startups"]}}, function(err, template) {
                if (err) {
                    console.log(err);
                };
                // console.log("template", JSON.parse(template[0]))
                template = (template.criteria_template)? JSON.parse(template.criteria_template) : {};
                
                for(key in inputData){
                    if (/metric_/.exec(key)) {
                        var num = Number(/\d+/.exec(key)[0]);

                        template["Criteria"][num].value = inputData[key];
                    }
                    else if (/indicator_/.exec(key)){
                        var num = Number(/\d+/.exec(key)[0]);

                        template["Indicator"][num].value = inputData[key];
                    };
                }

                CriteriaReports.insert(template, function(err, result) {

                    if (err) {
                        console.log(err);
                    };

                    db.close();

                    return res.redirect('/criteria');

                });

            });
        });
	},
	//Save data function
	save_data : save_data
};