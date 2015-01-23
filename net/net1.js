
var soc; 
var net = require('net');
var dat,a;
var firstdat = false;
var tcpstate;
var buf1=new Buffer(1);
var soa,sob;
 array1=new Array();//可以10个链接

net.createServer(function (socket) {

 soa=socket;

  //\tcpsendserver.socket.write(0x31);
 

  socket.on('data', function (data) {
   
    
    soa.write("1");

for (var i = 0; i < array1.length ; i++) {
      array1[i].write(data);
  }; 



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
   
   //io.in('平南').emit('updata', { dat:array });
  });
}).listen(23, function () {
  console.log('server bound '+23);
});

net.createServer(function (socket) {

  array1.push(socket);

  sob=socket;
  socket.on('close', function (data) {
  
  for (var i = 0; i < array1.length; i++) 
    if(socket == array1[i])
      array1.splice(i,1);
  
  });
}).listen(8080, function () {
  console.log('send server bound '+7070);
});


