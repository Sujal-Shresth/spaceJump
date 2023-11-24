/*  SELECTION PAGE FUNCTIONALITIES */

// Control Audio Button
const audioButton = document.getElementById("musicControlSelectionPage");

// Bg Audio
const homeAudio = new Audio("./assets/homeAudio.mp3");
homeAudio.volume = 0.3;
homeAudio.loop = true;

// Checking status of playingAudio when user is redirected to selectionPage
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
const body = document.getElementById("blur-bg");
const backgrounds = [
    "./assets/cosmicCapital.png",
    "./assets/cosmicCity.jpg",
    "./assets/cosmicDoubleTower.png",
    "./assets/cosmicValley.png",
]

// Timer to change background images
setInterval(() => {
    body.style.backgroundImage = `url(${backgrounds[Math.floor(Math.random() * 4)]})`;
}, 5000);

// Array to store map Names
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

// Array to store steller Names
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

// pageContainer, divs containing maps, divs containing stellers and startGameButton
const selectionPageContainer = document.getElementById("selectionPageContainer");
const mapDivs = document.getElementsByClassName("map-info");
const stellerDivs = document.getElementsByClassName("steller-info");
const startGameButton = document.getElementById("startGameButton");

// Variables to store selected map and steller indices
var selectedMapIndex = null;
var selectedStellerIndex = null;

// Using event delegation to select the maps and steller based on the dataset
selectionPageContainer.addEventListener("click", (e) => {
    if (e.target.dataset) {
        // If mapNumber data is present, select map
        if (e.target.dataset.mapnumber) {
            // Remove previous selections
            const selectedElements = document.querySelectorAll('.map-info');
            selectedElements.forEach((element) => {
                element.classList.remove('selected');
            });

            selectedMapIndex = e.target.dataset.mapnumber;
            mapDivs[selectedMapIndex].classList.add("selected");
        }

        // If stellerNumber data is present, select steller
        if (e.target.dataset.stellernumber) {
            // Remove previous selections
            const selectedElements = document.querySelectorAll('.steller-info');
            selectedElements.forEach((element) => {
                element.classList.remove('selected');
            });

            selectedStellerIndex = e.target.dataset.stellernumber;
            stellerDivs[selectedStellerIndex].classList.add("selected");
        }
    }
});

// Adding functionality to the startGameButton
startGameButton.addEventListener("click", () => {
    // First Map and Steller are selected as default if none are selected
    if (selectedMapIndex === null && selectedStellerIndex === null) {
        mapDivs[0].classList.add("selected");
        stellerDivs[0].classList.add("selected");
        selectedMapIndex = 0;
        selectedStellerIndex = 0;
    }

    else if (selectedMapIndex === null) {
        mapDivs[0].classList.add("selected");
        selectedMapIndex = 0;
    }

    else if (selectedStellerIndex === null) {
        stellerDivs[0].classList.add("selected");
        selectedStellerIndex = 0;
    }

    // If both are selected redirect to gamePage and send mapName and stellerName through URL
    else {
        location.href = "./gamePage.html?map=" + maps[selectedMapIndex].name + "&steller=" + stellers[selectedStellerIndex].name;
    }
})