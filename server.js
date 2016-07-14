var express = require('express');
var querystring = require('querystring');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var words = [{word:'Selfie', replacement:'self-portrait'},{word:'yummers', replacement:'delicious'},
{word:'outchea', replacement:'are out here'},{word:'bruh', replacement:'wow'},
{word:'doge', replacement:'pug'},{word:'cilantro', replacement:'soap'},
{word:'bae', replacement:'loved one'},{word:'swag', replacement:'style'},
{word:'yolo', replacement:'carpe diem'}];
app.use('/message',urlencodedParser,function(req, res, next){
  var newMessage = '';
  var sentance = req.body.message.split(' ');
  for(var i = 0; i < sentance.length; i++){
    var tempWord = sentance[i];
    for(var j = 0; j < words.length; j++){
      var checkWord = tempWord.toLowerCase();
      var filterSplit = checkWord.split(words[j].word.toLowerCase());
      if(filterSplit.length > 1){
        tempWord = filterSplit[0] + words[j].replacement + filterSplit[1];
      }
    }
    newMessage += tempWord + ' ';
  }
  res.body = newMessage;
  next();
});

app.post('/message', urlencodedParser, function (req, res) {
  if (!req.body.message) return res.sendStatus(400);
  res.send(res.body);
});
// app.use(function(err, req, res, next){
//   console.log('400');
//   res.status(400).json({
//     message:'message sent'
//   });
// });

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening on',host, port);
});