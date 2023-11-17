var apiKeyExcercise = "QzUuvPoamyqc5YGXvPJpCw==pAl5Dfme18ylrDTm";
var youtubeApiKey = 'AIzaSyBTxzP3bulR4liI5qm-yTRJMFQGRlku4b8';
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
            var display = document.getElementById('display');
            for (let index = 0; index < data.length; index++) {
                var name = document.createElement('div');
                var muscle = document.createElement('div');
                var type = document.createElement('div');
                var descriptionType=document.createElement('div');
                var descriptionMuscle=document.createElement('div');
                var descriptionEquipment=document.createElement('div');
                var equipment = document.createElement('div');
                var description=document.createElement('div');
                var instructions = document.createElement('div');
                var thumbnail = document.createElement('img');
                var button = document.createElement('a'); // Change button to an anchor element
                thumbnail.setAttribute('id', 'img-' + index);
                button.setAttribute('id', 'btn-' + index);
                name.textContent = data[index].name;
                name.classList.add('center', 'bold');
                descriptionType.textContent = "Type of Exercise";
                descriptionType.classList.add('center', 'underline');
                type.textContent = data[index].type;
                type.classList.add('center');
                descriptionMuscle.textContent = "Muscle Targted";
                descriptionMuscle.classList.add('center', 'underline');
                muscle.textContent =data[index].muscle;
                muscle.classList.add('center');
                descriptionEquipment.textContent = "Equipment Needed";
                descriptionEquipment.classList.add('center', 'underline');
                equipment.textContent = data[index].equipment;
                equipment.classList.add('center');
                description.textContent = "Description of Exercise";
                description.classList.add('center', 'underline');
                instructions.textContent = data[index].instructions;
                instructions.classList.add('center', 'font');
                button.textContent = "ClicK Here To See Video";
                button.classList.add('center');
                display.append(name, descriptionType, type, descriptionMuscle,muscle, descriptionEquipment,equipment, description, instructions, thumbnail, button);
                var url2 = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + data[index].name + '+' + data[index].type + '+' + data[index].muscle + '&type=video&key=' + youtubeApiKey;
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
                for (let index = 0; index < results.length; index++) {
                    console.log(results[index]);
                    var buttonElement = document.getElementById('btn-' + index);
                    var thumbnailImg = document.getElementById('img-' + index)
                    var item = results[index].items;
                    var videoId = item[0].id.videoId;
                    var videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
                    var thumbnailUrl = item[0].snippet.thumbnails.medium.url;
                    buttonElement.setAttribute("href", videoUrl);
                    buttonElement.setAttribute('target', '_blank');
                    thumbnailImg.setAttribute('src', thumbnailUrl);
                    thumbnailImg.setAttribute('alt', 'Video Thumbnail'); // Set alt attribute for accessibility
                    thumbnailImg.classList.add('video-thumbnail');

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
    formBox.classList.remove("hidden");
}


startBtn.addEventListener('click', hideTitleBox);


