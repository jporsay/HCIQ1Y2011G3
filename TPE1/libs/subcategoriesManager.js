<div class='subcategory'>
					<span class='subcategorytitle'>Action Sports</span><br/>
				</div>
var catalog = new ServerManager('Catalog');

function getSubCategories(categoryId) {
	catalog.get(
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
			createSubCategory($(this).attr('id'), $(this).find('name').text());
		}
	)
}

function createSubCategory(catId, catName) {
	
}
