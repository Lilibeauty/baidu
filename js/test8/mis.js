//这是一个数据报表定制页面，有许多筛选表单，有一个表格，以及几个图表，需要我们在不使用任何框架的情况下，完成这个页面的开发
//页面初始化的时候
//显示默认的数据及图表
//根据用户的表单选择，
//可以进行数据和图表的切换，但这些切换动作都是在当前页面中完成
//用户可以在当前页面上做一些数据修改，
//我们先设定这些修改仅对自己有效，
//将数据存在浏览器本地
//当用户选择了某种数据视图（选择了某些选项所展示的数据及图表）后，
//可以复制当前URL给其他人，其他人也能看见同样的视图，而不是回到初始化效果
var region = document.getElementById("area-select");
var type = document.getElementById("type-select");
//var table = document.getElementsByTagName("table")[0];
//table.innerHTML = writeOut(region.value, type.value);
//显示全部数据

//var region = document.getElementById("area-select");
//渲染新的表格(根据select选项获取数据)
region.onclick = function() {
	//显示华东
	if(region.value == "华东") {
		table.innerHTML = writeOut("华东", type.value);
	}
	//显示华北
	else if(region.value == "华北") {
		table.innerHTML = writeOut("华北", type.value);
	}
	//显示华南
	else if(region.value == "华南") {
		table.innerHTML = writeOut("华南", type.value);
	} else if(region.value == "all") {
		table.innerHTML = writeOut("all", type.value);
	}
}

//var type = document.getElementById("type-select");
type.onclick = function() {
	//显示手机
	if(type.value == "手机") {
		table.innerHTML = writeOut(region.value, "手机");
	}
	//显示笔记本
	else if(type.value == "笔记本") {
		table.innerHTML = writeOut(region.value, "笔记本");
	}
	//显示智能音箱
	else if(type.value == "智能音箱") {
		table.innerHTML = writeOut(region.value, "智能音箱");
	} else if(type.value == "all") {
		table.innerHTML = writeOut(region.value, "all");
	}
}

/*function getSelectValue() {

	dosomething
	返回数据
}*/

function writeOut(m, n) {
	var tableHeader = "<tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>"
		//输出表头： 商品、 地区、 1 月、 2 月、…… 12 月
	var tableThing = "";
	var table;
	var x;
	for(x in sourceData) {
		if((m == "all" || sourceData[x].region == m) && (n == "all" ||sourceData[x].product == n )) {
			var beforeThing = "<tr><td>" +
				sourceData[x].product + "</td><td>" +
				sourceData[x].region;
			//商品和地区
			var afterTing = "";
			var i;
			for(i in sourceData[x].sale) {
				afterTing += "</td><td>" + sourceData[x].sale[i];
			}
			//每月销量
			tableThing += beforeThing + afterTing + "</td></tr>";
		}
	}
	table = tableHeader + tableThing;
	return table;
	//遍历数据 ，输出每一行的表格HTML内容
	//把生成的HTML内容赋给table - wrapper
}