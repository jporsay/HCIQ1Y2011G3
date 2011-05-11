var catalog = new ServerManager('Catalog');

function getItems(categoryId, subcategoryId, langId) {
	catalog.get(
		{
			method: 'GetProductListBySubcategory',
			language_id: langId,
			category_id: categoryId,
			subcategory_id: subcategoryId
		},
		processItems
	);
}


function processItems(data) {
	$(data).find('product').each(
		function() {
			createListItem($(this), document.getElementsByClassName('items')[0]);
		}
	);
}

function createListItem(product, jar) {
	var temp = null;
	var container = document.createElement('div');
	container.id = product.attr('id');
	container.setAttribute('class', 'item');
	
	temp = document.createElement('a');
	temp.innerHTML = product.find('name').text();
	temp.setAttribute('class', 'itemLink');
	temp.href = 'product.html?id=' + product.attr('id');
	container.appendChild(temp);

	temp = document.createElement('img');
	temp.setAttribute('class', 'miniImage');
	temp.src = product.find('image_url').text();
	temp.alt = product.find('name');
	container.appendChild(temp);
	
	var extraInfo = document.createElement('div');
	extraInfo.setAttribute('class', 'extraItemInfo');
	
	temp = document.createElement('p');
	temp.setAttribute('class', 'price');
	temp.innerHTML = product.find('price').text();
	extraInfo.appendChild(temp);
	
	temp = document.createElement('p');
	temp.setAttribute('class', 'rank');
	temp.innerHTML = 'Rank: ' + product.find('sales_rank').text();
	extraInfo.appendChild(temp);
	
	container.appendChild(extraInfo);
	
	jar.appendChild(container);
	
	return jar;
}

function displayItem(id) {
	var catalog = new ServerManager('Catalog');
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
		return;
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
