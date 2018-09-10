<template>
  <div class="detail">
    <div class="topBar">
      <div class="fy">
        <el-button type="primary" @click="getPreList">前一天</el-button>
        <span>{{year}}年{{ month}}月{{ day}}日</span>
        <el-button type="primary">后一天</el-button>
      </div>
      <div class="dataBefore">
        <el-button type="primary">原始数据</el-button>
      </div>
    </div>
    <div class="content">
      <iframe :src="srcUrl" width="100%" height="100%"></iframe>
    </div>
    <div class="btn" @click="$router.push({name:'homeRecord'})">
      <el-button type="primary">返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textarea2: '',
      date: [],
      startDate: '',
      endDate: '',
      year: '',
      count: 1,
      month: '',
      day: '',
      srcUrl: 'http://120.25.121.72/jianzhumobile/mobile/buildLog/info.html?orgId=1111&createDate=2018-04-12&templateId=1&logId=2222&initData=0&memberId=1',
      orgId: this.$route.query.orgId,
      logDate: this.$route.query.logDate,
      templateId: this.$route.query.templateId,
      initData:"0" ,
      memberId: localStorage.getItem('userId')
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
    // 获取前一天数据
    getPreList() {
      let big = [1, 3, 5, 7, 9, 10, 12]
      this.day = this.day - this.count
      // 判断大小月
      if (this.day < 1) {
        this.month--
        for (let i = 0; i < big.length; i++) {
          if (this.month === big[i]) {
            this.day = 31
            break
          } else {
            this.day = 30
          }
        }
        // 判断平年闰年
        if (this.month === 2) {
          if (
            (this.year % 4 == 0 && this.year % 100 !== 0) ||
            this.year % 400 == 0
          ) {
            this.day = 29
          } else {
            this.day = 28
          }
        }
        // 年份减一
        if (this.month <= 0) {
          this.year = this.year - 1
          this.month = 12
          this.day = 31
        }
      }
      this.logDate = this.year + '-' + this.month + '-' + this.day
      let params = {
        startDate: this.date,
        endDate: this.endDate,
        orgId: this.orgId
      }
      this.$api.historyListByTime(params).then(res => {
        // console.log(res)
      })
    },
    // 获取用户填写的日志详情
    buildingDetail() {
      this.$api.buildingDetail({
        orgId: this.orgId,
        createDate: this.logDate
      }).then(res => {
        console.log(res)
      })
    },
    getLogHtml() {
      this.srcUrl = 'http://120.25.121.72/jianzhumobile/mobile/buildLog/info.html?orgId='+this.orgId+'&createDate='+this.logDate+'&templateId='+this.templateId+'&logId=2222&initData='+this.initData+'&memberId='+this.memberId
    }
  },
  created() {
    this.logDate = this.logDate.replace(/\//g, '-')
    let date = this.logDate
    date = date.split('-')
    this.date = date
    this.year = Number(this.date[0])
    this.month = Number(this.date[1])
    this.day = Number(this.date[2])
    this.getHistoryList()
    // this.buildingDetail()
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
    // border: 1px solid #bbb;
    margin-top: 20px;
  }
  .btn {
    text-align: center;
    margin-top: 20px;
  }
}
</style>

