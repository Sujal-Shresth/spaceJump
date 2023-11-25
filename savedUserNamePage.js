/*  SAVED USER PAGE FUNCTIONALITIES */

// Control Audio Button
const audioButton = document.getElementById("musicControl");

// Bg Audio
const homeAudio = new Audio("./assets/homeAudio.mp3");
homeAudio.volume = 0.3;
homeAudio.loop = true;

// Checking status of playingAudio when user is redirected to rulesPage
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

// Array to store url for background Images
const body = document.getElementById("body");
const backgrounds = [
    "./assets/cosmicCapital.png",
    "./assets/cosmicCity.jpg",
    "./assets/cosmicDoubleTower.png",
    "./assets/cosmicValley.png",
]

// Timer to change background images
setInterval(() => {
    body.style.backgroundImage = `url(${backgrounds[Math.floor(Math.random() * 4)]})`;
}, 5000)

let userName = localStorage.getItem("user");
let nickName = localStorage.getItem(`nickNameFor${userName.split(' ').join('')}`);

const user = document.getElementById("userNickname");
const userNickName = document.getElementById("nickName");

user.innerText = nickName;
userNickName.innerText = nickName;

const introduceButton = document.getElementById("introduceButton");
const startGameButton = document.getElementById("startGameButton");

introduceButton.addEventListener("click", () => {
    location.href = "./informationPage.html";
})

startGameButton.addEventListener("click", () => {
    location.href = "./selectionPage.html"
})