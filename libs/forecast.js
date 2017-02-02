const moment = require("moment");
const request = require("request");

//This function make a API request to forecast.io to get
//  the weather information
var getForecast = function(latitude, longitude, callback) {
    //Make API call to forecast.io
    request({
        url: `https://api.forecast.io/forecast/API_KEY/${latitude},${longitude}`,
        json: true }, function(error, response, body) {
            if(error) {
                callback("Unable to connect to forecast.io server");
            }
            else if(response.statusCode === 400) {
                callback("Unable to fetch forecast from forecast.io");
            }
            else if(response.statusCode === 200) {
                var allTempData = [];
                var newDayData;
                var todayTemp = body.currently.temperature || "";

                body.daily.data.forEach(function(value, index) {
                    newDayData = {};
                    newDayData.Date = value.time ? moment.unix(value.time).format("MM/DD/YYYY") : "";
                    newDayData.Temperature = todayTemp || "-";
                    newDayData.MinTemp = value.temperatureMin || "";
                    newDayData.MaxTemp = value.temperatureMax || "";
                    newDayData.PrecipType = value.precipType || "";
                    newDayData.PrecipProbability = (value.precipProbability*100) + "%" || "";

                    allTempData.push(newDayData);
                    todayTemp = "";
                });

                callback(undefined, { temperature: allTempData });
            }
    });
};

module.exports = {
    getForecast
};
