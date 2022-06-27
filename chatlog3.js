// saves chat log and  gifts  given  in a broadcast on younow

const fs = require("fs");

const date = require('date-and-time')
const now  =  new Date();
const s = date.format(now,'MM_DD_YYYY_');
const fetch = require("node-fetch");

const username ="";

var userId; 
var goodies

const Pusher = require("pusher-js")


FetchBroadcastId(); 

function FetchEvent(){
	DownloadGifts();
	

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
				
				dataout = dataout + "<div class='msg'>"  +data.message.comments[i].name  +"  "+ timeConverter(TimsStamp) +" <b> " + data.message.comments[i].comment + "</b><div>"; 
				

				}
	
	
			}
	
	writeLogTest(username,dataout)
	
	});
	  channel.bind('onGift', function(data) {
        if(data.message != "undefined")
        {
             for (i = 0; i < data.message.stageGifts.length; i++)
            {
          
			writeLogTest2(username,"\r<br><b>"+ data.message.stageGifts[0].name + " </b>  Gave : "+displayGiftOnly(data.message.stageGifts[0].giftId))
			}
		}
 
        }
    );
	
	
	channel.bind ('onSuperMessage', function (data)
    {
		
		var dataout = ""; 
        for (let i = 0; i < data.message.superMessages.length; i++)
        {
			 let input = data.message.superMessages[i].comment;
            let foundName = data.message.superMessages[i].name;
			
			   dataout = dataout+  "<div class='superMsg'>"  + foundName + " "  +timeConverter(data.message.timestamp)+ " " + input + "</div>"; 
		}
	writeLogTest(username,dataout)
	}
	
	
		);
	





}
function displayGiftOnly(i){
	
	index =0; 
	var index =0; 
	stuff = goodies.goodies;

		while (index<stuff.length){
	
				if((stuff[index]['id'] == i )){
				return(stuff[index]['SKU']); 
				break;
				}

		
	
	index++;  
	
}	
	
	
	
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

function writeLogTest2(username,data){
	
	//console.log("here");
	
	
	const fileName =  "./" +s+"gifts_"+username+'.txt';
	
	
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


function writeLogTest(username,data){
	
	//console.log("here");
	
	
	const fileName =  "./" +s+username+'.txt';
	
	
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


async function FetchBroadcastId()
{	

var error; 
    console.log ("Fetching Broadcast....");
    var proxyUrl = 'https://younow-cors-header.herokuapp.com/?q=',
        targetUrl = 'https://api.younow.com/php/api/broadcast/info/curId=0/user=' + username;
    var json = fetch ( targetUrl)
        .then (blob => blob.json ())
        .then (data =>
        {
			   json = JSON.stringify (data, null, 2);
            let done = JSON.parse (json);
            console.log (done.errorCode);
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
                console.log ("Error Found Retrying")
              
                return;
            } else
            {
                userId = done.userId;
                broadcastId = done.broadcastId;
             console.log("Logging " +  username +" " +userId); 
			 
               FetchEvent ();
                return;
            }
        })
        .catch (e =>
        {
			console.log(e); 
        });
}


function writeLog(data){
	

  fs.appendFile("./"+s+username+'.txt',
  `${data} \r`
	,()=>{

})

}


async function Retry()
{

    await sleep (5000);
    error = false;
    FetchBroadcastId ();
}



async function DownloadGifts()
{
    //console.log ("Fetching Gifts...");
    targetUrl = 'https://ynassets.younow.com/giftsData/live/de/data.json';
    var json = fetch (targetUrl)
        .then (blob => blob.json ())
        .then (data =>
        {
            json = JSON.stringify (data, null, 2);
            goodies = JSON.parse (json);
        });
}

