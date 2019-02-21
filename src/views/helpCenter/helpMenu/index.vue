<template>
  <div class="page-content-body clealfix">
   <!-- 树组件 -->
    <column-tree @change="getChannelId"  :copy="true"></column-tree>
    <div class="content-right">
      <div class="page-header clearfix">
        <el-form class="search-form" :inline="true" :model="listQuery" ref="form" >
            <el-form-item label="栏目名称：">
              <el-input v-model="listQuery.name" placeholder="请输入栏目名称" clearable @change="handleSearch"></el-input>
            </el-form-item>
            <el-form-item label="栏目编码：">
              <el-input v-model="listQuery.code" placeholder="请输入栏目编码" clearable @change="handleSearch"></el-input>
            </el-form-item>            
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </el-form-item>
            <div class="btn-group fr">
              <el-button type="primary" icon="el-icon-plus" @click="handleCreate()">添加栏目</el-button>
            </div>
        </el-form>      
      </div>

      <!--  table开始  -->
      <div class="customTable">
        <el-table style="width:100%"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    :data="tableData">
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column label="栏目名称"
                            min-width="100"
                            show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column label="父级名称"
                            min-width="100"
                            show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.parentName}}</template>
            </el-table-column>
            <el-table-column label="所属层级"
                            min-width='80'
                            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.level}}</span>
            </template>
            </el-table-column>

            <el-table-column label="编码"
                            min-width="120"
                            show-overflow-tooltip>
            <template slot-scope="scope">
               <span>{{scope.row.code== null?'null':scope.row.code}}</span>
            </template>
            </el-table-column>
            <el-table-column label="排序"
                            min-width="80"
                            show-overflow-tooltip prop="orderNo" sortable>
            <template slot-scope="scope">{{scope.row.orderNo== null?'null':scope.row.orderNo}}</template>
            </el-table-column>           
            <el-table-column label="操作" min-width="120" style="">
            <template slot-scope="scope">
                <span class="btn" title="编辑"
                    @click="handleUpdate(scope.row)">
                  <i class="iconfont icon-edit editicon"></i>
                </span>
                <span class="btn" title="停用"  v-if='scope.row.isDeleted == "N"'
                      @click="handelDelete(scope.row,'Y')">停用
                  <!--<i class="iconfont icon-shanchu delicon"></i>-->
                </span>
                <span class="btn" title="启用"  v-else
                      @click="handelDelete(scope.row,'N')">启用
                  <!--<i class="iconfont icon-shanchu delicon"></i>-->
                </span>                
                <!--<span class="btn" title="删除"
                    @click="handelDelete(scope.row)">
                  <i class="iconfont icon-shanchu delicon"></i>
                </span>           -->
            </template>
            </el-table-column>
        </el-table>
      </div>

      <!-- 分页组件 -->
      <ui-pagination :total="total" @change="getPages"></ui-pagination>

    </div>
    <!-- 新增/编辑 -->
    <el-dialog :title="titleMap[dialogStatus]"
               :visible.sync="menuDialogVisible"
               :close-on-click-modal='false'
               width="35%" class="my-dialog">
      <div class="dialog-content">
        <div class="ui-form">
          <el-form ref="menuForm" :rules="rules" label-width="100px" :model="menuForm" class='my-form'>
            <el-form-item label="栏目名称：" prop="menuName">
              <el-input v-model="menuForm.name"></el-input>
            </el-form-item>
            <el-form-item label="归属上级" prop="parentId">
              <select-column-tree v-model="menuForm.parentId" :treeData="treeData" @changePid="changePid"></select-column-tree>
              <span class="gray">若不选，则是一级栏目</span>
            </el-form-item>            
            <el-form-item label="编码：" prop="menuCode">
              <el-input v-model="menuForm.code" placeholder="小于64位英文字母与数字组合" @change="validateCheckMenuCode(false)" @blur="validateCheckMenuCode(true)"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="menuOrder">
              <el-input v-model="menuForm.orderNo" placeholder="排序号[非必填项,默认为1]"></el-input>
            </el-form-item>                       
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="handleClose" >取 消</el-button>
        <el-button type="primary" v-if="dialogStatus === 'create'"  @click="create()">提 交</el-button>
        <el-button type="primary" v-if="dialogStatus === 'update'" @click="update()">提 交</el-button>  
      </span>
    </el-dialog>

  </div>
