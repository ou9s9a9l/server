//document.getElementById("invcode").value="a*947371e0dc5f#d"
function replace(){
	var a=0,b=0;
	var tempmsg;
	var strM = "*f751e#45203b2df";
	var test = "0123456789abcdefghigklmnopqrstuvwxyz"
	f1=function (){
		if(b >= test.length)return;
		if(a < test.length)
		{	
			tempmsg = document.getElementById("check_info_invcode").innerHTML;
			console.log(tempmsg.length+' length');
			if(tempmsg.length! = 43&&tempmsg.length! = 10&&tempmsg.length! = 0)
				{console.log("return"); return;}

			var strtemp = strM.replace("#",test[b])
			document.getElementById("invcode").value=strtemp.replace("*",test[a]);
			invcodecheck();
			if(tempmsg.length != 10){console.log("fail"); a++;}
			else{console.log("wait");}
			setTimeout(function(){f1();}, 3000);
		}
		else
		{
			a = 0;b++;
			setTimeout(function(){f1();}, 3000);
		}

	}
	return f1;
}
var f = replace();
f();

a元947371e0dc5f旦d
f*e3436e55c8bd#c
*f751e045203b2df