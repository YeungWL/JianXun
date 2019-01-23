<template>
  <div class="page-content-body clealfix">
   <!-- 树组件 -->
    <menu-tree @change="getChannelId"  :copy="true" ></menu-tree>
    <div class="content-right">
      <div class="page-header clearfix">
        <el-form class="search-form" :inline="true" :model="listQuery" ref="form" >
            <el-form-item label="标题：">
              <el-input v-model="listQuery.title" placeholder="请输入标题" clearable @change="handleSearch"></el-input>
            </el-form-item>
            <el-form-item label="发布人：">
              <el-input v-model="listQuery.name" placeholder="请输入发布人" clearable @change="handleSearch"></el-input>
            </el-form-item> 
            <el-form-item label="内容类型：">
              <el-select v-model="listQuery.type" placeholder="请选择">
                <el-option label="内容文章" value="1"></el-option>
                <el-option label="外链文章" value="2"></el-option>
                <el-option label="广告位" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否置顶：">
              <el-select v-model="listQuery.top" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否推荐：">
              <el-select v-model="listQuery.recommend" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </el-form-item>
            <div class="btn-group fr">
              <el-button type="primary" icon="el-icon-plus" @click="handleCreate()">添加内容</el-button>
              <el-button type="danger" icon="iconfont icon-del" @click="handleDeleteAll()">批量删除</el-button>
              <el-button type="success" icon="iconfont el-icon-back" @click="handleRecoverAll()">批量恢复</el-button>
              <el-button type="primary" icon="el-icon-upload2" @click="handleTopAll()">批量置顶</el-button>
              <el-button type="warning" icon="el-icon-star-off" @click="handleRecommendAll()">批量推荐</el-button>          
            </div>
        </el-form>      
      </div>

      <!--  table开始  -->
      <div class="customTable">
        <el-table style="width:100%"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                     @selection-change="handleSelectionChange"
                    :data="tableData">
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column label="标题"
                            min-width="200"
                            show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.menuName}}</template>
            </el-table-column>
            <el-table-column label="归属栏目"
                            min-width="100"
                            show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.menuName}}</template>
            </el-table-column>
            <el-table-column label="发布者"
                            min-width='80'
                            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.menuType}}</span>
            </template>
            </el-table-column>
            <el-table-column label="内容类型"
                            min-width='80'
                            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.menuType}}</span>
            </template>
            </el-table-column>
            <el-table-column label="是否置顶"
                            min-width="80"
                            show-overflow-tooltip>
            <template slot-scope="scope">
               <span>{{scope.row.menuCode== null?'null':scope.row.menuCode}}</span>       
            </template>
            </el-table-column>
            <el-table-column label="是否推荐"
                            min-width="80"
                            show-overflow-tooltip prop="menuOrder">
            <template slot-scope="scope">{{scope.row.menuOrder== null?'null':scope.row.menuOrder}}</template>
            </el-table-column>  
            <el-table-column label="状态"
                            min-width="60"
                            show-overflow-tooltip>
            <template slot-scope="scope">
               <span>{{scope.row.menuCode== null?'null':scope.row.menuCode}}</span>       
            </template>
            </el-table-column>
            <el-table-column label="创建时间"
                            min-width="120"
                            show-overflow-tooltip prop="menuOrder" sortable>
            <template slot-scope="scope">{{scope.row.menuOrder== null?'null':scope.row.menuOrder}}</template>
            </el-table-column>          
            <el-table-column label="操作" min-width="120" style="">
            <template slot-scope="scope">
                <span class="btn" title="编辑"
                    @click="handleUpdate(scope.row.id)">
                  <i class="iconfont icon-edit editicon"></i>
                </span>
                <span class="btn" title="删除"  v-if='scope.row.isDeleted == "N"'
                      @click="handelDelete(scope.row,'Y')">删除
                  <!--<i class="iconfont icon-shanchu delicon"></i>-->
                </span>
                <span class="btn" title="恢复"  v-else
                      @click="handelDelete(scope.row,'N')">恢复
                  <!--<i class="iconfont icon-shanchu delicon"></i>-->
                </span>                
            </template>
            </el-table-column>
        </el-table>
      </div>

      <!-- 分页组件 -->
      <ui-pagination :total="total" @change="getPages"></ui-pagination>

    </div>


  </div>
