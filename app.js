var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var subform = require('./routes/subform');
var usecookies = require('./routes/usecookies');


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var multer = require('multer');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    console.log("%s %s",req.method,req.url);
    next();
});

app.use(multer({ 
  dest:'./public',
  rename: function (fieldname, filename) {
  return 'adc'
  }
 }));



app.use('/', routes);
app.use('/subform', subform);
app.use('/usecookies', usecookies);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


server.listen(80);
//module.exports = app;
var a=0;
var socketflag;

io.on('connection', function (socket) {
    
  console.log("socketid is:"+socket.id+" joined");
  socket.emit('news', { hello: 'world' });
  socket.emit('tcpstate', { dat:tcpstate });

  socket.on('join', function (data) {
    socketflag=0;
    for(a=0;a<socket.rooms.length;a++)
      if(socket.rooms[a]==data.room)socketflag=1;

   if(socketflag)
     socket.leave(data.room,function(){
       socket.emit('roomsin',{room:socket.rooms});
       console.log(socket.id+" leaved "+data.room);
    });
   else
    socket.join(data.room,function (err){
       console.log(socket.id+" joined "+socket.rooms[socket.rooms.length-1]);
       socket.emit('roomsin',{room:socket.rooms});
    });
  
   
  });

  socket.on('disconnect', function(){
    console.log("socketid is:"+socket.id+" disconnect");
  });
  socket.on('reset', function(){
    if(resetflag)resetflag=0;
    else resetflag=1;
   // console.log("reset is "+resetflag);
    io.emit('success', { dat:"reset is "+resetflag })
  });
  socket.on('update',function (data){  
    console.log("2");
    fs.readFile('public/adc.bin', function(err,data){
   if(err){
      console.error(err);
   }else{
    count=0;
    data.copy(buf, 1, 0, buflen);
    buf[0]=count;
    len= parseInt(data.length/buflen);
    datlen=data.length;
    console.log(buf);
    console.log(data.length);
   // console.log(len);
    io.emit('success', { dat:"3秒后开始升级 文件块数："+len })
       }
  });
    
   setTimeout(function(){
    soc.write(buf);
    console.log("3");
   },1000);

  })

  socket.on('request',function (data){
   //socket.in('平南').emit('updata', { hello: 'hello,平南' });  当前socket接收不到
    io.in('平南').emit('updata', { dat: 'hello,平南' });
    io.in('保定南').emit('updata', { dat: 'hello,保定南' });
  
     console.log(data);
  });
  
    
 
});


var soc; 
var net = require('net');
var dat,a;
var firstdat = false;
var tcpstate='close';
var buf1=new Buffer(1);
var tcpserver = net.createServer(function (socket) {
  // 新的连接
  //\tcpsendserver.socket.write(0x31);
 

  io.emit('tcpstate', { dat:tcpstate});
  socket.on('close', function(err) {
    tcpstate='close';
    io.emit('tcpstate', { dat:tcpstate});
    });
  console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);
  //console.log(socket.id.toString());
  socket.on('data', function (data) {

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
    console.log(array.length);
  
    
  });
});
  
tcpserver.listen(23, function () {
  console.log('server bound');
});



var fs = require('fs');
var buflen=128;
var buf=new Buffer(buflen+1);
var buf1=new Buffer(buflen+1);
var count=0;
var len;
var datlen;
var count1;
var count2;
var delay=50;
var resetflag=1;
var tcpsendserver = net.createServer(function (socket) {
  // 新的连接
  io.emit('success', { dat:"connected" })
    soc=socket;
   socket.on('data', function (data) {
    if(data[0]==0x0A&&data[1]==0x34&&data[2]!=count1)//数据
    {
        count1=data[2];
        console.log(data);
        array=new Array(data.length);
        for(a=0;a<data.length-2;a++)
        {
        array[a]=data[a+2];
        }
        array[data.length-1]=0;
        array[data.length-2]=0;
        io.in('保定南').emit('updata', { dat:array });
    }
    if(data[0]==0x0A&&data[1]==0x33)//心跳
      {
        if(resetflag)
        setTimeout(function(){
        count2++;
        io.emit('success', { dat:count2 })
        soc.write("2");
        },100);
      }
    else if(data[0]==0x0A&&data[1]==0x30)//send complete
      {count=0; 
        console.log("success");
        io.emit('success', { dat:"success" });}
    else if(data[0]==0x0A&&data[1]==0x31)//send success .  next pack
    {
    if(count<len)
    {
        console.log(count+'   '+(len-1));

        count++;
           fs.readFile('public/adc.bin', function(err,data){
           if(err){
              console.error(err);
            }else{
            data.copy(buf, 1, count*buflen, (count+1)*buflen);
            if (count>len-1) {
              for(var i=datlen-(count)*buflen;i<buflen+1;i++)
                buf[i]=0xff;
            }
            buf[0]=count;
            setTimeout(function(){
              console.log(buf);
             socket.write(buf);
         //    console.log(buf);
             io.emit('success', { dat:count+"/"+len })
             },delay);
                }
     });
      

    }
   else
    { 
      
      if(count%2==0)
      { 
        count++;
        setTimeout(function(){
        buf1[0]=count; 
        for(a=1;a<129;a++)
        buf1[a]=0xff;
        socket.write(buf1);
        console.log(buf1);
       },delay);
      }
      else
      {
      console.log("end");
      buf[0]=0xff
      setTimeout(function(){
      socket.write(buf);
     // console.log(buf);
      },delay);
      count=-1;
      }
    }
  }
  
   });

});
  
tcpsendserver.listen(5050, function () {
  console.log('server 5050 bound');
});