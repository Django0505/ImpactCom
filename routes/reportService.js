var MongoClient = require('mongodb').MongoClient;

//Connect to mongodb [ConnectionURL]
var url = 'mongodb://localhost:27017/impact';

module.exports = {
	get_report : function(organisation){
		
		MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err, "\n");
            }

            var collection = db.collection('CriteriaReports');
            // Insert some documents
            collection.find({"Organisation" : organisation}).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }
               	var last_index = result.length-1;
	            var report_answers = result[last_index] // ? JSON.parse(result[0].criteria_template) : {};

                db.close();

                return report_answers;
            });
        });
	}
}