</template>
<script>
import menuTree from 'components/treecomponents/menuTree.vue'// 栏目列表
// import rootTree from 'components/treecomponents/rootTree.vue'// 选择上级栏目
export default {
  components: {
    menuTree,
    // rootTree
  },  
  data() {
    return {
      tableData: [], // 表格数据          
      listQuery: { 
        title: '',
        name: '',
        type: '',
        top: '',  
        recommend: '', 
        currentPage: 1,
        pageSize: 10,
      },    
      total: 0, // 列表总数                  
      loading: false,
      multipleSelection:[]
    }
  },
  created() {
    this.getList();
     // 初始获取数据
    // this.menuForm.parentId = this.listQuery.parentId;   
    // console.log("parentId："+this.menuForm.parentId)  
 
  },
  mounted() {
   
  },
  methods: {
    // 获取表格的数据
    getList() {
      this.$api.menuList(this.listQuery).then(response => {
        if (response.errorCode === '1') {
          this.tableData = response.data
          this.total = response.totalRecords
          // console.log(this.tableData)
        } else {
          this.$message.warning(response.resultMsg)
        }
      }).catch(error => {
        this.$message.error(error)
        return false
      })
    },
    getPages(currentPage, pageSize) {
        // 获取翻页数据
        this.listQuery.currentPage = currentPage;
        this.listQuery.pageSize = pageSize;
        this.getList(this.listQuery);
    },
    // 搜索按钮
    handleSearch() {
      // // this.listQuery.menuName = this.listQuery.menuName.trim()
      // if ( this.listQuery.menuName === '' || this.listQuery.menuCode === '' ) {
      //   this.$message('搜索内容不能为空')
      //   return false
      // }
      this.getList()
    },
    // 获取点击的栏目父级id，更新右侧列表数据  
    getChannelId(data, node) { 
      this.listQuery.parentId = data.id
      this.menuForm.parentId = data.id
      this.getList(this.listQuery)
    }, 
    // 新增内容
    handleCreate() {
      this.$router.push({
        path: "/helpContent/addHelpContent",
        query: { type:'create'}
      })
    }, 
     // 编辑内容
    handleUpdate(contentId) {   
      this.$router.push({
        path: "/helpContent/addHelpContent",
        query: { id: contentId, type:'update'}
      })
    },   
    // 停用/启用提交
    deletemenu(data,val) {                 
        this.$api.delMenu({   
          menuId: data.menuId,
          isDeleted: val
        }).then(response => {
          if (response.errorCode === '1') {
            this.$message.success('操作成功!')
            this.getList()
          } else {
            this.$message.warning(response.resultMsg)
          }
        }).catch(error => {
          this.$message.error(error)
          return false
        })
    },
    // 停用/启用判断
    handelDelete(data,val) {
      if (data.isDeleted === 'N') {
        this.$confirm('确定要停用吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        })
        .then(() => {
          this.deletemenu(data,val)
          // console.log(val)
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '操作取消'
          })
          return false
        })
      } else {
        this.$confirm('确定要恢复该吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        })
        .then(() => {
          this.deletemenu(data,val)
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '操作取消'
          })
          return false
        })
      }
    },
    // 全选/反选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量删除
    handleDeleteAll() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择一条或多条数据')
        return false
      } else {
        this.$confirm('此操作将停用栏目使用, 是否继续?', '提示', {
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
    },
    // 批量恢复
    handleRecoverAll() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择一条或多条数据')
        return false
      } else {
        this.$confirm('此操作将启用栏目使用, 是否继续?', '提示', {
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
                  this.$message.success('操作成功')
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
    },
    // 批量置顶
    handleTopAll() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择一条或多条数据')
        return false
      } else {
        this.$confirm('此操作将停用栏目使用, 是否继续?', '提示', {
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
    },
    // 批量推荐
    handleRecommendAll() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择一条或多条数据')
        return false
      } else {
        this.$confirm('此操作将启用栏目使用, 是否继续?', '提示', {
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
                  this.$message.success('操作成功')
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
.content-right{
    float: left;
    padding-left: 220px;
    width: 100%;
}
</style>