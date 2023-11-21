const ruleButton = document.getElementById("ruleButton");
const startGameButton = document.getElementById("startGameButton");
// const homeAudio = new Audio("./assets/homeAudio.mp3");

// homeAudio.volume = 0.3;
// homeAudio.loop = true;
// homeAudio.play();
// var playingAudio = true;

// function playMusic(){
//     if(playingAudio){
//         homeAudio.pause();
//         document.getElementById("musicControl").style.textDecoration = "line-through";
//         playingAudio = false;
//     }
//     else{
//         homeAudio.play();
//         document.getElementById("musicControl").style.textDecoration = "none";
//         playingAudio = true;
//     }
// }
ruleButton.addEventListener("click", () =>{
    location.href = "./rulesPage.html";
})

startGameButton.addEventListener("click", () =>{
    location.href = "./informationPage.html";
})