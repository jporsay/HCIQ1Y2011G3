var catalog = new ServerManager('Catalog');

function createHolder() {
	var holder = document.getElementById('refinements');
	var temp = document.createElement('ul');
	temp.setAttribute('id', 'catList');
	holder.appendChild(temp);
	
}

function loadCategories(langId) {
	createHolder();
	var catList = document.getElementById('catList');
	catList.innerHTML = "<div><img src='images/ajax-loader.gif'></div>"
	catalog.get(
		{
			method: 'GetCategoryList',
			language_id: langId
		},
		processCategories
	);
}

function processCategories(data) {
	$('#catList').empty();
	$(data).find('category').each(
		function() {
			var category = $(this);
			showCategory(category.attr('id'), category.find('name').text(), document.getElementById('catList'));
		}
	);
}
function showCategory(id, name, elDOM) {
	//element is the ID of the category container.
	//categories is an array of maps holding information of each category.
	var temp = null;
	var temp2 = null;	
	var new_category = document.createElement('li');
	temp = document.createElement('a');
	temp.setAttribute("href","browse.html?catId=" + id + '&page=1');
	temp.innerHTML = name;
	new_category.appendChild(temp);
	elDOM.appendChild(new_category);
	
	temp = document.createElement('ul');
	getSubCategories(id, $('#locale :selected').attr('id'), temp);
	
	elDOM.appendChild(temp);
}
