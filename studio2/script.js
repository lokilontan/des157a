(function () {
    'use strict';

    console.log("reading JS...");

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

}());