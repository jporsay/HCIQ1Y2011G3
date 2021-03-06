var order = new ServerManager('Order');

function createNewOrder() {
	var userData = getLoggedData();
	if (!validateFields()) {
		return;
	}
	var catList = document.getElementById('processingOrder');
	catList.innerHTML = "<img src='images/ajax-loader.gif'>"
	
	order.post(
		{
			method: 'CreateOrder',
			username: userData['userName'],
			authentication_token: userData['token']
		},
		function(data) {
			parseResponse(data, userData);
		}
	);
}

function validateFields() {
	var orderId = $('#AddressSelect').val();
	if (!orderId) {
		alert('You must select an address to create an order');
		return false;
	}

	return true;
}

function parseResponse(data, userData) {
	var response = $(data).find('response');
	if (response.attr('status') == 'fail') {
		alert('UPS! something gone horribly wrong =(');
		return;
	}
	var orderId = response.find('order').attr('id');
	var addressId = $('#AddressSelect').val();
	addItemsToOrder(orderId, userData);
	setOrderAddress(orderId, addressId, userData);
	confirmOrder(orderId, addressId, userData);
}

function setOrderAddress(orderId, addressId, userData) {
	order.post (
		{
			method: 'ChangeOrderAddress',
			username: userData['userName'],
			authentication_token: userData['token'],
			order_id: orderId,
			address_id: addressId
		},
		function(data) {
		}
	);
}

function addItemsToOrder(orderId, userData) {
	loadCartFromCookie();
	var items = cartInstance.items;
	$(items).each(
		function() {
			postItem(this, orderId, userData);
		}
	);
}

function postItem(item, orderId, userData) {
	var orederItem = "<order_item><product_id>" + item.id + "</product_id><count>" + item.quantity + "</count></order_item>";
	order.post (
		{
			method: 'AddOrderItem',
			username: userData['userName'],
			authentication_token: userData['token'],
			order_id: orderId,
			order_item: orederItem
		},
		function(data) {
		}
	);
}

function confirmOrder(orderId, addressId, userData) {
	order.post (
	{
		method: 'ConfirmOrder',
		username: userData['userName'],
		authentication_token: userData['token'],
		order_id: orderId,
		address_id: addressId
	},
	function(data) {
		var response = $(data);
		$('#orderCreatedLabel').css('display', 'inline');
		window.location = "orderTracking.html";
	}
	);
}

function loadAddresInfo(elementId) {
	var inputs = document.getElementById(elementId);
	var addressId = $('#AddressSelect').val();
	getAddress(
		addressId, 
		function(data){
			var info = $(data);
			fillForms(info, inputs);
		}, 
		true
	);
}

function fillForms(info, inputs) {
	var addres1 = $('#address1Input');
	var addres2 = $('#address2Input');
	var country = $('#countryInput');
	var state = $('#stateInput');
	var city = $('#cityInput');
	var zip = $('#zipInput');
	var phone = $('#phoneInput');
	
	addres1.val(info.find('address_line_1').text());
	addres2.val(info.find('address_line_2').text());
	country.val(info.find('country_id').text());
	state.val(info.find('state_id').text());
	city.val(info.find('city').text());
	zip.val(info.find('zip_code').text());
	phone.val(info.find('phone_number').text());
}
