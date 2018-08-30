<template>
  <div class="page-content-body">
    <!--  table开始  -->
    <div class="page-main customTable" style="margin-top:10px;">
      <el-table ref="multipleTable" style="width:100%" v-loading="loading" element-loading-text="拼命加载中"
        :data="colletList"  key="ArcDataArr">
        <el-table-column prop="favTitle" label="标题" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="时间" min-width="80"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="delMyList(scope.row)">取消收藏</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <ui-pagination :total="total"  @change="getPages"></ui-pagination>
  </div>
    
</template> 
<script>
export default {
  data() {
    return {
        loading:false,
        colletList:[],
        listQuery: { 
          currentPage: '',           
          pageSize: ''
        },
        total:0
    }
  },
  created() {
    this.getFavourite()
  },
  methods: {
    // 获取收藏列表
    getFavourite(){
      this.loading = true
      this.$api.getFavourite(this.listQuery).then(response =>{
        if(response.errorCode === '1'){
          this.loading = false
          this.colletList = response.data
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
    // 取消收藏
    delMyList(data) {
      this.$api.delFavourite({ 
          objId:data.objId,
          isDeleted:'Y'
      }).then(response => {
        if(response.errorCode === '1') {
           this.$message('取消收藏成功！')
        } else {
          this.$message.warning(response.resultMsg)
        }  
      })
    }

  }
}
</script>