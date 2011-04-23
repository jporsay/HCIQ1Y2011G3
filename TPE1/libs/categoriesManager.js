
function loadCategories(element) {
	//element es el id o clase del div en el que se van a meter todas las catgorias
	var categories = [{id: sports, img: images/sports.png},{id: health, img: images/health.png},{id: technology, img: images/technology.png}];
	var node = ($document).getElementsById(element);
	
	for (category in categories) {
		
	}
}

function createCategory(name, imagesrc) {
	this.name = name;
	this.imagesrc = imagesrc;
}