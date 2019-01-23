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
            <el-form-item label="课件名称："  class="flex-100" prop="courseName">
              <el-input v-model="addCourseForm.courseName" ></el-input>
            </el-form-item>
            <el-form-item label="课件类型："  class="flex-100" prop="courseType">
              <el-radio-group v-model="addCourseForm.courseType">
                <el-radio :label="0">文档</el-radio>
                <el-radio :label="1">图片</el-radio>
                <el-radio :label="2">视频</el-radio>
                <el-radio :label="3">音频</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="el-form-item flex-100" >
              <el-form-item label="课件内容："  class="flex-100" prop="content">
                <ckeditor :height="200" :init-data="addCourseForm.content"></ckeditor>
              </el-form-item>
              <el-form-item label="上传附件："  class="flex-100" v-show="addCourseForm.courseType === 0">
                <el-button class="gray fl"  title="上传" @click="handleUploadFile">
                  <i class="el-icon-plus"></i>
                </el-button>
                <span class="red pl15">提示：附件为word/excel/pdf/jpg格式，视频为mp4</span>
                <input type="file" name="chapter_pdf[]" ref="pdf" @change="handleFileChange" style="display:none">
                <div v-for="(item,index) in resoureUploadFile" :key="item.name">
                  {{item.name}}
                  <el-button class="my_button" icon="el-icon-delete" title="删除" @click="handleDeleteFile(item.path, item.attachId, index)" type size="small"></el-button>
                </div>
              </el-form-item>
            </div>
            <div class="el-form-item flex-100" v-show="addCourseForm.courseType === 1">
              <!--图片功能正在开发中，敬请期待！-->
              <el-form-item label="图片："  class="flex-100" >
                <div class="upload_warp_img" v-show="mediaUploadFile.length!=0">
                  <div class="upload_warp_img_div" v-for="(item,index) of mediaUploadFile" >
                    <img :src="item.fileSrc" width="100" height="100">
                    <textarea v-model="item.attachDesc" placeholder="图片描述:最多可输入128个字符" maxlength="128"></textarea>
                    <i class="icon el-icon-error" @click="fileDel(item.path, item.attachId, index)"></i>
                  </div>
                </div>
                <div class="uploadImg" @click="fileClick">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <input type="file" @change="fileChange($event)"  id="upload_file" multiple style="display: none">
                <!--<span class="upload_span">图片支持大小不超过5M的JPG,GIF,PNG图片上传</span>-->
              </el-form-item>
            </div>
            <div class="el-form-item flex-100" v-show="addCourseForm.courseType === 2">
              <!--视频功能正在开发中，敬请期待！-->
            </div>
            <div class="el-form-item flex-100" v-show="addCourseForm.courseType === 3">
              <!--音频功能正在开发中，敬请期待！-->
            </div>
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
          courseType: 0,// 附件类型[必填项,0普通附件[doc,xls,pdf等word文件],1图片[png,gif,jpge等图片] 2视频[mp4,ogg]，3音频[mp3],默认是0]
          content: '',
          attachList: [],// 附件
          mediaList: [], // 媒体文件
        },
        attachDesc: '',// 附件描述
        content:'',// 课件内容
        resoureUploadFile: [], // 附件文件列表
        mediaUploadFile: [], // 媒体文件列表加入本地图片地址
        mediaAttachList: [], // 媒体附件列表
        fileFormatDialogVisible: false,
        imgList: [], // 本地预览图片课件列表
        size: 0, // 图片课件大小
        rules: {
          courseName: [{ required: true, message: '请输入名称', trigger: 'blur'}],
          courseType: [{ required: true, message: '请选择类型', trigger: 'blur'}],
          content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
        }
      }
    },
    created() {

    },
    mounted() {
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
        let params = {
          courseId: this.$route.query.id,
          attachType: 0,
          attachTypeMedia: 1,
        }
        this.$api.editCoursePage(params).then(response => {
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
                            CKEDITOR.replace('txtEditMsg', {
                              toolbarCanCollapse: false, toolbarStartupExpanded: false, toolbar: [], height: '320px', width: '552px'
                            });
                          }
                        }
                      }
                    });
                    // CKEDITOR.instances.editor.setData(this.addCourseForm.content)
                  }
                })
      },
      // 点击上传附件
      handleUploadFile() {
        this.$refs.pdf.value = "";
        this.$refs.pdf.click();
      },
      // 附件文件改变
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
          url:this.baseURL() + "/jianzhumobile/mobile/eduExam/uploading.do",
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
              // filePath: "",
              // attachDesc:"",// 附件说明介绍,128字符内
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
      // 删除附件文件
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
      // 选择本地媒体文件
      fileClick(){
        document.getElementById('upload_file').click()
      },
      // 媒体课件本地预览
      fileChange(el){
        if (!el.target.files[0].size) return;
        this.fileList(el.target.files);
        el.target.value = ''
      },
      fileList(files){
        for (let i = 0; i < files.length; i++) {
          this.mediaFileUpload(files[i]);// 上传后台,本地图片预览
          // console.log(files[i]);
          this.fileAdd(files[i]);// 本地预览
        }
      },
      fileAdd (file){
        // this.size = this.size + file.size;//总大小
        let reader = new FileReader();
        reader.vue = this;
        reader.readAsDataURL(file);
        reader.onload = function () {
          file.src = this.result;
          this.vue.imgList.push({
            file
          });
        }
      },
      mediaFileUpload (file) {
        var size = file.size / 1024;
        if (this.resoureUploadFile.length >= 10) {
          this.$message({
            message: "附件最多上传10个",
            type: "warning"
          });
          return false;
        }
        if (file && size > 5000) {
          this.$message({
            message: "附件大于5MB, 请重新上传！",
            type: "warning"
          });
          return false;
        }
        let formData = new FormData();
        formData.append("file", file);
        formData.append("attachType", this.addCourseForm.courseType);
        formData.append("attachDesc", this.addCourseForm.attachDesc);
        formData.append("token", this.getToken());
        formData.append("accessToken", localStorage.getItem("accessToken"));
        // console.log(formData);

        // 接口跨域问题
        axios({
          url: this.baseURL() + "/jianzhumobile/mobile/eduExam/uploading.do",
          method: "post",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(response => {
          if (response.data.errorCode === "1") {
            this.$message.success("上传媒体文件成功");

            let mediaItemData = {
              attachId: response.data.data.attachId,
              name: response.data.data.name,
              path: response.data.data.path,
              fileSize: response.data.data.fileSize,
              fileSrc: file.src,// 本地图片地址
              orderNum: response.data.data.orderNum,
              attachDesc: this.attachDesc,// 附件说明介绍,128字符内
            }
            this.mediaUploadFile.push(mediaItemData);// 本地显示提交后台数据

          } else {
            this.$message.warning(response.data.resultMsg)
          }
        })
        .catch(function(err) {
          console.log(err);
        });

      },
      fileDel(path, attachId, index) {
        // 取消附件上传
        this.$api
                .canCelAttach({path: path, attachId: attachId})
                .then(response => {
                  if (response.errorCode === '1') {
                    this.$message.success(response.resultMsg);
                    this.mediaUploadFile.splice(index, 1);
                    // this.size = this.size - this.imgList[index].file.size;//总大小
                    // this.imgList.splice(index, 1);// 删除本地预览
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
        this.addCourseForm.mediaList = JSON.stringify(this.mediaUploadFile);
        console.log(this.addCourseForm.mediaList)
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
    }
    .format{
      border-bottom: 1px dashed #ddd;
      padding-bottom:20px;
      margin-bottom:20px;
    }
  }
  .uploadImg{
    float: left;
    width:100px;
    height:100px;
    border:#ccc dashed 1px;
    display: block;
    .avatar-uploader-icon{
      position: relative;
      top: 0px;
      left: 0px;
    }
  }
  .upload_warp_img{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    .upload_warp_img_div{
      width: 100%;
      margin-right: 10px;
      margin-bottom: 10px;
      position: relative;
      div {
        display: inline-block;
      }
      .icon{
        position: absolute;
        right: -8px;
        top: 50%;
        margin-top: -20px;
        color: red;
        font-size: 20px;
        background:#fff;
        border-radius: 100%;
        display: none;
        cursor: pointer;
      }
      &:hover .icon{
        display: block;
      }
      img{
        width:100px;
        display: inline-block;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
      }
      textarea{
        height: 100px;
        width: 300px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        padding: 5px;
        resize: none;
      }
    }
  }
</style>