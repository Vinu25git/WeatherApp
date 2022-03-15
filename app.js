// jshint esversion: 6
const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res)
{
 res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

const query = req.body.cname;
const apikey = "d92c24c76a650bc7456a1a383b2d0c3a";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid=" + apikey;
https.get(url,function(response)
{
  // console.log(response);
//   console.log('statusCode:', response.statusCode);
  //   console.log(response.statusCode);
// console.log('headers:', response.headers);

// response.on('data', (d) => {
//   process.stdout.write(d);
// });
console.log(response.statusCode);

response.on("data",function(data)
{
const weatherdata = JSON.parse(data);
 // const object={
 //   name:"Ashutosh",
 //   favourite:"Binge_watching",
 // }
 // console.log(JSON.stringify(object));
 const temp = weatherdata.main.temp;
 const description= weatherdata.weather[0].description;
const icon = weatherdata.weather[0].icon;
 const imageUrl= "https://openweathermap.org/img/wn/" + icon + "@2x.png";

 res.setHeader("Content-Type", "text/html");
 res.write("<h3>The weather is currently "+ description + "</h3>");
 res.write("<h1>The temperature in "+ query +" is "+temp+" degree celcius<h1>");
 res.write("<img src="+imageUrl+">");


 res.send();

// console.log(temp);
//  console.log(description);

});

});
});




app.listen(1000,function()
{
  console.log("server is started at port 1k");
});
