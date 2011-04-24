
function loadCategories(element, categories) {
	//element is the ID of the category container.
	//categories is an array of maps holding information of each category.
	//function should be something like this... too sleepy to debug...
	var elDOM = document.getElementById(element);
	
	for (var i = 0; i < categories.length; ++i) {
		var category = categories[i];
		var new_category = document.createElement("div");
		new_category.setAttribute("class", "category")
		
		var new_cat_image = document.createElement("img");
		new_cat_image.setAttribute("src", category.img);
		new_cat_image.setAttribute("alt", category.id);
		new_cat_image.setAttribute("class", "image");
		
		var new_cat_link = document.createElement("a");
		new_cat_link.setAttribute("id", category.id);
		new_cat_link.setAttribute("class", "i18n");
		new_cat_link.setAttribute("href", "#");
		
		new_category.appendChild(new_cat_image);
		new_category.appendChild(new_cat_link);
		elDOM.appendChild(new_category);
	}
}

function createCategory(c_name, c_imagesrc) {
	return {name: c_name, img: c_imagesrc};
}