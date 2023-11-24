const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
const homeAudio = new Audio("./assets/homeAudio.mp3");
homeAudio.volume = 0.3;
homeAudio.loop = true;
var reEntry = urlParams.get("reEntry");

var playingAudio;
const audioButton = document.getElementById("musicControl");

if(reEntry === "yes"){
    playingAudio = parseInt(localStorage.getItem("playingMusic"));
    if(playingAudio === 1) {
    homeAudio.play();
    audioButton.style.textDecoration = "none";
}

}
else{
    localStorage.setItem("playingMusic", 0);
    playingAudio = 0;
}

console.log(playingAudio)


audioButton.addEventListener("click", () =>{if(playingAudio === 1){
    homeAudio.pause();
    homeAudio.currentTime = 0;
    audioButton.style.textDecoration = "line-through";
    localStorage.setItem("playingMusic", 0);
    playingAudio = 0;
}
else{
    homeAudio.play();
    audioButton.style.textDecoration = "none";
    localStorage.setItem("playingMusic", 1);
    playingAudio = 1;
}});

const ruleButton = document.getElementById("ruleButton");
const startGameButton = document.getElementById("startGameButton");

const body = document.getElementById("body");
const backgrounds = [
    "./assets/cosmicCapital.png",
    "./assets/cosmicCity.jpg",
    "./assets/cosmicDoubleTower.png",
    "./assets/cosmicValley.png",
]

setInterval(() => {
    body.style.backgroundImage = `url(${backgrounds[Math.floor(Math.random()*4)]})`;
}, 5000)

ruleButton.addEventListener("click", () =>{
    location.href = "./rulesPage.html";
})

startGameButton.addEventListener("click", () =>{
    location.href = "./informationPage.html";
})