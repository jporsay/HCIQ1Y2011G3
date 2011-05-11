var catalog = new ServerManager('Catalog');

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
			subcategory_id: subcategoryId
		},
		processItems
	);
}


function processItems(data) {
	$('.items').empty();
	$(data).find('product').each(
		function() {
			createListItem($(this), document.getElementsByClassName('items')[0]);
		}
	);
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
		rank.innerHTML = product.find('price').text();
	var price = document.createElement('p');
		price.setAttribute('class', 'price');
		price.innerHTML = Cart.getInstance().currency + ' ' + product.find('price').text();
	
	extraInfoDiv.appendChild(rank);
	extraInfoDiv.appendChild(price);
	return extraInfoDiv;
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

function processItem(data) {
	var temp = null;
	var temp2 = null;
	if ($(data).find('response').attr('status') === 'fail') {
		alert('Invalid item id');
		window.location = 'index.html';
	}
	var product = $(data).find('product');
	var category = product.find('category_id').text();
	var container = document.getElementsByClassName('productContainer')[0];
	
	//Title
	temp2 = document.createElement('div');
	temp2.setAttribute('class', 'product title');
	temp = document.createElement('h2');
	temp.innerHTML = product.find('name').text();
	temp2.appendChild(temp);
	container.appendChild(temp2);

	//Image
	temp = document.createElement('img');
	temp.src = product.find('image_url').text();
	temp.alt = product.find('name').text();
	container.appendChild(temp);

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
	
	temp = document.createElement('h3');
	temp.setAttribute('class', 'product addToCart cartToggle')
	temp.innerHTML = 'Add to cart';
	temp.id = 'cartToggle';
	container.appendChild(temp);
	
	if (category == '1') {
		buildDvdView(container, product);
	} else {
		buildBookView(container, product);
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
	temp.setAttribute('class', 'productDescription');
	temp2 = document.createElement('h2');
	temp2.innerHTML = "Product description";
	temp.appendChild(temp2);
	container.appendChild(temp);
	container = temp;
	
	
	for (var i = 0; i < fields.length; ++i) {
		temp = document.createElement('div');
		temp.setAttribute('class', fields[i].cssClass);
		temp2 = document.createElement('h3');
		temp2.innerHTML = fields[i].text;
		temp2.setAttribute('class', 'inlineElement');
		temp.appendChild(temp2);
		temp2 = document.createElement('p');
		temp2.setAttribute('class', 'inlineElement');
		temp2.id = fields[i].key;
		temp2.innerHTML = product.find(fields[i].key).text();
		temp.appendChild(temp2);
		container.appendChild(temp);
	}
}
