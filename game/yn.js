


// chat log below work

var goodies = null; 

async function ListCards(whoToDisplay){
const response = await fetch('http://localhost:8080/username/'+whoToDisplay);
const body = await response.text();
//console.log(body); 
var el3 =   document.getElementById("cardlist") ;
var results=body.split('<br>'); 
var i=0; var counts=0;
var output =""; 
el3.style.visibility = 'visible';

while(i < results.length){
var temp = results[i].split(","); 


output2= "<center><h2 style='font-family: Josefin Sans;font-size:30px', sans-serif;'>"+ whoToDisplay+ " "+"</h2></center>" 
 
//console.log(onList)
//var Searching = getUserIds(whoToDisplay)
var Searching = null; 


if((temp[0].includes(whoToDisplay) )){

output = output+"<div style='display:inline'><div style='display:inline;'> <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + temp[1].trim() +".svg'  style='border-radius: 50%;  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);'/></div></div> "

counts++;

}
else{

// nothing :D   

}


// console.log(temp[]);
 
i++; 


}

console.log("Working within mine"); 

//console.log(whoToDisplay.length); 

el3.innerHTML = output2+"<br><center><span class='sp'> number of cards : " + counts +"</span></center><br>" +output +""; 

	setTimeout(() => {
  

  // 👇️ hides element (still takes up space on page)
el3.style.visibility = 'hidden';
}, 14500);
	





}
function tradeCards(ToUser,FromUser,cardSent){


    targetUrl = 'http://localhost:8080/trade?UserSending='+FromUser+"&UserTo="+ToUser+"&card="+cardSent;
    var json = fetch (targetUrl)
        .then (data =>
        {
       console.log(data); 

		
        });

}
DownloadGifts();
function displayPopUp(data){

	var popup = document.getElementById('cardlist');
	popup.style.visibility="visible" 
	popup.innerHTML	= data; 
		setTimeout(() => {
  

  // 👇️ hides element (still takes up space on page)
popup.style.visibility = 'hidden';
}, 14500);
	
}

