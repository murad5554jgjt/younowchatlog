//Basic  backend server  that  feeds text files  saved from chat js

const express = require('express')
const fs = require("fs");
const app = express()
const fetch = require("node-fetch");
var UserOffline = false; 

var lasttime = 0;

const port = 3000

const  username = "";



var oldtime , temptime; 
var start = false;
const date = require('date-and-time')
const now  =  new Date();
const s = date.format(now,'MM_DD_YYYY_');
  

app.use(express.static('public'));
app.use(express.static('./'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/', (req, res) => {
if(UserOffline!=false){
	
 res.redirect('/chatlog.htm');
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
