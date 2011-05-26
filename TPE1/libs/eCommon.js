var translator;
function loadCommon() {
	translator = new i18n();
	$("#breadcrumb").jBreadCrumb();
	
	document.getElementById('locale').value = translator.getLang();
	
	$('#searchtext').keydown(function(e) {
		if (e.keyCode === 13) {
			$('#searchbutton').click();
		}
	});
	
	loadUserSesion();
	setSearchAutoCompleteItems('a');
	$('#searchbutton').click(function() {
		if ($('#searchtext').val() != '') {
			window.location = 'browse.html?page=1&searchText=' + $('#searchtext').val();
		}
	});
	
	$("#locale").change(function() {
		translator.setLang($(this).val());
		loadCategories($('#locale :selected').attr('id'));
		translator.translatePage();
	});
	
	$('.logintext').click(function() {
		$('.loginform').slideToggle();
	});
	
	$(document).keydown(function(e) {
		if (e.keyCode == 27) {
			if ($('.loginform').is(':visible') === true) {
				$('.loginform').hide();
			}
		}
	});
}

function setSearchAutoCompleteItems(text) {
	var catalog = new ServerManager('Catalog');
	catalog.get(
		{
			method: 'GetProductListByName',
			criteria: text
		},
		filterResponse
	);
}

function filterResponse(data) {
	var data = $('product', data).map(function() {
		return {
			value: $('name', this).text(),
			id: $(this).attr('id')
		};
	}).get();
	$('#searchtext').autocomplete({
		source: data,
		minLength: 1
	});
}

