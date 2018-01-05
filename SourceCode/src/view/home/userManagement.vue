<template>
  <div class="container body">
    <div class="main_container">
        <div class="col-md-3 left_col">
            <div class="left_col scroll-view">
                <div class="navbar nav_title" style="border: 0;">
                    <a href="index.html" class="site_title"><i class="fa fa-paw"></i> <span>数据管理后台</span></a>
                </div>

                <div class="clearfix"></div>

                <!-- menu profile quick info -->
                <div class="profile clearfix">
                    <div class="profile_pic">
                        <img src="../../assets/images/img.jpg" alt="..." class="img-circle profile_img">
                    </div>
                    <div class="profile_info">
                        <span>Welcome,</span>
                        <h2>John Doe</h2>
                    </div>
                </div>
                <!-- /menu profile quick info -->

                <br />

                <!-- sidebar menu -->
                <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
                    <div class="menu_section">
                        <ul class="nav side-menu">
                            <li><a href="userManagement.html"><i class="fa  fa-group"></i> 用户管理 </a></li>
                            <li><a ><i class="fa  fa-user"></i> 商户管理 </a></li>
                            <li><a><i class="fa fa-dashboard"></i> 营运中心管理</a></li>
                            <li><a><i class="fa  fa-jsfiddle"></i> 财务管理</a></li>
                            <li><a><i class="fa  fa-line-chart"></i>消费管理 </a></li>
                        </ul>
                    </div>

                </div>
                <!-- /sidebar menu -->
            </div>
        </div>

        <!-- top navigation -->
        <div class="top_nav">
            <div class="nav_menu">
                <nav>
                    <div class="nav toggle">
                        <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                    </div>

                    <ul class="nav navbar-nav navbar-right">
                        <li class="">
                            <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <img src="../../assets/images/img.jpg" alt="">John Doe
                                <span class=" fa fa-angle-down"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-usermenu pull-right">
                                <li><router-link to="/login"><i class="fa fa-sign-out pull-right"></i>Log Out</router-link> </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="row">
                <ol class="breadcrumb" style="margin-bottom: 0;background: #EDEDED;    border-bottom: 1px solid #D9DEE4;padding: 8px 30px">
                    <li ><router-link to="/home">后台首页</router-link></li>
                    <li class="active">用户管理</li>
                </ol>
            </div>
        </div>
        <!-- /top navigation -->

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

