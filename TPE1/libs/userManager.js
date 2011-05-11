var security = new ServerManager('Security');

function createUser(rawData) {
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
