(function () {
    'use strict';

    console.log("reading JS...");

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

    window.addEventListener("click", function(event) {
        event.preventDefault();
        if (event.target.id == "main") {
            mainImage.className = `state-${event.target.id}`;
            this.setTimeout(unhideSectors, 2000);
        } else {
        mainImage.className = `state-${event.target.id}`;
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