var barChart = {
    'data': [],//数据
    'bar_colors': ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7', '#d4ec59','#668ed6', '#e9668e'],//柱子颜色
    'bar_space': 10,//柱子的间隔宽度
    'bar_width': 24,//柱子的宽度   
    'barchart_height': 200,//svg的高度
    'setDate': function(data) {
      this.data = data;
    },
    //[给svg的元素添加属性]
    'makeSVG': function (tag, attrs) {
      var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
      for (var k in attrs) {
          el.setAttribute(k, attrs[k]);
      }
      return el;
    },
    'drawChart': function () {
      const bar_chart = document.getElementById('barchart'); //柱状图的绘制DOM节点位置
            data = this.data, 
            data_len = data.length, //数据的项数
            xAxis = 0,
            yAxis = 0;
      let bar_width = this.bar_width / (data_len / 2),
          tempArr = [],//组数
          max = 0,
          ratio = 0,
          yline = null, //纵轴
          xline = null, //横轴
          rect = null, //每个柱
          bar_x = 5,
          bar_y = 0,
          bar_height = 0; //柱子的高度     
      //根据数据
      if (data_len === 1) {
        xAxis= data[0].sale.length * (this.bar_space + bar_width);//x轴的宽度
      } else {
        xAxis= data[0].sale.length * (this.bar_space + bar_width * data.length);//x轴的宽度
      }
      yAxis = this.barchart_height;//y轴的高度
      //拿到柱状图中的最大值Max
      //根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
      for (var k = 0; k < data_len; k++) {
        tempArr.push(Math.max.apply(Math, data[k].sale));
      }
      max = Math.max.apply(Math, tempArr);
      ratio = this.barchart_height / max;
      //绘制横轴及纵轴  
      bar_chart.innerHTML = '';//每次绘制前线清空
      yline = this.makeSVG('line', {x1: 0, y1: 0, x2: 0, y2: yAxis});
      xline = this.makeSVG('line', {x1: 0, y1: yAxis, x2: xAxis, y2: yAxis});
      barchart.appendChild(yline);
      barchart.appendChild(xline);
      //绘制每一条数据
      for (var i = 0; i < data[0].sale.length; i++) {
        for (var j = 0; j < data_len; j++) {
          bar_height = data[j].sale[i] * ratio; //根据比例设置柱子的高度
          bar_y = this.barchart_height - 4 - bar_height;
          rect = this.makeSVG('rect', {x: bar_x, y: bar_y, width: bar_width, height: bar_height, fill: this.bar_colors[j]});
          bar_x = bar_x + bar_width;//获取柱子的x轴位置
          barchart.appendChild(rect);
        }
        bar_x = bar_x + this.bar_space;
      }  
      bar_chart.style.height = this.barchart_height + 'px';
      bar_chart.style.width = xAxis + 'px';
    },
};