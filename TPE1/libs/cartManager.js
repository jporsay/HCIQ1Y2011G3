cart = new Cart();
function Cart() {
	var instance = this;
	Cart.getInstance = function() {
		return instance;
	}
}

function CartItem(name, href, id, price) {
	this.quantity = 1;
	this.name = name;
	this.href = href;
	this.id = id;
	this.price = price;
}

CartItem.prototype.toString = function() {
	return this.quantity + ', '  + this.name + ', '  + this.href + ', ' + this.id + ', '  + this.price;
}

Cart.prototype.toString = function() {
	return this.items + ', '  + this.currency;
}

Cart.prototype.addItems = function(items) {
	if (typeof this.items  == "undefined") {
		this.items = items;
	} else {
		this.items = this.items.concat(items);
	}
}

/** Cambia el tipo de moneda del carrito por el indicado en el parametro.
Para ver los cambios, la funcion update() debe ser llamada*/
Cart.prototype.setCurrency = function(currency, conversion) {
	this.currency = currency;
	for (var i=0; i < this.items.length; i++) {
		this.items[i].price *= conversion;
	}
}

/** Incrementa en 1 la cantidad de items del carrito cuyo id es el mismo que el del parametro.
	El cambio se vera reflejado una vez llamada la funcion update().
*/
Cart.prototype.incrementItemQuantity = function(id) {
	for (var i=0; i < this.items.length; i++) {
		if (this.items[i].id == id) {
			this.items[i].quantity++;
		}
	}
}

/** Decrementa en 1 la cantidad de items del carrito cuyo id es el mismo que el del parametro 
si es que este es mayor a 1. (De lo contraro se lo remueve?).
	El cambio se vera reflejado una vez llamada la funcion update().
*/
Cart.prototype.decrementItemQuantity = function(id) {
	for (var i=0; i < this.items.length; i++) {
		if (this.items[i].id == id && this.items[i].quantity > 1) {
			this.items[i].quantity--;
		}
	}
}

/**Elimina la primera aparicion del item con id igual al del parametro (no imprta que valor posea en el selector).
Para ver los cambios, la funcion update() debe ser llamda.*/
Cart.prototype.removeItem = function(id) {
	var index = -1;
	for(var i=0; i < this.items.length; i++) {
		if (this.items[i].id == id) {
			index = i;
		}
	}
	
	if (index != -1) {
		this.items.splice(index, 1);
	}
}

/** Agrega en el HTML los items guardados en el carrito. Estos son agregados a la tabla con id='cartItemsTable'.*/
Cart.prototype.update = function() {
	var cart_table = document.getElementById('cartItemsTable');
	this.cleanHTML('cartItemsTable');

	var totalPrice = 0
	for (var i=0; i < this.items.length; i++) {
		addToCart(this.items[i], this.currency, cart_table);
		totalPrice += this.items[i].price * this.items[i].quantity;
	}
	var totalPriceLabel = document.getElementById('cartTotalPrice');
	totalPriceLabel.innerHTML = Math.round(totalPrice*100)/100;
	var totalPriceCurrencyLabel = document.getElementById('cartTotalPriceCurrency');
	totalPriceCurrencyLabel.innerHTML = this.currency;
}

/** Limpia todo el HTML del carrito . NO elimina ningun item.*/
Cart.prototype.cleanHTML = function(elementID) {
	var cart_table = document.getElementById(elementID);
	while(cart_table.hasChildNodes()) {
		cart_table.removeChild(cart_table.lastChild);
	}
}

/** Crea un item con los datos entregados en cartItem y los coloca en la tabla*/
/*example:
<tr>
	<td class="removerCol">...</td>
	<td class="informationCol">...</td>
	<td class="priceCol">...</td>
	<td class="selectorCol">...</td>
</tr>
*/
function addToCart(cartItem, currency, table) {
	var item = document.createElement("tr");
	var removerCol = createItemRemoverColumn(cartItem);
	var informationCol = createItemInformationColumn(cartItem);
	var priceCol = createItemPriceColumn(cartItem, currency);
	var selectorCol = createSelector(cartItem);
	
	item.appendChild(removerCol);
	item.appendChild(informationCol);
	item.appendChild(priceCol);
	item.appendChild(selectorCol);
	table.appendChild(item);
}

/*example:
<td class="removerCol">
	<input class="itemRemover" type="image" name='image' src='images/cart/x3.jpg'></input>
</td>
*/
function createItemRemoverColumn(item) {
	var remover = document.createElement('td');
		remover.setAttribute('class', 'removerCol');
	var remover_input = document.createElement('input');
		remover_input.setAttribute('class', 'itemRemover');
		remover_input.setAttribute('type', 'image');
		remover_input.setAttribute('name', 'image');
		remover_input.setAttribute('src', 'images/cart/x3.jpg');
		remover_input.setAttribute('onClick', getActionForRemover(item.id));
	remover.appendChild(remover_input);
	return remover;
}

