// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isValidDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}
// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  var {date} =req.params
  var arr =date.split('-')
  var validDate;
  // console.log(arr,!isNaN(date),parseInt(date),!date instanceof Date)
  if(arr.length<3){
    if(!isNaN(date)){
      date=parseInt(date)
    }
  }
  validDate =new Date(date).toUTCString()
  if(validDate==="Invalid Date"){
    return res.json({error:"Invalid Date"})
  }
  res.json({unix:new Date(date).getTime() ,utc:validDate})
});



// listen for requests :) 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
