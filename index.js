// make sure and install npm i  express fs node=fetch

const express = require('express')
const fs = require("fs");
const app = express()
const fetch = require("node-fetch");
var lasttime = 0;

const port = 3000

//make  sure and asign  const username =  to the younow username  
const  username="test"

const url2 = "https://api.younow.com/php/api/broadcast/info/curId=0/user=" + username;
var oldtime , temptime; 
var start = false;
const date = require('date-and-time')
const now  =  new Date();
const s = date.format(now,'MM_DD_YYYY_');
  var UserOffline = false; 

app.use(express.static('public'));
app.use(express.static('./'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/', (req, res) => {
 
if(UserOffline!=false){
	
 res.redirect('/birthday2.htm');
 }
 {
	 res.redirect('/Error.htm');
 }
 
})


app.get('/list', (req, res) => {
	 res.header('Content-type', 'text/html');
  const content = fs.readFileSync("./"+username+"_list.txt");
  
  res.write(content);
  
 

});


app.get('/alert', (req, res) => {
	 res.header('Content-type', 'text/html');
  const content = fs.readFileSync("./"+username+'_alert' +".txt");
  
  res.write(content);
  
 
 
})


app.get('/chat', (req, res) => {
	res.header('Content-type', 'text/html');
	
const d= new Date(); 
const fullstr = d.getMonth();
const fulldate = d.getDate(); 
const content = fs.readFileSync("./"+s+username+".txt");
  
  res.write(content);
  
 res.end("");
 
 
})
app.get('/userList', (req, res) => {
	 res.header('Content-type', 'text/html');
  const content = fs.readFileSync("./"+username+"_list.txt");
  
  res.write(content);
  
 
  res.end("</body></html>");
})




app.listen(port, () => {
	var opn = require('opn');
	
	opn('http://localhost:3000');

})

function writeLogTest(data){
	console.log("here");
	
	
	const fileName =  "./" +s+username+'.txt';
	
	
	 fs.exists(fileName, function (exists) {
        if(exists)
        {
           
        }else
        {
            fs.writeFile(fileName, {flag: 'wx'}, function (err, data) 
            { 
              
            })
        }
    });
	
	/**/
	
	
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

function writeLog(data){
	
	const d= new Date(); 
	const fullstr = 
	
  fs.appendFile("./"+value+username+'.txt',
  `${data} \r`
,()=>{
 console.log('Successfully saved');
})

}

var results="";

 const getData = async url2 => {
  try {
    const response = await fetch(url2);
    const json = await response.json();
//console.log(json);

if(json.errorCode ==206){
	console.log("User offline");
UserOffline= true; 
	
}
else{
	console.log(json);
	displayComment(json['comments']);
	displayUserOnly(json['tfl']);
	
}
  } catch (error) {
    console.log(error);
  }
};


setInterval(function(){
getData(url2)

},1000)


function writeAlert(data){
  fs.appendFile(username+'_alert'+'.txt',
  `${data} \r`
,()=>{
 console.log('Alert saved');
})

}


function displayUserOnly(infos){
	var userList = "";
	var totalLikes =0;
	var i =0;
	userList = "<div style='align:center;bottom-padding:200px' >"; 
	
	if(Object.keys(infos).length > -1 ){
		while(i <Object.keys(infos).length){
			totalLikes = totalLikes +infos[i]['likes']
			
				var startof_url= "https://ynassets.younow.com/user/live/" +infos[i]['uId'] + "/"  ;
	var endofUrl = infos[i]['uId']+".jpg"
	
			
			userList = userList + "<span> <img style= ' width:100px;height:100px;border-radius: 50%;' src='"+startof_url+endofUrl +" '/></span>" 	; 
				i++; 
			}
		
	}else{

		userList= "Empty";

	}
userList = userList + "<div> " +  "</div>"; 

userList =  userList + "</div>"



fs.writeFile("./"+username+"_list"+'.txt',userList,(err)=>{
		if(err){console.log(err);}
		else{
			console.log("updated the likes"); 
			
			
}});
		


}



function displayComment(MSG){

var outstuff="";
var current =0; 
var i =0
current = Object.keys(MSG).length  - lasttime; 

while(i < Object.keys(MSG).length){

var tempStr = MSG[i]['comment'] 

if(lasttime < MSG[i]['timestamp'] ){

var timeCurrent = MSG[i]['timestamp']
lasttime = MSG[i]['timestamp'] ;
outstuff = outstuff +"<div class='msg'>" + MSG[i]['name'] + "  " + timeConverter(timeCurrent) + "   <b> "  + MSG[i]['comment'] + "</b><div/>"; 
	


}
i++;
}
outstuff= outstuff +"";
if(lasttime < 1){
	
	if(MSG[Object.keys(MSG).length -1 ]['timestamp'] > "" ){
		
		
	}
	else{
	lasttime = MSG[Object.keys(MSG).length -1 ]['timestamp']}
}
else
{
		if(MSG[Object.keys(MSG).length -1 ]['timestamp'] > "" ){
		
		
	}
	else{
	lasttime = MSG[Object.keys(MSG).length -1 ]['timestamp']}
	
}
if(outstuff > "") {
writeLogTest(outstuff);	
}





}

