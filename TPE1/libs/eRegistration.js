function getValidations() {
	return [
			{
				e: '#email',
				re: /^[\w\d_-]+@[\w\d_-]+\.[\w]+$/,
				min: 1,
				max: 180,
				errorm: getTranslation('mailFormat')
			},
			{
				e: '#username',
				re: /^[\w\d_-]+$/,
				min: 1,
				max: 15,
				errorm: getTranslation('usernameFormat')
			},
			{
				e: '#password',
				re: /^[\w\d_-]+$/,
				min: 8,
				max: 15,
				errorm: getTranslation('passwordFormat')
			},
			{
				e: '#name',
				re: /^[\w ]+$/,
				min: 1,
				max: 80,
				errorm: getTranslation('nameFormat')
			},
			{
				e: '#birthDate',
				re: /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
				min: 1,
				max: 11,
				errorm: getTranslation('dateFormat')
			}
		];
}

function loadRegistration() {
	loadCommon();
	$('#registrationInformation').submit(function(e) {
		e.preventDefault();
		$('form input').each(function() {
			if ($(this).attr('type') !== 'submit' && $(this).attr('type') !== 'button') {
				removeErrorContainer($(this));
				if ($(this).val() === '') {
					createErrorContainer($(this), "Required");
				}
			}
		});
		var validations = getValidations();
		for (var i = 0; i < validations.length; i++) {
			validate(validations[i]);
		}
		if (!document.getElementsByClassName('error').length) {
			createUser($('form input'));
		}
		return false;
	});
	translator.translatePage();
}
