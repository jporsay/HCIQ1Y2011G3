var cart = new Cart();
function Cart() 
{
	var instance = this;
	Cart.getInstance = function()
	{
		return instance;
	}
}

function CartItem(info, href, quantity) {
	this.quantity = quantity;
	this.info = info;
	this.href = href;
}

Cart.prototype.addItems = function(items) {
	this.items = items;
	return;
}

Cart.prototype.update = function() {
	var cart_item_list = document.getElementById('cartIetmsList').getElementsByTagName('ul')[0];
	for (var i=0; i < this.items.length; i++) {
		addToCart(this.items[i], cart_item_list);
	}
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
		cart_list_container.setAttribute('id', 'cartItemsList');
	var cart_list = document.createElement('ul');
	
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


/*example:
<li>
	<input type="image" name='image' src='images/cart/x3.jpg'></input>
	<a href='#'>Bicicleta 1</a>
	<div class='selector'>
		...
	</div>
</li>
*/
function addToCart(itemData, list) {
	var item = document.createElement("li");
	var item_remove = document.createElement("input");
		item_remove.setAttribute("type", 'image');
		item_remove.setAttribute("name", 'image');
		item_remove.setAttribute("src", 'images/cart/x3.jpg');
	var item_link = document.createElement("a");
		item_link.setAttribute("href", itemData.ref);
		item_link.innerHTML = itemData.text;
	var item_selector = createSelector(itemData.quantity);
	
	item.appendChild(item_remove);
	item.appendChild(item_link);
	item.appendChild(item_selector);
	list.appendChild(item);
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

