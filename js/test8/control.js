//表单模块
var goods = document.getElementsByName("product");
var area = document.getElementsByName("area");
var inputEvent = document.getElementById("input");
var region;
var product;
//var table = document.getElementsByTagName("table")[0];
inputEvent.onclick = function(e) {
		/*if(e.target==)*/
		console.log("a");
		region = getUserDate(area);
		product = getUserDate(goods);
		showTable();
	}
	//获取表单数据
function getUserDate(m) {
	var arr = [];
	var a = 0;
	for(var i = 0; i < m.length; i++) {
		console.log("aa");
		if(m[0].checked) {
			m[1].checked = "true";
			m[2].checked = "true";
			m[3].checked = "true";
		}
		if(m[i].checked) {
			arr.push(m[i].value);
			a = a + 1;
			//console.log(arr);
		}
	}
	if(a == 0) {
		m[0].checked = "true";
		m[1].checked = "true";
		m[2].checked = "true";
		m[3].checked = "true";
		arr.push(m[1].value);
		arr.push(m[2].value);
		arr.push(m[3].value);
	}
	//console.log(arr);
	return arr;
}
//var region = getUserDate(area);
//var product = getUserDate(goods);
//表格渲染
function showTable() {
	//得到数据
	table.innerHTML = getDate(region, product);
}

//遍历获取数据
function getDate(region, product) {
	var table;
	//表内所有元素
	var tableHeader = "<tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>"
		//输出表头： 商品、 地区、 1 月、 2 月、…… 12 月
	tableThing = "";
	//每一次都要重新渲染表格，所以每次除表头外都是空的
	for(x in region) {
		for(i in product) {
			for(z in sourceData) {
				if((region[x] == sourceData[z]["region"]) && (product[i] == sourceData[z]["product"])) {
					var beforeThing = "<tr><td>" +
						sourceData[z].product + "</td><td>" +
						sourceData[z].region;
					//商品和地区
					var afterTing = "";
					for(y in sourceData[z].sale) {
						afterTing += "</td><td>" + sourceData[z].sale[y];
					}
					//每月销量
					tableThing += beforeThing + afterTing + "</td></tr>";
				}
			}
		}
	}
	table = tableHeader + tableThing;
	return table;
}