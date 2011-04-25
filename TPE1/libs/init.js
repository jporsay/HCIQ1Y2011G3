function loadCssFiles(cssFiles) {
	if (!isArray(cssFiles)) {
		alert("loadCssFile should receive an array");
		return false;
	}
	
	for (var i = 0; i < cssFiles.length; ++i) {
		var fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", cssFiles[i]);
		
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
		fileref.setAttribute("src", files[j]);
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
