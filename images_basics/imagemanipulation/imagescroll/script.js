window.addEventListener('load', function () {
    'use strict'

    let sliderContent;
    let sliderWidth;
    let fullSlider = document.querySelector('body');
    const clonedSlider = fullSlider.innerHTML;

    function animateSlider() {
        sliderContent = document.querySelector('.a');
        sliderWidth = sliderContent.offsetWidth;
        const cloned = sliderContent.cloneNode(true);
        cloned.className = "b";
        document.querySelector('#slider').appendChild(cloned);
        document.querySelector('#slider').style.left = `-${sliderWidth}px`;
        repeatAnimation();
    }

    animateSlider();
    function repeatAnimation() {
        fullSlider.addEventListener("transitionend", function () {
            console.log('going around again!');
            document.querySelector('body').innerHTML = clonedSlider;
            fullSlider = document.querySelector('#slider');
            animateSlider();
        });
    }
});