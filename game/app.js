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
app.listen(8080);

app.get('/username/:path', function(req, res) {
   //console.log('path:'+req.params.path);
   
  showUserOnly(req.params.path,req,res); 
   
   
});
function showUserOnly(username,req,res){
	
	var content2 = fs.readFileSync("./cards.txt");
	var data2= String(content2);
	var dataarray= data2.split("<br>"); 
	
	var starts= 0; 
	var fulloutput; 
	
	if(data2.includes(username)){
		while(starts < dataarray.length){
		
		var parts= dataarray[starts].split(","); 
		
		
	if(parts[0].includes(username)){
		
		
		//fulloutput=  fulloutput +"<br><span><b>" +  parts[0] + "</b>\t" + parts[1] +"</span>"; 
		fulloutput= fulloutput + " " + parts[0] +"," + parts[1] + "<br>"; 
		
	//console.log( "<br><span><b>" +  parts[0] + "</b>" + parts[1] +"</span>")
	
		
	}
		
		
		starts++
	}
	
		
	}
	else{
		
	
	fulloutput ="<h2>User not found or empty list</h2>"
	}
	

	res.send(fulloutput)
	
	
	
	
	}
function readTextFile(){
	var fs = require('fs');
	
  const content = fs.readFileSync("./cards.txt");
  res.write(content);



}

function fliterOnly(data,res,userTo,userFrom,Card){


var arrayofdata =  data.split("<br>"); 
var  onlyone =  false; 
var i=0;
var output ="" ; 

while(i < arrayofdata.length){
	
	var temp = arrayofdata[i].split(","); 
	
		if(temp[0].includes(userFrom)){

				if((temp[1].trim()===Card)){
					
					//console.log(temp[0]+"" + temp[1] +""  ); 
					if(onlyone !=true){
						output = output + userTo + "," + Card +"<br>"; 				
						onlyone=true; 
					}
					else{
						output = output + temp[0] +"," + temp[1] + "<br>";	
						}
					
				}
				else{
					output = output + temp[0] +"," + temp[1] + "<br>";			
				}
		
		}
		else{
			output = output + temp[0] +"," + temp[1] + "<br>";	
		}
	
	
	i++; 
	
	
}
res.send("done-");
updateCards(output)
//res.write(output); 
// 
		


}
function  convertToJson(UserName,userId,values){

		var newobj = {UserName,userId,values}
		jsonsave = jsonsave+ newobj;
	console.log(JSON.stringify(newobj)); 
	
}

function  updateCards(updatedData){
	
	
	
fs.writeFile('./cards.txt', updatedData, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
	
}

app.get('/trade', function (request , response){
	
	var UserSending = request.query.UserSending; 
	var UserTo = request.query.UserTo; 
	var cardSend = request.query.card; 
	
	response.header('Content-type', 'text/html');
	var content2 = fs.readFileSync("./cards.txt");
	var data2= String(content2);
  
	let position = data2.search(UserSending +","+cardSend);
	
	if(position >1){
	
		fliterOnly(data2,response,UserTo,UserSending,cardSend); 		
	}
	else{
		
		response.send("has  not been found");
		
	}

});

app.get('/list', function (request , response){
	
	response.sendFile(__dirname + "/cards.txt");

});
app.get( '/save', function(request,response){
	
	var username = request.query.username; 
	var cardId = request.query.cardId;  
	writeLogTest( username, cardId)
	
	

	
	response.send("has been saved"); 
})



app.get( '/GetUserId', function(request,response){
	
	var username = request.query.username; 
	var testId = GetUserId(username,request,response)
	if(testId  >1){
		console.log(testId);
		
	}
})

function writeLogTest(username,ids){


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
//    console.log ("Fetching Broadcast....");
	
	
    var targetUrl = 'https://api.younow.com/php/api/broadcast/info/curId=0/user=' + username;
    var json = fetch ( targetUrl)
        .then (blob => blob.json ())
        .then (data =>
        {
			
			
		
			
            json = JSON.stringify (data, null, 2);
            let done = JSON.parse (json);
		if(done.errorCode !=102){
			
			return (done.userId)
			
		}
		else{
			
			//console.log(done)
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
