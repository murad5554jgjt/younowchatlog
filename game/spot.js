function search_results(searchoutput){
const data2 =JSON.parse(searchoutput);

return data2.tracks.items[0].uri;


}
function removeItemFromList(songId){
	var endpoints =	"https://api.spotify.com/v1/playlists/2hAgtwOpsSBqUcJDb4RbSI/"+songId+"/track";
	
	//https://developer.spotify.com/console/delete-playlist-tracks/?playlist_id=
	
	var xhr = new XMLHttpRequest();
				xhr.open("DELETE", endpoints);

				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.setRequestHeader("Authorization", "Bearer  BQCoBB12gdfGe7XrC3NSOnyhJbUEwAvOWyp8jx_odx9ALhHgjs_t-3sRZ06vWi6NKgAvwoBLDjBuDzWyPiQrY2gTPL5NEE3u-1o-GsBDxuUHJQ1LICr9zQiZc24qQrdZ9nM08YfwR8AxXDq9JkHHAFD_46Rf9NAepdunbiPCVf-uqxOhyoGFLtheXLb4rvxmMEjyz-RmFignHqMzFLf_SWcD1fKIteccmAt2llU-GsFfcUHb3x6OK-rH7pkA");


				xhr.onreadystatechange = function () {
				   if (xhr.readyState === 4) {
						
				//check_playlist(xhr.responseText);
					console.log(xhr.responseText);
					
					  
				   }};

				xhr.send();
	
}
function displayInformation(message){

var informationWindow =   document.getElementById("infoWin") ;
informationWindow.innerHTML = message; 
informationWindow.display = block ; 


setTimeout(() => {
  

 informationWindow.display="none"; 
 

}, 14500);
	
	
	
}
 function searchForSong(q){

	//https://developer.spotify.com/console/get-search-item/?q=&type=&market=&limit=&offset=&include_external=
	
	
	
	var url_search= "https://api.spotify.com/v1/search?q="+q + "&type=track" ;
	var xhr = new XMLHttpRequest();
	
	xhr.open("GET", url_search);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", "Bearer  BQBiS17BpHnFU_wGV9FJHfarRXqbph2NQASWoq4fQXdYvGIJm6achjJPfyEKNFjkZxN08qFkdU7ffi_84boh-x0_LTRZdxDBPhfXW-LYWEj9eJYH_rxl8SHoNoYFRbdzL21ZBF-62OCeWQkrNOZmJsCnb1p-X7z5e-1WpOvyHanFgx3Q355g1M2zM8WDJ74");


		xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					
					console.log(xhr.responseText); 
					
					
				addToQ( (search_results(xhr.responseText)) );

	
				}};

				xhr.send();
	
}


function addToQ(uri){
	

	//https://developer.spotify.com/console/post-playlist-tracks/?playlist_id=2hAgtwOpsSBqUcJDb4RbSI&position=1&uris=spotify%3Atrack%3A2sWCaFAWzl1tDBtdhhWG2z
	
	
	

	console.log(uri);
	var urladd="https://api.spotify.com/v1/playlists/2hAgtwOpsSBqUcJDb4RbSI/tracks?uris="+uri;
	var xhr = new XMLHttpRequest();
				xhr.open("POST", urladd);

				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.setRequestHeader("Authorization", "Bearer  BQCBXd68bbiWDTy9DmDTGTKEOeDMxOIdtQ02npMIU9bce11eujuKXZO_sVIIfqVEcxQMrOQT8l-SYPlmoGaA1IL5xeJox4FBaWGFHhNUCcJw2DDtNJF5YQpNv-MjskRHOvnMPaSynFajB1R_DNWru-pGJ8TJYzR8n0cTNmclaM2yAFh3Wz3eOuiPY5JqaUDaQ3ZwiTCMZJzwrFJaDRREsbbYMDpckdiDH-zIRM5rLEMd3mWTodKs8rzBK4GS");


				xhr.onreadystatechange = function () {
				   if (xhr.readyState === 4) {
						
				check_playlist(xhr.responseText);
					  
					  
				   }};

				xhr.send();

}
function check_playlist(dat){
		const results=JSON.parse(dat);
	console.log(results);
	
	
}
function getprev(){

var url2 ="https://api.spotify.com/v1/me/player/recently-played?limit=1" 
//https://developer.spotify.com/console/get-recently-played/?limit=&after=&before=

var xhr = new XMLHttpRequest();
							xhr.open("GET", url2);

							xhr.setRequestHeader("Accept", "application/json");
							xhr.setRequestHeader("Content-Type", "application/json");
							xhr.setRequestHeader("Authorization", "Bearer  BQAb1vvY8ZVtL0i7p3x5lg5SF2sxTFGiwQLir_xZryRaelshopQDf8Ae2Ia624TJ_K1en1J24hp56f_Hf74R5HMnSJkpsxsfFmzs3F0q0TSH_JlwmtYtGvleMxPD8rCzBqRX48eszkBoHcunszCRG5by8KOsMJiugF1GuapaOqEk65YT2l8C92mF2lkttZwiijYH");


							xhr.onreadystatechange = function () {
							   if (xhr.readyState === 4) {
									
								toJSon(xhr.responseText);
								  
								  
							   }};

							xhr.send();



}

