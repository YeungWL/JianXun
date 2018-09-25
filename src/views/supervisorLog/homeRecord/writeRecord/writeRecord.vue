<template>
  <div class="write">
    <div class="mainThing">
      <span style="text-align: center;display:block;font-size:20px">填写日志</span>
      <ul>
        <li v-for="item in attrData" :key="item.index" :label="item.attrName" :value="item.attrName">
          <div>{{item.attrName}}
            <el-input  type="textarea" :rows="2" v-model="item.content" placeholder="" :disabled="isCanEdit"></el-input>
          </div>
        </li>
      </ul>
      <div class="btn">
        <el-button type="primary" @click="saveSupervision()"  v-if="!isCanEdit" >提交</el-button>
        <el-button @click="close()">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orgId: this.$route.query.orgId,
      tempId: this.$route.query.tempId,
      logId: this.$route.query.logId,
      isCanEdit: this.$route.query.isCanEdit,
      attrData: [],
    };
  },
  methods: {

    // 获取监理日志填写界面
    inputPage() {

      let params = {
        tempId: this.tempId,
        logId: this.logId,
        orgId: this.orgId
      };
      this.$api.inputPage(params, {}).then(res => {
        if (res.errorCode === "1") {
          this.attrData = res.data[0].attrList;
        }
      });
      // return this.isCanEdit
    },

    // 创建日志
    saveSupervision() {
      var tmpAttData = [];
      for (var i = 0; i < this.attrData.length; i++) {
        let params = {
          attrCode: this.attrData[i].attrCode,
          historyId: this.attrData[i].historyId,
          content: this.attrData[i].content,
          attrId: this.attrData[i].attrId,
        };
        tmpAttData.push(params);
      }

      this.$api
        .saveSupervision({
          orgId: this.orgId,
          tempId: this.tempId,
          logId: this.logId,
          mainBuildAttr: JSON.stringify(tmpAttData)
        })
        .then(res => {
          console.log(res);
          if (res.errorCode == "1") {
            this.$message.success("提交成功");
            this.$router.replace({
              path: "/supervisorLog/homeRecord"
            });
          }
        });
    },

    //关闭填写监理日志界面
    close() {
       this.$router.go(-1);


      // this.$router.replace({
      //   path: "/supervisorLog/homeRecord"
      // });
    }
  },

  created() {},

  mounted() {    
    this.inputPage();
  },

};
</script>

<style lang="scss" scoped>
.write {
  margin: 20px;

  .mainThing {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 200px;

    .btn {
      width: 100%;
      position: relative;
      margin-top: 20px;
      text-align: center;
    }
  }

  .content {
    padding: 5px;
    margin-bottom: 8px;
    position: relative;
    width: 80%;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
}
</style>
