const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
//  console.log(req.body.cityname);


  const query = req.body.cityname;       //  it is requesting the input data from the user using body parser.
  const apikey = "21a329749e4c23ac3171e03ed1ff6b90";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apikey+ "&units=metric";

  https.get(url, function(response){    // getting the url from openweather and passing it throught a function in hyper to get it status code.(200 : all ok , 400:some error etc)
  // console.log(response.StatusCode);

  response.on("data",function(data){     //retreving the data received from openWeather and logging it to hyper , this contains all the data which we receive from openweather.
  const weatherData = JSON.parse(data);

  const temp = weatherData.main.temp;   //To select a perticular data in which we are interested we have to go by a heirecharal to access it.
  //  console.log(temp);                    //In this the weatherData cantains all data and weatherData.main it contains main body of data and inside main there is temp and by  weatherData.main.temp we're accessing the temperature specifically.

  const weatherDesc = weatherData.weather[0].description;
  //  console.log(weatherDesc);

  const icon = weatherData.weather[0].icon;
  const imgurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
  //console.log(icon);

  const location = weatherData.name;



  res.write("<h1>The temperature in "+ location +" is "+ temp + " degree celsius. </h1>");
  res.write("<img src=" + imgurl +">");
  res.send();
  });

  });



})







 app.listen(3000, function (){
   console.log("Server is running on port 3000");
 });
