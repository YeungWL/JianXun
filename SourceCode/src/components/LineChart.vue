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
        text: '会员转化统计',
        subtext: '数据截止：WorldClimate.com',
        textStyle: {color: '#666'},
        x: 'center'
      },
      LegendData: ['推荐会员', '会员转商家入驻'],
      xInfo: {
        color: '#5793f3',
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '11月', '12月']
      },
      series: [
        {
          name: '推荐会员',
          type: 'line',
          smooth: true,
          data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
        },
        {
          name: '会员转商家入驻',
          type: 'line',
          smooth: true,
          data: [10, 55.9, 141.1, 18.7, 48.3, 69.2, 100.6, 46.6, 55.4, 18.4, 15.3, 10.7]
        }
      ],
      isdataView: true
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
      color: ['#5793f3', '#d14a61', '#675bba'],
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: this.LegendData,
        bottom: '0'
      },
      xAxis: [
        {
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: this.xInfo.color
            }
          },
          data: this.xInfo.data
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: this.series,
      toolbox: {
        show: true,
        orient: 'vertica',
        feature: {
          mark: {show: true},
          dataView: {show: this.isdataView,
            readOnly: true,
            optionToContent: function (opt) {
              let axisData = opt.xAxis[0].data // 坐标数据
              let series = opt.series // 折线图数据
              let tdHeads = '<td  style="padding: 0 10px">时间</td>' // 表头
              let tdBodys = '' // 数据
              series.forEach(function (item) {
                // 组装表头
                tdHeads += `<td style="padding: 0 10px">${item.name}</td>`
              })
              let table = `<table border="1" class="table-bordered table-striped" style="width:100%;text-align:center;height:370px"><tbody><tr>${tdHeads} </tr>`
              for (let i = 0, l = axisData.length; i < l; i++) {
                for (let j = 0; j < series.length; j++) {
                  // 组装表数据
                  tdBodys += `<td>${series[j].data[i]}</td>`
                }
                table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`
                tdBodys = ''
              }
              table += '</tbody></table>'
              return table
            }
          },
          magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      }
    }
    let myChart = this.$echarts.init(this.$refs.main)
    myChart.setOption(option)
  }
}
</script>
