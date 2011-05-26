function loadProduct() {
	loadCartAndCategories(false);
	$('#toggleFromCartInput').click(function() {
		toggleFromCart();
	});
	displayItem(urlParam('id'));
	translator.translatePage();
}
