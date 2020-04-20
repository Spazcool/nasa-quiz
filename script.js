let finalScoreElement = document.querySelector("#finalScore");
let gameScoreElement = document.querySelector("#gameScore");
let lastScores = [{name: 'Doug', value:10}, {name: 'Dan', value:1}, {name: 'Joe', value:8}];
let lastScoresElement = document.querySelector("#lastScores");
let questionBoxElement = document.querySelector("#questionBox");
let questions = [
    {question: 'milk is good?', answer: 'yes', answered: null, id: 0}, 
    {question: 'cheese is good?', answer: 'yes', answered: null, id: 1}, 
    {question: 'meat is good?', answer: 'yes', answered: null, id: 2}
];
let score = 0;
let scoreboardElement = document.querySelector("#scoreboard");
let timeleft = 600;
let timerElement = document.querySelector("#timer");
let timerObj;

function addScoreToBoard(){
    // add score to array/localstorage
    // pull array
    // sort by score
    // pop the lowest score if arr.length > 10
    // foreach the mofos to the screen
    
// scores chrnologically || highest to lowest
// lastScores.forEach((score) => {
//     let listItem = document.createElement('li');
//     listItem.innerHTML = `${score.name}: ${score.value}`;
//     lastScoresElement.appendChild(listItem);
// });

}

function checkAnswer(event){
    let qid = parseInt(questionBoxElement.attributes["data-id"].value);
    // THIS NEEDS TO BE MORE FLEXIBLE FOR MULITPLE CHOICE
    if(event.target.id == "yesBtn" && questions[qid].answer == 'yes' ||
        event.target.id == "noBtn" && questions[qid].answer == 'no'){
        score++;
        questions[qid].answered = true;
    }else{
        score--;
        timeleft = timeleft - 100; 
        questions[qid].answered = false;
    }

    if(!gameOver((qid + 1))){
        nextQuestion((qid + 1));
    }else{
        scoreBoard()
    }
}

function gameOver(nextQuestion){
    if(score <=0 || timeleft <=0 || questions.length == nextQuestion){
        // STOP TIMER
        clearInterval(timerObj);
        return true;
    }
    return false;
}

function nextQuestion(id){
    questionBoxElement.textContent = questions[id].question;
    questionBoxElement.setAttribute("data-id", questions[id].id);
}

function scoreBoard(){
    // TODO CARD THAT SLIDES INTO VIEW
    scoreboardElement.style.visibility = 'visible';
    // TODO FADES
    finalScoreElement.textContent = score;
    // todo scores chrnologically || highest to lowest
    lastScores.forEach((score) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `${score.name}: ${score.value}`;
        lastScoresElement.appendChild(listItem);
    });
// <div id="scoreboard" style="visibility: hidden;">
//     <ul id="scores">
//         <!-- high scores page 
//         add initials
//         list former initials & score
//         -->
//     </ul>
// </div>
}

//RUNS showcountdown EVERY SECOND
function startcountdown() {
    timerObj = setInterval(function() {
        timeleft--;
        timerElement.innerHTML = timeleft;
    }, 1000);
}

function startGame(){
    // hide start button
    nextQuestion(0)
    startcountdown()
}

document.querySelector("#startGame").addEventListener('click', startGame);
document.querySelector(".answerBox").addEventListener('click', checkAnswer);
document.querySelector("#enterInitials").addEventListener('click', addScoreToBoard);

// start button clicked
    // timer starts
    // display question

// question answered?
    // tally true/false
        // remove time from timer if false
    // dispaly next question

// question arr end? || timer = 0
    // game over
    // save resutls?
        // take initials
            // save initials and score together

// localStorage.setItem("name", value);
// localStorage.getItem("name");

