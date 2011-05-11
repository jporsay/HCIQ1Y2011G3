function validate(args) {
	var minLength = args.min;
	var maxLength = args.max;
	var element = $(args.e);
	var regex = args.re;
	var errorm = args.errorm;
	
	if (element.parent().is('.error')) {
		return;
	}
	
	var value = element.val();
	alert(args.e + ', ' + value.length);
	if (value.length < minLength || value.length > maxLength) {
		createErrorContainer(element, errorm);
		return;
	}
	var valid = value.match(regex);
	if (valid) {
		removeErrorContainer(element);
	} else {
		createErrorContainer(element, errorm);
	}
}

function createErrorContainer(element, text) {
	removeErrorContainer(element);
	var parent = element.parent();
	var errorContainer = document.createElement('span');
	errorContainer.innerHTML = text;
	errorContainer.setAttribute('class', 'errorText');
	errorContainer.setAttribute('id', element.attr('id') + 'error');
	parent.append(errorContainer);
	parent.addClass('error');
}

function removeErrorContainer(element) {
	var parent = element.parent();
	var errorContainer = '#' + element.attr('id') + 'error';
	
	$(errorContainer).remove();
	parent.removeClass('error');
}
