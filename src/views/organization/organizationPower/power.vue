<template>
  <div class="power-container page-content-body">
    <div class="organizationManage_header">
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="选择组织">
          <el-select clearable placeholder="请选择" v-model="listQuery.orgData" @change="getMyOrgList">
            <el-option v-for="item in optionList" :key="item.projectOrgId" :label="item.orgName" :value="item.projectOrgId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="scroll-box">
      <ul class="content">
        <li class="scroll-item">
          <div class="pro-name">项目名称: <span>{{orgData.length > 0 ? orgData[0].projectName : ''}}</span></div>
          <el-checkbox-group v-model="selectData">
            <el-checkbox :label="item.projectOrgId" v-for="(item, index) in checkList" :key="index" style="line-height:40px;">{{item.orgName}}</el-checkbox>
          </el-checkbox-group>
        </li>
      </ul>
    </div>
    <div style="text-align: center;margin-top: 30px;">
      <el-button type="primary" @click="setOrgGrant">确定</el-button>
    </div>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        orgData: ''
      },
      selectData: [],
      optionList: [],
      checkList: [],
      orgData: [],
      projectId: ''
    }
  },
  methods: {
    getManageOrgList() {
      this.$api.getManageOrgList({
        isMyCreate: 2
      }).then(res => {
        console.log(res)
        if(res.errorCode == '1') {
          this.optionList = res.data
        }
      })
    },
    // 根据组织ID查询授权与我的组织列表
    getMyOrgList(value) {
      this.$api.getMyOrgList({
        orgId: value
      }).then(res => {
        if(res.errorCode == '1') {
          this.orgData = res.data
          if(res.data.length > 0) {
            this.checkList = res.data[0].grantOrgList
            this.projectId = res.data[0].projectId
            this.selectData = []
            for(let i = 0; i < res.data[0].grantOrgList.length; i++) {
              if(res.data[0].grantOrgList[i].isGrant == 'Y') {
                this.selectData.push(res.data[0].grantOrgList[i].projectOrgId)
              }
            }
          }
          
          // if(res.data.length > 0) {
          //   console.log(res.data[0].projectId)
          //   this.getGrantOrgList(res.data[0].projectId)
          // }
        }
      })
    },
    // 获取项目已授权的组织列表
    getGrantOrgList(value) {
      this.$api.getGrantOrgList({
        projectId: value
      }).then(res => {
        console.log(res)
        if(res.errorCode == '1') {
          this.checkList = res.data
        }
      })
    },
    // 设置授权组织权限
    setOrgGrant() {
      let selectStr = ''
      for(let i = 0; i < this.selectData.length; i++) {
        selectStr += this.selectData[i]+'-'
      }
      console.log(selectStr.substring(0, selectStr.length-1))
      this.$api.setOrgGrant({
        projectId: this.projectId,
        orgId: this.listQuery.orgData,
        orgRefIds: selectStr.substring(0, selectStr.length-1)
      }).then(res => {
        console.log(res)
        if(res.errorCode == '1') {
          this.$message.success(res.resultMsg)
          this.getMyOrgList(this.listQuery.orgData)
        }
      })
    }
  },
  created() {
    this.getManageOrgList()
  }
}
</script>

<style lang="scss" scoped>
.power-container{
  min-height: 95%;
  background: #ffffff;
  .scroll-box{
    width: 100%;
    // box-shadow: darkgrey -2px -5px 20px 2px;
  }
  .el-checkbox{
    display: block;
    margin: 0;
  }
  .content{
    // width: 105%;
    padding: 0 20px;
    height: 55vh;
    overflow-y: scroll;
    .scroll-item{
      padding-bottom:20px;
    }
    .pro-name{
      margin-bottom: 10px;
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
