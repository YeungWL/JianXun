﻿<template>
  <div class="page-content-body">
      <div class="page-header clearfix">
        <el-form class="search-form" :inline="true" :model="listQuery" ref="form"  v-show="searchUserStatus">
          <el-form-item label="账号：">
            <el-input v-model="listQuery.username" @change="handleSearch" clearable></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="listQuery.name" @change="handleSearch" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model="listQuery.phone" @change="handleSearch" clearable></el-input>
          </el-form-item>            
          <el-form-item>
            <el-button type="primary"  icon="el-icon-search" @click="handleSearch">查询</el-button>
          </el-form-item>
          <div class="btn-group fr">
            <el-button type="primary" icon="el-icon-plus" @click="handleCreate" v-show="addUserStatus">新增</el-button>
          </div> 
        </el-form>
      </div>
      <!--  table开始  -->
      <div class="page-main customTable">
        <el-table ref="multipleTable" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中"
          :data="tableData"  key="ArcDataArr">
          <el-table-column type="index" label="ID" width="50" align="center"></el-table-column>
          <el-table-column prop="username" label="账号" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="姓名" min-width="80"></el-table-column>
          <el-table-column prop="phone" label="手机号码" min-width="100"></el-table-column>
          <el-table-column prop="roleName" label="归属角色" min-width="100"></el-table-column>            
          <el-table-column prop="userType" label="用户类型" min-width="100" show-overflow-tooltip>
            <div slot-scope="scope">
              <span v-if='scope.row.userType == 0'>超级管理员</span> 
              <span v-else-if='scope.row.userType == 1'>普通用户</span> 
              <span v-else>管理</span> 
            </div>            
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="80">
            <div slot-scope="scope">
              <span v-if='scope.row.status == 0' class="green">激活</span> 
              <span v-else-if='scope.row.status == 1' class="gray">停用</span> 
              <span v-else class="red">冻结</span> 
            </div>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="150" sortable></el-table-column>
          <el-table-column label="操作" min-width="120">
            <template slot-scope="scope">              
              <span class="btn" title="编辑" @click="handleUpdate(scope.row)" v-show="updateUserStatus"><i class="iconfont icon-edit icongreen"></i></span>
              <span  v-if='scope.row.status == 0'>
                <span class="btn" @click="getUserDelete(scope.row,1)" v-show="outageUserStatus" title="停用"><i class="iconfont icon-tingyong iconred"></i></span>
                <span class="btn" @click="getUserDelete(scope.row,2)" v-show="freezeUserStatus"  title="冻结"><i class="iconfont icon-dongjie iconblue"></i></span> 
              </span>
              <span class="btn" v-else-if='scope.row.status == 1' @click="getUserDelete(scope.row,0)" v-show="activateUserStatus" title="激活"><i class="iconfont icon-jihuo icongreen"></i></span>
              <span class="btn" v-else @click="getUserDelete(scope.row,0)" v-show="activateUserStatus" title="激活"><i class="iconfont icon-jihuo icongreen"></i></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页组件 -->
      <ui-pagination :total="total" @change="getPages"></ui-pagination>

      <!-- 弹框 添加用户-->
      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="userDialogVisible" width="35%" class="my-dialog">
        <div class="dialog-content">
          <div class="ui-form">
            <el-form ref="userForm" :model="userForm" label-width="80px">
              <el-form-item label="用户名"  prop="username" :rules="rules.username">
                <el-input v-model="userForm.username" :disabled="dialogStatus === 'update'" auto-complete="off" @blur="validateCheckUserUnique(false)" @change="validateCheckUserUnique(true)" ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" v-if="dialogStatus === 'create'" :rules="dialogStatus === 'create'?[{ required: true, message: '请输入密码', trigger: 'blur', pattern: /^[a-zA-Z0-9]{8,20}$/, message: '8-20位字符，允许英文字母、数字！'}]:rules.password">
                <el-input type="password" v-model="userForm.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="修改密码" prop="changePass" v-if="dialogStatus === 'update'">
                <el-switch v-model="changePass"></el-switch>
              </el-form-item>
              <div v-if="changePass">
                <el-form-item label="密码" prop="password" :rules="rules.password">
                  <el-input type="password" v-model="userForm.password" auto-complete="off" ></el-input>
                  <!--<el-input type="password" v-model="userForm.password" auto-complete="off" :rules="changePass?rules.password:[{ required: true, message: '请输入密码', trigger: 'blur', pattern: /^[a-zA-Z0-9]{8,20}$/, message: '8-20位字符，允许英文字母、数字！'}]" ></el-input>-->
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" :rules="rules.checkPass">
                  <el-input type="password" v-model="userForm.checkPass" auto-complete="off"></el-input>
                </el-form-item>  
              </div>                                           
               <el-form-item label="真实姓名" prop="name"  :rules="rules.name">
                <el-input v-model="userForm.name" ></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone"  :rules="rules.phone">
                <el-input v-model="userForm.phone"  @blur="validateCheckPhone(false)" @change="validateCheckPhone(true)"></el-input>
              </el-form-item>
               <el-form-item label="权限" prop="roleId"  :rules="rules.roleId">
                <el-select v-model="userForm.roleId" placeholder="请选择">
                  <el-option
                    v-for="item in roleOptions"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId">
                  </el-option>
                </el-select> 
              </el-form-item>                                        
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose" >取 消</el-button>
          <el-button type="primary" v-if="dialogStatus === 'create'"  @click="create()">提 交</el-button>
          <el-button type="primary" v-if="dialogStatus === 'update'" @click="update()">提 交</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import { toCheckPwd2 } from '@/utils/validate'
