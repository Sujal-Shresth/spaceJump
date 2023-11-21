const startGameButton = document.getElementById("startGameButton");
const userName = document.getElementById("userName");
const nickName = document.getElementById("nickName");
var boxShadowValue = "2px 2px 10px 1px rgba(248, 113, 98, 0.659)";
function removeBoxShadow(element) {
    element.style.boxShadow = "none";
}

startGameButton.addEventListener("click", () => {
    if(userName.value && nickName.value){
        location.href = "./selectionPage.html"
    }
    else if(!userName.value && !nickName.value){
        nickName.style.boxShadow = boxShadowValue;
        userName.style.boxShadow = boxShadowValue;
    }
    else if(!userName.value){
        userName.style.boxShadow = boxShadowValue;
    }
    else if(!nickName.value){
        nickName.style.boxShadow = boxShadowValue;
    }
})

userName.addEventListener("input", () => {
    if (userName.value) {
        removeBoxShadow(userName);
    }
});

nickName.addEventListener("input", () => {
    if (nickName.value) {
        removeBoxShadow(nickName);
    }
});