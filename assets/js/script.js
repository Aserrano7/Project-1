var apiKeyExcercise = "QzUuvPoamyqc5YGXvPJpCw==pAl5Dfme18ylrDTm";

var saveBtn = document.getElementById('saveButton');
saveBtn.addEventListener('click', function(event){
    event.preventDefault();
    var type = document.getElementById('typeE');
    console.log(type.value);
    var muscle =document.getElementById("muscleE");
    console.log(muscle.value);
    var diff=document.getElementById("difficultyE")
    console.log(diff.value);

if(type.value==='all' && muscle.value==='all' && diff.value==='all' ){

var url = 'https://api.api-ninjas.com/v1/exercises?';
fetch(url, {
    method: 'GET',
    headers: { 'X-Api-Key': apiKeyExcercise },
})

    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        for (let index = 0; index < data.length; index++) {
            var name = document.createElement('div');
            var muscle = document.createElement('div');
            var type = document.createElement('div');
            var equipment = document.createElement('div');
            var instructions = document.createElement('div');
            var button= document.createElement('button')


            name.textContent = "name: " + data[index].name;
            type.textContent = "type: " + data[index].type;
            muscle.textContent = "muscle: " + data[index].muscle;
            equipment.textContent = "equipment: " + data[index].equipment;
            instructions.textContent = "instruction" + data[index].instructions;
            button.textContent="link to video";

            var display = document.getElementById('description');
            display.append(name, type, muscle, equipment, instructions,button);


        }


    }) 
}


})


