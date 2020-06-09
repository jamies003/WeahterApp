let express = require("express");
let https = require("https");
let bodyParser = require("body-parser");

const weather = express();
 
weather.use(bodyParser.urlencoded({extended: true}));

weather.get("/", function(req, res){
  res.sendFile(__dirname + "/weather.html");
});
//*****************Get Request*************************************//

weather.post("/", function(req, res){
  // console.log(req.body.cityName);
  // console.log("Post request recieved.");
  let query = req.body.cityName;
  let apiKey = "e72ca729af228beab5d20e3b7749713";
  let unit = "metric";
  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;
  // ***************Fetch Weahter Data From Extenal Server*********************************//
  // **************Change the Weather Api from London*******************************//
  //*****************Change apiKey ***********************************************//

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on ("data", function(data) {
      let weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const iamgeURL = "http://openweathermap.org/img/wn/" + icon + "10d@2x.png"

      res.write("<p>The weather is currently" + weatherDescription + "<p>");
      res.write("<h1>The tempature in " + query + " is " + temp + "degrees Celcius.</h1>");
      res.write("<img src=" + iamgeURL +">");
      res.send()
      //*************************Res reffers to our weather.get line 6 ***************/
      //*************************Change The Temp From London **********************//

      // console.log(weatherDescription);
      // console.log(temp);


      // let object = {
      //   name: "Jamie",
      //   favFood: "SeaFood"
      // }
      // console.log(data);
      // console.log(JSON.stringify(object));

    });
  });

  // res.send("Server is up and running")
  // ***************Cant Have Multiple Send Request***********************//
// })


})




weather.listen(3000, function () {
  console.log("Server is running on port 3000.");
})