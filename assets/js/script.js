var ApiKey = "dTvOLA8mFJdj0bbC/MX8Zw==Ov8Cp3ohelWEtXnJ"
var sampleURL = "https://api.api-ninjas.com/v1/exercises?muscle=biceps&appid=" + ApiKey

fetch(sampleURL, {
    method: 'GET',
    headers:{'X-Api-Key': ApiKey},
    contentType: 'application/json',
})
        .then(function (response) {
            if (response.ok === true) {
                console.log(response);
                return response.json()
            } else {
                alert("Error:" + response.statusText);
            }
        })
        .then(function (data) {
            console.log(data);
           
        }
        )
        .catch(function (error) {
            alert("error message:" + error);
            console.log("error message: " + error);
        });