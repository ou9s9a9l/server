function Base(name){
	console.log(name);}
	b = new Base('oyx');
	c = new Base('oyx1')
console.log(Base.length);
Base.call(c)
<script type="text/javascript">
//<![CDATA[
$(function(){
	var $para = $(".nm_p");			// 获取<p>节点
	var $li = $(".nm_ul li:eq(1)");   // 获取第二个<li>元素节点

	var p_txt = $para.attr("title"); // 输出<p>元素节点属性title
	var ul_txt =  $li.attr("title");	// 获取<ul>里的第二个<li>元素节点的属性title
	var li_txt =  $li.text();	   // 输出第二个<li>元素节点的text

	$("#btn_1").click(function(){
		alert(ul_txt);
	});
	
	$("#btn_2").click(function(){
		alert(li_txt);
	});
	
	$("#btn_3").click(function(){
		alert(p_txt);
	});
});
//]]>
</script>
http://wo.yao.cl/htm_data/7/1411/1273522.html 