<template>
    <div class="renewal">
        <el-dialog title="续期" :visible.sync="msg.isShow" :show-close="true">
            <div class="contianers">
                <div class="o-name">
                    <span>组织名称 : </span>
                    <span>中铁一局集团有限公司广州市轨道交通二十一号线施工</span>
                </div>
                <div class="o-template">
                    <span>日志模板 : </span>
                    <span>建筑与市政工程-广东省 ( 2.0 )</span>
                </div>
                <div class="o-day">
                    <span>续期天数 : </span>
                    <input type="text">天
                    <span>( 续期天数为≥30天的整数 )</span>
                </div>
                <div class="o-pay">
                    <span>续期费用 : </span>
                    <span>
                        <a href="javascript:;">200</a>
                        元
                    </span>
                </div>
                <div class="o-tips">
                    <span>提示 : </span>
                    <span>当前有效期至2018年6月30日</span>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" @click="msg.isShow = false ,dialogTableVisible1 = true ">
                <el-button type="primary">续 期</el-button>
            </div>
        </el-dialog>

        <!-- 支付的dialog -->
        <el-dialog title="订单" :visible.sync="dialogTableVisible1">
            <div class="contianers">
                <div class="order-detail">
                    <div class="detail-title">订单详情</div>
                    <ul>
                        <li>
                            <span>订单编号：</span>
                            <span>201825025222231022</span>
                        </li>
                        <li>
                            <span>组织名称：</span>
                            <span>广州市轨道交通二十一号线工程施工20标</span>
                        </li>
                        <li>
                            <span>订单时间：</span>
                            <span>2018-05-32 10：25：20</span>
                        </li>
                        <li>
                            <span>续期有效期至：</span>
                            <span>2018年6月30号</span>
                        </li>
                        <li>
                            <span>续期天数：</span>
                            <span>180天</span>
                        </li>
                        <li>
                            <span>续期费用：</span>
                            <span>360元</span>
                        </li>
                    </ul>
                </div>
                <div class="payType">
                    <div class="payType-title">支付方式</div>
                    <ul>
                        <li>
                            <div class="left">
                                <img src="../../assets/images/zfb.png" alt="">
                                <span>支付宝</span>
                            </div>
                            <div :class="{right:true,active:!isActive}" @click="isActive = !isActive">
                                <div class="checked"></div>
                            </div>
                        </li>
                        <li>
                            <div class="left">
                                <img src="../../assets/images/wx.png" alt="">
                                <span>微信支付</span>
                            </div>
                            <div :class="{right:true,active:isActive}" @click="isActive = !isActive">
                                <div class="checked"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogTableVisible1 = false ,dialogTableVisible3 = true ">确 定</el-button>
                <el-button type="primary" @click="dialogTableVisible1 = false ,msg.isShow = true ">返 回</el-button>
            </div>
        </el-dialog>

        <!-- 付款的dialog -->
        <el-dialog title="确认付款" :visible.sync="dialogTableVisible3">
            <div class="contianers">
                <div class="price">¥ 21.98</div>
                <div class="order-info">
                    <span>订单信息：</span>
                    <span>简讯订单 - 20180502563201010</span>
                </div>
                <div class="scan">
                    <span>扫码支付：</span>
                    <img src="../../assets/images/ewm.jpg" alt="">
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogTableVisible3 = false">返 回</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'renewal',
  data() {
    return {
      mymsg: this.msg.isShow,
      dialogTableVisible1: false,
      dialogTableVisible3: false,
      form: {
        name: '',
        region: ''
      },
      isActive: true
    }
  },
  created() {},
  methods: {},
  props: {
    msg: {
      type: Object
    }
  },
  watch: {
    msg(val) {
      this.mymsg = val
    },
    mymsg(val) {
      this.$emit('on-result-change', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.renewal {
  .contianers {
    .order-detail,
    .payType,
    .o-name,
    .o-tips,
    .o-template,
    .o-day,
    .o-pay {
      margin-top: 20px;
    }
    input {
      border-radius: 3px;
      outline: none;
      border: 1px solid #ccc;
      margin-right: 5px;
    }
    .o-template {
      color: #f90000;
    }
    .o-pay {
      a {
        text-decoration: underline;
        color: #606266;
      }
    }
    .order-detail,
    .payType {
      box-sizing: border-box;
      border: 3px solid rgb(233, 237, 245);
      border-radius: 10px;
      .detail-title,
      .payType-title {
        padding: 0 10px;
        margin-top: 0;
        color: #000;
        line-height: 30px;
        border-bottom: 1px dashed rgb(233, 237, 245);
      }
      ul {
        padding: 0 10px;
        li {
          margin-top: 10px;
          span:nth-child(1) {
            letter-spacing: 0.5em;
            color: #bbb;
          }
          span:nth-child(2) {
            color: #888;
          }
        }
        li:nth-child(4) {
          span:nth-child(1) {
            letter-spacing: 0em;
          }
        }
      }
    }
    .payType {
      ul {
        li {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px !important;
          .left {
            img {
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 5px;
            }
          }
          .right {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            position: relative;
            background-color: rgb(70, 122, 198);
            .checked {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: #fff;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .active {
            border: 1px solid #ccc;
            background-color: #fff;
          }
        }
      }
    }
    .price {
      text-align: center;
      font-size: 25px;
      font-weight: 700;
      color: #000;
      margin: 10px 0;
    }
    .order-info {
      margin-bottom: 10px;
      span:nth-child(1) {
        padding-right: 10px;
      }
    }
    .scan {
      display: flex;

      img {
        width: 200px;
        height: 150px;
        padding-left: 10px;
      }
    }
  }
}
</style>

