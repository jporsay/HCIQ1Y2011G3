//DEFINES:
var CART_HOLDER = 'cartHolder'
var CART_ID = 'cart';
var CART_ID_HIDDEN = 'hiddenCart';
var CART_COOKIE = 'cartItems';
var CART_COOKIE2 = 'cartItems2';
var CART_ITEMS_LIST = 'cartItemsList';

var cartInstance;

function initCartInstance() {
	//THIS SHOULD ONLY BE CALLED ONCE THE PAGE IS LOADED.
	cartInstance = new Cart();
}


function Cart() {
	var cartHolder = document.getElementsByClassName(CART_HOLDER)[0];
	if (!cartHolder) {
		return;
	}
	cleanHTML(CART_HOLDER);
	this.currency = '$';
	var cart = document.createElement('div');
		cart.setAttribute('id', CART_ID);	
	var cart_title = createCartTitle();
	var cart_itemsHolder = createCartItemsHolder();
	var cart_footer = createCartFooter();
	
	cart.appendChild(cart_title);
	cart.appendChild(cart_itemsHolder);
	cart.appendChild(cart_footer);
	cartHolder.appendChild(cart);
	
	var cart_hidden = createCartHidden();
	cartHolder.appendChild(cart_hidden);
	this.setHidden(false);
}

function CartItem(name, id, price, imgSrc) {
	this.quantity = 1;
	this.name = name;
	this.href = 'product.html?id=' + id;
	this.id = id;
	this.price = roundDigits(price);
	this.imgSrc = imgSrc;
}

CartItem.prototype.toString = function() {
	return this.quantity + ', ' + this.name + ', ' + this.href + ', ' + this.id + ', ' + this.price + ', ' + this.imgSrc;
}

Cart.prototype.toString = function() {
	return this.items + ', ' + this.currency;
}

Cart.prototype.addItem = function(newItem) {
	cartInstance.addItems([newItem]);
}

Cart.prototype.addItems = function(newItems) {
	if (!this.items) {
		this.items = newItems;
		return;
	}
		
	for(var i = 0; i < newItems.length; i++) {
		var isContained = this.inCart(newItems[i].id);
		if (!isContained) {
			this.items = this.items.concat([newItems[i]]);
		}
	}
}

Cart.prototype.inCart = function(id) {
	if (this.items) {
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].id == id) {
				return true;
			}
		}
	}
	return false;
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
		var urlId = urlParam('id');
		if (urlId == id) {
			removeFromCart(true);
		}
		this.items.splice(index, 1);
	}
}

/** Agrega en el HTML los items guardados en el carrito*/
Cart.prototype.update = function() {
	if (!this.items) {
		this.items = [];
	}
	cleanHTML(CART_ITEMS_LIST);
	var cart_items = document.getElementById(CART_ITEMS_LIST);
	var totalPrice = 0;
	for (var i=0; i < this.items.length; i++) {
		addToCart(this.items[i], this.currency, cart_items);
		totalPrice += this.items[i].price * this.items[i].quantity;
	}
	var totalPriceLabel = document.getElementById('cartTotalPrice');
	totalPriceLabel.innerHTML = roundDigits(totalPrice);
	var totalPriceCurrencyLabel = document.getElementById('cartTotalPriceCurrency');
	totalPriceCurrencyLabel.innerHTML = this.currency;
	
	var translator = new i18n();
	translator.translatePage();
}

/** Ocutlta/muestra el carrito*/
Cart.prototype.setHidden = function(hide) {
	if(hide) {
		var cart = document.getElementById(CART_ID);
		if (cart) {
			cart.style.display = "none";
			document.getElementById(CART_ID_HIDDEN).style.display = "";
			var leftArea = document.getElementById('leftArea');
			var rightArea = document.getElementById('rightArea');
			if (!this.leftAreaPrevSize) {
				this.leftAreaPrevSize = $(leftArea).css('width');
			}
			if (!this.rightAreaPrevSize) {
				this.rightAreaPrevSize = $(rightArea).css('width');
			}
			$(leftArea).css('width', '90%');
			$(rightArea).css('width', '5%');
		}
	} else {
		var cart = document.getElementById(CART_ID);
		if(cart) {
			cart.style.display = ""
			document.getElementById(CART_ID_HIDDEN).style.display = "none";
			var leftArea = document.getElementById('leftArea');
			var rightArea = document.getElementById('rightArea');
			$(leftArea).css('width', this.leftAreaPrevSize);
			$(leftArea).removeAttr('style');
			$(rightArea).css('width', this.rightAreaPrevSize);
			$(rightArea).removeAttr('style');
			this.update();
		}
	}
	this.isHidden = hide;
}

