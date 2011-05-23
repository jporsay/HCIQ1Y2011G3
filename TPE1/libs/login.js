var security = new ServerManager('Security');
var userData = [];
function logIn(username, password) {
	$('.errorContainer').css('display', 'none');
	security.post(
		{
			method: 'SignIn',
			username: username,
			password: password
		},
		logInCallback
	)
}

function logInCallback(data) {
	var response = $(data).find('response');
	if (response.attr('status') == 'fail') {
		$('.errorContainer').css('display', 'block');
	} else {
		userData['token'] = $(data).find('token').text();
		var user = $(data).find('user');
		userData['userName'] = user.attr('username');
		userData['name'] = user.attr('name');
		
		$.cookie('loggedUser', null);
		$.cookie('loggedUser', userData['name'] + ':' + userData['userName'] + ':' + userData['token']);
		setLoggedForm(document.getElementsByClassName('loginform')[0]);
	}
}

function logOut() {
	security.post(
		{
			method: 'SignOut',
			username: userData['userName'],
			token: userData['token']
		},
		function(data) {
			$.cookie('loggedUser', null);
			setGuestForm(document.getElementsByClassName('loginform')[0]);
		}
	)
}

function isLogged() {
	return $.cookie('loggedUser') ? true : false;
}

function getLoggedData() {
	if (!isLogged()) {
		return null;
	}
	
	return userData;
}

function loadUserSesion() {
	var cookieData = $.cookie('loggedUser');
	var container = document.getElementsByClassName('loginform')[0];

	if (cookieData) {
		var data = cookieData.split(':');
		userData['name'] = data[0];
		userData['userName'] = data[1];
		userData['token'] = data[2];
		setLoggedForm(container);
	} else {
		setGuestForm(container);
	}
}
/*
<div class="loginform">
	<a href="userSettings.html" id='userSettings'>Settings</a>
	<a href="orderTracking.html" id='orderTracking'>Orders</a>
	<button type="button" id=logoutbutton class="">Logout</button>
</div>
 */
function setLoggedForm(container) {
	$(container).addClass('loggedUser');
	var loginText = document.getElementById('logintext');
	loginText.innerHTML = userData['userName'];
	loginText.setAttribute('class', '');
	container.innerHTML = null;
	var temp = document.createElement('a');
	temp.setAttribute('href', 'userSettings.html');
	temp.setAttribute('id', 'userSettings');
	temp.setAttribute('class', '');
	temp.innerHTML = 'Settings';
	container.appendChild(temp);
	
	temp = document.createElement('a');
	temp.setAttribute('href', 'orderTracking.html');
	temp.setAttribute('id', 'orderTracking');
	temp.setAttribute('class', '');
	temp.innerHTML = 'Orders';
	container.appendChild(temp);
	
	temp = document.createElement('button');
	temp.setAttribute('type', 'button');
	temp.setAttribute('id', 'logoutButton');
	temp.setAttribute('onClick', 'logOut()');
	temp.setAttribute('class', '');
	temp.innerHTML = 'Logout';
	container.appendChild(temp);
	
	var translator = new i18n();
	translator.translatePage();
}

/*
<div class="loginform">
	<div>
		<span id="usernametext" class="">Username:</span>
		<input type="text">
	</div>
	<div>
		<span id="passwordtext" class="">Password</span>
		<input type="password">
	</div>
	<button type="button" id="loginbutton" class="">Login</button>
	<a href="registration.html" id="createaccount">Create account</a>
	<a href="recoverInfo.html" id="forgotdata">Forgot username or password?</a>
</div>
*/
function setGuestForm(container) {
	$(container).removeClass('loggedUser');
	var temp = null;
	var temp2 = null;
	container.innerHTML = null;
	temp = document.createElement('div');
	temp2 = document.createElement('span');
	temp2.setAttribute('id', 'usernameText');
	temp2.setAttribute('class', 'i18n');
	temp.appendChild(temp2);
	container.appendChild(temp);
	temp2 = document.createElement('input');
	temp2.setAttribute('type', 'text');
	temp2.setAttribute('id', 'usernameInput');
	temp.appendChild(temp2);
	container.appendChild(temp);
	
	temp = document.createElement('div');
	temp2 = document.createElement('span');
	temp2.setAttribute('id', 'passwordText');
	temp2.setAttribute('class', 'i18n');
	temp.appendChild(temp2);
	temp2 = document.createElement('input');
	temp2.setAttribute('id', 'passwordInput');
	temp2.setAttribute('type', 'password');
	temp.appendChild(temp2);
	container.appendChild(temp);
	
	
	temp = document.createElement('button');
	temp.setAttribute('type', 'button');
	temp.setAttribute('id', 'loginbutton');
	temp.setAttribute('class', '');
	temp.innerHTML = 'Login';
	container.appendChild(temp);
	
	temp = document.createElement('a');
	temp.setAttribute('href', 'registration.html');
	temp.setAttribute('id', 'createaccount');
	temp.setAttribute('class', 'i18n');
	container.appendChild(temp);
	
	temp = document.createElement('div');
	temp.setAttribute('class', 'i18n errorContainer');
	temp.setAttribute('id', 'errorContainer');
	container.appendChild(temp);

	var loginText = document.getElementById('logintext');
	loginText.setAttribute('class', 'i18n');
	
	var translator = new i18n();
	translator.translatePage();
}
