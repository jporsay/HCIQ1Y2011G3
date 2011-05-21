var security = new ServerManager('Security');
var userData = [];
function logIn(username, password) {
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
		alert($(data).find('error').attr('message'))
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
			alert('Logged out!');
		}
	)
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
	temp.setAttribute('id', 'logoutbutton');
	temp.setAttribute('onClick', 'logOut()');
	temp.setAttribute('class', '');
	temp.innerHTML = 'Logout';
	container.appendChild(temp);
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
	var temp = null;
	var temp2 = null;
	container.innerHTML = null;
	temp = document.createElement('div');
	temp2 = document.createElement('span');
	temp2.innerHTML = 'Username:';
	temp2.setAttribute('id', 'usernametext');
	temp2.setAttribute('class', '');
	temp.appendChild(temp2);
	container.appendChild(temp);
	temp2 = document.createElement('input');
	temp2.setAttribute('type', 'text');
	temp2.setAttribute('id', 'usernameInput');
	temp.appendChild(temp2);
	container.appendChild(temp);
	
	temp = document.createElement('div');
	temp2 = document.createElement('span');
	temp2.innerHTML = 'Password:';
	temp2.setAttribute('id', 'passwordtext');
	temp2.setAttribute('class', '');
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
	temp.setAttribute('class', '');
	temp.innerHTML = 'Create account';
	container.appendChild(temp);
	
	temp = document.createElement('a');
	temp.setAttribute('href', 'recoverInfo.html');
	temp.setAttribute('id', 'forgotdata');
	temp.setAttribute('class', '');
	temp.innerHTML = 'Forgot username or password?';
	container.appendChild(temp);
}
