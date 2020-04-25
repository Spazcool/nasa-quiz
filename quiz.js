
let questionBoxElement = document.querySelector("#questionBox");
let questions;
let score;
let timeleft;
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

    if(event.target.attributes[2].value == questions[qid].answer){
        score++;
        questions[qid].answered = true;
    }else{
        timeleft = timeleft - 10; 
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
    let btnStyles = ['btn-primary', 'btn-warning', 'btn-secondary', 'btn-success', 'btn-danger', 'btn-info'];

    questionBoxElement.textContent = questions[id].question;
    questionBoxElement.setAttribute("data-id", id);

    document.querySelector(".answerBox").innerHTML = '';

    questions[id]['options'].forEach((option, i) => {
        let btn = document.createElement('button');
        btn.textContent = option.toUpperCase();
        btn.type = 'button';
        btn.className = `btn ${btnStyles[Math.floor(Math.random() * 6)]}`;
        btn.setAttribute("data-id", option);
        document.querySelector(".answerBox").append(btn);
    })
}

function showScoreBoard(){
    document.querySelector("#scoreBoard").style.display = 'block';
    document.querySelector("#questionCard").style.display = 'none';
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
    score = 0;
    timeleft = 300;
    document.querySelector("#scoreBoard").style.display = 'none';
    document.querySelector("#gameBoard").style.display = 'none';
    document.querySelector("#questionCard").style.display = 'block';

    // GRAB QUESTIONS FROM JSONBIN
    fetch("https://api.jsonbin.io/b/5ea317591299b937423572d9", {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            "Secret-Key" : "$2b$10$g981kUQ7MZIS49KXZItHRe3djZN8boGzSrrSemBVUTAYSRGt.X4Aa"
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        questions = data.questions;
    }).then(() => {
        nextQuestion(0)
        startcountdown()
    })
}

document.querySelector("#playAgain").addEventListener('click', startGame);
document.querySelector("#startGame").addEventListener('click', startGame);
document.querySelector(".answerBox").addEventListener('click', checkAnswer);
document.querySelector("#enterInitials").addEventListener('click', (e) => {
    addScoreToBoard();
    document.querySelector("#enterInitials").style.display = 'none';
    document.querySelector("#playAgain").style.display = 'block';
});

// todo fades between cards
// document.querySelector("#startGame").addEventListener('click', function(){
    // $("#gameBoard").fadeOut("slow").animate({"margin-right": '+=200'}, "slow" );
//     $("#gameBoard").slideDown(500, function(){
//         alert('helo');
//     })
// });

// todo hide card momentarily to view background image
// document.querySelector(".hideCard").addEventListener("click", (e) => {
    // console.log(e.target);
    // $(this).parent().fadeOut("slow").fadeIn("slow");
// })

// TODO enter key is being a bitch
document.querySelector("#enterInitials").addEventListener('submit', (e) => {
    console.log(e)
    if(e.keyCode === 13){
        addScoreToBoard();
        e.target.setAttribute("disabled", "disabled");
    }
});


// TODO / nice to haves
// * store in db results
// * fades or slide effects as cards swap
// hide card button, to view the background
// info on background image

