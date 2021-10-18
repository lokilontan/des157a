(function () {
    'use strict';
    console.log('Reading JS...');
    
    const btn = document.querySelector("button");

    btn.addEventListener("click", function () {
        for (const paragraph of document.querySelectorAll("p")) {
            paragraph.style.color = "green";
        }
    })
}()
)