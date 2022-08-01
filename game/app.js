var express = require('express'); 
var app = express(); 
const bodyParser= require('body-parser');
const fetch = require("node-fetch");

const fs = require("fs");

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.listen(8080);

app.get('/list', function (request , response){
	
	response.sendFile(__dirname + "/cards.txt");

});
app.get( '/save', function(request,response){
	
	var username = request.query.username; 
	var cardId = request.query.cardId; 
	//console.log( username); 
	writeLogTest( username, cardId)

response.send("has been saved"); 

	
	
})



app.get( '/GetUserId', function(request,response){
	
	var username = request.query.username; 

	
GetUserId(username,request,response) 

	
	
})

function writeLogTest(username,ids){
	
	//console.log("here");
	
	
	const fileName =  "./cards.txt";
	var data = "\t "+username +"," + ids +" \r <br> "
	
	 fs.exists(fileName, function (exists) {
        if(exists){}else
        {
            fs.writeFile(fileName, {flag: 'wx'}, function (err, data) 
            { 
              
            })
        }
    });
	
	
	fs.appendFile(fileName, data, (err)=>{
		
		if(err){
			console.log();
			
		}
		else{
			fs.readFileSync(fileName);
		
	}
	
}
);
}


async function GetUserId(username,req,resp)
{	

var error = false; 
    console.log ("Fetching Broadcast....");
	
	
    var targetUrl = 'https://api.younow.com/php/api/broadcast/info/curId=0/user=' + username;
    var json = fetch ( targetUrl)
        .then (blob => blob.json ())
        .then (data =>
        {
			
			
		
			
            json = JSON.stringify (data, null, 2);
            let done = JSON.parse (json);
            //console.log (done);
			resp.send(done);
			
            if (json.length < 1)
            {
                console.log ("No Data Found");
                error = true;
            } else if (done.errorCode === 102)
            {
			console.log ("No Data Found");
                error = true;
            } else if (done.errorCode !== 0)
            {
             console.log ("No Data Found");
                error = true;
            }
            if (error)
            {
                console.log ("Error Found Retrying" + error)
              
                return;
            } else
            {
                userId = done.userId;
                broadcastId = done.broadcastId;
            // console.log(userId); 
			 
             //  FetchEvent ();
                return userId; 
				
				
            }
        })
        .catch (e =>
        {
			console.log(e); 
        });
}



async function Retry()
{
    console.log ("Retrying in 5 seconds");
    //AddToChat ("Retrying in 5 seconds", "HelperRobot", "basic", 50250342, 0, 0, false, 0);

    await sleep (5000);
error = false;


}
