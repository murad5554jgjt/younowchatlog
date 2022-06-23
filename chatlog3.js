const fs = require("fs");

const date = require('date-and-time')
const now  =  new Date();
const s = date.format(now,'MM_DD_YYYY_');
const fetch = require("node-fetch");

const username = "RTUltimateWheelieDaughter"; 
var userId; 


const Pusher = require("pusher-js")

FetchEvent();

function FetchEvent(){
var userId = 53462461
pusher = new Pusher ('d5b7447226fc2cd78dbb', {
        cluster: "younow"
    });
    let channel = pusher.subscribe ("public-channel_" + userId);


   channel.bind ('onChat', function (data)
    {
		
        if (data.message !== "undefined")
    
{
	var dataout = "" ; 
 for (let i = 0; i < data.message.comments.length; i++)
            {
				
				let username = data.message.comments[i].name;
				let TimsStamp =  data.message.comments[i].timestamp; 
				
				//console.log(data.message.comments[i]);
				
				console.log(dataout +  data.message.comments[i].name  + "  " + timeConverter(TimsStamp) +"  " + data.message.comments[i].comment); 
				   dataout = dataout + "<div class='msg'>"  +data.message.comments[i].name  +"  "+ timeConverter(TimsStamp) +" <b> " + data.message.comments[i].comment + "</b><div>"; 
				
			//+"<div class='msg'>" + MSG[i]['name'] + "  " + timeConverter(timeCurrent) + "   <b> "  + MSG[i]['comment'] + "</b><div/>"; 	
				
			}
	
	
	}
	
	writeLogTest(username,dataout)
	
	});
	
	channel.bind ('onSuperMessage', function (data)
    {
		
		var dataout = ""; 
        for (let i = 0; i < data.message.superMessages.length; i++)
        {
			 let input = data.message.superMessages[i].comment;
            let foundName = data.message.superMessages[i].name;
			
			   dataout = dataout+  "\n"  + foundName + " "  +timeConverter(data.message.timestamp)+ " " + input; 
		}
	writeLogTest(username,dataout)
	}
	
	
		);
	


channel.bind('onGift', function (data){
	
//	console.log(data.message); 
	
	
	
	
});


}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  if(sec <10 ){
sec ="0"+sec

  }
  if(hour <10) {
hour = "0" + hour;

  }
  if(min <10){
min = "0" + min

  }
  var time =   hour + ':' + min + ":"+sec;
  return time;
}


function writeLogTest(username,data){
	
	//console.log("here");
	
	
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