export default {
  name: 'userment',
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!toCheckPwd2(this.userForm.password)) {
            callback(new Error('密码8-20位字符，允许英文字母、数字'));    
          } else {
          if (this.userForm.checkPass !== '') {
            this.$refs.userForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        // console.log(value,this.userForm.password)
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };        
    return {      
      tableData: [], 
      isIndeterminate: false,        
      listQuery: { 
        username: '',  
        name: '',
        status: '',
        sex: '',
        phone: '',
        userType: '',
        currentPage: '',           
        pageSize: ''
      }, 
      userId: '',
      changePass: false,
      userForm: {
        userId: '',
        username: '',
        password: '',
        name: '',
        phone: '',
        roleId: ''
      },
      roleOptions: [], 
      loading: false,      
      total: 0,
      userAuthorityList: [],
      searchUserStatus: false,
      addUserStatus: false,
      updateUserStatus: false,
      outageUserStatus: false,
      activateUserStatus: false,
      freezeUserStatus: false,    
      titleMap: {
        update: '修改信息',
        create: '新增用户'
      },
      dialogStatus: '',      
      userDialogVisible: false,
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur', pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{5,20}$/, message: '5-20位字符（至少包含数字、字母、特殊字符其中两种）'}],
        name: [{ required: true, message: '请输入用户真实姓名', trigger: 'blur', pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]{2,8}$/, message: '2-8个字符，允许中文、英文字母、数字！'}],
        password: [
          {  required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],         
        phone: [{ required: true, trigger: 'blur', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的电话格式！'}],       
        roleId: [{ required: true, message: '请选择权限', trigger: 'blur' }]
      }          
    }   
  },  
  created() {

    // 请求第一页数据
    this.listQuery.currentPage = this.$route.query.currentPage ? parseInt(this.$route.query.currentPage) : 1
  },
  mounted() {
    this.getList()
    //权限设置
    this.userAuthorityList=this.$getLastChildrenMenu('userManagement')
    //  console.log(this.userAuthorityList)  
    for(let i=0;i<this.userAuthorityList.length;i++){
      //  console.log(this.userAuthorityList[i].menuName);
      switch(this.userAuthorityList[i].menuName){
        case '添加':
          this.addUserStatus=this.userAuthorityList[i].status
          break;
        case '修改':
          this.updateUserStatus=this.userAuthorityList[i].status
          break;
        case '停用':
          this.outageUserStatus=this.userAuthorityList[i].status
          break;
        case '激活':
          this.activateUserStatus=this.userAuthorityList[i].status
          break;
        case '冻结':
          this.freezeUserStatus=this.userAuthorityList[i].status
          break;          
        default: ;
      }
    }    
  },  
  methods: {    
    // 获取列表数据
    getList() {
      this.loading = true
      // 获取列表
      this.$api.userList(this.listQuery).then(response => { 
        this.loading = false
        if (response.errorCode === '1') {             
          this.tableData = response.data
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
    // 查询 
    // BUG 查询username后台筛选不到数据
    handleSearch() {  
      this.getList()
    },
    // 验证用户名唯一性
    validateCheckUserUnique(isChange) {
      this.$api.checkUserUnique({
        userName: this.userForm.username,
        userId: ''
      }).then(response => {
        if (response.errorCode === '1') {
          this.$message.success('该用户账号可以正常使用！')
          return true
        } else {
          this.$message.warning(response.resultMsg)
          return false
        }
      })
    },
    // 验证手机号唯一性
    validateCheckPhone(isChange) {
      if (this.userForm.phone) {
        if (!isChange) return
        this.$api.checkUserName({
          userName: this.userForm.phone,
          actionCode: ''
        }).then(response => {
          if (response.errorCode === '1') {
            this.$message.success('该手机号码可以正常使用！')
            return true
          } else {
            this.$message.warning(response.resultMsg)
            return false
          }
        })
      }
    },    
    // 关闭弹窗
    handleClose() {
      this.userDialogVisible = false
      this.$refs.userForm.resetFields()
    },    
    // 新增弹窗
    handleCreate() {
      this.changePass = false
      this.dialogStatus = "create"
      this.userDialogVisible = true
      this.getRoleList()
      this.$nextTick(_ => {
        this.$refs.userForm.resetFields()
        this.userForm['username'] = ''
        this.userForm['userId'] = ''
        this.userForm['password'] = ''
        this.userForm['name'] = ''
        this.userForm['phone'] = ''  
        this.userForm['roleId'] = ''
      })  
    },    
    // 编辑弹窗
    handleUpdate(data) {
      this.dialogStatus = "update"
      this.userDialogVisible = true
      this.getRoleList()
      this.$nextTick(_ => {
        this.$refs.userForm.resetFields()
        this.userForm['userId'] = data.userId
        this.userForm.username = data.username
        this.userForm['password'] = ''
        this.userForm['checkPass'] = ''
        this.userForm.name = data.name
        this.userForm.phone = data.phone
        this.userForm.roleId = data.roleId
      })
    },    
    // 新增提交
    create() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          delete this.userForm.userId
          this.$api.addUser(this.userForm).then(response => {
            if (response.errorCode === '1') {
              this.getList()
              this.$message.success("新建成功！")
              this.userDialogVisible = false
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
      this.$refs.userForm.validate(valid => {
        if (valid) {
          delete this.userForm.checkPass
          this.$api.updateUser(this.userForm).then(response => {
            if (response.errorCode === '1') {
              this.getList()
              this.$message.success('修改成功！')
              this.userDialogVisible = false
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
    // 停用,恢复或冻结提交
    deleteUser(data,val){ 
      // console.log(val)
        this.$api.delUser({           
            userId: data.userId,
            status: val 
        })
        .then(response => {
          if (response.errorCode === '1') {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
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
    // 停用,恢复或冻结判断
    getUserDelete(data,val) {
      // console.log(val)
      if (val.status == 0) {
        this.$confirm('确定要停用该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.deleteUser(data,val)

        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '操作取消'
          })
          return false
        })
      } else if (val.status == 1) {
        this.$confirm('确定要恢复该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.deleteUser(data,val)

        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '操作取消'
          })
          return false
        })
      } else {
        this.$confirm('确定要激活该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.deleteUser(data,val)
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
    // 获取所有角色列表
    getRoleList() {
      let params = {   
        roleName: '',
        code: '',
        status: '',       
        currentPage: 1,   
        pageSize: 100
      }
      this.$api.roleList(params).then(response => {
         if (response.errorCode === '1') {
            this.roleOptions = response.data
         } else {
            this.$message.warning(response.resultMsg)
         }
      }).catch(error => {
        this.$message.error(error)
        return false
      })
    }
  },
  computed: {
  }    
};
</script>

<style lang="scss" scoped>
</style>