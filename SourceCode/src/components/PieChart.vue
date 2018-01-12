<template>
  <div class="x_content">
       <div id="main" ref="main" style="height:350px;"></div>
   </div>
</template>
<script>
export default {
  data () {
    return {
      titleInfo: {
        text: '会员地区分布',
        subtext: '数据截止：2017-03，来源：wikipedia',
        textStyle: {color: '#666'},
        x: 'left'
      },
      formatter: '{a} <br/>{b} : {c} ({d}%)',
      LegendData: ['上海', '北京', '深圳', '广州', '天津', '杭州', '武汉', '重庆', '南昌', '福州', '厦门', '苏州', '上海2', '北京2', '深圳2', '广州2', '天津2', '杭州2', '武汉2', '重庆2', '南昌2', '福州2', '厦门2', '苏州2'],
      series: {
        name: '姓名',
        radius: '65%',
        center: ['40%', '50%'],
        data: [{value: 335, name: '上海'},
          {value: 310, name: '北京'},
          {value: 234, name: '深圳'},
          {value: 135, name: '广州'},
          {value: 1548, name: '天津'},
          {value: 335, name: '杭州'},
          {value: 310, name: '武汉'},
          {value: 234, name: '重庆'},
          {value: 135, name: '南昌'},
          {value: 1548, name: '福州'},
          {value: 1548, name: '厦门'},
          {value: 335, name: '苏州'},
          {value: 310, name: '上海2'},
          {value: 234, name: '北京2'},
          {value: 135, name: '深圳2'},
          {value: 1548, name: '广州2'},
          {value: 1548, name: '天津2'},
          {value: 335, name: '杭州2'},
          {value: 310, name: '武汉2'},
          {value: 234, name: '重庆2'},
          {value: 135, name: '南昌2'},
          {value: 1548, name: '福州2'},
          {value: 1548, name: '厦门2'},
          {value: 335, name: '苏州2'}
        ],
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  },
  mounted () {
    var option = {
      title: {
        text: this.titleInfo.text,
        subtext: this.titleInfo.subtext,
        textStyle: this.titleInfo.textStyle,
        x: this.titleInfo.x
      },
      tooltip: {
        trigger: 'item',
        formatter: this.formatter
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        left: 0,
        // top: 20,
        bottom: 0,
        data: this.LegendData
      },
      series: [
        {
          name: '姓名',
          type: 'pie',
          radius: '65%',
          center: ['40%', '50%'],
          data: this.series.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: this.shadowColor
            }
          }
        }
      ]
    }
    let myChart = this.$echarts.init(this.$refs.main)
    myChart.setOption(option)
  }
}
</script>
