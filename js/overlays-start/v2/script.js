(function () {

    'use strict';

    console.log("Reading JS");
    document.querySelector(".open").addEventListener("click", function(event){
        event.preventDefault();
        document.getElementById('overlay').className = "showing";
    })

    document.querySelector(".close").addEventListener("click", function(event){
        event.preventDefault();
        document.getElementById('overlay').className = "hidden";
    })

    document.addEventListener("keydown", function(event){
        if (event.key === "Escape") {
            document.getElementById('overlay').className = "hidden";
        }
    })
    // add script here

})();