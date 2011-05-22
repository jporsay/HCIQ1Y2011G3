var ITEMSPERPAGE = 5;
var catalog = new ServerManager('Catalog');
var prod = [];

function getItems(categoryId, subcategoryId, langId) {
	var method = 'GetProductListBySubcategory';
	if (subcategoryId == "") {
		method = 'GetProductListByCategory';
	}
	catalog.get(
		{
			method: method,
			language_id: langId,
			category_id: categoryId,
			subcategory_id: subcategoryId,
			items_per_page: ITEMSPERPAGE,
			page: urlParam('page')
		},
		processItems
	);
}

function searchItems(searchText) {
	catalog.get(
		{
			method: 'GetProductListByName',
			criteria: searchText
		},
		processItems
	);
}

function processItems(data) {
	$('.items').empty();
	var container = document.getElementsByClassName('items')[0];
	var temp = document.createElement('h1');
	temp.setAttribute('id', 'productsHeader');
	temp.setAttribute('class', 'i18n productTitle');
	container.appendChild(temp);
	
	var added = 0;
	$(data).find('product').each(
		function() {
			createListItem($(this), container);
			added++;
		}
	);
	setButtons(container, added);
	var translator = new i18n();
	translator.translatePage();
}

/*
<div id="55" class="item">
	<div class="itemLink">
		<a href="product.html?id=55">2001: A Space Odyssey</a>
	</div>
	<div class="miniImage">
		<img src="http://eiffel.itba.edu.ar/hci/service/images/020.jpg" alt="[object Object]">
	</div>
	<div class="extraItemInfo">
		<p class="rank">Rank: 67</p>
		<p class="price">10.49</p>
		<div class='cartDiv'>
			<img src="./images/cart/cartItem.png">
			<span class='addToCart'>Add To Cart</span>
		</div>
	</div>
</div>
*/
function createListItem(product, jar) {
	var temp = null;
	var container = document.createElement('div');
		container.setAttribute('id', product.attr('id'));
		container.setAttribute('class', 'item');
		temp = createItemLinkDiv(product); 
		container.appendChild(temp);
		temp = createMiniImgDiv(product);
		container.appendChild(temp);	
		temp = createExtraIteminfo(product);
		container.appendChild(temp);
		
	jar.appendChild(container);
	return jar;
}

function createItemLinkDiv(product) {
	var linkDiv = document.createElement('div');
		linkDiv.setAttribute('class', 'itemLink');
	
	var link = document.createElement('a');
		link.innerHTML = product.find('name').text();
		link.setAttribute('href', 'product.html?id=' + product.attr('id'));
		
	linkDiv.appendChild(link);
	return linkDiv;
}

function createMiniImgDiv(product) {
	var imgDiv = document.createElement('div');
		imgDiv.setAttribute('class', 'miniImage');
	
	var img = document.createElement('img');
		img.setAttribute('src', product.find('image_url').text());
		img.setAttribute('alt', product.find('name').text());
		
	imgDiv.appendChild(img);
	return imgDiv;
}

function createExtraIteminfo(product) {
	var extraInfoDiv = document.createElement('div');
		extraInfoDiv.setAttribute('class', 'extraItemInfo');
	
	var rank = document.createElement('p');
		rank.setAttribute('class', 'rank');
		var rankValue = product.find('sales_rank').text();
		rank.innerHTML = 'Product ranking: ' + rankValue;
		$(rank).css('color', getColorForRanking(rankValue));
	var price = document.createElement('p');
		price.setAttribute('class', 'price');
		price.innerHTML = '$' + product.find('price').text();
	
	extraInfoDiv.appendChild(price);
	extraInfoDiv.appendChild(rank);
	return extraInfoDiv;
}

function getColorForRanking(ranking) {
	return '#ffffff';
	var value = parseInt(ranking);
	if (value < 10) {
		return '#ffffff';
	} else if (value < 100) {
		return '#ffaaff';
	} else {
		return '#ffaaff';
	}
}

function displayItem(id) {
	catalog.get(
		{
			method: 'GetProduct',
			product_id: id
		},
		processItem
	);
}

function removeFromCart(calledFromCart) {
	$('#cartToggle').html('Add to cart');
	$('#cartToggle').removeClass('removeFromCart');
}

function _addToCart() {
	$('#cartToggle').html('Remove from cart');
	cartInstance.addItem(new CartItem(prod['name'], prod['id'], prod['price'], prod['img']));
}

function toggleFromCart(element) {
	$('#cartToggle').toggleClass('removeFromCart');
	if ($('#cartToggle').is('.removeFromCart')) {
		_addToCart();
	} else {
		cartInstance.removeItem(prod['id']);
	}
	cartInstance.update();
}

