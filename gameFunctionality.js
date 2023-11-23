const gameDiv = document.getElementById("gameBgCover");
const meteotiteDivs = [...document.getElementsByClassName("meteorite-div")];
var gameDivHeight = gameDiv.clientHeight;
var gameDivWidth = gameDiv.clientWidth;

var score = 0;
var movingLeft;
var movingRight;

const steller = document.getElementById("steller");
var stellerLeft = parseFloat(window.getComputedStyle(steller).left);
var stellerRight = parseFloat(window.getComputedStyle(steller).right);
var stellerWidth = parseFloat(window.getComputedStyle(steller).width);

console.log(gameDivWidth - stellerWidth)
var stellerMovingLeft = false;
var stellerMovingRight = false;

var img = [
    "./assets/jester.png",
    "./assets/jesterRev.png",
]

var meteorite = new Image();
meteorite.src = "./assets/meteorite.png";
meteorite.classList.add("meteorite-img");

function randomNumber(lowerLimit, upperLimit) {
    lowerLimit = Math.ceil(lowerLimit);
    upperLimit = Math.floor(upperLimit);
    return Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
} 

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
        console.log(stellerLeft)
        stellerLeft -= 1;
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
        console.log(stellerRight)
        stellerLeft += 1;
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

createMeteorites()
var creatingMeteorite;

function createMeteorites(){
    clearTimeout(creatingMeteorite);
    clearInterval(creatingMeteorite);
    let numberOfDivs = randomNumber(0,4);
    let addMeteorite = setInterval(() => {
        if(numberOfDivs === 0){
            clearInterval(addMeteorite);
            creatingMeteorite = setTimeout(createMeteorites(),1000);
        }

        else{
        numberOfDivs--;
        let meteoriteClone = meteorite.cloneNode(true);
        meteoriteClone.setAttribute('id',`met${score}`);
        meteoriteClone.addEventListener('animationend',() => {
            meteoriteClone.remove();
        });
        meteotiteDivs[randomNumber(0,4)].appendChild(meteoriteClone);
        }},750);
    }

// var platformWidth;

// var safe = [
//     "./assets/safe1.png",
//     "./assets/safe2.png",
//     "./assets/safe3.png"
// ]

// var danger = [
//     "./assets/danger1.png",
//     "./assets/danger2.png"
// ]

// var safePlatforms= [];
// var dangerPlatforms= [];
// var allPlatforms = [];

// function loadImages(){
//     safe.forEach((url) => {
//         let img = new Image();
//         img.src = url;
//         img.onload = () => {
//             safePlatforms.push(img);
//             console.log(img);
//         }
//     })
//     danger.forEach((url) => {
//         let img = new Image();
//         img.src = url;
//         img.onload = () => {
//             dangerPlatforms.push(img);
//             console.log(img);
//         }
//     })
// }

// loadImages();

// var platform;

// function randomSafePlatform(){
//     return Math.ceil(Math.random() * safePlatforms.length);
// }

// function randomDangerPlatform(){
//     return Math.ceil(Math.random() * dangerPlatforms.length);
// }