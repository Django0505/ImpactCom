var	notificationService = require('./notificationService'),
	dataAggregator = require('./dataAggregator'),
	reportCriteriaCreator = require('./reportCriteriaCreator'),
	reportDataCapturer = require('./reportDataCapturer'),
	reportService = require('./reportService');
	
module.exports = {
	list_hubs : function(req, res, next){
		return res.redirect('/create_hub_criteria');
	}
}