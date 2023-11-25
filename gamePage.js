/*  GAME-PAGE FUNCTIONALITIES */

// Going to bottom of the page for seamless experience for phone users
window.onload = () => {
    window.scrollTo(0, document.body.scrollHeight);
};

// Control Audio Button
const audioButton = document.getElementById("musicControlGamePage");

// Bg audio and Meteorite hit audio
const homeAudio = new Audio("./assets/gameAudio.mp3");
const hitAudio = new Audio("./assets/hitSound.mp3");
hitAudio.volume = 0.3;
homeAudio.volume = 0.3;
homeAudio.loop = true;

// Checking status of playingAudio when user is redirected to gamePage
var playingAudio = parseInt(localStorage.getItem("playingMusic"));
if (playingAudio === 1) {
    homeAudio.play();
}
else {
    audioButton.style.textDecoration = "line-through";
}

// adding functionality to audio control button
audioButton.addEventListener("click", () => {
    if (playingAudio === 1) {
        homeAudio.pause();
        homeAudio.currentTime = 0;
        audioButton.style.textDecoration = "line-through";
        localStorage.setItem("playingMusic", 0);
        playingAudio = 0;
    }
    else {
        homeAudio.play();
        audioButton.style.textDecoration = "none";
        localStorage.setItem("playingMusic", 1);
        playingAudio = 1;
    }
});

// Exit game Button
const exitGameButton = document.getElementById("exitGame");

// Clicking on exitgameButton ends the Game
exitGameButton.addEventListener("click", () => {
    localStorage.setItem('score', score);
    if (localStorage.getItem('highScore') < score) {
        localStorage.setItem('highScore', score);
    }
    // Pass the selected map and steller through url
    location.href = "./gameOverPage.html?map=" + mapName + "&steller=" + stellerName;
});

// game Container (arena)
const gameDiv = document.getElementById("gameBgCover");

// array storing the divs for path of coins and meteorites
const meteoriteDivs = [...document.getElementsByClassName("coin-div")];

// game Container (arena) height and Height
var gameDivHeight = gameDiv.clientHeight;
var gameDivWidth = gameDiv.clientWidth;

// Arrows for controlling steller on phones
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

// Accessing the URL to get the selected map and steller Name
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
var stellerName = urlParams.get("steller");
var mapName = urlParams.get("map");

// Changing the background image to selected map and steller image to selected steller
document.getElementById("gameDiv").style.backgroundImage = `url('./assets/${mapName}.png')`;
var img = [
    `./assets/${stellerName}.png`,
    `./assets/${stellerName}Rev.png`,
]
const steller = document.getElementById("steller");
steller.setAttribute("src", img[0]);

// Coin images
var coin1 = new Image();
coin1.src = "./assets/coin1.png";
coin1.classList.add("coin-img");

var coin2 = new Image();
coin2.src = "./assets/coin2.png";
coin2.classList.add("coin-img");

var coin3 = new Image();
coin3.src = "./assets/coin3.png";
coin3.classList.add("coin-img");

var coins = [
    coin1,
    coin2,
    coin3
]

// Meteorite images
var meteorite = new Image();
meteorite.src = "./assets/meteorite.png";
meteorite.classList.add("meteorite-img1");

// Timer to increase the difficulty
var difficulty = 1;
setTimeout(() => {
    difficulty = 2;
    meteorite.classList.remove("meteorite-img1");
    meteorite.classList.add("meteorite-img2");
}, 20000);

setTimeout(() => {
    difficulty = 3;
    meteorite.classList.remove("meteorite-img2");
    meteorite.classList.add("meteorite-img3");
}, 40000);

setTimeout(() => {
    difficulty = 4;
    meteorite.classList.remove("meteorite-img3");
    meteorite.classList.add("meteorite-img4");
}, 60000);

// Stats Divs
const highScoreDiv = document.getElementById("highScore");
const scoreDiv = document.getElementById("score");
const hpDiv = document.getElementById("hitPoints");
const resultDiv = document.getElementById("resultDiv");

