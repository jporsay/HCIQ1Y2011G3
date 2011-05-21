function i18n(page) {
	var lang = $.cookie('hblanguage');
	this.page = page;
	if (lang === undefined) {
		lang = 'en';
	}
	fetchLanguages();
	this.setLang(lang);
}

function fetchLanguages() {
	var common = new ServerManager('Common');
	common.getS({
		method: 'GetLanguageList'
	},
		setLanguages
	);
}

function setLanguages(data) {
	$('#locale').empty();
	var options = document.getElementById('locale');
	var option = null
	var first = true;
	$(data).find('language').each(
		function() {
			option = document.createElement('option');
			option.id = $(this).attr('id');
			if (first) {
				option.setAttribute('selected', 'selected');
				first = false;
			}
			option.setAttribute('value', $(this).find('code').text());
			option.innerHTML = $(this).find('name').text();
			options.appendChild(option);
		}
	)
}

i18n.prototype.getLang = function() {
	return this.lang;
}

i18n.prototype.getLangId = function() {
	return $('locale').attr('id');
}

i18n.prototype.setLang = function(lang) {
	this.lang = lang;
	$.cookie('hblanguage', null);
	$.cookie('hblanguage', this.lang, {path: '/'});
	jQuery.i18n.properties({
				name: this.page,
				language: lang,
				path: "translations/" + lang + "/",
				mode: 'both'
			});
}

i18n.prototype.translatePage = function() {
	var nodes = document.getElementsByClassName('i18n');
	
	for (var i = 0; i < nodes.length; ++i) {
		this.translateElement(nodes[i]);
	}
	
	return true;
}

i18n.prototype.translateElement = function(node) {
	var key = node.id;
	var translated = jQuery.i18n.prop(key);
	// not using getAttribute since its buggy.
	if (node.attributes.placeholder !== undefined) {
		//not using setAttribute since its broken in IE and in Opera.
		node.attributes.placeholder.value = translated;
	} else {
		node.innerHTML = translated;
	}
	
	return true;
}

