//DEFINES: 
var _CREATED = "1";
var _CONFIRMED = "2";
var _DELIVERING = "3";
var _DELIVERED = "4";

var _userdata;

var orderServer = new ServerManager('Order');

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
	var createdOrdersEl = document.getElementById('createdOrders');
	var confirmedOrdersEl = document.getElementById('confirmedOrders');
	var deliveringOrdersEl = document.getElementById('deliveringOrders');
	var deliveredOrdersEl = document.getElementById('deliveredOrders');
	
	$(orders).find('order').each(
		function() {
			var order = $(this);
			var element;
			var status = order.find('status').text();
			switch(status) {
				case _CREATED :
					createOrderDiv(createdOrdersEl, order, 'created');
					break;
				case _CONFIRMED: 
					createOrderDiv(confirmedOrdersEl, order, 'confirmed');
					break;
				case _DELIVERING:
					createOrderDiv(deliveringOrdersEl, order, 'shipped');
					break;
				case _DELIVERED:
					createOrderDiv(deliveredOrdersEl, order, 'delivered');
					break;
			}
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
	<button class="delete">Delete Order</button>
	<button class="confirm">Confirm Order</button>
</div>
*/
function createOrderDiv(parent, order, orderType) {
	var newOrder = document.createElement('div');
		newOrder.setAttribute('class', 'order');
		newOrder.setAttribute('id', 'order' + order.attr('id'));
	
	var clear = document.createElement('div');
		clear.setAttribute('class', 'clear');
		
	var order_address_label = document.createElement('span');
		order_address_label.setAttribute('class', 'i18n label');
		order_address_label.innerHTML = 'Address: ';
	var order_address = document.createElement('span');
		order_address.setAttribute('class', 'address');
	var addressId = order.find('address_id').text();
		order_address.innerHTML = addressId ? addressId : 'Undefined Address';		
	newOrder.appendChild(order_address_label);
	newOrder.appendChild(order_address);
	newOrder.appendChild(clear);
	
	var order_date_label = document.createElement('span');
		order_date_label.setAttribute('class', 'i18n label');
		order_date_label.innerHTML = 'Date: ';
	var order_date = document.createElement('span');
		order_date.setAttribute('class', 'date');
		order_date.innerHTML = order.find(orderType + '_date').text();
	newOrder.appendChild(order_date_label);
	newOrder.appendChild(order_date);

	var table_container = createOrderPruductTable(order, '$');
	newOrder.appendChild(table_container);
	parent.appendChild(newOrder);
}

function createOrderPruductTable(order, currency) {
	var orderId = order.attr('id');
	var order_table_container = document.createElement('div');
		order_table_container.setAttribute('class', 'itemsTable');

	var items = getProductsFor(orderId);
	createItemsTableInElement(order_table_container, items, currency);
	return order_table_container;
}

function getProductsFor(orderId) {
	var productsInOrder = [];
	orderServer.get(
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

function getProduct(productId) {
	orderServer.get(
		{
			method: 'GetProduct',
			product_id: productId
		},
		function(data) {
			var item = $(data).find('product');
			var prod = {
				name: item.find('name').text(), 
				id: item.attr('id'), 
				price: item.find('price').text(),
				imageSrc: ''
			}
			return prod;
		}
	);
}

