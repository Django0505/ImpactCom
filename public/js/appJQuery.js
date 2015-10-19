var checked_boxes = {};


$('input[type=checkbox]').click(function(){
	var checkbox_class_val = $(this).attr('class');

	if ( $(this).checked == false || $(this).checked == undefined) {
		$(this).checked = true;

		checked_boxes[checkbox_class_val] = checkbox_class_val;
	} else if( $(this).checked){
		$(this).checked = false;
		delete checked_boxes[checkbox_class_val];
	};
});

$('#create_startup_criteria').click(function(){

	$.post('/create_startup_criteria', checked_boxes, function(){
		//Remove checked metrics
		for(key in checked_boxes){
			$('.'+key).fadeOut('slow');
			var className = $('.'+(key).replace('_checkbox', ''));
			className.remove();
			delete checked_boxes[key];
		}
	});
});

var criteria_template = {}, det_num = 0, met_num = 0;

// Temporarily store details entered by funder
criteria_template.Indicator = [];

$(".detail").click(function(){
	var entered_detail = $('input[name=detail]');
	var entered_detail_type = $('select[name=detail_type]');

	if ( entered_detail.val()) {
		var det = "detail_"+det_num.toString();

		criteria_template.Indicator.push({detail : entered_detail.val(),type : entered_detail_type.val()});

		$('.detail-row').before('<tr><td><label>'+entered_detail.val()+'</label></td><td><input type='+entered_detail_type.val()+'></td></tr>');
		entered_detail.val('');
		det_num++;
	}
	else{
		entered_detail.attr('placeholder', 'Enter something...');
	}
});

// Temporarily store metrics entered by funder
criteria_template.Criteria = [];

$(".metric").click(function(){
	var entered_metric = $('input[name=metric]');
	var entered_metric_type = $('select[name=metric_type]');

	if ( entered_metric.val()) {
		var met = "metric_"+met_num.toString();

		criteria_template.Criteria.push({metric : entered_metric.val(),type : entered_metric_type.val()});

		$('.metric-row').before('<tr><td><label>'+entered_metric.val()+'</label></td><td><input type='+entered_metric_type.val()+'></td></tr>');
		entered_metric.val('');
		met_num++;
	}
	else{
		entered_metric.attr('placeholder', 'Enter something...');
	}
});

//Posting created criteria to backend...
$('input[name=create_criteria]').click(function() {
	$.post('/create_hub_criteria', {criteria_template : JSON.stringify(criteria_template)});
});