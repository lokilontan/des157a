(function () {
    'use strict';

    console.log("reading JS...");

    // PRELOADER
    const preloader = document.getElementById('preloader');
	preloader.className = 'fadeout';

	// wait until the animation has completed
	preloader.addEventListener('load', function () {

	//once the animation is done, remove the preloader div.
		preloader.style.display = 'none';
	});
    // PRELOADER END

    // BUTTON

    const button3D = document.getElementById("btn-3d");
    let button3DStatus = "inactive";
    button3D.addEventListener("click", function(event) {
        event.preventDefault();
        if (button3DStatus == "inactive") {
            button3D.className = "btn active";
            button3DStatus = "active";
        } else {
            button3D.className = "btn inactive";
            button3DStatus = "inactive";
        }
    });

    // BUTTON END

    let mainImage = document.getElementById("main");
    let fade = document.querySelector("figure div");
    console.log(fade);

    window.addEventListener("click", function(event) {
        event.preventDefault();
        if (event.target.id == "fade") {
            mainImage.className = `state-main`;
            fade.className = `fade nofade`;
            console.log(event.target.id);
            this.setTimeout(unhideSectors, 2000);
        } else {
            mainImage.className = `state-${event.target.id}`;
            fade.className = `fade ${event.target.id}`;
            console.log(event.target.id);

            hideSectors();
        }
    });

    function unhideSectors() {
        const sectors = document.getElementsByClassName("sect");
        for (let sector of sectors) {
            sector.style.setProperty("visibility", "visible");
        }
    }

    function hideSectors() {
        const sectors = document.getElementsByClassName("sect");
        for (let sector of sectors) {
            sector.style.setProperty("visibility", "hidden");
        }
    }

}());