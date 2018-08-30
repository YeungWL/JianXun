<template>
  <section class="page-content-body org-container">
    <el-card class="org-card" v-for="(item,index) in connection" :key="index">
      <div slot="header">
        <span>{{item.proName}}</span>
      </div>
      <ul class="content" v-if="item.orgList.length > 0">
        <li class="item" v-for="(item1,index1) in item.orgList" :key="index1">
          <span>{{item1.orgName}}</span>
          <span>
            <el-button type="primary" @click="changeRelative">{{text}}</el-button>
          </span>
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
      status: '',
      connection: [],
      text: '解除关联'
    }
  },
  methods: {
    //获取关联项目
    getConnection() {
      let params = {
        status: this.status
      }
      this.$api.getManageProjectList(params).then(res => {
        if (res.errorCode !== '1') return false
        this.connection = res.data
        console.log(res)
      })
    },
    //解除和恢复关联
    changeRelative() {
      console.log()
      this.$confirm('确定解除?', '提示', {
        type: 'warning'
      })
        .then(_ => {

          this.$message.success('解除成功')
        })
        .catch(_ => {
          this.$message.warning('已经取消操作')
        })
    }
  },
  created() {
    this.getConnection()
  }
}
</script>

<style lang="scss" scoped>
.org-container {
  .org-card {
    margin: 0 auto 20px;
    width: 70%;
    .item {
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
