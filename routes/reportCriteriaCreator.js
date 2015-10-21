var MongoClient = require('mongodb').MongoClient;

//Connect to mongodb [ConnectionURL]
var url = 'mongodb://localhost:27017/impact';



module.exports = {
    get_create_criteria: function(req, res, next) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err, "\n");
            }

            var collection = db.collection('CriteriaCreator');
            // Insert some documents
            collection.find().toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }
                // console.log(result);

                db.close();
                return res.render('create_criteria');
            });
        });

    },
    get_create_hub_criteria: function(req, res, next) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err, "\n");
            }

            var collection = db.collection('CriteriaCreator');
            // Insert some documents
            collection.find().toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }
                // console.log(result);

                db.close();
                return res.render('create_criteria');
            });
        });
    },
    create_hub_criteria: function(req, res, next) {
    		//funder creates hub criteria
        var inputData = JSON.parse(JSON.stringify(req.body));

        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err, "\n");
            }

            var collection = db.collection('CriteriaCreator');
            // Insert some documents
            collection.insert(inputData, function(err, result) {

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
    create_startup_criteria: function(req, res, next) {

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
        });
    }

}