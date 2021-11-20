(function () {
    'use strict';

    console.log("reading JS...");

    // var startGame = document.getElementById('startgame');
    // var gameControl = document.getElementById('gamecontrol');
    // var game = document.getElementById('game');
    // var score = document.getElementById('score');
    // var actionArea = document.getElementById('actions');

    // var gameData = {
    //     dice: ["1die.jpg", "2die.jpg", "3die.jpg", "4die.jpg", "5die.jpg", "6die.jpg"],
    //     players: ["player1", "player2"],
    //     score: [0, 0],
    //     roll1: 0,
    //     roll2: 0,
    //     rollSum: 0,
    //     index: 0,
    //     gameEnd: 29
    // };

    // startGame.addEventListener('click', function () {
    //     gameData.index = Math.round(Math.random());
    //     gameControl.innerHTML = "<h2>The Game Has Started</h2>";
    //     gameControl.innerHTML += "<button id='quit'>Wanna Quit?</button>";
    //     document.getElementById('quit').addEventListener('click', function () {
    //         location.reload();
    //     });
    //     console.log('set up the turn');

    //     setUpTurn();

    // });

    // function setUpTurn() {
    //     game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`
    //     actionArea.innerHTML = `<button id="roll">Roll the Dice!</button>`;
    //     document.getElementById('roll').addEventListener('click', function () {
    //         console.log("roll the dice!");
    //         throwDice();

    //     });
    // }

    // function throwDice() {
    //     actionArea.innerHTML = '';
    //     gameData.roll1 = Math.floor(Math.random() * 6) + 1;
    //     gameData.roll2 = Math.floor(Math.random() * 6) + 1;
    //     game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`
    //     game.innerHTML += `<img src="./images/${gameData.dice[gameData.roll1 - 1]}">
    //                            <img src="./images/${gameData.dice[gameData.roll2 - 1]}">`;
    //     gameData.rollSum = gameData.roll1 + gameData.roll2;

    //     // if two 1's are rolled
    //     if (gameData.rollSum === 2) {
    //         game.innerHTML += `<p>Oh snap! Snake eyes!</p>`;
    //         gameData.score[gameData.index] = 0;
    //         gameData.index ? (gameData.index = 0) : (gameData.index = 1)
    //         //show the current score
    //         showCurrentScore();
    //         setTimeout(setUpTurn, 2000);
    //     }

    //     // if either is 1
    //     else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
    //         //switch player
    //         gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    //         game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to 
    //                                ${gameData.players[gameData.index]}</p>`;
    //         setTimeout(setUpTurn, 2000);
    //     }

    //     // proceed
    //     else {
    //         gameData.score[gameData.index] += gameData.rollSum;
    //         actionArea.innerHTML = '<button id="rollagain">Roll Again</button> or <button id="pass">Pass</button>'
    //         document.getElementById("rollagain").addEventListener('click', function () {
    //             setUpTurn();
    //         });
    //         document.getElementById("pass").addEventListener('click', function () {
    //             gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    //             setUpTurn();
    //         })
    //         checkWinningCondition();
    //     }

    // }

    // function checkWinningCondition() {
    //     if (gameData.score[gameData.index] > gameData.gameEnd) {
    //         score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with
    //                                ${gameData.score[gameData.index]} points!</h2>`;
    //         actionArea.innerHTML = "";
    //         document.getElementById('quit').innerHTML = "Start a New Game?";
    //     } else {
    //         showCurrentScore();
    //     }


    // }

    // function showCurrentScore() {
    //     score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]}
    //                                : ${gameData.score[0]}</strong> and <strong>${gameData.players[1]}
    //                                : ${gameData.score[1]}</strong></p>`
    // }

    // Hide the zones
    // Blink the obj's
    // Start rolling animations
    // Update the rolling value on dice zone
    // Return the rolling value
    function roll() {
        // Hide the zones
        const player_zones = document.getElementById("players_zones");
        const dice_zone = document.getElementById("dice_zone");
        const dice_roll = Math.floor(Math.random() * 11);

        player_zones.classList = "hidden";
        dice_zone.classList = "hidden";

        initDice();

        // Blink the obj's
        for (let i = 0; i < 20; i++) {
            setTimeout(blinkObjs, 100 + Math.pow(i, 2.5));
        }

        setTimeout(function () {
            displayDiceRoll(dice_roll)
        }, 2000);

    }

    window.addEventListener("keyup", function (event) {
        event.preventDefault();

        if (event.code == "Space") {

            roll()
        }

    });

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
    }

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
        setTimeout(function(){
            clearInterval(blinkDiceInterval);
            for (let d of diceDisplay) {
                d.classList = "dice showing";
            }
        }, 1799);
        
    }
}());