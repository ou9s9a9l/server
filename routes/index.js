var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
var supplies=new Array();
var EventEmitter = require('events').EventEmitter;  

var len=0,templen=0;
 
function handleFile(path, floor,ee,item) {  
    var blankStr = '';  
    for (var i = 0; i < floor; i++) {  
        blankStr += '    ';  
    }  
	len++;
    console.log(len+'len');
    fs.stat(path, function(err1, stats) {  
        if (err1) {  
            console.log('stat error');  
        } else {  
            if (stats.isDirectory()) {  
                console.log('+' + blankStr + path);  
            } else {  
                console.log('-' + blankStr + path); 
          		supplies.push(item);
            }  
              templen++;
              console.log(templen+'templen');
 		 if(templen==len)
 		 {console.log(len+'complete');ee.emit('complete');}
        }  
    })  
 
//    ee.emit('complete');

}  

function walk(path, floor,ee) { 
 
   // handleFile(path, floor);  
    floor++;  
    fs.readdir(path, function(err, files) { 

        if (err) {  
            console.log('read dir error');  
        } else {  
            files.forEach(function(item) {  
                var tmpPath = path + '/' + item;  
                fs.stat(tmpPath, function(err1, stats) {  
                    if (err1) {  
                        console.log('stat error');  
                    } else {  
                        if (stats.isDirectory()) {  
                         //   walk(tmpPath, floor, handleFile);  
                        } else {  
                            handleFile(tmpPath, floor,ee,item);  
                            
                        }  
                    }  
                })  
            });  

        }  
    });  

    
} 
function render(res,title,length) { 
  supplies=new Array();
  len=0,templen=0
  var ee = new EventEmitter();
  walk('public',0,ee);
  ee.on('complete', function() {
  console.log(supplies);
  res.render('index/index', { title: title,length:length,supplies:supplies });
  });
}

router.get('/', function(req, res) {

 render(res,'语音提示',' ');
  
});

router.post('/upload', function(req, res) {

if(!req.files || !req.files.myFile) {
	render(res,'语音提示','error');
    //res.render('index', { title: '语音提示',length: 'error' });
  }
 else
  render(res,'语音提示','length = '+req.files.myFile.size);
  //res.status(200).send('Done! File uploaded to: ' + req.files.myFile.path);
  //res.render('index', { title: '语音提示',length: 'length = '+req.files.myFile.size ,supplies:supplies});
  //console.log(req.files.myFile.size);

});
module.exports = router;




