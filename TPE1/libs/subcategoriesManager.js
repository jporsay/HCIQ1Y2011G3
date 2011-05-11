var catalog = new ServerManager('Catalog');
var holder = null;
function getSubCategories(categoryId, langId, container) {
	holder = container;
	catalog.get(
		{
			method: 'GetSubcategoryList',
			language_id: langId,
			category_id: categoryId,
		},
		processSubcategories
	);
}

function getSubCategoriesS(categoryId, langId, container) {
	holder = container;
	catalog.getS(
		{
			method: 'GetSubcategoryList',
			language_id: langId,
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
				holder
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
	temp2.setAttribute('href', 'browse.html?subCatId=' + subCatId + '&catId=' + catId);
	temp2.innerHTML = subCatName;
	temp.appendChild(temp2);
	container.appendChild(temp);
	
}
