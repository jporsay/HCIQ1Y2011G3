var cart = new Cart();
function Cart() 
{
	var instance = this;
	Cart.getInstance = function()
	{
		return instance;
	}
}

function CartItem(name, href, id, price) {
	this.quantity = '1';
	this.name = name;
	this.href = href;
	this.id = id;
	this.price = price;
}

Cart.prototype.addItems = function(items) {
	this.items = items;
	return;
}

Cart.prototype.update = function() {
	var cart_item_list = document.getElementById('cartItemsList');
	for (var i=0; i < this.items.length; i++) {
		addToCart(this.items[i], cart_item_list);
	}
}

/*example:
<li>
	<input type="image" name='image' src='images/cart/x3.jpg'></input>
	<a href='#'>Bicicleta 1</a>
	<div class='selector'>
		...
	</div>
</li>
*/
function addToCart(cartItem, list) {
	var item = document.createElement("li");
	var item_remover = document.createElement("input");
		item_remover.setAttribute("type", 'image');
		item_remover.setAttribute("name", 'image');
		item_remover.setAttribute("src", 'images/cart/x3.jpg');
	
	var item_information = document.createElement("div");
		item_information.setAttribute('class', 'itemInformation');
	var item_link = document.createElement("a");
		item_link.setAttribute("href", cartItem.href);
		item_link.innerHTML = cartItem.name;
	var item_priceInfo = createItemPriceDiv(cartItem);
	var item_selector = createSelector((cartItem.quantity));
	
	item.appendChild(item_remover);
	item_information.appendChild(item_link);
	item_information.appendChild(item_priceInfo);
	item.appendChild(item_information);
	item.appendChild(item_selector);
	list.appendChild(item);
}

function createItemPriceDiv(cartItem) {
	var information_price = document.createElement('div');
		information_price.setAttribute('class','cartItemPrice');
	var information_price_currency = document.createElement('span');
		information_price_currency.setAttribute('class', 'currency');
		information_price_currency.innerHTML = '$';
	var information_price_number = document.createElement('span');
		information_price_number.setAttribute('class', 'number');
		information_price_number.innerHTML = cartItem.price;
		
	information_price.appendChild(information_price_currency);
	information_price.appendChild(information_price_number);
	return information_price;
}

/*example:
<div class='selector'>
	<span>569</span>
	<div class='arrows'>
		<input type='image' name='image' src='images/cart/upArrow.jpg'></input>
		<input type='image' name='image' src='images/cart/downArrow.jpg'></input>
	</div>
</div>
*/
function createSelector(inititalQuantity) {
	var selector = document.createElement("div");
		selector.setAttribute('class','selector');
		
	var selector_text = document.createElement("span");
		selector_text.innerHTML = inititalQuantity;
		
	var selector_arrows = document.createElement("div");
		selector_arrows.setAttribute('class','arrows');
		
	var selector_arrowUp = document.createElement("input");
		selector_arrowUp.setAttribute('type','image');
		selector_arrowUp.setAttribute('name','image');
		selector_arrowUp.setAttribute('src','images/cart/upArrow.jpg');
	var selector_arrowDown = document.createElement("input");
		selector_arrowDown.setAttribute('type','image');
		selector_arrowDown.setAttribute('name','image');
		selector_arrowDown.setAttribute('src','images/cart/downArrow.jpg');
		
	selector_arrows.appendChild(selector_arrowUp);
	selector_arrows.appendChild(selector_arrowDown);
	
	selector.appendChild(selector_text);
	selector.appendChild(selector_arrows);
	return selector;
}

/*example
<div class='cart'>
	<div class='cartTitle'>
		  ...
	</div>
	<div class='cartItems' id='cartIetmsList'>
		...
	</div>
	<div class='cartFooter'>
		...
	</div>
</div>
*/
Cart.prototype.load = function() {
	var cart = document.getElementById('cart');
	var cart_title = createCartTitle();
	var cart_items_container = createCartList();
	var cart_footer = createCartFooter();
	
	cart.appendChild(cart_title);
	cart.appendChild(cart_items_container);
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
	<ul>
		<!--Dinamically loaded with js-->
	</ul>
</div>
*/
function createCartList() {
	var cart_list_container = document.createElement('div');
		cart_list_container.setAttribute('class', 'cartItems');
	var cart_list = document.createElement('ul');
		cart_list.setAttribute('id', 'cartItemsList');
	
	cart_list_container.appendChild(cart_list);
	return cart_list_container;
}

/*example:
<div class='cartFooter'>
	<span class="label">Total:</span>
	<span class="currency">$</span>
	<span id="cartTotalPrice">759.55</span>
	<a href="#">checkout!<a>
</div>
*/
function createCartFooter() {
	var footer = document.createElement('div');
		footer.setAttribute('class', 'cartFooter');
	var foter_label = document.createElement('span');
		foter_label.setAttribute('class', 'label');
		foter_label.innerHTML = 'Total:'
	var foter_currency_label = document.createElement('span');
		foter_currency_label.setAttribute('class', 'currency');
	var foter_number_label = document.createElement('span');
		foter_number_label.setAttribute('id', 'cartTotalPrice');
	var footer_checkout = document.createElement('a');
		footer_checkout.setAttribute('href', '#');
		footer_checkout.innerHTML = 'checkout!';
		
	footer.appendChild(foter_label);
	footer.appendChild(foter_currency_label);
	footer.appendChild(foter_number_label);
	footer.appendChild(footer_checkout);
	return footer;
}
