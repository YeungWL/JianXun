<template>
<div class="page-content-body">功能开发中，敬请期待！</div>
  <!--<div class="charge">
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
   
    <div class="tabs">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="历史订单" name="first">
          <div class="page-main customTable">
            <el-table :data="tableData" border style="width: 99%">
            <el-table-column prop="count" label="下单人账号" width="150">
            </el-table-column>
            <el-table-column prop="name" label="下单人姓名" width="150">
            </el-table-column>
            <el-table-column prop="product" label="产品名称">
            </el-table-column>
            <el-table-column prop="day" label="续期天数">
            </el-table-column>
            <el-table-column prop="money" label="续期金额">
            </el-table-column>
            <el-table-column prop="time" label="下单时间">
            </el-table-column>
            <el-table-column prop="endTime" label="有效期至">
            </el-table-column>
            <el-table-column prop="payType" label="支付状态">
            </el-table-column>
          </el-table>
          </div>
          <div class="renewal">
            <el-button type="primary" @click="show.isShow = !show.isShow">续期</el-button>
          </div>
  
          <div class="dialogs">
            <renewal :msg="show" @on-result-change="onResultChange"></renewal>
          </div>
        </el-tab-pane>

        <el-tab-pane label="发票信息" name="second">
         <div class="page-main customTable">
            <el-table :data="tableData1" border style="width: 99%" class="page-main customTable">
            <el-table-column prop="title" label="发票抬头">
            </el-table-column>
            <el-table-column prop="name" label="纳税人识别">
            </el-table-column>
            <el-table-column prop="email" label="接收邮箱">
            </el-table-column>
            <el-table-column prop="operator" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small">默认</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
         </div>
          <div class="renewal">
            <el-button type="primary" @click="dialogFormVisible1 = true">添加发票信息</el-button>
          </div>
-->
          <!-- 发票信息的dialog -->
          <!--<el-dialog title="添加发票信息" :visible.sync="dialogFormVisible1">
            <el-form :model="form">
              <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
            </div>
          </el-dialog>

        </el-tab-pane>

        <el-tab-pane label="资费说明" name="third">

          <div>
            1、本施工日志按2元/日历日收费。以资不断优化本产品，为用户带来越来越多的优质服务；
          </div>
          <div>
            2、续期付款人仅为本组织负责人（正职）；
          </div>
          <div>
            3、当前在使用有效期内的，续费起始时间为有效期结束后的第二天。当前已过使用有效期的，续费起始时间为当天；
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>-->
  </div>
</template>
<script>
import renewal from '@/components/renewal'
export default {
  data() {
    return {
       show: {
        isShow:false
      },
      options: [
        {
          value: "选项1",
          label: "中铁十一局轨道交通集团二十一号线工程施工20标项目经理部"
        },
        {
          value: "选项2",
          label: "中铁十一局轨道交通集团二十一号线工程施工20标项目经理部"
        },
        {
          value: "选项3",
          label: "中铁十一局轨道交通集团二十一号线工程施工20标项目经理部"
        }
      ],
      value: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      dialogFormVisible: false,
      dialogFormVisible1:false,
      formLabelWidth: "120px",
      activeName2: "first",
      tableData: [
        {
          count: "13288496814",
          name: "王小虎",
          product: "建筑与市政工程",
          day: 300,
          money: 600,
          time: "2018-05-30",
          endTime: "2019-05-30",
          payType: "已支付"
        },
        {
          count: "13288496814",
          name: "王小虎",
          product: "建筑与市政工程",
          day: 300,
          money: 600,
          time: "2018-05-30",
          endTime: "2019-05-30",
          payType: "已支付"
        },
        {
          count: "13288496814",
          name: "王小虎",
          product: "建筑与市政工程",
          day: 300,
          money: 600,
          time: "2018-05-30",
          endTime: "2019-05-30",
          payType: "已支付"
        },
        {
          count: "13288496814",
          name: "王小虎",
          product: "建筑与市政工程",
          day: 300,
          money: 600,
          time: "2018-05-30",
          endTime: "2019-05-30",
          payType: "已支付"
        }
      ],
      tableData1: [
        {
          title: "中铁十一局有限公司",
          name: "王小虎",
          email: "758859840@qq.com",
          operator: 300
        },
        {
          title: "中铁十一局有限公司",
          name: "王小虎",
          email: "758859840@qq.com",
          operator: 300
        },
        {
          title: "中铁十一局有限公司",
          name: "王小虎",
          email: "758859840@qq.com",
          operator: 300
        },
        {
          title: "中铁十一局有限公司",
          name: "王小虎",
          email: "758859840@qq.com",
          operator: 300
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onResultChange(val) {
      this.show = val 
    } 
  },
  components:{renewal}
};
</script>
<style lang="scss" scoped>
.charge {
  padding: 10px 0 0 10px;
  .tabs {
    margin-top: 20px;
  }
  .renewal {
    width: 100%;
    height: 50px;
    margin-top: 10px;
  }
  .dialogs {
    ul {
      li {
        margin: 10px 10px;
      }
    }
  }
}
</style>