// Variables to store the stats
var highScore = 0
if (localStorage.getItem("highScore")) {
    highScore = localStorage.getItem("highScore");
    highScoreDiv.innerText = highScore;
}
var score = 0;
var hitPoints = 500;

// Timer to update the score
var updateScore = setInterval(() => {
    score += 2;
    scoreDiv.innerText = score;

    if (score > highScore) {
        highScoreDiv.innerText = score;
    }
}, 1000);

// Variables to keep track whether the steller is moving or not
var stellerMovingLeft = false;
var stellerMovingRight = false;

// Timer to check whether the steller and coins and meteorites are colliding or not
setInterval(() => {
    areColliding(steller);
}, 10)

// variables to store position and width of steller
var stellerLeft = parseFloat(window.getComputedStyle(steller).left);
var stellerRight = parseFloat(window.getComputedStyle(steller).right);
var stellerWidth = parseFloat(window.getComputedStyle(steller).width);
console.log(stellerWidth)
console.log(gameDivWidth - stellerWidth)

// Making the leftArrow button functional
// On touchStart start moving
leftArrow.addEventListener("touchstart", (e) => {
    if (stellerLeft > 0 && !stellerMovingLeft) {
        stellerMovingLeft = true;
        stellerMovingRight = false;
        moveLeft();
    }
})

// On touchEnd stop moving
leftArrow.addEventListener("touchend", (e) => {
    if (stellerLeft > 0 && stellerRight > 0 && (stellerMovingRight || stellerMovingLeft)) {
        stopMoving();
    }
})

// Making the rightArrow button functional
// On touchStart start moving
rightArrow.addEventListener("touchstart", (e) => {
    if (stellerRight > 0 && !stellerMovingRight) {
        stellerMovingRight = true;
        stellerMovingLeft = false;
        moveRight();
    }
})

// On touchEnd stop moving
rightArrow.addEventListener("touchend", (e) => {
    if (stellerLeft > 0 && stellerRight > 0 && (stellerMovingRight || stellerMovingLeft)) {
        stopMoving();
    }
})


// Making the rightArrow key functional
// On keydown start moving
document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft" && stellerLeft > 0 && !stellerMovingLeft) {
        stellerMovingLeft = true;
        stellerMovingRight = false;
        moveLeft();
    }
    else if (e.code === "ArrowRight" && stellerRight > 0 && !stellerMovingRight) {
        stellerMovingRight = true;
        stellerMovingLeft = false;
        moveRight();
    }
})

// On keyup stop moving
document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft" && stellerLeft > 0 && stellerRight > 0 && (stellerMovingRight || stellerMovingLeft)) {
        stopMoving();
    }
    else if (e.code === "ArrowRight" && stellerLeft > 0 && stellerRight > 0 && (stellerMovingRight || stellerMovingLeft)) {
        stopMoving();
    }
})

// Variables to store the move timer
var movingLeft;
var movingRight;

// Function to move the steller towards left
function moveLeft() {
    steller.setAttribute("src", img[0]);
    clearInterval(movingRight);
    movingLeft = setInterval(() => {
        stellerLeft = parseFloat(window.getComputedStyle(steller).left);
        stellerLeft -= 4;
        steller.style.left = stellerLeft + 'px';
        if (stellerLeft <= 0) {
            clearInterval(movingLeft);
        }
    }, 1)
}

// Function to move the steller towards right
function moveRight() {
    steller.setAttribute("src", img[1]);
    clearInterval(movingLeft);
    movingRight = setInterval(() => {
        stellerLeft = parseFloat(window.getComputedStyle(steller).left);
        // console.log(stellerRight)
        stellerLeft += 4;
        steller.style.left = stellerLeft + 'px';
        if (stellerLeft > gameDivWidth - stellerWidth) {
            clearInterval(movingRight);
        }
    }, 1)
}

