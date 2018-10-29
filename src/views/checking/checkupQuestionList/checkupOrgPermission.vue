<template>
  <div class="page-content-body">
    <div class="page-header page-navbar clearfix">
      <div class="ui-title float_l"><span class="iconfont icon-home"></span>设置</div>
      <el-button type="primary"  icon="el-icon-d-arrow-left" class="float_r" @click="goBack">返回</el-button> 
    </div>
    <div class="page-main" style="width:70%">
        <h3 class="page-hd">授权进行现场检查的项目内组织</h3>
        <div class="page-bd">
          <el-checkbox-group 
            v-model="selectData" class="checklist">
            <el-checkbox v-for="(item, index) in beAuthorOrgsList" :label="item.projectOrgId" :key="index"
           >{{item.orgName}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="page-ft btn-group">
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </div>
    </div>
  </div>
</template>
<script>
export default {  
  name: 'checkup',
  data() {
    return {
      beAuthorOrgsList: [],
      selectData: [], // 选中的ID,label的值
    }
  },
  mounted() {
  },  
  created() {
    this.getBeAuthorOrgs()
  }, 
  methods: {
    // 获取已授权的组织列表
    getBeAuthorOrgs() {
      this.$api.getBeAuthorOrgs({projectId: this.$route.query.projectId, orgId: this.$route.query.orgId}).then(response => {     
        if (response.errorCode === '1') {          
          this.beAuthorOrgsList = response.data
          this.selectData = []
          for(let i = 0; i < response.data.length; i++) {
            if(response.data[i].isAuthor === '2') {
              this.selectData.push(response.data[i].projectOrgId)
            }
          }          
        }      
      }) 
    },
    // 组织授权提交
    handleSubmit() {
      if(this.selectData.length === 0){
        this.$message.warning('请至少选择一条数据！')
        return
      }
      // 将获取到的ID拼接后台需要的格式 
      let selectStr = ''
      for(let i = 0; i < this.selectData.length; i++) {
        selectStr += this.selectData[i]+'-'
      }
      // console.log(selectStr.substring(0, selectStr.length-1))          
      this.$api.checkupOrgPermission({
        projectId: this.$route.query.projectId, 
        orgId: this.$route.query.orgId, 
        orgRefIds: selectStr.substring(0, selectStr.length-1)})
      .then(response => {     
        if (response.errorCode === '1') {          
          this.$message.success(response.resultMsg)
          setTimeout(_ => {
              this.goBack()
          }, 1000)
        }      
      }) 
           
    },   
    /* 返回 */
    goBack() {
      this.$router.go(-1);
    }         
  }    
}
</script>

<style lang="scss" scoped>
.page-navbar {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    vertical-align: middle;
    .ui-title{
      padding: 0 10px;
      position: relative;
      border-left: none;
      margin: 0;
      font-size: 16px;
      &:before {
        content: '';
        width: 2px;
        height: 14px;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -7px;
        background: #409EFF;
      }
    }
}
.page-main{
  .page-hd{
    padding-top:20px;
    padding-bottom:20px;   
  }
  .checklist{
    padding-left: 10px;
    .el-checkbox, .el-checkbox__input{
      display: block;
      margin-bottom: 10px;
    }
    .el-checkbox+.el-checkbox {
      margin-left: 0px;
    }
  }
  .page-ft{
    padding-top:20px;
    padding-left: 40px;
  }
}
</style>