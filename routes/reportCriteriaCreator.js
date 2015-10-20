module.exports = {
	get_create_criteria : function(req, res, next){
		res.render('create_criteria');
	},
	get_create_hub_criteria : function(req, res, next){

		res.render('create_criteria');
	},
	create_hub_criteria : function(req, res, next){

		var hub_criteria_template  =JSON.parse((req.body).criteria_template);

		var reportDataCapturer = require('./reportDataCapturer');
		
		reportDataCapturer.save_data(hub_criteria_template, "../data/hub_criteria.json");

		return res.redirect('/criteria');
	},
	create_startup_criteria : function(req, res, next){
		var startup_criteria = JSON.parse(JSON.stringify(req.body)),
			reportDataCapturer = require('./reportDataCapturer');


		if (startup_criteria != {}) {
			var report_template = require('../data/hub_criteria.json'),
				startup_criteria_template = {};

			//Create copy of template. Don't wanna mess up template.
			for(key in report_template){

				if (key != 'Criteria'){
					startup_criteria_template[key] = report_template[key]; 
				}
				else{
					startup_criteria_template["Criteria"] = [];

					for(metric in startup_criteria){
						for(k = 0; k < report_template["Criteria"].length; k++){
							var num = Number(/\d+/.exec(metric)[0]);
							if(k === num){
								startup_criteria_template["Criteria"].push(report_template["Criteria"][k]);
							}
						}
					}
				}
			}
		}
		reportDataCapturer.save_data(startup_criteria_template, '../data/startup_criteria_template.json');

		return res.redirect('/criteria');
	}
}