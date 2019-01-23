<template>
  <!--<div class="page-content-body">功能开发中，敬请期待！-->
  <div class="page-content-body">
      <div class="page-header clearfix">
        <el-form class="search-form" :inline="true" :model="listQuery" ref="form">
          <el-row>
            <el-col :span="24">
              <el-form-item label="组织：" >
                <el-select v-model="listQuery.orgId" placeholder="请选择" class="item-org"  @change="selectOrg">
                  <el-option v-for="item in orgList" :key="item.orgId" :label="item.orgName" :value="item.orgId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div>
          <el-form-item label="课件名称：">
            <el-input v-model="listQuery.courseName"  clearable></el-input>
          </el-form-item>          
          <el-form-item label="级别：">
              <el-select v-model="gradeId" placeholder="请选择" @change="gradeChange">
                <el-option v-for="item in gradeArr" :key="item.gradeId" :label="item.name" :value="item.gradeId">
                </el-option>                
              </el-select>
          </el-form-item>
          <!--<el-form-item label="状态：">
            <el-select v-model="listQuery.status" placeholder="请选择">
              <el-option v-for="item in statusArr" :key="item.id" :label="item.name" :value="item.id">
                <span>{{item.name}}</span>
              </el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary"  icon="el-icon-search" @click="handleSearch">搜索</el-button>
          </el-form-item>         
          <div class="btn-group fr">
            <el-button type="primary" icon="el-icon-plus" @click="handleChoiceCourse">选课</el-button>
          </div> 
          </div>                       
        </el-form>
        
      </div>
      <!--  table开始 --> 
      <div class="page-main customTable">
        <el-table ref="multipleTable" style="width: 100%" v-loading="loading"  element-loading-text="拼命加载中"
          :data="tableData">
          <!--<el-table-column prop="bianma" label="课件编码" min-width="100" show-overflow-tooltip></el-table-column>-->
          <el-table-column prop="courseName" label="课件名称" min-width="180" show-overflow-tooltip>
             <template slot-scope="scope"><a href="javascript:;" @click="handleView(scope.row.courseId)">{{scope.row.courseName}}</a></template>
          </el-table-column>
          <el-table-column prop="level" label="级别" min-width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isDeleted === 'N'? true : false"  
              @change="changeSwitch(scope.$index,scope.row)">
              </el-switch>              
            </template>               
          </el-table-column> 
          <el-table-column label="操作" min-width="120">
            <template slot-scope="scope"> 
              <span class="btn" title="查看"  @click="handleView(scope.row.courseId)"><i class="iconfont icon-view icongreen"></i></span>
              <span class="btn"  @click="handelDelete(scope.row)" title="删除">
                <i class="iconfont icon-del iconred"></i>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页组件 -->
      <ui-pagination :total="total" @change="getPages" class="pb60"></ui-pagination>
            
    <!-- 选课 -->
    <el-dialog title="选课"
               :visible.sync="choiceCoursehDialogVisible"
               :close-on-click-modal='false'
               width="605px" class="my-dialog">
      <div class="dialog-content">
        <div class="ui-form">
          <el-form :inline="true" class='my-form search-form'>
            <el-form-item label="课件名称：">
              <el-input v-model="courseListQuery.courseName"  clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  icon="el-icon-search" @click="handleSearchCourse">搜索</el-button>
            </el-form-item>        
          </el-form>
          <el-tabs v-model="activeName" @tab-click="handleCourseType">
            <!--公共课件-->
            <el-tab-pane label="公共课件" name="1">
              <div class="customTable">
                <el-table ref="publicCourseMultipleSelection" style="width: 100%" v-loading="loading"  element-loading-text="拼命加载中"
                  :data="publicCourseTableData" :row-key="getRowKeys" @selection-change="handlePublicCourseSelectionChange">
                  <el-table-column type="selection" :reserve-selection="true" min-width="57"></el-table-column>
                  <el-table-column prop="courseName" label="课件名称" min-width="180" show-overflow-tooltip>
                    <template slot-scope="scope"><a href="javascript:;" @click="handleView(scope.row.courseId)">{{scope.row.courseName}}</a></template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 分页组件 -->
              <ui-pagination :total="publicCourseTotal" @change="getPublicCoursePages" class="pb60"></ui-pagination>
            </el-tab-pane>
            <!--我的课件-->
            <el-tab-pane label="我的课件" name="2">
             <div class="customTable">
               <el-table ref="myCourseMultipleSelection" style="width: 100%" v-loading="loading"  element-loading-text="拼命加载中"
                  :data="myCourseTableData"  @selection-change="handleMyCourseSelectionChange">
                <el-table-column type="selection" min-width="57"></el-table-column>
                <el-table-column prop="courseName" label="课件名称" min-width="180" show-overflow-tooltip>
                   <template slot-scope="scope"><a href="javascript:;" @click="handleView(scope.row.courseId)">{{scope.row.courseName}}</a></template>
                </el-table-column>
               </el-table>
             </div>
             <!-- 分页组件 -->
             <ui-pagination :total="myCourseTotal" @change="getMyCoursePages" class="pb60"></ui-pagination>             
             <!--<div class="btn-group mt20">          
                <el-button type="primary" icon="el-icon-plus" @click="handleAddCourse">添加</el-button>
                <el-button type="success" icon="el-icon-edit" @click="handleMyCourse">维护</el-button>
              </div>              -->
            </el-tab-pane>
          </el-tabs>

          <el-form ref="form"  :inline="true" class='mt20' label-width="100px">
            <!--<el-form-item label="学习时间：">
              <el-input v-model="selectCourseQuery.studyTime" clearable placeholder="分钟"></el-input>
            </el-form-item>            -->
            <el-form-item label="匹配给：">
              <el-select v-model="toGradeId" placeholder="请选择"  @change="toGradeChange">
                <el-option v-for="item in toGradeArr" :key="item.gradeId" :label="item.name" :value="item.gradeId">
                </el-option>                
              </el-select>
            </el-form-item>
         </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="choiceCourse()">确 定</el-button>
      </span>
    </el-dialog>
   <!-- 选课成功提示 -->
    <el-dialog
      title="提示"
      :visible.sync="successTipsDialogVisible"
      width="30%"
      center>
      <span>选课成功！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gobackList">返 回</el-button>
        <el-button type="primary" @click="goCourseSelect">继续选课</el-button>
      </span>
    </el-dialog>    
    <!-- 课件详情 -->
    <el-dialog
      title="课件详情"
      :visible.sync="viewCourseDialogVisible"
      width="90%">
      <div class="page-main">
        <div class="page-content">
          <div class="meta_list">
            <h1 class="title">{{viewCourseForm.courseName}}</h1>
          </div>
          <ckeditor :height="200" :init-data="viewCourseForm.content"></ckeditor>
        </div>
        <div class="enclosure_revise">
          <div style="margin: 10px 10px 10px 10px;" class="pos-fix"> 
            <div>
              <P>附件：</P>
            </div>
            <ul>
              <li v-if="resoureUploadFile.length === 0">暂无</li>
              <li v-else v-for="item in resoureUploadFile" :key="item.index" :label="item.name" :value="item.name">
                <div>
                  <a v-bind:href="item.filePath">{{item.name}}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-dialog> 
  </div>
