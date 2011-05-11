var catalog = new ServerManager('Catalog');

function getSubCategories(categoryId) {
	catalog.get(
		{
			method: 'GetSubcategoryList',
			language_id: 1,
			category_id: categoryId,
		},
		processSubcategories
	);
}

function processSubcategories(data) {
	$(data).find('subcategory').each(
		function() {
			createSubCategory(
				$(this).attr('id'),
				$(this).find('category_id').text(),
				$(this).find('name').text(),
				document.getElementsByClassName('subcategoriescontainer')[0]
			);
		}
	)
}

function createSubCategory(subCatId, catId, subCatName, container) {
	var temp = null;
	
	temp = document.createElement('div');
	temp.setAttribute('class', 'subcategory');
	temp.innerHTML = '<a href=\'browse.html?subCatId=' + subCatId + '&catId=' + catId + '\' class=\'subcategorytitle\'>' + subCatName + '</a><br/>';
	
	container.appendChild(temp);
	
}
