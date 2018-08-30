<template>
  <div class="page-content-body">
    <div class="page-header">
      <el-form class="search-form" :inline="true" :model="listQuery" ref="form" >
        <el-form-item label="角色名称：">
          <el-input v-model="listQuery.roleName" placeholder="角色名称" clearable @change="handleSearch"></el-input>
        </el-form-item>
        <el-form-item label="角色编码：">
          <el-input v-model="listQuery.code" placeholder="角色编码" clearable @change="handleSearch"></el-input>
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
        <el-table-column label="角色名称"
                         min-width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.roleName}}</template>
        </el-table-column>
        <el-table-column label="角色编码"
                         min-width='100'
                         show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.code== null?'null':scope.row.code}}</template>
        </el-table-column>
        <el-table-column label="描述"
                         min-width='100'
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.description== null?'null':scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序"
                         min-width='100'
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.orderNo== null?'null':scope.row.orderNo}}</span>
          </template>
        </el-table-column>        
        <el-table-column label="状态"
                         min-width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
              <span v-if='scope.row.status == 0' class="green">可用</span> 
              <span v-else class="gray">停用</span>        
          </template>
        </el-table-column>
        <el-table-column label="创建时间"
                         min-width="200"
                         show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.createTime== null?'null':scope.row.createTime}}</template>
        </el-table-column> 
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <span class="btn" title="编辑"
                  @click="handleUpdate(scope.row)">
              <i class="iconfont icon-edit editicon"></i>
            </span>
            <span class="btn" title="停用"  v-if='scope.row.status == 0'
                  @click="getRoleDelete(scope.row)">停用
              <!--<i class="iconfont icon-shanchu delicon"></i>-->
            </span>
            <span class="btn" title="启用"  v-else
                  @click="getRoleDelete(scope.row)">启用
              <!--<i class="iconfont icon-shanchu delicon"></i>-->
            </span>            
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <ui-pagination :total="total" @change="getPages"></ui-pagination>
    <!-- 新增 -->
    <el-dialog :title="titleMap[dialogStatus]"
               :visible.sync="roleDialogVisible"
               :close-on-click-modal='false'
               width="50%" class="my-dialog">
      <div class="dialog-content">
        <div class="ui-form">
          <el-form ref="roleForm" :rules="rules" label-width="100px" :model="roleForm" class='my-form flex-form'>
            <el-form-item label="角色名称" class="flex-50" prop="roleName">
              <el-input v-model="roleForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色编码" class="flex-50" prop="code">
              <el-input v-model="roleForm.code"  @blur="validateCheckRoleCode(false)" @change="validateCheckRoleCode(true)"></el-input>
            </el-form-item>
            <el-form-item label="备注" class="flex-50" prop="description">
              <el-input type="textarea" v-model="roleForm.description"></el-input>
            </el-form-item>
            <el-form-item label="排序号" class="flex-50" prop="orderNo">
              <el-input v-model="roleForm.orderNo"></el-input>
            </el-form-item>            
            <el-form-item label="绑定菜单" class="flex-100" prop="menuIdJson">
              <check-menu-tree @checked="getCheckedNodes"></check-menu-tree>
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

    <!-- 编辑 -->
    <!--<el-dialog title="修改"
               :visible.sync="redactRoleDialog"
               width="620px"
               top="10vh"
               :close-on-click-modal='false'
               class="newRole">
      <el-form ref="roleAddform"
               label-width="80px"
               :rules ='roleRules'
               :model="newEditData"
               class='addrole'>
        <el-form-item label="角色名称" prop="name">
          <el-input class="el-input-text-style"
                    v-model="newEditData.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="value">
          <el-input class="el-input-text-style"
                    v-model="newEditData.value"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input class="el-input-text-style"
                    v-model="newEditData.description"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="success" @click="redactRoleSubmit('roleAddform')">提交</el-button>
      </span>
    </el-dialog>-->

  </div>
</template>

