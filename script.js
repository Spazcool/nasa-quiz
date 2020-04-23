// let finalScoreElement = document.querySelector("#finalScore");
// let gameScoreElement = document.querySelector("#gameScore");
// let lastScoresElement = document.querySelector("#lastScores");
// let timerElement = document.querySelector("#timer");
// let scoreboardElement = document.querySelector("#scoreboard");
let questions = [
    {question: 'milk is good?', answer: 'yes', answered: null, options: ['yes', 'no']}, 
    {question: 'cheese is good?', answer: 'yes', answered: null, options: ['yes', 'no', 'maybe']}, 
    {question: 'meat is good?', answer: 'maybe', answered: null, options: ['yes', 'no', 'maybe']}
];
let questionBoxElement = document.querySelector("#questionBox");
let score = 0;
let timeleft = 600;
let timerObj;

function addScoreToBoard(){
    let lastScoresElement = document.querySelector("#lastScores");
    let localSaves = JSON.parse(localStorage.getItem("lastScores"));
    lastScoresElement.innerHTML = '';
    // FIRST ENTRY? REDEFINE localSaves FROM null TO AN ARRAY
    if(!localSaves){
        localSaves = [];
    }
    // DON'T ALLOW MORE THAN 10 SAVES
    if(localSaves.length >= 10){
        localSaves.pop();
    }
    // ONLY PUSH TO ARRAY IF THERE'S A NAME VALUE
    if(document.querySelector("#nameInput").value){
        localSaves.push({name: document.querySelector("#nameInput").value, value: score});
    }
    localSaves.sort((a, b) => b.value - a.value);

    localSaves.forEach((score) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${score.name}: ${score.value}`;
        lastScoresElement.appendChild(listItem);
    });
    localStorage.setItem("lastScores", JSON.stringify(localSaves));
}

function checkAnswer(event){
    let qid = parseInt(questionBoxElement.attributes["data-id"].value);

    if(event.target.attributes[1].value == questions[qid].answer){
        score++;
        questions[qid].answered = true;
    }else{
        timeleft = timeleft - 100; 
        questions[qid].answered = false;
    }

    if(!gameOver((qid + 1))){
        nextQuestion((qid + 1));
    }else{
        showScoreBoard()
    }
}

function gameOver(nextQuestionIndex){
    if(timeleft <= 0 || questions.length == nextQuestionIndex){
        // STOP TIMER
        clearInterval(timerObj);
        return true;
    }
    return false;
}

function nextQuestion(id){
    questionBoxElement.textContent = questions[id].question;
    questionBoxElement.setAttribute("data-id", id);

    document.querySelector(".answerBox").innerHTML = '';

    questions[id]['options'].forEach((option) => {
        let btn = document.createElement('button');
        btn.textContent = option;
        btn.type = 'button';
        btn.setAttribute("data-id", option);
        document.querySelector(".answerBox").append(btn);
    })
}

function showScoreBoard(){
    // TODO CARD THAT SLIDES INTO VIEW
    document.querySelector("#scoreBoard").style.display = 'block';
    document.querySelector("#questionCard").style.display = 'none';
    // TODO FADES
    document.querySelector("#finalScore").textContent = score;

    addScoreToBoard()
}

function startcountdown() {
    timerObj = setInterval(function() {
        timeleft--;
        document.querySelector("#timer").innerHTML = timeleft;
    }, 1000);
}

function startGame(){
    document.querySelector("#gameBoard").style.display = 'none';
    document.querySelector("#questionCard").style.display = 'block';

    nextQuestion(0)
    startcountdown()
}

document.querySelector("#startGame").addEventListener('click', startGame);
document.querySelector(".answerBox").addEventListener('click', checkAnswer);
document.querySelector("#enterInitials").addEventListener('click', (e) => {
    addScoreToBoard();
    e.target.setAttribute("disabled", "disabled");
});

// todo enter key is being a bitch
document.querySelector("#enterInitials").addEventListener('submit', (e) => {
    console.log(e)
    if(e.keyCode === 13){
        addScoreToBoard();
        e.target.setAttribute("disabled", "disabled");
    }
});

// TODO / nice to haves
// * store in db
// * restart quiz
// * email results?
// * fades or slide effects as cards swap

