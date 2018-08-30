<template>
  <div class="page-content-body">
    <div class="page-header clearfix">
      <el-form class="search-form" :inline="true" :model="listQuery" ref="form" >
        <el-form-item label="字典名称：">
          <el-input v-model="listQuery.name" placeholder="字典名称" clearable @change="handleSearch"></el-input>
        </el-form-item>
        <el-form-item label="字典编码：">
          <el-input v-model="listQuery.bianma" placeholder="字典编码" clearable @change="handleSearch"></el-input>
        </el-form-item> 
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-form-item>
        <div class="btn-group fr">
          <el-button type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
        </div>            
      </el-form>      
    </div>

    <!--  treetable 表格-->
    <div class="page-main customTable">
      <tree-grid :columns="columns"
                 :tree-structure="true"
                 :data-source="tableData"
                 v-on:openEdit="handleUpdate"
                 v-on:delList="handleZidianDelete"></tree-grid>

    </div>

    <!-- 分页组件 -->
    <!--<ui-pagination :total="total" @change="getPages"></ui-pagination>-->
    <!-- 新增/编辑 -->
    <el-dialog :title="titleMap[dialogStatus]"
               :visible.sync="zidianDialogVisible"
               :close-on-click-modal='false'
               width="30%" class="my-dialog">
      <div class="dialog-content">
        <div class="ui-form">
          <el-form ref="zidianForm" :rules="rules" label-width="100px" :model="zidianForm" class='my-form'>
            <el-form-item label="字典名称" prop="name">
              <el-input v-model="zidianForm.name"></el-input>
            </el-form-item>
            <el-form-item label="字典编码" prop="bianma">
              <el-input v-model="zidianForm.bianma"  @blur="validateCheckZidianCode(false)" @change="validateCheckZidianCode(true)"></el-input>
            </el-form-item>
            <el-form-item label="归属父级" prop="parentId">
              <el-select placeholder="请选择" v-model="zidianForm.parentId" clearable>
                <el-option v-for="group in groupList" :key="group.key" :label="group.name" :value="group.zdId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="父子编码" prop="pBm">
              <el-input v-model="zidianForm.pBm"></el-input>
            </el-form-item>            
            <el-form-item label="排序号" prop="ordyBy">
              <el-input v-model="zidianForm.ordyBy"></el-input>
            </el-form-item>            
            <el-form-item label="级别" prop="jb">
              <el-input v-model="zidianForm.jb"></el-input>
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
import TreeGrid from 'components/treeTable/treeGrid'
export default {
  components: {
    TreeGrid
  },  
  name: 'zidianment',  
  data() {
    return {
      columns: [
        {
          text: '字典名称',
          dataIndex: 'name'
        },
        {
          text: '字典编码',
          dataIndex: 'bianma'
        },
        {
          text: '父级',
          dataIndex: 'parentName'
        },
        {
          text: '排序',
          dataIndex: 'ordyBy'
        }
      ],  
      tableData: [],
      listQuery: {   
        name: '',
        bianma: '',
        parentId: '',     
        currentPage: 1,   
        pageSize: 10
      }, 
      groupList: [],
      zidianForm: {
        zdId:'',
        name: '',
        bianma:'',
        parentId:'',
        pBm:'',
        ordyBy:'',
        jb:''
      },         
      total: 0,
      titleMap: {
        update: '修改信息',
        create: '新增字典'
      },
      dialogStatus: '',      
      zidianDialogVisible: false,            
      loading: false,
      rules: {
        name: [{ required: true, message: '请输入字典名称', trigger: 'blur', pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '允许中文、英文字母、数字！'}],
        bianma: [{ required: true, message: '请输入字典编码', trigger: 'blur'}]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取表格的数据
    getList() {
      this.loading = true
      this.$api.zidianList(this.listQuery).then(response => {
        this.loading = false
        if (response.errorCode === '1') {
          this.tableData = response.data
          // this.total = response.totalRecords
          this.groupList = response.data // 添加，编辑选择父级数据
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
    },
    // 关闭弹窗
    handleClose() {
      this.zidianDialogVisible = false
      this.$refs.zidianForm.resetFields()
    },
    // 新增弹窗
    handleCreate() {
      this.dialogStatus = "create"
      this.zidianDialogVisible = true
      this.$nextTick(_ => {
        this.$refs.zidianForm.resetFields()
        this.zidianForm['name'] = ''
        this.zidianForm['bianma'] = ''
        this.zidianForm['parentId'] = ''
        this.zidianForm['pBm'] = 'bianma'
        this.zidianForm['ordyBy'] = '1'
        this.zidianForm['jb'] = '1'       
      })  
    },    
    // 编辑弹窗
    handleUpdate(data) {
      this.dialogStatus = 'update'
      this.zidianDialogVisible = true
      this.$nextTick(_ => {
        this.$refs.zidianForm.resetFields()
        this.zidianForm.zdId = data.zdId
        this.zidianForm.name = data.name
        this.zidianForm.bianma = data.bianma
        this.zidianForm.parentId = data.parentId
        this.zidianForm.ordyBy = data.ordyBy
        this.zidianForm.jb = data.jb 
      })
    },
    // 验证编码唯一性
    validateCheckZidianCode(isChange) {
      if (this.zidianForm.bianma) {
        if (!isChange) return
        this.$api.checkZidianCode({
          bianma: this.zidianForm.bianma,
          zdId: ''
        }).then(response => {
          if (response.errorCode === '1') {
            this.$message.success('该字典编码可以使用！')
            return true
          } else {
            this.$message.warning(response.resultMsg)
            return false
          }
        })
      }
    },     
    // 新增提交
    create() {
      delete this.zidianForm.zdId  
      this.$refs.zidianForm.validate(valid => {
        if (valid) {
          this.$api.addZidian(this.zidianForm).then(response => {
            if (response.errorCode === '1') {
              this.getList()
              this.$message.success('新建成功！')
              this.zidianDialogVisible = false
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
      this.$refs.zidianForm.validate(valid => {
        if (valid) {
          this.$api.updateZidian(this.zidianForm).then(response => {
            if (response.errorCode === '1') {
              this.getList()
              this.$message.success('修改成功！')
              this.zidianDialogVisible = false
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
    // 删除/启用提交
    delZidian(data) {   
        this.$api.delZidian({           
            zdId: data.zdId
        }).then(response => {
          if (response.errorCode === '1') {
            this.$message.success('操作成功')
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
    // 删除
    handleZidianDelete(data = []) {
        this.$confirm('确定要删除该字典吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.delZidian(data)
        })
        .catch(() => {
          this.$message.warning('操作取消')
          return false
        })
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