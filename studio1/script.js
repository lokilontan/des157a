(function () {
    'use strict';

    console.log("Reading JS...");

    // ----------------FORM stuff starts here--------------------

    const myForm = document.querySelector("#myform");

    // keep track of the state of the progrss bar [1..6]
    let currentEntry = 1;

    // Initiate the progress bar
    progressBarAt(currentEntry);

    // Initiate UI promts
    setUIAt(currentEntry);

    // focus the input field
    myForm.elements["in"].focus();

    // keep the words entered for the final story
    let wordTokens = [];

    const nextBtn = document.querySelector("input[id=next]");
    const backBtn = document.querySelector("input[id=back]");

    // handles Enter key for input
    myForm.elements["in"].addEventListener("keypress", function (event) {
        event.preventDefault();
        const formData = document.querySelector("input[type=text]");

        if (event.key == "Enter") {
            nextBtn.style.color = "white";
            nextBtn.style.backgroundColor = "rgba(137,190,49,1)";
            nextBtn.style.border = "5px solid rgba(137,190,49,1)";

            getInput();

        } else {
            formData.value += event.key;
        }

    });

    myForm.elements["in"].addEventListener("keyup", function (event) {
        event.preventDefault();
        const formData = document.querySelector("input[type=text]");

        if (event.key == "Enter") {
            nextBtn.style.color = "rgba(137,190,49,1)";
            nextBtn.style.backgroundColor = "white";
            nextBtn.style.border = "5px solid rgba(137,190,49,1)";
        }

    });


    nextBtn.addEventListener("click", function (event) {

        event.preventDefault();
        getInput()

    });

    backBtn.addEventListener("click", function (event) {

        event.preventDefault();
        const formData = document.querySelector("input[type=text]");
        wordTokens[currentEntry - 1] = formData.value;
        hideError();

        if (currentEntry > 1) {

            currentEntry--;
            setUIAt(currentEntry);

        }

        console.log(wordTokens, currentEntry);
        progressBarAt(currentEntry);
        formData.value = wordTokens[currentEntry - 1];
        myForm.elements["in"].focus();

        if (formData.value == "undefined") {
            formData.value = "";
        }

    });

    /**
     * Main input logic
     * Goes inside Enter and nextBtn event listeners
     */
    function getInput() {
        const formData = document.querySelector("input[type=text]");

        if ((formData.value || wordTokens[currentEntry - 1])) {

            hideError();

            if (currentEntry < 7) {

                // if form has a value and database is empty at this location
                if (formData.value && !wordTokens[currentEntry - 1]) {


                    if (currentEntry - 1 == wordTokens.length) {
                        console.log(`Case 1.1`)

                        wordTokens.push(formData.value);
                        formData.value = "";
                    } else {
                        console.log(`Case 1.2`)

                        wordTokens[currentEntry - 1] = formData.value;
                        formData.value = wordTokens[currentEntry];
                    }

                    currentEntry++;
                    if (currentEntry != 7) {
                        setUIAt(currentEntry);
                    } else {
                        submit();
                    }

                    myForm.elements["in"].focus();

                }
                // if form has a value and database has a value at this location
                // override it
                else if (formData.value && wordTokens[currentEntry - 1]) {

                    console.log(`Case 2`)

                    wordTokens[currentEntry - 1] = formData.value;

                    if (wordTokens[currentEntry]) {

                        formData.value = wordTokens[currentEntry];

                    } else {

                        formData.value = "";

                    }

                    currentEntry++;
                    if (currentEntry != 7) {
                        setUIAt(currentEntry);
                    } else {
                        submit();
                    }

                    myForm.elements["in"].focus();

                }
                // if form does not have a value and database has a value at this location
                // insert this value innto the form
                else if (formData.value == "" && wordTokens[currentEntry - 1]) {

                    console.log(`Case 3`)
                    throwError(`Please, fill out the form.`);
                    wordTokens[currentEntry - 1] = "";
                    myForm.elements["in"].focus();

                }
            }

            console.log(wordTokens, currentEntry);

            progressBarAt(currentEntry);

        } else {

            throwError(`Please, fill out the form.`);
            myForm.elements["in"].focus();

        }

        if (formData.value == "undefined") {
            formData.value = "";
        }
    }

    /**
     * Maintains a correct view of the progress bar at a particular state
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

                bar = document.getElementById(`progress-${i}`);
                bar.className = "bar todo";
                bar.textContent = `${i}`;

                if (i != 6) {

                    connect = document.getElementById(`connect-${i}`);
                    connect.className = "connect todo";

                }
            }
        } else if (at == 7) {

            let bar = document.getElementById(`progress-6`);
            bar.className = "bar done";
            bar.textContent = `✓`;
            let connect = document.getElementById(`connect-5`);
            connect.className = "connect done";

        }
    }

    /**
     * Maintains a correct view of the prompt and part of speech
     * @param { Number } at The current entry state
     */
    function setUIAt(at) {

        const prompts = [
            ["Favorite weekday", "noun"],
            ["A synonym of weird", "adjective"],
            ["How would you not name a variable", "noun"],
            ["Related to coding", "noun, plural"],
            ["Synonym of stupid", "adjective"],
            ["Finding something agreeable, enjoyable, or satisfactory", "verb, past tense"]
        ];

        document.getElementById("prompt").textContent = prompts[at - 1][0];
        document.getElementById("part-of-speech").textContent = prompts[at - 1][1];

    }

    // ----------------FORM stuff ends here--------------------


    // ----------------MADLIB stuff starts here----------------

    const tryABtn = document.querySelector("button[id=try-again]");
    const overLay = document.getElementById("overlay");
    let mlStory = "";

    // handles Enter key for starting over after madlibs is desplayed
    // some workaround had to be done so it does not reload right away after madlib is just desplayed
    window.addEventListener("keypress", function (event) {
        event.preventDefault();

        if (event.key == "Enter") {

            console.log(overLay.classList[0], currentEntry);

            if (currentEntry == 7) {

                currentEntry++;

            } else if (currentEntry == 8) {

                window.location.reload();

            }
        }

    });

    /**
     * Inserts the collected words to the madlibs story
     */
    function submit() {
        // insert all words inside the story
        let words = document.querySelectorAll("span");
        console.log(words);
        for (let word of words) {
            for (let i = 1; i <= wordTokens.length; i++) {

                if (word.id == `madlib-${i}`) {

                    word.textContent = wordTokens[i - 1];

                }
            }
        }

        mlStory = document.getElementById("madlib");
        hideUnhide("lay", "overlay");
        //typeWriter();
    }


    // just simply reload the page
    tryABtn.addEventListener("click", function () {
        window.location.reload();
    });

    // ----------------MADLIB stuff ends here--------------------


    // ----------------LOGO stuff starts here--------------------
    const randSize = () => Math.floor(Math.random() + 1.1);
    const randCol = () => Math.floor(Math.random() * 256);

    // innitialize random values to the cubes in logo
    for (let i = 1; i <= 30; i++) {

        let cube = document.getElementById(`cube-${i}`);
        cube.style.top = `${Math.floor(Math.random() * (57 - 20) + 20)}%`;
        cube.style.left = `${Math.floor(Math.random() * (70 - 12) + 12)}%`;
        cube.style.backgroundColor = `rgba(${randCol()},${randCol()},${randCol()},0.9)`;

        const newSize = Math.floor(Math.random() * (80 - 30) + 30);
        cube.style.width = `${newSize}px`;
        cube.style.height = `${newSize}px`;

    }

    /**
     * Function to change background color and size to random values
     * goes over each cube in the logo
     */
    function changeProperties() {

        for (let i = 1; i <= 30; i++) {

            let cube = document.getElementById(`cube-${i}`);
            const newSize = randSize();
            cube.style.backgroundColor = `rgba(${randCol()},${randCol()},${randCol()},0.9)`;
            cube.style.transform = `scale(${newSize}, ${newSize})`;

        }

    }

    // calls the changeProperties funnction each 8 seconds
    setInterval(changeProperties, 5000);

    // ----------------LOGO stuff ends here--------------------


    // ----------------OTHER stuff starts here-----------------

    /**
    * Throws an error message
    * @param { String } errorMessage error message
    */
    function throwError(errorMessage) {

        const errorElement = document.getElementById("error");
        errorElement.className = "showing";
        errorElement.textContent = errorMessage;

    };

    /**
     * Hides the error message
     */
    function hideError() {

        const errorElement = document.getElementById("error");
        errorElement.className = "hidden";

    }

    /**
     * Applies the hidden style to the first parameter
     * and showing style to the second parameter
     * @param { String } toHide hide this 
     * @param { String } toUnHide unhide this 
     */
    function hideUnhide(toHide, toUnHide) {
        document.getElementById(`${toHide}`).className = "hidden";
        document.getElementById(`${toUnHide}`).className = "showing";
    }

    // ----------------OTHER stuff ends here-------------------

}());