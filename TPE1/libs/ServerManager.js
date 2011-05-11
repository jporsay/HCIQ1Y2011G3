function ServerManager(section) {
	this.section = section;
}

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
