<template>
  <div class="page-content-body" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="page-header clearfix">
        <el-form class="" :inline="true" :model="listQuery" ref="form">
          <el-form-item label="项目：">
            <el-select v-model="listQuery.projectId" placeholder="请选择" @change="selectOrgList">
              <el-option v-for="item in project" :key="item.projectId" :label="item.proName" :value="item.projectId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组织：">
            <el-select v-model="listQuery.orgId" placeholder="请选择" @change="selectOrg">
              <el-option v-for="item in orgList" :key="item.projectOrgId" :label="item.orgName" :value="item.projectOrgId">
                <!--<span>{{item.orgName}}</span>-->
              </el-option>
            </el-select>
          </el-form-item> 
          <div class="btn-group fr">
            <el-button type="primary"  icon="el-icon-search" @click="handleSearch">高级查询</el-button> 
            <el-button type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
            <el-button icon="el-icon-setting" v-show="isChargeManShow"  @click="handleSetting">设置</el-button>
          </div>                        
        </el-form>
      </div>
      <!--  table开始  -->
      <div class="page-main customTable">
        <el-table ref="multipleTable" style="width: 100%" v-loading="loading"  element-loading-text="拼命加载中"
          :data="tableData">
          <!--<el-table-column type="selection" min-width="57"></el-table-column>-->
          <el-table-column prop="title" label="问题名称" min-width="180" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="questionAttr" label="问题属性" min-width="80" >
             <template slot-scope="scope">
              <span class="tag">{{scope.row.questionAttr}}</span>
            </template>
          </el-table-column>         
          <el-table-column prop="checkType" label="检查类别" min-width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if='scope.row.status === "0"' class="red">未整改</span>
              <span v-else-if='scope.row.status === "1"' class="blue">已整改</span>  
              <span v-else class="green">已复查</span> 
            </template>               
          </el-table-column> 
          <el-table-column prop="createTime" label="创建时间" min-width="150" sortable></el-table-column>
          <el-table-column prop="queDesc" label="问题描述" min-width="150"  show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" min-width="120">
            <template slot-scope="scope"> 
              <span class="btn" title="整改" v-if='scope.row.status === "0"' @click="handleUpdate(scope.row.id,scope.row.status)">
                <i class="iconfont icon-edit iconred"></i>
                </span>         
              <span class="btn" title="复查" v-else-if='scope.row.status === "1"' @click="handleUpdate(scope.row.id,scope.row.status)">
                <i class="iconfont icon-fucha iconblue"></i>
                </span> 
              <span class="btn" title="查看历史记录" v-else  @click="handleView(scope.row.id)">
                <i class="iconfont icon-view icongreen"></i>
                </span>  
              <span class="btn"  @click="handelDelete(scope.row)" title="删除" style="display:none;">
                <i class="iconfont icon-del iconred"></i>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页组件 -->
      <ui-pagination :total="total" @change="getPages" class="pb60"></ui-pagination>
      <!-- 容量 -->
      <div class="progress-bar">
        <div class="title"><i class="el-icon-question"></i>当前容量:</div>
        <div  class="progress"><el-progress :percentage="usedCapacity" color="#8e71c7" :show-text="false"></el-progress></div>
        <span class="progress-size">{{usedCapacity}}M/{{totalCapacity}}M</span>
        <span type="text" class="btn">扩容</span>
      </div>

    <!-- 高级查询 -->
    <el-dialog title="高级查询"
               :visible.sync="searchDialogVisible"
               :close-on-click-modal='false'
               width="605px" class="my-dialog">
      <div class="dialog-content">
        <div class="ui-form">
          <el-form ref="form" label-width="100px" :model="listQuery" class='my-form search-form'>
            <el-form-item label="姓名：" prop="memberName">
              <el-input v-model="listQuery.memberName" placeholder="请输入名字" style="width:180px;"></el-input>
            </el-form-item>            
            <el-form-item label="按人：">
              <el-checkbox :indeterminate="isIndeterminateMemberType" v-model="checkAllMemberType" @change="handleCheckAllChangeMemberType">全部</el-checkbox>
              <el-checkbox-group v-model="checkedMemberType" @change="handleCheckedItemChangeMemberType" class="check_item">
                <el-checkbox v-for="item in memberType" :label="item.id" :key="item.id" >{{item.name}}</el-checkbox>
              </el-checkbox-group>              
            </el-form-item>
            <el-form-item label="属性：" prop="questionAttrs">
              <el-checkbox :indeterminate="isIndeterminateQuestionAttrs" v-model="checkAllQuestionAttrs" @change="handleCheckAllChangeQuestionAttrs">全部</el-checkbox>
              <el-checkbox-group v-model="checkQuestionAttrs"  class="check_item"  @change="handleCheckedItemChangeQuestionAttrs">
                <el-checkbox v-for="item in questionAttrs" :label="item.bianma" :key="item.bianma">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="类别：" prop="checkupTypes">
              <el-checkbox :indeterminate="isIndeterminateTypes" v-model="checkAllTypes" @change="handleCheckAllChangeCheckupTypes">全部</el-checkbox>
              <el-checkbox-group v-model="checkTypes"  class="check_item item-br" @change="handleCheckedItemChangeCheckupTypes">
                <el-checkbox v-for="item in checkupTypes" :label="item.bianma" :key="item.bianma">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="日期：">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd" v-model="listQuery.startTime" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" v-model="listQuery.endTime" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>            
            <el-form-item label="状态：" prop="status">
              <el-checkbox :indeterminate="isIndeterminateStatus" v-model="checkAllStatus"  @change="handleCheckAllChangeStatus">全部</el-checkbox>
              <el-checkbox-group v-model="checkStatus" class="check_item" @change="handleCheckedItemChangeStatus">
                <el-checkbox v-for="item in status" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="照片：" prop="havePicture">
              <el-radio-group v-model="listQuery.havePicture">
                <el-radio label="1">有</el-radio>
                <el-radio label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="问题名称：" prop="questionTitle">
              <el-input type="textarea" v-model="listQuery.questionTitle" placeholder="请填写问题名称或关键字"></el-input>
            </el-form-item>                                  
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="search()">查 询</el-button>
      </span>
    </el-dialog>       
  </div>
