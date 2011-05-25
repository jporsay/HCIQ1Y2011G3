var addressList;
function getAddressListCallback(data) {
	addressList = createAddressArray(data);
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
	console.log(data);
	$('#AddressSelect').empty();
	var opt = document.createElement('option');
	opt.setAttribute('value', 'null');
	opt.setAttribute('selected', 'selected');
	$(opt).html('------');
	$('#AddressSelect').append(opt);
	for (var i = 0; i < data.length; i++) {
		opt = document.createElement('option');
		opt.setAttribute('value', data[i].id);
		$(opt).html(data[i].name);
		$('#AddressSelect').append(opt);
	}
	
	$('#AddressSelect').change(function() {
		var val = $(this).attr('value');
		if (val !== 'null') {
			loadAddress($(this).val());
		}
	});
}
var common = new ServerManager('Common');
function loadAddress(value) {
	var index;
	for (index = 0; index < addressList.lenght; index++) {
		if (addressList[index].id = value) {
			break;
		}
	}
	var address = addressList[index];
	$('#maAddress1').val(address.addressLineOne);
	$('#maAddress2').val(address.addressLineTwo);
	$('#countryIdMA').val(address.countryId);
	common.get(
		{
			method: 'GetStateList',
			language_id: $('#locale :selected').attr('id'),
			country_id: address.countryId
		},
		function(data) {
			fillStates(data, 'MA');
			$('#stateIdMA').val(address.stateId);
		}
	);
	$('#maCity').val(address.city);
	$('#maZipCode').val(address.zipCode);
	$('#maPhoneNumber').val(address.phoneNumber);
}
