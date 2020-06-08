let express = require("express");
let https = require("https");

const weather = express();

weather.get("/", function(req, res){
  let url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=e72ca729af228beab5d20e3b7749713&units=metric"

  https.get(url, function(response){
    console.log(response);
  })

  res.send("Server is up and running")
})



weather.listen(3000, function () {
  console.log("Server is running on port 3000.");
})