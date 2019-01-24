<template>
  <div class="page-content-body">
    <!--个人课件-->
    <div class="page-header clearfix">
      <el-form :inline="true" :model="listQuery" ref="form">
        <!--<el-form-item label="组织：" >
          <el-select v-model="listQuery.orgId" placeholder="请选择" class="item-org"  @change="selectOrg">
            <el-option v-for="item in orgList" :key="item.orgId" :label="item.orgName" :value="item.orgId">
            </el-option>
          </el-select>
        </el-form-item>          -->
        <el-form-item label="课件名称：">
          <el-input v-model="listQuery.courseName"  clearable></el-input>
        </el-form-item>          
        <el-form-item>
          <el-button type="primary"  icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-form-item>         
        <div class="btn-group fr">
          <el-button type="primary" icon="el-icon-plus" @click="handleCreate()">添加课件</el-button>
        </div>                        
      </el-form>
    </div>
    <!--  table开始  -->
    <div class="page-main customTable">
      <el-table ref="multipleTable" style="width: 100%" v-loading="loading"  element-loading-text="拼命加载中"
        :data="tableData">
        <el-table-column prop="courseName" label="课件名称" min-width="250" show-overflow-tooltip>
          <template slot-scope="scope"><a href="javascript:;" @click="handleView(scope.row.courseId,scope.row.courseType)">{{scope.row.courseName}}</a></template>
        </el-table-column>
        <el-table-column prop="courseType" label="课件类型" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.courseType === '0'">文档</span>
            <span v-else-if="scope.row.courseType === '1'">图片</span>
            <span v-else-if="scope.row.courseType === '2'">视频</span>
            <span v-else="scope.row.courseType === '3'">音频</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="上传时间" min-width="80" show-overflow-tooltip sortable></el-table-column>
        <!--<el-table-column prop="status" label="共享状态" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if='scope.row.status === "0"' class="green">开放</span>
            <span v-else class="red">私有</span>  
          </template>               
        </el-table-column> -->
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope"> 
            <span class="btn" title="查看"  @click="handleView(scope.row.courseId,scope.row.courseType)"><i class="iconfont icon-view icongreen"></i></span>
            <span class="btn" title="修改"  @click="handleUpdate(scope.row.courseId,scope.row.courseType)">
              <i class="iconfont icon-edit iconblue"></i>
            </span>
            <span class="btn"  @click="handelDelete(scope.row)" title="删除">
              <i class="iconfont icon-del iconred"></i>
            </span>                
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <ui-pagination :total="total" @change="getPages" class="pb60"></ui-pagination>
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
          <!--<div id="txtEditMsg" disabled="disabled" v-html="viewCourseForm.content"></div>-->
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
      <!--<span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="viewCourseDialogVisible = false">关闭</el-button>
      </span>-->
    </el-dialog> 
  </div>
</template>

<script>
// import CKEDITOR from "CKEDITOR"
import ckeditor from 'components/ckeditor/ckeditor'
// const gradeOptions = [{'id':'1','name':'公司级'},{ 'id':'2','name':'项目级'},{'id':'3','name':'土木班'}];
// const statusOptions = [{'id':'0','name':'开'},{ 'id':'1','name':'关'}];  
export default {
  name: 'courseware',
  components:{ ckeditor },// ckeditor组件
  data() {
    return {  
      orgList: [],       
      tableData: [
        // {bianma:'10001',title:'中华人民共和国安全生产法',time:'2018-10-07',status:'0'},
        // {bianma:'10002',title:'中华人民共和国安全生产法',time:'2018-10-07',status:'1'}
      ],      
      listQuery: { 
        // orgId: '',
        type: '2', // 课件类型[非必填项,1为公共课件,2为个人课件,默认为2]
        courseName: '',
        showCount: '',
        courseType: '',
        currentPage: ''           
      }, 
      loading: false,      
      total: 0,
      viewCourseDialogVisible: false,
      viewCourseForm: {
        courseId: '',
        courseName: '',
        courseType: 1,
        content: '',
        attachList: []
      },
      resoureUploadFile: [],      
    }   
  },
  mounted() {
    // this.getEduOrgList()
    this.getList()
  },
  methods: {
    // selectOrg() {
    //   this.getList()
    //   this.courseListQuery.orgId = this.listQuery.orgId
    // },
    // getEduOrgList() {   
    //   this.$api.getEduOrgList().then(response => {     
    //     if (response.errorCode === '1') {          
    //       this.orgList = response.data
    //        // 默认选中第一条数据
    //       this.listQuery.orgId = response.data[0].orgId  
    //       this.getList()          
    //     }      
    //   }) 
    // },
    // 获取列表数据
    getList() {
      this.loading = true
      this.$api.getCourseList(this.listQuery).then(response => {     
        if (response.errorCode === '1') { 
          this.loading = false       
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
        this.listQuery.showCount = pageSize
        this.getList(this.listQuery)
    },     
    // 删除
    handelDelete(data) {
      this.$confirm('确定要移除课件吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        this.deleteCourse(data)
      })
      .catch(() => {
        this.$message({
          type: 'warning',
          message: '操作取消'
        })
        return false
      }) 
    },
    deleteCourse (data) {
      this.$api.deleteCourse({           
          courseId: data.courseId
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
    // 获取信息
    editCoursePage(courseId) {
        this.$api
          .editCoursePage({ courseId: courseId })
          .then(response => {
            if (response.errorCode === '1') {
                this.viewCourseForm.courseId = response.data.courseId;
                this.viewCourseForm.courseName = response.data.courseName;
                this.viewCourseForm.content = response.data.content;
                this.resoureUploadFile = response.data.attachList;
                // CKEDITOR.replace('editor', { toolbarCanCollapse: false, toolbarStartupExpanded: false, toolbar: [], height: '320px', width: '552px' });
                // 访问CKEditor中的iframe，获取里头body元素，直接插入数据，解决直接赋值无效问题
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
    handleView(courseId,courseType) {
      // this.viewCourseDialogVisible = true
      // this.editCoursePage(courseId,courseType)
      switch (courseType) {
        case '0': // 文档
          this.$router.push({
            path: "/education/viewDocCourse",
            query: { id: courseId,courseType:courseType}
          })
              break;
        case '1': // 图片
          this.$router.push({
            path: "/education/viewImgCourse",
            query: { id: courseId,courseType:courseType}
          })
          break;
        case '2': // 视频
          this.$router.push({
            path: "/education/viewVideoCourse",
            query: { id: courseId,courseType:courseType}
          })
          break;
        case '3': // 音频
          this.$router.push({
            path: "/education/viewAudioCourse",
            query: { id: courseId,courseType:courseType}
          })
          break;
      }
    },  
    // 新增课件
    handleCreate() {
      this.$router.push({
        path: "/education/addCourse",
        query: { type:'create'}
      })
    },
    // 编辑课件
    handleUpdate(courseId,courseType) {
      this.$router.push({
        path: "/education/addCourse",
        query: { id: courseId, type:'update',courseType:courseType}
      })
    },
    handleSearch () {
      this.getList()
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
