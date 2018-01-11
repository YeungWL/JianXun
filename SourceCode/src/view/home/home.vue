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
                        <BarChart :barInfo="orderInfo"></BarChart>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>一周消费概览</h2>
                            <div class="clearfix"></div>
                        </div>
                        <BarChart :barInfo="consumersInfo"></BarChart>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>一周入驻商家数据概览</h2>
                            <div class="clearfix"></div>
                        </div>
                        <BarChart :barInfo="enterSellersInfo"></BarChart>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>一周入驻运营中心数据概览</h2>
                            <div class="clearfix"></div>
                        </div>
                        <BarChart :barInfo="enterBusinessInfo"></BarChart>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="x_panel" style="overflow: hidden">
                        <div class="x_title">
                            <h2>一周新增用户数据概览</h2>
                            <div class="clearfix"></div>
                        </div>
                        <BarChart :barInfo="newUserInfo"></BarChart>
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
import BarChart from '../../components/BarChart'
import {mapGetters} from 'vuex'
export default{
  data () {
    return {
    }
  },
  components: {
    TopNav: TopNav,
    BarChart: BarChart
  },
  computed: {
    ...mapGetters([
      'registerInfo', 'enterSellerInfo', 'enterOperationInfo', 'consumInfo', 'cashInfo', 'tradeOrderInfo', 'serviceCodeInfo', 'consumerInfo', 'intAccountConsumInfo',
      'cashAccountInfo', 'wechatPayInfo', 'alipayInfo', 'crossMemberInfo', 'bindServerCodeInfo', 'storeInfo', 'orderInfo', 'consumersInfo', 'enterSellersInfo', 'enterBusinessInfo', 'newUserInfo'
    ])
  },
  created () {
    this.$store.commit('GETTOTALDATA')
    this.$store.commit('GETWEEKDATA')
  },
  mounted () {
  }
}
</script>
<style>
@import '../../assets/css/index.css';
</style>

