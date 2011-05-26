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
	
	$('#searchbutton').click(function() {
		if ($('#searchtext').val() != '') {
			window.location = 'browse.html?searchText=' + $('#searchtext').val();
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
