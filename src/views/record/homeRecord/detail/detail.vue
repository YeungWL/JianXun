<template>
  <div class="detail">
    <div class="topBar">
      <div class="fy">
        <el-button type="primary" @click="getBeforeDate">前一天</el-button>
        <span>{{year}}年{{ month}}月{{ day}}日</span>
        <el-button type="primary" @click="getAfterDate">后一天</el-button>
      </div>
      <div class="select-box">
        <el-select placeholder="请选择模板" v-model="template" class="detail-select" @change="changeTemplate" value-key="id">
          <el-option v-for="item in logList" :key="item.id" :label="item.extendName ? item.extendName : item.tempName" :value="item.templateId"></el-option>
        </el-select>
      </div>
      <div class="dataBefore">
        <el-button type="primary" @click="getLogHtml('1'), showBtn = !showBtn" v-show="showBtn">原始数据</el-button>
        <el-button type="primary" @click="getLogHtml('0'), showBtn = !showBtn" v-show="!showBtn">终版数据</el-button>
      </div>
    </div>
    <div class="content">
      <iframe :src="srcUrl" width="100%" height="100%"></iframe>
    </div>
    <div class="btn">
      <el-button type="primary" @click="$router.push({name:'homeRecord'})">返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: [],
      startDate: '',
      endDate: '',
      year: '',
      count: 1,
      month: '',
      day: '',
      srcUrl: '',
      logList: [],
      template: '',
      showBtn: true,
      orgId: this.$route.query.orgId,
      logDate: this.$route.query.logDate,
      beforeDate: '',
      afterDate: '',
      today: '',
      templateId: this.$route.query.templateId,
      memberId: localStorage.getItem('userId'),
      testDate: this.$route.query.logDate
    }
  },
  methods: {
    //获取当前点击的时间的数据
    getHistoryList() {
      this.$api.historyList({
          orgId: this.orgId,
          logDate: this.logDate
        })
        .then(res => {
          console.log(res)
        })
    },
    // 获取前一天
    getBeforeDate() {
      let date = new Date(this.logDate)
      date.setDate(date.getDate() - 1)
      this.month = date.getMonth() + 1
      this.day= date.getDate()
      this.year = date.getFullYear()
      this.beforeDate = date.getFullYear() + '-' + this.month + '-' + this.day
      this.logDate = date.getFullYear() + '/' + this.month + '/' + this.day
      // let big = [1, 3, 5, 7, 8, 10, 12]
      // this.day = this.day - this.count
      // // 判断大小月
      // if (this.day < 1) {
      //   this.month--
      //   for (let i = 0; i < big.length; i++) {
      //     if (this.month === big[i]) {
      //       this.day = 31
      //       break
      //     } else {
      //       this.day = 30
      //     }
      //   }
      //   // 判断平年闰年
      //   if (this.month === 2) {
      //     if ((this.year % 4 == 0 && this.year % 100 !== 0) || this.year % 400 == 0) {
      //       this.day = 29
      //     } else {
      //       this.day = 28
      //     }
      //   }
      //   // 年份减一
      //   if (this.month <= 0) {
      //     this.year = this.year - 1
      //     this.month = 12
      //     this.day = 31
      //   }
      // }
      // let logDate = this.year + '-' + this.month + '-' + this.day

      // this.$api.historyListByTime().then(res => {
      // })
    },
    // 获取后一天
    getAfterDate() {
      let date = new Date(this.logDate)
      let today = new Date()
      today.setDate(today.getDate() - 1)
      if(date >= new Date(today.toLocaleDateString())) {
        console.log(date, new Date(today.toLocaleDateString()))
        this.$message.warning('不可以往后查看了')
        return
      }
      date.setDate(date.getDate() + 1)
      this.month = date.getMonth() + 1
      this.day= date.getDate()
      this.year = date.getFullYear()
      this.afterDate = date.getFullYear() + '-' + this.month + '-' + this.day
      this.logDate = date.getFullYear() + '/' + this.month + '/' + this.day
    },
    getAddTempList() {
      this.$api.getAddTempListData({
        orgId: this.orgId
      }).then(res => {
        if(res.errorCode == '1') {
          console.log(res)
          this.logList = res.data
        }
      })
    },
    // 改变select选择框
    changeTemplate(value) {
      this.templateId = value
      if(this.showBtn) {
        this.getLogHtml(0)
      }else {
        this.getLogHtml(1)
      }
    },
    // 获取日志的html页面
    getLogHtml(initData) {
      this.srcUrl = 'http://120.25.121.72/jianzhumobile/mobile/buildLog/info.html?orgId='+this.orgId+'&createDate='+this.today+'&templateId='+this.templateId+'&logId=fba269889719439781c6fa65cca4b5c2&initData='+initData+'&memberId='+this.memberId
    },
    // 根据日期获取日志信息
    historyListByTime() {
      this.$api.historyListByTime()
    }
  },
  created() {
    this.today = this.logDate.replace(/\//g, '-')
    let date = new Date(this.logDate)
    this.month = date.getMonth() + 1
    this.day= date.getDate()
    this.year = date.getFullYear()
    // this.getHistoryList()
    this.getLogHtml('0')
    this.getAddTempList()
  }
}
</script>

<style lang="scss" scoped>
.detail {
  height: 95%;
  margin: 20px;
  padding: 10px;
  background: #ffffff;
  .topBar {
    display: flex;
    justify-content: space-between;
    span {
      padding: 0 20px;
    }
  }
  .content {
    width: 100%;
    height: 85%;
    border: 1px solid #bbb;
    margin-top: 20px;
  }
  .btn {
    text-align: center;
    margin-top: 20px;
  }
  .detail-select /deep/.el-input__icon{
    line-height: 32px;
  }
}
</style>

