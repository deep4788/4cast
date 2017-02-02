4cast: Forecast from Terminal
=============================

`4c`: A command line utility to get the weather information (Node.js).

Description
-----------
This utility helps to get the forecast for a given city either using ZIP Code or city and state name.

It can be passed a command-line argument:

- **-a, --address**: either Zip Code or name of the city and state

Installation
------------
- Go to [Dark Sky API](https://darksky.net/dev/) and sign up for free and get the API key
- Go to libs/forecast.js and update the `url`; replace API_KEY with your key
    `url: https://api.forecast.io/forecast/API_KEY/${lat},${lng}`
- Install Node.js and npm
- Run `npm install -g 4cast`

Usage
-----
```sh
Usage: 4c [options]

Options:
  -a, --address  Address to fetch forecast for  [string] [required]
  --help, -h     Show help  [boolean]

Examples:
  4c -a 61820             show forecast for Champaign, IL i.e. 61820
  4c -a "pittsburgh, pa"  show forecast for Pittsburgh, PA

```

Author
------
Deep Aggarwal  
deep.uiuc@gmail.com  
Date Started: 02/01/2017  
