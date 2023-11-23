if(localStorage.getItem("highScore")){
    document.getElementById("highScore").innerText = localStorage.getItem("highScore");
}

const gameDiv = document.getElementById("gameBgCover");
const meteoriteDivs = [...document.getElementsByClassName("coin-div")];
var gameDivHeight = gameDiv.clientHeight;
var gameDivWidth = gameDiv.clientWidth;

const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

const scoreDiv = document.getElementById("score");
const hpDiv = document.getElementById("hitPoints");
const resultDiv = document.getElementById("resultDiv");
var score = 0;

var updateScore = setInterval(() => {
    score += 2;
    scoreDiv.innerText = score
},1000);

var movingLeft;
var movingRight;

var hitPoints = 500;

const steller = document.getElementById("steller");
var stellerLeft = parseFloat(window.getComputedStyle(steller).left);
var stellerRight = parseFloat(window.getComputedStyle(steller).right);
var stellerWidth = parseFloat(window.getComputedStyle(steller).width);
console.log(stellerWidth)
console.log(gameDivWidth - stellerWidth)
var stellerMovingLeft = false;
var stellerMovingRight = false;

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
var stellerName = urlParams.get("steller");
var mapName = urlParams.get("map");

document.getElementById("gameDiv").style.backgroundImage = `url('./assets/${mapName}.png')`;
var img = [
    `./assets/${stellerName}.png`,
    `./assets/${stellerName}Rev.png`,
]

steller.setAttribute("src",img[0]);
setInterval(() => {
    areSiblingsColliding(steller);
},10)

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

var meteorite = new Image();
meteorite.src = "./assets/meteorite.png";
meteorite.classList.add("meteorite-img");
function randomNumber(lowerLimit, upperLimit) {
    lowerLimit = Math.ceil(lowerLimit);
    upperLimit = Math.floor(upperLimit);
    return Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
} 

leftArrow.addEventListener("mousedown", (e) => {
    if( stellerLeft > 0 && !stellerMovingLeft){
        stellerMovingLeft = true;
        stellerMovingRight = false;
        moveLeft();
    }
})

leftArrow.addEventListener("mouseup", (e) => {
    if(stellerLeft > 0 && stellerRight > 0 &&(stellerMovingRight || stellerMovingLeft)){
        stopMoving();
    }
})

rightArrow.addEventListener("mousedown", (e) => {
    if(stellerRight > 0 && !stellerMovingRight ){
        stellerMovingRight = true;
        stellerMovingLeft = false;
        moveRight();
    }
})

rightArrow.addEventListener("mouseup", (e) => {
    if(stellerLeft > 0 && stellerRight > 0 &&(stellerMovingRight || stellerMovingLeft) ){
        stopMoving();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.code === "ArrowLeft" && stellerLeft > 0 && !stellerMovingLeft){
        stellerMovingLeft = true;
        stellerMovingRight = false;
        moveLeft();
    }
    else if(e.code === "ArrowRight" && stellerRight > 0 && !stellerMovingRight ){
        stellerMovingRight = true;
        stellerMovingLeft = false;
        moveRight();
    }
})

document.addEventListener("keyup", (e) => {
    if(e.code === "ArrowLeft" && stellerLeft > 0 && stellerRight > 0 &&(stellerMovingRight || stellerMovingLeft)){
        stopMoving();
    }
    else if(e.code === "ArrowRight" && stellerLeft > 0 && stellerRight > 0 &&(stellerMovingRight || stellerMovingLeft) ){
        stopMoving();
    }
})

function moveLeft(){
    steller.setAttribute("src", img[0]);
    clearInterval(movingRight);
    movingLeft = setInterval(() => {
        stellerLeft = parseFloat(window.getComputedStyle(steller).left);
        // console.log(stellerLeft)
        stellerLeft -= 2;
        steller.style.left = stellerLeft + 'px';
        if(stellerLeft <= 0){
            clearInterval(movingLeft);
        }
    },1)
}

function moveRight(){
    steller.setAttribute("src", img[1]);
    clearInterval(movingLeft);
    movingRight = setInterval(() => {
        stellerLeft = parseFloat(window.getComputedStyle(steller).left);
        // console.log(stellerRight)
        stellerLeft += 2;
        steller.style.left = stellerLeft + 'px';
        if(stellerLeft > gameDivWidth-stellerWidth){
            clearInterval(movingRight);
        }
    },1)
}

function stopMoving(){
    stellerMovingLeft = false;
    stellerMovingRight = false;
    clearInterval(movingLeft);
    clearInterval(movingRight);
}

createCoin()
var creatingCoin;

function createCoin(){
    clearTimeout(creatingCoin);
    // clearInterval(creatingCoin);
    let numberOfDivs = randomNumber(0,5);
    let addMeteorite = setInterval(() => {
        if(numberOfDivs === 0){
            clearInterval(addMeteorite);
            creatingCoin = setTimeout(createCoin(),1000);
        }

        else{
        numberOfDivs--;
        let metOrCoin = randomNumber(0,3);
        if(metOrCoin == 0){
            let met = meteorite.cloneNode(true);
        met.setAttribute('id',`coin${score}`);
        met.addEventListener('animationend',() => {
            met.remove();
        });
        meteoriteDivs[randomNumber(0,5)].appendChild(met);
        }
        else{
            let coinClone = coins[randomNumber(0,3)].cloneNode(true);
        coinClone.setAttribute('id',`coin${score}`);
        coinClone.addEventListener('animationend',() => {
            coinClone.remove();
        });
        meteoriteDivs[randomNumber(0,5)].appendChild(coinClone);
        }
        }},500);
    }
    function areSiblingsColliding(steller) {
        var coins = [...document.getElementsByClassName("coin-img")];
        coins.forEach((coin) => {
            var stellerRect = steller.getBoundingClientRect();
            var coinRect = coin.getBoundingClientRect();
    
            // Check for collision
            if (
                stellerRect.left+50 < coinRect.right &&
                stellerRect.right-50 > coinRect.left &&
                stellerRect.top+50 < coinRect.bottom &&
                stellerRect.bottom+50 > coinRect.top
            ) {
                // Collision detected
                coin.remove();
                score += 10;
                scoreDiv.innerText = score;
            }
        });

        var meteorites = [...document.getElementsByClassName("meteorite-img")];
        meteorites.forEach((meteorite) => {
            var stellerRect = steller.getBoundingClientRect();
            var meteoriteRect = meteorite.getBoundingClientRect();
    
            // Check for collision
            if (
                stellerRect.left+50 < meteoriteRect.right &&
                stellerRect.right-50 > meteoriteRect.left &&
                stellerRect.top+50 < meteoriteRect.bottom &&
                stellerRect.bottom+50 > meteoriteRect.top
            ) {
                // Collision detected
                meteorite.remove();
                hitPoints -= randomNumber(75,101);
                if(hitPoints <= 0){
                    localStorage.setItem('score',score);
                    if(localStorage.getItem('highScore') < score){
                        localStorage.setItem('highScore',score);
                    }
                    location.href = "./gameOverPage.html?map="+mapName+"&steller="+stellerName;
                }
                hpDiv.innerText = hitPoints;
            }
        });
}
