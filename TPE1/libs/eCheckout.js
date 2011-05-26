function checkoutLoad() {
	loadCommon();
	getAddressList(getAddressListCallback);
	loadCartFromCookie();
	cartInstance.printToTable('checkoutTable');

	$("#billingForm").submit(function(e) {
		e.preventDefault();
		createNewOrder();
	});
	$('#AddressSelect').change(function() {
		loadAddresInfo('addresInformation');
	});
	translator.translatePage();
}
