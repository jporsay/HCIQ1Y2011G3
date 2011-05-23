var security = new ServerManager('Security');

function createUser(rawData) {
	var processedData = processData(rawData);
	var nuXML = buildNewUserXML(processedData);
	security.post({
		method: 'CreateAccount',
		account: nuXML
	},
		successPost,
		errorPost
	);
}



function successPost(data) {
	var status = $(data).find('response').attr('status');
	if (status === 'fail') {
		alert($(data).find('error').attr('message'));
	} else {
		alert('Account created successfully');
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
	)
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

function buildNewUserXML(rawData) {
	var xml = "<account>";
	xml = xml + "<username>" + rawData.username + "</username>";
	xml = xml + "<name>" + rawData.name + "</name>";
	xml = xml + "<password>" + rawData.password + "</password>";
	xml = xml + "<birth_date>" + rawData.birthDate + "</birth_date>";
	xml = xml + "<email>" + rawData.email + "</email>";
	xml = xml + "</account>";
	return xml;
}
