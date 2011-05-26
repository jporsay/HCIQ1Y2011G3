function loadCartAndCategories(translate) {
	loadCommon();
	loadCartFromCookie();
	cartInstance.update();
	
	// Hack to bubble click event from <a> which were loaded with ajax
	$('#mainArea').click(function(e) {
		if ($(e.target).is('a')) {
			if (e.target.pathname.match(/checkout.html$/)) {
				if (!isLogged()) {
					alert('Se neceita estar logeado para acceder a esta pagina.');
					e.preventDefault();
				} else if ($('#cartTotalPrice').text() == '0') {
					alert('You can\'t checkout an empty cart!');
					e.preventDefault();
				}
				return;
			}
			cartInstance.saveState();
		}
	});
	
	loadCategories($('#locale :selected').attr('id'));
	if (translate) {
		translator.translatePage();
	}
}