<template>
  <div class="page-content-body">
    <div class="page-header page-navbar clearfix">
      <div class="ui-title float_l"><span class="iconfont icon-home"></span>{{this.$route.query.type === 'update'?'编辑课件':'添加课件'}}
      <el-button type="text" icon="el-icon-view"  @click="fileFormatDialogVisible = true">查看文件格式标准</el-button>
      </div>
      <el-button type="primary"  icon="el-icon-d-arrow-left" class="float_r" @click="goBack">返回</el-button> 
    </div>
    <div class="page-main" style="width:70%">
      <section  class="dialog-content">
        <div class="ui-form" >
          <el-form ref="addCourseForm" :rules="rules" label-width="100px" :model="addCourseForm" class="flex-form">
            <!--<div class="format">
              <el-button type="primary" icon="el-icon-view"  @click="fileFormatDialogVisible = true">查看文件格式标准</el-button>
              <p>课件格式标准：
                <span class="red">（当前只能导入word文本文档）</span>
              </p>
              <ul>
                <li>1、总标题、编、章标题：小二黑体居中，行前行后各0.5行，单倍行间距，前后无空行；</li>
                <li>2、文号：小四宋体居中，无缩进，行前行后各0行，1.5倍行间距；</li>
                <li>3、正文：小四宋体居左，首行缩进2字符，段前无空格，行前行后各0行，1.5倍行间距；</li>
                <li>4、章、条号后空一格；</li>
                <li>5、行尾无手动换行符；</li>
                <li>6、文头、文尾无空行；</li>
                <li>7、文号与发布文间空一行，发布文与正文间空一行；</li>
                <li>8、只能导入word文本文档。</li>
              </ul>
            </div>-->
            <el-form-item label="课件名称："  class="flex-100" prop="courseName">
              <el-input v-model="addCourseForm.courseName" ></el-input>
            </el-form-item>
            <el-form-item label="课件类型："  class="flex-100" prop="courseType">
              <el-radio-group v-model="addCourseForm.courseType">
                <el-radio :label="1">图文</el-radio>
                <el-radio :label="2">视频</el-radio>
                <el-radio :label="3">音频</el-radio>
              </el-radio-group>
            </el-form-item>            
            <el-form-item label="课件内容："  class="flex-100" prop="content">
              <ckeditor :height="200" :init-data="addCourseForm.content"></ckeditor>
            </el-form-item>
            <el-form-item label="上传附件："  class="flex-100">
              <el-button class="gray fl"  title="上传" @click="handleUploadFile">
                <i class="el-icon-plus"></i>
              </el-button>
              <span class="red pl15">提示：只能上传pdf格式文件！</span>
              <input type="file" name="chapter_pdf[]" ref="pdf" @change="handleFileChange" style="display:none">
              <div v-for="(item,index) in resoureUploadFile" :key="item.name">
                {{item.name}}
                <el-button class="my_button" icon="el-icon-delete" title="删除" @click="handleDeleteFile(item.path, item.attachId, index)" type size="small"></el-button>
              </div>
            </el-form-item>
            <!--<el-form-item label="共享状态："  class="flex-100" prop="queDesc">
              <el-radio-group v-model="status">
                <el-radio :label="1">开放</el-radio>
                <el-radio :label="2">私有</el-radio>
              </el-radio-group>
            </el-form-item>  -->
            <el-form-item>
              <el-button type="primary" @click="handleSubmit">确定</el-button>
            </el-form-item>            
          </el-form>
        </div>      
      </section>
    </div>
    <!-- 弹框 查看文件格式标准-->
    <el-dialog title="文件格式标准" :visible.sync="fileFormatDialogVisible" width="30%" class="my-dialog" center>
      <div class="dialog-content">
        <p>格式标准：
          <span class="red">（当前只能导入word文本文档）</span>
        </p>
        <ul>
          <li>1、总标题、编、章标题：小二黑体居中，行前行后各0.5行，单倍行间距，前后无空行；</li>
          <li>2、文号：小四宋体居中，无缩进，行前行后各0行，1.5倍行间距；</li>
          <li>3、正文：小四宋体居左，首行缩进2字符，段前无空格，行前行后各0行，1.5倍行间距；</li>
          <li>4、章、条号后空一格；</li>
          <li>5、行尾无手动换行符；</li>
          <li>6、文头、文尾无空行；</li>
          <li>7、文号与发布文间空一行，发布文与正文间空一行；</li>
          <li>8、只能导入word文本文档。</li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fileFormatDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>    
  </div>
