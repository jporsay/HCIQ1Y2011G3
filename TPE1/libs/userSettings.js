var addressList = [];
function getAddressListCallback(data) {
	var addressList = createAddressArray(data);
	fillSelect(addressList);
}

function createAddressArray(data) {
	var source = $(data);
	var addresses = [];
	var i = 0;
	source.find('address').each(function() {
		
		var address = [];
		address['id'] = $(this).attr('id');
		address['name'] = $(this).find('full_name').text();
		address['addressLineOne'] = $(this).find('address_line_1').text();
		address['addressLineTwo'] = $(this).find('address_line_2').text();
		address['countryId'] = $(this).find('country_id').text();
		address['stateId'] = $(this).find('state_id').text();
		address['city'] = $(this).find('city').text();
		address['zipCode'] = $(this).find('zip_code').text();
		address['phoneNumber'] = $(this).find('phone_number').text();
		
		addresses[i] = address;
		i++;
	});
	return addresses;
}

function fillSelect(data) {
	$('#AddressSelect').empty();
	var first = true;
	for (var i = 0; i < data.length; i++) {
		var opt = document.createElement('option');
		opt.setAttribute('val', data[i].id);
		$(opt).html(data[i].name);
		if (first) {
			opt.setAttribute('selected', 'selected');
		}
		$('#AddressSelect').append(opt);
	}
}