<script>
import checkMenuTree from 'components/treecomponents/checkMenuTree.vue'// 勾选菜单列表
export default {
  name: 'rolement',  
  components: {
    checkMenuTree
  },  
  data() {
    return {
      tableData: [],
      listQuery: {   
        roleName: '',
        code: '',
        status: '',     
        currentPage: 1,   
        pageSize: 10
      }, 
      roleForm: {
        roleName:'',
        code:'',
        description:'',
        orderNo:'',
        menuIdJson:''
      },         
      total: 0,
      titleMap: {
        update: '修改信息',
        create: '新增角色'
      },
      dialogStatus: '',      
      roleDialogVisible: false,            
      // 角色id
      roleId: '',
      roleMenuList: [],
      multipleSelection: [],
      labalList: [], //全部属性
      loading: false,
      rules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur', pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '允许中文、英文字母、数字！'}],
        code: [{ required: true, message: '请输入角色编码', trigger: 'blur'}],
        menuIdJson: [{ required: true, message: '请选择菜单', trigger: 'blur' }]
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
      this.$api.roleList(this.listQuery).then(response => {
        this.loading = false
        if (response.errorCode === '1') {
          this.tableData = response.data
          this.total = response.totalRecords
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
    getRole(data) {
      this.$api.getRole({roleId: data.roleId}).then(response =>{
        if (response.errorCode === '1') {
          this.roleMenuList = response.data
          // console.log(response.data)
        } else {
          this.$message.warning(response.resultMsg)
        }        
      })
    },
		// 获取勾选状态的数据，提交给后台
    getIds(labalList = this.labalList, ids = []) {
      labalList.forEach((item, i) => {
        if(item.isSelected) {
          ids.push(item.id);
          if(item.children && item.children.length > 0) {
            this.getIds(item.children, ids)
          }
        }

      })
      return ids;
    },
    getCheckedNodes(data, checked, indeterminate) {
      let userId = this.multipleSelection.map(data => {
        return data.menuId;
      });
      console.log(userId.join(","))
       const menuIdArr = []
       for (let i in data) {
          let menuObj = {}
          menuObj.menuId = data.id
          menuObj.menuName = data.name
          menuIdArr.push(menuObj)
        
        } 
  console.log(menuIdArr)
    },
    // getCheckedNodes(data) {
    //    console.log(this.$refs.tree.getCheckedNodes(data));
    // },  
    // handleCheckChange(data, checked, node) { // 获取菜单树点击
    //   let menuIdArr = []
    //   data.forEach((item, index) => {
    //     let obj = {}
    //     obj.lable = item.lable
    //     obj.menuName = item.value
    //     this.menuIdArr.push(obj)
    //     console.log(obj)
    //   })
    //   console.log(data.id, checked)
    // },    
    // 搜索按钮
    handleSearch() {
      this.getList()
    },
    // 关闭弹窗
    handleClose() {
      this.roleDialogVisible = false
      this.$refs.roleForm.responseetFields()
    },
    // 新增弹窗
    handleCreate() {
      this.dialogStatus = "create"
      this.roleDialogVisible = true
      this.$nextTick(_ => {
        this.$refs.roleForm.resetFields()
        this.roleForm['roleName'] = ''
        this.roleForm['code'] = ''
        this.roleForm['description'] = ''
        this.roleForm['orderNo'] = ''
        this.roleForm['menuIdJson'] = ''       
      })  
    },    
    // 编辑弹窗
    handleUpdate(data) {
      this.dialogStatus = 'update'
      this.roleDialogVisible = true
      this.getRole(data) // 获取角色信息，包含绑定的菜单权限
      this.$nextTick(_ => {
        this.$refs.roleForm.resetFields()
        this.roleForm.roleName = data.roleName
        this.roleForm.code = data.code
        this.roleForm.description = data.description
        this.roleForm.menuIdJson = data.menuIdJson
        this.roleForm.orderNo = data.orderNo        
        this.roleId = data.roleId
      })
    },
    // 验证角色编码唯一性
    validateCheckRoleCode(isChange) {
      if (this.roleForm.code) {
        if (!isChange) return
        this.$api.checkRoleCode({
          code: this.roleForm.code,
          roleId: ''
        }).then(response => {
          if (response.errorCode === '1') {
            this.$message.success('该角色编码可以使用！')
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
      this.roleForm.menuIdJson =  this.handleCheckChange()
      console.log(  this.roleForm.menuIdJson)
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.$api.addRole(this.roleForm).then(response => {
            if (response.errorCode === '1') {
              this.getList()
              this.$message.success('新建成功！')
              this.roleDialogVisible = false
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
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.$api.updateRole(this.roleForm).then(response => {
            if (response.errorCode === '1') {
              this.getList()
              this.$message.success('修改成功！')
              this.roleDialogVisible = false
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
    deleteRole(val) {
        this.$api.delRole({           
            roleId: val.roleId,
            status: val.status 
        }).then(response => {
          if (response.errorCode === '1') {
            this.$message.success('操作成功')
            this.getList()
          }
        })
        .catch(err => {
          this.$message.error('角色已被其他信息关联，请删除关联后再停用角色')
          return false
        })
    },
    // 停用/启用判断
    getRoleDelete(val) {
      // console.log(val)
      if (val.status == 0) {
        this.$confirm('确定要停用该角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.deleteRole(val)
        })
        .catch(() => {
          this.$message.warning('操作取消')
          return false
        })
      } else {
        this.$confirm('确定要恢复该角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.deleteRole(val)
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

.newRole .addrole .el-form-item {
  margin-left: 5px;
}
</style>