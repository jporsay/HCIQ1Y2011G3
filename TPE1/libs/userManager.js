var security = new ServerManager('Security');

function createUser(rawData) {
	var processedData = processData(rawData);
	var nuXML = buildNewUserXML(processedData);
	alert('asd');
	security.post({
		method: 'CreateAccount',
		account: nuXML
	},
		successPost,
		errorPost
	);
}

function successPost(data) {
	alert($(data).find('response').attr('status'));
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
	var temp = null
	var account = document.createElement('account');
	//add username
	temp = document.createElement('username');
	temp.innerHTML = rawData.username;
	account.appendChild(temp);
	
	temp = document.createElement('name');
	temp.innerHTML = rawData.name;
	account.appendChild(temp);
	
	temp = document.createElement('password');
	temp.innerHTML = rawData.password;
	account.appendChild(temp);
	
	temp = document.createElement('birth_date');
	temp.innerHTML = rawData.birthDate;
	account.appendChild(temp);
	
	return account;
}
