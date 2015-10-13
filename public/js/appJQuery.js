var checked_boxes = {};


$('input[type=checkbox]').click(function(){
	if ($(this).checked == false || $(this).checked == undefined) {
		$(this).checked = true;
		checked_boxes[$(this).attr('class')] = $(this).attr('class');

	} else if($(this).checked){
		$(this).checked = false;
		checked_boxes[$(this).attr('class')] = undefined;
	};
});

$('#create_startup_criteria').click(function(){

	$.post('/create_startup_criteria', checked_boxes);

	//Remove checked metrics
	for(key in checked_boxes){
		$('.'+key).fadeOut('slow');
		var className = $('.'+(key).replace('_checkbox', ''));
		className.remove();
		delete checked_boxes[key];
	}
});

$(".detail").click(function(){
	if ($('input[name=fieldName]').val()) {
		$('.detail-row').before('<tr><td><label>'+$('input[name=fieldName]').val()+'</label></td><td><input type='+$('select[name=inputType1]').val()+'></td></tr>');
		$('input[name=fieldName]').val('')
	}
	else{
		$('input[name=fieldName]').attr('placeholder', 'Enter something...');
	}
});

$(".metric").click(function(){
	if ($('input[name=metric]').val()) {
		$('.metric-row').before('<tr><td><label>'+$('input[name=metric]').val()+'</label></td><td><input type='+$('select[name=inputType2]').val()+'></td></tr>');
		$('input[name=metric]').val('')
	}
	else{
		$('input[name=metric]').attr('placeholder', 'Enter something...');
	}
});