function customUserName(){


}
function displayGiftOnly(i,data2){
	
	index =0; 
	var index =0; 
	stuff = goodies.goodies;
	gifts = data2; 
	
	var totalLikesGiven = gifts.extraData['numOfLikes']
	
	if(totalLikesGiven> 1)
	{
	
	return totalLikesGiven
	}
	else if (gifts.extraData.value > 1){
	
	
	return gifts.extraData.value;
	
	}
	else{
	
	
	return 0
	}
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

 
function FetchEvent (userId){
		pusher = new Pusher ('d5b7447226fc2cd78dbb', {
        cluster: "younow"
		});
	
		let channel = pusher.subscribe ("public-channel_" + userId);
  
		channel.bind('onEnd', function(data){

		});
	
	channel.bind ('onChat', function (data)
    {
		
        if (data.message !== "undefined")
    
			{
				console.log(data.message);
				
		var dataout = "" ; 
					
					for (let i = 0; i < data.message.comments.length; i++)
						{
						var username = data.message.comments[i].name;
						var	TimsStamp =  data.message.comments[i].timestamp; 
						var whatsSaid = cleanUp(data.message.comments[i].comment); 
						var CommentUserId = data.message.comments[i].userId; 
						var userImage = GetuserImage(CommentUserId); 
						var propslevel = (data.message.comments[i].propsLevel ) 
						var ifMod = data.message.comments[i].broadcasterMod; 
					
					
							if(whatsSaid.includes("!deal")!=false){
					
							saveRandom(username); 
							//console.log("getting a new card");
				
			
				
							}
							else if(whatsSaid.includes("!mine")!=false){
							ListCards(username);	
							playAudio(); 
							
							
							}
						//
						
						else if(whatsSaid.includes("!trade")!=false ){
	
						var temp = whatsSaid.split(" " ); 
						if((temp.length > 1) ){
						console.log("From "+username + " " 	+"sending to "+temp[1] +  "card number " +temp[2]  );
	tradeCards(temp[1],username,temp[2])
						}
						else{
						alert("Unable to  trade missing data"); 
						
						}
	//
	
				}
				
						// 
							if(ifMod != false) {
			
			
							dataout = dataout + "<table><tr><td>"+"<img  style='width:50px;height:50px; border-radius: 20px;align:left;' src='" + userImage+"'/></td><td  class='msg' style='color:red;background-color:white'>" + Math.abs(propslevel) + " " +data.message.comments[i].name  +" "+ timeConverter(TimsStamp) +"<br>"  +cleanUp(data.message.comments[i].comment) + 
							"</td></tr><table>"; 
							}
							
							else{
						dataout = dataout + "<table><tr><td>"+"<img  style='width:50px;height:50px; border-radius: 20px;align:left;' src='" + userImage+"'/></td><td  class='msg' style='align:left;color:white'>" + Math.abs(propslevel) + " " +data.message.comments[i].name  +" "+ timeConverter(TimsStamp) +"<br>"  +cleanUp(data.message.comments[i].comment) + 
						"</td></tr><table>"; 
							}
						}
	
			}



		displayIt(dataout); 



	
	});

	
   
        channel.bind('onGift', function (data)
        {
		
		let tempUsername = data.message.stageGifts[0].profileUrlString
		var giftids = data.message.stageGifts[0].giftId;
		var onlydata = data.message.stageGifts[0];
		
		if(displayGiftOnly(giftids,onlydata) != 0){
		
			dataout = "<div  class='msg' style='font-size:16px;'>" +tempUsername+ " Gave <center> "+ displayGiftOnly(giftids,onlydata)+" likes </center></div>"
		}
		else{
			dataout = "<div  class='msg' style='font-size:16px;'><center>" + onlydata.comment+"  </center></div>"
		
		
		}
			playAudio();
			displayIt(dataout)
  
		
		});
	
        //Get Stickers
        channel.bind('onSticker', function (data)
        {
		if(stickers !=false) {
			dealwithFreeStickers(data);
		}
		else{
		
		}
		  //  console.log('sticker data', data);
            //handleNewSticker(data);
        });

		channel.bind('onRaid', function (data)
        {
		//console.log("raid : " +  data )
		
		});
 channel.bind('onBroadcastPlayData', function (data)
        {
           var  viewers= data.message.viewers ;
		   var likes = data.message.likes; 
		   //console.log(data); 
//console.log( ); 

	
	dataout =  "Total viewers " + viewers + " Total:" + likes
				var el4 =   document.getElementById("info2") ;
	el4.innerHTML =  dataout; 
			
			
        });
		//Get Stickers
        channel.bind('onPartnerSticker', function (data)
        {
		
		console.log("Partener sticker data " + data )
            //handleOnOldPartnerSticker(data);
        });
   
		channel.bind ('onSuperMessage', function (data)
			{        
	
			dataout = dataout + "<div class='msg' style='color:red'>"    +data.message.superMessages[0].name +" <b> " + data.message.superMessages[0].comment + "</b><div>"; 
			displayIt(dataout);
			
		//	
		});
		
	
	
	
}  
function dealwithFreeStickers(data){

	var ids = data.message.stickers[0].stickerUserId; 
	var stickername = data.message.stickers[0].assetSku; 
	var fullpath = "https://ynassets.younow.com/subscriptionsTiers/usersAssets/live/" + ids+"/" +stickername +"/web_" +stickername +".png?assetRevision=1 " ;
	var sent_user = data.message.stickers[0].profile;
	var imagedata= "<div class='msg'    style='width:200px;height:auto;font-size:15px;' >" +sent_user+"  <br><img src='" + fullpath +"' style='color:white; width:50px;height:50px'/> </div>"

	displayIt(imagedata); 
 

}
function GetuserImage(data){


return   "https://ynassets.younow.com/user/live/" + data + "/" + data +".jpg"; 



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
  var time =   hour + ':' + min ;
  return time;
}
function displayIt(data){

	dataout = data;
	var el2 =   document.getElementById("chat") ;
	el2.innerHTML =   el2.innerHTML  + dataout; 

}



function playAudio() { 
		var x = document.getElementById("myAudio"); 
	
		
	  var playPromise = x.play();
 
  if (playPromise !== undefined) {
    playPromise.then(_ => {
	console.log("playing");
	
      // Automatic playback started!
      // Show playing UI.
      // We can now safely pause video...
      x.pause();
    })
    .catch(error => {
	console.log(error);
	
      // Auto-play was prevented
      // Show paused UI.
    });
  }	
		
		
		
		
} 
