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
                            <h2>会员地区数柱形图</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                            <div id="main2" ref="main2" style="height:350px;"></div>
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
                            <div id="main3"  ref="main3" style="height:350px;"></div>
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
        //   myChart1: this.$echarts.init(this.$refs.main1),
        //   myChart2: this.$echarts.init(this.$refs.main2),
        //   myChart3: this.$echarts.init(this.$refs.main3)
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
        data: ['上海', '北京', '深圳', '广州', '天津', '杭州', '武汉', '重庆', '南昌', '福州', '厦门', '苏州']
      },
      yAxis: {},
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
        data: [5550, 2550, 346, 6610, 150, 20, 241, 5645, 20, 36, 10, 60]
      }]
    }
    let myChart1 = this.$echarts.init(this.$refs.main1)
    myChart1.setOption(option1)
  }
}
</script>
<style scoped>
@import '../../assets/css/custom.min.css';
@import '../../assets/css/index.css';
</style>

