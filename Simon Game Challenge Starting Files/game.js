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

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function. 
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    if (started === false) {
        $("h1").text("GAME NOT STARTED YET 🚫🎮, Press Any Key to Restart "); // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the sequence wrong.
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
     
        console.log("GAME NOT STARTED YET 🚫🎮"); // Log when the game hasn't started yet
        return;
    } else {
        userClickedPattern.push(userChosenColour);
    }
    console.log("User clicked pattern: ", userClickedPattern); // Log the user clicked pattern

    playSound(userChosenColour);
    animatePress(userChosenColour);
});

function nextSequence() {
    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    // Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("GAME STARTED ✅\n Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Use jQuery to animate a flash to the button selected
    playSound(randomChosenColour);
}

function playSound(name) {
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




