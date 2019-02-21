<template>
  <div class="page-content-body">
      <div class="page-header clearfix">
        <el-form class="search-form" :inline="true" :model="listQuery" ref="form">
          <el-form-item label="组织：" >
            <el-select v-model="listQuery.orgId" placeholder="请选择" class="item-org">
              <el-option v-for="item in orgList" :key="item.orgId" :label="item.orgName" :value="item.orgId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课件编码：">
            <el-input v-model="listQuery.bianma" clearable></el-input>
          </el-form-item>
          <el-form-item label="课件名称：">
            <el-input v-model="listQuery.title" clearable></el-input>
          </el-form-item>          
          <el-form-item label="级别：">
            <el-select v-model="listQuery.grade" placeholder="请选择" >
              <el-option v-for="item in gradeArr" :key="item.id" :label="item.name" :value="item.id">
                <span>{{item.name}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="listQuery.status" placeholder="请选择">
              <el-option v-for="item in statusArr" :key="item.id" :label="item.name" :value="item.id">
                <span>{{item.name}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  icon="el-icon-search">搜索</el-button>
          </el-form-item>         
          <div class="btn-group fr">
            <el-button type="primary" icon="el-icon-plus" @click="handleChoiceCourse">选课</el-button>
          </div>                        
        </el-form>
      </div>
      <!--  table开始  -->
      <div class="page-main customTable">
        <el-table ref="multipleTable" style="width: 100%" v-loading="loading"  element-loading-text="拼命加载中"
          :data="tableData">
          <!--<el-table-column type="selection" min-width="57"></el-table-column>-->
          <el-table-column prop="bianma" label="课件编码" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="title" label="课件名称" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="grade" label="级别" min-width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if='scope.row.status === "0"' class="green">开</span>
              <span v-else class="red">关</span>  
            </template>               
          </el-table-column> 
          <el-table-column label="操作" min-width="120">
            <template slot-scope="scope"> 
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
          <el-form :inline="true" :model="listQuery" class='my-form search-form'>
            <el-form-item label="课件名称：">
              <el-input v-model="listQuery.title" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  icon="el-icon-search" >搜索</el-button>
            </el-form-item>        
          </el-form>
          <el-tabs v-model="activeName" @tab-click="handleCourseType">
            <!--公共课件-->
            <el-tab-pane label="公共课件" name="first">
              <div class="customTable">
                <el-table ref="multipleTable" style="width: 100%" v-loading="loading"  element-loading-text="拼命加载中"
                  :data="courseTableData">
                  <el-table-column type="selection" min-width="57"></el-table-column>
                  <el-table-column prop="title" label="课件名称" min-width="180" show-overflow-tooltip></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <!--我的课件-->
            <el-tab-pane label="我的课件" name="second">
             <div class="customTable">
               <el-table ref="multipleTable" style="width: 100%" v-loading="loading"  element-loading-text="拼命加载中"
                  :data="courseTableData">
                <el-table-column type="selection" min-width="57"></el-table-column>
                <el-table-column prop="title" label="课件名称" min-width="180" show-overflow-tooltip></el-table-column>
               </el-table>
             </div>
             <div class="btn-group mt20">          
                <el-button type="primary" icon="el-icon-plus" @click="handleChoiceCourse">添加</el-button>
                <el-button type="success" icon="el-icon-edit" @click="handleChoiceCourse">维护</el-button>
              </div>              
            </el-tab-pane>
          </el-tabs>

          <el-form ref="form"  :inline="true"  v-model="listQuery" class='mt20'>
            <el-form-item label="匹配给：">
              <el-select v-model="listQuery.grade" placeholder="请选择" >
                <el-option v-for="item in gradeArr" :key="item.id" :label="item.name" :value="item.id">
                  <span>{{item.name}}</span>
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
        <el-button type="primary" @click="successTipsDialogVisible = false">继续选课</el-button>
      </span>
    </el-dialog>    

  </div>
</template>

<script>
const gradeOptions = [{'id':'1','name':'公司级'},{ 'id':'2','name':'项目级'},{'id':'3','name':'土木班'}];
const statusOptions = [{'id':'0','name':'开'},{ 'id':'1','name':'关'}];  
export default {
  name: 'courseware',
  data() {
    return {
      orgList: [
        {orgId:'1',orgName:'中铁一局集团广州市轨道交通二十一号线工程施工20标项目经理部'},
        {orgId:'2',orgName:'中铁十六局集团广州市轨道交通二十一号线工程施工16标项目经理部'}
      ],          
      tableData: [
        {bianma:'10001',title:'中华人民共和国安全生产法',grade:'公司级',status:'0'},
        {bianma:'10002',title:'中华人民共和国安全生产法',grade:'项目部级',status:'1'}
      ],      
      listQuery: { 
        orgId: '',
        bianma: '',  
        title: '',
        grade: '',
        status: '',
        showCount: '',
        currentPage: ''           
      }, 
      gradeArr: gradeOptions,
      statusArr: statusOptions,
      loading: false,      
      total: 0,
      choiceCoursehDialogVisible: true,
      successTipsDialogVisible: false,
      activeName: 'first',
      // 公共课件，我的课件列表
      courseTableData:[
        {bianma:'10001',title:'中华人民共和国安全生产法',grade:'公司级',status:'0'},
        {bianma:'10002',title:'中华人民共和国安全生产法',grade:'项目部级',status:'1'}
      ],
    }   
  },
  created() {

  },
  methods: { 
    getPages(currentPage, pageSize) {
        // 获取翻页数据
        this.listQuery.currentPage = currentPage
        this.listQuery.showCount = pageSize
        // this.getList(this.listQuery)
    },
    // 分页
    handlePageChange(val) {
      this.listQuery.currentPage = val
      // this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      // this.getList()
    },     
    // 删除
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
    // 选课
    handleChoiceCourse() {
      this.choiceCoursehDialogVisible = true;
    },
    choiceCourse() {
      this.successTipsDialogVisible = true;
    },
    // 关闭弹窗
    handleClose() {
      this.choiceCoursehDialogVisible = false
    },
    // 放回列表
    gobackList() {
      this.successTipsDialogVisible = false;
      this.choiceCoursehDialogVisible = false
    },
    handleCourseType(tab, event) {
      console.log(tab, event);
    }                  
  }
}
</script>
<style lang="scss" scoped>
</style>
