/*  RULES PAGE FUNCTIONALITIES */

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

// Array storing divs containing the rules
const rules = document.getElementsByClassName("rule-div");

// Variable to keep track of rule number
var ruleNumber = 0;

// Using event delegation to change the rule being displayed
document.addEventListener("click", (e) => {
    // If button contains "next" class, display next rule
    if (e.target.classList.contains("next")) {
        if (ruleNumber === 4) {
            // If old player, go to welcome Page
            if (localStorage.getItem("user")) {
                location.href = "./savedUserNamePage.html";
            }
            else {
                location.href = "./informationPage.html";
            }
        }
        else {
            rules[ruleNumber].style.display = "none";
            ruleNumber++;
            rules[ruleNumber].style.display = "flex";
        }
    }

    // If button contains "previous" class, display previous rule
    if (e.target.classList.contains("previous")) {
        if (ruleNumber != 0) {
            rules[ruleNumber].style.display = "none";
            ruleNumber--;
            rules[ruleNumber].style.display = "flex";
        }
    }
})