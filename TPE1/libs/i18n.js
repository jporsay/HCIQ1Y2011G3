var langKeys = [];
var lang = null;
function loadLanguageStrings() {
	if (langKeys.length === 0) {
		loadSpanish();
		loadEnglish();
	}
}

function loadSpanish() {
	langKeys['es'] = [];
	//Common
	langKeys['es']['logintext'] = 'Loguearse';
	langKeys['es']['usernameText'] = 'Usuario:';
	langKeys['es']['passwordText'] = 'Contrase&ntilde;a:';
	langKeys['es']['searchtext'] = 'Buscar';
	langKeys['es']['categoryHeader'] = 'Categor&iacute;as';
	//Index
	langKeys['es']['hotItemsHeader'] = 'Art&iacute;culos del dia:';
	//Cart
	langKeys['es']['cartQuantity'] = 'Cantidad: ';
	langKeys['es']['cartItemsHeader'] = 'Items del Carrito:';
	langKeys['es']['cartCheckoutLink'] = 'Realizar el checkout!';
}

function loadEnglish() {
	langKeys['en'] = [];
	//Common
	langKeys['en']['logintext'] = 'Login';
	langKeys['en']['usernameText'] = 'Username:';
	langKeys['en']['passwordText'] = 'Password:';
	langKeys['en']['searchtext'] = 'Search';
	langKeys['en']['categoryHeader'] = 'Categories';
	//Index
	langKeys['en']['hotItemsHeader'] = 'Today\'s hot items:'
	//Cart
	langKeys['en']['cartQuantity'] = 'Quantity: ';
	langKeys['en']['cartItemsHeader'] = 'Cart Items:';
	langKeys['en']['cartCheckoutLink'] = 'Proceed to checkout!';
	
}

function processKey(key) {
	var pkey = key;
	if (key.search('cartQuantity') !== -1) {
		pkey = 'cartQuantity';
	}
	
	return pkey;
}

function getTranslation(key) {
	var keyp = processKey(key);
	return langKeys[lang][keyp];
}

function i18n() {
	loadLanguageStrings();
	lang = $.cookie('hblanguage');
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
	
	var optionHolder;
	if (document.getElementById('locale') === null) {
		optionHolder = document.createElement('select');
		optionHolder.setAttribute('id', 'locale');
		var holder = document.getElementById('localization');
		holder.appendChild(optionHolder);
		
		var option = null
		var first = true;
		$(data).find('language').each(
			function() {
				option = document.createElement('option');
				var code = $(this).find('code').text();
				option.id = $(this).attr('id');
				if (lang === code || (first === true && lang === null)) {
					option.setAttribute('selected', 'selected');
					first = false;
				}
				option.setAttribute('value', code);
				option.innerHTML = $(this).find('name').text();
				optionHolder.appendChild(option);
			}
		);
	}
}

i18n.prototype.getLang = function() {
	return lang;
}

i18n.prototype.getLangId = function() {
	return $('locale').attr('id');
}

i18n.prototype.setLang = function(language) {
	lang = language;
	$.cookie('hblanguage', null);
	$.cookie('hblanguage', lang, {path: '/'});
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
	var translated = getTranslation(key);
	// not using getAttribute since its buggy.
	if (key === 'searchtext') {
		//not using setAttribute since its broken in IE and in Opera.
		node.setAttribute('value', translated);
	} else {
		node.innerHTML = translated;
	}
	
	return true;
}

