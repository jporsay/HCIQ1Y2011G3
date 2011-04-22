/**
 * @author Juan Pablo Orsay
 */

function i18n(page) {
	var lang = getCookie('hblanguage');
	this.page = page;
	if (lang === undefined) {
		lang = 'en';
	}
	this.setLang(lang);
}

i18n.prototype.getLang = function() {
	return this.lang;
}

i18n.prototype.setLang = function(lang) {
	this.lang = lang;
	setCookie('hblanguage', this.lang, 365);
	
	$.datepicker.setDefaults($.datepicker.regional[lang === 'en' ? '' : lang]);
	jQuery.i18n.properties({
				name: this.page,
				language: lang,
				path: "translations/" + lang + "/",
				mode: 'both'
			});
}

i18n.prototype.translate = function() {
	var nodes = document.getElementsByClassName('i18n');
	
	for (var i = 0; i < nodes.length; ++i) {
		var key = nodes[i].id;
		var translated = jQuery.i18n.prop(key);
		nodes[i].innerHTML = translated;
	}
}
