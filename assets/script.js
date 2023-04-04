
var startQuizBtn = document.querySelector('#startQuiz');
var globalTimer = document.querySelector('#timeRemaining');
var scoreDisplay = document.querySelector('#scoreValue');
var optionsDisplay = document.querySelector('#optionsList');
var gameOverText = document.querySelector('#gameOver');
var submitScoreBtn = document.querySelector('#submitScore');
var questionVar = document.querySelector('#question');
var option1Var = document.querySelector('#option1');
var option2Var = document.querySelector('#option2');
var option3Var = document.querySelector('#option3');
var option4Var = document.querySelector('#option4');
var feedbackVar = document.querySelector('#answerfeedback');
var initials = document.querySelector("#initals");
var submitRecord = document.querySelector("#submitRecord");
var highScore1 = document.querySelector("#highScore1");
var highScore2 = document.querySelector("#highScore2");
var highScore3 = document.querySelector("#highScore3");
var highScore4 = document.querySelector("#highScore4");
var highScore5 = document.querySelector("#highScore5");
var clearScoresBtn = document.querySelector("#clearRecord");
var toggleScores = document.querySelector("#srcHighScores");
var scoreHeader = document.querySelector("#scoreHeader");
var optionsBox = document.querySelector('#optionsBox');
var playAgainBtn = document.querySelector('#playAgain')

var feedBackDisplay;
var quizAnswer;
var timeRemaining;
var score = 0;
var timeOut = false;
var highScores = [];
var newScore;
var toggle = "hide"
const quizQuestions = [
    [
        "Which of these is a Boolean value?",
        ["123", "A scary place to rest", "True", "A string"],
        "option3"
    ],

    [
        "What is DOM stand for in JavaScript?",
        ["Document Object Model ", "Distributed Order Management", "Dissolved Organic Matter", "Design Out Maintenance"],
        "option1"
    ],
    [
        "What does the '===' operator mean?",
        ["Equals", "Strick Equals", "Not Equal to", "Greater than"],
        "option2"
    ],
    [
        "Which of these is a String?",
        ["789", "false", "A piece of fabric", "'JavaScript is fun'"],
        "option4"
    ],
    [
        "What does the '+=' operator do?",
        ["Takes the existing value and adds to it", "Takes the existing value and subtracts from it", "Short hand for a loop", "Makes the values equal"],
        "option1"
    ],
    [
        "What does the '&&' operator mean?",
        ["Means all values much match", "Mean only 1 values needs to match", "Means no values need to match", "Values will concatenate text together"],
        "option1"
    ],
    
];

//Event Listeners 
startQuizBtn.addEventListener("click", playGame);

clearScoresBtn.addEventListener("click", clearScores);

function clearScores(event) {
    localStorage.removeItem("allTimeHighScores");
}

//Event Listener to submit score button Click 
submitScoreBtn.addEventListener("click", recordKeeping);
submitRecord.addEventListener("click", submitHighScore);
toggleScores.addEventListener("click", toggleHS);
playAgainBtn.addEventListener("click", playAgain);


function toggleHS() {
    recordKeeping();
    if (toggle === "hide") {
        console.log("toggleHS-hide has run");
        toggle = "show";
        console.log(toggle);
        mainScoreBox.style.visibility = 'visible';
    } else if (toggle === "show") {
        console.log("toggleHS-show has run");
        toggle = "hide";
        mainScoreBox.style.visibility = 'hidden';
    }
}

function recordKeeping() {
    console.log("recordKeeping function has been triggered.");
    // unhide Highscore DIV
    mainScoreBox.style.visibility = 'visible';
    highScores = JSON.parse(localStorage.getItem("allTimeHighScores"));
    console.log(highScores);
    if (highScores === null) {
        return;
    };
    //Update Display elements for highscores 
    
    if (highScores.length > 0) {
        highScore1.textContent = (highScores[0][0] + " - " + highScores[0][1]);
    };

    if (highScores.length > 1) {
        highScore2.textContent = (highScores[1][0] + " - " + highScores[1][1]);
    };

    if (highScores.length > 2) {
        highScore3.textContent = (highScores[2][0] + " - " + highScores[2][1]);
    };

    if (highScores.length > 3) {
        highScore4.textContent = (highScores[3][0] + " - " + highScores[3][1]);
    };

    if (highScores.length > 4) {
        highScore5.textContent = (highScores[4][0] + " - " + highScores[4][1]);;
    };

};

