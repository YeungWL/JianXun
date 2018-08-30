<template>
  <section class="page-content-body msg-container customTable">
    <el-table ref="multipleTable" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" :data="tablelist" key="ArcDataArr">
      <!--<el-table-column type="selection" width="35"></el-table-column>-->
      <el-table-column prop="message" label="消息" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">{{scope.row.realName}}创建的【{{scope.row.orgName}}】组织申请加入您创建的 【{{scope.row.proName}}】项目</span>
          <span v-if="scope.row.status == 3">{{scope.row.realName}}创建的【{{scope.row.orgName}}】组织 申请退出您创建的 【{{scope.row.proName}}】项目</span>
          <!-- <span v-if="scope.row.status == 3">{{scope.row.realName}}创建的【{{scope.row.orgName}}】组织 申请退出您创建的 【{{scope.row.proName}}】项目</span> -->
          <span v-if="scope.row.status == 2">{{scope.row.realName}}创建的【{{scope.row.orgName}}】组织 申请申请转让给您</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="clickAgree(scope.row)">同意</el-button>
          <el-button size="mini" type="danger" @click="clickReject(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tablelist: [],
      loading: false,
      status: ''
    }
  },
  methods: {
    //获取项目申请消息
    getMsg() {
      this.$api.getApplyOrgList().then(res => {
        if (res.errorCode !== '1') return false
        this.tablelist = res.data
        console.log(res)
      })
    },
    // 同意申请消息
    clickAgree(data) {
      this.$confirm('确定同意?', '提示', {
        type: 'warning'
      })
        .then(_ => {
          if (data.status === '0') {
            this.status = '1'
          }
          if (data.status === '3') {
            this.status = '4'
          }
          let params = {
            projectOrgId: data.projectOrgId,
            projectId: data.projectId,
            status: this.status
          }
          this.$api.doApplyOrg(params).then(res => {
            if (res.errorCode !== '1') return false
            this.getMsg()
          })
          this.$message.success('操作成功')
        })
        .catch(_ => {
          this.$message.warning('已经取消操作')
        })
    },
    // 拒绝申请消息
    clickReject(data) {
      this.$confirm('确定拒绝?', '提示', {
        type: 'warning'
      })
        .then(_ => {
          if (data.status === '0') {
            this.status = '2'
          }
          if (data.status === '3') {
            this.status = '5'
          }
          let params = {
            projectOrgId: data.projectOrgId,
            projectId: data.projectId,
            status: this.status
          }
          this.$api.doApplyOrg(params).then(res => {
            if (res.errorCode !== '1') return false
            this.getMsg()
          })
          this.$message.success('操作成功')
        })
        .catch(_ => {
          this.$message.warning('已经取消操作')
        })
    }
  },
  created() {
    this.getMsg()
  }
}
</script>
