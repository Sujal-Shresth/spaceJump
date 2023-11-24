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

const startGameButton = document.getElementById("startGameButton");
const user = document.getElementById("userName");
const nickName = document.getElementById("nickName");
var boxShadowValue = "2px 2px 10px 1px rgba(248, 113, 98, 0.659)";

function removeBoxShadow(element) {
    element.style.boxShadow = "none";
}

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

startGameButton.addEventListener("click", () => {
    if(user.value && nickName.value){
        location.href = "./selectionPage.html"
        localStorage.setItem('user', user.value);
        localStorage.setItem(`nickNameFor${user.value.split(' ').join('')}`, nickName.value);
    }
    else if(!user.value && !nickName.value){
        nickName.style.boxShadow = boxShadowValue;
        user.style.boxShadow = boxShadowValue;
    }
    else if(!user.value){
        user.style.boxShadow = boxShadowValue;
    }
    else if(!nickName.value){
        nickName.style.boxShadow = boxShadowValue;
    }
})

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