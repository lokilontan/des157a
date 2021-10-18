(function () {
    'use strict';

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


}());