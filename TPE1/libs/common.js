function createItemsTable(elementId, items, currency) {
	var element = document.getElementById(elementId);
	var table = createCartTable();
	var tbody = document.createElement('tbody');
	appendElementToTable(tbody, items, currency);
	table.appendChild(tbody);
	element.appendChild(table);
}

function createItemsTableInElement(element, items, currency) {
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
	product.setAttribute('class', 'col i18n');
	product.setAttribute('id', 'tProduct');
	
	product.innerHTML = getTranslation('tProduct');
	var quantity = document.createElement('th');
	quantity.setAttribute('class', 'col i18n');
	quantity.setAttribute('id', 'tQuantity');
	
	quantity.innerHTML = getTranslation('tQuantity');
	var price = document.createElement('th');
	price.setAttribute('class', 'col i18n');
	price.setAttribute('id', 'tPrice');
	
	price.innerHTML = getTranslation('tPrice');
	var total = document.createElement('th');
	total.setAttribute('class', 'col i18n');
	total.setAttribute('id', 'tTotal');
	total.innerHTML = getTranslation('tSubTotal');
	
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
	totalPriceRow.setAttribute('id', 'lastRow');
	var emptyCols = document.createElement('td');
	emptyCols.setAttribute('colspan', '2');
	var totalLabelCol = document.createElement('td');
	totalLabelCol.innerHTML = getTranslation('tTotal');
	totalLabelCol.setAttribute('id', 'totalPriceRow');
	var totalValueCol = document.createElement('td');
	totalValueCol.innerHTML = currency + ' ' + roundDigits(totalPrice);
	totalValueCol.setAttribute('id', 'totalPriceRow');
	totalPriceRow.appendChild(emptyCols);
	totalPriceRow.appendChild(totalLabelCol);
	totalPriceRow.appendChild(totalValueCol);
	table.appendChild(totalPriceRow);
}

//This are some oter methods that let us build the order tracking page in a async way

function createEmptyTable(element, currency) {
	var table = createCartTable();
	var tbody = document.createElement('tbody');
	totalPrice = 0;
	appendLastRow(tbody);
	table.appendChild(tbody);
	element.appendChild(table);
	return tbody;
}

function buildRow(item, currency) {
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
	return row;
}

function appendLastRow(tbody) {
	var totalPriceRow = document.createElement('tr');
	totalPriceRow.setAttribute('id', 'lastRow');
	var emptyCols = document.createElement('td');
	emptyCols.setAttribute('colspan', '2');
	var totalLabelCol = document.createElement('td');
	totalLabelCol.innerHTML = 'Total Price: ';
	totalLabelCol.setAttribute('id', 'totalPriceRow');
	var totalValueCol = document.createElement('td');
	var totalValueCol_currency = document.createElement('span');
	totalValueCol_currency.setAttribute('class', 'currency');
	var totalValueCol_amount = document.createElement('span');
	totalValueCol_amount.innerHTML = 0;
	totalValueCol_amount.setAttribute('class', 'amount');
	totalValueCol.appendChild(totalValueCol_currency);
	totalValueCol.appendChild(totalValueCol_amount);
	
	totalValueCol.setAttribute('id', 'totalPriceRow');
	totalPriceRow.appendChild(emptyCols);
	totalPriceRow.appendChild(totalLabelCol);
	totalPriceRow.appendChild(totalValueCol);
	tbody.appendChild(totalPriceRow);
}

