var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function (event) {
    if (!started && (event.key)) {
        console.log("GAME STARTED ✅"); // Log when the game has started

        // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);

        nextSequence(); // Call nextSequence() when the game has started
        started = true; // The game has started
    }
});

$(document).on("keypress touchstart", function (event) { //mobile touch event
    if (!started) {
        console.log("GAME STARTED ✅"); // Log when the game has started

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function nextSequence() { // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    // Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("بدأت اللعبة ✅\n المستوى " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Use jQuery to animate a flash to the button selected
    playSound(randomChosenColour);
}

function playSound(name) {  // Use JavaScript to play the sound for the button colour selected in nextSequence()
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play().catch(function (error) {
        console.error("Error playing sound:", error);
    });
}

function animatePress(currentColor) { // Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColor).addClass("pressed"); // Add the pressed class to the button that gets clicked
    setTimeout(function () { // Remove the pressed class after a 100
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(function () { // Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
    var userChosenColour = $(this).attr("id");
    if (started === false) {
        $("h1").text("لم تبدأ اللعبة بعد 🚫🎮، اضغط على أي مفتاح لإعادة التشغيل "); // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the sequence wrong.
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        console.log("GAME NOT STARTED YET 🚫🎮"); // Log when the game hasn't started yet
        return;
    } else {
        userClickedPattern.push(userChosenColour);
    }
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1); // Call checkAnswer() after a user has clicked and chosen their answer
});

function checkAnswer(currentLevel) {
    // Check if the most recent user answer is the same as the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        // Check if the user has finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = []; // Reset the userClickedPattern to an empty array ready for the next level
            }, 1000);
        }
    } else {  // If the user got the sequence wrong
        console.log("WRONG SEQUENCE 🚫❌"); // Log when the user got the sequence wrong
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("خسرت اللعبة، اضغط على أي مفتاح لإعادة التشغيل");

        // Log the current state of the game variables
        console.log("Level: " + level);
        console.log("Game Pattern: " + gamePattern);
        console.log("Started: " + started);
        console.log("User Clicked Pattern: " + userClickedPattern);
        
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}



