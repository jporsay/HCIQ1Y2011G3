function loadUserSettings() {
	loadCartAndCategories(false);
	getCountries($('#locale :selected').attr('id'));
	
	$('#addAddressForm').submit(function(e) {
		e.preventDefault();
		var countryId = $(document.getElementById('countryIdNA')).val();
		var stateId = $(document.getElementById('stateIdNA')).val();
		createAddress($('#addAddressForm input'), countryId, stateId);
		$(':text').val('');
	});
	
	$('#personalInfoForm').submit(function(e) {
		e.preventDefault();
		if ($('#nameInput').length > 80 || $('#nameInput').length < 1) {
			alert('invalid name');
			return;
		} else if (!$('#birthDateInput').val().match(/^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)) {
			showStatusMessage('changeUserStatus', getTranslation('dateFormat'));
			return;
		} else if (!$('#emailInput').val().match(/^[\w\d_-]+@[\w\d_-]+\.[\w]+$/)) {
			showStatusMessage('changeUserStatus', getTranslation('mailFormat'));
			return;
		}
		updateUserData($('#nameInput').val(), $('#birthDateInput').val(), $('#emailInput').val());
	});
	
	$('#updateAddressForm').submit(function(e) {
		e.preventDefault();
		updateExistingAddress();
	});
	
	$('#passwordChangeForm').submit(function(e) {
		e.preventDefault();
		var newP = $('#newPassword').val();
		if (newP.length < 8) {
			showStatusMessage('changePasswordStatus', getTranslation('passwordFormat'));
			return;
		}
		changePassword($('#oldPassword').val(), $('#newPassword').val());
		$(':password').val('');
	});
	
	getAddressList(getAddressListCallback);
	showUserData();
	translator.translatePage();
}
