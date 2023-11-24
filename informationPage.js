/*  INFORMATION PAGE FUNCTIONALITIES */

// Control Audio Button
const audioButton = document.getElementById("musicControl");

// Bg Audio
const homeAudio = new Audio("./assets/homeAudio.mp3");
homeAudio.volume = 0.3;
homeAudio.loop = true;

// Checking status of playingAudio when user is redirected to informationPage
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

// Button to start game
const startGameButton = document.getElementById("startGameButton");

// User name Input fields
const user = document.getElementById("userName");
const nickName = document.getElementById("nickName");

var boxShadowValue = "2px 2px 10px 1px rgba(248, 113, 98, 0.659)";

// Clicking on startGameButton redirects the user to sectioPage
startGameButton.addEventListener("click", () => {
    if (user.value && nickName.value) {
        location.href = "./selectionPage.html"
        localStorage.setItem('user', user.value);
        localStorage.setItem(`nickNameFor${user.value.split(' ').join('')}`, nickName.value);
    }

    else if (!user.value && !nickName.value) {
        nickName.style.boxShadow = boxShadowValue;
        nickName.placeholder = "YOUR NICK NAME!!";
        user.style.boxShadow = boxShadowValue;
        user.placeholder = "YOUR NAME!!";
    }

    else if (!user.value) {
        user.style.boxShadow = boxShadowValue;
        nickName.placeholder = "YOUR NAME!!";
    }

    else if (!nickName.value) {
        nickName.style.boxShadow = boxShadowValue;
        nickName.placeholder = "YOUR NICK NAME!!";
    }
})


// Adding "input" event listeners on input fields to remove box-shadow
user.addEventListener("input", () => {
    if (user.value) {
        removeBoxShadow(user);
    }
});

nickName.addEventListener("input", () => {
    if (nickName.value) {
        removeBoxShadow(nickName);
    }
});

// Function to remove boxShadow
function removeBoxShadow(element) {
    element.style.boxShadow = "none";
}