var buttonColors = ["red", "blue", "green","yellow"]
var playerSequence =[];
var gameSequence = ["yellow"];


$(".btn").click(function (e) { 
    var clickId = e.target.id;
    blinkButton(clickId);
    playerSequence.push(clickId); 
    checkAnswer(playerSequence, gameSequence);
});







function nextSequence(){
    var randomNum = Math.floor(Math.random()*4)
    var nextButton = buttonColors[randomNum];
    blinkButton(nextButton);
    gameSequence.push(nextButton);

}

function blinkButton(nextBtn){
    playSound(nextBtn)
    $("."+nextBtn).addClass('pressed',1000);
    setTimeout(function(){
        $("."+nextBtn).removeClass('pressed',1000);
    }, 100);
}
function playSound(btn){
    var audio = new Audio("./sounds/"+btn+".mp3");
    audio.play();
}
function checkAnswer(playerSqn,gameSqn){
    let result;
    for (let i = 0; i < playerSqn.length; i++) {
        if(playerSqn[i] === gameSqn[i]){
            result= true;
        }
        else{
            result= false;
        }
    }
    if(result === true){
        console.log("good");
        playerSequence = [];
        setTimeout(nextSequence, 1000);
    }
    else{
        console.log("You lost");
    }
}
function resetSequence(){}