(function () {
    'use strict';

    console.log("reading JS...");

    // var startGame = document.getElementById('startgame');
    // var gameControl = document.getElementById('gamecontrol');
    // var game = document.getElementById('game');
    var playerZones = document.getElementById("players_zones");
    var player1Score = document.getElementById('player_1_score');
    var player1Name = document.getElementById("player_1_name");
    var player2Score = document.getElementById('player_2_score');
    var player2Name = document.getElementById("player_2_name");
    var diceZone = document.getElementById("dice_zone");
    var player1Zone = document.getElementById('player_1_zone');
    var player2Zone = document.getElementById('player_2_zone');

    // var actionArea = document.getElementById('actions');

    var gameData = {
        players: ["player1", "player2"],
        score: [0, 0],
        roll: 0,
        currentPlayer: 0,
        gameEnd: 29
    };

    initGame();

    function initGame() {
        gameData.currentPlayer = Math.floor(Math.random() * 2);
        activateCurrentPlayer(gameData.currentPlayer);
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
        }
        updateScores();
    }

    // Display the players's scores
    function updateScores() {
        player1Score.textContent = gameData.score[0];
        player2Score.textContent = gameData.score[1];
    }

    player1Zone.addEventListener("click", function () {
        if (gameData.currentPlayer === 0) {
            switchPlayers();
            activateCurrentPlayer();
            player1Zone.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
            player1Zone.style.border = "5px solid rgba(0, 60, 42.7, 0.0)";
            player1Name.style.opacity = "1";
            player1Score.style.opacity = "1";
            document.getElementById("player_1_pass").classList = "pass hidden";
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
        if (event.code == "Space") {
            diceZone.classList = "showing";
            diceZone.style.backgroundColor = "rgba(255, 255, 255, 0.239)";
            document.getElementById("roll").classList = "visible";
            document.getElementById("dice-grid").style.opacity = "0.2";
            setTimeout(function () {
                roll();
            }, 100);

        }
    });

    function roll() {
        // Hide the zones
        const dice_roll = Math.floor(Math.random() * 11);

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
        //show the current score
        updateScores();
    }

    function switchPlayers() {
        gameData.currentPlayer ? (gameData.currentPlayer = 0) : (gameData.currentPlayer = 1);
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