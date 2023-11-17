
var apiKeyExcercise = "QzUuvPoamyqc5YGXvPJpCw==pAl5Dfme18ylrDTm";
var youtubeApiKey = 'AIzaSyCNLgdkxpJPBtr-m0efxMtZYEuR3KR-GHc';
var display = document.getElementById('display');

var urlArray = [];

var saveBtn = document.getElementById('saveButton');
saveBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var type = document.getElementById('typeE');
    var muscle = document.getElementById("muscleE");
    var diff = document.getElementById("difficultyE");
// object for debugging
    var userInput = {
        type: type.value,
        muscle: muscle.value,
        difficulty: diff.value,
    }
    console.log(userInput)
   // url is for fetch request to exercise API
    var url = 'https://api.api-ninjas.com/v1/exercises?type=' + userInput.type + '&muscle=' + userInput.muscle + "&difficulty=" + userInput.difficulty;

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
            console.log("Excercise API data:" +"\n-----");
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
                   // urlArray is an array consists of 10 items of assembled URl ready for youtube API fetch call
                   // requests is a new array created by .map() method and functions like doing a (for loop) to the new array and use each items in the array as url to use to request for youtube API

                    var requests = urlArray.map(function (url) {
                        return fetch(url).then(response => response.json());
                    });
                    // console.log(requests);
                    // promise.all method turns all items in the "requests" array into promises, once all the promises are fullfill then it will start
                    // to do what is after the .then( . This ensures that every button will get a href link.
                    Promise.all(requests).then(function (results) {
                       // console.log(results)
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





var titleBox = document.querySelector('.title-box');
var startBtn = document.querySelector('#start-btn');
var formBox = document.querySelector('.form-box')



function hideTitleBox() {
    titleBox.style.display = 'none';
    formBox.style.display = 'flex';
}


startBtn.addEventListener('click', hideTitleBox);
