/* Global Variables */
const domObj = {
    submitBtn: document.getElementById("generate"),
    zipInput: document.getElementById("zip"),
    feelingsInput: document.getElementById("feelings"),
    lastEntry: document.getElementById("last-entry"),
    allEntriesBtn: document.getElementById("get-all-entries")
}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
/////////////////////////////////////////////////////////////////////////////////
/*Helper Functions*/
//get the data from the api according to the user's zip code input
const getWeather = async (zipCode) => {
    const API_KEY = "225e96ba4490c4ecf1c6811dc08511b0";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}`)
    try {
        const weather = await response.json();
        return weather
    } catch (err) {
        console.log(err)
    }
}
//get the input of the user and the data from API and return an entry object
const getEntry = async () => {
    const feeling = domObj.feelingsInput.value;
    const zipCode = domObj.zipInput.value;
    const weatherObj = await getWeather(zipCode);
    return {
        feeling,
        zipCode,
        weather: Math.round(weatherObj.main.temp - 273.15),
        date: newDate,
    }
}
//render the entry data on the DOM
const renderData = (entry) => {
    let domString;
    //incase the input was incorrect or the response is 404
    if (!entry) {
        domString = `
        <h2>Most Recent Entry</h2>
        <p> 404 city not found...Wrong zip code entered. </p>
        `
        //if the input was correct and got a proper response
    } else {
        domString = `
        <h2>Most Recent Entry</h2>
        <div id="date"> <p> Date: ${entry.date} </p> </div>
        <div id="temp"> <p> Temprature: ${entry.weather}<sup>o</sup>C </p> </div>
        <div id="content"> 
        <p> Zip Code: ${entry.zipCode} </p>
        <p> Feelings: ${entry.feeling} </p>
        </div>
        `;
    }
    domObj.lastEntry.innerHTML = domString;
};
//take the entry and post it to the server to save it in the database
const postEntry = async (url = "", entry = {}) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        });
        return response.json();
    } catch (err) {
        console.log(err);
    }
};
/////////////////////////////////////////////////////////////////////////////////
/*Set-up The Event Listener*/
domObj.submitBtn.addEventListener("click", async e => {
    //prevent the main action
    e.preventDefault();
    //get the entry data from api and user input
    try {
        const entry = await getEntry();
        //render the data on the DOM
        renderData(entry);
        //post the entry to the server side
        postEntry("/entries", entry).then(data => console.log(data));
    } catch (err) {
        renderData();
    }
});
domObj.allEntriesBtn.addEventListener("click", async e => {
    window.open("/entries", "_blank")
})