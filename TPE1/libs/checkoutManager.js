var order = new ServerManager('Order');
function createNewOrder() {
	var userData = getLoggedData();
	if (!userData) {
		alert('You need to be logged in to do this action');
		return;
	}
	if (!validateFields()) {
		alert('//TODO: campos invalidos');
		return;
	}
	var response = {
		status: 'ok',
		order_id:'945'
	};
	parseResponse(response, userData);
	/*
	order.post(
		{
			method: 'CreateOrder',
			username: userData['userName'],
			authentication_token: userData['token']
		},
		function(data) {
			parseResponse(data, userData);
		}
	);*/
}

function validateFields() {
	return true;
}

function parseResponse(data, userData) {
	/*
	var response = $(data).find('response');
	if (response.attr('status') == 'fail') {
		alert('UPS! something gone horribly wrong =(');
		return;
	}
	*/
	//var orderId = response.find('order').attr('id');
	var orderId = 945;
	addItemsToOrder(orderId, userData);
	//TODO: Agregar el address
	
	//window.location = "orderTracking.html";
}

function setOrderAddress(orderId, userData) {
	return;
	order.post (
		{
			method: 'ChangeOrderAddress',
			username: userData['userName'],
			authentication_token: userData['token'],
			order_id: orderId,
			address_id: '1'
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
			alert(data);
			console.log(data);
		}
	);
}

