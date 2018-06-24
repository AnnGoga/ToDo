let test;

// INITIALISATION
$(document).ready(function() {
	// LOADING DEFAULT UNEDITABLE ELEMENTS
	$.getJSON( 'https://kodaktor.ru/j/db.json', function( data ) {
		$.each( data.todo.reverse(), function( key, value ) {
			let html = blockRender('_' + value.id, value.title, true);
			$('#todo').prepend(html);
			applyEvents('_' + value.id);
		});
	});

	// INPUT PANEL EVENTS
	$('#input-block .block-text').focus(function(){
	    $(this).parent().addClass('active');
	    if($(this).hasClass('placeholder')) {
			$(this).removeClass('placeholder');
			$(this).text('');
		}
	});

	$('#input-block .block-text').focusout(function(){
	    $(this).parent().removeClass('active');
	    if($(this).html() == '') {
	    	$(this).addClass('placeholder');
			$(this).text('Your text here...');
	    } else {
	    	console.log('Trying to add new block!');
	    }
	});
});


function applyEvents(id){
	$(id + ' .block-text').focus(function(){
	    $(this).parent().addClass('active');
	});

	$(id + ' .block-text').focusout(function(){
	    $(this).parent().removeClass('active');
	    console.log('Trying to edit block: ' + id);
	});

	$(id + ' .block-remove').click(function(){
	    console.log('Trying to remove block: ' + id);
	});
}




// RENDER
let tmpl_block = $('#tmpl-block').html();

function blockRender(id, text, noteditable){
	let noteditableText = 'contenteditable="true"';
	let notdeletableText = '';
	if(noteditable){
		noteditableText = '';
		notdeletableText = 'inv';
	}

	Mustache.parse(tmpl_block);
	return Mustache.render(tmpl_block, {id: id, text: text, notdeletableText: noteditableText, notdeletableText: notdeletableText});
}