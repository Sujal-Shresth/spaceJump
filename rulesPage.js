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
    if(e.target.classList.contains("button")){
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