var common = new ServerManager('Common');
var translator = new i18n();

function getCountries(langId) {
	common.get(
		{
			method: 'GetCountryList',
			language_id: langId
		},
		function(data) {
			var innerHolder = document.createElement('select');
			innerHolder.setAttribute('id', 'countryId');
			var first = true;
			var opt = null;
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
			var holder = document.getElementById('countryDiv');
			holder.appendChild(innerHolder);
			getStates($(innerHolder).val(), langId);
			$(innerHolder).change(function() {
				getStates($(this).val(), langId);
			});
		}
	);
}


function getStates(countryId, langId) {
	if (document.getElementById('stateId')) {
		var holder = document.getElementById('stateDiv');
		holder.removeChild(holder.lastChild);
	}
	common.get(
		{
			method: 'GetStateList',
			language_id: langId,
			country_id: countryId
		},
		function(data) {
			var holder = document.getElementById('stateDiv');
			var innerHolder = document.createElement('select');
			innerHolder.setAttribute('id', 'stateId');
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
	);
}
