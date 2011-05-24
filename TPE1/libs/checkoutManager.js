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
	//http://localhost:8080/service/Order.groovy?method=CreateOrder&username=gcastigl&authentication_token=8f9a94cf3da547a05d261485fc241c
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
	//window.location = "orderTracking.html";
}
