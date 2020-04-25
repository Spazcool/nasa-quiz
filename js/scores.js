function showScoreBoard(){
    // TODO CARD THAT SLIDES INTO VIEW
    document.querySelector("#scoreBoard").style.display = 'block';
    // TODO FADES

    let lastScoresElement = document.querySelector("#lastScores");
    let localSaves = JSON.parse(localStorage.getItem("lastScores"));
    lastScoresElement.innerHTML = '';

    localSaves.sort((a, b) => b.value - a.value);

    localSaves.forEach((score) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${score.name}: ${score.value}`;
        lastScoresElement.appendChild(listItem);
    });
}

$(document).ready(
    showScoreBoard()
)