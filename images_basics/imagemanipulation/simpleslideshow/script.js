(function () {
	'use strict';

	const myImages = ["images/image1.jpg", "images/image2.jpg", "images/image3.jpg", "images/image4.jpg", "images/image5.jpg"];
	let currentImage = 0;

	document.getElementById('next').addEventListener('click', nextPhoto);
	document.getElementById('previous').addEventListener('click', previousPhoto);

	function nextPhoto() {
		currentImage++;

		if (currentImage > myImages.length - 1) { currentImage = 0; }

		document.getElementById('myimage').src = myImages[currentImage];
	}

	function previousPhoto() {
		currentImage--;

		if (currentImage < 0) { currentImage = myImages.length - 1 }

		document.getElementById('myimage').src = myImages[currentImage];
	}
})();

