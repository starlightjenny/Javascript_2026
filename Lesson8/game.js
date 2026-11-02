/* Variables to keep track of the current question, score, and user results */
var count = 0;   
var score = 0;              
var user_results = [];     

/* Question Multi-dimensional array */
var questions = [
    ["What is the capital of France?", 1, "London", "Paris", "Berlin"],
    ["What is 2 + 2?", 1, "3", "4", "5"],
    ["What is the largest planet in our solar system?", 1, "Mars", "Jupiter", "Saturn"]
];

document.getElementById('prompt').innerHTML =
    "<button type='button' onClick='playGame()'>Play Game</button>";

/* Function to start the game and display the first question */
function playGame() {
    document.getElementById('question').innerHTML = questions[count][0];
    questions[count].shift();
    var correctIndex = questions[count][0];
    questions[count].shift();


    

    // Make each list item with a nested link.
    var answerList = '';
    for (var index = 0; index < questions[count].length; index++) {
        answerList += "<li onClick='checkAnswer(" + index + ", " + correctIndex + ")'>" +
            "<a>" + questions[count][index] + "</a></li>";
    }

    // Post the answer list
    document.getElementById('answers').className = '';
    document.getElementById('answers').innerHTML = answerList;

    // Prompt the user to click the best answer
    document.getElementById('prompt').innerHTML = '<p>Click the best answer.</p>';

}
function checkAnswer(index, correctIndex) {
    var feedback;

    // Stop the answers from being clicked again
    var answerItems = document.getElementById('answers').getElementsByTagName('li');
    for (var i = 0; i < answerItems.length; i++) {
        answerItems[i].removeAttribute('onClick');
    }
    document.getElementById('answers').className = 'answered';

    if (index === correctIndex) {
        score++;
        user_results[count] = 'Correct';
        feedback = "<p class='right'>Correct!</p>";
    } else {
        user_results[count] = 'Incorrect';
        feedback = "<p class='wrong'>Incorrect. The correct answer was " +
            questions[count][correctIndex] + ".</p>";
    }


    // Move the counter to the next question
    count++;
    feedback += '<p>Score: ' + score + ' of ' + questions.length + '</p>';

    // Has the counter gone past the number of questions?
    if (count >= questions.length) {
        // Yes: the game is over, so load the Restart Game button
        document.getElementById('prompt').innerHTML = feedback +
            '<p>Game over! You got ' + score + ' out of ' + questions.length + ' correct.</p>' +
            "<button type='button' onClick='location.reload()'>Restart Game</button>";
    } else {
        // No: load the Play Game button to continue
        document.getElementById('prompt').innerHTML = feedback +
            "<button type='button' onClick='playGame()'>Play Game</button>";

        
    }
}