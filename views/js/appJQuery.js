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

