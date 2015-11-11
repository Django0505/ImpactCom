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
                return res.render('create_criteria', {criteria_template : result});
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

                return res.redirect('/funder/criteria');

            });

        })
    },
    create_startup_criteria: function(req, res, next) {

        var startup_criteria = JSON.parse(JSON.stringify(req.body));
        console.log(startup_criteria)

        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err, "\n");
            }

            var collection = db.collection('CriteriaCreator');

            collection.find().toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }

                criteria_template = JSON.parse(result[0].criteria_template);

                var startup_criteria_template = {
                    "Indicator" : [],
                    "Criteria" : [],
                    "For" : "startups"
                };

                for(k = 0; k < criteria_template["Indicator"].length; k++){

                    startup_criteria_template["Indicator"].push(criteria_template["Indicator"][k]);                
                }

                for(metric in startup_criteria){

                    for(k = 0; k < criteria_template["Criteria"].length; k++){
                
                        var num = Number(/\d+/.exec(metric)[0]);
                
                        if(k === num){
                
                            startup_criteria_template["Criteria"].push(criteria_template["Criteria"][k]);
                
                        }
                    }
                }

                collection.insert(startup_criteria_template, function(err, result) {

                    if (err) {
                        console.log(err);
                    };

                    db.close();

                    return res.redirect('/criteria');
                });

            });

           
        });
    }
}