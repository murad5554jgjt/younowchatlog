function search_results(searchoutput){
const data2 =JSON.parse(searchoutput);




return data2.tracks.items[0].uri;
	
	


}

 function searchForSong(q){

	//
	var url_search= "https://api.spotify.com/v1/search?q="+q + "&type=track" ;
	
	
		var xhr = new XMLHttpRequest();
	
	xhr.open("GET", url_search);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", "Bearer  BQB_hJn6YHW905iijWVjULCwCp_jLuXBwc0l-r9pTQvkiqrBHN7k6kRu4g_rmQ8rjaOgrIiDyNSPqTL6BmZXYnY05Gjf4WsmUyhS4wEOk8mfjlCNO3hpdEbxE7yi8mIREKxHwQgdkb5gEc5G0WmDf7-WP5tFSu1lwc1TPt0s8YgEpnMSUM8urz_1tW8O3zk");


		xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
//					console.log(); 
addToQ( (search_results(xhr.responseText)) );

	
				}};

				xhr.send();
	
}


function addToQ(uri){
	

	//

	console.log(uri);
	var urladd="https://api.spotify.com/v1/playlists/2hAgtwOpsSBqUcJDb4RbSI/tracks?position=1&uris="+uri;
	var xhr = new XMLHttpRequest();
xhr.open("POST", urladd);

xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Authorization", "Bearer  BQCY3eEIV-4-vdvK3G_j5gbwamjjtJn_-ntZl3HwdSGeDKCIvioK-M00LPsPTHNptMmlLLKHIz3Rl8NU1WGHW8KtRd2OXm3eEZM5QHWrdEDhQlb_3VJacrsBLPLm4ZX9q3W4GLrC0hGK46l-9RJtgJjGOIAUzNUol-PhoWRwxrCD97NBjPZ2vcsKJWDGFh_X_BIzNYR7xnZIkRAxQ9CXkq6XH5daxHyyVnGxEFnGSIR8VA4AQ6Be7rYHzVKd");


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
	xhr.setRequestHeader("Authorization", "Bearer  BQBM9JibDAuMoKntdeCNFD2s4d2PYMQzbl8qiDP6aZwI_pL3_tMnIOjvjWaEnThFf3Gw30hgQvkVe-V3g5X8KSaXkt2-keH7Y8RgeabjmIPMB_02wNUcoIWqXAVk7YjeBsYOFUayF8AvDSsnHqNSylJ6Jgb_CiUSpB0_x08-1O8mlTpHFP6JvrcvnY3Eu_KXDWrgbpD5k_mka8qviFAKA7WbM--Tp3E");


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
	xhr.setRequestHeader("Authorization", "Bearer  BQDK01ejzkedTnsIci0Efbd3tpU9S_jRL_vbbD9AJNK6LWH6sIrcIpZfOXQcxobL2PxOGe3UkZdNm_ppY1BT--wN6C8WV99IMNOwGhd_8lcAq0vFT-rA6ReA7kd-W4J-253f94IiAE54A-tP3IeAKoWdZS_4_we3Kwrz9crbn1Pavm8eSTXlu6QKLMLNEoztPunN");


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
			outputCurrentPlaying = "<div style='font-size:40px;'>Playing " + songName + " by " + songBy +"<br>" + current +"/" +totalPlay+"</div>";

			isplayingS=data2.item.album.id;

			displayPopUp2(outputCurrentPlaying); 

}
