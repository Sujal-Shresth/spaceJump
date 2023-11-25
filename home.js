/*  HOME PAGE FUNCTIONALITIES */

// Checking whether url parameter contains reEntry parameter or not 
// If it does, It means the user was directed to homePage from gameOver Page  
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
var reEntry = urlParams.get("reEntry");

// bg audio
const homeAudio = new Audio("./assets/homeAudio.mp3");
homeAudio.volume = 0.3;
homeAudio.loop = true;

var playingAudio;
const audioButton = document.getElementById("musicControl");

// If  url contains "reEntry" parameter, check local storage for status of music playing 
if (reEntry === "yes") {
    playingAudio = parseInt(localStorage.getItem("playingMusic"));
    if (playingAudio === 1) {
        homeAudio.play();
        audioButton.style.textDecoration = "none";
    }
}

else {
    localStorage.setItem("playingMusic", 0);
    playingAudio = 0;
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

// array of url for backGround images
const body = document.getElementById("body");
const backgrounds = [
    "./assets/cosmicCapital.png",
    "./assets/cosmicCity.jpg",
    "./assets/cosmicDoubleTower.png",
    "./assets/cosmicValley.png",
];

// timer for changing backGround images
setInterval(() => {
    body.style.backgroundImage = `url(${backgrounds[Math.floor(Math.random() * 4)]
        })`;
}, 5000);

// rulePage and startGame buttons
const ruleButton = document.getElementById("ruleButton");
const startGameButton = document.getElementById("startGameButton");

// clicking on rules button redirects to rulesPage
ruleButton.addEventListener("click", () => {
    location.href = "./rulesPage.html";
});

// clicking on startGameGutton redirects to informationPage
startGameButton.addEventListener("click", () => {
    // If old player, go to welcome Page
    if (localStorage.getItem("user")) {
        location.href = "./savedUserNamePage.html";
    }
    else {
        location.href = "./informationPage.html";
    }
});
