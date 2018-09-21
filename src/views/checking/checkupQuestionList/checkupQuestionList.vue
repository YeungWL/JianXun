<template>
  <div class="page-content-body">
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
                <span>{{item.orgName}}{{item.status}}</span>
              </el-option>
            </el-select>
          </el-form-item> 
          <div class="btn-group fr">
            <el-button type="primary"  icon="el-icon-search" @click="handleSearch">高级查询</el-button> 
            <el-button icon="el-icon-setting" v-show="isChargeManShow">设置</el-button>
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
          <!--<el-table-column prop="questionAttr" label="问题属性" min-width="80" 
            :filters="[{ text: '质量', value: '质量' }, { text: '安全', value: '安全' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag v-if='scope.row.questionAttr === "质量"' type="primary" disable-transitions>{{scope.row.questionAttr}}</el-tag>
              <el-tag v-else-if='scope.row.questionAttr === "安全"' type="primary" disable-transitions>{{scope.row.questionAttr}}</el-tag>
            </template>
          </el-table-column>-->
          <el-table-column prop="checkType" label="检查类别" min-width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if='scope.row.status == "0"' class="red">未整改</span>
              <span v-else-if='scope.row.status == "1"' class="blue">已整改</span>  
              <span v-else class="green">已复查</span> 
            </template>               
          </el-table-column> 
          <el-table-column prop="createTime" label="创建时间" min-width="150" sortable></el-table-column>
          <el-table-column prop="queDesc" label="问题描述" min-width="150"  show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" min-width="120">
            <template slot-scope="scope"> 
              <span class="btn" title="编辑" @click="handleUpdate(scope.row.id)"><i class="iconfont icon-edit editicon"></i></span>         
              <span class="btn" title="查看" @click="handleView(scope.row.id)"><i class="iconfont icon-view viewicon"></i></span> 
              <span class="btn" v-if='scope.row.isDeleted == "N"' 
                @click="handelDelete(scope.row,'Y')" title="删除">
                <i class="iconfont icon-del delicon"></i>
              </span>
              <span class="btn" v-else @click="handelDelete(scope.row,'N')">恢复</span> 
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
    <!--<el-dialog title="高级查询"
               :visible.sync="searchDialogVisible"
               :close-on-click-modal='false'
               width="50%" class="my-dialog">
      <div class="dialog-content">
        <div class="ui-form">
          <el-form ref="form" label-width="100px" :model="listQuery" class='my-form'>
            <el-form-item label="姓名：" prop="memberName">
              <el-input v-model="listQuery.memberName" placeholder="请输入名字" style="width:180px;"></el-input>
            </el-form-item>            
            <el-form-item label="按人：">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkMemberTypeAll" @change="handleCheckAllChange">全部</el-checkbox>
              <el-checkbox-group v-model="checkedMemberType" @change="handleCheckedItemChange" class="check_item">
                <el-checkbox v-for="item in memberType" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="属性：" prop="questionAttrs">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="">全部</el-checkbox>
              <el-checkbox-group v-model="listQuery.questionAttrs" @change="" class="check_item">
                <el-checkbox v-for="item in questionAttrs" :label="item.name" :key="item.bianma">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="类别：" prop="checkupTypes">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="">全部</el-checkbox>
              <el-checkbox-group v-model="listQuery.checkupTypes" @change="" class="check_item">
                <el-checkbox v-for="item in checkupTypes" :label="item.name" :key="item.bianma">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="日期：">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择开始日期" v-model="listQuery.startTime" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择结束日期" v-model="listQuery.endTime" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>            
            <el-form-item label="状态：" prop="status">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="">全部</el-checkbox>
              <el-checkbox-group v-model="listQuery.status" @change="" class="check_item">
                <el-checkbox v-for="item in status" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
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
    </el-dialog>       -->
  </div>