/*example
<td class="informationCol">
	<div class='crop'>
		<a href='#'>THIS IS A REALLY LOOOOOONG TEXT</a>
	</div>
</td>
*/
function createItemInformationColumn(item) {
	var info = document.createElement('td');
		info.setAttribute('class', 'informationCol');
	var info_lenthLimiter = document.createElement('div');
		info_lenthLimiter.setAttribute('class', 'crop');
	var info_link = document.createElement('a');
		info_link.setAttribute('href', '#');
		info_link.innerHTML = item.name;
	
	info_lenthLimiter.appendChild(info_link);
	info.appendChild(info_lenthLimiter);
	return info;
}

/*example:
<td class="priceCol">
	<span class='currency'>$</span>
	<span class='number'>560.60</span>
</td>
*/
function createItemPriceColumn(item, currency) {
	var priceCol = document.createElement('td');
		priceCol.setAttribute('class','priceCol');
	var price_currency = document.createElement('span');
		price_currency.setAttribute('class', 'currency');
		price_currency.innerHTML = currency;
	var price_number = document.createElement('span');
		price_number.setAttribute('class', 'number');
		price_number.innerHTML = item.price;
		
	priceCol.appendChild(price_currency);
	priceCol.appendChild(price_number);
	return priceCol;
}

/*example:
<td class="selectorCol">
	<div class='selector'>
		<span>569</span>
		<div class='arrows'>
			<input type='image' name='image' src='images/cart/upArrow.jpg'></input>
			<input type='image' name='image' src='images/cart/downArrow.jpg'></input>
		</div>
	</div>
</td>
*/
function createSelector(item) {
	var selectorCol = document.createElement("td");
		selectorCol.setAttribute('class','selectorCol');
	var selector_container = document.createElement("div");
		selector_container.setAttribute('class','selector');
	var selector_text = document.createElement("span");
		selector_text.innerHTML = item.quantity;
		
	var selector_arrows = document.createElement("div");
		selector_arrows.setAttribute('class','arrows');
		
	var selector_arrowUp = document.createElement("input");
		selector_arrowUp.setAttribute('type','image');
		selector_arrowUp.setAttribute('name','image');
		selector_arrowUp.setAttribute('src','images/cart/upArrow.jpg');
		selector_arrowUp.setAttribute('onClick', getActionForSelectoUpArrow(item.id));
	var selector_arrowDown = document.createElement("input");
		selector_arrowDown.setAttribute('type','image');
		selector_arrowDown.setAttribute('name','image');
		selector_arrowDown.setAttribute('src','images/cart/downArrow.jpg');
		selector_arrowDown.setAttribute('onClick', getActionForSelectoDownArrow(item.id));
		
	selector_arrows.appendChild(selector_arrowUp);
	selector_arrows.appendChild(selector_arrowDown);
	
	selector_container.appendChild(selector_text);
	selector_container.appendChild(selector_arrows);
	selectorCol.appendChild(selector_container);
	return selectorCol;
}

/** Inizializa un carrito vacio en el HTML en el div con id='cart'. Crea el Titulo y el Pie del carrito.*/
/*example
<div class='cart'>
	<div class='cartTitle'>...</div>
	<div class='cartItems'>...</div>
	<div class='cartFooter'>...</div>
</div>
*/
Cart.prototype.load = function() {
	this.cleanHTML('cart');
	this.currency = '$';
	var cart = document.getElementById('cart');
		cart.setAttribute('class', 'cart');
	if(cart == null) {
		return;
	}
	var cart_title = createCartTitle();
	var cart_items = createCartItems();
	var cart_footer = createCartFooter();
	
	cart.appendChild(cart_title);
	cart.appendChild(cart_items);
	cart.appendChild(cart_footer);
}

/*example:
<div class='cartTitle'>
	<div class='verticalSpacer'><!-- For vertical align!--></div>
	<input type="image" name="image" src="images/cart/rightArrow.jpg"></input>
	<span>Cart Items:</span>
</div>
*/
function createCartTitle() {
	var cartTitle = document.createElement('div');
		cartTitle.setAttribute('class', 'cartTitle');
	var spacer = document.createElement('div');
		spacer.setAttribute('class', 'verticalSpacer');
	var cart_toogler = document.createElement('input');
		cart_toogler.setAttribute('type', 'image');
		cart_toogler.setAttribute('name', 'image');
		cart_toogler.setAttribute('src', 'images/cart/rightArrow.jpg');
	var cart_span = document.createElement('span');
		cart_span.innerHTML = 'Cart Items:';

	cartTitle.appendChild(spacer);
	cartTitle.appendChild(cart_toogler);
	cartTitle.appendChild(cart_span);
	return cartTitle;
}

