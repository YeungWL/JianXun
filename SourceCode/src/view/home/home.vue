<template>
  <div class="container body">
    <div class="main_container">
        <TopNav></TopNav>
        <!-- page content -->
        <div class="right_col" role="main">
            <!--&lt;!&ndash; top tiles &ndash;&gt;-->
            <div class="row ">
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa  fa fa-male"></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{registerInfo.registerTotal}}</span>
                        <span class="item22"> {{registerInfo.title}}</span>
                    </div>
                </div>
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa   fa-user"></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{enterSellerInfo.enterSellerTotal}}</span>
                        <span class="item22"> {{enterSellerInfo.title}}</span>
                    </div>
                </div>
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa   fa-sitemap"></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{enterOperationInfo.enterOperationTotal}}</span>
                        <span class="item22"> {{enterOperationInfo.title}}</span>
                    </div>
                </div>
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa   fa-cny "></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{cashInfo.cashTotal}}</span>
                        <span class="item22"> {{cashInfo.title}}</span>
                    </div>
                </div>
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa   fa-shopping-cart"></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{consumInfo.consumTotal}}</span>
                        <span class="item22"> {{consumInfo.title}}</span>
                    </div>
                </div>
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa   fa-navicon"></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{tradeOrderInfo.tradeOrderTotal}}</span>
                        <span class="item22"> {{tradeOrderInfo.title}}</span>
                    </div>
                </div>
                <!-- <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa   fa-barcode"></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{serviceCodeInfo.serviceCodeTotal}}</span>
                        <span class="item22"> {{serviceCodeInfo.title}}</span>
                    </div>
                </div> -->
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa    fa-group "></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{consumerInfo.consumerTotal}}</span>
                        <span class="item22"> {{consumerInfo.title}}</span>
                    </div>
                </div>
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa    fa-share-square-o"></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{intAccountConsumInfo.intAccountConsumTotal}}</span>
                        <span class="item22"> {{intAccountConsumInfo.title}}</span>
                    </div>
                </div>
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa    fa-share-square"></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{cashAccountInfo.cashAccountTotal}}</span>
                        <span class="item22"> {{cashAccountInfo.title}}</span>
                    </div>
                </div>
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa   fa fa-wechat"></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{wechatPayInfo.wechatPayTotal}}</span>
                        <span class="item22"> {{wechatPayInfo.title}}</span>
                    </div>
                </div>
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa     fa-suitcase"></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{alipayInfo.alipayTotal}}</span>
                        <span class="item22"> {{alipayInfo.title}}</span>
                    </div>
                </div>
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa    fa-cc-mastercard"></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{crossMemberInfo.crossMemberTotal}}</span>
                        <span class="item22"> {{crossMemberInfo.title}}</span>
                    </div>
                </div>
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa    fa-institution "></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{bindServerCodeInfo.bindServerCodeTotal}}</span>
                        <span class="item22"> {{bindServerCodeInfo.title}}</span>
                    </div>
                </div>
                <div class="itemWrap col-md-55 col-sm-4 col-xs-6" style="height: 75px;overflow: hidden; margin-bottom: 5px;">
                    <div class="pull-left item1"><i class="fa     fa-line-chart "></i></div>
                    <div class="pull-left item2">
                        <span class="item21"> {{storeInfo.storeTotal}}</span>
                        <span class="item22"> {{storeInfo.title}}</span>
                    </div>
                </div>
            </div>
            <!--&lt;!&ndash; /top tiles &ndash;&gt;-->
            <div class="row" style="    margin-top: 10px;">
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>一周订单概览</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                        <div id="main1" ref="main1" style="height:350px;"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>一周消费概览</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                            <div id="main2" ref="main2" style="height:350px;"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>一周入驻商家数据概览</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                            <div id="main3" ref="main3" style="height:350px;"></div>
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
import {mapGetters} from 'vuex'
export default{
  data () {
    return {}
  },
  components: {
    TopNav: TopNav
  },
  computed: {
    ...mapGetters([
      'registerInfo', 'enterSellerInfo', 'enterOperationInfo', 'consumInfo', 'cashInfo', 'tradeOrderInfo', 'serviceCodeInfo', 'consumerInfo', 'intAccountConsumInfo',
      'cashAccountInfo', 'wechatPayInfo', 'alipayInfo', 'crossMemberInfo', 'bindServerCodeInfo', 'storeInfo'
    ])
  },
  created () {
    this.$store.commit('GETTOTALDATA')
  },
  mounted () {
    let option1 = {
      tooltip: {},
      legend: {
        data: ['本周', '上周']
      },
      xAxis: {
        axisLabel: {
          interval: 0,
          rotate: 40
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        axisLabel: {
          interval: 0,
          rotate: 65
        }
      },
      series: [{
        name: '本周',
        type: 'bar',
        itemStyle: {normal: {
          color: '#ed7d4d'
        }},
        data: [5, 20, 36, 10, 10, 20, 1]
      },
      {
        name: '上周',
        type: 'bar',
        itemStyle: {normal: {
          color: '#d970d5'
        }},
        data: [5, 20, 36, 10, 10, 20, 15]
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
//    一周订单概览表数据end
    //    一周消费概览表数据start
    let option2 = {
      tooltip: {},
      legend: {
        data: ['本周', '上周']
      },
      xAxis: {
        axisLabel: {
          interval: 0,
          rotate: 40
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        axisLabel: {
          interval: 0,
          rotate: 65
        }
      },
      series: [{
        name: '本周',
        type: 'bar',
        itemStyle: {normal: {
          color: '#ed7d4d'
        }},
        data: [500, 420, 356, 510, 0, 20, 1]
      },
      {
        name: '上周',
        type: 'bar',
        itemStyle: {normal: {
          color: '#d970d5'
        }},
        data: [885, 520, 346, 510, 130, 20, 15]
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
    //    一周消费概览表数据end
    //    一周消费概览表数据start
    let option3 = {
      tooltip: {},
      legend: {
        data: ['本周', '上周']
      },
      xAxis: {
        axisLabel: {
          interval: 0,
          rotate: 40
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        axisLabel: {
          interval: 0,
          rotate: 65
        }
      },
      series: [{
        name: '本周',
        type: 'bar',
        itemStyle: {normal: {
          color: '#ed7d4d'
        }},
        data: [500, 420, 356, 510, 0, 20, 1]
      },
      {
        name: '上周',
        type: 'bar',
        itemStyle: {normal: {
          color: '#d970d5'
        }},
        data: [885, 520, 346, 510, 130, 20, 15]
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
    //    一周消费概览表数据end
    let myChart1 = this.$echarts.init(this.$refs.main1)
    let myChart2 = this.$echarts.init(this.$refs.main2)
    let myChart3 = this.$echarts.init(this.$refs.main3)
    myChart1.setOption(option1)
    myChart2.setOption(option2)
    myChart3.setOption(option3)
    this.$store.state.myChartList.push(myChart1, myChart2, myChart3)
  }
}
</script>
<style>
@import '../../assets/css/index.css';
</style>

