var MongoClient = require('mongodb').MongoClient;

//Connect to mongodb [ConnectionURL]
var url = 'mongodb://localhost:27017/impact';

exports.postArticle = function(req, res, next){

	var inputData = JSON.parse(JSON.stringify(req.body));


	MongoClient.connect(url, function(err, db){
		if(err){
			console.log(err,"\n");
		}

		var collection = db.collection('CriteriaCreator');
		// Insert some documents
		collection.insert(
			{Indicator:[{detail:inputData.detail,type:inputData.type}], Criteria:[{metric:inputData.metric, type:inputData.type}]}
			, function(err, result) {

				if (err) {
					console.log(err);
				};
			// console.log("Inserted new post into the articles collection");
			// console.log(result);

			db.close();

			res.redirect('/create_hub_criteria')
		});
	});
};

