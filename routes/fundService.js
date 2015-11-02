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
		var menu = [
						{
							link :'/hubs',
							label : "List Hubs"
						},
						{
							link : "/create_hub_criteria",
							label : "Create Criteria for Hubs"
						}
					];

		res.render('menu_page', {menu : menu});
	}
}