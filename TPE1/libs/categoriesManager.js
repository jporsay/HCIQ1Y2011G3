
function loadCategories(element, categories) {
	//element is the ID of the category container.
	//categories is an array of maps holding information of each category.
	var elDOM = document.getElementById(element);	
	for (var i = 0; i < categories.length; ++i) {
		var category = categories[i];
		var new_category = document.createElement("div");
		new_category.setAttribute("class", "category")
		
		var new_cat_image = document.createElement("img");
		new_cat_image.setAttribute("src", category.img);
		new_cat_image.setAttribute("alt", category.id);
		
		var new_cat_desc = document.createElement("div");
		new_cat_desc.setAttribute("class", "catdescription");
		
		var link = document.createElement("a");
		link.setAttribute("id", category.id);
		link.setAttribute("class", "i18n");
		link.setAttribute("href","#");
		new_cat_desc.appendChild(link);
		
		new_category.appendChild(new_cat_image);
		new_category.appendChild(new_cat_desc);
		elDOM.appendChild(new_category);
	}
}

function createCategory(c_name, c_imagesrc) {
	return {name: c_name, img: c_imagesrc};
}
