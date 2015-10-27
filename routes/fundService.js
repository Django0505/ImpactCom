var	notificationService = require('./notificationService'),
	dataAggregator = require('./dataAggregator'),
	reportCriteriaCreator = require('./reportCriteriaCreator'),
	reportDataCapturer = require('./reportDataCapturer'),
	reportService = require('./reportService');
	
module.exports = {
	list_hubs : function(req, res, next){
		var hubs = [
					{hub_name : "mlab"},
					{hub_name : "codex"},
					{hub_name : "mlab"},
					{hub_name : "codex"}
					];

		return res.render('list_hubs', {hubs : hubs});
	},
	funder_page : function(req, res, next){
		res.render('funder_page');
	}
}