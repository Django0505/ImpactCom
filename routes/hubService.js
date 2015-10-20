var	reportService = require('./reportService');

module.exports = {

	view_report : function(req, res, next){
		var report = reportService.hub_report();

		res.render('view_report', {report : report});
	}
}