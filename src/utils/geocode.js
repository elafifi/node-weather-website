const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZWxhZmlmaSIsImEiOiJja2djODU3M3YwMmF6MnlzMTJ6eTllODNpIn0.1BYQSohKzHVWkq54jG9fzw&limit=1`
 
    request({url, json: true}, (error, response) => {
      if (error) {
         const errorMessage = 'Unable to connect to mapbox API';
         callback(errorMessage, undefined);
      } else if (response.body.error) {
         const errorMessage = 'Invalid location passed to API';
         callback(errorMessage, undefined);
      } else {
         callback(undefined, {
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
            
         });
      }
    });
   }

module.exports = geocode