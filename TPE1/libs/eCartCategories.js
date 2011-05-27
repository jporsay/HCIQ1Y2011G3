function loadCartAndCategories(translate) {
	loadCommon();
	loadCartFromCookie();
	cartInstance.update();
	
	// Hack to bubble click event from <a> which were loaded with ajax
	$('#mainArea').click(function(e) {
		if ($(e.target).is('a')) {
			if (e.target.pathname.match(/checkout.html$/)) {
				if (!isLogged()) {
					alert(langKeys['loginNeeded']);
					e.preventDefault();
				} else if ($('#cartTotalPrice').text() == '0') {
					alert(langKeys['emtyCheckout']);
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