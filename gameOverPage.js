/*  GAME-OVER PAGE FUNCTIONALITIES */

// Control Audio Button
const audioButton = document.getElementById("musicControlGamePage");

//  Death audio and Bg Audio
const deathSound = new Audio("./assets/deathSound.mp3");
deathSound.volume = 0.3;
const gameAudio = new Audio("./assets/gameAudio.mp3");
gameAudio.volume = 0.3;
gameAudio.loop = true

// Checking status of playingAudio when user is redirected to selectionPage
var playingAudio = parseInt(localStorage.getItem("playingMusic"));

if (playingAudio === 1) {
    deathSound.play();
}

// Continue playing the background audio on death sound pause
deathSound.addEventListener("pause", () => {
    if (playingAudio === 1) gameAudio.play();
})

// Function to generate random function excluding upperLimit
function randomNumber(lowerLimit, upperLimit) {
    lowerLimit = Math.ceil(lowerLimit);
    upperLimit = Math.floor(upperLimit);
    return Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
}

// Array storing the Remarks
const remarks = [
    "greedier than an average steller. GREAT!!",
    "not bad. Be greedier!!",
    "Great! The greedier, the better!",
    "the greedier your are, the more you get!!!",
    "New High Score!! GREEDY!!"
]

// Divs for finalScore, userNickname
const finalScore = document.getElementById("finalScore");
const userNickname = document.getElementById("userNickname");

// PlayAgain, Home and ChooseSteller Button
const startAgainButton = document.getElementById("playAgainButton");
const homeButton = document.getElementById("homeButton");
const chooseStellerButton = document.getElementById("choose");

let userName = localStorage.getItem("user");

// If user beats HighScore, show New HighScore
if (localStorage.getItem("score") === localStorage.getItem("highScore")) {
    userNickname.innerText = `${localStorage.getItem(`nickNameFor${userName.split(' ').join('')}`)}, ${remarks[4]}`;
}
// Else show random remarks
else {
    userNickname.innerText = `${localStorage.getItem(`nickNameFor${userName.split(' ').join('')}`)}, ${remarks[randomNumber(0, 4)]}`;
}

finalScore.innerText = localStorage.getItem("score");

// Making the Buttons Functional
startAgainButton.addEventListener('click', () => {
    // Passing mapName and stellerName to gamePage through URL
    const urlParams = new URLSearchParams(window.location.search);
    location.href = "./gamePage.html?map=" + urlParams.get("map") + "&steller=" + urlParams.get("steller");
})

homeButton.addEventListener('click', () => {
    // Passing the parameter "reEntry" to indicate that user was redirected from gameOverPage
    location.href = "./index.html?reEntry=yes";
})

chooseStellerButton.addEventListener("click", () => {
    location.href = "./selectionPage.html";
})