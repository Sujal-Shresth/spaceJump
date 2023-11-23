// const playAgainButton = document.getElementById("playAgainButton");
// const homeButton = document.getElementById("homeButton");

// playAgainButton.addEventListener("click",() =>{
//     location.href = ""
// })

// homeButton.addEventListener("click", () => {
//     location.href = "./index.html";
// })

// The canvas
const canvas = document.getElementById("gameCanvas");
var canvasHeight = canvas.clientHeight;
var canvasWidth = canvas.clientWidth;
canvas.height =  canvasHeight;
canvas.width = canvasWidth
console.log(canvasHeight)
console.log(canvasWidth)
var context = canvas.getContext("2d");

// The Stellers
var stellers = [
    "aviator",
    "vector",
    "jester",
    "cosmicTwins",
    "prism"
]

// Platforms
var platformWidth;

if(canvasWidth >= 600){
    platformWidth = 150;
    platformHeight = 40;
}
var safe = [
    "./assets/safe1.png",
    "./assets/safe2.png",
    "./assets/safe3.png"
]

var danger = [
    "./assets/danger1.png",
    "./assets/danger2.png"
]

var safePlatforms= [];
var dangerPlatforms= [];
var allPlatforms = [];

function loadImages(){
    safe.forEach((url) => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
            safePlatforms.push(img);
            console.log(img);
        }
    })
    danger.forEach((url) => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
            dangerPlatforms.push(img);
            console.log(img);
        }
    })
}

loadImages();

var platform;

function randomSafePlatform(){
    return Math.ceil(Math.random() * safePlatforms.length);
}

function randomDangerPlatform(){
    return Math.ceil(Math.random() * dangerPlatforms.length);
}




// The steller Images
var stellerRightImg = new Image();
var stellerLeftImg = new Image();

stellerRightImg.src = "./assets/vectorRev.png";
stellerLeftImg.src = "./assets/vector.png";

// Dimensions for the Steller Image
var stellerHeight = 20 *  window.innerHeight / 100;
var stellerWidth = stellerHeight;
var stellerX;
var stellerY;

var steller;

// speed

var vx = 0;

document.addEventListener("keydown",moveSteller);

function moveSteller(e) {
    if(e.code === "ArrowRight"){
        vx = 4;
        steller.img = stellerRightImg;
    }
    else if(e.code === "ArrowLeft"){
        vx = -4;
        steller.img = stellerLeftImg;
    }
}


// game loop
stellerRightImg.addEventListener("load", () => {
    console.log()
    stellerX = canvasWidth/2 - stellerWidth/2;
    stellerY = canvasHeight * 7 / 8 - stellerHeight;

    steller = {
        img: stellerRightImg,
        x: stellerX,
        y: stellerY,
        height: stellerHeight,
        width: stellerWidth
    }
    console.log(steller);

    context.drawImage(steller.img, steller.x, steller.y, steller.height, steller.width);

    requestAnimationFrame(update);
})

function update(){

    if(steller.x > canvasWidth){
        steller.x = 0;
    }
    else if(steller.x + steller.width < 0){
        steller.x = canvasWidth;
    }
    requestAnimationFrame(update);
    steller.x += vx;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(steller.img, steller.x, steller.y, steller.height, steller.width);

    for(let i = 0; i < allPlatforms.length; i++){
        let platform = allPlatforms[i];
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    }
}

function placePlatforms(){
    allPlatforms = [];
    platform = {
        img: safePlatforms[0],
        x: canvasWidth/2,
        y: canvasHeight-50,
        width: platformWidth,
        height: platformHeight
    }

    allPlatforms.push(platform);
}


 

