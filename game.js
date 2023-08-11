var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChoosenColor;
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keydown(function () {
    if (started === false) {
        started = true;
        nextSequence();
    }
});


function nextSequence() {
    level++;
    userClickedPattern = [];
    var randomNumber = (Math.floor(Math.random() * 4));
    randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("h1").text("Level " + level);
    $("#" + randomChoosenColor).delay(100).fadeOut().fadeIn('slow');
    playSound(randomChoosenColor);
}


$(".btn").click(function () {
    var userChoosenColor = this.id;
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100)
}


function playSound(colorSelected) {
    var audio = new Audio("./sounds/" + colorSelected + ".mp3");
    audio.play();
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    }
    else {
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("wrong");
    }
}

function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
}