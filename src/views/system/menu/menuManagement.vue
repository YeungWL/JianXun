<template>
  <div class="page-content-body clealfix">
   <!-- 树组件 -->
    <menu-tree @change="getChannelId"  :copy="true" ></menu-tree>
    <div class="content-right">
      <div class="page-header clearfix">
        <el-form class="search-form" :inline="true" :model="listQuery" ref="form" >
            <el-form-item label="菜单名称：">
              <el-input v-model="listQuery.menuName" placeholder="请输入菜单名称" clearable @change="handleSearch"></el-input>
            </el-form-item>
            <el-form-item label="菜单编码：">
              <el-input v-model="listQuery.menuCode" placeholder="请输入菜单编码" clearable @change="handleSearch"></el-input>
            </el-form-item>            
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </el-form-item>
            <div class="btn-group fr">
              <el-button type="primary" icon="el-icon-plus" @click="handleCreate(1)">添加菜单</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="handleCreate(2)">添加页面</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="handleCreate(3)">添加按钮</el-button>          
            </div>
            <!--<el-form-item label="归属上级" prop="nickname">
              <root-tree style="float:left;" :treeData="treeData" @changePid="changePid"></root-tree>

            </el-form-item>            -->
        </el-form>      
      </div>

      <!--  table开始  -->
      <div class="customTable">
        <el-table style="width:100%"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    :data="tableData">
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column label="菜单名称"
                            min-width="100"
                            show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.menuName}}</template>
            </el-table-column>
            <el-table-column label="类型"
                            min-width='80'
                            show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if='scope.row.menuType == 1'>菜单</span>
              <span v-else-if='scope.row.menuType == 2'>页面</span>  
              <span v-else>按钮</span>  
            </template>
            </el-table-column>
            <el-table-column label="地址"
                            min-width='200'
                            show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{scope.row.menuUrl== null?'null':scope.row.menuUrl}}</span>
            </template>
            </el-table-column>
            <el-table-column label="编码"
                            min-width="120"
                            show-overflow-tooltip>
            <template slot-scope="scope">
               <span>{{scope.row.menuCode== null?'null':scope.row.menuCode}}</span>       
            </template>
            </el-table-column>
            <el-table-column label="排序"
                            min-width="80"
                            show-overflow-tooltip prop="menuOrder" sortable>
            <template slot-scope="scope">{{scope.row.menuOrder== null?'null':scope.row.menuOrder}}</template>
            </el-table-column> 
            <el-table-column label="状态"
                            min-width="80"
                            show-overflow-tooltip>
              <template slot-scope="scope">
                  <span v-if='scope.row.isDeleted == "N"' class="green">可用</span> 
                  <span v-else class="gray">停用</span>        
              </template>
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
            <el-form-item label="菜单名称：" prop="menuName">
              <el-input v-model="menuForm.menuName"></el-input>
            </el-form-item>
            <el-form-item label="归属上级" prop="parentId">
              <root-tree v-model="menuForm.parentId" :treeData="treeData" @changePid="changePid"></root-tree>
              <span class="gray">若不选，则是一级菜单</span>
            </el-form-item>            
            <el-form-item label="编码：" prop="menuCode">
              <el-input v-model="menuForm.menuCode" @change="validateCheckMenuCode(false)" @blur="validateCheckMenuCode(true)"></el-input>
            </el-form-item>
            <el-form-item label="url：" prop="menuUrl">
              <el-input v-model="menuForm.menuUrl"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="menuOrder">
              <el-input v-model="menuForm.menuOrder" placeholder="排序号[非必填项,默认为1]"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="menuType">
              <el-radio-group v-model="menuForm.menuType">
                <el-radio :label="1">菜单</el-radio>
                <el-radio :label="2">页面</el-radio>
                <el-radio :label="3">按钮</el-radio>
              </el-radio-group>
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
import menuTree from 'components/treecomponents/menuTree.vue'// 菜单列表
import rootTree from 'components/treecomponents/rootTree.vue'// 选择上级菜单
export default {
  components: {
    menuTree,
    rootTree
  },  
  data() {
    return {
      tableData: [], // 表格数据          
      listQuery: { 
        menuName: '',
        menuCode:'',
        parentId:'',
        isLeaf:'',   
        currentPage: 1,
        pageSize: 10,
      },    
      menuForm: {
        menuId: '',
        menuName: '',
        menuCode: '',
        parentId: '0',
        menuUrl: '',
        menuType: '1',
        menuOrder: '1', 
        isLeaf: '2'       
      },
      total: 0, // 列表总数   
      titleMap: {
        update: '修改信息',
        create: '添加'
      },
      dialogStatus: '',      
      menuDialogVisible: false,               
      loading: false,
      treeData: [], // 全部菜单
      isMenu: true, // 类型是否为菜单
      rules: {
        menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        menuCode: [{ required: true, message: '请输入菜单编码', trigger: 'blur' }],
        menuUrl: [{ required: true, message: '请输入请求地址', trigger: 'blur' }],
        menuType: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }]             
      },
      // menuAuthorityList:[],
      // addmenuStatus:true,
      // updatemenuStatus:true,
      // deletemenuStatus:true,
      // addDeviceUserStatus:true,
      // updatePasswordStatus:true,
      // deleteDeviceUserStatus:true
    }
  },
  created() {
    this.getList();
     // 初始获取数据
    this.menuForm.parentId = [this.listQuery.parentId];   
    // console.log("parentId："+this.menuForm.parentId)  
 
  },
  mounted() {
    //权限设置
    // this.menuAuthorityList=this.$getLastChildrenMenu('menuManagement'); 
    // // console.log(this.menuAuthorityList); 
    //  for(let i=0;i<this.menuAuthorityList.length;i++){
    //   // console.log(this.menuAuthorityList[i].name);
    //   switch(this.menuAuthorityList[i].name){
    //     case '添加':
    //       this.addmenuStatus=this.menuAuthorityList[i].status;
    //       break;
    //     case '修改':
    //       this.updatemenuStatus=this.menuAuthorityList[i].status;
    //       break;
    //     case '删除':
    //       this.deletemenuStatus=this.menuAuthorityList[i].status;
    //       break;
    //     default: ;
    //   }
    // }  

  },
  methods: {
    // 获取表格的数据
    getList() {
      this.$api.menuList(this.listQuery).then(response => {
        if (response.errorCode === '1') {
          this.tableData = response.data
          this.total = response.totalRecords
          console.log(this.tableData)
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
    // 获取所有权限
    getMenuList() {
      let params = {   
        menuName: '',
        menuCode:'',
        parentId: '',
        isLeaf: '2' 
      }
      this.$api.menuList(params).then(response => {
        this.treeData = response.data;
      })
    },
    // 获取选中菜单的数据
    changePid(val) {
      // console.log("menuId："+ val.menuId)
      this.menuForm.parentId = val.menuId
    },
    // 获取点击的菜单父级id，更新右侧列表数据  
    getChannelId(data, node) { 
      this.listQuery.parentId = data.id
      this.menuForm.parentId = data.id
      this.getList(this.listQuery)
    },
    // 验证验证菜单或按钮编码是否存在
    validateCheckMenuCode(isChange) {
      if (this.menuForm.menuCode) {
        if (!isChange) return
        this.$api.checkMenuCode({
          menuCode: this.menuForm.menuCode,
          menuId: ''
        }).then(response => {
          if (response.errorCode === '1') {
            this.$message.success('该菜单编码可以使用！')
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
    handleCreate(menuType) {
      this.dialogStatus = "create"
      this.menuDialogVisible = true
      this.getMenuList()
      this.$nextTick(_ => {
        this.$refs.menuForm.resetFields()
        this.menuForm['menuName'] = ''
        this.menuForm['menuCode'] = ''
        this.menuForm['menuUrl'] = ''
        this.menuForm['menuType'] = menuType
        this.menuForm['menuOrder'] = '1'  
        // this.menuForm['parentId'] = this.menuForm.parentId
        this.menuForm['parentId'] ==='0'?'0':this.menuForm.parentId
        if ( menuType === '3') {
          this.menuForm['isLeaf'] = '1' 
        } else {
          this.menuForm['isLeaf'] = '2'    
        }
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
        this.menuForm.menuId = data.menuId
        this.menuForm.menuName = data.menuName
        this.menuForm.menuCode = data.menuCode
        this.menuForm.parentId = data.parentId
        this.menuForm.menuUrl = data.menuUrl
        this.menuForm.menuOrder = data.menuOrder 
        this.menuForm.isLeaf = data.isLeaf
        console.log(this.menuForm.parentId)
        // 菜单类型直接赋值没选中效果需加判断  
        if (data.menuType === '1') {
          this.menuForm.menuType = 1
        } else if (data.menuType === '2') {
          this.menuForm.menuType = 2
        } else {
          this.menuForm.menuType = 3
        }
      })
    },
    // 新增提交
    create() {
      this.$refs.menuForm.validate(valid => {
        if (valid) {
          delete this.menuForm.menuId
          this.$api.addMenu(this.menuForm).then(response => {
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
          this.$api.updateMenu(this.menuForm).then(response => {
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
      if (val.isDeleted == 'N') {
        this.$confirm('确定要停用该菜单吗?', '提示', {
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
        this.$confirm('确定要恢复该菜单吗?', '提示', {
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