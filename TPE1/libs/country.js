var common = new ServerManager('Common');
var translator = new i18n();

function getCountries(langId) {
	common.get(
		{
			method: 'GetCountryList',
			language_id: langId
		},
		function(data) {
			var first = true;
			var opt = null;
			var innerHolder = document.createElement('select');
			$(data).find('country').each(
				function() {
					opt = document.createElement('option');
					opt.setAttribute('id', $(this).attr('id'));
					opt.setAttribute('value', $(this).attr('id'));
					$(opt).html($(this).find('name').text());
					if (first) {
						opt.setAttribute('selected', 'selected');
						first = false;
					}
					innerHolder.appendChild(opt);
				}
			);
			//Countries and States for New Address
			var holder = document.getElementById('countryDivNA');
			innerHolder.setAttribute('id', 'countryIdNA');
			holder.appendChild(innerHolder);
			getStates($(innerHolder).val(), langId, 'NA');
			$('#countryIdNA').change(function() {
				getStates($(this).val(), langId, 'NA');
			});
			//Countries for Modify Address
			var innerHolder2 = innerHolder.cloneNode(true);
			holder = document.getElementById('countryDivMA');
			innerHolder2.setAttribute('id', 'countryIdMA');
			holder.appendChild(innerHolder2);
			getStates($(innerHolder2).val(), langId, 'MA');
			$('#countryIdMA').change(function() {
				getStates($(this).val(), langId, 'MA');
			});
			
		}
	);
}


function getStates(countryId, langId, location) {
	common.get(
		{
			method: 'GetStateList',
			language_id: langId,
			country_id: countryId
		},
		function(data) {
			fillStates(data, location);
		}
	);
}

function fillStates(data, location) {
	if (document.getElementById('stateId' + location)) {
		var holder = document.getElementById('stateDiv' + location);
		holder.removeChild(holder.lastChild);
	}
	var holder = document.getElementById('stateDiv' + location);
	var innerHolder = document.createElement('select');
	innerHolder.setAttribute('id', 'stateId' + location);
	var first = true;
	var option = null;
	$(data).find('state').each(
		function() {
			opt = document.createElement('option');
			opt.setAttribute('id', $(this).attr('id'));
			opt.setAttribute('value', $(this).attr('id'));
			$(opt).html($(this).find('name').text());
			if (first) {
				opt.setAttribute('selected', 'selected');
				first = false;
			}
			innerHolder.appendChild(opt);
		}
	);
	holder.appendChild(innerHolder);
}
