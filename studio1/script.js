(function () {
    'use strict';

    console.log("Reading JS...");

    const myForm = document.querySelector("#myform");

    const myArticle = document.querySelector("#madlib");

    let errorText = "";


    myForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = document.querySelectorAll("input[type=text]");

        getData(formData);

    });

    function makeMadlib(tokens) {
        myArticle.textContent = "Here are the words: " + tokens[0] + " " + tokens[1] + " " + tokens[2] + " " + tokens[3];
    }

    function getData(formData) {
        let tokens = [];
        var emptyFields = 0;

        for (var eachField of formData) {
            if (eachField.value) {
                tokens.push(eachField.value);
                eachField.value = "";
            } else {
                emptyFields++
            }
        }
        if (emptyFields>0) {
            myArticle.textContent = 'Please fill out the  fields';
        } else { 
            makeMadlib(tokens);
        }

    }
    const randSize = () =>  Math.floor(Math.random()+1.2);
    const randCol = () => Math.floor(Math.random()*256);


    // innitialize random values to the cubes in logo
    for (let i = 1 ; i <= 10; i++) {
        let cube = document.getElementById(`cube-${i}`);
        cube.style.top = `${Math.floor( Math.random() * (15 - 2) + 2 )}%`;
        cube.style.left = `${Math.floor( Math.random() * (25 - 10) + 10 )}%`;
        cube.style.backgroundColor = `rgb(${randCol()},${randCol()},${randCol()})`;

        const newSize = Math.floor(Math.random() * (60 - 15) + 15);
        cube.style.width = `${newSize}px`;
        cube.style.height = `${newSize}px`;

    }

    function changeProperties(){
        for (let i = 1 ; i <= 10; i++) {
            let cube = document.getElementById(`cube-${i}`);
            const newSize = randSize();
            cube.style.backgroundColor = `rgb(${randCol()},${randCol()},${randCol()})`;
            cube.style.transform = `scale(${newSize}, ${newSize})`;
        }
    }

    setInterval(changeProperties, 9000);

   



}());