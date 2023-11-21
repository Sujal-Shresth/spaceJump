const rules = document.getElementsByClassName("rule-div");
var ruleNumber = 0;

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