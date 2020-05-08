// Personal API Key for OpenWeatherMap API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const key = "590cc93fe72f44b22f641cf635c249af";
const btn = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
btn.addEventListener("click", getOutput);

/* Function called by event listener */
function getOutput(e) {
    btn.textContent = "Please Wait...";
    const zipCode = document.getElementById('zip').value;
    const feel = document.getElementById("feelings").value;

    getWeather(baseUrl, zipCode, key)
    .then(function(data) {
        const { main } = data;
        const { temp } = main;
        const allData = {  date: newDate, temp: temp, feel: feel }
        console.log(allData);
        postData( allData );
    }).then(getWeatherInfo);

    // Update the UI

    // btn.textContent = "Generate";
}


/* Function to GET Web API Data*/
const getWeather = async (baseUrl, zipCode, key) => {
    const res = await fetch(`${baseUrl}?zip=${zipCode}&appid=${key}`);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log("error",error);
    }
} 
/* Function to POST data */
const postData = async ( allData ) => {
    const res = await fetch('/addWeather', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(allData)
    });

    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    }

    catch(error)
    {
        console.log("error",error);
    }
}

/* Function to GET Project Data */
const getWeatherInfo = async () => {
    const request = await fetch('/all');

    try {
        const all = await request.json();
        console.log(all);
        const date = document.getElementById('date');
        const temp = document.getElementById('temp');
        const content = document.getElementById('content');
        

        date.innerHTML = 'Date: ' + all.date;
        temp.innerHTML = 'Temperature: ' + all.temp;
        content.innerHTML = 'Feel: ' + all.feel;

    }

    catch {
        console.log("error", error);
    }
}