<template>
  <div class="page-content-body">
    <div class="page-header clearfix">
      <el-form class="search-form" :inline="true" :model="listQuery" ref="form" >
        <el-form-item label="角色名称：">
          <el-input v-model="listQuery.roleName" placeholder="角色名称" clearable @change="handleSearch"></el-input>
        </el-form-item>
        <el-form-item label="角色编码：">
          <el-input v-model="listQuery.code" placeholder="角色编码" clearable @change="handleSearch"></el-input>
        </el-form-item> 
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-form-item>
        <div class="btn-group fr">
          <el-button type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
        </div> 
      </el-form>      
    </div>

    <!--  table开始  -->
    <div class="page-main customTable">
      <el-table style="width:100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                :data="tableData">
        <el-table-column label="角色名称"
                         min-width="120"
                         show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.roleName}}</template>
        </el-table-column>
        <el-table-column label="角色编码"
                         min-width='120'
                         show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.code== null?'null':scope.row.code}}</template>
        </el-table-column>
        <el-table-column label="描述"
                         min-width='120'
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.description== null?'null':scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序"
                         min-width='100'
                         show-overflow-tooltip prop="orderNo" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.orderNo== null?'null':scope.row.orderNo}}</span>
          </template>
        </el-table-column>        
        <el-table-column label="状态"
                         min-width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
              <span v-if='scope.row.status == 0' class="green">启用</span> 
              <span v-else class="gray">停用</span>        
          </template>
        </el-table-column>
        <el-table-column label="创建时间"
                         min-width="150"
                         show-overflow-tooltip >
          <template slot-scope="scope">{{scope.row.createTime== null?'null':scope.row.createTime}}</template>
        </el-table-column> 
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <span class="btn" title="编辑"
                  @click="handleUpdate(scope.row)">
              <i class="iconfont icon-edit icongreen"></i>
            </span>
            <span class="btn" title="停用"  v-if='scope.row.status == 0'
                  @click="getRoleDelete(scope.row,1)"><i class="iconfont icon-tingyong iconred"></i>
            </span>
            <span class="btn" title="启用"  v-else
                  @click="getRoleDelete(scope.row,0)">
              <i class="iconfont icon-qiyong iconblue"></i>
            </span>            
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <ui-pagination :total="total" @change="getPages"></ui-pagination>
    <!-- 新增/编辑 -->
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
             <div class="tree"> 
               <el-tree :data="treeData" :props='defaultProps'  node-key="menuId" show-checkbox ref="tree"  @check-change="handleCheckChange" :default-checked-keys="resourceCheckedKey"></el-tree>
             </div>
             <!--<el-button @click="getMenuIdArr">测试</el-button>-->
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
export default {
  name: 'rolement',  
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
        roleId: '',
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
      roleMenuList: [],
	   	treeData: [],// 所有结构树数据
      resourceCheckedKey: [], // 通过接口获取的需要默认展示的数组 [1,3,15,18,...]      
			defaultProps: {			
				children: 'childList',
				label: 'menuName',
        id: 'menuId'
			},
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
          // 获取角色权限数据，设置节点勾选
          if(data){
            let data = response.data[0].roleMenuList
            let menuIdArr = []
            for ( let i in data) {
              // console.log(data[i].menuId)
              menuIdArr.push(data[i].menuId)
            }
            this.$refs.tree.setCheckedKeys(menuIdArr)
          }
        } else {
          this.$message.warning(response.resultMsg)
        }        
      })
    },
    // 获取所有权限
    getMenuList() {
      let params = {   
        menuName: '',
        menuCode:'',
        parentId: '',
        isLeaf: '2' 
      }
      this.$api.menuList(params).then(res => {
        this.treeData = res.data;
        console.log(this.treeData)

      const handleUpdateCheckds = (tree, checkeds, isAdd = true, checkKey = 'no') => {
          let findHalfCheckds = (item, checkeds, result = new Set()) => {
              if (item.children) {
                  let node = [...item.children];
                  while (node.length) {
                      let data = node.shift();
                      if (!item.isRoot) {
                          if (isAdd && checkeds.includes(data[checkKey] || data) && !checkeds.includes(item[checkKey] || item)) {
                              result.add(item[checkKey] || item);
                          } else if (!isAdd && !checkeds.includes(data[checkKey] || data) && checkeds.includes(item[checkKey] || item)) {
                              result.add(item[checkKey] || item);
                          }
                      }
                      if (data.children && data.children.length > 0) {
                          node = node.concat(data.children);
                      }
                      findHalfCheckds(data, checkeds, result);
                  }
              }
              return result;
          };
          let result,
              halfCheckds = [...findHalfCheckds({
                  isRoot: true,
                  children: tree
              }, checkeds)];
          if (isAdd) {  //
              result = [...new Set(checkeds.concat(halfCheckds))];
          } else {
              result = checkeds.filter(item => !halfCheckds.includes(item));
          }
          //console.log(halfCheckds);
  
          return result;
        }; 
      })
    },  
    // 把勾选的数据，转成后台需要的格式
    getMenuIdArr() {
      const menuIdArr = []
      this.getCheckedNodes().forEach((item, index) => {
        let menuObj = {}
        menuObj.menuId = item.menuId
        // menuObj.menuName = item.menuName
        menuIdArr.push(menuObj)
        // console.log(menuIdArr)
      })
      
      this.getHalfCheckedKeys().forEach((item, index) => {
        let menuObj = {}
        menuObj.menuId = item
        // menuObj.menuName = item.menuName
        menuIdArr.push(menuObj)
        console.log(menuIdArr)
      })
      return menuIdArr
    },
    // 获取勾选数据
    getCheckedNodes() {
       return  this.$refs.tree.getCheckedNodes()
    },
    // 获取半选中的节点所组成的数组
    getHalfCheckedKeys() {
       return  this.$refs.tree.getHalfCheckedKeys()
    },
    handleCheckChange(data, checked, indeterminate) {
        this.getCheckedNodes()
        this.getHalfCheckedKeys()
        // console.log(this.getCheckedNodes())
        // console.log(this.getHalfCheckedKeys())
    },
    // 搜索按钮
    handleSearch() {
      this.getList()
    },
    // 关闭弹窗
    handleClose() {
      this.roleDialogVisible = false
      this.$refs.roleForm.resetFields()
    },
    // 新增弹窗
    handleCreate() {
      this.dialogStatus = "create"
      this.roleDialogVisible = true
    	this.getMenuList()
      this.$refs.tree.setCheckedKeys([''])
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
      this.getMenuList()
      this.$nextTick(_ => {
        this.getRole(data) // 获取角色信息，包含绑定的菜单权限
        this.$refs.roleForm.resetFields()
        this.roleForm.roleId = data.roleId
        this.roleForm.roleName = data.roleName
        this.roleForm.code = data.code
        this.roleForm.description = data.description
        // this.roleForm.menuIdJson = data.roleMenuList
        this.roleForm.orderNo = data.orderNo 
        // console.log(data.roleMenuList)
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
      delete this.roleForm.roleId  
      let menuIdJson = JSON.stringify({'menuIdArr': this.getMenuIdArr()})
      this.roleForm.menuIdJson = menuIdJson 
     
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
      let menuIdJson = JSON.stringify({'menuIdArr': this.getMenuIdArr()})
      this.roleForm.menuIdJson = menuIdJson  
       console.log(menuIdJson)   
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
    deleteRole(data,val) {   
        this.$api.delRole({           
            roleId: data.roleId,
            status: val 
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
    // 停用/启用判断
    getRoleDelete(data,val) {
      // console.log(val)
      if (val.status == 0) {
        this.$confirm('确定要停用该角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.deleteRole(data,val)
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
          this.deleteRole(data,val)
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