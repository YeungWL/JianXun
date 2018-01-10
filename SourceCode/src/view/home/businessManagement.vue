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
    let myChart1 = this.$echarts.init(this.$refs.main1)
    myChart1.setOption(option1)
    this.$store.state.myChartList.push(myChart1)
  }
}
</script>
<style>
@import '../../assets/css/index.css';
</style>

