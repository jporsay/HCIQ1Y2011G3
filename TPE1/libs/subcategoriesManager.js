var catalog = new ServerManager('Catalog');
function getSubCategories(categoryId, langId, container) {
	container.innerHTML = "<img src='images/ajax-loader.gif'>";
	catalog.get(
		{
			method: 'GetSubcategoryList',
			language_id: langId,
			category_id: categoryId,
		},
		function(data) {
			processSubcategories(data, container);
		}
	);
}

function processSubcategories(data, container) {
	container.innerHTML = null;
	$(data).find('subcategory').each(
		function() {
			createSubCategory(
				$(this).attr('id'),
				$(this).find('category_id').text(),
				$(this).find('name').text(),
				container
			);
		}
	)
}
//<li><a href=""><span>Humor</span></a></li>
function createSubCategory(subCatId, catId, subCatName, container) {
	var temp = null;
	var temp2 = null;
	temp = document.createElement('li');
	temp2 = document.createElement('a');
	temp2.setAttribute('href', 'browse.html?subCatId=' + subCatId + '&catId=' + catId + '&page=1');
	temp2.innerHTML = subCatName;
	temp.appendChild(temp2);
	container.appendChild(temp);
	
}
