const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
require('dotenv').config();

let apiKey = process.env.APIKEY;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs'); //sets up template engine 


app.get('/', function (req, res) {
    // res.send('Hello World!');
    res.render('index', {weather: null, error:null});
});

app.post('/', function (req,res) { //pass data from client to server
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url, function(err,response,body){ //returns callback with err, response, body
        if(err) {
            res.render('index', {weather:null, error: 'Error: please try again'});
        } else {
            let weather = JSON.parse(body);
            if(weather.main !== undefined) {
                let weatherTemp = weather.main.temp;
                res.render('index', 
                {
                    weather: weatherTemp, 
                    error:null
                });
            } else {
                res.render('index', {weather:null, error: 'Error: please try again'});
            }
            
            
        }
    });
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});