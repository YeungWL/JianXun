<template>
  <section class="page-content-body org-container">
    <el-card class="org-card" v-for="(resData, index) in orgData" :key="index">
      <div slot="header">
        <span>{{resData.proName}}</span>
      </div>
      <ul class="content" v-if="resData.orgList.length > 0">
        <li class="item" v-for="(orgItem, index) in resData.orgList" :key="index">
          <span>{{orgItem.orgName}}</span>
          <span><el-button type="primary" @click="changeRelative(resData, orgItem, 3)" :disabled="orgItem.status == '3'">{{orgItem.status == '3' ? '已申请退出' : '申请退出'}}</el-button></span>
        </li>
      </ul>
      <div class="item1" v-else>暂无关联组织哦~</div>
    </el-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      orgData: []
    }
  },
  methods: {
    changeRelative(resData, orgItem, order) {
      console.log(resData, orgItem)
      this.$confirm('确定申请退出?', '提示', {
        type: 'warning'
      }).then(_ => {
        this.$api.doApplyOrg({
          projectOrgId: orgItem.projectOrgId,
          projectId: resData.projectId,
          status: order
        }).then(res => {
          if(res.errorCode == '1') {
            this.$message.success('申请成功')
            // this.getManageProjectList()
            this.getMyOrgBindList()
          }
          console.log(res)
        })
      }).catch(_ => {
        this.$message.warning('已经取消操作')
      })
    },
    // getManageProjectList() {
    //   this.$api.getManageProjectList().then(res => {
    //     console.log(res)
    //     if(res.errorCode == '1') {
    //       this.orgData = res.data
    //     }
    //   })
    // },
    getMyOrgBindList() {
      this.$api.getMyOrgBindList({
        isMyCreate: '1'
      }).then(res => {
        console.log(res)
        if(res.errorCode == '1') {
          this.orgData = res.data
        }
      })
    }
  },
  created() {
    // this.getManageProjectList() 
    this.getMyOrgBindList()
  }
}
</script>

<style lang="scss" scoped>
.org-container{
  .org-card{
    margin: 0 auto 20px;
    width: 70%;
    .item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
    }
  }
  .item1 {
    text-align: center;
  }
}
</style>
