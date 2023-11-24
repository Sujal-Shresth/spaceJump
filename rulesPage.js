var playingAudio = parseInt(localStorage.getItem("playingMusic"));
const audioButton = document.getElementById("musicControl");

const homeAudio = new Audio("./assets/homeAudio.mp3");
homeAudio.volume = 0.3;
homeAudio.loop = true;

if(playingAudio === 1) homeAudio.play();
else audioButton.style.textDecoration = "line-through";

audioButton.addEventListener("click", () => {
    if(playingAudio === 1){
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
}
});

const rules = document.getElementsByClassName("rule-div");
var ruleNumber = 0;

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

document.addEventListener("click", (e) => {
    if(e.target.classList.contains("button") && e.target.classList.contains("next")){
        if(ruleNumber === 4 ){
            location.href = "./informationPage.html";
        }
        else{
            rules[ruleNumber].style.display = "none";
            ruleNumber++;
            rules[ruleNumber].style.display = "flex";
        }  
    }
})