var fs = require('fs');

module.exports = {

	save_data : function(data, filename){

		return fs.writeFile(filename, JSON.stringify(data));

	},
	read_data : function(filename){
		var data = fs.readFileSync(filename);
		console.log(JSON.parse(JSON.stringify(data)));
		return data;
	},
	render_criteria : function(req, res, next){

		var create_program_template = require('../data/funder_criteria');

		res.render("criteria", {create_program_template : create_program_template});
	},
	save_report : function(req, res, next){
		var report_template = require('../data/funder_criteria.json'),
			report_answers = JSON.parse(JSON.stringify(req.body));

		//Getting basic hub details
		report_template.OrganisationName = report_answers.OrganisationName;
		report_template.ContactPerson = report_answers.ContactPerson;
		report_template.Type = report_answers.Type;
		report_template.Description = report_answers.Description;

		//Getting Criteria values
		for(var metric = 0; metric < report_template.Criteria.length; metric++){
			if(report_answers.hasOwnProperty(report_template.Criteria[metric].fieldName)){
				report_template.Criteria[metric].value = report_answers[report_template.Criteria[metric].fieldName];
			}
		}


		res.redirect('/criteria')

	}
}