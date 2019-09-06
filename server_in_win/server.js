var http = require('http');
var path = require('path');
var express = require('express');
var querystring = require('querystring');
var bodyParser = require('body-parser');
var fs = require('fs');
var text = require('./text.js');
var app = express();
var socket
var KDtree = require('./KDtree.js');

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

var wifi = ['d0:16:b4:d6:8d:4a', '49:19:8b:21:40:29'];
var wifistrength = [ , ];
var canceltmp = [ , ];

var cnt = 0;

app.get('/sos', function (req, res) {
  console.log(req.query);
  for (var i = 0; i < req.query.RSSI.length; i++) {
    for(var j = 0; j <= 1; j++){
    if (wifi[j] == req.query.RSSI[i]) {
      wifistrength[j] = Math.abs(Number(req.query.RSSI[i + 1]));
    }
  }
}
console.log(wifistrength);
console.log(KDtree.getPosi(wifistrength));
var tmp = KDtree.getPosi(wifistrength)
canceltmp[0]=tmp.x;
canceltmp[1]=tmp.y;
// console.log(KDtree.getPosi([1,2,3]))
  text.checkUser(req.query.id).then(function (data) {
    console.log(data);
    for (var i = 0; i < allSockets.length; i++) {
      allSockets[i].emit('sendinfo', req.query.id, data[0].user_name, data[0].user_phone, tmp.x, tmp.y);
    }
  })
  // for(var i=0;i<allSockets.length;i++){
  //   allSockets[i].emit('sendinfo',req.query.id, x, y);
  // }
  res.send('succeed');
})

app.get('/cancel', function (req, res) {
  console.log(req.query);
  for (var i = 0; i < allSockets.length; i++) {
    allSockets[i].emit('cancelinfo', req.query.id, canceltmp[0], canceltmp[1]);
  }
  res.send('succeed cancel');
})

app.post('/', function (req, res) {
  return res.redirect("/public/mainPage.html");
})

server.listen(9001, () => {
  console.log('App listening at port http://127.0.0.1:9001/mainPage.html')
})

var allSockets = [];
io.sockets.on('connection', (socket) => {
  allSockets.push(socket);
  // socket.on('sending', function (body) {
  //   console.log("aaaaaa");
  //   socket.emit('sendinfo',id, position);
  // })
})
