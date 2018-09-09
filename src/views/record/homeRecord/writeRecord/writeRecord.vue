<template>
  <div class="write">
    <div class="title">
      <span>施工内容 : </span>
      <span class="add el-icon-edit-outline" title="添加" @click="createBuildContent"></span>
    </div>
    
    <el-form :inline="true" >
      <ul>
        <li class="content" v-for="(contentItem, index) in buildContent" :key="index">
          <el-form-item label="工程名称" style="margin-bottom:0;" >
            <el-select v-model="contentItem.itemName" placeholder="请选择工程" style="width:250px">
              <el-option v-for="item in projectList" :key="item.itemId" :label="item.itemName" :value="item.itemName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="层段位置" style="margin-bottom:0;">
            <el-input v-model="contentItem.layerNo" placeholder="请输入层段位置" style="width:250px;"></el-input>
          </el-form-item>
          <el-form-item label="班组" style="margin-bottom:0;">
            <el-select v-model="contentItem.groupName" placeholder="请选择班组" style="width:250px">
              <el-option v-for="item in group" :key="item.groupId" :label="item.groupName" :value="item.groupName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人数" style="margin-bottom:0;">
            <el-input v-model="contentItem.workCount" placeholder="请输入人数" style="width:120px;"></el-input>
          </el-form-item>
          <el-form-item class="progress" label="进度情况">
            <el-input style="width:100%" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入进度情况" v-model="contentItem.progress"></el-input>
          </el-form-item>
          <span style="display:none;">{{contentItem.orderNo = index}}</span>
          <span class="clear el-icon-circle-close-outline" title="删除" @click="deleteBuildContent(index)"></span>
        </li>
      </ul>
    </el-form>

    <div class="mainThing">
      <div class="title">主要记事 : </div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title="item.attrId + '.' +item.attrDesc" name="1" v-for="(item, index) in attrData" :key="index">
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
      orgId: this.$route.query.orgId,
      date: this.$route.query.date,
      orgTemplateId: this.$route.query.orgTemplateId,
      attrData: [],
      projectList: [],
      group: [],
      progress: [],
      activeNames: ['1'],
      buildContent: [
        {
          "itemName": "",
          "groupName": "",
          "workCount": '',
          "layerNo": '',
          "floorNo": 0,
          "layerName": "",
          "progress": "",
          "orderNo": 0
        }
      ]
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    // 获取组织主要记事列表
    getBuildAttrList() {
      let params = {
        orgId: this.orgId
      }
      this.$api.organizationList(params).then(res => {
        console.log(res)
        if(res.errorCode == "1") {
          for(let i = 0; i < res.data.length; i++) {
            res.data[i].content = ''
          }
          this.attrData = res.data
        }
      })
    },
    //获取用户关联的工程
    getProjectList() {
      this.$api.getBuildLogItemList({
          projectOrgId: this.orgId
        })
        .then(res => {
          // console.log(res)
          if(res.errorCode == '1'){
            this.projectList = res.data
          }
        })
    },
    //获取组织分组
    getGroupList() {
      let params = {
        projectOrgId: this.orgId
      }
      this.$api.getBuildLogGroupList(params).then(res => {
        if(res.errorCode == '1') {
          this.group = res.data
        }else {
          this.$message.warning('网络延迟')
        }
      })
    },
    //获取组织施工进度
    getProgressList() {
      this.date = this.date.replace(/\//g, '-')
      let params = {
        projectOrgId: this.orgId,
        date: this.date,
        orgTemplateId: this.orgTemplateId
      }
      this.$api.getBuildLogProgressList(params).then(res => {
        if (res.resultMsg !== '查询成功') return false
        this.progress = res.data
      })
    },
    // 获取层段位置
    getLayer() {
      let params = {
        projectOrgId: this.orgId
      }
      this.$api.getBuildLogLayer(params).then(res => {
        // console.log(res)
      })
    },
    // 增加施工内容
    createBuildContent() {
      // this.orderIndex ++
      let data = {
        "itemName": "",
        "groupName": "",
        "workCount": '',
        "layerNo": '',
        "floorNo": 0,
        "layerName": "",
        "progress": "",
        "orderNo": this.orderIndex
      }
      this.buildContent.push(data)
    },
    // 删除施工内容
    deleteBuildContent(index) {
      this.buildContent.splice(index, 1)
    },
    // 创建日志
    buildLog() {
      this.$api.buildLog({
        orgId: this.orgId,
        orgTemplateId: this.orgTemplateId,
        buildContent: JSON.stringify(this.buildContent),
        mainBuildAttr: JSON.stringify(this.attrData)
      }).then(res => {
        console.log(res)
        if(res.errorCode == '1') {
          this.$message.success('提交成功')
          this.$router.push({path: '/record'})
        }
      })
    }
  },
  created() {
    this.getBuildAttrList()
    this.getProjectList()
    this.getGroupList()
    this.getProgressList()
    this.getLayer()
  }
}
</script>

<style lang="scss" scoped>
.write {
  margin: 20px;
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

