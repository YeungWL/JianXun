<template>
  <div class="page-content-body clealfix">
   <!-- 树组件 -->
    <column-tree @change="getChannelId"  :copy="true"  :default-checked-keys="[5]"></column-tree>
    <div class="content-right">
      <div class="page-header clearfix">
        <el-form class="search-form" :inline="true" :model="listQuery" ref="form" >
            <el-form-item label="标题：">
              <el-input v-model="listQuery.title" placeholder="请输入标题" clearable @change="handleSearch"></el-input>
            </el-form-item>
            <el-form-item label="发布人：">
              <el-input v-model="listQuery.publisher" placeholder="请输入发布人" clearable @change="handleSearch"></el-input>
            </el-form-item> 
            <el-form-item label="内容类型：">
              <el-select v-model="listQuery.type" placeholder="请选择">
                <el-option label="内容文章" value="1"></el-option>
                <el-option label="外链文章" value="2"></el-option>
                <el-option label="广告位" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否置顶：">
              <el-select v-model="listQuery.isTop" placeholder="请选择">
                <el-option label="是" value="Y"></el-option>
                <el-option label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否推荐：">
              <el-select v-model="listQuery.isRecommend" placeholder="请选择">
                <el-option label="是" value="Y"></el-option>
                <el-option label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </el-form-item>
            <div class="btn-group fr">
              <el-button type="primary" icon="el-icon-plus" @click="handleCreate()">添加内容</el-button>
              <el-button type="danger" icon="iconfont icon-del" @click="handleBatchOperate('1')">批量删除</el-button>
              <el-button type="success" icon="iconfont el-icon-back" @click="handleBatchOperate('2')">批量恢复</el-button>
              <el-button type="primary" icon="el-icon-upload2" @click="handleBatchOperate('3')">批量置顶</el-button>
              <el-button type="warning" icon="el-icon-star-off" @click="handleBatchOperate('4')">批量推荐</el-button>
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
                            min-width="120"
                            show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.title}}</template>
            </el-table-column>
            <el-table-column label="归属栏目"
                            min-width="100"
                            show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.columnName}}</template>
            </el-table-column>
            <el-table-column label="发布者"
                            min-width='100'
                            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.publisher}}</span>
            </template>
            </el-table-column>
            <el-table-column label="内容类型"
                            min-width='80'
                            show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.type == '1'">内容文章</span>
              <span v-else-if="scope.row.type == '2'">外链文章</span>
              <span v-else>广告位</span>
            </template>
            </el-table-column>
            <el-table-column label="是否置顶"
                            min-width="80"
                            show-overflow-tooltip>
            <template slot-scope="scope">
               <span>{{scope.row.isTop== 'Y'?'是':'否'}}</span>
            </template>
            </el-table-column>
            <el-table-column label="是否推荐"
                            min-width="80"
                            show-overflow-tooltip prop="menuOrder">
            <template slot-scope="scope">{{scope.row.isRecommend== 'Y'?'是':'否'}}</template>
            </el-table-column>  
            <el-table-column label="状态"
                            min-width="80"
                            show-overflow-tooltip>
            <template slot-scope="scope">
               <span>{{scope.row.isDeleted== 'Y'?'已停用':'正常'}}</span>
            </template>
            </el-table-column>
            <el-table-column label="创建时间"
                            min-width="120"
                            show-overflow-tooltip prop="menuOrder" sortable>
            <template slot-scope="scope">{{scope.row.createTime== null?'null':scope.row.createTime}}</template>
            </el-table-column>          
            <el-table-column label="操作" min-width="120" style="">
            <template slot-scope="scope">
                <span class="btn" title="编辑"
                    @click="handleUpdate(scope.row.id)">
                  <i class="iconfont icon-edit editicon"></i>
                </span>
                <span class="btn" title="停用"  v-if='scope.row.isDeleted == "N"'
                      @click="handelDelete(scope.row,'Y')">
                   <i class="iconfont icon-tingyong iconred"></i>
                </span>
                <span class="btn" title="恢复"  v-else
                      @click="handelDelete(scope.row,'N')">
                  <i class="iconfont icon-qiyong iconblue"></i>
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
import columnTree from 'components/treecomponents/columnTree.vue'// 栏目列表
export default {
  components: {
    columnTree
  },  
  data() {
    return {
      tableData: [], // 表格数据          
      listQuery: {
        columnId:'',
        code:'',
        title: '',
        publisher: '',
        type: '',
        isTop: '',
        isRecommend: '',
        currentPage: 1,
        showCount: 10,
      },    
      total: 0, // 列表总数                  
      loading: false,
      multipleSelection:[]
    }
  },
  created() {
 
  },
  mounted() {
  },
  methods: {
    // 获取表格的数据
    getList() {
      this.$api.contentList(this.listQuery).then(response => {
        if (response.errorCode === '1') {
          this.tableData = response.data
          this.total = response.totalRecords
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
        this.listQuery.showCount = pageSize;
        this.getList();
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
      // console.log(data);
      this.listQuery.columnId = data.id
      // this.listQuery.code = data.code
      this.getList()
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
    deleteOrRecover(data,val) {
        this.$api.deleteOrRecover({
          id: data.id,
          isDeleted: val
        }).then(response => {
          if (response.errorCode === '1') {
            this.$message.success('操作成功!')
            this.getList()
          } else {
            this.$message.warning(response.resultMsg)
          }
        }).catch(error => {
          console.log(error)
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
          this.deleteOrRecover(data,val)
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
          this.deleteOrRecover(data,val)
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
    // 批量删除/恢复/置顶/推荐
    handleBatchOperate(otype) {
      let tips = '';
      if(otype === '1'){
        tips = '此操作将停用内容使用, 是否继续?'
      }else if(otype === '2'){
        tips = '此操作将恢复内容使用, 是否继续?'
      }else if(otype === '3'){
        tips = '此操作将置顶内容, 是否继续?'
      }else if(otype === '4'){
        tips = '此操作将推荐内容, 是否继续?'
      }
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择一条或多条数据')
        return false
      } else {
        this.$confirm(tips, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        })
          .then(_ => {
            let ids = '';
            this.multipleSelection.forEach(item => {
              ids += item.id + '-'
            })
            this.$api
              .batchOperate({
                operateType: otype,
                idArr: ids.substring(0, ids.length - 1)
              })
              .then(response => {
                if (response.errorCode === '1') {
                  this.getList()
                  this.$message.success('操作成功！')
                }else {
                  this.$message.warning(response.resultMsg)
                }
              })
              .catch(error => {
                console.log(error)
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
