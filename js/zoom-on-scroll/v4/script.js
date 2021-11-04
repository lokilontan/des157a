(function () {
	'use strict';

	const captions = [
		'',
		'1.Tench garpike mooneye halosaur tompot blenny, bluefish, barb, "velvet catfish jellynose fish."',
		'2. Speckled trout California smoothtongue Alaska blackfish bigscale fish mud cat pike characid, horn shark?',
		'3. Silver dollar; African glass catfish pearl perch Asiatic glassfish.',
		'4. Chinook salmon spookfish rudd threadsail, nibbler pikehead sand knifefish buri.',
		'5. Mexican blind cavefish vendace deep sea eel warty angler.',
		'6. Barbeled houndshark, lined sole jewfish, crappie loweye catfish squirrelfish.'];

	let figCaption = document.querySelector('figcaption');

	figCaption.innerHTML = captions[1];

	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}

	window.addEventListener('load', function () {
		const posts = document.querySelectorAll('section');
		let postTops = [];
		let pageTop;
		let counter = 1;
		let prevCounter = 1;
		let doneResizing;
		let exitDirection;
		let enterDirection;

		/* This version adds a preloader screen that shows until all
		the assets for the page have downloaded, including the large
		image. This preloader is a div that covers the entire screen 
		on the HTML file.
		
		The code below removes this div by fading it out, then once
		it has faded out, sets it to display none. */

		const preloader = document.getElementById('preloader');
		preloader.className = 'fadeout';

		// wait until the animation has completed
		preloader.addEventListener('animationend', function () {

			//once the animation is done, remove the preloader div.
			preloader.style.display = 'none';
		});


		resetPagePosition();

		window.addEventListener('scroll', function () {
			pageTop = window.pageYOffset + 300;

			if (pageTop > postTops[counter]) {
				counter++;
				console.log(`scrolling down ${counter}`);
			} else if (counter > 1 && pageTop < postTops[counter - 1]) {
				counter--;
				console.log(`scrolling up ${counter}`);
			}

			if (counter != prevCounter) {
				document.querySelector('figure img').className = 'sect' + counter;
				if (counter > prevCounter) {
					exitDirection = 'animate exitup';
					enterDirection = 'animate enterup';
				}
				else {
					exitDirection = 'animate exitdown';
					enterDirection = 'animate enterdown';
				}

				figCaption.className = exitDirection;
				figCaption.addEventListener('animationend', function () {
					let newCaption = document.querySelector('figcaption').cloneNode(true);
					figCaption.remove();
					newCaption.className = enterDirection;
					newCaption.innerHTML = captions[counter];
					document.querySelector('figure').appendChild(newCaption);
					figCaption = document.querySelector('figcaption');
				});

				prevCounter = counter;
			}

		}); // end window scroll function

		window.addEventListener('resize', function () {
			clearTimeout(doneResizing);
			doneResizing = setTimeout(function () {

				resetPagePosition();

			}, 500);
		});

		function resetPagePosition() {
			postTops = [];
			posts.forEach(function (post) {
				postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
			});

			const pagePosition = window.pageYOffset + 300;
			counter = 0;

			postTops.forEach(function (post) { if (pagePosition > post) { counter++; } });

		}

	}); // end window load function

})();// END IIFE