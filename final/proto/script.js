(function () {
    'use strict';

    console.log("reading JS...");

    let mainImage = document.getElementById("main");

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

    // STARTING ANIMATION START
    function startHeaderAnimation() {
        let headerBackground= document.getElementById('dimmed')
        const timeout = 3000;
        const headers = ['STREET SCRAMBLER', 'BEAUTIFUL', 'FAST', 'RELIABLE'];
        let headerContainer = document.getElementById('heading');
        mainImage.className =`state-heading`;
        for (const i in headers) {
            // show
            setTimeout(function () {
                headerContainer.className = "showing";
                headerContainer.textContent = `${headers[i]}`;
                setTimeout(function() {
                    headerContainer.className = "hidden"
                }, timeout/2);
            }, timeout * i);
            //hide
            setTimeout(function() {
                headerBackground.className = "hidden";
                mainImage.className = `state-main`;
            }, (headers.length) * timeout);
        }
        headerBackground.addEventListener("click", function(){
            headerBackground.className = "hidden";
            headerContainer.className = "hidden"
            mainImage.className = `state-main`;
        });
    }



    // STARTING ANIMATION END

    let fade = document.querySelector("figure div");
    var currentArticle = "";

    window.addEventListener("click", function (event) {
        event.preventDefault();
        if (event.target.id == "fade") {
            mainImage.className = `state-main`;
            fade.className = `fade nofade`;
            articleOut();
            this.setTimeout(unhideSectors, 2000);
        } else if (event.target.className == "sect") {
            mainImage.className = `state-${event.target.id}`;
            fade.className = `fade ${event.target.id}`;
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