<template>
  <div class="detail">
    <div class="topBar">
      <div class="fy">
        <el-button type="primary" @click="getPreList">前一天</el-button>
        <span>{{year}}年{{ month}}月{{ day}}日</span>
        <el-button type="primary" @click="getNextList" :disabled="isCanClick">后一天</el-button>
      </div>
      <div class="dataBefore">
        <el-button type="primary"  @click="UpdateDataType()">{{dataType}}</el-button>
      </div>
    </div>
    <div class="content">
      <iframe id="detailView" style="padding: 0px; width: 100%; height: 100%;" :src="detailUrl"></iframe>
    </div>
    <div class="btn" @click="close()">
      <el-button type="primary">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataType: "原始数据",
      textarea2: "",
      date: [],
      startDate: "",
      endDate: "",
      year: "",
      count: 1,
      month: "",
      day: "",
      nowDate: "",
      isCanClick: false,

      logId: this.$route.query.logId,
      tempId: this.$route.query.tempId,
      orgId: this.$route.query.orgId,
      logDate: this.$route.query.createDate,
      token: this.getToken(),
      accessToken: localStorage.getItem("accessToken"),
      detailUrl: ""
    };
  },
  methods: {
    UpdateDataType() {
      if (this.dataType === "原始数据") {
        this.dataType = "终版数据";
        this.detailUrl =
          this.baseURL() +
          "/jianzhumobile/mobile/supervision/supervisionInfo.do?" +
          "accessToken=" +
          this.accessToken +
          "&token=" +
          this.token +
          "&orgId=" +
          this.orgId +
          "&initData=" +
          1 +
          "&logId=" +
          this.logId +
          "&tempId=" +
          this.tempId +
          "&createDate=" +
          this.logDate;
        console.log("原始数据" +this.detailUrl);
      } else {
        this.dataType = "原始数据";
        this.detailUrl =
          this.baseURL() +
          "/jianzhumobile/mobile/supervision/supervisionInfo.do?" +
          "accessToken=" +
          this.accessToken +
          "&token=" +
          this.token +
          "&orgId=" +
          this.orgId +
          "&initData=" +
          2 +
          "&logId=" +
          this.logId +
          "&tempId=" +
          this.tempId +
          "&createDate=" +
          this.logDate;
          console.log("终版数据" +this.detailUrl);
      }
    },

    // 获取前一天数据
    getPreList() {
      this.isCanClick = false;
      let big = [1, 3, 5, 7, 8, 10, 12];
      this.day = this.day - this.count;
      // 判断大小月
      if (this.day < 1) {
        this.month--;
        for (let i = 0; i < big.length; i++) {
          if (this.month === big[i]) {
            this.day = 31;
            break;
          } else {
            this.day = 30;
          }
        }
        // 判断平年闰年
        if (this.month === 2) {
          if (
            (this.year % 4 == 0 && this.year % 100 !== 0) ||
            this.year % 400 == 0
          ) {
            this.day = 29;
          } else {
            this.day = 28;
          }
        }
        // 年份减一
        if (this.month <= 0) {
          this.year = this.year - 1;
          this.month = 12;
          this.day = 31;
        }
      }
      this.logDate = this.year + "-" + this.month + "-" + this.day;
      this.detailUrl =
        this.baseURL() +
        "/jianzhumobile/mobile/supervision/supervisionInfo.do?" +
        "accessToken=" +
        this.accessToken +
        "&token=" +
        this.token +
        "&orgId=" +
        this.orgId +
        "&initData=" +
        1 +
        "&logId=" +
        this.logId +
        "&tempId=" +
        this.tempId +
        "&createDate=" +
        this.logDate;
    },

    getNextList() {
      var date = new Date();
      var nowDay = date.getDate();
      let big = [1, 3, 5, 7, 8, 10, 12];
      this.day = this.day + this.count;

      if (this.day === nowDay) {
        this.isCanClick = true;
        return false;
      }

      // 判断大小月
      if (this.day < 1) {
        this.month--;
        for (let i = 0; i < big.length; i++) {
          if (this.month === big[i]) {
            this.day = 31;
            break;
          } else {
            this.day = 30;
          }
        }
        // 判断平年闰年
        if (this.month === 2) {
          if (
            (this.year % 4 == 0 && this.year % 100 !== 0) ||
            this.year % 400 == 0
          ) {
            this.day = 29;
          } else {
            this.day = 28;
          }
        }
        // 年份减一
        if (this.month <= 0) {
          this.year = this.year - 1;
          this.month = 12;
          this.day = 31;
        }
      }
      this.logDate = this.year + "-" + this.month + "-" + this.day;

      this.detailUrl =
        this.baseURL() +
        "/jianzhumobile/mobile/supervision/supervisionInfo.do?" +
        "accessToken=" +
        this.accessToken +
        "&token=" +
        this.token +
        "&orgId=" +
        this.orgId +
        "&initData=" +
        1 +
        "&logId=" +
        this.logId +
        "&tempId=" +
        this.tempId +
        "&createDate=" +
        this.logDate;
    },
    
    //关闭监理日志历史记录界面
    close() {
       this.$router.go(-1);
      // this.$router.replace({
      //   path: "/supervisorLog/homeRecord"
      // });
    }

  },
  created() {
    this.logDate = this.logDate.replace(/\//g, "-");
    let date = this.logDate;
    date = date.split("-");
    this.date = date;
    this.year = Number(this.date[0]);
    this.month = Number(this.date[1]);
    this.day = Number(this.date[2]);
  

    this.detailUrl =
      this.baseURL() +
      "/jianzhumobile/mobile/supervision/supervisionInfo.do?" +
      "accessToken=" +
      this.accessToken +
      "&token=" +
      this.token +
      "&orgId=" +
      this.orgId +
      "&initData=" +
      1 +
      "&logId=" +
      this.logId +
      "&tempId=" +
      this.tempId +
      "&createDate=" +
      this.logDate;
    console.log("AAA: " + this.detailUrl);
  }
};
</script>

<style lang="scss" scoped>
.detail {
  width: 80%;
  margin: 20px;
  .topBar {
    display: flex;
    justify-content: space-between;
    span {
      padding: 0 20px;
    }
  }
  .content {
    width: 100%;
    height: 700px;
    border: 1px solid #bbb;
    margin-top: 20px;
  }
  .btn {
    width: 100%;
    position: relative;
    left: 50%;
    margin-top: 20px;
  }
}
</style>

