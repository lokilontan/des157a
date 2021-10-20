(function () {

    'use strict';

    console.log("Reading JS");

    const openButons = document.querySelectorAll('.open');
    const closeButons = document.querySelectorAll('.close');

    for (const button of openButons) {
        button.addEventListener('click', function(event){
            event.preventDefault;
            const thisBtn = event.target.id;
            document.getElementById(`ol-${thisBtn}`).className = "overlay showing";
        })
    }

    for (const button of closeButons) {
        button.addEventListener('click', function(event){
            event.preventDefault;
            document.querySelector(`.showing`).className = "overlay hidden";
        })
    } 

    document.addEventListener("keydown", function(event){
        if (event.key === "Escape") {
            document.querySelector('.showing').className = "overlay hidden";
        }
    })

})();