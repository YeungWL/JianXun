<template>
  <div class="page-content-body">
      <div class="page-header clearfix">
        <el-form class="search-form" :inline="true" :model="listQuery" ref="form">
          <el-form-item label="登录名称：">
            <el-input v-model="listQuery.loginUserName" @change="handleSearch" clearable></el-input>
          </el-form-item>           
          <el-form-item>
            <el-button type="primary"  icon="el-icon-search" @click="handleSearch">查询</el-button>
          </el-form-item>
          <div class="btn-group fr">
            <el-button type="danger" icon="iconfont icon-del" @click="handleDeleteAll">批量删除</el-button>
          </div>           
        </el-form>
      </div>
      <!--  table开始  -->
      <div class="page-main customTable">
        <el-table ref="multipleTable" style="width: 100%" v-loading="loading"  element-loading-text="拼命加载中"
          :data="tableData"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" min-width="57"></el-table-column>
          <el-table-column prop="loginUserName" label="登录名称" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="loginUserIp" label="IP" min-width="180"></el-table-column>
          <el-table-column prop="loginSystem" label="登录操作系统" min-width="100"></el-table-column>
          <el-table-column prop="accountType" label="渠道来源" min-width="100"></el-table-column>            
          <el-table-column prop="loginBrowser" label="登录浏览器" min-width="100"></el-table-column> 
          <el-table-column prop="loginDate" label="登录时间" min-width="150" sortable></el-table-column>
          <el-table-column label="操作" min-width="120">
            <template slot-scope="scope">              
              <span class="btn" title="删除"  @click="handelDelete(scope.row)"><i class="iconfont icon-del delicon"></i></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页组件 -->
      <ui-pagination :total="total" @change="getPages"></ui-pagination>

  </div>
</template>
<script>

export default {
  name: 'logs',
  data() {
    return {      
      tableData: [], 
      isIndeterminate: false,        
      listQuery: { 
        loginUserName: '',  
        accountType: '',
        pageSize: '',
        currentPage: ''           
      }, 
      loading: true,      
      total: 0,
      multipleSelection:[]
    }   
  },
  mounted() {
    this.getList()
  },  
  created() {
    // 请求第一页数据
    this.listQuery.currentPage = this.$route.query.currentPage ? parseInt(this.$route.query.currentPage) : 1
  },
  methods: {    
    // 获取列表数据
    getList() {
      this.loading = true
      // 获取列表
      this.$api.getUserLogList(this.listQuery).then(response => {     
        if (response.errorCode === '1') { 
          this.loading = false            
          this.tableData = response.data
          this.total = response.totalRecords
        }      
      })    
    },
    getPages(currentPage, pageSize) {
        // 获取翻页数据
        this.listQuery.currentPage = currentPage
        this.listQuery.pageSize = pageSize
        this.getList(this.listQuery)
    },
    // 分页
    handlePageChange(val) {
      this.listQuery.currentPage = val
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    /* 全选/反选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },         
    // 查询 
    handleSearch() {  
      this.getList()
    },
    handelDelete(data) {
        this.$api.delUserLog({           
            userLogId: data.userLogId
        })
        .then(response => {
          if (response.errorCode === '1') {
            this.$message.success('删除成功！')
            this.getList()
          } else {
            this.$message.warning(response.resultMsg)
          }
        })
        .catch(error => {
          this.$message.error(error)
          return false
        })      
    },
    // 批量删除
    handleDeleteAll() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择一条或多条数据')
        return false
      } else {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        })
          .then(_ => {
            let ids = '';
            this.multipleSelection.forEach(item => {
              ids += item.userLogId + '_'
            })
            this.$api
              .delBatchUserLog({
                userLogIdArrs: ids.substring(0, ids.length - 1)
              })
              .then(response => {
                if (response.errorCode === '1') {
                  this.getList()
                  this.$message.success('删除成功')
                  return false
                }
              })
              .catch(error => {
                this.$message.error(error)
                return false
              })
          })
          .catch(_ => {
            this.$message({
              type: 'warning',
              message: '操作取消'
            })
            this.$refs.multipleTable.clearSelection()
            return false
          })
      }
    }    
  }    
}
</script>

<style lang="scss" scoped>
</style>