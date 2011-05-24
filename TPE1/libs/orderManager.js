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
<div class="order" id="orderId">
	<span class='address'>Address Name</span>
	<span class='date'>Fecha de creacion</span>
	<div id='order + orderId' class="itemsTable"></div>
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
		order_address_label.setAttribute('class', 'i18n');
		order_address_label.innerHTML = 'Address: ';
	var order_address = document.createElement('span');
		order_address.setAttribute('class', 'address');
	var addressId = order.find('address_id').text();
		order_address.innerHTML = addressId ? addressId : 'Undefined Address';		
	newOrder.appendChild(order_address_label);
	newOrder.appendChild(order_address);
	newOrder.appendChild(clear);
	
	var order_date_label = document.createElement('span');
		order_date_label.setAttribute('class', 'i18n');
		order_date_label.innerHTML = 'Date: ';
	var order_date = document.createElement('span');
		order_date.setAttribute('class', 'date');
		order_date.innerHTML = order.find(orderType + '_date').text();
	newOrder.appendChild(order_date_label);
	newOrder.appendChild(order_date);

	var items = getItemsFor(order.attr('id'));
	var itemsTable = createTable(items, order.attr('id'));

	parent.appendChild(newOrder);
}


function getItemsFor(orderId) {
	var items = [];
	orderServer.get(
		{
			method: 'GetOrder',
			username: _userdata['userName'],
			authentication_token: _userdata['token'],
			order_id: orderId
		},
		function(data) {
			alert(data);
			$(data).find('items').each (
				function() {
					//function CartItem(name, id, price, imgSrc) 
					var item = $(this);
					var item_data = {
						id: item.find('product_id').text(), 
						quantity: item.find('count').text(), 
						price: item.find('price').text()
					}
					items.push(item_data);
				}
			);
		}
	);
	return items;
}

function createTable(items, orderId) {
	var order_date_label = document.createElement('div');
		order_date_label.setAttribute('class', 'i18n');
		order_date_label.setAttribute('class', 'order' + orderId);
	
	var table = document.createElement('table');
	
	order_date_label.appendChild(table);
	return order_date_label;
}

