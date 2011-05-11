function setCookie(name, cookie_value, expiration_days) {
	var expiration_date = new Date();
	expiration_date.setDate(expiration_date.getDate() + expiration_days);
	var value = escape(cookie_value) + ((expiration_days == null) ? "" : "; expires="+expiration_date.toUTCString());
	document.cookie = name + "=" + value;
}

function getCookie(name) {
	var cookies = document.cookie.split(";");
	var c_name, c_val;
	for (var i = 0; i < cookies.length; i++)
	{
		c_name = cookies[i].substr(0,cookies[i].indexOf("="));
		c_val = cookies[i].substr(cookies[i].indexOf("=")+1);
		c_name = c_name.replace(/^\s+|\s+$/g,"");
		if (c_name == name)
		{
			return unescape(c_val);
		}
	}
}
