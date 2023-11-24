var playingAudio;
const audioButton = document.getElementById("musicControlGamePage");

if(localStorage.getItem("playingMusic") != null){
    playingAudio = parseInt(localStorage.getItem("playingMusic"));
}
const deathSound = new Audio("./assets/deathSound.mp3");
deathSound.volume = 0.3;
const gameAudio = new Audio("./assets/gameAudio.mp3");
gameAudio.volume = 0.3;
gameAudio.loop = true

if(playingAudio === 1) deathSound.play();
deathSound.addEventListener("pause", () => {
    if(playingAudio === 1) gameAudio.play();
})
const finalScore = document.getElementById("finalScore");
const userNickname = document.getElementById("userNickname");
const startAgainButton = document.getElementById("playAgainButton");
const homeButton = document.getElementById("homeButton");

const urlParams = new URLSearchParams(window.location.search);

let userName = localStorage.getItem("user");
console.log(userName);

userNickname.innerText = `${localStorage.getItem(`nickNameFor${userName.split(' ').join('')}`)}, Your Steller Died !!!`;

finalScore.innerText = localStorage.getItem("score");

startAgainButton.addEventListener('click', () => {
    location.href = "./gamePage.html?map="+urlParams.get("map")+"&steller="+urlParams.get("steller");
})

homeButton.addEventListener('click', () => {
    location.href = "./index.html?reEntry=yes";
})