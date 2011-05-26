function loadCartAndCategories(translate) {
	loadCommon();
	loadCartFromCookie();
	cartInstance.update();
	
	// Hack to bubble click event from <a> which were loaded with ajax
	$('#mainArea').click(function(e) {
		if ($(e.target).is('a')) {
			cartInstance.saveState();
		}
	});
	
	loadCategories($('#locale :selected').attr('id'));
	if (translate) {
		translator.translatePage();
	}
}