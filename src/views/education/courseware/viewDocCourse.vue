<template>
  <div class="page-content-body">
    <div class="page-header page-navbar clearfix">
      <div class="ui-title float_l"><span class="iconfont icon-home"></span>课件详情
      </div>
      <el-button type="primary"  icon="el-icon-d-arrow-left" class="float_r" @click="goBack">返回</el-button>
    </div>
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
    if( this.$route.query.type === "1"){
      this.editCoursePage(this.$route.query.courseId)
    }
    // this.editCoursePage(courseId)
  },
  methods: {
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
    // 返回
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss" scoped>
  .page-navbar {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    vertical-align: middle;
    .ui-title{
      padding: 0 10px;
      position: relative;
      border-left: none;
      margin: 0;
      font-size: 16px;
      &:before {
        content: '';
        width: 2px;
        height: 14px;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -7px;
        background: #409EFF;
      }
    }
  }
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
