var fs = require('fs');

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

		var create_program_template = require('../data/funder_criteria');
		console.log(create_program_template)
		res.render("criteria", {create_program_template : create_program_template});
	},
	save_report : function(req, res, next){
		var report_template = require('../data/funder_criteria'),
			answers = JSON.parse(JSON.stringify(req.body));

		var report_answers = {};

		for(key in report_template){
			report_answers[key] = report_template[key]; 
		}
		//Getting basic hub details
		report_answers.OrganisationName = answers.OrganisationName;
		report_answers.ContactPerson = answers.ContactPerson;
		report_answers.Type = answers.Type;
		report_answers.Description = answers.Description;

		//Getting Criteria values
		for(var metric = 0; metric < report_answers.Criteria.length; metric++){

			if(answers.hasOwnProperty(report_answers.Criteria[metric].fieldName)){

				report_answers.Criteria[metric].Value = answers[report_answers.Criteria[metric].fieldName];

			}
		}

		// Removing spaces from OrganisationName
		var OrganisationName = answers.OrganisationName.replace(/\s/g, '_');
		save_data(report_answers, '../data/'+OrganisationName+'_criteria_answers.json');

		res.redirect('/criteria')

	}
}