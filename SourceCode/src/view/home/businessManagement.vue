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
                            <h2>日新增商户数据概览</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                            <div id="main1" style="height:450px;" ref="main1"></div>
                        
                        </div>
                    </div>
                </div>

            </div>

              <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>月新增商户数据概览</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                            <div id="main2" style="height:450px;" ref="main2"></div>
                        
                        </div>
                    </div>
                </div>
                                           
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>周新增商户数据概览</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                            <div id="main3" style="height:450px;" ref="main3"></div>
                        
                        </div>
                    </div>
                </div>
              </div>
              
              <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>已绑服务码或设铺数据概览</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                            <div id="main4" style="height:450px;" ref="main4"></div>
                        
                        </div>
                    </div>
                </div>
                                           
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>已绑服务码或设铺数据概览</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                            <div id="main5" style="height:450px;" ref="main5"></div>
                        
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
                            <div id="main6"  ref="main6" style="height:450px;"></div>
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
    return {}
  },
  components: {
    TopNav: TopNav
  },
  mounted () {
        //    日新增商户数据概览start
    let option1 = {
      tooltip: {
      },
      legend: {
        data: ['当天新增商户数', '前天新增商户数'],
        top: '0'
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
          nameLocation: 'center',
          nameGap: '40',
          nameTextStyle: {color: '#666'},
          name: '一天以二小时做为分段进行统计',
          data: ['二点', '四点', '六点', '八点', '十点', '十二点', '十四点', '十六点', '十八点', '二十点', '二十二点', '二十四点']
        }
      ],
      yAxis: [
        {
          axisLabel: {
            interval: 0,
            rotate: 65
          },
          type: 'value',
          nameLocation: 'center',
          nameGap: '40',
          nameTextStyle: {color: '#666'},
          name: '商户数'
        }
      ],
      series: [
        {
          name: '当天新增商户数',
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {color: '#9bc6f0'}}},
          data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
        },
        {
          name: '前天新增商户数',
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {color: '#596472'}}},
          data: [10, 55.9, 141.1, 18.7, 48.3, 69.2, 100.6, 46.6, 55.4, 18.4, 15.3, 10.7]
        }
      ],
      label: {normal: {
        show: true
      }},
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
        // 日新增商户数据概览end
         //    月新增商户数据概览start
    let option2 = {
      tooltip: {
      },
      legend: {
        data: ['当月新增商户数'],
        top: '0'
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
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '11月', '12月']
        }
      ],
      yAxis: [
        {
          axisLabel: {
            interval: 0,
            rotate: 65
          },
          type: 'value',
          nameLocation: 'center',
          nameGap: '40',
          nameTextStyle: {color: '#666'},
          name: '商户数'
        }
      ],
      series: [
        {
          name: '当月新增商户数',
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {color: '#9bc6f0'}}},
          data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
        }
      ],
      label: {normal: {
        show: true
      }},
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
     //    月新增商户数据概览end
     //    日新增商户数据概览start
    let option3 = {
      tooltip: {
      },
      legend: {
        data: ['当天新增商户数', '前天新增商户数'],
        top: '0'
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          axisLabel: {
            interval: 0,
            rotate: 65
          },
          type: 'value',
          nameLocation: 'center',
          nameGap: '40',
          nameTextStyle: {color: '#666'},
          name: '商户数'
        }
      ],
      series: [
        {
          name: '当天新增商户数',
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {color: '#9bc6f0'}}},
          data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6]
        },
        {
          name: '前天新增商户数',
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {color: '#596472'}}},
          data: [10, 55.9, 141.1, 18.7, 48.3, 69.2, 100.6]
        }
      ],
      label: {normal: {
        show: true
      }},
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
        // 日新增商户数据概览end
             //   已绑服务码或设铺数据概览start
    let option4 = {
      tooltip: {
      },
      legend: {
        data: ['已绑服务码门店数', '门店铺设总数'],
        top: '0'
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
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '11月', '12月']
        }
      ],
      yAxis: [
        {
          axisLabel: {
            interval: 0,
            rotate: 65
          },
          type: 'value',
          nameLocation: 'center',
          nameGap: '40',
          nameTextStyle: {color: '#666'},
          name: '商户数'
        }
      ],
      series: [
        {
          name: '已绑服务码门店数',
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {color: '#9bc6f0'}}},
          data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
        },
        {
          name: '门店铺设总数',
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {color: '#596472'}}},
          data: [10, 55.9, 141.1, 18.7, 48.3, 69.2, 100.6, 46.6, 55.4, 18.4, 15.3, 10.7]
        }
      ],
      label: {normal: {
        show: true
      }},
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
        // 日新增商户数据概览end
                   //   已绑服务码或设铺数据概览start
    let option5 = {
      tooltip: {
      },
      legend: {
        data: ['已绑服务码门店数', '门店铺设总数'],
        top: '0'
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          axisLabel: {
            interval: 0,
            rotate: 65
          },
          type: 'value',
          nameLocation: 'center',
          nameGap: '40',
          nameTextStyle: {color: '#666'},
          name: '商户数'
        }
      ],
      series: [
        {
          name: '已绑服务码门店数',
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {color: '#9bc6f0'}}},
          data: [3.9, 5.9, 11.1, 18.7, 48.3, 62, 45]
        },
        {
          name: '门店铺设总数',
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {color: '#596472'}}},
          data: [10, 55.9, 141.1, 18.7, 4, 30, 5]
        }
      ],
      label: {normal: {
        show: true
      }},
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
        // 日新增商户数据概览end

    let option6 = {
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
            position: 'inside',
            rotate: '90'
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
    let myChart1 = this.$echarts.init(this.$refs.main1)
    let myChart2 = this.$echarts.init(this.$refs.main2)
    let myChart3 = this.$echarts.init(this.$refs.main3)
    let myChart4 = this.$echarts.init(this.$refs.main4)
    let myChart5 = this.$echarts.init(this.$refs.main5)
    let myChart6 = this.$echarts.init(this.$refs.main6)
    myChart1.setOption(option1)
    myChart2.setOption(option2)
    myChart3.setOption(option3)
    myChart4.setOption(option4)
    myChart5.setOption(option5)
    myChart6.setOption(option6)
    this.$store.state.myChartList.push(myChart1, myChart2, myChart3, myChart4, myChart5, myChart6)
  }
}
</script>
<style>
@import '../../assets/css/index.css';
</style>
