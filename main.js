#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");

const forecast = require("./libs/forecast");
const geoaddress = require("./libs/geoaddress");
require("console.table");

//Get the command line arguments
const commandLineArgv = yargs
    .usage("Usage: 4c [options]")
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch forecast for",
            string: true,
            type: "string"
        }
    })
    .example('4c -a 61820', "show forecast for Champaign, IL i.e. 61820")
    .example('4c -a "pittsburgh, pa"', "show forecast for Pittsburgh, PA")
    .help()
    .alias("help", "h")
    .argv;

//Get the weather forecast for today and the next 10 days
geoaddress.geocodeAddress(commandLineArgv.address, function(errorMessage, results) {
    if(errorMessage) {
        console.error(chalk.red.bold(errorMessage));
    }
    else {
        console.log(chalk.cyan.bold(results.address));
        forecast.getForecast(results.latitude, results.longitude, function(errorMessage, forecastRes) {
            if(errorMessage) {
                console.error(chalk.red.bold(errorMessage));
            }
            else {
                console.table(forecastRes.temperature);
            }
        });
    }
});
