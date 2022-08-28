var express = require('express'); 
var app = express(); 
const bodyParser= require('body-parser');
const fetch = require("node-fetch");
var jsonsave
var found=false;

const fs = require("fs");
app.use(express.static('./'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.listen(8081);


app.get('/info/:path', function(req, res) {
  // console.log('path:'+req.params.path);

var url2= "https://cdn.younow.com/php/api/channel/getInfo/channelId=" + req.params.path; 

   
  getJsonStuff(url2,req,res); 
   
   
});



app.get('/username/:path', function(req, res) {
   //console.log('path:'+req.params.path);
   var urls = "https://api.younow.com/php/api/broadcast/info/curId=0/user="+ req.params.path; 
   
   
  getJsonStuff(urls,req,res); 
   
   
});

async function getJsonStuff(targetUrl,req,res){
	 var json = fetch ( targetUrl)
        .then (blob => blob.json ())
        .then (data =>
        {
			
			
		
			
            json = JSON.stringify (data, null, 2);
            let done = JSON.parse (json);
          //  console.log (done);
            res.send(done);
			
        })
        .catch (e =>
        {
			console.log(e); 
        });
	
	
}