</template>
<script>
const memberTypeOptions = [{'id':'1','name':'检查人'},{ 'id':'2','name':'复查人'},{'id':'3','name':'整改人'}];
const statusOptions = [{'id':'0','name':'未整改'},{ 'id':'1','name':'已整改'},{'id':'2','name':'已复查'}];  
export default { 
  name: 'buildingDiary',
  data() {
    return {
      isChargeManShow: false,// 是否显示设置授权按钮
      fullscreenLoading: false,
      project: [],
      orgList: [],
      org: {},            
      tableData: [],      
      listQuery: { 
        projectId: '',
        orgId: '',
        questionTitle: '',  
        memberType: '', // 选中的数据，提交的时候做格式处理
        memberName: '',
        questionAttrs: '',
        checkupTypes: '',
        status: '',
        startTime: '',
        endTime: '',
        havePicture: '',
        showCount: '',
        currentPage: ''           
      }, 
      loading: false,      
      total: 0,
      // multipleSelection:[],
      usedCapacity: 0,// 容量-已用
      totalCapacity: 100, // 容量-总
      searchDialogVisible: false,
      checkAllMemberType: false,// 全选
      checkAllQuestionAttrs: false,
      checkAllTypes: false,
      checkAllStatus: false,
      isIndeterminateMemberType: false, // 全选效果控制
      isIndeterminateQuestionAttrs: false,
      isIndeterminateTypes: false,
      isIndeterminateStatus: false,
      checkedMemberType: [],// 选中的人的类型
      checkQuestionAttrs: [],// 选中的属性
      checkTypes: [],// 选中的类别
      checkStatus: [],// 选中的状态
      memberType: memberTypeOptions, 
      questionAttrs: [],   // 属性数组
      checkupTypes: [], // 类别数组
      status: statusOptions, // 状态数组
      // 权限和状态
      menuAuthorityList:[],
      addCheckupQuestionStatus: true,
      rectifyCheckupQuestionStatus: true,
      reviewCheckupQuestionStatus: true,
      checkingHistoryStatus: true,
      searchCheckupQuestionnStatus: true,
      checkupOrgPermissionStatus: true      
    }   
  }, 
  created() {
    this.getMyInPro()  
  },
  mounted() {
    //权限设置
    this.menuAuthorityList=this.$getLastChildrenMenu('checkupList'); 
    // console.log(this.menuAuthorityList); 
     for(let i=0;i<this.menuAuthorityList.length;i++){
      // console.log(this.menuAuthorityList[i].name);
      switch(this.menuAuthorityList[i].name){
        case '添加':
          this.addCheckupQuestionStatus=this.menuAuthorityList[i].status;
          break;
        case '整改':
          this.rectifyCheckupQuestionStatus=this.menuAuthorityList[i].status;
          break;
        case '复查':
          this.reviewCheckupQuestionStatus=this.menuAuthorityList[i].status;
          break;
        case '历史':
          this.checkingHistoryStatus=this.menuAuthorityList[i].status;
          break;
        case '查询':
          this.searchCheckupQuestionnStatus=this.menuAuthorityList[i].status;
          break;
        case '设置':
          this.checkupOrgPermissionStatus=this.menuAuthorityList[i].status;
          break;    
        default: ;
      }
    }        
  },   
  methods: { 
    // 选择项目
    selectOrgList(projectOrgId) {
      // 重新选择后先清除掉缓存，加载新的值，默认显示该项目下第一个组织
      localStorage.removeItem('projectId')
      localStorage.removeItem('orgId')
      if (projectOrgId.length&&projectOrgId != '001') {
        this.getOrgList()
      } else if(projectOrgId === '001'){
        this.listQuery.orgId = ''
        this.getNotBindOrgs()
        
      } else {
        this.listQuery.orgId = ''
      }
    },
    // 选择组织
    selectOrg(projectOrgId) {
      // console.log(projectOrgId)
      for (let i = 0; i < this.orgList.length; i++) {
        if (this.orgList[i].projectOrgId == projectOrgId) {
          this.org = this.orgList[i]
          break
        }
      }
      this.getList()
      this.isChargeMan(projectOrgId)
      this.getCapacity(projectOrgId)

    },       
    // 获取用户参与的项目列表
    async getMyInPro() {
     await this.$api.getMyInPro().then(response => {     
        if (response.errorCode === '1') {          
          this.project = response.data
          this.project.push({
            proName:"未关联",projectId:"001"
          })
          // 默认选中第一条数据
          this.listQuery.projectId = response.data[0].projectId 
        } 
      })

      // console.log(localStorage.getItem('projectId'))
      if( localStorage.getItem('projectId') != '' && localStorage.getItem('projectId') != null){            
          this.listQuery.projectId = localStorage.getItem('projectId')
          this.getOrgList()
      } 
    },
    // 根据项目id查询我所在的组织和授权与我的组织
    async  getOrgList() {
     await  this.$api.getOrgList({projectId: this.listQuery.projectId}).then(response => {     
        if (response.errorCode === '1') {          
          this.orgList = response.data 
          // 默认选中第一条数据
          this.listQuery.orgId = response.data[0].projectOrgId        
        }      
      })

      // 判断是否有保存ID值
      if(localStorage.getItem('orgId') != '' && localStorage.getItem('orgId') != null){
        this.listQuery.orgId = localStorage.getItem('orgId')
      }
       this.getList()        
    },
    // 获取未关联的组织列表
    getNotBindOrgs() {
      this.$api.getNotBindOrgs().then(response => {     
        if (response.errorCode === '1') {          
          this.orgList = response.data
          // 默认选中第一条数据
          this.listQuery.orgId = response.data[0].projectOrgId            
        }      
      }) 
    },              
    // 获取列表数据
    getList() {
      this.loading = true
      // this.fullscreenLoading = true;
      // 获取列表
      this.$api.checkupQuestionList(this.listQuery).then(response => {     
        if (response.errorCode === '1') { 
          this.loading = false  
          // this.fullscreenLoading = false;          
          this.tableData = response.data
          this.total = response.totalRecords
          this.searchDialogVisible = false
          localStorage.setItem('projectId', this.listQuery.projectId) 
          localStorage.setItem('orgId' ,this.listQuery.orgId) 
        } else {
          this.$message.warning(response.resultMsg)
        }      
      })    
    },
    // 是否是组织负责人
    isChargeMan(id) {
      this.$api.isChargeMan({
          projectOrgId: id
        }).then(response => {     
        if (response.errorCode === '1') {
          //0正组织负责人有权限设置授权组织
          if (response.data[0].isChargeMan == "0") {
              this.isChargeManShow = true
            } else {
              this.isChargeManShow = false;
            }          
        }      
      }) 
    }, 
    // 获取容量
    getCapacity(id) {
      this.$api.capacity({
          orgId: id
      }).then(response => {     
        if (response.errorCode === '1') {
          this.usedCapacity = response.data[0].usedCapacity
          this.totalCapacity = response.data[0].totalCapacity
        }      
      }) 
    },    
    getPages(currentPage, pageSize) {
        // 获取翻页数据
        this.listQuery.currentPage = currentPage
        this.listQuery.showCount = pageSize
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
    handleSearch() {
      this.searchDialogVisible = true  
      this.getQuestionAttr()
      this.getCheckupType()
    },
    search() {
      // 将获取到的数据拼接后台需要的格式 
      let memberTypeArr = ''
      let questionAttrsArr = ''
      let checkupTypesArr = ''
      let statusArr = ''
      for(let i = 0; i < this.checkedMemberType.length; i++) {
        memberTypeArr += this.checkedMemberType[i]+'-'
      }
      for(let i = 0; i < this.checkQuestionAttrs.length; i++) {
        questionAttrsArr += this.checkQuestionAttrs[i]+'-'
      }
      for(let i = 0; i < this.checkTypes.length; i++) {
        checkupTypesArr += this.checkTypes[i]+'-'
      }
      for(let i = 0; i < this.checkStatus.length; i++) {
        statusArr += this.checkStatus[i]+'-'
      }             
      this.listQuery.memberType = memberTypeArr
      this.listQuery.questionAttrs = questionAttrsArr
      this.listQuery.checkupTypes = checkupTypesArr
      this.listQuery.status = statusArr

      // console.log(this.listQuery)
       this.getList() 
    },
    // 关闭弹窗
    handleClose() {
      this.searchDialogVisible = false
    },
    // 获取问题属性列表
    getQuestionAttr() {
      this.$api.questionAttr().then(response => {     
        if (response.errorCode === '1') {           
          this.questionAttrs = response.data
        }      
      })    
    },
    // 获取检查类别列表
    getCheckupType() {
      this.$api.checkupType().then(response => {     
        if (response.errorCode === '1') {           
          this.checkupTypes = response.data
        }      
      })    
    },    
    // 全选人员类型
    handleCheckAllChangeMemberType(val) {
      let allTypeId = [];
      if (val) {
        this.memberType.forEach(item => {
          allTypeId.push(item.id); //得到全部类型ID，用于搜索
        });
        this.listQuery.memberType = allTypeId;
      } else {
        this.listQuery.memberType = [];
      }
      this.checkedMemberType = val ? this.listQuery.memberType : []; //全选或反选 
      this.isIndeterminateMemberType = false;
      // console.log(this.listQuery.memberType)
    },     
    handleCheckedItemChangeMemberType(value) {
      let checkedCount = value.length;
      this.checkAllMemberType = checkedCount === this.memberType.length;
      this.isIndeterminateMemberType = checkedCount > 0 && checkedCount < this.memberType.length;
      // console.log(value)
    },
    // 全选属性
    handleCheckAllChangeQuestionAttrs(val) {
      let allTypeId = [];
      if (val) {
        this.questionAttrs.forEach(item => {
          allTypeId.push(item.bianma); //得到全部类型ID，用于搜索
        });
        this.listQuery.questionAttrs = allTypeId;
      } else {
        this.listQuery.questionAttrs = [];
      }      
      this.checkQuestionAttrs = val ? this.listQuery.questionAttrs : [];      
      this.isIndeterminateQuestionAttrs = false;
      // console.log(this.listQuery.questionAttrs)
    },     
    handleCheckedItemChangeQuestionAttrs(value) {
      let checkedCount = value.length;
      this.checkAllQuestionAttr = checkedCount === this.questionAttrs.length;
      this.isIndeterminateQuestionAttrs = checkedCount > 0 && checkedCount < this.questionAttrs.length;
      // console.log(value)
    },
    // 全选类型
    handleCheckAllChangeCheckupTypes(val) {
      let allTypeId = [];
      if (val) {
        this.checkupTypes.forEach(item => {
          allTypeId.push(item.bianma); //得到全部类型ID，用于搜索
        });
        this.listQuery.checkupTypes = allTypeId;
      } else {
        this.listQuery.checkupTypes = [];
      }      
      this.checkTypes = val ? this.listQuery.checkupTypes : [];            
      this.isIndeterminateTypes = false;
      // console.log(this.listQuery.checkupTypes)
    },     
    handleCheckedItemChangeCheckupTypes(value) {
      let checkedCount = value.length;
      this.checkAllCheckupType = checkedCount === this.checkupTypes.length;
      this.isIndeterminateTypes = checkedCount > 0 && checkedCount < this.checkupTypes.length;
      // console.log(value)
    },
    // 全选状态
    handleCheckAllChangeStatus(val) {
      let allTypeId = [];
      if (val) {
        this.status.forEach(item => {
          allTypeId.push(item.id); //得到全部类型ID，用于搜索
        });
        this.listQuery.status = allTypeId;
      } else {
        this.listQuery.status = [];
      }      
      this.checkStatus = val ? this.listQuery.status : [];      
      this.isIndeterminateStatus = false;
      // console.log(this.listQuery.status)
    },     
    handleCheckedItemChangeStatus(value) {
      let checkedCount = value.length;
      this.checkAllStatus = checkedCount === this.status.length;
      this.isIndeterminateStatus = checkedCount > 0 && checkedCount < this.status.length;
      // console.log(value)
    },                      
    // 新增问题
    handleCreate() {
      if(this.listQuery.orgId === ''){
        this.$message.warning('请选择组织！')
        return
      }
      this.$router.push({
        path: "/checking/addCheckupQuestion",
        query: { projectId: this.listQuery.projectId, orgId: this.listQuery.orgId }
      })
    },       
    // 不需要删除功能
    handelDelete(data) {
        this.$api.deleteQues({           
            questionId: data.questionId
        })
        .then(response => {
          if (response.errorCode === '1') {
            this.$message.success('删除成功！')
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
    // 整改或复查
    handleUpdate(questionId,status) {   
      this.$router.push({
        path: "/checking/rectifyCheckupQuestion",
        query: { questionId: questionId, status: status }
      })
    }, 
    // 查看历史记录   
    handleView(questionId) {
      this.$router.push({
        path: "/checking/history",
        query: { questionId: questionId }
      })
    },
    // 设置组织授权
    handleSetting() {
      this.$router.push({
        path: "/checking/checkupOrgPermission",
        query: { projectId: this.listQuery.projectId, orgId: this.listQuery.orgId }
      })      
    }        
  }    
}
</script>

<style lang="scss" scoped>
.search-form>div{
  margin-bottom: 0;
}
.check_item {
  display: inline-block;
  margin-left: 30px;
}
.check_item.item-br{
  margin-left: 0px;
}
.check_item.item-br label:first-child{
  margin-left: 0px;
}
.pb60{ padding-bottom: 60px;}
.tag{
  display: inline-block;
  padding: 2px 12px;;
  background: #ecf5ff;
}
.progress-bar{
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 220px;
  right: 20px;
  padding: 20px;
  border-top: 1px solid #dcdfe6;
  background: #fafafa;
  .title{
    display: inline-block;
    float: left;
  }
  .btn{
    display: inline-block;
    float: right;
  }
  .progress{
    display: inline-block;
    width: 300px;
    margin-left: 20px;
  }
  .progress-size{
    display: inline-block;
  }
}
</style>