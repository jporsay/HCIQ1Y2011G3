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
	langKeys['registerHeader'] = 'Registro';
	langKeys['registerInfo'] = 'Por favor complete la informaci&oacute;n (todos los campos son obligatorios)';
	langKeys['registerUserName'] = 'Usuario:';
	langKeys['registerBirthDate'] = 'Fecha de nacimiento:';
	langKeys['registerFullName'] = 'Nombre completo:';
	langKeys['registerPassword'] = 'Contrase&ntilde;a:';
	langKeys['registerEmail'] = 'Email:';
	//Browse
	langKeys['productsHeader'] = 'Productos:';
	langKeys['browseRanking'] = 'Ranking: ';
	
	//BreadCrumb
	langKeys['bcHome'] = 'Inicio';
	langKeys['bcSettings'] = 'Configuraci&oacute;n';
	langKeys['bcBrowse'] = 'Productos';
	langKeys['bcRegister'] = 'Registrarse';
	
	//Product
	langKeys['pAddToCart'] = 'A&ntilde;adir al carrito';
	langKeys['pRemoveFromCart'] = 'Quitar del carrito';
	langKeys['pPrice'] = 'Precio: ';
	langKeys['format'] = 'Formato: ';
	langKeys['language'] = 'Idioma: ';
	langKeys['subtitles'] = 'Subt&iacute;tulos: ';
	langKeys['region'] = 'Regi&oacute;n: ';
	langKeys['aspect_ratio'] = 'Aspecto: ';
	langKeys['number_discs'] = 'Discos: ';
	langKeys['release_date'] = 'Fecha de publicación: ';
	langKeys['run_time'] = 'Duraci&oacute;n: ';
	langKeys['authors'] = 'Autores: ';
	langKeys['publisher'] = 'Publicador: ';
	langKeys['published_date'] = 'Fecha de publicaci&oacute;n: ';
	return langKeys;
}

i18n.prototype.hasTranslation = function(key) {
	return this.langKeys[key];
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
	langKeys['registerHeader'] = 'Registration';
	langKeys['registerInfo'] = 'Please enter the required information (all fields are required)';
	langKeys['registerUserName'] = 'User:';
	langKeys['registerBirthDate'] = 'Birth Date:';
	langKeys['registerFullName'] = 'Full name:';
	langKeys['registerPassword'] = 'Password:';
	langKeys['registerEmail'] = 'Email:';
	//Browse
	langKeys['productsHeader'] = 'Products:';
	langKeys['browseRanking'] = 'Ranking: ';
	
	//BreadCrumb
	langKeys['bcHome'] = 'Home';
	langKeys['bcSettings'] = 'Settings';
	langKeys['bcBrowse'] = 'Products';
	langKeys['bcRegister'] = 'Register';
	
	//Product
	langKeys['pAddToCart'] = 'Add to cart';
	langKeys['pRemoveFromCart'] = 'Remove from cart';
	langKeys['pPrice'] = 'Price: ';
	langKeys['format'] = 'Format: ';
	langKeys['language'] = 'Language: ';
	langKeys['subtitles'] = 'Subtitles: ';
	langKeys['region'] = 'Region: ';
	langKeys['aspect_ratio'] = 'Aspect Ratio: ';
	langKeys['number_discs'] = 'Discs: ';
	langKeys['release_date'] = 'Release date: ';
	langKeys['run_time'] = 'Run time: ';
	langKeys['authors'] = 'Authors: ';
	langKeys['publisher'] = 'Publisher: ';
	langKeys['published_date'] = 'Published date: ';
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

