
var soc; 
var net = require('net');
var dat,a;
var firstdat = false;
var tcpstate;
var buf1=new Buffer(1);
var soa;
module.exports = function (io,port,soa){
net.createServer(function (socket) {
  // 新的连接
  //\tcpsendserver.socket.write(0x31);
 
  tcpstate='close';
  io.emit('tcpstate', { dat:tcpstate});
 
  console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);
  //console.log(socket.id.toString());
   socket.on('close', function(err) {
    tcpstate='close';
    io.emit('tcpstate', { dat:tcpstate});
    });
  socket.on('data', function (data) {
    soa=socket;

    socket.write("1");
   
   array=new Array(data.length);
   for(a=0;a<data.length;a++)
    {
      array[a]=data[a];
      array[a]=array[a].toString(16);
      if(array[a]=="0"||
        array[a]=="1"||
        array[a]=="2"||
        array[a]=="3"||
        array[a]=="4"||
        array[a]=="5"||
        array[a]=="6"||
        array[a]=="7"||
        array[a]=="8"||
        array[a]=="9"||
        array[a]=="a"||
        array[a]=="b"||
        array[a]=="c"||
        array[a]=="d"||
        array[a]=="e"||
        array[a]=="f")
        array[a]="0"+ array[a];
     // if (array[a]==",") array[a]=" ";
    }
    io.in('平南').emit('updata', { dat:array });
//    console.log(array.length);
  
    
  });
}).listen(port, function () {
  console.log('server bound '+port);
});
return soa;
}