/** Limpia el HTML del elemnto con id = elementoID.*/
function cleanHTML (elementID) {
	var elemntDOM = document.getElementById(elementID);
	if (!elemntDOM) {
		return;
	}
	while(elemntDOM.hasChildNodes()) {
		elemntDOM.removeChild(elemntDOM.lastChild);
	}
}

/** Crea un item con los datos entregados en cartItem y los coloca en la tabla*/
/*example:
<div class="itemContainer">
	<div class="itemInfo">
		<div class="image">... </div>
		<div class="desc">...</div>
	</div>
	<div class="itemRemover"></div>
</div>
 */
function addToCart(item, currency, itemsList) {
	var itemCont = document.createElement("div");
		itemCont.setAttribute('class', 'itemContainer');
	
	var item_info = createItemInfo(item, currency);
	var item_remover = document.createElement("div");
		item_remover.setAttribute('class', 'itemRemover');
		item_remover.setAttribute('onClick', getActionForRemover(item.id));
	itemCont.appendChild(item_info);
	itemCont.appendChild(item_remover);
	itemsList.appendChild(itemCont);
}

function createItemInfo(item, currency) {
	var item_info = document.createElement("div");
		item_info.setAttribute('class', 'itemInfo');
		
	var item_image = createItemImage(item);

	var item_desc = createItemDescription(item, currency);
	
	item_info.appendChild(item_image);
	item_info.appendChild(item_desc);
	return item_info;
}

/*example
<div class="image">
	<img alt="IMG" src=""></img>
/div>
*/
function createItemImage(item) {
	var imageCont = document.createElement('div');
		imageCont.setAttribute('class', 'image');
	var image = document.createElement('img');
		image.setAttribute('alt', item.name);
		image.setAttribute('src', item.imgSrc);
	
	imageCont.appendChild(image);
	return imageCont;
}

/*example
<div class="desc">
	<span class="name">Taylor Dayne</span>
	<span class="info">Satisfied</span>
	<span class="price">$ 26.56</span>
	<div class="quantitySelector"> ... </div>
</div>
 */
function createItemDescription(item, currency) {
	var item_desc = document.createElement('div');
		item_desc.setAttribute('class', 'desc');
	var item_name = document.createElement('a');
		item_name.setAttribute('class', 'name');
		item_name.setAttribute('href', 'product.html?id=' + item.id);
		item_name.innerHTML = item.name;
	var item_price = document.createElement('span');
		item_price.setAttribute('class', 'price');
		item_price.innerHTML = currency + ' ' + item.price;
	var item_quantity = createItemQuantity(item);
	item_desc.appendChild(item_name);
	item_desc.appendChild(item_price);
	item_desc.appendChild(item_quantity);
	return item_desc;
}

/*example:
	<div class="quantitySelector">
		<span class="i18n" id="cartQuantity28">Quantity: </span>
		<span class="quantity">17</span>
		<input type="Image" class="decrement" src="./images/cart/downArrow.jpg"></input>
		<input type="Image" class="increment" src="./images/cart/upArrow.jpg"></input>
	</div>
 */
function createItemQuantity(item) {
	var item_quantitySel = document.createElement('div');
		item_quantitySel.setAttribute('class','quantitySelector');
	var item_quantity_label = document.createElement('span');
		item_quantity_label.setAttribute('class','i18n');
		item_quantity_label.setAttribute('id','cartQuantity' + item.id);
		//item_quantity_label.innerHTML = 'Quantity: ';
	var item_quantity = document.createElement('span');
		item_quantity.setAttribute('class','quantity');
		item_quantity.innerHTML = item.quantity;
	var item_increment = document.createElement('input');
		item_increment.setAttribute('type', 'Image');
		item_increment.setAttribute('class', 'increment');
		item_increment.setAttribute('src', './images/cart/upArrow.jpg');
		item_increment.setAttribute('onClick', getActionForSelectorUpArrow(item.id));
	var item_decrement = document.createElement('input');
		item_decrement.setAttribute('type', 'Image');
		item_decrement.setAttribute('class', 'increment');
		item_decrement.setAttribute('src', './images/cart/downArrow.jpg');
		item_decrement.setAttribute('onClick', getActionForSelectorDownArrow(item.id));
	
	item_quantitySel.appendChild(item_quantity_label);
	item_quantitySel.appendChild(item_quantity);
	item_quantitySel.appendChild(item_increment);
	item_quantitySel.appendChild(item_decrement);
	return item_quantitySel;
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
	cartTitle.setAttribute('class', 'title');
	var spacer = document.createElement('div');
	spacer.setAttribute('class', 'verticalSpacer');
	var cart_toogler = document.createElement('input');
	cart_toogler.setAttribute('type', 'image');
	cart_toogler.setAttribute('name', 'image');
	cart_toogler.setAttribute('src', 'images/cart/rightArrow.jpg');
	cart_toogler.setAttribute('onClick', getActionForToogler(true)); 
	var cart_span = document.createElement('span');
	cart_span.setAttribute('id', 'cartItemsHeader');
	cart_span.setAttribute('class', 'i18n');

	cartTitle.appendChild(spacer);
	cartTitle.appendChild(cart_toogler);
	cartTitle.appendChild(cart_span);
	return cartTitle;
}

