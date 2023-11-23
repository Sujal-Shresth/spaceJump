const steller = document.getElementById("steller");
var stellerLeft;
var stellerRight;

var aboveMiddleEvent = new Event('aboveMiddle');
document.dispatchEvent(aboveMiddleEvent);

setInterval(checkMiddle, 100);

function checkMiddle(){
    var stellerRect = steller.getBoundingClientRect();
    var middleOfViewport = window.innerHeight / 2;

    if (stellerRect.top < middleOfViewport)v {
      document.dispatchEvent(aboveMiddleEvent);
    }
}

document.addEventListener('aboveMiddle', function() {
    console.log('Steller div is above the middle of the viewport!');
});

var img = [
    "./assets/vector.png",
    "./assets/vectorRev.png"
]
setInterval(() => {
    stellerBottom = parseFloat(window.getComputedStyle(steller).bottom);
    console.log(stellerLeft)
    stellerBottom -= 1;
    steller.style.bottom = stellerBottom + 'px';
},10)
document.addEventListener("keydown", (e) => {
    if(e.code === "ArrowLeft"){
        steller.setAttribute("src", img[0]);
        stellerLeft = parseFloat(window.getComputedStyle(steller).left);
        console.log(stellerLeft)
        stellerLeft -= 50;
        steller.style.left = stellerLeft + 'px';
    }
    else if(e.code === "ArrowRight"){
        steller.setAttribute("src", img[1]); 
        stellerLeft = parseFloat(window.getComputedStyle(steller).left);
        console.log(stellerLeft)
        stellerLeft += 50;
        steller.style.left = stellerLeft + 'px';
    }
    else if(e.code === "Space"){
        stellerBottom = parseFloat(window.getComputedStyle(steller).bottom);
        console.log(stellerLeft)
        stellerBottom += 100;
        steller.style.bottom = stellerBottom + 'px';
    }
    else if(e.code === "ArrowDown"){
        stellerBottom = parseFloat(window.getComputedStyle(steller).bottom);
        console.log(stellerLeft)
        stellerBottom -= 100;
        steller.style.bottom = stellerBottom + 'px';
    }
})


