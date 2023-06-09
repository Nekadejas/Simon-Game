var buttonColors = ["red", "blue", "green","yellow"]
var playerSequence =[];
var gameSequence = [];
var level = 0;
var ifStarted = false;

$(document).keydown(function (e) { 
    if(ifStarted === false){
        nextSequence();
        ifStarted = true;
    }
});

$(".btn").click(function (e) { 
    if(ifStarted === false){
        setTimeout(nextSequence,300);
        ifStarted = true;
        return;
    }
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
    changeLevel(level);
    level++;

}

function blinkButton(nextBtn){
    playSound(nextBtn)
    $("."+nextBtn).addClass('pressed');
    setTimeout(function(){
        $("."+nextBtn).removeClass('pressed');
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
            result = true;
        }
        else{
            result = false;
        }
    }
    if(result === false){
        console.log("bad");
        gameOver();
        resetSequence(playerSqn);
        resetGame(gameSqn)
    }
    else if(result === true && gameSqn.length === playerSqn.length){
        console.log("good");
        setTimeout(nextSequence, 1000);
        resetSequence(playerSqn);
    }
}
function resetSequence(playerSqn){
    playerSqn.length = 0;
}
function changeLevel(lvl){
    $("h1").text(lvl + " Level");
}
function resetGame(gameSqn, lvl){
    gameSqn.length = 0;
    level = 0;
    $("h1").text("Game Over. Press Any Key to Start");
    ifStarted = false;
}
function gameOver(){
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },400)
}