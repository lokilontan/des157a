(function () {
    'use strict';

    console.log("reading JS...");

    var welcomeOverlay = document.getElementById("welcome");
    var setupOverlay = document.getElementById("setup");
    var gameOverLay = document.getElementById("game-over");
    var infoOverLay = document.getElementById("information");
    var playerZones = document.getElementById("players_zones");
    var player1Score = document.getElementById('player_1_score');
    var player1Name = document.getElementById("player_1_name");
    var player2Score = document.getElementById('player_2_score');
    var player2Name = document.getElementById("player_2_name");
    var diceZone = document.getElementById("dice_zone");
    var player1Zone = document.getElementById('player_1_zone');
    var player2Zone = document.getElementById('player_2_zone');

    const soundtrack = new Audio('media/soundtrack.mp3');
    const buttonSound = new Audio('media/button.mp3');
    const passSound = new Audio('media/pass.mp3');
    const rollSound = new Audio('media/roll.mp3');
    const winSound = new Audio('media/win.mp3');

    var gameData = {
        players: ["player1", "player2"],
        score: [0, 0],
        roll: 0,
        currentPlayer: 0,
        gameEnd: 29,
        soundOn: true
    };

    function initGame() {
        gameData.currentPlayer = Math.floor(Math.random() * 2);
        activateCurrentPlayer();
        updateUI();
        if (gameData.soundOn) {
            soundtrack.play();
        }
    }

    function updateUI() {
        player1Name.textContent = gameData.players[0];
        player1Score.textContent = gameData.score[0];
        player2Name.textContent = gameData.players[1];
        player2Score.textContent = gameData.score[1];
    }

    function activateCurrentPlayer() {
        if (gameData.currentPlayer === 0) {
            player1Name.classList = "name font-flash";
            player1Score.classList = "score font-flash";
            player2Name.classList = "name"
            player2Score.classList = "score";

        } else {
            player2Name.classList = "name font-flash"
            player2Score.classList = "score font-flash";
            player1Name.classList = "name";
            player1Score.classList = "score";
        }
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.currentPlayer] > gameData.gameEnd) {
            console.log( // DO SOMETHING HERE AFTER A PLAYER WINS
                `${gameData.players[gameData.currentPlayer]} wins with
                ${gameData.score[gameData.currentPlayer]} points!`
            );
            gameOverLay.classList = "showing";
            document.getElementById("winner").textContent = gameData.players[gameData.currentPlayer];
            if (gameData.soundOn) {
                soundtrack.pause();
                winSound.play();
            }
        }
        updateScores();
    }

    // Display the players's scores
    function updateScores() {
        player1Score.textContent = gameData.score[0];
        player2Score.textContent = gameData.score[1];
    }

    soundtrack.addEventListener("ended", function(){
        if (gameData.soundOn) {
            soundtrack.play();
        }
    });

    document.getElementById("exit").addEventListener("click", function () {
        window.location.replace("https://lokilontan.github.io/des157a/");
        if (gameData.soundOn) {
            buttonSound.play();
        }
    });

    document.getElementById("settings").addEventListener("click", function () {
        setupOverlay.classList = "showing";
        document.getElementById("play-button").classList = "button hidden";
        document.getElementById("return-button").classList = "button showing";

        document.getElementById("player-1-name-in").value = gameData.players[0];
        document.getElementById("player-2-name-in").value = gameData.players[1];
        document.getElementById("game-point-in").value = gameData.gameEnd;
        document.getElementById("sound-in").checked = gameData.soundOn;

        document.getElementById("return-button").addEventListener("click", function () {
            let player1NameIn = document.getElementById("player-1-name-in").value;
            let player2NameIn = document.getElementById("player-2-name-in").value;
            let gamePointIn = document.getElementById("game-point-in").value;
            let soundIn = document.getElementById("sound-in").checked;

            console.log(player1NameIn, player2NameIn, gamePointIn, soundIn)

            if (player1NameIn) {
                gameData.players[0] = player1NameIn;
            }
            if (player2NameIn) {
                gameData.players[1] = player2NameIn;
            }
            if (gamePointIn) {
                gameData.gameEnd = gamePointIn;
            }
            gameData.soundOn = soundIn;
            updateUI()
            setupOverlay.classList = "hidden";
            document.getElementById("return-button").classList = "button hidden";
            if (gameData.soundOn) {
                buttonSound.play();
                soundtrack.play();
            }
        });
        if (gameData.soundOn) {
            buttonSound.play();
        }
    });

    document.getElementById("info").addEventListener("click", function () {
        infoOverLay.classList = "showing";
        document.getElementById("continue-button").addEventListener("click", function () {
            infoOverLay.classList = "hidden";
            if (gameData.soundOn) {
                buttonSound.play();
            }
        });
        if (gameData.soundOn) {
            buttonSound.play();
        }
    });

    document.getElementById("next-button").addEventListener("click", function () {
        welcomeOverlay.classList = "hidden";
        setupOverlay.classList = "showing";
        if (gameData.soundOn) {
            buttonSound.play();
        }
    });

    document.getElementById("play-button").addEventListener("click", function () {
        let player1NameIn = document.getElementById("player-1-name-in").value;
        let player2NameIn = document.getElementById("player-2-name-in").value;
        let gamePointIn = document.getElementById("game-point-in").value;
        let soundIn = document.getElementById("sound-in").checked;

        if (player1NameIn) {
            gameData.players[0] = player1NameIn;
        }
        if (player2NameIn) {
            gameData.players[1] = player2NameIn;
        }
        if (gamePointIn) {
            gameData.gameEnd = gamePointIn;
        }
        gameData.soundOn = soundIn;

        initGame();

        setupOverlay.classList = "hidden";
        document.getElementById("play-button").classList = "button hidden";
        if (gameData.soundOn) {
            buttonSound.play();
        }

    });

    document.getElementById("again-button").addEventListener("click", function () {
        gameOverLay.classList = "hidden";
        gameData.score = [0, 0];
        initGame();
        if (gameData.soundOn) {
            buttonSound.play();
        }
    });

    player1Zone.addEventListener("click", function () {
        if (gameData.currentPlayer === 0) {
            switchPlayers();
            activateCurrentPlayer();
            player1Zone.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
            player1Zone.style.border = "5px solid rgba(0, 60, 42.7, 0.0)";
            player1Name.style.opacity = "1";
            player1Score.style.opacity = "1";
            document.getElementById("player_1_pass").classList = "pass hidden";
            if (gameData.soundOn) {
                passSound.play();
            }
        }
    });

    player2Zone.addEventListener("click", function () {
        if (gameData.currentPlayer === 1) {
            switchPlayers();
            activateCurrentPlayer();
            player2Zone.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
            player2Zone.style.border = "5px solid rgba(0, 60, 42.7, 0)";
            player2Name.style.opacity = "1";
            player2Score.style.opacity = "1";
            document.getElementById("player_2_pass").classList = "pass hidden";
            if (gameData.soundOn) {
                passSound.play();
            }
        }
    });

    player1Zone.addEventListener("mouseover", function () {
        if (gameData.currentPlayer === 0) {
            player1Zone.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            player1Zone.style.border = "5px solid rgba(0, 60, 42.7, 1)";
            player1Name.style.opacity = "0.1";
            player1Score.style.opacity = "0.1";
            document.getElementById("player_1_pass").classList = "pass visible";
        } else {
            player1Zone.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            player1Zone.style.border = "5px solid rgba(0, 60, 42.7, 1)";
        }
    });

    player1Zone.addEventListener("mouseout", function () {
        player1Zone.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
        player1Zone.style.border = "5px solid rgba(0, 60, 42.7, 0.0)";
        player1Name.style.opacity = "1";
        player1Score.style.opacity = "1";
        document.getElementById("player_1_pass").classList = "pass hidden";
    });

    player2Zone.addEventListener("mouseover", function () {
        if (gameData.currentPlayer === 1) {
            player2Zone.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            player2Zone.style.border = "5px solid rgba(0, 60, 42.7, 1)";
            player2Name.style.opacity = "0.1";
            player2Score.style.opacity = "0.1";
            document.getElementById("player_2_pass").classList = "pass visible";
        } else {
            player2Zone.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            player2Zone.style.border = "5px solid rgba(0, 60, 42.7, 1)";
        }
    });

    player2Zone.addEventListener("mouseout", function () {
        player2Zone.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
        player2Zone.style.border = "5px solid rgba(0, 60, 42.7, 0)";
        player2Name.style.opacity = "1";
        player2Score.style.opacity = "1";
        document.getElementById("player_2_pass").classList = "pass hidden";
    });


    // <<<<<<<<<<<<<<<<<ROLLING DICE ANIMATION START>>>>>>>>>>>>>>>>>>>>

    diceZone.addEventListener("mouseover", function () {
        diceZone.classList = "showing";
        diceZone.style.backgroundColor = "rgba(255, 255, 255, 0.239)";
        document.getElementById("roll").classList = "visible";
        document.getElementById("dice-grid").style.opacity = "0.2";
    });

    diceZone.addEventListener("mouseout", function () {
        diceZone.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
        document.getElementById("roll").classList = "hidden";
        document.getElementById("dice-grid").style.opacity = "1";
    });

    diceZone.addEventListener("click", function (event) {
        event.preventDefault();
        roll()
    });

    window.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.code == "Enter") {
            if (gameData.currentPlayer === 0) {
                player1Zone.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                player1Zone.style.border = "5px solid rgba(0, 60, 42.7, 1)";
                player1Name.style.opacity = "0.1";
                player1Score.style.opacity = "0.1";
                document.getElementById("player_1_pass").classList = "pass visible";
            } else {
                player2Zone.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                player2Zone.style.border = "5px solid rgba(0, 60, 42.7, 1)";
                player2Name.style.opacity = "0.1";
                player2Score.style.opacity = "0.1";
                document.getElementById("player_2_pass").classList = "pass visible";
            }
            setTimeout(function () {
                if (gameData.currentPlayer === 0) {
                    player1Zone.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
                    player1Zone.style.border = "5px solid rgba(0, 60, 42.7, 0.0)";
                    player1Name.style.opacity = "1";
                    player1Score.style.opacity = "1";
                    document.getElementById("player_1_pass").classList = "pass hidden";
                } else {
                    player2Zone.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
                    player2Zone.style.border = "5px solid rgba(0, 60, 42.7, 0)";
                    player2Name.style.opacity = "1";
                    player2Score.style.opacity = "1";
                    document.getElementById("player_2_pass").classList = "pass hidden";
                }
                if (gameData.soundOn) {
                    passSound.play();
                }
                switchPlayers();
            }, 200);

        }
    });

    window.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.code == "Space") {
            diceZone.classList = "showing";
            diceZone.style.backgroundColor = "rgba(255, 255, 255, 0.239)";
            document.getElementById("roll").classList = "visible";
            document.getElementById("dice-grid").style.opacity = "0.2";
            setTimeout(function () {
                roll();
            }, 200);

        }
    });

    function roll() {
        // Hide the zones
        const dice_roll = Math.floor(Math.random() * 11);
        if (gameData.soundOn) {
            rollSound.play();
        }

        playerZones.classList = "hidden";
        diceZone.classList = "hidden";

        initDice();

        // Blink the obj's
        for (let i = 0; i < 20; i++) {
            setTimeout(blinkObjs, 100 + Math.pow(i, 2.5));
        }

        setTimeout(function () {
            displayDiceRoll(dice_roll);
            gameData.roll = dice_roll + 1;
            updateState();
            if (gameData.soundOn) {
                rollSound.pause();
            }

        }, 2000);

    }

    // put grid back in case it was moved somewhere
    // (for example: one is not in the center, so I moved it there)
    function initDice() {
        let diceDisplay = document.querySelectorAll(".dice");
        for (let d of diceDisplay) {
            d.classList = "dice hidden";
        }
        let diceGrid = document.getElementById("dice-grid");
        diceGrid.style.top = "545px";
        diceGrid.style.left = "43.75%";
        diceGrid.style.opacity = "1";
    }

    function updateState() {
        if (gameData.roll === 2) {
            snakeEyes();
        }
        else if (gameData.roll === 1) {
            switchPlayers();
        }
        else {
            gameData.score[gameData.currentPlayer] += gameData.roll;
            checkWinningCondition();
        }
    }

    function snakeEyes() {
        console.log("Oh snap! Snake eyes!");
        gameData.score[gameData.currentPlayer] = 0;
        gameData.currentPlayer ? (gameData.currentPlayer = 0) : (gameData.currentPlayer = 1);
        activateCurrentPlayer();
        //show the current score
        updateScores();
    }

    function switchPlayers() {
        gameData.currentPlayer ? (gameData.currentPlayer = 0) : (gameData.currentPlayer = 1);
        activateCurrentPlayer();
        console.log(
            `Sorry, one of your rolls was a one, switching to 
            ${gameData.players[gameData.currentPlayer]}`
        );
    }

    // blinks all green spots and random dice dots
    function blinkObjs() {

        let objs = document.querySelectorAll(".obj");
        let dice = document.getElementById(`dice${Math.floor(Math.random() * 11)}`);

        for (let obj of objs) {
            obj.classList = "obj blink showing";
        }

        dice.classList = "dice showing dice-blink";

        setTimeout(function () {
            for (let obj of objs) {
                obj.classList = "obj";
            }
            dice.classList = "dice hidden";

        }, 200);
    }

    // displays the rolled dice
    function displayDiceRoll(dice_roll) {
        let dices = document.querySelectorAll(".dice");
        let diceGrid = document.getElementById("dice-grid");

        for (let dice of dices) {
            dice.classList = "dice hidden";
        }

        let diceDisplay = [];

        switch (dice_roll) {
            case 0:
                diceGrid.style.left = "45.7%";
                diceDisplay.push(document.getElementById("dice5"));
                break;
            case 1:
                diceDisplay.push(document.getElementById("dice4"));
                diceDisplay.push(document.getElementById("dice7"));
                break;
            case 2:
                diceGrid.style.left = "45.7%";
                diceDisplay.push(document.getElementById("dice1"));
                diceDisplay.push(document.getElementById("dice5"));
                diceDisplay.push(document.getElementById("dice9"));
                break;
            case 3:
                diceDisplay.push(document.getElementById("dice4"));
                diceDisplay.push(document.getElementById("dice5"));
                diceDisplay.push(document.getElementById("dice6"));
                diceDisplay.push(document.getElementById("dice7"));
                break;
            case 4:
                diceDisplay.push(document.getElementById("dice2"));
                diceDisplay.push(document.getElementById("dice3"));
                diceDisplay.push(document.getElementById("dice8"));
                diceDisplay.push(document.getElementById("dice9"));
                diceDisplay.push(document.getElementById("dice10"));
                break;
            case 5:
                diceGrid.style.left = "45.7%";
                diceDisplay.push(document.getElementById("dice0"));
                diceDisplay.push(document.getElementById("dice2"));
                diceDisplay.push(document.getElementById("dice4"));
                diceDisplay.push(document.getElementById("dice6"));
                diceDisplay.push(document.getElementById("dice8"));
                diceDisplay.push(document.getElementById("dice10"));
                break;
            case 6:
                diceGrid.style.left = "45.7%";
                diceDisplay.push(document.getElementById("dice0"));
                diceDisplay.push(document.getElementById("dice1"));
                diceDisplay.push(document.getElementById("dice4"));
                diceDisplay.push(document.getElementById("dice5"));
                diceDisplay.push(document.getElementById("dice6"));
                diceDisplay.push(document.getElementById("dice8"));
                diceDisplay.push(document.getElementById("dice9"));
                break;
            case 7:
                diceGrid.style.top = "580px";
                diceDisplay.push(document.getElementById("dice0"));
                diceDisplay.push(document.getElementById("dice1"));
                diceDisplay.push(document.getElementById("dice2"));
                diceDisplay.push(document.getElementById("dice3"));
                diceDisplay.push(document.getElementById("dice4"));
                diceDisplay.push(document.getElementById("dice5"));
                diceDisplay.push(document.getElementById("dice6"));
                diceDisplay.push(document.getElementById("dice7"));
                break;
            case 8:
                diceGrid.style.left = "45.7%";
                diceDisplay.push(document.getElementById("dice0"));
                diceDisplay.push(document.getElementById("dice1"));
                diceDisplay.push(document.getElementById("dice2"));
                diceDisplay.push(document.getElementById("dice4"));
                diceDisplay.push(document.getElementById("dice5"));
                diceDisplay.push(document.getElementById("dice6"));
                diceDisplay.push(document.getElementById("dice8"));
                diceDisplay.push(document.getElementById("dice9"));
                diceDisplay.push(document.getElementById("dice10"));
                break;
            case 9:
                diceDisplay.push(document.getElementById("dice1"));
                diceDisplay.push(document.getElementById("dice2"));
                diceDisplay.push(document.getElementById("dice4"));
                diceDisplay.push(document.getElementById("dice5"));
                diceDisplay.push(document.getElementById("dice6"));
                diceDisplay.push(document.getElementById("dice7"));
                diceDisplay.push(document.getElementById("dice8"));
                diceDisplay.push(document.getElementById("dice9"));
                diceDisplay.push(document.getElementById("dice10"));
                diceDisplay.push(document.getElementById("dice11"));
                break;
            case 10:
                diceDisplay.push(document.getElementById("dice0"));
                diceDisplay.push(document.getElementById("dice1"));
                diceDisplay.push(document.getElementById("dice2"));
                diceDisplay.push(document.getElementById("dice3"));
                diceDisplay.push(document.getElementById("dice4"));
                diceDisplay.push(document.getElementById("dice5"));
                diceDisplay.push(document.getElementById("dice6"));
                diceDisplay.push(document.getElementById("dice8"));
                diceDisplay.push(document.getElementById("dice9"));
                diceDisplay.push(document.getElementById("dice10"));
                diceDisplay.push(document.getElementById("dice11"));
                break;
            case 11:
                diceDisplay = document.querySelectorAll(".dice");
                break;
            default:
                break;
        }
        blinkDice(diceDisplay);
    }

    // blinks the rolled dice and finally displays it
    function blinkDice(diceDisplay) {
        let blinkDiceInterval = setInterval(function () {
            for (let d of diceDisplay) {
                d.classList = "dice showing";
            }
            setTimeout(function () {
                for (let d of diceDisplay) {
                    d.classList = "dice hidden";
                }
            }, 300);
        }, 600);
        setTimeout(function () {
            clearInterval(blinkDiceInterval);
            for (let d of diceDisplay) {
                d.classList = "dice showing";
            }
            playerZones.classList = "showing";
            diceZone.classList = "showing";
            diceZone.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
            document.getElementById("roll").classList = "hidden";
            document.getElementById("dice-grid").style.opacity = "1";
        }, 1799);
    }
    // <<<<<<<<<<<<<<<<<ROLLING DICE ANIMATION END>>>>>>>>>>>>>>>>>>>>
}());