// Function to make the steller stop
function stopMoving() {
    stellerMovingLeft = false;
    stellerMovingRight = false;
    clearInterval(movingLeft);
    clearInterval(movingRight);
}

// Variable to store the coin or meteorite creating timer
var creatingCoin;
createCoin();

// Function to create meteorite or coin randomly
function createCoin() {
    clearTimeout(creatingCoin);
    let numberOfDivs = randomNumber(0, 5);
    let addMeteorite = setInterval(() => {
        if (numberOfDivs === 0) {
            clearInterval(addMeteorite);
            creatingCoin = setTimeout(createCoin(), 1000);
        }

        else {
            numberOfDivs--;
            let metOrCoin = randomNumber(0, 2);
            if (metOrCoin == 0) {
                let met = meteorite.cloneNode(true);
                met.setAttribute('id', `coin${score}`);
                met.addEventListener('animationend', () => {
                    met.remove();
                });
                meteoriteDivs[randomNumber(0, 5)].appendChild(met);
            }
            else {
                let coinClone = coins[randomNumber(0, 3)].cloneNode(true);
                coinClone.setAttribute('id', `coin${score}`);
                coinClone.addEventListener('animationend', () => {
                    coinClone.remove();
                });
                meteoriteDivs[randomNumber(0, 5)].appendChild(coinClone);
            }
        }
    }, 500);
}

// Function to check for collosions between the steller and the coins or meteorites 
function areColliding(steller) {
    // For Coins
    var coins = [...document.getElementsByClassName("coin-img")];
    coins.forEach((coin) => {
        var stellerRect = steller.getBoundingClientRect();
        var coinRect = coin.getBoundingClientRect();
        if (
            stellerRect.left + 50 < coinRect.right &&
            stellerRect.right - 50 > coinRect.left &&
            stellerRect.top + 50 < coinRect.bottom &&
            stellerRect.bottom + 50 > coinRect.top
        ) {
            // If Collision detected, remove coin and update score
            coin.remove();
            score += 10;
            scoreDiv.innerText = score;
        }
    });

    // For Meteorites
    if (difficulty === 1) {
        var meteorites = [...document.getElementsByClassName("meteorite-img1")];
    }
    else if (difficulty === 2) {
        var meteorites = [...document.getElementsByClassName("meteorite-img2")];
    }
    else if (difficulty === 3) {
        var meteorites = [...document.getElementsByClassName("meteorite-img3")];
    }
    else if (difficulty === 4) {
        var meteorites = [...document.getElementsByClassName("meteorite-img4")];
    }
    meteorites.forEach((meteorite) => {
        var stellerRect = steller.getBoundingClientRect();
        var meteoriteRect = meteorite.getBoundingClientRect();
        if (
            stellerRect.left + 50 < meteoriteRect.right &&
            stellerRect.right - 50 > meteoriteRect.left &&
            stellerRect.top + 50 < meteoriteRect.bottom &&
            stellerRect.bottom + 50 > meteoriteRect.top
        ) {
            // If Collision detected, remove meteorite and decrease hitPoints
            hitAudio.currentTime = 0;
            hitAudio.pause();
            if (playingAudio === 1) hitAudio.play();
            meteorite.remove();
            hitPoints -= randomNumber(75, 101);
            if (hitPoints <= 0) {
                localStorage.setItem('score', score);
                if (localStorage.getItem('highScore') < score) {
                    localStorage.setItem('highScore', score);
                }
                // Pass the selected map and steller through url
                location.href = "./gameOverPage.html?map=" + mapName + "&steller=" + stellerName;
            }
            hpDiv.innerText = hitPoints;
        }
    });
}

// Function to create a random number excluding the upperLimit
function randomNumber(lowerLimit, upperLimit) {
    lowerLimit = Math.ceil(lowerLimit);
    upperLimit = Math.floor(upperLimit);
    return Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
}