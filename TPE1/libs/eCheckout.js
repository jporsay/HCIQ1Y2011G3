function checkoutLoad() {
	loadCommon();
	
	var temp = document.createElement('select');
	temp.setAttribute('id', 'AddressSelect');
	$('#addressSelectContainer').append(temp);
	
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
