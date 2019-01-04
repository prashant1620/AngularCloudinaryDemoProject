/*var express=require('express')
var path=require('path')
var mustacheExpress=require('mustache-express')

const data=require('./data.js')

const app=express();

app.engine('mustache',mustacheExpress());
app.set('views','./views')
app.use(express.static('public'));
app.set('view engine','mustache')

app.get('/',function(req,res){

     res.render('index',{users:data.users})
})

app.listen(3000,function(){
    console.log("server started in port 3000")
})*/

const express = require('express')
const bodyParser = require('body-parser');
const app = express()
var dotenv = require('dotenv');
dotenv.load();
var path = require('path');

var fs = require('fs');
var cloudinary = require('cloudinary').v2;

var uploads = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

cloudinary.config({
  cloud_name: 'prasanth99',
  api_key: '385484533764595',
  api_secret: 'HkhtksDZPC6kmYqaqvORQUX0b4E'
});
console.log("Cloudinary connected")

app.get('/',function(req,res){
  console.log("requsted")
  if(res){
    res.sendFile(path.join(__dirname + '/index.html'));
  }
  
})


app.post('/', function (req, res) {
  cloudinary.v2.api.delete_derived_resources(['billclinton'],
  function(error, result){ if(res){
    res.send("Hello world")
  }else{
    res.send("Error is occured")
  }});
 
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})