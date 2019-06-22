var time = document.getElementsByTagName("time");
var setTime = new Date();
var year = document.getElementById("year");
var month = document.getElementById("month");
var dates = document.getElementById("date");
setInterval(function() {
	var d = new Date();
	var year = d.getFullYear();
	var month = PrefixInteger(d.getMonth() + 1);
	var days = PrefixInteger(d.getDate());
	var day = d.getDay();
	var hh = PrefixInteger(d.getHours());
	var mm = PrefixInteger(d.getMinutes());
	var ss = PrefixInteger(d.getSeconds());
	finalDate(year, month, days, day, hh, mm, ss);
}, 1000); //在页面中显示当前日期及时间，按秒更新
function PrefixInteger(num) {
	return("0000000000000000" + num).substr(-2);
} //位数的补齐
function finalDate(y, m, dd, d, h, m, s) {
	var day = ["日", "一", "二", "三", "四", "五", "六"];
	time[0].innerText = y + '年' + m + '月' + dd + '日 星期' + day[d] + " " + h + ":" + m + ":" + s;
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	if(h > 12) {
		h = h - 12;
		time[1].innerText = y + '-' + m + '-' + dd + " " + days[d] + " " + h + ":" + m + ":" + s + " PM";
	} else {
		time[1].innerText = y + '-' + m + '-' + dd + " " + days[d] + " " + h + ":" + m + ":" + s + " AM";
	}
} //封装一个函数，把最后的日期时间，按照要求的格式进行包装

document.getElementsByTagName("button")[0].onclick = function() {
	var theDay = selectDay(year, month, dates);
	//console.log(theDay);
	var theday = document.getElementById("theday");
	var day = ["日", "一", "二", "三", "四", "五", "六"];
	theday.innerHTML = "星期" + day[theDay];
}

function selectDay(year, month, dates) {
	setTime.setFullYear(year.value);
	setTime.setMonth(month.value);
	setTime.setDate(dates.value);
	return setTime.getDay();
} //封装一个函数，来根据某个日期返回这一天是星期几

var yearSelect = document.getElementById("year-select");
var monthSelect = document.getElementById("month-select");
var daySelect = document.getElementById("day-select");
var hourSelect = document.getElementById("hour-select");
var miniteSelect = document.getElementById("minite-select");
var secondSelect = document.getElementById("second-select");
var resultWrapper = document.getElementById("result-wrapper");
var select = document.getElementsByTagName("select");
for(var i = 0; i < select.length; i++) {
	select[i].onclick = function() {
		chooseDate(monthSelect);
		showNowAndSelect(yearSelect, monthSelect, daySelect, hourSelect, miniteSelect, secondSelect);
	}
} //当变更任何一个select选择时，更新 result-wrapper 的内容

function showNowAndSelect(Y, M, D, h, m, s) {
	setTime.setFullYear(Y.value, M.value, D.value, h.value, m.value, s.value);
	var today = new Date();
	var x = selectDay(Y, M, D);
	if(setTime < today) {
		var str = dateMath(today, setTime);
		resultWrapper.innerHTML = "现在距离" + Y.value + "年" + M.value + "月" +
			D.value + "日 星期" + x + " " + h.value + ":" + m.value + ":" +
			s.value + "已经过去" + str;
		//当所选时间早于现在时间时，文案为 现在距离 "所选时间" 已经过去 xxxx
	} else if(setTime == today) {
		resultWrapper.innerHTML = "现在距离" + Y.value + "年" + M.value + "月" +
			D.value + "日 星期" + x + " " + h.value + ":" + m.value + ":" +
			s.value;
		//注意当前时间经过所选时间时候的文案变化
	} else {
		var str = dateMath(setTime, today);
		resultWrapper.innerHTML = "现在距离" + Y.value + "年" + M.value + "月" +
			D.value + "日 星期" + x + " " + h.value + ":" + m.value + ":" +
			s.value + "还有" + str;
		//当所选时间晚于现在时间时，文案为 现在距离 "所选时间" 还有 xxxx
	}
}

function chooseDate(m) {
	var day31 = [1, 3, 5, 7, 8, 10, 12];
	var day30 = [4,6,9,11];
	for(var i = 0; i < day31.length; i++) {
		if(m.value == day31[i]) {
			//console.log(day31[i]);
			document.getElementById("the29").style.display = "block";
			document.getElementById("the30").style.display = "block";
			document.getElementById("the31").style.display = "block";
		}
	}
	for(var i = 0; i < day30.length; i++){
		if(m.value == day30[i]){
			//console.log(m.value);
			document.getElementById("the29").style.display = "block";
			document.getElementById("the30").style.display = "block";
			document.getElementById("the31").style.display = "none";
		}
	}
	if(m.value == 2){
		if(yearSelect.value%4){
			document.getElementById("the29").style.display = "none";
			document.getElementById("the30").style.display = "none";
			document.getElementById("the31").style.display = "none";
		}//平年
		else if(yearSelect.value%100){
			document.getElementById("the29").style.display = "block";
			document.getElementById("the30").style.display = "none";
			document.getElementById("the31").style.display = "none";
		}//闰年
		else if(yearSelect.value%400){
			document.getElementById("the29").style.display = "none";
			document.getElementById("the30").style.display = "none";
			document.getElementById("the31").style.display = "none";
		}//平年
		else{
			document.getElementById("the29").style.display = "block";
			document.getElementById("the30").style.display = "none";
			document.getElementById("the31").style.display = "none";
		}
	}
}//注意选择不同月份的时候，日期的可选范围不一样，比如1月可以选31天，11月只有30天，注意闰年
function dateMath(a, b) {
	var time = a-b;
	var d = Math.floor(time/(1000*3600*24));
	var h = Math.floor((time-d*1000*3600*24)/(1000*3600));
	var m = Math.floor((time-d*1000*3600*24-3600*1000*h)/60000);
	var s = Math.floor((time-d*1000*3600*24-3600*1000*h-m*60000)/1000);
	var str = d + "天" + h + "小时" + m + "分钟" + s + "秒";
	//console.log(str);
	return str;
} //日期相减
