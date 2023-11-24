const maps = [
    {
        name: "cosmicCapital"
    },
    {
        name: "cosmicDoubleTower"
    },
    {
        name: "cosmicValley"
    }
];

const stellers = [
    {
        name: "avatar"
    },
    {
        name: "cosmicTwins"
    },
    {
        name: "jester"
    },
    {
        name: "cosmic"
    },
    {
        name: "prism"
    }
];

const selectionPageContainer = document.getElementById("selectionPageContainer");
const mapDivs = document.getElementsByClassName("map-info");
const stellerDivs = document.getElementsByClassName("steller-info");
const startGameButton = document.getElementById("startGameButton");

const body = document.getElementById("blur-bg");
const backgrounds = [
    "./assets/cosmicCapital.png",
    "./assets/cosmicCity.jpg",
    "./assets/cosmicDoubleTower.png",
    "./assets/cosmicValley.png",
]

setInterval(() => {
    body.style.backgroundImage = `url(${backgrounds[Math.floor(Math.random()*4)]})`;
}, 5000);

var selectedMapIndex = null;
var selectedStellerIndex = null;
selectionPageContainer.addEventListener("click", (e) => {
    if (e.target.dataset) {
        if (e.target.dataset.mapnumber) {
            const selectedElements = document.querySelectorAll('.map-info');
            selectedElements.forEach((element) => {
            element.classList.remove('selected');
            });
            selectedMapIndex = e.target.dataset.mapnumber;
            mapDivs[selectedMapIndex].classList.add("selected");
        }

        if (e.target.dataset.stellernumber) {
            const selectedElements = document.querySelectorAll('.steller-info');
            selectedElements.forEach((element) => {
            element.classList.remove('selected');
            });
            selectedStellerIndex = e.target.dataset.stellernumber;
            stellerDivs[selectedStellerIndex].classList.add("selected");
        }
    }
});



startGameButton.addEventListener("click", () =>{
    if(selectedMapIndex === null && selectedStellerIndex === null){
            mapDivs[0].classList.add("selected");
            stellerDivs[0].classList.add("selected");
            selectedMapIndex = 0;
            selectedStellerIndex = 0;
    }
    else if(selectedMapIndex === null){
        mapDivs[0].classList.add("selected");
        selectedMapIndex = 0;
    }
    else if(selectedStellerIndex === null){
        stellerDivs[0].classList.add("selected");
        selectedStellerIndex = 0;
    }
    else{
        location.href = "./gamePage.html?map=" + maps[selectedMapIndex].name+"&steller="+stellers[selectedStellerIndex].name;
        console.log(selectedMapIndex+" "+selectedStellerIndex)
    }
})