</template>
<script>
import userUpload from 'components/upload/userUpload.vue'
const cityOptions = ['上海', '北京', '广州', '深圳'];
const memberTypeOptions = [{'id':'1','name':'检查人'},{ 'id':'2','name':'复查人'},{'id':'3','name':'整改人'}]; 
export default {
  components: {
    userUpload
  },   
  name: 'buildingDiary',
  data() {
    return {
      isChargeManShow: false,// 是否显示设置授权按钮
      project: [],
      orgList: [],
      org: {},            
      tableData: [],
      checkAll: false,
      checkMemberTypeAll: false,
      checkedMemberType: [],
      checkedCities: ['上海', '北京'],
      cities: cityOptions, 
      memberType: memberTypeOptions, 
      questionAttrs: [],   
      checkupTypes: [],
      status: [{'id':'0','name':'未整改'},{ 'id':'1','name':'已整改'}, {'id':'2','name':'已复查'}],
      isIndeterminate: false,        
      listQuery: { 
        projectId: '',
        orgId: '',
        questionTitle: '',  
        memberType: [],
        memberName: '',
        questionAttrs: [],
        checkupTypes: [],
        status: '',
        startTime: '',
        endTime: '',
        havePicture: '',
        showCount: '',
        currentPage: ''           
      }, 
      loading: false,      
      total: 0,
      multipleSelection:[],
      usedCapacity: 0,// 容量-已用
      totalCapacity: 100, // 容量-总
      searchDialogVisible: false,
      rules: {
        name: [{ required: true, message: '请输入模板名称', trigger: 'blur', pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '允许中文、英文字母、数字！'}],
        batchCode: [{ required: true, message: '请输入编码', trigger: 'blur'}],
        typeCode: [{ required: true, message: '请输入类型', trigger: 'blur' }]
      }             
    }   
  },
  mounted() {
    this.getMyInPro()
      this.getQuestionAttr()
      this.getCheckupType()    
  },  
  created() {
    // 请求第一页数据
    // this.listQuery.currentPage = this.$route.query.currentPage ? parseInt(this.$route.query.currentPage) : 1
  },
  methods: { 
    // 选择项目
    selectOrgList(projectOrgId) {
      // console.log(projectOrgId)
      if (projectOrgId.length&&projectOrgId != '001') {
        this.listQuery.orgId = projectOrgId[0].projectOrgId
        this.org = projectOrgId[0]
        this.getOrgList()
      } else if(projectOrgId === '001'){
        this.getNotBindOrgs()
      } else {
        this.listQuery.orgId = ''
      }
    },
    // 选择组织
    selectOrg(projectOrgId) {
      this.getList()
      this.isChargeMan(projectOrgId)
      this.getCapacity(projectOrgId)
      for (let i = 0; i < this.orgList.length; i++) {
        if (this.orgList[i].projectOrgId == projectOrgId) {
          this.org = this.orgList[i]
          break
        }
      }
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
    // 获取用户参与的项目列表
    getMyInPro() {
      this.$api.getMyInPro().then(response => {     
        if (response.errorCode === '1') {          
          this.project = response.data
          // console.log(this.project)
          this.project.push({
            proName:"未关联",projectId:"001"
          })
        }      
      }) 
    },
    // 根据项目id查询我所在的组织和授权与我的组织
    getOrgList() {
      this.$api.getOrgList({projectId: this.listQuery.projectId}).then(response => {     
        if (response.errorCode === '1') {          
          this.orgList = response.data
        }      
      }) 
    },
    // 获取未关联的组织列表
    getNotBindOrgs() {
      this.$api.getNotBindOrgs().then(response => {     
        if (response.errorCode === '1') {          
          this.orgList = response.data
        }      
      }) 
    },              
    // 获取列表数据
    getList() {
      this.loading = true
      // 获取列表
      this.$api.checkupQuestionList(this.listQuery).then(response => {     
        if (response.errorCode === '1') { 
          this.loading = false            
          this.tableData = response.data
          this.total = response.totalRecords
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
      // this.getQuestionAttr()
      // this.getCheckupType()
    },
    search() {
      console.log(this.listQuery)
      //  this.getList() 
    },
    // 关闭弹窗
    handleClose() {
      this.searchDialogVisible = false
      // this.$refs.logsForm.resetFields()
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
    handleCheckAllChange(val) {
      let allTypeId = [];
      // let allTypeName = [];

      if (val) {
        this.memberType.forEach(item => {
          allTypeId.push(item.id); //得到全部类型ID，用于搜索
          // allTypeName.push(item.name); //得到全部类型名称，用于返显选中状态
        });

        this.listQuery.memberType = allTypeId;
      } else {
        this.listQuery.memberType = [];
      }
      this.checkedMemberType = val ? this.listQuery.memberType : [];      
      this.isIndeterminate = false;
      // console.log(this.checkedMemberType)
    },
    handleCheckedItemChange(value) {
      let checkedCount = value.length;
      this.checkMemberTypeAll = checkedCount === this.memberType.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.memberType.length;
      // console.log(value)
    },    
    // 新增弹窗
    handleCreate() {
      this.dialogStatus = "create"
      this.logsDialogVisible = true
      this.$nextTick(_ => {
        this.$refs.logsForm.resetFields()
        this.logsForm['name'] = ''
        this.logsForm['batchCode'] = ''
        this.logsForm['typeCode'] = ''
        this.logsForm['path'] = ''     
      })  
    },       
    // 新增提交
    create() {
      let _this = this
      let imgurl = _this.$refs.img.dataUrl.replace("data:image/png;base64,", "")       
      _this.logsForm.path = imgurl
      delete this.logsForm.templateId  
      _this.$refs.logsForm.validate(valid => {
        if (valid) {
          _this.$api.addAttrTemplate(_this.logsForm).then(response => {
            if (response.errorCode === '1') {
              _this.getList()
              _this.$message.success('新建成功！')
              _this.logsDialogVisible = false
            } else {
              _this.$message.warning(response.resultMsg)
            }
          })
        } else {
          return false
        }
      })
    },
    handelDelete(data,val) {
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
    // 整改
    handleUpdate(questionId) {   
      this.$router.push({
        path: "/checking/rectifyCheckupQuestion",
        query: { questionId: questionId }
      })
    }, 
    // 查看历史记录   
    handleView(questionId) {
      this.$router.push({
        path: "/checking/history",
        query: { questionId: questionId }
      })
    }    
  }    
}
</script>

<style lang="scss" scoped>
.check_item {
  display: inline-block;
  margin-left: 30px;
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