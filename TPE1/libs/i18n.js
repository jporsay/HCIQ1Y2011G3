function loadSpanish() {
	langKeys = [];
	//Common
	langKeys['logintext'] = 'Loguearse';
	langKeys['usernameText'] = 'Usuario:';
	langKeys['passwordText'] = 'Contrase&ntilde;a:';
	langKeys['searchtext'] = 'Buscar';
	langKeys['categoryHeader'] = 'Categor&iacute;as';
	//Index
	langKeys['hotItemsHeader'] = 'Art&iacute;culos del dia:';
	//Cart
	langKeys['cartQuantity'] = 'Cantidad: ';
	langKeys['cartItemsHeader'] = 'Items del Carrito:';
	langKeys['cartCheckoutLink'] = 'Realizar el checkout!';
	//Register - User settings
	langKeys['registerUserName'] = 'Usuario:';
	langKeys['registerFullName'] = 'Nombre completo:';
	langKeys['registerPassword'] = 'Contrase&ntilde;a:';
	langKeys['registerEmail'] = 'Email:';
	//Browse
	langKeys['productsHeader'] = 'Productos:';
	
	return langKeys;
}

function loadEnglish() {
	langKeys = [];
	//Common
	langKeys['logintext'] = 'Login';
	langKeys['usernameText'] = 'Username:';
	langKeys['passwordText'] = 'Password:';
	langKeys['searchtext'] = 'Search';
	langKeys['categoryHeader'] = 'Categories';
	//Index
	langKeys['hotItemsHeader'] = 'Today\'s hot items:'
	//Cart
	langKeys['cartQuantity'] = 'Quantity: ';
	langKeys['cartItemsHeader'] = 'Cart Items:';
	langKeys['cartCheckoutLink'] = 'Proceed to checkout!';
	//Register - User settings
	langKeys['registerUserName'] = 'User:';
	langKeys['registerFullName'] = 'Full name:';
	langKeys['registerPassword'] = 'Password:';
	langKeys['registerEmail'] = 'Email:';
	//Browse
	langKeys['productsHeader'] = 'Products:';
	
	return langKeys;
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
	return this.langKeys[keyp];
}

function i18n() {
	lang = $.cookie('hblanguage');
	if (lang == null) {
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
	return this.lang;
}

i18n.prototype.getLangId = function() {
	return $('locale').attr('id');
}

i18n.prototype.setLang = function(language) {
	this.lang = language;
	this.langKeys = this.lang === 'en' ? loadEnglish() : loadSpanish()
	$.cookie('hblanguage', null);
	$.cookie('hblanguage', this.lang, {path: '/'});
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
	if ($(node).is('input')) {
		//not using setAttribute since its broken in IE and in Opera.
		node.setAttribute('value', translated);
	} else {
		node.innerHTML = translated;
	}
	
	return true;
}