</template>
<script>
import ckeditor from 'components/ckeditor/ckeditor'
import axios from "axios";
export default {  
  name: 'addCourse',
  components:{ ckeditor },// ckeditor组件
  data() {
    return {
      addCourseForm: {
        courseName: '',
        courseType: 1,
        content: '',
        attachList: []
      },
      content:'',
      resoureUploadFile: [],
      fileFormatDialogVisible: false,
      rules: {
        courseName: [{ required: true, message: '请输入名称', trigger: 'blur'}],
        courseType: [{ required: true, message: '请选择类型', trigger: 'blur'}],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]   
      }               
    }
  },  
  created() {
    if( this.$route.query.type === "update"){
     this.editCoursePage()
    }  
  },
  computed: {
    // type() {
    //   return this.$route.query.type ? "update" : "create";
    // }
  },
  methods: {
    // 获取信息
    editCoursePage() {
        this.$api
          .editCoursePage({ courseId: this.$route.query.id })
          .then(response => {
            if (response.errorCode === '1') {
                this.addCourseForm['courseId'] = response.data.courseId;
                this.addCourseForm.courseName = response.data.courseName;
                this.addCourseForm.content = response.data.content;
                this.resoureUploadFile = response.data.attachList;
                // 访问CKEditor中的iframe，获取里头body元素，直接插入数据，解决直接赋值无效问题
                var _html = this.addCourseForm.content;
                CKEDITOR.instances.editor.setData(_html,{
                  callback:function(){
                   var  _input_value = CKEDITOR.instances.editor.getData();
                    if(_input_value == "") {
                    var  _editor = window.frames[0];//获取iframe对象
                      if(_editor != undefined){
                         _editor.document.body.innerHTML = _html;//访问iframe中的body，并插入html
                        // CKEDITOR.instances.editor.setReadOnly(true);//设置只读
                        CKEDITOR.replace('txtEditMsg', { toolbarCanCollapse: false, toolbarStartupExpanded: false, toolbar: [], height: '320px', width: '552px' });
                      }
                    }
                  }
                });
                // CKEDITOR.instances.editor.setData(this.addCourseForm.content)
            }
          })
    },    
    // 点击上传文件
    handleUploadFile() {
      this.$refs.pdf.value = "";
      this.$refs.pdf.click();
    },
    // 文件改变
    handleFileChange(e) {
      let file = e.target.files[0];
      var size = file.size / 1024; 
      if (this.resoureUploadFile.length >= 10) {
        this.$message({
          message: "附件最多上传10个",
          type: "warning"
        });
        return false;
      }
      if (file && size >10000) {
        this.$message({
          message: "附件大于10MB, 请重新上传！",
          type: "warning"
        });
        return false;
      }
      let formData = new FormData();
      formData.append("file", file);
      formData.append("token", this.getToken());
      formData.append("accessToken", localStorage.getItem("accessToken"));
      // 接口跨域问题
      axios({
          url:
          this.baseURL() + "/jianzhumobile/mobile/eduExam/uploading.do",
          method: "post",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
      })
      .then(response => {
        if (response.data.errorCode === "1") {
          this.$message.success("上传附件成功");
          let itemData = {
            attachId: response.data.data.attachId, 
            name: response.data.data.name, 
            path: response.data.data.path, 
            fileSize: response.data.data.fileSize, 
            filePath: ""
          }
          this.resoureUploadFile.push(itemData);
          this.addCourseForm.attachList = JSON.stringify(this.resoureUploadFile)
          // console.log(response.data)
        } else {
          this.$message.warning(response.data.resultMsg)
        }
      })
      .catch(function(err) {
        console.log(err);
      });

    },
    // 删除文件
    handleDeleteFile(path, attachId, index) {
        this.$api
          .canCelAttach({path: path, attachId: attachId})
          .then(response => {
            if (response.errorCode === '1') {
              this.$message.success(response.resultMsg);
              this.resoureUploadFile.splice(index, 1);
            } else {
              this.$message.error(response.resultMsg);
            }
          });  
    }, 
    // 提交
    handleSubmit() {
      if (this.$route.query.type === "update") {
        this.update();
      } else {
        this.create();
      }
    },
    // 新增课件
    create() {
      // 获取输入内容
      this.addCourseForm.content = CKEDITOR.instances.editor.getData()
      // console.log(this.addCourseForm+"addCourseForm")
       this.$refs.addCourseForm.validate(valid => {
        if (valid) {
          delete this.addCourseForm.courseId
          this.$api.savaeCourse(this.addCourseForm).then(response => {
            if (response.errorCode === '1') {
              this.$message.success(response.resultMsg)
              this.goBack();
            } else {
              this.$message.warning(response.resultMsg)
            }
          })
        }
       })
    }, 
    // 编辑课件
    update() {
      // 获取输入内容
      this.addCourseForm.content = CKEDITOR.instances.editor.getData()
      // console.log(this.addCourseForm.content+"content")
       this.$refs.addCourseForm.validate(valid => {
        if (valid) {
          this.$api.editSaveCourse(this.addCourseForm).then(response => {
            if (response.errorCode === '1') {
              this.$message.success(response.resultMsg)
              this.goBack();
            } else {
              this.$message.warning(response.resultMsg)
            }
          })
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
  section{
    padding-top:20px;
    padding-bottom:20px;
    border-bottom: 1px dashed #ddd;    
  }
  .format{
    border-bottom: 1px dashed #ddd; 
    padding-bottom:20px;
    margin-bottom:20px;
  }
}
</style>