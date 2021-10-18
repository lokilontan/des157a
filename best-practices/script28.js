(function () {
    'use strict';
    console.log("Reading JS...");
    
    const divTag = document.querySelector("div");

    divTag.addEventListener("mouseover", function () {

        divTag.className = "big";

    })

    divTag.addEventListener("mouseout", function () {

        divTag.className = "div";

    })

}())