//This is the function to submit the score which will perform field validation along with adding this to highScores array and local storage//
function submitHighScore(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("submitHighScore function has been triggered.");
    if (initials.value.length === 0) {
        window.alert("Enter intials then hit submit.");
        return;
    };
    newScore = [initials.value, score];
    if (highScores === null) {
        highScores = [newScore];
    } else {
        highScores.push(newScore);
    };
    console.log(highScores);
    localStorage.setItem("allTimeHighScores", JSON.stringify(highScores));
    recordKeeping();

};

//controls the timer 
function startTimer() {
    console.log("startTimer function has been triggered");
    timer = setInterval(function () {
        timeRemaining--;
        globalTimer.textContent = timeRemaining;
         
        if (timeRemaining <= 0) {
            clearInterval(timer);
            console.log("The timer is at 0, and time has been cleared")
            gameOver();
        };
    }, 1000);
};

function gameOver() {
    console.log("gameOver function has been triggered");
    clearInterval(timer);
    playAgainBtn.style.visibility = 'visible';
    optionsDisplay.style.display = 'none';
    submitScoreBtn.style.visibility = 'visible';
    submitScore.style.display = 'inline';
    feedBackDisplay = "";
    feedbackVar.textContent = feedBackDisplay;
    questionVar.textContent = "Game Over";
    score += (timeRemaining * 5);
    scoreHeader.textContent = "Final Score:";
    scoreDisplay.textContent = score;

    console.log("Final Score is: " + score);
    if (timeRemaining <= 0) {
        console.log("Ending Time remaining: " + timeRemaining);
        gameOverText.textContent = "Out of Time!";
    } else {
        gameOverText.textContent = "Congratulations! all the questions have been answered";
    };

};

function playAgain() {
    location.reload();
};

function playGame() {
    optionsDisplay.addEventListener("click", answerCheck);
    console.log("playGame function has been triggered");
    optionsDisplay.style.display = 'contents';
    startQuizBtn.style.display = 'none';
    submitScoreBtn.style.visibility = 'hidden';
    console.log("Number of questions in the quizQuestions pool is: " + quizQuestions.length);
    var askedQuestions = '';
    timeRemaining = 10;
    globalTimer.textContent = timeRemaining;
    startTimer();
    questionHandling();
};

function questionHandling() {
    console.log("Number of questions left in the quizQuestions pool is: " + quizQuestions.length);
    if (quizQuestions < 1) {
        console.log("Have run out of questions.");
        gameOver();
        return;
    };

    // gives a random number
    console.log("questionHandling function has been triggered");
    var randomNum = Math.floor(Math.random() * quizQuestions.length);

    // based on the random number generated gives the player different questions
    var questionDisplay = quizQuestions[randomNum][0];
    questionVar.textContent = questionDisplay;

    var option1Display = quizQuestions[randomNum][1][0];
    option1Var.textContent = option1Display;
    var option2Display = quizQuestions[randomNum][1][1];
    option2Var.textContent = option2Display;
    var option3Display = quizQuestions[randomNum][1][2];
    option3Var.textContent = option3Display;
    var option4Display = quizQuestions[randomNum][1][3];
    option4Var.textContent = option4Display;

    quizAnswer = quizQuestions[randomNum][2];
    console.log("The answer is: " + quizAnswer);

    //Splicing to prevent question repeats 
    quizQuestions.splice(randomNum, 1);
};

function answerCheck(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("answerCheck function has been triggered");
    var clickedElement = event.target.id;
    console.log("Clicked Option was: " + clickedElement);
    console.log("Correct answer was: " + quizAnswer);

    if (clickedElement === quizAnswer) {
        console.log("+++++Right Answer was clicked+++++");
        timeRemaining += 10;
        globalTimer.textContent = timeRemaining;
        score += 25;
        console.log("Score is now: " + score);
        scoreDisplay.textContent = score;
        feedBackDisplay = "Great job!!! you get 10 seconds for the correct answer!!";
        feedbackVar.textContent = feedBackDisplay;
        questionHandling();
    } else {
        console.log("-----wrong answer was clicked-----");
        timeRemaining -= 10;
        globalTimer.textContent = timeRemaining;
        feedBackDisplay = "Wrong answer!, you've lost 10 seconds. Good luck next time!! ";
        feedbackVar.textContent = feedBackDisplay;
        questionHandling();
    };

};