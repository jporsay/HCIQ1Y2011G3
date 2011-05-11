var catalog = new ServerManager('Catalog');

function loadCategories() {
	catalog.get(
		{
			method: 'GetCategoryList',
			language_id: 1,
		},
		processCategories
	);
}

function processCategories(data) {
	$(data).find('category').each(
		function() {
			var category = $(this);
			showCategory(category.attr('id'), category.find('name').text());
		}
	);
}

function showCategory(id, name) {
	//element is the ID of the category container.
	//categories is an array of maps holding information of each category.
	var elDOM = document.getElementById('categorycontainer');	
	var new_category = document.createElement("div");
	new_category.setAttribute('id', id);
	new_category.setAttribute("class", "category");
	
	var new_cat_image = document.createElement("img");
	new_cat_image.setAttribute("src", '');
	new_cat_image.setAttribute("alt", name);
	
	var new_cat_desc = document.createElement("div");
	new_cat_desc.setAttribute("class", "catdescription");
	
	var link = document.createElement("a");
	link.setAttribute("id", id);
	//link.setAttribute("class", "i18n");
	link.innerHTML = name;
	link.setAttribute("href","subcategories.html?catId=" + id);
	new_cat_desc.appendChild(link);
	
	new_category.appendChild(new_cat_image);
	new_category.appendChild(new_cat_desc);
	elDOM.appendChild(new_category);
}
