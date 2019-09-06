var http = require('http');
var path = require('path')
var express = require('express')
var querystring = require('querystring');
var bodyParser = require('body-parser');
var fs = require('fs');
var text = require('./text.js');
var app = express()
var socket

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

app.get('/sos', function (req, res) {
  console.log(req.query);
  res.send('succeed');
})

server.listen(9001, () => {
  console.log('App listening at port 9001')
})

io.sockets.on('connection', (socket) => {
  socket.on('sending', function (bodyID) {
    var info = '<div class="information"><ul><li>求助用户ID: ' + bodyID.userid + '</li><li>求助用户姓名: ' + bodyID.userplace + '</li><li>求助用户紧急联系电话: ' + bodyID.userplace + '</li><li>求助用户坐标 ( ' + body.X + ',' + body.Y + ' )</li></ul></div>';
    write(info);
    var mainPage =
      '<style>' +
      '.stripe{width: 76%;height: 73%;margin: 50px; border-style: solid; border-width: 2px;position:relative;' +
      'background: linear-gradient(90deg,rgba(101,203,227) 50%,transparent 0),' +
      'linear-gradient(rgba(225,225,225) 50%,transparent 0);' +
      'background-size: 100px 100px;' +
      '}</style>' +
      '<div class="stripe"><div class="helpCoordinate"></div></div>';
    write(mainPage);
    var str = '';
    str += '<style>' +
      '.helpCoordinate {width:50px; height:50px; background:red; position:absolute;' +
      'margin:auto; left:' + '50' + 'px;bottom:' + '50' + 'px;}' +
      '</style>';
    write(str);
  })
})
function xx() {
  id = 1;
  positoin = 2;
  socket = io.connect('http://127.0.0.1:9001/');
  socket.emit('sending', { userid: id, userplace: positoin });
}
// var getHelpCoordinate =
//   '<html><head><meta charset="utf-8"><title>求助手环</title></head>' +
//   '<body>' +
//   '<form method="post">' +
//   '求助用户ID: <input name="ID"><br>' +
//   '求助坐标X: <input name="X"><br>' +
//   '求助坐标Y: <input name="Y"><br>' +
//   '<input type="submit">' +
//   '</form>' +
//   '</body></html>';

// var mainPage =
//     '<style>'+
//     '.stripe{width: 76%;height: 73%;margin: 50px; border-style: solid; border-width: 2px;position:relative;'+
//         'background: linear-gradient(90deg,rgba(101,203,227) 50%,transparent 0),'+
//                     'linear-gradient(rgba(225,225,225) 50%,transparent 0);'+
//         'background-size: 100px 100px;'+
//       '}</style>'+
//     '<div class="stripe"><div class="helpCoordinate"></div></div>';

// http.createServer(function (req, res) {
//   var body = "";
//   req.on('data', function (chunk) {
//     body += chunk;
//   });
//   req.on('end', function () {
//     // 解析参数
//     body = querystring.parse(body);
//     // 设置响应头部信息及编码
//     res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

//     if(body.X & body.Y) { // 输出提交的数据
//         // res.write("求助用户ID: " + body.ID);
//         // res.write("     ");
//         // res.write("求助坐标X: " + body.X);
//         // res.write("     ");
//         // res.write("求助坐标Y: " + body.Y);
//         text.checkUser(body.ID).then(function(data){
//             console.log(data);
//             var info ='<div class="information"><ul><li>求助用户ID: '+body.ID+'</li><li>求助用户姓名: '+data[0].user_name+'</li><li>求助用户紧急联系电话: '+data[0].user_phone+'</li><li>求助用户坐标 ( '+body.X+','+body.Y+' )</li></ul></div>';
//         res.write(info);
//         res.write(mainPage);
//         var x = (body.X-1) * 50;
//         var y = (body.Y-1) * 50;
//         var str = '';
//         str += '<style>' +
//         '.helpCoordinate {width:50px; height:50px; background:red; position:absolute;'+
//         'margin:auto; left:'+x+'px;bottom:'+y+'px;}'+
//         '</style>';
//         res.write(str);
//         res.end();
//         });
//         // var info ='<div class="information"><ul><li>求助用户ID: '+body.ID+'</li><li>求助用户姓名: '+'xxx'+'</li><li>求助用户紧急联系电话: '+'xxxxxx'+'</li><li>求助用户坐标 ( '+body.X+','+body.Y+' )</li></ul></div>';
//         // res.write(info);
//         // res.write(mainPage);
//         // var x = (body.X-1) * 50;
//         // var y = (body.Y-1) * 50;
//         // var str = '';
//         // str += '<style>' +
//         // '.helpCoordinate {width:50px; height:50px; background:red; position:absolute;'+
//         // 'margin:auto; left:'+x+'px;bottom:'+y+'px;}'+
//         // '</style>';
//         // res.write(str);
//     } else {  // 输出表单
//         res.write(getHelpCoordinate);
//         res.write(mainPage);
//         res.end();
//     }
//   });
// }).listen(9001, function(){
//     console.log('服务器正在端口号：9001上运行......');
//     console.log('Server running at http://127.0.0.1:9001/');
// })