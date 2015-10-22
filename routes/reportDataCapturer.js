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

		// var create_program_template = require('../data/hub_criteria.json');
		 MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err, "\n");
            }

            var collection = db.collection('CriteriaCreator');
            // Insert some documents
            collection.find({}).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }
	            var criteria_temp = result[0] ? JSON.parse(result[0].criteria_template) : {};
                console.log

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


        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err, "\n");
            }

            var collection = db.collection('CriteriaCreator');
            // Insert some documents
            collection.insert({
                Indicator: [{
                    detail: inputData.detail,
                    type: inputData.type
                }],
                Criteria: [{
                    metric: inputData.metric,
                    type: inputData.type
                }]
            }, function(err, result) {

                if (err) {
                    console.log(err);
                };
                // console.log("Inserted new post into the articles collection");
                // console.log(result);

                db.close();

                return res.redirect('/criteria');

            });

        })
	},
	//Save data function
	save_data : save_data
};