(function () {
    'use strict';

    console.log("reading JS...");

    let mainImage = document.getElementById("main");
    let icons = document.querySelector(".icons")

    // PRELOADER
    const preloader = document.getElementById('preloader');
    document.onreadystatechange = function () {
        var state = document.readyState
        if (state == 'complete') {
            document.getElementById('interactive');
            preloader.className = 'fadeout';
            document.getElementById('dimmed').className = "showing";
            startHeaderAnimation();
        }
    }
    // wait until the animation has completed
    preloader.addEventListener('animationend', function () {
        //once the animation is done, remove the preloader div.
        preloader.style.display = 'none';
    });
    // PRELOADER END

    // ICONS START

    let questionIcon = document.getElementById("question");
    let buyIcon = document.getElementById("dollar");
    let hints = document.querySelectorAll('.hint');
    let infoOverlay = document.getElementById('info');
    let buyOverlay = document.getElementById('buy');



    questionIcon.addEventListener("click", function () {
        if (questionIcon.classList.contains("active-icon")) {
            questionIcon.className = "";
            infoOverlay.className = "helper-overlay hide-helper";
        }
        else {
            questionIcon.className = "active-icon";
            showHints(hints);
            infoOverlay.className = "helper-overlay show-helper";
        }
        if (buyIcon.classList.contains("active-icon")) {
            buyIcon.className = "";
            buyOverlay.className = "helper-overlay hide-helper";
            infoOverlay.className = "helper-overlay show-helper";
        }

    });

    questionIcon.addEventListener("mouseover", function () {
        showHints(hints);
    });

    questionIcon.addEventListener("mouseout", function () {
        if (!questionIcon.classList.contains("active-icon")) {
            hideHints(hints);
        }
    });

    buyIcon.addEventListener("click", function () {
        if (buyIcon.classList.contains("active-icon")) {
            buyIcon.className = "";
            buyOverlay.className = "helper-overlay hide-helper";
        }
        else {
            buyIcon.className = "active-icon";
            buyOverlay.className = "helper-overlay show-helper";
        }
        if (questionIcon.classList.contains("active-icon")) {
            questionIcon.className = "";
            hideHints(hints);
            infoOverlay.className = "helper-overlay hide-helper";
            buyOverlay.className = "helper-overlay show-helper";
        }
            
    });

    function showHints(hints) {
        for (let hint of hints) {
            hint.className="hint showing";
        }
        
    }

    function hideHints(hints) {
        for (let hint of hints) {
            hint.className="hint hidden-fast";
        }
    }


    // ICONS END

    // STARTING ANIMATION START
    function startHeaderAnimation() {
        let headerBackground = document.getElementById('dimmed')
        const timeout = 3000;
        const headers = ['STREET SCRAMBLER', 'BEAUTIFUL', 'FAST', 'RELIABLE'];
        let headerContainer = document.getElementById('heading');
        mainImage.className = `state-heading`;
        icons.style.visibility = "hidden";
        for (const i in headers) {
            // show
            setTimeout(function () {
                headerContainer.className = "showing";
                headerContainer.textContent = `${headers[i]}`;
                setTimeout(function () {
                    headerContainer.className = "hidden"
                }, timeout / 2);
            }, timeout * i);
            //hide
            setTimeout(function () {
                headerBackground.className = "hidden";
                mainImage.className = `state-main`;
                icons.style.visibility = "visible";
            }, (headers.length) * timeout);
        }
        headerBackground.addEventListener("click", function () {
            headerBackground.className = "hidden";
            headerContainer.className = "hidden"
            icons.style.visibility = "visible";
            mainImage.className = `state-main`;
        });
    }
    // STARTING ANIMATION END

    let fade = document.getElementById("fade");
    var currentArticle = "";

    window.addEventListener("click", function (event) {
        event.preventDefault();
        if (event.target.id == "fade") {
            mainImage.className = `state-main`;
            fade.className = `fade nofade`;
            articleOut();
            this.setTimeout(unhideSectors, 2000);
        } else if (event.target.className == "sect") {
            if (questionIcon.classList.contains("active-icon")) {
                hideHints(hints);
                infoOverlay.className = "helper-overlay hide-helper";
            }
            if (buyIcon.classList.contains("active-icon")) {
                buyOverlay.className = "helper-overlay hide-helper";
            }
            questionIcon.className = "";
            buyIcon.className = "";
            mainImage.className = `state-${event.target.id}`;
            fade.className = `fade ${event.target.id}`;
            icons.style.visibility = "hidden";
            articleIn(event.target.id);
            hideSectors();
        }
    });

    function articleIn(articleSection) {
        currentArticle = `${articleSection}`
        let article = document.getElementById(`article-${currentArticle}`);
        article.className = `overlay showing enter-${articleSection}`;
    }

    function articleOut() {
        if (currentArticle) {
            let article = document.getElementById(`article-${currentArticle}`);
            article.className = `overlay hidden exit-${currentArticle}`;
        }
    }

    function unhideSectors() {
        icons.style.visibility = `visible`;
        const sectors = document.getElementsByClassName("sect");
        for (let sector of sectors) {
            sector.style.setProperty("visibility", "visible");
        }
    }

    function hideSectors() {
        const sectors = document.getElementsByClassName("sect");
        for (let sector of sectors) {
            sector.style.setProperty("visibility", "hidden");
        }
    }

}());