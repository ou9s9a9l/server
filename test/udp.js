var dgram = require("dgram");

var server = dgram.createSocket("udp4");
var moment = require('moment');
var message = new Buffer("Some bytes");
//console.log(moment().format('h:mm:ss:SSS  '));"182.92.190.122"
//server.send(message, 0, message.length, 8080, "192.168.8.101", function(err, bytes) {
//  console.log(moment().format('h:mm:ss:SSS  '));
//});
server.bind(40000);
server.send(message, 0, message.length, 40000, "182.92.190.122", function(err, bytes) {
  console.log(moment().format('h:mm:ss:SSS  '));
});
server.on("message", function (msg, rinfo) {
	console.log(moment().format('h:mm:ss:SSS  '));
  console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
  
});

var buf1=new Buffer(1);
buf1="1";
console.log(buf1);



    call("showmsg"); 

    function call(functionName){ 

    eval("this."+functionName+"()"); 

    } 

    function showmsg(){ 

    alert("success"); 

    } 