function processItem(data) {
	var temp = null;
	var temp2 = null;
	if ($(data).find('response').attr('status') === 'fail') {
		alert('Invalid item id');
		window.location = 'index.html';
	}
	var product = $(data).find('product');
	prod['id'] = product.attr('id');
	var category = product.find('category_id').text();
	var container = document.getElementsByClassName('productContainer')[0];
	
	//Title
	temp2 = document.createElement('div');
	temp2.setAttribute('class', 'product title');
	temp = document.createElement('h2');
	temp.innerHTML = product.find('name').text();
	temp2.appendChild(temp);
	container.appendChild(temp2);
	temp2 = document.getElementById('last')
	temp2.innerHTML = product.find('name').text();
	prod['name'] = product.find('name').text();

	//Image
	temp = document.createElement('img');
	temp.src = product.find('image_url').text();
	temp.alt = product.find('name').text();
	container.appendChild(temp);
	prod['img'] = product.find('image_url').text();

	//Price
	temp = document.createElement('div');
	temp.setAttribute('class', 'product price')
	temp2 = document.createElement('h3');
	temp2.innerHTML = 'Price:';
	temp.appendChild(temp2);
	temp2 = document.createElement('p');
	temp2.id = 'price';
	temp2.innerHTML = product.find('price').text();
	temp.appendChild(temp2);
	container.appendChild(temp);
	prod['price'] = product.find('price').text();
	
	temp = document.createElement('a');
	temp.setAttribute('class', 'product cartToggle')
	temp.innerHTML = 'Add to cart';
	temp.setAttribute('onClick', "toggleFromCart(this)");
	temp.id = 'cartToggle';
	container.appendChild(temp);
	temp = document.createElement('input');
	temp.setAttribute('type', 'image');
	temp.setAttribute('id', 'toggleFromCartInput');
	temp.setAttribute('src', './images/cart/cartItem.png');
	container.appendChild(temp);
	
	temp2 = document.getElementById('bcBrowse');
	temp2.setAttribute('href', 'browse.html?catId=' + product.find('category_id').text() + "&subCatId=" + product.find('subcategory_id').text());
	
	if (category == '1') {
		buildDvdView(container, product);
	} else {
		buildBookView(container, product);
	}
	if (cartInstance.inCart(urlParam('id'))) {
		toggleFromCart();
	}
	
}

function buildDvdView(container, product) {
	var fields = [
		{text: 'Format: ', cssClass: 'format', key: 'format'},
		{text: 'Language: ', cssClass: 'language', key: 'language'},
		{text: 'Subtitles: ', cssClass: 'subtitles', key: 'subtitles'},
		{text: 'Region: ', cssClass: 'region', key: 'region'},
		{text: 'Aspect Ratio: ', cssClass: 'aspectRatio', key: 'aspect_ratio'},
		{text: 'Discs: ', cssClass: 'discs', key: 'number_discs'},
		{text: 'Release Date: ', cssClass: 'releaseDate', key: 'release_date'},
		{text: 'Run time: ', cssClass: 'runTime', key: 'run_time'},
		{text: 'ASIN: ', cssClass: 'asin', key: 'ASIN'}
	];
	genericViewBuilder(container, product, fields);
}

function buildBookView(container, product) {
	var fields = [
		{text: 'Authors: ', cssClass: 'authors', key: 'authors'},
		{text: 'Publisher: ', cssClass: 'publisher', key: 'publisher'},
		{text: 'Published date: ', cssClass: 'publishedDate', key: 'published_date'},
		{text: 'ISBN 10: ', cssClass: 'isbn10', key: 'ISBN_10'},
		{text: 'ISBN 13: ', cssClass: 'isbn13', key: 'ISBN_13'},
		{text: 'Language: ', cssClass: 'language', key: 'language'}
	];
	genericViewBuilder(container, product, fields);
}

function genericViewBuilder(container, product, fields) {
	var temp = null;
	var temp2 = null;
	
	temp = document.createElement('div');
	temp.setAttribute('class', 'description');
	temp2 = document.createElement('h2');
	temp2.innerHTML = "Product description";
	temp.appendChild(temp2);
	container.appendChild(temp);
	container = temp;
	
	
	for (var i = 0; i < fields.length; ++i) {
		//field holder
		temp = document.createElement('div');
		temp.setAttribute('class', fields[i].cssClass);
		//field title
		temp2 = document.createElement('h3');
		temp2.innerHTML = fields[i].text;
		temp.appendChild(temp2);
		temp2 = document.createElement('p');
		temp2.id = fields[i].key;
		temp2.innerHTML = product.find(fields[i].key).text();
		temp.appendChild(temp2);
		container.appendChild(temp);
	}
}

function setButtons(container, itemsAdded) {
	addButtons(container);
	if (itemsAdded < ITEMSPERPAGE) {
		var nextBtn = document.getElementsByClassName('next')[0];
		nextBtn.setAttribute('disabled', 'disabled');
	}
	if (parseInt(urlParam('page')) == 1) {
		var prevBtn = document.getElementsByClassName('prev')[0];
		prevBtn.setAttribute('disabled', 'disabled');
	}
}

function addButtons(jar) {
	var prevBtn = document.createElement('button');
	prevBtn.setAttribute('type', 'button');
	prevBtn.setAttribute('class', 'navButton prev');
	prevBtn.setAttribute('onClick', 'prevPage()');
	prevBtn.innerHTML = '« Previous'
	jar.appendChild(prevBtn);
	
	var nextBtn = document.createElement('button');
	nextBtn.setAttribute('type', 'button');
	nextBtn.setAttribute('class', 'navButton next');
	nextBtn.setAttribute('onClick', 'nextPage()');
	nextBtn.innerHTML = 'Next »'
	jar.appendChild(nextBtn);
}

function prevPage() {
	var currPage = 1;
	if (urlParam('page')) {
		var currPage = parseInt(urlParam('page'));
		if (currPage <= 1) {
			return;
		}
		currPage--;
	}
	toPage(currPage);
}

function nextPage() {
	var currPage = 1;
	if (urlParam('page')) {
		currPage = parseInt(urlParam('page'));
		currPage++;
	}
	toPage(currPage);
}

function toPage(pageNumber) {
	var newParams = '';
	newParams += 'page=' + pageNumber;
	if (urlParam('subCatId')) {
		newParams += '&subCatId=' + urlParam('subCatId');
	}
	if (urlParam('catId')) {
		newParams += '&catId=' + urlParam('catId')
	}
	cartInstance.saveState();
	window.location = 'browse.html?' + newParams;
}
