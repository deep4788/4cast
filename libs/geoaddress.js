const request = require("request");

//This function reads the user entered address and
//  gives back the longitude and latitude of that address
var geocodeAddress = function(address, callback) {
    //Encode the address so can be appended to http url
    var encodedAddress = encodeURIComponent(address);

    //Make request to Google API to get the latitude and longitude
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true }, function(error, response, body) {
            if(error) {
                callback("Unable to connect to Google API servers");
            }
            else if(body.status === "ZERO_RESULTS") {
                callback("Unable to find that address");
            }
            else if(body.status === "OK") {
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
    });
};

module.exports = {
    geocodeAddress
};
