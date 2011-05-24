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
	var order = new ServerManager('Order');
	order.post(
		{
			method: 'CreateOrder',
			username: userData['userName'],
			authentication_token: userData['token']
		},
		parseResponse
	);
}

function validateFields() {
	return true;
}

function parseResponse(data) {
	alert('create order');
	var response = $(data).find('response');
	if (response.attr('status') == 'fail') {
		alert('UPS! something gone horribly wrong =(');
		return;
	}
	window.location = "orderTracking.html";
}
