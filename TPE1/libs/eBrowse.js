function browseParams() {
	if (urlParam('searchText')) {
		searchItems(urlParam('searchText'));
	} else if (urlParam('catId')) {
		getItems(urlParam('catId'), urlParam('subCatId'), $('#locale :selected').attr('id'));
	}
}