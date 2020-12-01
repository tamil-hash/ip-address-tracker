const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const https= require('https');
const app = express();
const fs = require("fs");
let ipInfo = {};
let url = 'https://geo.ipify.org/api/v1?apiKey=at_XcfwzFqVrK1XOikEtJWKifyYrrd0D&ipAddress=';
var lat,lng;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

app.get("/",function(req,res){
  res.render('index',{ ipinfo:ipInfo, lat:lat,lng:lng });
});

app.post('/',function(req,res){
  var ip=req.body.ip;
  https.get(url+ip, function(response){

    response.on('data', function(chunk) {
      ipInfo = {
        ip:JSON.parse(chunk).ip,
        city:JSON.parse(chunk).location.city + " , " +JSON.parse(chunk).location.region,

        timeZone:JSON.parse(chunk).location.timezone,
        isp:JSON.parse(chunk).isp
      };
      lat=JSON.parse(chunk).location.lat;
      lng=JSON.parse(chunk).location.lng;


      res.redirect('/');
     });
  })
})




app.listen(process.env.PORT||3000);
