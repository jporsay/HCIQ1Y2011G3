function getItems(categoryId, subcategoryId, langId) {
	var catalog = new ServerManager('Catalog');
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
	temp.innerText = product.find('name').text();
	temp.setAttribute('class', 'itemLink');
	temp.href = '#';
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
	temp.innerText = product.find('price').text();
	extraInfo.appendChild(temp);
	
	temp = document.createElement('p');
	temp.setAttribute('class', 'rank');
	temp.innerText = 'Rank: ' + product.find('sales_rank').text();
	extraInfo.appendChild(temp);
	
	container.appendChild(extraInfo);
	
	jar.appendChild(container);
	
	return jar;
}
