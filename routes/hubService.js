var	notificationService = require('./notificationService'),
	dataAggregator = require('./dataAggregator'),
	reportCriteriaCreator = require('./reportCriteriaCreator'),
	reportDataCapturer = require('./reportDataCapturer'),
	reportService = require('./reportService');

module.exports = {

	view_report : function(req, res, next){
		var report = reportService.hub_report();

		res.render('view_report', {report : report});
	},
	list_startups : function(req, res, next){
		res.redirect('/criteria')
	},
	create_startup_criteria : reportCriteriaCreator.create_startup_criteria
}