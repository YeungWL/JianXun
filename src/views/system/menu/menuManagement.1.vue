<template>
  <div class="clealfix">
   <!-- 树组件 -->
    <menu-tree @change="getChannelId"  :copy="true" ></menu-tree>
    <div class="content-right page-content-body">
      <div class="page-header">
        <el-form class="search-form" :inline="true" :model="searchForm" ref="form" >
            <el-form-item label="菜单名称：">
            <el-input v-model="searchForm.menuName" placeholder="请输入菜单名称" clearable @change="changeMenuList"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="menuSearch">搜索</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="getDataInfo(1)">添加菜单</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="getDataInfo(2)">添加页面</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="getDataInfo(3)">添加按钮</el-button>          
            </el-form-item> 
            <el-form-item label="归属上级" prop="nickname">
              <root-tree style="float:left;" :treeData="labalList" @changePid="changePid"></root-tree>
              <!--<span style="float: right;">若不选，则是一级菜单</span>-->
              <!--<el-input v-model="addForm.pid" class="el-input-text-style"></el-input>-->
            </el-form-item>            
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
                            min-width="200"
                            show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.menuName}}</template>
            </el-table-column>
            <el-table-column label="类型"
                            min-width='100'
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
                            min-width="200"
                            show-overflow-tooltip>
            <template slot-scope="scope">
               <span>{{scope.row.menuCode== null?'null':scope.row.menuCode}}</span>       
            </template>
            </el-table-column>
            <el-table-column label="排序"
                            min-width="100"
                            show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.menuOrder== null?'null':scope.row.menuOrder}}</template>
            </el-table-column> 
            <el-table-column label="操作" min-width="150">
            <template slot-scope="scope">
                <span class="btn" title="编辑"
                    @click="editmenuDiagele(scope.row)">
                  <i class="iconfont icon-edit editicon"></i>
                </span>
                <span class="btn" title="删除"
                    @click="getmenuDelete(scope.row)">
                  <i class="iconfont icon-shanchu delicon"></i>
                </span>           
            </template>
            </el-table-column>
        </el-table>
      </div>

      <!-- 分页组件 -->
      <ui-pagination :total="total" @change="getPages"></ui-pagination>

    </div>
    <!-- 新增/编辑 -->
    <el-dialog :title="title"
               :visible.sync="menuManageDialog"
               :close-on-click-modal='false'
               width="35%" class="my-dialog">
      <div class="dialog-content">
        <div class="ui-form">
          <el-form ref="addform"
                  :rules="rules"
                  label-width="100px"
                  :model="info"
                  class='addmenu'>
            <el-form-item label="菜单名称：" prop="menuName">
              <el-input v-model="info.menuName"></el-input>
            </el-form-item>
            <el-form-item label="父级菜单"  prop="parentId"  v-loading="loading">
              <el-cascader  class="cms-width" 
                  :props="{'id':'menuId','label':'menuName','children':'childList'}"
                  :options="channelList"
                  v-model="info.parentId"
                  change-on-select
                  filterable
                  >
              </el-cascader>       
            </el-form-item>            
            <el-form-item label="编码：" prop="menuCode">
              <el-input v-model="info.menuCode"></el-input>
            </el-form-item>
            <el-form-item label="url：" prop="menuUrl">
              <el-input v-model="info.menuUrl"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="menuOrder">
              <el-input v-model="info.menuOrder"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="menuType">
              <el-radio-group v-model="info.menuType">
                <el-radio label="菜单"></el-radio>
                <el-radio label="页面"></el-radio>
                <el-radio label="按钮"></el-radio>
              </el-radio-group>
            </el-form-item>                        
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="menuManageDialog = false" >取消</el-button>
        <el-button type="primary" v-if="showAddBtn"  @click="menuSubmit('addform',true)">确定</el-button>
        <el-button type="primary" v-if="showEditBtn" @click="redactmenuSubmit('addform',true)">提交</el-button>
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
      labalList: [], // 全部菜单
      //搜索数据
      searchForm: {
        menuName: ''//菜单名称
      },
      tableData: [],// 表格数据      
      total: 0, //列表总数,        
      listQuery: { 
        menuName: '',
        menuCode:'',
        parentId:'',
        isLeaf:'',   
        currentPage: 1,
        pageSize: 10,
      }, 
      // 新增的数据     
      info:{
        menuName:'',
        menuCode:'',
        parentId:'',
        menuUrl:'',
        menuType:'1',
        menuOrder:'1', 
        isLeaf:'1'       
      },
      newEditData: {},
      // 编辑id
      editId: '',
      menuManageDialog: false,
      title: '',
      showEditBtn: false,//是否显示编辑提交按钮
      showAddBtn: false, //是否显示添加提交按钮   
      loading: false,
      value: '',
      rules: {
        menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        menuCode: [{ required: true, message: '请输入菜单编码', trigger: 'blur' }],
        parentId: [{ required: true, message: '请选择父级', trigger: 'blur' }],
        menuUrl: [{ required: true, message: '请输入请求地址', trigger: 'blur' }],
        menuType: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],             
      },
      channelList: [{ isLeaf: 2, menuId: "", menuName: "根菜单" }], //菜单列表
    }
  },
  created() {
		this.getAuthrityList();
    this.getList();
     // 初始获取数据
    this.info.parentId = [this.listQuery.parentId];   
    console.log(this.info.parentId+"sss")    
  },
  methods: {
    // 获取所有权限
    getAuthrityList() {
      let params = {   
        menuName: '',
        menuCode:'',
        parentId: '',
        isLeaf: '' 
      }
      this.$api.menuList(params).then(res => {
        this.labalList = res.data;
      })
    },
    // 获取选中菜单的数据
    changePid(val) {
      console.log(val.id)
      this.listQuery.parentId = val.menuId
      
    },  
    getChannelId(data, node) { //获取菜单树点击
      this.listQuery.parentId = data.id; //传递菜单id
      this.info.parentId = data.id; //传递菜单id
      this.getList(this.listQuery);//获取内容信息
      if(data.isLeaf === "1"){
         return false
      }else{
          // this.info.parentId = data.parentId; //层级id
          this.listQuery.parentId = data.id; //传递菜单id
          this.getList(this.listQuery);//获取内容信息
          // console.log(this.info.parentId)
      }
    },
    // 获取表格的数据
    getList() {
      this.$api
      .menuList(this.listQuery)
        .then(res => {
          if (res.errorCode === '1') {
            this.tableData = res.data
            this.total = res.totalRecords
            this.channelList = this.channelList.concat(res.data); //栏目列表
            console.log(this.channelList)
          }
        })
        .catch(err => {
          this.$message.error(err)
          return false
        })
    },
    getPages(currentPage,pageSize) {
        //获取翻页数据
        this.listQuery.currentPage = currentPage;
        this.listQuery.pageSize = pageSize;
        this.getList(this.listQuery);
    },
    // 新增
    getDataInfo(menuType) {
      this.info['menuName'] = ''//滞空处理
      this.info['menuCode'] = ''
      this.info['menuUrl'] = ''
      this.info['menuType'] = menuType
      this.info['menuOrder'] = ''      
      this.menuManageDialog = true
      this.title = '新增菜单'
      this.showEditBtn = false
      this.showAddBtn = true
      console.log(this.listQuery.parentId)
      if (this.listQuery.parentId != "") {//菜单数据回填
        
        this.info.parentId = this.listQuery.parentId; //层级id[]

      } else {
        this.info.parentId = [""]; //层级id[]
      }     
    },
    // 新增提交
    menuSubmit(formName,state) {
      this.$refs[formName].validate(valid =>{
        if(valid){
          this.$api
          .addMenu(this.info)
          .then(res => {
            this.$refs[formName].resetFields();
            if (res.errorCode === '1') {
              this.$message({
                message: '新增成功',
                type: 'success'
              })
              this.menuManageDialog = false

              if (state) {
                this.info.parentId = [this.listQuery.parentId];
                // this.getList(this.id);
              } else {
                  setTimeout(() => {
                      console.log("刷新列表")
                  }, 1000);
              }
              
            }else{
            	debugger;
            	 this.$message({
                message: res.resultMsg,
                type: 'error'
              })
            }
          })
          .catch(res => {
            this.$message({
              type: 'error',
              message: res.resultMsg
            })
            return false
          })
        }
      })
    },
    //停用/启用提交
    deletemenu(val){
        this.$api
        .delmenu({            
            menuId: val.menuId,
            status: val.status 
        })
        .then(res => {
          if (res.code === '1') {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getmenuFinall()
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '菜单已被其他信息关联，请删除关联后再停用菜单"'
          })
          return false
        })
    },
    // 停用/启用判断
    getmenuDelete(val) {
      // console.log(val)
      if(val.status == 0){
        this.$confirm('确定要停用该菜单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.deletemenu(val)

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
        }).then(() => {
          this.deletemenu(val)

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
    // 编辑弹框中的提交
    redactmenuSubmit(formName) {
         this.$refs[formName].validate(valid =>{
        if(valid){
           this.$api
        .getmenuUpdate({
          menuId: this.editId,
          name: this.newEditData.name,
          value: this.newEditData.value,
          description: this.newEditData.description
        })
        .then(res => {
          if (res.code === '2000') {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getList()
            this.redactmenuDialog = false
          }
        })
        .catch(res => {
          this.$message({
            type: 'error',
            message: err
          })
        })
        }
      })
    },
    // 编辑
    editmenuDiagele(val) {
      this.title = '修改菜单'
      this.menuManageDialog = true
      this.showEditBtn = true
      this.showAddBtn = false
      this.newEditData.value = val.value
      this.newEditData.name = val.name
      this.newEditData.description = val.description
      this.editId = val.id
    },
    // 搜索按钮
    menuSearch() {
      this.searchForm.menuName = this.searchForm.menuName.trim()
      if ( this.searchForm.menuName.length === 0 ) {
        this.$message('搜索内容不能为空')
        return false
      }
      this.getList()
    },
    //实时搜索
    changeMenuList() {
      this.getList()
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