/*example:
<div class="cartItems" id="cartIetmsList">
	<div class="itemContainer">
		...
	</div>
	div class="itemContainer">
		...
	</div>
</div>
 */
function createCartItemsHolder() {
	var cart_items = document.createElement('div');
	cart_items.setAttribute('class', 'cartItems');
	cart_items.setAttribute('id', CART_ITEMS_LIST);
	return cart_items;
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
	footer_checkout.setAttribute('id', 'cartCheckoutLink');
	footer_checkout.setAttribute('class', 'i18n');
	footer.appendChild(foter_label);
	footer.appendChild(foter_currency_label);
	footer.appendChild(foter_number_label);
	footer.appendChild(footer_checkout);
	return footer;
}

/*example:
<div id='hiddenCart'>
	<div class='imageCont'>
		<input type='Image' src='' alt=''></input>
	</div>
</div>
*/
function createCartHidden() {
	var cart_hidden = document.createElement('div');
		cart_hidden.setAttribute('id', CART_ID_HIDDEN);
	var cart_toogle = document.createElement('div');
		cart_toogle.setAttribute('class', 'imageCont');
	var cart_input = document.createElement('input');
		cart_input.setAttribute('type', 'Image');
		cart_input.setAttribute('src', './images/cart/leftArrow.jpg');
		cart_input.setAttribute('alt', 'Toogler');
		cart_input.setAttribute('onClick', getActionForToogler(false));
	cart_toogle.appendChild(cart_input);
	cart_hidden.appendChild(cart_toogle);
	return cart_hidden;
}

Cart.prototype.printToTable = function(elementId) {
	createItemsTable(elementId, this.items, this.currency);
}

Cart.prototype.saveState = function() {
	var value = '{';
	for(var i=0; i < this.items.length; i++) {
		value += toJSonFormat(this.items[i]) + ',';
	}
	value += 'currency:' + this.currency;
	value += '}';
	$.cookie(CART_COOKIE, null);
	$.cookie(CART_COOKIE, value, {path: '/'});


	value = this.isHidden ? 1 : 0;
	$.cookie(CART_COOKIE2, null);
	$.cookie(CART_COOKIE2, value, {path: '/'});
}

function toJSonFormat(item) {
	var jSon = '[';
	jSon += item.quantity + ',';
	jSon += item.name + ',';
	jSon += item.href + ',';
	jSon += item.id + ',';
	jSon += item.price + ',';
	jSon += item.imgSrc;
	jSon += ']';
	return jSon;
}


function loadCartFromCookie() {
	var cookie = $.cookie(CART_COOKIE);
	if (!cartInstance) {
		initCartInstance();
	}
	if (!cookie) {
		return false;
	}
	var index = 0;
	var start, end;
	cartInstance.items = [];
	var i = 0;
	do {
		if(cookie[i] == '[') {
			var end = cookie.indexOf(']', i);
			cartInstance.addItems([ parseItem(cookie, i + 1, end)]);
		}
		i++;
	} while(i < cookie.length);
	start = cookie.lastIndexOf(':');
	end = cookie.lastIndexOf('}');
	cartInstance.currency = cookie.substring(start + 1, end);
	
	var cookie2 = $.cookie(CART_COOKIE2);
	cartInstance.isHidden = (cookie2 == 1) ? true : false;
	cartInstance.setHidden(cartInstance.isHidden);
	return true;
}

function parseItem(string, start, end) {
	substr = string.substring(start, end);
	values = substr.split(',');
	var item = new CartItem(values[1], values[3], values[4], values[5]);
	item.quantity = values[0];
	return item;
}

Cart.prototype.removeAllItems = function() {
	this.items = [];
}

function roundDigits(number) {
	return Math.round(number*100)/100;
}

/*javascript actions for the cart buttons*/

function getActionForToogler(hide) {
	return 'cartInstance.setHidden(' + hide + ')';
}

function getActionForRemover(itemId) {
	return 'cartInstance.removeItem(' + itemId + '); cartInstance.update();';
}

function getActionForSelectorUpArrow(itemId) {
	return 'cartInstance.incrementItemQuantity(' + itemId + '); cartInstance.update();';
}

function getActionForSelectorDownArrow(itemId) {
	return 'cartInstance.decrementItemQuantity(' + itemId + '); cartInstance.update();';
}

/*--------------------------------------*/
