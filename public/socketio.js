  
  var ip_addr = document.location.hostname;
  var socket = io.connect(ip_addr);
  socket.on('news', function (data) {
    document.getElementById("socketstate").innerHTML="服务器已连接"
  });

  function joinroom(roomnumber){
      socket.emit('join', { room:roomnumber });
  };

  function cleartxt(){
    document.getElementById("chat-window").value="";
  };
  var x=20;
  function setrows(){
    if (x>50) x=20;x+=1;
    var y = x.toString();
    document.getElementById("chat-window").rows=y;
  };
    function clearrows(){
    if(b>50)b=20;
    b+=1;
    var y = b.toString();
    document.getElementById("clearlen").innerHTML=b;
  };
  var a,b=20;
  socket.on('updata', function (data) {
    var charvalue=document.getElementById("chat-window").value;
    if(document.getElementById("chat-window").value.length>0)
      if(document.getElementById("chat-window").value.match(/\n/g).length>b)
        document.getElementById("chat-window").value=" ";
    for(a=0;a<data.dat.length;a++)
    document.getElementById("chat-window").value+=data.dat[a]+" ";
    document.getElementById("chat-window").value+="\n";
    console.log(data.dat.length);
  });
socket.on('tcpstate', function(data){
  if(data.dat=='close')document.getElementById("tcpstate").innerHTML='tcp关闭';
   else document.getElementById("tcpstate").innerHTML=data.dat;
  });

socket.on('disconnect', function(){
   document.getElementById("socketstate").innerHTML="服务器已断开"
  });
/////////////who in room
  socket.on('roomsin', function (data) {
    data.room[0]="已经进入的车站";
    document.getElementById("roomstate").innerHTML=data.room;
  });

 