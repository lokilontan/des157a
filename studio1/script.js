(function () {
    'use strict';

    console.log("Reading JS...");

    // ----------------FORM stuff starts here--------------------

    const myForm = document.querySelector("#myform");

    let errorText = "";

    // keep track of the state of the progrss bar [1..6]
    let currentEntry = 1;
    progressBarAt(1);

    // keep the words entered for the final story
    let wordTokens = [];

    const nextBtn = document.querySelector("input[id=next]");
    const backBtn = document.querySelector("input[id=back]");

    nextBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const formData = document.querySelector("input[type=text]");

        if (currentEntry < 7) {
            currentEntry++;
        }
        progressBarAt(currentEntry);

        fromData

    });

    backBtn.addEventListener("click", function (event) {

        event.preventDefault();

        const formData = document.querySelector("input[type=text]");
        if (currentEntry > 1) {
            currentEntry--;
        }
        progressBarAt(currentEntry);

    });

    /**
     * Maintaince a correct view of the progress bar at a particular state
     * @param { Number } at The current entry state
     */
    function progressBarAt(at) {

        if (at <= 6) {
            for (let i = 1; i < at; i++) {
                let bar = document.getElementById(`progress-${i}`);
                bar.className = "bar done";
                bar.textContent = `✓`;
                let connect = document.getElementById(`connect-${i}`);
                if ((at - 1) == i) {
                    connect.className = "connect current";
                } else {
                    connect.className = "connect done";
                }
            }

            let bar = document.getElementById(`progress-${at}`);
            bar.className = "bar current";
            bar.textContent = `${at}`;
            let connect = null;
            if (at != 6) {
                connect = document.getElementById(`connect-${at}`);
                connect.className = "connect todo";
            }

            for (let i = at + 1; i <= 6; i++) {
                if (i != 6) {
                    bar = document.getElementById(`progress-${i}`);
                    bar.className = "bar todo";
                    bar.textContent = `${i}`;
                    connect = document.getElementById(`connect-${i}`);
                    connect.className = "connect todo";
                } else {
                    bar = document.getElementById(`progress-${i}`);
                    bar.className = "bar todo";
                }
            }
        } else if ( at==7 ) {
            let bar = document.getElementById(`progress-6`);
            bar.className = "bar done";
            bar.textContent = `✓`;
            let connect = document.getElementById(`connect-5`);
            connect.className = "connect done";
        }
    }

    // myForm.addEventListener("submit", function (event) {
    //     event.preventDefault();

    //     const formData = document.querySelector("input[type=text]");

    //     console.log(formData.value);
    //     // getData(formData);

    // });


    // ----------------FORM stuff ends here--------------------

    // ----------------MADLIB stuff starts here----------------

    const myArticle = document.querySelector("#madlib");



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
        if (emptyFields > 0) {
            myArticle.textContent = 'Please fill out the  fields';
        } else {
            makeMadlib(tokens);
        }

    }

    // ----------------MADLIB stuff ends here--------------------


    // ----------------LOGO stuff starts here--------------------
    const randSize = () => Math.floor(Math.random() + 1.1);
    const randCol = () => Math.floor(Math.random() * 256);

    // innitialize random values to the cubes in logo
    for (let i = 1; i <= 10; i++) {
        let cube = document.getElementById(`cube-${i}`);
        cube.style.top = `${Math.floor(Math.random() * (43 - 19) + 19)}%`;
        cube.style.left = `${Math.floor(Math.random() * (52 - 35) + 35)}%`;
        cube.style.backgroundColor = `rgba(${randCol()},${randCol()},${randCol()},0.8)`;

        const newSize = Math.floor(Math.random() * (50 - 15) + 15);
        cube.style.width = `${newSize}px`;
        cube.style.height = `${newSize}px`;

    }

    // function to change background color and size to random values
    // goes over each cube in the logo
    function changeProperties() {
        for (let i = 1; i <= 10; i++) {
            let cube = document.getElementById(`cube-${i}`);
            const newSize = randSize();
            cube.style.backgroundColor = `rgba(${randCol()},${randCol()},${randCol()},0.8)`;
            cube.style.transform = `scale(${newSize}, ${newSize})`;
        }
    }

    // calls the changeProperties funnction each 8 seconds
    setInterval(changeProperties, 5000);

    // ----------------LOGO stuff ends here--------------------

}());