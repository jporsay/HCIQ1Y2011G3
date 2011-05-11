function ServerManager(section) {
	this.section = section;
}

//Synchronic ajax
ServerManager.prototype.getS = function(params, success, error) {
	$.ajax({
		type: 'GET',
		url: '/service/' + this.section + '.groovy',
		data: params,
		dataType: 'xml',
		success: success,
		error: error,
		async: false
	});
}

//Asynchronic ajax
ServerManager.prototype.get = function(params, success, error) {
	$.ajax({
		type: 'GET',
		url: '/service/' + this.section + '.groovy',
		data: params,
		dataType: 'xml',
		success: success,
		error: error
	});
}

ServerManager.prototype.post = function(params, success, error) {
	$.ajax({
		type: 'POST',
		url: '/service/' + this.section + '.groovy',
		data: params,
		datatType: 'xml',
		success: success,
		error: error
	});
}
