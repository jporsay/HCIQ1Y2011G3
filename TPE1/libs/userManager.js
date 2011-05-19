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
