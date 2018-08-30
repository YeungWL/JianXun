<template>
  <div class="page-content-body">
    <div class="page-header">
      <el-form class="search-form" :inline="true" :model="listQuery" ref="form" >
        <el-form-item label="字典名称：">
          <el-input v-model="listQuery.name" placeholder="字典名称" clearable @change="handleSearch"></el-input>
        </el-form-item>
        <el-form-item label="字典编码：">
          <el-input v-model="listQuery.bianma" placeholder="字典编码" clearable @change="handleSearch"></el-input>
        </el-form-item> 
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
        </el-form-item> 
      </el-form>      
    </div>

    <!--  table开始  -->
    <div class="page-main customTable">
      <el-table style="width:100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                :data="tableData">
        <el-table-column label="字典名称"
                         min-width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="字典编码"
                         min-width='100'
                         show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.bianma== null?'null':scope.row.bianma}}</template>
        </el-table-column>
        <el-table-column label="父级"
                         min-width='180'
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.parentId== null?'null':scope.row.parentId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序"
                         min-width='100'
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.ordyBy== null?'null':scope.row.ordyBy}}</span>
          </template>
        </el-table-column>
        <el-table-column label="级别"
                         min-width='40'
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.jb== null?'null':scope.row.jb}}</span>
          </template>
        </el-table-column>                 
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <span class="btn" title="编辑"  @click="handleUpdate(scope.row)">
              <i class="iconfont icon-edit editicon"></i>
            </span>
            <span class="btn" title="删除"  @click="getZidianDelete(scope.row,1)">
              <i class="iconfont icon-shanchu delicon"></i>
            </span>           
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <ui-pagination :total="total" @change="getPages"></ui-pagination>
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
        <el-button  @click="handleClose" >取消</el-button>
        <el-button type="primary" v-if="dialogStatus === 'create'"  @click="create()">新建</el-button>
        <el-button type="primary" v-if="dialogStatus === 'update'" @click="update()">修改</el-button>  
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'zidianment',  
  data() {
    return {
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
      roleMenuList: [],
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
          let listArr = []
          let data = response.data
          let len = data.length

          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            if (item.childList && item.childList.length != 0) {
              let childList = item.childList
              for (let j = 0; j < childList.length; j++) {
                data[len + j] = childList[j]
                listArr.push(childList[j])
              }
              len = data.length
            }
          }
          // console.log(listArr)
          this.tableData = listArr
          this.total = response.totalRecords
          this.groupList = response.data //添加，编辑选择父级数据
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
      this.$refs.zidianForm.responseetFields()
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
        this.zidianForm.name = data.name
        this.zidianForm.bianma = data.bianma
        this.zidianForm.parentId = data.parentId
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
    delZidian(data,val) {   
        this.$api.delZidian({           
            roleId: data.zdId
        }).then(response => {
          if (response.errorCode === '1') {
            this.$message.success('操作成功')
            this.getList()
          }
        })
        .catch(error => {
          this.$message.error(error)
          return false
        })
    },
    // 删除/启用判断
    getZidianDelete(data,val) {
      // console.log(val)
      if (val.status == 0) {
        this.$confirm('确定要删除该字典吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.delZidian(data,val)
        })
        .catch(() => {
          this.$message.warning('操作取消')
          return false
        })
      } else {
        this.$confirm('确定要恢复该字典吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.delZidian(data,val)
        })
        .catch(() => {
          this.$message.warning('操作取消')
          return false
        })
      }
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