function loadImg() {
    let baseUrl = 'https://api.nasa.gov/planetary/apod?'
    let key = 'evffvWkvE20YwQYQqknagdjGhb0FZjthYH0ETOTo';
    let date = randomDate(new Date(2012, 0, 1), new Date());
    let requestUrl = baseUrl + 'api_key=' + key + '&date=' + date;

    fetch(requestUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.media_type === "image" ? document.body.style.backgroundImage = `url(${data.hdurl})` : loadImg();  
        })
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0,10);
}

loadImg();