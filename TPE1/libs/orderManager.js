//DEFINES: 
var _CREATED = "1";
var _CONFIRMED = "2";
var _DELIVERING = "3";
var _DELIVERED = "4";

var _userdata;
var orderServer = new ServerManager('Order');
var createdOrdersEl, confirmedOrdersEl, deliveringOrdersEl, deliveredOrdersEl;

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
	createdOrdersEl = document.getElementById('createdOrders');
	confirmedOrdersEl = document.getElementById('confirmedOrders');
	deliveringOrdersEl = document.getElementById('deliveringOrders');
	deliveredOrdersEl = document.getElementById('deliveredOrders');
	$(orders).find('order').each(
		function() {
			var order = $(this);
			createOrderDiv(order);
		}
	);
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
			parent = createdOrdersEl;
			break;
		case _CONFIRMED: 
			orderType = 'confirmed';
			parent = confirmedOrdersEl;
			break;
		case _DELIVERING:
			orderType = 'shipped';
			parent = deliveringOrdersEl;
			break;
		case _DELIVERED:
			orderType = 'delivered';
			parent = deliveredOrdersEl;
			break;
	}
	var newOrder = document.createElement('div');
		newOrder.setAttribute('class', 'order');
		newOrder.setAttribute('id', 'order' + order.attr('id'));
	createLabel(newOrder, 'Order ID: ', order.attr('id'), 'orderId');	
	createLabel(newOrder, 'Address: ', order.find('address_id').text(), 'address');
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
	console.log(productsInOrder);
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
			console.log(data);
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

