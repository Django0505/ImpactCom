module.exports = {
	get_create_criteria : function(req, res, next){
		res.render('create_criteria');
	},
	create_startup_criteria : function(req, res, next){
		var startup_criteria = JSON.parse(JSON.stringify(req.body)),
			reportDataCapturer = require('./reportDataCapturer');

		if (startup_criteria != {}) {
			var report_template = require('../data/criteria_template.json'),
				startup_criteria_template = {};

			//Create copy of template. Don't wanna mess up template.
			for(key in report_template){
				if (key != 'Criteria'){
					startup_criteria_template[key] = report_template[key]; 
				}
				else{
					startup_criteria_template["Criteria"] = [];

					for(k = 0; k < report_template["Criteria"].length; k++){
						for(metric in startup_criteria){

							if(report_template["Criteria"][k]["fieldName"] == startup_criteria[metric]){
								startup_criteria_template["Criteria"].push(report_template["Criteria"][k]);
							}
						}
					}
				}
			}
		}
		reportDataCapturer.save_data(startup_criteria_template, '../data/startup_criteria_template.json');

		res.redirect('/criteria');
	}
}