<template>
  <div class="page-content-body">
    <div class="page-header">
      <!--<el-form class="search-form" :inline="true" :model="listQuery" ref="form" >
        <el-form-item label="地区名称：">
          <el-input v-model="listQuery.name" placeholder="地区名称" clearable @change="handleSearch"></el-input>
        </el-form-item>
        <el-form-item label="地区号：">
          <el-input v-model="listQuery.areaCode" placeholder="地区号" clearable @change="handleSearch"></el-input>
        </el-form-item> 
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
     
        </el-form-item> 
      </el-form>      -->
    </div>

    <!--  treetable 表格-->
    <div class="page-main customTable">
      <tree-grid :columns="columns"
                 :tree-structure="true"
                 :data-source="tableData"
                 ></tree-grid>

    </div>

    <!-- 分页组件 -->
    <!--<ui-pagination :total="total" @change="getPages"></ui-pagination>-->
   

  </div>
</template>

<script>
import TreeGrid from 'components/treeTable/treeGrid'
export default {
  components: {
    TreeGrid
  },  
  name: 'area1',  
  data() {
    return {
      columns: [
        {
          text: '地区名称',
          dataIndex: 'name'
        },
        {
          text: '地区号',
          dataIndex: 'areaCode'
        },
        {
          text: '地区级别',
          dataIndex: 'areaLevel'
        }
      ],  
      tableData: [],
      listQuery: {   
        areaCode: 0
      }, 
      total: 0,            
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取表格的数据
    getList() {
      this.loading = true
      this.$api.getCityAllChild(this.listQuery).then(response => {
        this.loading = false
        if (response.errorCode === '1') {
          this.tableData = response.data
          // this.total = response.totalRecords

        } else {
          this.$message.warning(response.resultMsg)
        }
      })
    },
    getPages(currentPage, pageSize) {
        // 获取翻页数据
        this.listQuery.currentPage = currentPage
        this.listQuery.pageSize = pageSize
        this.getList(this.listQuery)
    }, 
    // 搜索按钮
    handleSearch() {
      this.getList()
    }         
  }
}
</script>
<style lang="scss" scoped>
.tree {
    min-width: 200px;
    height: 300px;
    overflow: auto;
    border: 1px solid #d4dde2;
}
.newRole .addrole .el-form-item {
  margin-left: 5px;
}
</style>