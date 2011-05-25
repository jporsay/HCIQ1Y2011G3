function initialize() {
	var latitude = urlParam('lat');
	var longitude = urlParam('long');
	var position = new google.maps.LatLng(latitude, longitude);
	var myOptions = {
		zoom: 15,
		center: position,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"),
		myOptions);
	var marker = new google.maps.Marker({
		position: position, 
		map: map,
		title:"Your order"
	});
}
