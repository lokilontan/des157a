(function() {

    'use strict';
    console.log("reading js");

    const myImages = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',]


    let currentImage = 0;
    const slide = document.getElementById("myimage");

    const myInterval = setInterval(nextPhoto, 2000);

    slide.addEventListener('mouseover', function(event){
        clearInterval(myInterval);
    });
    
    slide.addEventListener('mouseout', function(event) {
        myInterval = setInterval(nextPhoto, 2000);
    });
    

    function nextPhoto(){
        currentImage++;
        if (currentImage > myImages
            .length-1) {
            currentImage = 0;
        }
        slide.src = `images/${myImages[currentImage]}`;
    }

}())