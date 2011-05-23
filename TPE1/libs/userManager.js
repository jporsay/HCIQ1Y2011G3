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
			successPost(data, 'Account');
		},
		errorPost
	);
}

function getUserData() {
	var userData = getLoggedData();
	if (!userData) {
		alert('You need to be logged in to do this action');
		return;
	}
	security.get(
		{
			method: 'GetAccount',
			username: userData['userName'],
			token: userData['token']
		},
		fillUserData
	);
}

function fillUserData(data) {
	
}

function updateUserData(rawData) {
	var userData = getLoggedData();
	if (!userData) {
		alert('You need to be logged in to do this action');
		return;
	}
	var processedData = processData(rawData);
	var ouXML = buildUserXML(processedData, false);
	security.post(
		{
			method: 'UpdateAccount',
			username: userdata['userName'],
			token: userdata['token'],
			account: ouXML
		},
		function(data) {
			var status = $(data).find('response').attr('status');
			if (status === 'fail') {
				alert('Something went apocalyptically wrong')
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
			password: oldPassword,
			new_password: newPassword,
			username: userData['username']
		},
		function(data) {
			var status = $(data).find('response').attr('status');
			if (status === 'fail') {
				alert($(data).find('error').attr('message'));x
			}
		}
	);
}

function createAddress(rawData) {
	var userdata = getLoggedData();
	if (!userdata) {
		alert('You need to be logged in to do this action');
		return;
	}
	var processedData = processData(rawData);
	var naXML = buildNewAddressXML(processedData);
	security.post(
		{
			method: 'CreateAddress',
			address: naXML,
			username: userdata['userName'],
			token: userdata['token']
		},
		function(data) {
			successPost(data, 'Address');
		}
	);
}

function successPost(data, where) {
	var status = $(data).find('response').attr('status');
	if (status === 'fail') {
		$('.errorContainer').css('display', 'block');
	} else {
		alert(where + 'created successfully');
	}
}

function errorPost(data) {
	alert('pepe' + $(data).find('response').attr('status'));
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

function buildNewAddressXML(rawData) {
	var xml = "<address>";
	xml = xml + "<address_line_1>" + rawData.addressLineOne + "</address_line_1>";
	xml = xml + rawData.addressLineTwo == "" ? "<address_line_2/>" : "<address_line_2>" + rawData.addressLineTwo + "</address_line_2>";
	xml = xml + '<country_id>' + rawData.countryId + '</country_id>';
	xml = xml + '<state_id>' + rawData.stateId + '</state_id>';
	xml = xml + '<city>' + rawData.city + '</city>';
	xml = xml + '<zip_code>' + rawData.zipCode + '</zip_code>';
	xml = xml + '<phone_number>' + rawData.phoneNumber + '</phone_number>';
	xml = xml + "</address>";
	
	return xml;
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
