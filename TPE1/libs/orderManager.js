//DEFINES: 
var _CREATED = "1";
var _CONFIRMED = "2";
var _DELIVERING = "3";
var _DELIVERED = "4";

var _userdata;
var orderServer = new ServerManager('Order');
var ordersContainer = new Array();

function printOrders(userdata, langId) {
	_userdata = userdata;
	orderServer.get(
		{
			method: 'GetOrderList',
			username: userData['userName'],
			authentication_token: userData['token']
		},
		processOrders
	);
}
		
function processOrders(orders) { 
	ordersContainer[0] = document.getElementById('createdOrders');
	ordersContainer[1] = document.getElementById('confirmedOrders');
	ordersContainer[2] = document.getElementById('deliveringOrders');
	ordersContainer[3] = document.getElementById('deliveredOrders');
	$(orders).find('order').each(
		function() {
			var order = $(this);
			createOrderDiv(order);
		}
	);
	
	for(var i = 0; i < ordersContainer.length; i++) {
		if ($(ordersContainer[i]).children().size() == 1) {
			var empty_div_label = document.createElement('h3');
			empty_div_label.setAttribute('class', 'emptyContainerLabel');
			empty_div_label.innerHTML = 'You have no orders in this section';
			ordersContainer[i].appendChild(empty_div_label);
		}
	}
}

/*
<div class="order" id="order + orderId">
	<span class='i18n'>Address:</span>
	<span class='address'>Av Del Libertador 1560</span>
	<span class='i18n'>Date:</span>
	<span class='date'>1999-10-10</span>
	<div class="itemsTable"></div>
</div>
*/
function createOrderDiv(order, orderType) {
	var orderType, parent;
	var status = order.find('status').text();
	switch(status) {
		case _CREATED :
			orderType = 'created';
			parent = ordersContainer[0];
			break;
		case _CONFIRMED: 
			orderType = 'confirmed';
			parent = ordersContainer[1];
			break;
		case _DELIVERING:
			orderType = 'shipped';
			parent = ordersContainer[2];
			break;
		case _DELIVERED:
			orderType = 'delivered';
			parent = ordersContainer[3];
			break;
	}
	var newOrder = document.createElement('div');
		newOrder.setAttribute('class', 'order');
		newOrder.setAttribute('id', 'order' + order.attr('id'));
	createLabel(newOrder, 'Order ID: ', order.attr('id'), 'orderId');
	var addressLabel = '';
	getAddress(
		order.find('address_id').text(),
		function(data) {
			var address = $(data);
			addressLabel += address.find('full_name').text();
			addressLabel += ' - '
			addressLabel += address.find('address_line_1').text();
		},
		true
	);
	createLabel(newOrder, 'Address: ', addressLabel, 'address');
	createLabel(newOrder, 'Date: ', order.find(orderType + '_date').text(), 'date');

	var table_container = createOrderPruductTable(order, '$');
	newOrder.appendChild(table_container);
	parent.appendChild(newOrder);
}

function createLabel(parent, label, value, valueClass) {
	var clear = document.createElement('div');
	clear.setAttribute('class', 'clear');
	var label_span = document.createElement('span');
		label_span.setAttribute('class', 'i18n label');
		label_span.innerHTML = label;
	var label_value = document.createElement('span');
		label_value.setAttribute('class', valueClass);
		label_value.innerHTML = value;		
	parent.appendChild(label_span);
	parent.appendChild(label_value);
	parent.appendChild(clear);
}

function createOrderPruductTable(order, currency) {
	var orderId = order.attr('id');
	var order_table_container = document.createElement('div');
		order_table_container.setAttribute('class', 'itemsTable');

	var productsInOrder = getProductsFor(orderId);
	createItemsTableInElement(order_table_container, productsInOrder, currency);
	return order_table_container;
}

function getProductsFor(orderId) {
	var productsInOrder = [];
	orderServer.getS (
		{
			method: 'GetOrder',
			username: _userdata['userName'],
			authentication_token: _userdata['token'],
			order_id: orderId
		},
		function(data) {
			$(data).find('item').each (
				function() {
					var item = $(this);
					var product = getProduct(item.find('product_id').text());
					product.quantity = item.find('count').text();
					productsInOrder.push(product);
				}
			);
		}
	);
	return productsInOrder;
}

var prod = null;
function getProduct(productId) {
	var catalogServer = new ServerManager('Catalog');
	var newProduct;
	catalogServer.getS(
		{
			method: 'GetProduct',
			product_id: productId
		},
		function(data) {
			var item = $(data).find('product');
			newProduct = {
				name: item.find('name').text(), 
				id: item.attr('id'), 
				price:	 item.find('price').text(),
			}
		}
	);
	return newProduct;
}

function createItem(data) {
	var item = $(data).find('product');
	var prod_info = {
		name: item.find('name').text(), 
		id: item.attr('id'), 
		price: item.find('price').text(),
	}
	return prod_info;
}

