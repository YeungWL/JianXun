<template>
  <div class="x_content">
       <div id="main" ref="main" style="height:350px;"></div>
   </div>
</template>
<script>
export default {
  data () {
    return {
      LegendData: ['本周', '上周'],
      xData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      yData: [],
      series: [{
        name: '本周',
        color: '#ed7d4d',
        data: this.barInfo.ThisWeek
      }, {
        name: '上周',
        color: '#d970d5',
        data: this.barInfo.LastWeek
      }],
      isdataView: true,
      magicType: ['line', 'bar', 'stack', 'tiled']
    }
  },
  props: {
    barInfo: Object
  },
  mounted () {
    let zhuhe = []
    for (let i = 0; i < this.series.length; i++) {
      zhuhe.push({
        name: this.series[i].name,
        type: 'bar',
        itemStyle: {
          normal: {
            color: this.series[i].color
          }
        },
        data: this.series[i].data
      })
    }
    let option = {
      tooltip: {},
      legend: {
        data: this.LegendData
      },
      xAxis: {
        axisLabel: {
          interval: 0,
          rotate: 40
        },
        data: this.xData
      },
      yAxis: {
        axisLabel: {
          interval: 0,
          rotate: 65
        }
      },
      series: zhuhe,
      toolbox: {
        show: true,
        right: '2.5%',
        orient: 'vertica',
        feature: {
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
              let table = `<table border="1" class="table-bordered table-striped" style="width:100%;text-align:center;height:100%"><tbody><tr>${tdHeads} </tr>`
              for (let i = 0, l = axisData.length; i < l; i++) {
                for (let j = 0; j < series.length; j++) {
                  // 组装表数据
                  if (series[j].data[i]) {
                    tdBodys += `<td>${series[j].data[i]}</td>`
                  } else {
                    tdBodys += `<td>0</td>`
                  }
                }
                table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`
                tdBodys = ''
              }
              table += '</tbody></table>'
              return table
            }
          },
          magicType: {show: true, type: this.magicType, title: {line: '折线图', bar: '柱状图', stack: '堆叠', tiled: '平铺'}},
          restore: {show: true, title: '还原'},
          saveAsImage: {show: true, title: '保存图片'}
        }
      }
    }
    let myChart = this.$echarts.init(this.$refs.main)
    myChart.setOption(option)
    this.$store.state.myChartList.push(myChart)
  }
}
</script>

