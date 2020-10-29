const request = require('request');

const geocode = (address, callback) => {
   const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiZWxhZmlmaSIsImEiOiJja2djODU3M3YwMmF6MnlzMTJ6eTllODNpIn0.1BYQSohKzHVWkq54jG9fzw&limit=1`
 
    request({url, json: true}, (error, response) => {

      if (error) {
         const errorMessage = 'Unable to connect to mapbox API';
         callback(errorMessage, undefined);
      } 
      
      else if (!response.body.features || response.body.features.length === 0) {
         const errorMessage = 'Invalid location passed to API';
         callback(errorMessage, undefined);
      } 
      
      else {
         callback(undefined, {
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
            
         });
      }
    });
   }

module.exports = geocode