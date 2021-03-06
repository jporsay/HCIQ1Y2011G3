var security = new ServerManager('Security');
function createUser(rawData) {
	var processedData = processData(rawData);
	var nuXML = buildUserXML(processedData, true);
	security.post(
		{
		method: 'CreateAccount',
		account: nuXML
		},
		function(data) {
			var status = $(data).find('response').attr('status');
			if (status === 'ok') {
				logIn(
					processedData.username,
					processedData.password,
					function(data) {
						logInCallback(data);
						window.location = 'index.html';
					}
				);
			}
		},
		errorPost
	);
}

function showUserData() {
	var userData = getLoggedData();
	if (!userData) {
		alert('You need to be logged in to do this action');
		return;
	}
	security.get(
		{
			method: 'GetAccount',
			username: userData['userName'],
			authentication_token: userData['token']
		},
		fillUserData
	);
}

function fillUserData(data) {
	$('#nameInput').val($(data).find('name').text());
	$('#emailInput').val($(data).find('email').text());
	$('#birthDateInput').val($(data).find('birth_date').text());
}

function updateUserData(fullName, birthDate, email) {
	var userData = getLoggedData();
	if (!userData) {
		alert('You need to be logged in to do this action');
		return;
	}
	var ouXML = '<account>';
	ouXML = ouXML + '<name>' + fullName + '</name>';
	ouXML = ouXML + '<email>' + email + '</email>';
	ouXML = ouXML + '<birth_date>' + birthDate + '</birth_date>';
	ouXML = ouXML + '</account>';
	security.post(
		{
			method: 'UpdateAccount',
			username: userData['userName'],
			authentication_token: userData['token'],
			account: ouXML
		},
		function(data) {
			var status = $(data).find('response').attr('status');
			if (status === 'ok') {
				showStatusMessage('changeUserStatus', getTranslation('settingsChanged'));
			} else {
				showStatusMessage('changeUserStatus', getTranslation('settingsError'));
			}
		}
	);
}

function changePassword(oldPassword, newPassword) {
	var userData = getLoggedData();
	if (!userData) {
		alert('You need to be logged in to do this action');
		return;
	}
	security.post(
		{
			method: 'ChangePassword',
			username: userData['userName'],
			password: oldPassword,
			new_password: newPassword
		},
		function(data) {
			var status = $(data).find('response').attr('status');
			if (status === 'ok') {
				showStatusMessage('changePasswordStatus', getTranslation('passwordChangeOk'));
			} else {
				showStatusMessage('changePasswordStatus', getTranslation('passwordChangeFail'));
			}
		}
	);
}

function successPost(data) {
	var status = $(data).find('response').attr('status');
	if (status === 'fail') {
		$('.errorContainer').css('display', 'block');
	} else {
	}
}

function errorPost(data) {
	alert($(data).find('response').attr('status'));
}

function processData(rawData) {
	var pData = [];
	rawData.each(
		function() {
			if ($(this).attr('type') !== 'submit' && $(this).attr('type') !== 'button') {
				pData[$(this).attr('id')] = $(this).val();
			}
		}
	);
	return pData;
}

function buildUserXML(rawData, newUser) {
	var xml = "<account>";
	if (newUser) {
		xml = xml + "<username>" + rawData.username + "</username>";
		xml = xml + "<password>" + rawData.password + "</password>";
	}
	xml = xml + "<name>" + rawData.name + "</name>";
	xml = xml + "<birth_date>" + rawData.birthDate + "</birth_date>";
	xml = xml + "<email>" + rawData.email + "</email>";
	xml = xml + "</account>";
	return xml;
}


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Address/////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
var order = new ServerManager('Order');
function createAddress(rawData, countryId, stateId) {
	var userdata = getLoggedData();
	if (!userdata) {
		alert('You need to be logged in to do this action');
		return;
	}
	var processedData = processData(rawData);
	processedData['countryId'] = countryId;
	processedData['stateId'] = stateId;
	var naXML = buildNewAddressXML(processedData);
	order.post(
		{
			method: 'CreateAddress',
			address: naXML,
			username: userdata['userName'],
			authentication_token: userdata['token']
		},
		function(data) {
			var status = $(data).find('response').attr('status');
			if (status === 'ok') {
				showStatusMessage('addAddressStatus', getTranslation('addressAdded'));
			} else {
				showStatusMessage('addAddressStatus', getTranslation('settingsError'));
			}
		}
	);
}

function getAddress(addressId, callback, synch) {
	var userdata = getLoggedData();
	if (!userdata) {
		alert('You need to be logged in to do this action');
		return;
	}
	if (synch) {
		order.getS(
		{
			method: 'GetAddress',
			username: userdata['userName'],
			authentication_token: userdata['token'],
			address_id: addressId
		},
		callback
	);
	} else {
		order.get(
			{
				method: 'GetAddress',
				username: userdata['userName'],
				authentication_token: userdata['token'],
				address_id: addressId
			},
			callback
		);
	}
}

function getAddressList(callback) {
	var userdata = getLoggedData();
	if (!userdata) {
		alert('You need to be logged in to do this action');
		return;
	}
	order.get(
		{
			method: 'GetAddressList',
			username: userdata['userName'],
			authentication_token: userdata['token']
		},
		callback
	);
}

function buildNewAddressXML(rawData, id) {
	var xml;
	xml = "<address" + (id ? (' id=\'' + id + '\'') : '') + '>';
	xml = xml + "<full_name>" + rawData.fullName + "</full_name>";
	xml = xml + "<address_line_1>" + rawData.addressLineOne + "</address_line_1>";
	xml = xml + (rawData.addressLineTwo == "" ? "<address_line_2/>" : "<address_line_2>" + rawData.addressLineTwo + "</address_line_2>");
	xml = xml + '<country_id>' + rawData.countryId + '</country_id>';
	xml = xml + '<state_id>' + rawData.stateId + '</state_id>';
	xml = xml + '<city>' + rawData.city + '</city>';
	xml = xml + '<zip_code>' + rawData.zipCode + '</zip_code>';
	xml = xml + '<phone_number>' + rawData.phoneNumber + '</phone_number>';
	xml = xml + "</address>";
	
	return xml;
}