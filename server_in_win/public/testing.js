var socket

var id = 1;
socket = io.connect('http://127.0.0.1:9001/');

window.onload=function(){
  socket.emit('sending',{userid: id});
 }
socket.on('sendinfo', function(id, name, phone, x, y) {
    var info = '<div class="info"><ul><li>求助用户ID: ' + id + '</li><li>求助用户姓名: ' +name + '</li><li>求助用户紧急联系电话: ' + phone + '</li><li>求助用户坐标 ( ' + x + ',' + y + ' )</li></ul></div>';
    $(".info").replaceWith(info);
    // var str = '<div class="helpCoordinate" style="width:33.5%; height:33.5%; background:red; position:absolute;margin:auto; left:10%;bottom:10%;"></div>';
    // $(".stripe").append(str);
    $($($(".stripe")[0]).find('td')[(2-y)*2+x-1]).removeClass('orColor');
    $($($(".stripe")[0]).find('td')[(2-y)*2+x-1]).addClass('bgColor');
})
socket.on('cancelinfo', function(id, x, y) {
  var cancelinfo = '<div class="info">用户ID: '+ id +'取消求助</div>';
  $(".info").replaceWith(cancelinfo);
  // var cancelstr = '';
  // $(".helpCoordinate").replaceWith(cancelstr);
  $($($(".stripe")[0]).find('td')[(2-y)*2+x-1]).removeClass('bgColor');
  $($($(".stripe")[0]).find('td')[(2-y)*2+x-1]).addClass('orColor');
})