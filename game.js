var colors = ["red", "blue", "green", "yellow"]

var userClickedPattern = []
let gamePattern = []
var level = 0
var started = false

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
})


function startOver(){
  level=0
  gamePattern=[]
  started=false
  
}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    } else {
        playSound("wrong")

        $("body").addClass("game-over")

        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)

        $("#level-title").text("GAME Over, Press any key to restart")

        startOver()
    }
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass('pressed')

    setTimeout(function () {
        $('#' + currentColour).removeClass('pressed')
    }, 100)
}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}


function nextSequence() {

    userClickedPattern=[]

    level++

    $("#level-title").text("level " + level)

    let num = Math.floor(Math.random() * 4)
    let randomChosenColour = colors[num]

    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}


$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("level " + level)
        nextSequence()
        started = true
    }
})


