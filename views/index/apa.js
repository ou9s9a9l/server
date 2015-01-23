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

app.use(multer({ 
  dest:'./public',
  rename: function (fieldname, filename) {
 //console.log('fieldname = '+fieldname);
 //console.log('filename = '+filename);
  return 'adc'
  }
 }));
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
    console.log("%fgs %s",req.method,req.url);
    next();
});





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

  socket.on('update1', function(dat){
   // UpdateServer.creatserver(io);
  // socket.write("0");
   if (socket.rooms[1]!=undefined)
   eval("Server"+socket.rooms[1]+".setflag(io,'"+dat.dat+"')");

   //ServerBDN.setflag(io);
  // console.log('room: '+socket.rooms);
   //io.emit('success', { dat:"writeable："+writeable })
  });



  socket.on('reset', function(){
    if(resetflag)resetflag=0;
    else resetflag=1;
   // console.log("reset is "+resetflag);
    io.emit('success', { dat:"reset is "+resetflag })
  });

  socket.on('update',function (data){  
  socket.write("0");
   ServerSJZ.setflag(io);
   console.log('update1');
  /*  fs.readFile('public/adc.bin', function(err,data){
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
*/
  })


  
    
 
});
setTimeout(function(){
 //   eval("ServerSJZ.setflag(io)"); 
}, 2000);
var so,sod;
tcpserver.set23(io,23,'PNZ');
tcpserver.set7070();


//tcpserver.set23(io,4040);
var soc;

var UpdateServer = require('./net/updatenet')
var ServerBDN = new UpdateServer(io,30000,'BDN');
var ServerSJZ = new UpdateServer(io,25252,'SJZ');


//soc=UpdateServer.returnsocket();

//{UpdateServer.data(io);


//UpdateServer.creatserver(io,8080,'PNZ');
//console.log(UpdateServer.version);
//tcpserver.listen(23, function () {
//  console.log('server bound');
//});


var net = require('net');
var fs = require('fs');


net.createServer(function (socket) {
  socket.on('data', function (data) {
  socket.write(data);
  });
}).listen(1000, function () {
  console.log('send server bound '+1000);
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
"下行1道通过信号开放",
"下行2道通过信号开放",
"下行3道通过信号开放",
"下行4道通过信号开放",
"下行5道通过信号开放",
"下行6道通过信号开放",
"下行7道通过信号开放",
"下行8道通过信号开放",
"下行9道通过信号开放",
"下行10道通过信号开放",
"下行11道通过信号开放",
"下行12道通过信号开放",
"下行13道通过信号开放",
"下行14道通过信号开放",
"下行15道通过信号开放",
"下行16道通过信号开放",
"下行17道通过信号开放",
"下行18道通过信号开放",
"下行19道通过信号开放",
"下行20道通过信号开放",
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
"上行1道通过信号开放",
"上行2道通过信号开放",
"上行3道通过信号开放",
"上行4道通过信号开放",
"上行5道通过信号开放",
"上行6道通过信号开放",
"上行7道通过信号开放",
"上行8道通过信号开放",
"上行9道通过信号开放",
"上行10道通过信号开放",
"上行11道通过信号开放",
"上行12道通过信号开放",
"上行13道通过信号开放",
"上行14道通过信号开放",
"上行15道通过信号开放",
"上行16道通过信号开放",
"上行17道通过信号开放",
"上行18道通过信号开放",
"上行19道通过信号开放",
"上行20道通过信号开放",
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
"下行列车2接近",
"下行列车3接近",
"下行列车进站",
"下行列车1离去",
"下行列车2离去",
"下行列车3离去",
"空",
"空",
"空",
"上行列车1接近",
"上行列车2接近",
"上行列车3接近",
"上行列车进站",
"上行列车1离去",
"上行列车2离去",
"上行列车3离去",
"空",
"空",
"空",
"南站列车一接近",
"南站列车二接近",
"南站列车三接近",
"空",
"空",
"南站列车一离去",
"南站列车二离去",
"南站列车三离去",
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
];