</template>
<script> 
import ckeditor from 'components/ckeditor/ckeditor'
export default {
  name: 'courseware',
  components:{ ckeditor },// ckeditor组件
  data() {
    return {
      orgList: [],          
      tableData: [], 
      gradeId: '', // 选中的级别ID     
      listQuery: { 
        orgId: '',
        gradeJson: '',  // 查询可以不填，选课才是必填
        courseName: '',
        showCount: '',
        currentPage: ''           
      },
      courseListQuery: {
        orgId: '',
        type: '1', // 课件类型[非必填项,1为公共课件,2为个人课件,默认为2]
        courseName: '',
        showCount: '',
        currentPage: ''    
      },
      toGradeId:'', // 匹配给某个级别ID
      selectCourseQuery: {
        orgId: '',
        courseId: [],
        gradeJson: ''
      },
      gradeArr: [], // 级别
      toGradeArr: [], // 匹配给的级别
      loading: false,      
      total: 0,
      myCourseTotal: 0,
      publicCourseTotal: 0,
      choiceCoursehDialogVisible: false,
      successTipsDialogVisible: false,
      activeName: '1',
      publicCourseTableData: [],// 公共课件，我的课件列表
      myCourseTableData: [],
      publicCourseMultipleSelection: [],
      myCourseMultipleSelection: [],
      viewCourseDialogVisible: false,
      viewCourseForm: {
        courseId: '',
        courseName: '',
        courseType: 1,
        content: '',
        attachList: []
      },
      resoureUploadFile: []          
    }   
  },
  mounted() {
    this.getEduOrgList()
  },
  methods: {
    selectOrg() {
      this.getList()
      this.gradeList()
      this.toGradeList()
      this.courseListQuery.orgId = this.listQuery.orgId
      this.$nextTick(_ => {      
        this.listQuery.gradeJson = ""
        // this.selectCourseQuery.gradeJson = ""
        this.gradeId = ""
        // this.toGradeId = ""
      })
    },
    getEduOrgList() {   
      this.$api.getEduOrgList().then(response => {     
        if (response.errorCode === '1') {          
          this.orgList = response.data
           // 默认选中第一条数据
          this.listQuery.orgId = response.data[0].orgId  
          this.courseListQuery.orgId = response.data[0].orgId  
          this.gradeList()// 获取级别列表
          // this.toGradeList()
          this.getList()          
        }      
      })
    },
    gradeList() {
      this.$api.gradeList({orgId: this.listQuery.orgId}).then(response => {     
        if (response.errorCode === '1') {          
          this.gradeArr = response.data
          this.gradeArr.unshift({level: "1", gradeId: "001", name: "全部"}) 
        }      
      }) 
    },
    toGradeList() {
      this.$api.gradeList({orgId: this.listQuery.orgId}).then(response => {     
        if (response.errorCode === '1') { 
            this.toGradeArr = response.data
            this.toGradeId = response.data[0].gradeId  
        }      
      }) 
    },             
    // 获取列表数据
    getList() {
      if (this.gradeId === '001') {
        // 如果级别选择全部，数据传空
        this.listQuery.gradeJson = ""
      }
      this.loading = true
      this.$api.beSelectCourseList(this.listQuery).then(response => {     
        if (response.errorCode === '1') { 
          this.loading = false       
          this.tableData = response.data
          this.total = response.totalRecords
          // localStorage.setItem('orgId' ,this.listQuery.orgId) 
        } else {
          this.$message.warning(response.resultMsg)
        }      
      })    
    },
    // 获取公共课件列表数据-- 选课列表
    getPublicCourseList() {
      this.courseListQuery.type = 1
      this.loading = true
      this.$api.getCourseList(this.courseListQuery).then(response => {     
        if (response.errorCode === '1') { 
          this.loading = false
          this.publicCourseTableData = response.data
          this.publicCourseTotal = response.totalRecords
        } else {
          this.$message.warning(response.resultMsg)
        }      
      })
    },        
    // 获取个人课件列表数据-- 选课列表
    getMyCourseList() {
      this.courseListQuery.type = 2
      this.loading = true
      this.$api.getCourseList(this.courseListQuery).then(response => {     
        if (response.errorCode === '1') { 
          this.loading = false
          this.myCourseTableData = response.data
          this.myCourseTotal = response.totalRecords
        } else {
          this.$message.warning(response.resultMsg)
        }      
      })    
    },
    // 选课
    handleChoiceCourse() {
      this.choiceCoursehDialogVisible = true
      this.getMyCourseList()
      this.getPublicCourseList()
      this.$nextTick(_ => {  
        this.toGradeList()
        console.log("toGradeId:"+this.toGradeId)
        if (this.toGradeId != "") {
          // 如果默认选中第一个组织，需要获取到该级别ID
          this.toGradeChange(this.toGradeId)   
        }
      })
    },
    // 选中的级别
    gradeChange(id) {
      let obj = {}
      let grade = ''
      obj = this.gradeArr.find((item)=>{
        return item.gradeId === id
      })
      grade = {"gradeId":obj.gradeId,"level":obj.level} // 拼接json字符串
      this.listQuery.gradeJson = JSON.stringify(grade) // 根据级别查询课件列表
      // console.log(this.listQuery.gradeJson)
    },
    // 匹配的级别
    toGradeChange(id) {
      let obj = {}
      let grade = ''
      obj = this.toGradeArr.find((item)=>{
        return item.gradeId === id
      })
      grade = {"gradeId":obj.gradeId,"level":obj.level} // 拼接json字符串
      this.selectCourseQuery.gradeJson = JSON.stringify(grade) // 选课的匹配对象
      // console.log(this.selectCourseQuery.gradeJson)
    },    
    getRowKeys(row) {
  		 return row.courseId
  	},    
    choiceCourse() {
      let selectCourseId = []
      this.selectCourseQuery.orgId = this.listQuery.orgId
      if (this.publicCourseMultipleSelection.length === 0 && this.myCourseMultipleSelection.length === 0) {
        this.$message.warning("请至少选中一条要添加的记录");
        return false;
      }
      if (this.selectCourseQuery.gradeJson === ""){
        this.$message.warning("请选择需要匹配给的组织");
        return false;
      }
      
      this.publicCourseMultipleSelection.forEach((row, index) => {
          selectCourseId.push(row.courseId)
      })
      this.myCourseMultipleSelection.forEach((row, index) => {
          selectCourseId.push(row.courseId)
      })

      this.selectCourseQuery.courseId = selectCourseId.join(",")
      // console.log(this.selectCourseQuery)   
      this.$api.selectCourse(this.selectCourseQuery).then(response => {     
        if (response.errorCode === '1') {      
          this.successTipsDialogVisible = true
          selectCourseId.splice(0,selectCourseId.length)//清空数组
          this.$refs.publicCourseMultipleSelection.clearSelection()//清空已勾选的数据
          this.$refs.myCourseMultipleSelection.clearSelection() //清空已勾选的数据    
          // console.log(this.publicCourseMultipleSelection)
          this.getList()   
        } else {
          this.$message.warning(response.resultMsg)
        }      
      })    
      
    }, 
    // 获取选中的公共课件
    handlePublicCourseSelectionChange(rows) {
      // https://segmentfault.com/q/1010000012976664
      this.publicCourseMultipleSelection = rows
      // console.log(this.publicCourseMultipleSelection)
    }, 
    // 获取选中的我的课件
    handleMyCourseSelectionChange(rows) {
      this.myCourseMultipleSelection = rows
      // console.log(this.myCourseMultipleSelection)
    },                       
    getPages(currentPage, pageSize) {
        // 获取翻页数据
        this.listQuery.currentPage = currentPage
        this.listQuery.showCount = pageSize
        this.getList(this.listQuery)
    },  
    getPublicCoursePages(currentPage, pageSize) {
        // 获取公共课件翻页数据
        this.courseListQuery.currentPage = currentPage
        this.courseListQuery.showCount = pageSize
        this.getPublicCourseList(this.courseListQuery)
    },
    getMyCoursePages(currentPage, pageSize) {
        // 获取我的课件翻页数据
        this.courseListQuery.currentPage = currentPage
        this.courseListQuery.showCount = pageSize
        this.getMyCourseList(this.courseListQuery)
    },           
    handleSearch () {
      this.getList()
    }, 
    handleSearchCourse () {
      this.getMyCourseList()
      this.getPublicCourseList()
    }, 
    // 获取信息
    editCoursePage(id) {
        this.$api
          .editCoursePage({ courseId: id })
          .then(response => {
            if (response.errorCode === '1') {
                this.viewCourseForm.courseId = response.data.courseId;
                this.viewCourseForm.courseName = response.data.courseName;
                this.viewCourseForm.content = response.data.content;
                this.resoureUploadFile = response.data.attachList;

                var _html = this.viewCourseForm.content;
                CKEDITOR.instances.editor.setData(_html,{
                  callback:function(){
                   var  _input_value = CKEDITOR.instances.editor.getData();
                    if(_input_value == "") {
                    var  _editor = window.frames[0];//获取iframe对象
                      if(_editor != undefined){
                         _editor.document.body.innerHTML = _html;//访问iframe中的body，并插入html
                        CKEDITOR.instances.editor.setReadOnly(true);//设置只读
     
                      }
                    }
                  }
                });                  
            }
          })
    },
    // 查看详情
    handleView(id) {
      // console.log(id)
      this.viewCourseDialogVisible = true
      this.editCoursePage(id)
    },  
    // 设置课件状态
    changeSwitch (index, row) {      
      // console.log(row.isDeleted)
      let params ={
        crefId: row.crefId,
        isDeleted: row.isDeleted === 'Y'?'N':'Y'
      }
      this.$api.setCourseIsDeleted(params).then(response => {     
        if (response.errorCode === '1') { 
          this.$message.success(response.resultMsg)
        } else {
          this.$message.warning(response.resultMsg)
        }      
      })
      this.$nextTick(_ => {
        this.getList()
      })    
    },    
    // 删除 
    handelDelete(data) {
      this.$confirm('确定要移除课件吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        this.deletedRefCourse(data)

      })
      .catch(() => {
        this.$message({
          type: 'warning',
          message: '操作取消'
        })
        return false
      })      
    },
    deletedRefCourse (data) {
      this.$api.deletedRefCourse({           
          crefId: data.crefId
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
    // 关闭弹窗
    handleClose() {
      this.choiceCoursehDialogVisible = false
      this.$nextTick(_ => {
        this.getList()
      })
    },
    // 返回列表
    gobackList() {
      this.successTipsDialogVisible = false
      this.choiceCoursehDialogVisible = false
      this.$nextTick(_ => {
        this.listQuery.gradeJson = ""
        // this.selectCourseQuery.gradeJson = ""
        this.gradeId = ""
        // this.toGradeId = ""              
        this.getList() 
      })
      
    },
    goCourseSelect(){
      // 继续选课重新刷新数据，清空已选择的数据
      this.successTipsDialogVisible = false
      this.getMyCourseList()
      this.getPublicCourseList()       
      this.$refs.publicCourseMultipleSelection.clearSelection()
      this.$refs.myCourseMultipleSelection.clearSelection()
    },
    // 公共和个人切换
    handleCourseType(tab, event) {
      // console.log(tab, event);
      // this.getCourseList()
    },
    handleAddCourse(){
      this.$router.push({path: '/education/addCourse'})
    },
    handleMyCourse(){
      this.$router.push({path: '/education/myCourse'})
    }                   
  }
}
</script>
<style lang="scss" scoped>
.page-main{
  position: relative;
}
.page-content{
  padding-left: 20px;
  padding-right: 300px;
  min-height: 200px;
  padding-bottom: 20px;
}
.enclosure_revise{
  position: absolute;
  right: 0;
  top: 20px;
  width: 300px;
}
.title{
  text-align: center;
}
</style>
