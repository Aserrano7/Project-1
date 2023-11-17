var apiKeyExcercise = "QzUuvPoamyqc5YGXvPJpCw==pAl5Dfme18ylrDTm";
var youtubeApiKey = 'AIzaSyDDYqEfq1mvd12w48fpvGHyqYxs-3CxCn0';
var urlArray = [];


var saveBtn = document.getElementById('saveButton');
saveBtn.addEventListener('click', function (event) {
    console.log("submit button clicked");
    event.preventDefault();
    urlArray = [];
    var url = 'https://api.api-ninjas.com/v1/exercises?';
    display.innerHTML = '';

    var choice = document.getElementById('choiceE');

    var category = choice.value.split("-")[1];
    var selected = choice.value.split('-')[0];

    console.log(category);
    console.log(selected);

    if (category === 'typeE') {

        url = url + 'type=' + selected;

    } else if (category === 'muscleE') {
        url = url + 'muscle=' + selected;

    } else {
        url = url + 'difficulty=' + selected;
    }

    fetch(url, {
        method: 'GET',
        headers: { 'X-Api-Key': apiKeyExcercise },
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var display = document.getElementById('display');
            display.innerHTML = ''; // Clear previous results
            console.log("Excercise API data:" + "\n-----");
            console.log(data)
            for (let index = 0; index < data.length; index++) {
                var name = document.createElement('div');
                var muscle = document.createElement('div');
                var type = document.createElement('div');
                var equipment = document.createElement('div');
                var instructions = document.createElement('div');
                var button = document.createElement('a'); // Change button to an anchor element
                button.setAttribute('id', 'btn-' + index);
                name.textContent = "name: " + data[index].name;
                type.textContent = "type: " + data[index].type;
                muscle.textContent = "muscle: " + data[index].muscle;
                equipment.textContent = "equipment: " + data[index].equipment;
                instructions.textContent = "instruction: " + data[index].instructions;
                button.textContent = "Button";
                display.append(name, type, muscle, equipment, instructions, button);

                var url2 = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + data[index].name + '&type=video&key=' + youtubeApiKey;
                urlArray.push(url2);
            }

            var requests = urlArray.map(function (url) {
                return fetch(url).then(response => response.json());
            });

            Promise.all(requests).then(function (results) {
                for (let index = 0; index < results.length; index++) {
                    var buttonElement = document.getElementById('btn-' + index);

                    var item = results[index].items;
                    var videoId = item[0].id.videoId;
                    var videoUrl = 'https://www.youtube.com/watch?v=' + videoId;

                    buttonElement.setAttribute("href", videoUrl);
                    buttonElement.setAttribute('target', '_blank');
                }
            });
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
});

// DISPLAY PROPERTIES FOR titleBOX
var titleBox = document.querySelector('.title-box');
var startBtn = document.querySelector('#start-btn');
var formBox = document.querySelector('.form-box')

function hideTitleBox() {
    titleBox.style.display = 'none';
    formBox.style.display = 'flex';
}

startBtn.addEventListener('click', hideTitleBox);