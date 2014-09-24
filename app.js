var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var subform = require('./routes/subform');
var usecookies = require('./routes/usecookies');
var tcpserver = require('./net/net')




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
var tcpstate='close';
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
var so;
tcpserver(io,23,so);

  
//tcpserver.listen(23, function () {
//  console.log('server bound');
//});


var net = require('net');
var fs = require('fs');
var buflen=128;
var buf=new Buffer(buflen+1);
var buf1=new Buffer(buflen+1);
var count=0;
var len;
var datlen;
var count1;
var count2=0;
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
        array=new Array(data.length-2);
        array[0]=data[2];
        for(a=1;a<data.length-2;a++)
        {
       // array[a]=data[a+2];
        array[a]=res[data[a+2]];
        }
        io.emit('updata', { dat:array });
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



    if(data[0]==0x0A&&data[1]==0x31)//send success .  next pack
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
              for(var i=datlen-(count)*buflen+1;i<buflen+1;i++)
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























var res=[" ",
"下行1道发车信号开放",
"下行2道发车信号开放",
"下行3道发车信号开放",
"下行4道发车信号开放",
"下行5道发车信号开放",
"下行6道发车信号开放",
"下行7道发车信号开放",
"下行8道发车信号开放",
"下行9道发车信号开放",
"下行10道发车信号开放",
"下行11道发车信号开放",
"下行12道发车信号开放",
"下行13道发车信号开放",
"下行14道发车信号开放",
"下行15道发车信号开放",
"下行16道发车信号开放",
"下行17道发车信号开放",
"下行18道发车信号开放",
"下行19道发车信号开放",
"下行20道发车信号开放",
"下行1道接车信号开放",
"下行2道接车信号开放",
"下行3道接车信号开放",
"下行4道接车信号开放",
"下行5道接车信号开放",
"下行6道接车信号开放",
"下行7道接车信号开放",
"下行8道接车信号开放",
"下行9道接车信号开放",
"下行10道接车信号开放",
"下行11道接车信号开放",
"下行12道接车信号开放",
"下行13道接车信号开放",
"下行14道接车信号开放",
"下行15道接车信号开放",
"下行16道接车信号开放",
"下行17道接车信号开放",
"下行18道接车信号开放",
"下行19道接车信号开放",
"下行20道接车信号开放",
"下行1道通过车信号开放",
"下行2道通过车信号开放",
"下行3道通过车信号开放",
"下行4道通过车信号开放",
"下行5道通过车信号开放",
"下行6道通过车信号开放",
"下行7道通过车信号开放",
"下行8道通过车信号开放",
"下行9道通过车信号开放",
"下行10道通过车信号开放",
"下行11道通过车信号开放",
"下行12道通过车信号开放",
"下行13道通过车信号开放",
"下行14道通过车信号开放",
"下行15道通过车信号开放",
"下行16道通过车信号开放",
"下行17道通过车信号开放",
"下行18道通过车信号开放",
"下行19道通过车信号开放",
"下行20道通过车信号开放",
"进1道停车",
"进2道停车",
"进3道停车",
"进4道停车",
"进5道停车",
"进6道停车",
"进7道停车",
"进8道停车",
"进9道停车",
"进10道停车",
"进11道停车",
"进12道停车",
"进13道停车",
"进14道停车",
"进15道停车",
"进16道停车",
"进17道停车",
"进18道停车",
"进19道停车",
"进20道停车",
"经1道通过",
"经2道通过",
"经3道通过",
"经4道通过",
"经5道通过",
"经6道通过",
"经7道通过",
"经8道通过",
"经9道通过",
"经10道通过",
"经11道通过",
"经12道通过",
"经13道通过",
"经14道通过",
"经15道通过",
"经16道通过",
"经17道通过",
"经18道通过",
"经19道通过",
"经20道通过",
"上行1道发车信号开放",
"上行2道发车信号开放",
"上行3道发车信号开放",
"上行4道发车信号开放",
"上行5道发车信号开放",
"上行6道发车信号开放",
"上行7道发车信号开放",
"上行8道发车信号开放",
"上行9道发车信号开放",
"上行10道发车信号开放",
"上行11道发车信号开放",
"上行12道发车信号开放",
"上行13道发车信号开放",
"上行14道发车信号开放",
"上行15道发车信号开放",
"上行16道发车信号开放",
"上行17道发车信号开放",
"上行18道发车信号开放",
"上行19道发车信号开放",
"上行20道发车信号开放",
"上行1道接车信号开放",
"上行2道接车信号开放",
"上行3道接车信号开放",
"上行4道接车信号开放",
"上行5道接车信号开放",
"上行6道接车信号开放",
"上行7道接车信号开放",
"上行8道接车信号开放",
"上行9道接车信号开放",
"上行10道接车信号开放",
"上行11道接车信号开放",
"上行12道接车信号开放",
"上行13道接车信号开放",
"上行14道接车信号开放",
"上行15道接车信号开放",
"上行16道接车信号开放",
"上行17道接车信号开放",
"上行18道接车信号开放",
"上行19道接车信号开放",
"上行20道接车信号开放",
"上行1道通过车信号开放",
"上行2道通过车信号开放",
"上行3道通过车信号开放",
"上行4道通过车信号开放",
"上行5道通过车信号开放",
"上行6道通过车信号开放",
"上行7道通过车信号开放",
"上行8道通过车信号开放",
"上行9道通过车信号开放",
"上行10道通过车信号开放",
"上行11道通过车信号开放",
"上行12道通过车信号开放",
"上行13道通过车信号开放",
"上行14道通过车信号开放",
"上行15道通过车信号开放",
"上行16道通过车信号开放",
"上行17道通过车信号开放",
"上行18道通过车信号开放",
"上行19道通过车信号开放",
"上行20道通过车信号开放",
"进1道停车",
"进2道停车",
"进3道停车",
"进4道停车",
"进5道停车",
"进6道停车",
"进7道停车",
"进8道停车",
"进9道停车",
"进10道停车",
"进11道停车",
"进12道停车",
"进13道停车",
"进14道停车",
"进15道停车",
"进16道停车",
"进17道停车",
"进18道停车",
"进19道停车",
"进20道停车",
"经1道通过",
"经2道通过",
"经3道通过",
"经4道通过",
"经5道通过",
"经6道通过",
"经7道通过",
"经8道通过",
"经9道通过",
"经10道通过",
"经11道通过",
"经12道通过",
"经13道通过",
"经14道通过",
"经15道通过",
"经16道通过",
"经17道通过",
"经18道通过",
"经19道通过",
"经20道通过",
"下行列车1接近",
"下行列车1接近",
"下行列车1接近",
"下行列车进站",
"下行列车1离去",
"下行列车1离去",
"下行列车1离去",
"空",
"空",
"空",
"上行列车1接近",
"上行列车1接近",
"上行列车1接近",
"上行列车进站",
"上行列车1离去",
"上行列车1离去",
"上行列车1离去",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"空",
"平南女",
"平南男",
]