</template>
<script>
import columnTree from 'components/treecomponents/columnTree.vue'// 栏目列表
import selectColumnTree from 'components/treecomponents/selectColumnTree.vue'// 选择上级栏目
export default {
  components: {
    columnTree,
    selectColumnTree
  },  
  data() {
    return {
      tableData: [], // 表格数据          
      listQuery: { 
        name: '',
        code:'',
        parentId:''
      },    
      menuForm: {
        id: '',
        name: '',
        code: '',
        parentId: '0',
        orderNo: '',
      },
      total: 0, // 列表总数   
      titleMap: {
        update: '修改栏目',
        create: '添加栏目'
      },
      dialogStatus: '',      
      menuDialogVisible: false,               
      loading: false,
      treeData: [], // 全部栏目
      isMenu: true, // 类型是否为栏目
      rules: {
        name: [{ required: true, message: '请输入栏目名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入栏目编码', trigger: 'blur' }]
      },
    }
  },
  created() {
    this.getList();
     // 初始获取数据
    // this.menuForm.parentId = [this.listQuery.parentId];
    // console.log("parentId："+this.menuForm.parentId)  
 
  },
  mounted() {

  },
  methods: {
    // 获取表格的数据
    getList() {
      this.$api.columnChildList(this.listQuery).then(response => {
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
    // 获取所有栏目数据
    getMenuList() {
      this.$api.columnListAll().then(response => {
        if (response.errorCode === '1') {
          this.treeData = response.data;
        }
      })
    },
    // 获取选中栏目的数据
    changePid(val) {
      // console.log("menuId："+ val.id)
      this.menuForm.parentId = val.id
    },
    // 获取点击的栏目父级id，更新右侧列表数据  
    getChannelId(data, node) { 
      this.listQuery.parentId = data.id
      this.menuForm.parentId = data.id
      this.getList(this.listQuery)
    },
    // 验证验证栏目或按钮编码是否存在
    validateCheckMenuCode(isChange) {
      if (this.menuForm.code) {
        if (!isChange) return
        this.$api.columnCheckCode({
          code: this.menuForm.code,
        }).then(response => {
          if (response.errorCode === '1') {
            this.$message.success('该栏目编码可以使用！')
          } else {
            this.$message.warning(response.resultMsg)
            return false
          }
        })
      }
    },      
    // 关闭弹窗
    handleClose() {
      this.menuDialogVisible = false
      this.$refs.menuForm.resetFields()
    },
    // 新增弹窗
    handleCreate() {
      this.dialogStatus = "create"
      this.menuDialogVisible = true
      this.getMenuList()
      this.$nextTick(_ => {
        this.$refs.menuForm.resetFields()
        this.menuForm['name'] = ''
        this.menuForm['code'] = ''
        this.menuForm['orderNo'] = '1'
        // this.menuForm['parentId'] = this.menuForm.parentId
        this.menuForm['parentId'] ==='0'?'0':this.menuForm.parentId
        console.log(this.menuForm.parentId)      
      })
    },    
    // 编辑弹窗
    handleUpdate(data) {
      this.dialogStatus = "update"
      this.menuDialogVisible = true
      this.getMenuList()
      this.$nextTick(_ => {
        this.$refs.menuForm.resetFields()
        this.menuForm.id = data.id
        this.menuForm.name = data.name
        this.menuForm.code = data.code
        this.menuForm.parentId = data.parentId
        this.menuForm.orderNo = data.orderNo
        console.log(this.menuForm.parentId)
      })
    },
    // 新增提交
    create() {
      this.$refs.menuForm.validate(valid => {
        if (valid) {
          delete this.menuForm.id
          this.$api.columnSubmit(this.menuForm).then(response => {
            if (response.errorCode === '1') {
              this.getList()
              this.$message.success("新建成功！")
              this.menuDialogVisible = false
            } else {
              this.$message.warning(response.resultMsg)
            }
          })
        } else {
          return false
        }
      })
    },
    // 编辑提交
    update(data) {
      this.$refs.menuForm.validate(valid => {
        if (valid) {
          this.$api.columnSubmit(this.menuForm).then(response => {
            if (response.errorCode === '1') {
              this.getList()
              this.$message.success('修改成功！')
              this.menuDialogVisible = false
            } else {
              this.$message.warning(response.resultMsg)
            }
          }).catch(error => {
            this.$message.error(error)
          })
        } else {
          return false
        }
      })
    },
    // 停用/启用提交
    deletemenu(data,val) {                 
        this.$api.columnDisableOrEnable({
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
          this.$message.error(error)
          return false
        })
    },
    // 停用/启用判断
    handelDelete(data,val) {
      if (data.isDeleted === 'N') {
        this.$confirm('确定要停用该栏目吗?', '提示', {
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
        this.$confirm('确定要恢复该栏目吗?', '提示', {
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
