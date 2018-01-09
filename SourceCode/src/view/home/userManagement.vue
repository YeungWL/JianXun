<template>
  <div class="container body">
    <div class="main_container">
        <TopNav></TopNav>
        <!-- page content -->
        <div class="right_col" role="main">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>新增用户数柱形图</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                            <div id="main1" ref="main1" style="height:350px;"></div>
                        </div>
                    </div>
                </div>

            </div>

      <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="x_panel" style="overflow: hidden">
                                <div class="x_title">
                                    <h2>新增用户年度数柱形图</h2>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="x_content">
                                    <div id="main2"ref="main2" style="height:450px;"></div>
                                </div>
                            </div>
                        </div>

                    </div>



            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>会员地区数柱形图</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                            <div id="main3" ref="main3" style="height:350px;"></div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>会员转化统计线形图</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                            <div id="main4"  ref="main4" style="height:350px;"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- /page content -->
        <!-- footer content -->
        <footer>
            <div class="pull-right">
                Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>
            </div>
            <div class="clearfix"></div>
        </footer>
        <!-- /footer content -->
    </div>
</div>
</template>
<script>
import TopNav from '../../components/TopNav'
export default{
  data () {
    return {
      ifShowToolbar: false
    }
  },
  beforeCreate () {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.ifShowToolbar = false
    } else {
      this.ifShowToolbar = true
    }
  },
  components: {
    TopNav: TopNav
  },
  mounted () {
    let option1 = {
      tooltip: {},
      legend: {
        data: ['当天新增用户数', '前天新增用户数']
      },
      xAxis: {
        axisLabel: {
          interval: 0,
          rotate: 40
        },
        data: ['2点', '4点', '6点', '8点', '10点', '12点', '14点', '16点', '18点', '20点', '22点', '24点']
      },
      yAxis: {
        axisLabel: {
          interval: 0,
          rotate: 65
        }
      },
      series: [
        {
          name: '当天新增用户数',
          type: 'bar',
          itemStyle: {normal: {
            color: '#ed7d4d'
          }},
          data: [5, 20, 36, 10, 10, 20, 1, 5, 20, 36, 10, 60]
        },
        {
          name: '前天新增用户数',
          type: 'bar',
          itemStyle: {normal: {
            color: '#86cdf9'
          }},
          data: [5, 20, 36, 10, 10, 20, 9, 5, 20, 36, 10, 60]
        }
      ],
      toolbox: {
        show: true,
        orient: 'vertica',
        feature: {
          mark: {show: true},
          dataView: {show: true,
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
            //    新增用户年度数数据start
    let option2 = {
      tooltip: {},
      legend: {
        data: ['当年新增用户数', '前年新增用户数']
      },
      xAxis: {
        axisLabel: {
          interval: 0,
          rotate: 40
        },
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '11月', '12月']
      },
      yAxis: {
        axisLabel: {
          interval: 0,
          rotate: 65
        }
      },
      series: [
        {
          name: '当年新增用户数',
          type: 'bar',
          itemStyle: {normal: {
            color: '#ed7d4d'
          }},
          data: [5, 20, 36, 10, 10, 20, 1, 5, 20, 36, 10, 60]
        },
        {
          name: '前年新增用户数',
          type: 'bar',
          itemStyle: {normal: {
            color: '#86cdf9'
          }},
          data: [5, 20, 36, 10, 10, 20, 9, 5, 20, 36, 10, 60]
        }
      ],
      toolbox: {
        show: true,
        orient: 'vertica',
        feature: {
          mark: {show: true},
          dataView: {show: true,
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
        //     新增用户年度数数据end
        //    会员地区数据start
    let option3 = {
      title: {
        text: '会员地区分布',
        subtext: '数据截止：2017-03，来源：wikipedia',
        textStyle: {color: '#666'},
        x: 'center'
      },
      tooltip: {},
      xAxis: {
        axisLabel: {
          interval: 0,
          rotate: 40
        },
        data: ['上海', '北京', '深圳', '广州', '天津', '杭州', '武汉', '重庆', '南昌', '福州', '厦门', '苏州', '上海2', '北京2', '深圳2', '广州2', '天津2', '杭州2', '武汉2', '重庆2', '南昌2', '福州2', '厦门2', '苏州2']
      },
      yAxis: {
        axisLabel: {
          interval: 0,
          rotate: 65
        }
      },
      series: [{
        name: '人口总数',
        type: 'bar',
        itemStyle: {normal: {
          color: '#88c2f5'
        }},
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [18203, 23489, 29034, 104970, 131744, 630230, 23489, 29034, 104970, 131744, 18203, 23489, 29034, 104970, 131744, 630230, 23489, 29034, 104970, 131744, 23489, 29034, 104970, 131744]
      }],
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: [0],
          filterMode: 'filter',
          start: 1,
          end: 20,
          bottom: 5,
          height: 20
        }
      ],
      toolbox: {
        show: true,
        orient: 'vertica',
        feature: {
          mark: {show: true},
          dataView: {show: true,
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
              let table = `<div style="overflow-y:auto;height: 100%;"><table border="1" class="table-bordered table-striped" style="width:100%;text-align:center;height:100%"><tbody><tr>${tdHeads} </tr>`
              for (let i = 0, l = axisData.length; i < l; i++) {
                for (let j = 0; j < series.length; j++) {
                                    // 组装表数据
                  tdBodys += `<td>${series[j].data[i]}</td>`
                }
                table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`
                tdBodys = ''
              }
              table += '</tbody></table></div>'
              return table
            }
          },
          magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      }
    }
        //     会员地区数据end
        //    会员转化数据start
    let option4 = {
      title: {
        text: '会员转化统计',
        subtext: '数据截止：WorldClimate.com',
        textStyle: {color: '#666'},
        x: 'center'
      },
      color: ['#5793f3', '#d14a61', '#675bba'],
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['推荐会员', '会员转商家入驻'],
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
              color: '#5793f3'
            }
          },
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '11月', '12月']
        }
      ],
      yAxis: [
        {
          axisLabel: {
            interval: 0,
            rotate: 65
          },
          type: 'value'
        }
      ],
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
      toolbox: {
        show: true,
        orient: 'vertica',
        feature: {
          mark: {show: true},
          dataView: {show: true,
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
        //     会员转化数据end
    let myChart1 = this.$echarts.init(this.$refs.main1)
    let myChart2 = this.$echarts.init(this.$refs.main2)
    let myChart3 = this.$echarts.init(this.$refs.main3)
    let myChart4 = this.$echarts.init(this.$refs.main4)
    myChart1.setOption(option1)
    myChart2.setOption(option2)
    myChart3.setOption(option3)
    myChart4.setOption(option4)
    window.onresize = () => {
      return (() => {
        myChart1.resize()
        myChart2.resize()
        myChart3.resize()
        myChart4.resize()
      })()
    }
  }
}
</script>
<style scoped>
@import '../../assets/css/index.css';
</style>

