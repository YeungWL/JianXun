<template>
  <div class="detail">
    <div class="topBar">
      <div class="fy">
        <el-button type="primary" @click="getBeforeDate">前一天</el-button>
        <span>{{year}}年{{ month}}月{{ day}}日</span>
        <el-button type="primary" @click="getAfterDate">后一天</el-button>
      </div>
      <div class="dataBefore">
        <el-button
          type="primary"
          @click="getLogHtml('1', countDate), showBtn = !showBtn"
          v-show="showBtn"
        >原始数据</el-button>
        <el-button
          type="primary"
          @click="getLogHtml('0', countDate), showBtn = !showBtn"
          v-show="!showBtn"
        >终版数据</el-button>
      </div>
    </div>
    <div class="content">
      <iframe :src="srcUrl" width="100%" height="100%"></iframe>
    </div>
    <div class="btn">
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: "",
      count: 1,
      month: "",
      day: "",
      srcUrl: "",
      logList: [],
      template: "",
      showBtn: true,
      tempId: this.$route.query.tempId,
      orgId: this.$route.query.orgId,
      logDate: this.$route.query.createDate,
      orgTemplateId: this.$route.query.orgTemplateId,
      logId: this.$route.query.logId,
      projectId: this.$route.query.selectProject,

      countDate: "",
      memberId: localStorage.getItem("userId"),

      token: this.getToken(),
      accessToken: localStorage.getItem("accessToken")
    };
  },
  methods: {
    //获取当前点击的时间的数据
    getHistoryList() {
      this.$api
        .historyList({
          orgId: this.orgId,
          logDate: this.logDate
        })
        .then(res => {
          console.log(res);
        });
    },
    // 获取前一天
    getBeforeDate() {
      let date = new Date(this.logDate);
      date.setDate(date.getDate() - 1);
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
      this.year = date.getFullYear();
      this.countDate = date.getFullYear() + "-" + this.month + "-" + this.day;
      // 使用yyyy/m/d 浏览器兼容
      this.logDate = date.getFullYear() + "/" + this.month + "/" + this.day;
      // 重新获取HTML页面
      if (this.showBtn) {
        this.getLogHtml(0, this.countDate);
      } else {
        this.getLogHtml(1, this.countDate);
      }
    },
    // 获取后一天
    getAfterDate() {
      let date = new Date(this.logDate);
      let today = new Date();
      today.setDate(today.getDate() - 1);
      if (date >= new Date(today.toLocaleDateString())) {
        this.$message.warning("不可以往后查看了");
        return;
      }
      date.setDate(date.getDate() + 1);
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
      this.year = date.getFullYear();
      this.countDate = date.getFullYear() + "-" + this.month + "-" + this.day;
      this.logDate = date.getFullYear() + "/" + this.month + "/" + this.day;
      // 重新获取HTML页面
      if (this.showBtn) {
        this.getLogHtml(0, this.countDate);
      } else {
        this.getLogHtml(1, this.countDate);
      }
    },
    getAddTempList() {
      this.$api
        .getAddTempListData({
          orgId: this.orgId
        })
        .then(res => {
          if (res.errorCode == "1") {
            console.log(res);
            this.logList = res.data;
          }
        });
    },
    // 改变select选择框
    changeTemplate(value) {
      this.templateId = value;
      if (this.showBtn) {
        this.getLogHtml(0, this.countDate);
      } else {
        this.getLogHtml(1, this.countDate);
      }
    },
    // 获取日志的html页面
    getLogHtml(initData, date) {
      this.srcUrl =
        this.baseURL() +
        "/jianzhumobile/mobile/supervision/supervisionInfo.do?" +
        "accessToken=" +
        this.accessToken +
        "&token=" +
        this.token +
        "&orgId=" +
        this.orgId +
        "&initData=" +
        initData +
        "&logId=" +
        this.logId +
        "&tempId=" +
        this.tempId +
        "&createDate=" +
        date;
    },
    goBack() {
      this.$router.push({
        path: "/supervisorLog/homeRecord",
        query: {
          tempId: this.tempId,
          orgId: this.orgId,
          orgTemplateId: this.orgTemplateId,
          logId: this.logId,
          projectId: this.projectId
        }
      });
    }
  },
  created() {
    this.countDate = this.logDate.replace(/\//g, "-");
    let date = new Date(this.logDate);
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.year = date.getFullYear();
    this.getLogHtml("0", this.countDate);
    this.getAddTempList();
  }
};
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
    height: 82%;
    border: 1px solid #bbb;
    margin-top: 20px;
  }
  .btn {
    text-align: center;
    margin-top: 20px;
  }
  .detail-select /deep/.el-input__icon {
    line-height: 32px;
  }
}
</style>