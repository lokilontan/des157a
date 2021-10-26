(function() {

    'use strict';
    console.log("reading js");

    const myImages = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',]


    let currentImage = 0;
    const slide = document.getElementById("myimage");

    document.getElementById('next').addEventListener('click', nextPhoto);

    document.getElementById('previous').addEventListener('click', previousPhoto);

    function nextPhoto(){
        currentImage++;
        if (currentImage > myImages
            .length-1) {
            currentImage = 0;
        }
        slide.src = `images/${myImages[currentImage]}`;
    }

    function previousPhoto(){
        currentImage--;
        if (currentImage < 0) {
            currentImage = myImages.length-1;
        }
        slide.src = `images/${myImages[currentImage]}`;
    }


}())