function displayPopUp2(data){

	var popup = document.getElementById('spots');
	popup.style.visibility="visible" 
	popup.innerHTML	= data; 
		setTimeout(() => {
  

  // 👇️ hides element (still takes up space on page)

}, 14500);
	
}


window.setInterval(function() {
  get_current_song();
  
}, 7500);

function toJSon(data3){
	


	const stuff=JSON.parse(data3);
	var outputs = stuff

	var nameOfLastPlayed=outputs.items[0].track.name
	var thumbnail =  "<img src='"+outputs.items[0].track.album.images[0].url + "' style=width:200px;height:200px;border-radius:25px;>";
	var outputs = "<div style='font-size:20px;'>" + nameOfLastPlayed + "<br>" + thumbnail + "<br></div>";
	//document.getElementById('info').innerHTML  = "<span style='font-size:20px;color:black;'>" + nameOfLastPlayed + "<br>" + thumbnail + "<br>";
//console.log(outputs); 
displayPopUp2(outputs);

}
function requestSong(){
	
	//https://developer.spotify.com/console/post-playlist-tracks/
	
	
	var url = "https://api.spotify.com/v1/me/player/currently-playing";
	var xhr = new XMLHttpRequest();
	
	xhr.open("GET", url);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", "Bearer  BQBQV3ADTvLryiPBSpvCIVRwhlazYszao28pYtI2qb8i1GcIvAkd2uubwBI9KQA6Yv7ifc_D_KOCJ3UxW-Bipk2S9qDb637KfSOaA_u0_nH8y3BNde2EaeOJmsqch3C3afX5twhMPcLBO62e_ktlXjzmTGbMSTQyVJPE5fCBeeXRxQfyRgUKnjxVciIYJTIH7M9icLA_ZDrhHbd3pukyzAg89Aa0Hypdid_ecuSEaKJBADBILtBZHC5uheRq");


		xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					convertToJSON(xhr.responseText); 
	 
				}};

				xhr.send();

}
function get_current_song(){
	// https://developer.spotify.com/console/get-users-currently-playing-track/?market=&additional_types=

	var url = "https://api.spotify.com/v1/me/player/currently-playing";
	var xhr = new XMLHttpRequest();
	
	xhr.open("GET", url);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", "Bearer  BQBat5QkQcMqqiUoE-Z8oA1wKY7P4hKZNRDLE2QnXn6PegTBsDuCuZRkt8L5BXDYxWFgSGWjGNspBsgzI5SE8gRTQZdjaf60sriCuQH9wGOH2QPlj50RESsnWCujsqTQ1vo11qxkts38ZVHO7hiYvnXQOxYRWUM5lr94ZgcOc9_eJ2JWCNi4yByq6VDvmlYmVT5s");


		xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					convertToJSON(xhr.responseText); 
	 
				}};

				xhr.send();


	
}
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function convertToJSON(data){

		const data2 =JSON.parse(data);
		var outputCurrentPlaying ;
	
	

			const songBy = data2.item.album.artists[0].name ; 
			const songName = data2.item.name;
			const current = millisToMinutesAndSeconds(data2.progress_ms);
			const totalPlay =  millisToMinutesAndSeconds(data2.item.duration_ms);
			const songThumnail = data2.item.album.images[1].url;
			outputCurrentPlaying = "<div style='font-size:40px;background-color:whit;color:green;'>Playing " + songName + " by " + songBy +"<br>" + current +"/" +totalPlay+"</div>";

			isplayingS=data2.item.album.id;

			displayPopUp2(outputCurrentPlaying); 

}
