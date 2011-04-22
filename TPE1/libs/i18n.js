/**
 * @author Juan Pablo Orsay
 */

function i18n(lang) {
	this.setLang(lang);
}

i18n.prototype.getLang = function() {
	return this.lang;
}

i18n.prototype.setLang = function(lang) {
	this.lang = lang;
	
	$.datepicker.setDefaults($.datepicker.regional[lang === 'en' ? '' : lang]);
	
	jQuery.i18n.properties({
				name: "Messages",
				language: lang,
				path: "translations/",
				mode: 'both'
			});
}

i18n.prototype.translate = function(key) {
	return 
}
