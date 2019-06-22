var tree = {
	"id": 0,
	"name": "root",
	"left": {
		"id": 1,
		"name": "Simon",
		"left": {
			"id": 3,
			"name": "Carl",
			"left": {
				"id": 7,
				"name": "Lee",
				"left": {
					"id": 11,
					"name": "Fate"
				}
			},
			"right": {
				"id": 8,
				"name": "Annie",
				"left": {
					"id": 12,
					"name": "Saber"
				}
			}
		},
		"right": {
			"id": 4,
			"name": "Tony",
			"left": {
				"id": 9,
				"name": "Candy"
			}
		}
	},
	"right": {
		"id": 2,
		"name": "right",
		"left": {
			"id": 5,
			"name": "Carl",
		},
		"right": {
			"id": 6,
			"name": "Carl",
			"right": {
				"id": 10,
				"name": "Kai"
			}
		}
	}
}

// 假设id和name均不会重复，根据输入name找到对应的id
function findIdByName(name) {
	var id;

	function findObj(obj) {
		if(obj != null) {
			//console.log(name);
			if(obj.name == name) {
				//console.log("b");
				id = obj.id;
			}
			//console.log("a");
			findObj(obj.left);
			findObj(obj.right);
		}
	}
	findObj(tree);
	return id;
}

console.log(findIdByName("Kai"));
//findIdByName("Tony");
// 假设id和name均不会重复，根据输入id找到对应的name
function findNameById(id) {
	var name;

	function findObj(obj) {
		//console.log("a");
		if(obj["id"] == id) {
			name = obj.name;
		} else {
			if(obj.left) {
				findObj(obj.left);
			}
			if(obj.right) {
				findObj(obj.right);
			}
		}
	}
	findObj(tree);
	return name;
}
console.log(findNameById("4"));
// 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
function getListWithDLR(node) {
	console.log(node.name);
	if(node.left) { //判断当前节点是否有左孩子
		getListWithDLR(node.left); //递归左孩子
	}
	if(node.right) { //判断当前节点是否有右孩子
		getListWithDLR(node.right); //递归右孩子
	}
}
console.log("—————————前序遍历——————————");
getListWithDLR(tree);

// 把这个对象中所有的名字以“中序遍历”的方式全部输出到console中
function getListWithLDR(node) {
	if(node.left) { //判断当前节点是否有左孩子
		getListWithLDR(node.left); //递归左孩子
	}
	console.log(node.name);
	if(node.right) { //判断当前节点是否有右孩子
		getListWithLDR(node.right); //递归右孩子
	}
}
console.log("—————————中序遍历——————————");
getListWithLDR(tree);
// 把这个对象中所有的名字以“后序遍历”的方式全部输出到console中
function getListWithLRD(node) {
	if(node.left) { //判断当前节点是否有左孩子
		getListWithLRD(node.left); //递归左孩子
	}

	if(node.right) { //判断当前节点是否有右孩子
		getListWithLRD(node.right); //递归右孩子
	}
	console.log(node.name);
}
console.log("—————————后序遍历——————————");
getListWithLRD(tree);