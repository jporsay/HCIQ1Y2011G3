function createTable(elementId, items, currency) {
	var element = document.getElementById(elementId);
	var table = createCartTable();
	var tbody = document.createElement('tbody');
	appendElementToTable(tbody, items, currency);
	table.appendChild(tbody);
	element.appendChild(table);
}

function createCartTable() {
	var table = document.createElement('table');
	table.setAttribute('class', 'cart-table');
	var thread = document.createElement('thead');
	var headerRow = document.createElement('tr');

	var product = document.createElement('th');
	product.setAttribute('scope', 'col');
	product.innerHTML = 'Product';
	var quantity = document.createElement('th');
	quantity.setAttribute('scope', 'col');
	quantity.innerHTML = 'Quantity';
	var price = document.createElement('th');
	price.setAttribute('scope', 'col');
	price.innerHTML = 'Price';
	var total = document.createElement('th');
	total.setAttribute('scope', 'col');
	total.innerHTML = 'Subtotal Price';
	headerRow.appendChild(product);
	headerRow.appendChild(quantity);
	headerRow.appendChild(price);
	headerRow.appendChild(total);
	thread.appendChild(headerRow)
	table.appendChild(thread);
	return table;
}

function appendElementToTable(table, items, currency) {
	var totalPrice = 0;
	for(var i=0; i < items.length; i++) {
		var item = items[i];
		totalPrice += (item.quantity * item.price);
		var row = document.createElement('tr');
		var product = document.createElement('td');
		product.innerHTML = '<a href=\'product.html?id=' + item.id +'\'>' + item.name + '</a>';
		var quantity = document.createElement('td');
		quantity.innerHTML = item.quantity;
		var price = document.createElement('td');
		price.innerHTML = currency + ' ' + item.price;
		var subtotal = document.createElement('td');
		subtotal.innerHTML = currency + ' ' + roundDigits(item.quantity * item.price);
		row.appendChild(product);
		row.appendChild(quantity);
		row.appendChild(price);
		row.appendChild(subtotal);
		table.appendChild(row);
	}
	var totalPriceRow = document.createElement('tr');
	var emptyCols = document.createElement('td');
	emptyCols.setAttribute('colspan', '2');
	var totalLabelCol = document.createElement('td');
	totalLabelCol.innerHTML = 'Total Price: ';
	totalLabelCol.setAttribute('id', 'totalPriceRow');
	var totalValueCol = document.createElement('td');
	totalValueCol.innerHTML = currency + ' ' + roundDigits(totalPrice);
	totalValueCol.setAttribute('id', 'totalPriceRow');
	totalPriceRow.appendChild(emptyCols);
	totalPriceRow.appendChild(totalLabelCol);
	totalPriceRow.appendChild(totalValueCol);
	table.appendChild(totalPriceRow);
}