/*example:
<div class='cartItems' id='cartIetmsList'>
	<table id="cartItemsTable"> ... </table>
</div>
*/
function createCartItems() {
	var cart_table_container = document.createElement('div');
		cart_table_container.setAttribute('class', 'cartItems');
		cart_table_container.setAttribute('id', 'cartIetmsList');
	var cart_table = document.createElement('table');
		cart_table.setAttribute('id', 'cartItemsTable');
	cart_table_container.appendChild(cart_table);
	return cart_table_container;
}

/*example:
<div class='cartFooter'>
	<span class="label">Total:</span>
	<span id="cartTotalPriceCurrency">$</span>
	<span id="cartTotalPrice">759.55</span>
	<input type="image" class="checkoutBtn" src="images/cart/checkout.png"></input>
</div>
*/
function createCartFooter() {
	var footer = document.createElement('div');
		footer.setAttribute('class', 'cartFooter');
	var foter_label = document.createElement('span');
		foter_label.setAttribute('class', 'label');
		foter_label.innerHTML = 'Total:'
	var foter_currency_label = document.createElement('span');
		foter_currency_label.setAttribute('id', 'cartTotalPriceCurrency');
	var foter_number_label = document.createElement('span');
		foter_number_label.setAttribute('id', 'cartTotalPrice');
	var footer_checkout = document.createElement('a');
		footer_checkout.setAttribute('href', './checkout.html');
		footer_checkout.innerHTML = 'Proceed to checkout!';
	footer.appendChild(foter_label);
	footer.appendChild(foter_currency_label);
	footer.appendChild(foter_number_label);
	footer.appendChild(footer_checkout);
	return footer;
}

Cart.prototype.printToTable = function(elementId) {
	var element = document.getElementById(elementId);
	var table = createCartTable();
	var tbody = document.createElement('tbody');
	appendElementToTable(tbody, this.items, this.currency);
	table.appendChild(tbody);
	element.appendChild(table);
}

function createCartTable() {
	var table = document.createElement('table');
		table.setAttribute('id', 'cart-table');
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
			product.innerHTML = item.name;
		var quantity = document.createElement('td');
			quantity.innerHTML = item.quantity;
		var price = document.createElement('td');
			price.innerHTML = currency + ' ' + item.price;
		var subtotal = document.createElement('td');
			subtotal.innerHTML = currency + ' ' + (item.quantity * item.price);
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
		totalValueCol.innerHTML = currency + ' ' + Math.round(totalPrice*100)/100;
		totalValueCol.setAttribute('id', 'totalPriceRow');
	totalPriceRow.appendChild(emptyCols);
	totalPriceRow.appendChild(totalLabelCol);
	totalPriceRow.appendChild(totalValueCol);
	table.appendChild(totalPriceRow);
}

Cart.prototype.saveState = function() {
	var value = '{';
	for(var i=0; i < this.items.length; i++) {
		value +=  toJSonFormat(this.items[i]) + ',';
	}
	value += 'currency:' + this.currency;
	value += '}';
	setCookie('cartItems', value, 1);
}

function toJSonFormat(item) {
	var jSon = '[';
	jSon += item.quantity + ',';
	jSon += item.name + ',';
	jSon += item.href + ',';
	jSon += item.id + ',';
	jSon += item.price;
	jSon += ']';
	return jSon;
}

Cart.prototype.loadState = function() {
	var objects = getCookie('cartItems');
	if (typeof objects  == "undefined") {
		return;
	}
	var index = 0;
	var start, end;
	this.items = [];
	do{
		if(objects[i] == '[') {
			var end = objects.indexOf(']', i);
			this.addItems(parseItem(objects, i + 1, end));
		}
		i++;
	}while(i < objects.length);
	start = objects.lastIndexOf(':');
	end = objects.lastIndexOf('}');
	this.currency = objects.substring(start + 1, end);
}

function parseItem(objects, start, end) {
	substr = objects.substring(start, end);
	values = substr.split(',');
	var item = new CartItem(values[1], values[2], values[3], values[4]);
	item.quantity = values[0];
	return item;
}

Cart.prototype.removeAllItems = function() {
	this.items = [];
}

/*javascript actions for the cart buttons*/

function getActionForRemover(itemId) {
	return 'Cart.getInstance().removeItem(' + itemId + '); Cart.getInstance().update();';
}

function getActionForSelectoUpArrow(itemId) {
	return 'Cart.getInstance().incrementItemQuantity(' + itemId + '); Cart.getInstance().update();';
}

function getActionForSelectoDownArrow(itemId) {
	return 'Cart.getInstance().decrementItemQuantity(' + itemId + '); Cart.getInstance().update();';
}
/*--------------------------------------*/

