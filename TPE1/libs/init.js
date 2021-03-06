function loadCssFiles(cssFiles) {
	if (!isArray(cssFiles)) {
		alert("loadCssFile should receive an array");
		return false;
	}
	
	for (var i = 0; i < cssFiles.length; ++i) {
		var fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", 'css/' + cssFiles[i] + '.css');
		
		loadIfExists(fileref);
	}
	
	return true;
}

function loadJsFiles(files) {
	
	if (!isArray(files)) {
		alert("loadJsFiles should receive an array");
		return false;
	}
	var j = 0;
	while (j < files.length) {
		var fileref = document.createElement("script");
		fileref.setAttribute("type", "text/javascript");
		fileref.setAttribute("src", 'libs/' + files[j] + '.js');
		loadIfExists(fileref);
		j++;
	}
	return true;
}

function isArray(value) {
	return Object.prototype.toString.apply(value) === '[object Array]';
}

function loadIfExists(element) {
	if (typeof fileref !== undefined) {
		$("head").append(element);
	}	
}


//http://www.netlobo.com/url_query_string_javascript.html
function urlParam(name) {
	var name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);

	if (results == null) {
		return "";
	}
	return results[1];
}
