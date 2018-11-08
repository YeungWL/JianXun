<template>
  <div class="write">
    <el-form :inline="true" label-width="100px">
      <el-form-item label="工程名称" >
        <el-input v-model="contentItem.name" placeholder="请输入工程名称" style="width:230px;"></el-input>
      </el-form-item>
      <el-form-item label="施工单位">
        <el-input v-model="contentItem.buildName" placeholder="请输入施工单位" style="width:230px;"></el-input>
      </el-form-item>
      <el-form-item label="管理人员数量">
        <el-input v-model="contentItem.managerCount" placeholder="请输入人员数量" style="width:150px;"></el-input>
      </el-form-item>
      <el-form-item label="单位工程名称">
        <el-input v-model="contentItem.unitName" placeholder="请输入单位工程名称" style="width:230px;"></el-input>
      </el-form-item>
      <el-form-item label="技术负责人">
        <el-input v-model="contentItem.principalName" placeholder="请输入技术负责人" style="width:230px;"></el-input>
      </el-form-item>
      <el-form-item label="作业人员数量">
        <el-input style="width:150px" placeholder="请输入人员数量" v-model="contentItem.workCount"></el-input>
      </el-form-item>
    </el-form>

    <div class="mainThing">
      <div class="title">主要记事 : </div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title="item.attrName" name="1" v-for="(item, index) in attrData" :key="index">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="item.content">
          </el-input>
        </el-collapse-item>
      </el-collapse>
      <div class="btn">
        <el-button type="primary" @click="buildLog">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentItem: {
        name: '',
        unitName: '',
        buildName: '',
        managerCount: '',
        workCount: '',
        principalName: ''
      },
      orgId: this.$route.query.orgId,
      date: this.$route.query.date,
      orgTemplateId: this.$route.query.orgTemplateId,
      templateId: this.$route.query.templateId,
      attrData: [],
      projectList: [],
      progress: [],
      activeNames: ['1']
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    // 获取组织主要记事列表
    getBuildAttrList() {
      let params = {
        projectOrgId: this.orgId,
        templateId: this.templateId,
        orgTemplateId: this.orgTemplateId
      }
      this.$api.organizationList(params).then(res => {
        console.log(res)
        if(res.errorCode == "1") {
          this.attrData = res.data.buildAttrList
        }
      })
    },
    // 创建日志
    buildLog() {
      // this.$api.buildLog({
      //   orgId: this.orgId,
      //   orgTemplateId: this.orgTemplateId,
      //   managerCount: this.contentItem.managerCount,
      //   workCount: this.contentItem.workCount,
      //   mainBuildAttr: JSON.stringify(this.attrData)
      // }).then(res => {
      //   console.log(res)
      //   if(res.errorCode == '1') {
          this.$message.success('提交成功')
          this.$router.push({
            path: '/record/homeRecord',
            query: {
              orgId: this.$route.query.orgId,
              orgTemplateId: this.$route.query.orgTemplateId,
              templateId: this.$route.query.templateId,
              projectId: this.$route.query.projectId
            }
          })
      //   }
      // })
    },
    // 获取市政信息
    getCityPolicy() {
      this.$api.getCityPolicy({
        orgTemplateId: this.orgTemplateId
      }).then(res => {
        console.log(res)
        if(res.errorCode == '1') {
          this.contentItem.name = res.data[0].name
          this.contentItem.unitName = res.data[0].unitName
          this.contentItem.buildName = res.data[0].buildName
          this.contentItem.managerCount = res.data[0].managerCount
          this.contentItem.workCount = res.data[0].workCount
          this.contentItem.principalName = res.data[0].principalName
        }
      })
    }
  },
  created() {
    this.getBuildAttrList()
    this.getCityPolicy()
  }
}
</script>

<style lang="scss" scoped>
.write {
  margin: 20px;
  padding: 10px;
  background: #ffffff;
  min-width: 1000px;
  .title {
    width: 100%;
    // margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .add {
      font-size: 24px;
      cursor: pointer;
    }
  }

  .el-form {
      .progress{
        display: block;
        margin-bottom: 0;
        /deep/ .el-form-item__content{
          width: 100%;
        }
      }
    }
  

  .mainThing {
    padding-top: 20px;
    .btn {
      width: 100%;
      position: relative;
      margin-top: 20px;
      text-align: center;
    }
  }
  .content{
    padding: 5px;
    margin-bottom: 8px;
    position: relative;
    width: 80%;
    border: 1px solid #ddd;
    border-radius: 5px;
    // /deep/ .el-card__body{
    //   padding: 0 10px 5px;
    // }
  }
  .clear {
    position: absolute;
    cursor: pointer;
    top: 5px;
    right: 10px;
    font-size: 16px;
    color: #ddd;
    &:hover{
      color: #000;
    }
  }
}
</style>

