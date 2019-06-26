var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
//当用户没有任何输入时，提示框消失
//当用户输入字符后，显示提示框，并且把用户输入的内容自动拼上邮箱后缀进行显示
//暂时不用考虑示意图中的红色和蓝色背景色的逻辑
//注意用户输入中前后空格需要去除
var emailInput = document.getElementById("email-input");
var emailSugWrapper = document.getElementById("email-sug-wrapper");
emailInput.oninput = function() {
	//获取用户输入
	var emailValue = inputValue(emailInput.value);
	//生成提示框中的提示内容， 将提示内容添加到email - sug - wrapper中
	var generateResult = generateEmail(emailValue);
	addUl(generateResult);
	//addSelect();
	//控制email - sug - wrapper的显示 / 隐藏状态
	showOrHidden(emailValue);

}

function inputValue(a) {
	return a.trim();
	//拿到input输入框的输入内容trim后返回
}

function generateEmail(emailValue) {
	var txt = [];
	var x;
	var beforeAt = emailValue;
	var afterAt;
	var bool = true;
	if(emailValue.indexOf("@") > -1) {
		//@之前的字符串
		beforeAt = emailValue.slice(0, emailValue.indexOf("@"));
		//@之后的字符串
		afterAt = emailValue.slice(emailValue.indexOf("@") + 1);
	}
	for(x in postfixList) {
		if(postfixList[x].indexOf(afterAt) > -1) {
			bool = false;
			console.log(postfixList[x]);
			txt[x] = beforeAt + "@" + postfixList[x];
		}
	}
	for(x in postfixList) {
		if(bool) {
			//把用户输入和每一个postfix进行结合成为每一个Li
			txt[x] = beforeAt + "@" + postfixList[x];
			//console.log("1");
		}
	}
	//返回生成的提示内容
	return txt;
}

function addUl(generateResult) {
	var x;
	var child = emailSugWrapper.childNodes;
	for(var i = child.length - 1; i >= 0; i--) {
		emailSugWrapper.removeChild(child[i]);
	}
	for(x in generateResult) {
		para = document.createElement("li");
		textNode = document.createTextNode(generateResult[x]);
		para.appendChild(textNode);
		emailSugWrapper.appendChild(para);
	}
	emailSugWrapper.childNodes[nowSelectTipIndex].className = "liclass";
	//获取生成提示框中的提示内容
	//将内容添加到email - sug - wrapper中
}

//默认第一个提示为被选择状态
/*function addSelect() {
	emailSugWrapper.childNodes[0].className = "liclass";
}*/

function showOrHidden(emailValue) {
	if(emailValue == "") {
		hidden();
		//隐藏提示框
	} else {
		show();
		//显示提示框
	}
}

function hidden() {
	emailSugWrapper.style.display = "none";
	//做具体隐藏提示框的操作
}

function show() {
	emailSugWrapper.style.display = "block";
	//做具体显示提示框的操作
}

emailSugWrapper.onclick = function(e) {
	var target = e.target;
	if(target.tagName.toLowerCase() == "li") {
		emailInput.value = target.innerHTML;
		//获取被点击Li对应的提示内容
		// 将内容放到input输入框中
		//隐藏输入框
		hidden();
	}
}

//鼠标滑过提示框的某一个提示时，这个提示内容背景色变化，表示鼠标经过了这个DOM节点
emailSugWrapper.onmouseover = function(e) {
	var target = e.target;
	if(target.tagName.toLowerCase() == "li") {
		target.style.backgroundColor = "#915ebe";
	}
}
emailSugWrapper.onmouseout = function(e) {
	var target = e.target;
	if(target.tagName.toLowerCase() == "li") {
		target.style.backgroundColor = "";
	}
}

//一个是在生成提示内容那里,对于特殊字符进行转义编码
//把鼠标点击的提示框内容转回输入框时进行解码



//功能键回车和上下键
var nowSelectTipIndex = 0;
emailInput.addEventListener("keyup", function(e) {
	//var x = findSelect();
	//上键
	if(e.keyCode == 38) {
		if(nowSelectTipIndex) {
			//selectLi(x - 1, x);
			//将它的前一个Li设为选中
			nowSelectTipIndex = nowSelectTipIndex-1;
			selectLi(nowSelectTipIndex,nowSelectTipIndex+1);
		} else {
			//var x1 = emailSugWrapper.childNodes.length - 1;
			//selectLi(x1, x);
			//将最后一个Li设为选中
			nowSelectTipIndex = emailSugWrapper.childNodes.length - 1;
			selectLi(nowSelectTipIndex,0);
		}

	}
	//下键
	if(e.keyCode == 40) {
		if(nowSelectTipIndex == emailSugWrapper.childNodes.length - 1) {
			nowSelectTipIndex = 0;
			selectLi(nowSelectTipIndex, emailSugWrapper.childNodes.length - 1);
			//将第一个Li设为选中
		} else {
			nowSelectTipIndex = nowSelectTipIndex+1;
			selectLi(nowSelectTipIndex,nowSelectTipIndex-1);
			//将它的下一个Li设为选中
			//nowSelectTipIndex = nowSelectTipIndex+1;
		}
	}
	//回车键
	if(e.keyCode == 13) {
		//将找到的Li的HTML内容解码后填到input中
		//var willInput = findSelect();
		//emailInput.value = emailSugWrapper.childNodes[willInput].innerHTML;
		//隐藏提示框
		emailInput.value = emailSugWrapper.childNodes[nowSelectTipIndex].innerHTML;
		hidden();
	}
});

//找到当前为选中状态的Li
/*function findSelect() {
	for(let i = 0; i < emailSugWrapper.childElementCount; i++) {
		if(emailSugWrapper.childNodes[i].className == "liclass") {
			return i;
		}
	}
}*/
//设为被选择状态
//清除掉它的选中状态
function selectLi(x, i) {
	emailSugWrapper.childNodes[x].className = "liclass";
	emailSugWrapper.childNodes[i].className = "";
}