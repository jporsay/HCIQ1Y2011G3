var addressList;
function getAddressListCallback(data) {
	addressList = createAddressArray(data);
	fillSelect(addressList[0]);
}

function getAddressListCallbackNoFill(data) {
	addressList = createAddressArray(data);
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
	return [addresses, addresses.length];
}

function fillSelect(data) {
	$('#AddressSelect').empty();
	var opt = document.createElement('option');
	opt.setAttribute('value', '');
	opt.setAttribute('selected', 'selected');
	$(opt).html('------');
	$('#AddressSelect').append(opt);
	for (var i = 0; i < data.length; i++) {
		opt = document.createElement('option');
		opt.setAttribute('value', data[i].id);
		opt.setAttribute('id', data[i].id);
		$(opt).html(data[i].name);
		$('#AddressSelect').append(opt);
	}
	if (typeof fillStates == 'function') {
		$('#AddressSelect').change(function() {
			var val = $(this).attr('value');
			if (val !== 'null') {
				loadAddress($(this).val());
			}
		});
	}
}
var common = new ServerManager('Common');
function loadAddress(value) {
	for (var index = 0; index < addressList[1]; index++) {
		if (addressList[0][index].id === value) {
			break;
		}
	}
	var address = addressList[0][index];
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
var order = new ServerManager('Order');
function updateExistingAddress() {
	var userdata = getLoggedData();
	if (!userdata) {
		alert('You need to be logged in to do this action');
		return;
	}
	var data = [];
	var id = $('#AddressSelect').val();
	if (id === '') {
		showStatusMessage('updateAddressStatus', getTranslation('selectAValidAddress'));
		return;
	}
	data.fullName = $('#' + $('#AddressSelect').val()).html();
	data.addressLineOne = $('#maAddress1').val();
	data.addressLineTwo = $('#maAddress2').val();
	data.countryId = $('#countryIdMA').val();
	data.stateId = $('#stateIdMA').val();
	data.city = $('#maCity').val();
	data.zipCode = $('#maZipCode').val();
	data.phoneNumber = $('#maPhoneNumber').val();
	var xml = buildNewAddressXML(data, id);
	order.post(
		{
			method: 'UpdateAddress',
			username: userdata['userName'],
			authentication_token: userdata['token'],
			address: xml
		},
		function(data) {
			var status = $(data).find('response').attr('status');
			if (status === 'ok') {
				showStatusMessage('updateAddressStatus', getTranslation('addressChanged'));
				getAddressList(getAddressListCallbackNoFill);
			} else {
				showStatusMessage('updateAddressStatus', getTranslation('settingsError'));
			}
		}
	);
}

function showStatusMessage(elementId, message) {
	var element = '#' + elementId;
	$(element).html('').show();
	$(element).html(message).delay(2000).fadeOut(500);
}
