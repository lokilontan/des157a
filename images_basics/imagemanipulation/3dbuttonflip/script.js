(function () {
	'use strict';
	const button = document.querySelector('.cube');
	const heartsDiv = document.getElementById('hearts');
	const textField = document.getElementById('amount');
	const defaultButtonText = document.querySelector('.default-state span');
	const defaultButton = document.querySelector('.default-state');

	button.addEventListener('click', function () {

		if (textField.value != '') {
			this.className += ' flip';

			setTimeout(function () {

				heartsDiv.innerHTML = "<img src='images/hearts.gif'>";

			}, 300);
		}
		else {
			defaultButtonText.innerHTML = "Please Enter an Amount";
			defaultButton.setAttribute('style', 'background-color: rgba(205,0,4,1.00)');
			setTimeout(function () {
				defaultButtonText.innerHTML = "donate";
				defaultButton.removeAttribute('style');
			}, 2000);
		}

	});

})();
