module.exports = {
	render_criteria : function(req, res, next){
	var create_program_template = require('../data/startup_criteria_template.json');

	return res.render("criteria", {
			create_program_template : create_program_template,
			OrganisationType : "StartUp"
		});
	}
}