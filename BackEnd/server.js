
var express = require('express');  
var path = require("path");   
var bodyParser = require('body-parser'); 
var cloudinary =require('cloudinary'); 
var fs=require('fs')


var app = express()  
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
   
cloudinary.config({
    cloud_name: 'prasanth99',
    api_key:'385484533764595',
    api_secret: 'HkhtksDZPC6kmYqaqvORQUX0b4E'
  })
  console.log("Cloudinary connected")


app.use(function (req, res, next) {        
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();  
});  


app.post('/delete/',function(req,res){
    console.log("im in server")
    console.log(req.body.public_id)
    const result= cloudinary.v2.api.delete_resources(req.body.public_id,
    function(error, result){
        if(error){
            console.log("Error Occured");
        }else{
            console.log(result);
            console.log("Image will be deleted")
        }
        
    });

    /*const result= cloudinary.v2.api.delete_resources(['images/img1_wa3gsf'],
    function(error, result){console.log(result);});*/
})
app.post('/download/',function(req,res){
    console.log("im there in download")
    console.log(req.body.public_id)
    const result=cloudinary.v2.utils.download_archive_url(req.body.public_id,function(err,data){
        if(err)
        {
            console.log(err)
        }else
        {
            console.log(data)
        }
    })

})

app.listen(3000,function(){
    console.log("Server Started at port 3000")
})