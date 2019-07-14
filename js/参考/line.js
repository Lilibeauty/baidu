var lineChart = { 
  'data': [],//数据,
  'line_color': ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7', '#d4ec59', '#668ed6', '#e9668e'], //数据点颜色 线颜色
  'linechart_height': 200,//canvas的高度
  'radius': 4, //数据点直径
  'line_width': 5,//线宽度
  'dot_space': 45,//数据点之间的横向间隔距离
  //设置数据
  'setDate': function(data) {
    this.data = data;
  },
  //根据数据绘图
  'drawChart': function() {
    const canvas = document.getElementById('canvas');
          ctx = canvas.getContext('2d'),
          data = this.data,
          data_len = data.length,
          xAxis = data[0].sale.length * (this.dot_space),//x轴的宽度 x轴的宽度是自适应的
          yAxis = this.linechart_height;//y轴的高度
    // 拿到折线图中的最大值Max
    // console.log( data[0].sale.length)
    // 根据Max和你用来绘制折线图图像区域的高度，进行一个数据和像素的折算比例
    let tempArr = [];//组数
    for (var k = 0; k < data_len; k++) {
      tempArr.push(Math.max.apply(Math, data[k].sale));
    }
    let max = Math.max.apply(Math, tempArr),
        ratio = 0,
        dot_x = this.radius,
        dot_y = 0;
    ratio = (this.linechart_height-10) / max;  
    canvas.setAttribute('width', xAxis);//自适应设置canvas的宽度  
    canvas.setAttribute('height', yAxis);//自适应设置canvas的宽度  
    // 绘制横轴及纵轴
    ctx.beginPath();
    ctx.save();
    ctx.lineWidth = this.line_width;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, yAxis);
    ctx.lineTo(xAxis, yAxis);
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.restore();
    //绘制折线
    for (var j = 0; j < data_len; j++) {
    //每次绘制一条线的时候就重新开始画路径 重置颜色 线的起始点 
    ctx.beginPath();
    dot_x = 0;
    dot_y = 0;
    ctx.strokeStyle = this.line_color[j];
    ctx.fillStyle = this.line_color[j];
    for (var i = 0; i < data[j].sale.length; i++) {
      //连线部分
      dot_y = yAxis - data[j].sale[i] * ratio; //数据点y的坐标
      ctx.lineTo(dot_x + this.radius, dot_y);   //加radius的作用是第一个数据点在画布内显示
      ctx.stroke();
      //数据点部分
      ctx.beginPath();
      ctx.arc(dot_x +  this.radius * 2, dot_y, this.radius, 0, Math.PI * 2, true);
      ctx.fill();
      dot_x += this.dot_space; //数据点x的坐标
      }
    } 
  }
};