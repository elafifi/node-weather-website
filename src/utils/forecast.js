const request = require('request');
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5fbda7b8cac90db37a1956dd010995ea&query=${latitude},${longitude}&units=f`;

    request({url: url, json: true}, (error, response) => {

    if( error ) {
        callback('Unable to connect to weather API')
    } else if (response.body.error) {
        callback('Error: invalid location passed to weather API');
    } else { 
        const currentWeather = response.body.current;
        callback(undefined, `it is currently ${currentWeather.temperature} degrees`);
    }
})
};

module.exports = forecast;