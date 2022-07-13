const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended:true });

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post(function(req, res){
  const query = req.body.cityName;
  const apiKey = "865466a0f1c79fc968841c2b184dea9d";
  const unit = "metric"
  const url = "api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

https.get(url, function(response){
  console.log(response.statusCode);

response.on("data", function(data){
  const weatherData = JSON.bodyparse(data);
  const temp = weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  res.write("<p>The weather is currently " + weatherDescription + "<p>");
  res.write("The tempreture in " + query + " is " + temp + " degrees Celcius ");
  res.write("<img src=" + imgURL + ">");
  res.send();
});

});
})

app.listen(3000, function(req, res){
  console.log("Server running on port " + 3000);
});
