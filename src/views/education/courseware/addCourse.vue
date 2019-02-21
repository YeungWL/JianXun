<template>
  <div class="page-content-body">
    <div class="page-header page-navbar clearfix">
      <div class="ui-title float_l"><span class="iconfont icon-home"></span>{{this.$route.query.type === 'update'?'编辑课件':'添加课件'}}
        <el-button type="text" icon="el-icon-view"  @click="fileFormatDialogVisible = true">查看文件格式标准</el-button>
      </div>
      <el-button type="primary"  icon="el-icon-d-arrow-left" class="float_r" @click="goBack">返回</el-button>
    </div>
    <div class="page-main">
      <section  class="dialog-content">
        <div class="ui-form" >
          <el-form ref="addCourseForm" :rules="rules" label-width="100px" :model="addCourseForm" class="flex-form">
            <el-form-item label="课件名称："  class="flex-100" prop="courseName">
              <el-input v-model="addCourseForm.courseName" ></el-input>
            </el-form-item>
            <el-form-item label="课件类型："  class="flex-100" prop="courseType">
              <el-radio v-model="addCourseForm.courseType" label="0" :disabled="typeDisable">文档</el-radio>
              <el-radio v-model="addCourseForm.courseType" label="1" :disabled="typeDisable">图片</el-radio>
              <el-radio v-model="addCourseForm.courseType" label="2" :disabled="typeDisable">视频</el-radio>
              <el-radio v-model="addCourseForm.courseType" label="3" :disabled="typeDisable">音频</el-radio>
              <!--<el-radio-group v-model="addCourseForm.courseType">-->
                <!--<el-radio :label="0">文档</el-radio>-->
                <!--<el-radio :label="1">图片</el-radio>-->
                <!--<el-radio :label="2">视频</el-radio>-->
                <!--<el-radio :label="3">音频</el-radio>-->
              <!--</el-radio-group>-->
            </el-form-item>
            <div class="el-form-item flex-100" >
              <el-form-item label="课件内容："  class="flex-100" prop="content">
                <ckeditor :height="200" :init-data="addCourseForm.content"></ckeditor>
              </el-form-item>
              <el-form-item label="上传附件："  class="flex-100" v-show="addCourseForm.courseType === '0'">
                <el-button size="small" type="primary" icon="el-icon-plus" @click="handleUploadFile" >点击上传</el-button>
                <!--<el-button class="gray fl"  title="上传" @click="handleUploadFile">-->
                  <!--<i class="el-icon-plus"></i>-->
                <!--</el-button>-->
                <span class="upload_span">提示：附件格式支持doc\docx\xls\xlsx\ppt\pptx\pdf\txt\png\jpg\jpeg\gif\dwg\bmp\tif\cdr\psd\fla\swf\avi\mp4\zip\rar\wav\au\mp3</span>
                <input type="file" name="chapter_pdf[]" ref="pdf" @change="handleFileChange" style="display:none">
                <div v-for="(item,index) in resoureUploadFile" :key="item.name">
                  {{item.name}}
                  <el-button class="my_button" icon="el-icon-delete" title="删除" @click="handleDeleteFile(item.path, item.attachId, index)" type size="small"></el-button>
                </div>
              </el-form-item>
            </div>
            <div class="el-form-item flex-100" v-show="addCourseForm.courseType === '1'">
              <!--上传图片-->
              <el-form-item label="图片："  class="flex-100">
                <div class="upload_warp" v-show="mediaUploadFile.length != 0">
                  <div class="upload_warp_div" v-for="(item,index) of mediaUploadFile" >
                    <img :src="item.filePath" width="100" height="100" v-if="item.filePath != ''&& item.filePath != null">
                    <img :src="item.fileSrc" width="100" height="100" v-else>
                    <textarea v-model="item.attachDesc" placeholder="图片描述:最多可输入128个字符" maxlength="128"></textarea>
                    <input type="number" placeholder="排序号1-10整数" v-model="item.orderNum" @blur="isPositiveInteger(item.orderNum)" min="1" max="10" maxlength="2" >
                    <i class="icon el-icon-error" @click="fileDel(item.path, item.attachId, index)"></i>
                  </div>
                </div>
                <el-button size="small" type="primary"  icon="el-icon-plus"  @click="fileClick" >点击上传</el-button>
                <input type="file" @change="fileChange($event)"  id="upload_file" multiple style="display: none">
                <span class="upload_span">图片支持大小不超过2M，格式为JPG,JPEG,GIF,PNG</span>
              </el-form-item>
              <!--//上传图片-->
            </div>
            <div class="el-form-item flex-100" v-show="addCourseForm.courseType === '2'">
              <!--上传视频-->
              <el-form-item label="视频："  class="flex-100">
                <div class="progress" v-show="isUploadLoading"><i class="icon el-icon-loading"></i>视频上传中...</div>
                <div class="upload_warp" v-show="videoUploadFile.length != 0">
                  <div class="upload_warp_div" v-for="(item,index) of videoUploadFile" >
                    <video :src="item.filePath" width="100" height="100" v-if="item.filePath != ''&& item.filePath != null"></video>
                    <video :src="item.fileSrc" width="100" height="100" v-else></video>
                    <textarea v-model="item.attachDesc" placeholder="视频描述:最多可输入128个字符" maxlength="128"></textarea>
                    <input type="number" placeholder="排序号1-10整数" v-model="item.orderNum" @blur="isPositiveInteger(item.orderNum)" min="1" max="10" maxlength="2" >
                    <i class="icon el-icon-error" @click="videoFileDel(item.path, item.attachId, index)"></i>
                  </div>
                </div>
                <el-button size="small" type="primary"  icon="el-icon-plus"  @click="videoFileClick" >点击上传</el-button>
                <input type="file" @change="videoFileChange($event)"  id="videoUploadFile" multiple style="display: none">
                <span class="upload_span">视频支持大小不超过10M，格式为MP4</span>
              </el-form-item>
              <!--//上传视频-->
            </div>
            <div class="el-form-item flex-100" v-show="addCourseForm.courseType === '3'">
              <!--上传音频-->
              <el-form-item label="音频："  class="flex-100">
                <div class="progress" v-show="isAudioUploadLoading"><i class="icon el-icon-loading"></i>音频上传中...</div>
                <div class="upload_warp" v-show="audioUploadFile.length != 0">
                  <div class="upload_warp_div" v-for="(item,index) of audioUploadFile" >
                    <span class="file-name">{{item.name}}</span>
                    <textarea v-model="item.attachDesc" placeholder="音频描述:最多可输入128个字符" maxlength="128"></textarea>
                    <input type="number" placeholder="排序号1-10整数" v-model="item.orderNum" @blur="isPositiveInteger(item.orderNum)" min="1" max="10" maxlength="2" >
                    <i class="icon el-icon-error" @click="audioFileDel(item.path, item.attachId, index)"></i>
                  </div>
                </div>
                <el-button size="small" type="primary" icon="el-icon-plus"   @click="audioFileClick" >点击上传</el-button>

                <input type="file" @change="audioFileChange($event)"  id="audioUploadFile" multiple style="display: none">
                <span class="upload_span">音频支持大小不超过10M，格式为MP3</span>
              </el-form-item>
              <el-form-item label="音频封面："  class="flex-100">
                <!--<div class="uploadImg" @click="audioFileClick" title="点击上传">-->
                  <!--<i class="el-icon-plus avatar-uploader-icon"></i>-->
                <!--</div>-->
                <user-upload v-if="addCourseForm.logoUrl"
                             :imgSrc="addCourseForm.logoUrl"
                             ref="img"
                             accept="image/*"
                             theme="light"
                             size="small"
                             @onChange="setFileChange"></user-upload>
                <user-upload v-else
                             ref="img"
                             accept="image/*"
                             theme="light"
                             size="small"
                             @onChange="setFileChange"></user-upload>
                <div>点击上图提交要更换的图片</div>
              </el-form-item>
              <!--//上传音频-->
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
  import ckeditor from 'components/ckeditor/ckeditor';
  import axios from "axios";
  import userUpload from 'components/upload/userUpload.vue'
  // import  logoImg from 'assets/images/jianxun_logo.png'
  export default {
    name: 'addCourse',
    components:{ ckeditor,userUpload },//组件
    data() {
      return {
        addCourseForm: {
          courseName: '',
          courseType: '0',// 附件类型[必填项,0普通附件[doc,xls,pdf等word文件],1图片[png,gif,jpge等图片] 2视频[mp4,ogg]，3音频[mp3],默认是0]
          logoUrl: '',//logoUrl 课件封面图或者缩略图
          content: '',
          attachList: [],// 附件
          mediaList: [], // 媒体文件
        },
        logoUrl: '',
        typeDisable: false, // 是否禁止选择课件类型
        courseType: '',// 课件类型
        attachDesc: '',// 附件说明介绍,128字符内
        videoAttachDesc:'',
        audioAttachDesc:'',
        orderNum: '',// 排序号
        content:'',// 课件内容
        resoureUploadFile: [], // 附件文件列表
        mediaUploadFile: [], // 图片文件列表加入本地地址
        videoUploadFile:[],// 视频文件列表加入本地地址
        audioUploadFile:[],// 视频文件列表加入本地地址
        isUploadLoading: false,// 是否正在上传文件
        isAudioUploadLoading: false,// 是否正在上传文件
        fileFormatDialogVisible: false,
        imgList: [], // 本地预览图片课件列表
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
        this.typeDisable = true; // 禁止选择课件类型
      }

    },
    mounted() {
      this.courseType = this.$route.query.courseType
    },
    computed: {

    },
    methods: {
      isPositiveInteger (s){
        // 校验是否为正整数
        let re = /^[1-100]+$/ ;
        if(!re.test(s)){
          this.$message.warning('排序号必须为正整数！')
        };
      },
      // 获取信息
      editCoursePage() {
        let params = {
          courseId: this.$route.query.id,
          courseType: this.$route.query.courseType,
          attachType: 0
        }
        this.$api.editCoursePage(params).then(response => {
          if (response.errorCode === '1') {
            // 页面渲染数据
            this.addCourseForm['courseId'] = response.data.courseId;
            this.addCourseForm.courseName = response.data.courseName;
            this.addCourseForm.courseType = response.data.courseType;
            this.addCourseForm.content = response.data.content;
            this.resoureUploadFile = response.data.attachList;// 文档类型附件

            if (this.addCourseForm.courseType === '1') {
              this.mediaUploadFile = response.data.mediaList;// 图片
            } else if(this.addCourseForm.courseType === '2'){
              this.videoUploadFile = response.data.mediaList;// 视频
            } else if (this.addCourseForm.courseType === '3'){// 音频
              this.addCourseForm.logoUrl = response.data.logoUrl // 获取封面图片
              this.audioUploadFile = response.data.mediaList;// 视频
            }

            // console.log(this.mediaUploadFile);
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
      // 上传普通附件
      handleUploadFile() {
        this.$refs.pdf.value = "";
        this.$refs.pdf.click();
      },
      // 附件提交后台
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
      // 删除附件
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
      // 上传图片
      fileClick(){
        document.getElementById('upload_file').click()
      },
      // 图片本地预览
      fileChange(el){
        if (!el.target.files[0].size) return;
        this.fileList(el.target.files);
        el.target.value = ''
      },
      fileList(files){
        for (let i = 0; i < files.length; i++) {
          this.mediaFileUpload(files[i]);// 上传后台,本地图片预览
          console.log(files[i]);
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
        let size = file.size / 1024;
        if (this.resoureUploadFile.length >= 10) {
          this.$message({
            message: "附件最多上传10个",
            type: "warning"
          });
          return false;
        }
        if (file && size > 2000) {
          this.$message({
            message: "附件大于2MB, 请重新上传！",
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
              orderNum: response.data.data.orderNum, // 排序号
              attachDesc: this.attachDesc,// 附件说明介绍,128字符内
              fileSrc: file.src,// 本地图片地址
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
      // 上传视频
      videoFileClick (){
        document.getElementById('videoUploadFile').click()
      },
      videoFileChange(el) {
        if (!el.target.files[0].size) return;
        this.videoFileList(el.target.files);
        el.target.value = ''
      },
      videoFileList(files){
        for (let i = 0; i < files.length; i++) {
          this.videoFileUpload(files[i]);// 上传后台,本地预览
        }
      },
      getVideoFileURL(file) {
        let getUrl = null;
        if(window.createObjectURL != undefined) { // basic
          getUrl = window.createObjectURL(file);
        } else if(window.URL != undefined) { // mozilla(firefox)
          getUrl = window.URL.createObjectURL(file);
        } else if(window.webkitURL != undefined) { // webkit or chrome
          getUrl = window.webkitURL.createObjectURL(file);
        }
        // console.log(getUrl);
        return getUrl;
      },
      videoFileUpload (file) {
        let size = file.size / 1024;
        if (this.resoureUploadFile.length >= 10) {
          this.$message({
            message: "附件最多上传10个",
            type: "warning"
          });
          return false;
        }
        if (size > 10000) {
          this.$message({
            message: "附件大于10MB, 请重新上传！",
            type: "warning"
          });
          return false;
        }
        this.isUploadLoading = true;
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
            // let xhr = new XMLHttpRequest();
            let mediaItemData = {
              attachId: response.data.data.attachId,
              name: response.data.data.name,
              path: response.data.data.path,
              fileSize: response.data.data.fileSize,
              orderNum: response.data.data.orderNum, // 排序号
              attachDesc: this.videoAttachDesc,// 附件说明介绍,128字符内
              fileSrc: this.getVideoFileURL(file),// 本地预览地址
            }
            this.videoUploadFile.push(mediaItemData);// 本地显示提交后台数据
            this.isUploadLoading = false;
            // xhr.upload.addEventListener('progress', function (e) {
            //   mediaItemData.uploadPercentage = Math.round((e.loaded * 100) / e.total);
            // }, false);
          } else {
            this.$message.warning(response.data.resultMsg)
          }
        })
          .catch(function(err) {
            console.log(err);
          });

      },
      videoFileDel(path, attachId, index) {
        // 取消附件上传
        this.$api.canCelAttach({path: path, attachId: attachId})
          .then(response => {
            if (response.errorCode === '1') {
              this.$message.success(response.resultMsg);
              this.videoUploadFile.splice(index, 1);
            } else {
              this.$message.error(response.resultMsg);
            }
          });
      },
      // 上传音频
      audioFileClick (){
        document.getElementById('audioUploadFile').click()
      },
      audioFileChange(el) {
        if (!el.target.files[0].size) return;
        this.audioFileList(el.target.files);
        el.target.value = ''
      },
      audioFileList(files){
        for (let i = 0; i < files.length; i++) {
          this.audioFileUpload(files[i]);// 上传后台
        }
      },
      audioFileUpload (file) {
        let size = file.size / 1024;
        if (this.resoureUploadFile.length >= 10) {
          this.$message({
            message: "附件最多上传10个",
            type: "warning"
          });
          return false;
        }
        if (size > 10000) {
          this.$message({
            message: "附件大于10MB, 请重新上传！",
            type: "warning"
          });
          return false;
        }
        this.isAudioUploadLoading = true;
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
              orderNum: response.data.data.orderNum, // 排序号
              attachDesc: this.audioAttachDesc,// 附件说明介绍,128字符内
            }
            this.audioUploadFile.push(mediaItemData);// 本地显示提交后台数据
            this.isAudioUploadLoading = false;
          } else {
            this.$message.warning(response.data.resultMsg)
          }
        })
          .catch(function(err) {
            console.log(err);
          });

      },
      audioFileDel(path, attachId, index) {
        // 取消附件上传
        this.$api.canCelAttach({path: path, attachId: attachId})
          .then(response => {
            if (response.errorCode === '1') {
              this.$message.success(response.resultMsg);
              this.audioUploadFile.splice(index, 1);
            } else {
              this.$message.error(response.resultMsg);
            }
          });
      },
      // 上传课件封面
      setFileChange(file, name) {
        let _this = this
        // let imgurl = _this.$refs.img.dataUrl
        // file["src"] =  imgurl
        // console.log(file);
        let formData = new FormData();
        formData.append("file", file);
        formData.append("token", this.getToken());
        formData.append("accessToken", localStorage.getItem("accessToken"));
        axios({
          url: this.baseURL() + "/jianzhumobile/mobile/eduExam/uploadPic.do",
          method: "post",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(response => {
          if (response.data.errorCode === "1") {
            _this.$message.success(response.data.resultMsg)
            _this.logoUrl = response.data.data.path
            console.log(" _this.addCourseForm.logoUrl"+response.data.data.path);
          } else {
            _this.$message.warning(response.data.resultMsg)
          }
        }).catch(error => {
          _this.$message.error(error)
          return false
        })
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
        // console.log(this.addCourseForm.mediaList)
        // 获取输入内容
        this.addCourseForm.content = CKEDITOR.instances.editor.getData()
        // console.log(this.addCourseForm+"addCourseForm")
        this.$refs.addCourseForm.validate(valid => {
          if (valid) {
            if (this.addCourseForm.courseType === '1') { // 图片
              for (let i = 0; i <this.mediaUploadFile.length ; i++) {
                delete this.mediaUploadFile[i].fileSrc // 提交数据移除本地图片预览
              }
              this.addCourseForm.mediaList = JSON.stringify(this.mediaUploadFile);// 获取多媒体文件
            } else if (this.addCourseForm.courseType === '2') {// 视频
              for (let i = 0; i <this.videoUploadFile.length ; i++) {
                delete this.videoUploadFile[i].fileSrc // 提交数据移除本地图片预览
              }
              this.addCourseForm.mediaList = JSON.stringify(this.videoUploadFile);// 获取多媒体文件
            } else if (this.addCourseForm.courseType === '3') {// 音频
              this.addCourseForm.logoUrl = this.logoUrl // 获取封面图片url
              this.addCourseForm.mediaList = JSON.stringify(this.audioUploadFile);// 获取多媒体文件
            } else {
              this.addCourseForm.mediaList = []
            }

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
        // let params = JSON.stringify(this.addCourseForm);
        // console.log(this.addCourseForm.content+"content")
        this.$refs.addCourseForm.validate(valid => {
          if (valid) {

            if (this.addCourseForm.courseType === '1') { // 图片
              for (let i = 0; i <this.mediaUploadFile.length ; i++) {
                delete this.mediaUploadFile[i].fileSrc // 提交数据移除本地图片预览
              }
              this.addCourseForm.mediaList = JSON.stringify(this.mediaUploadFile);// 获取多媒体文件
            } else if (this.addCourseForm.courseType === '2') {// 视频
              for (let i = 0; i <this.videoUploadFile.length ; i++) {
                delete this.videoUploadFile[i].fileSrc // 提交数据移除本地图片预览
              }
              this.addCourseForm.mediaList = JSON.stringify(this.videoUploadFile);// 获取多媒体文件
            } else if (this.addCourseForm.courseType === '3') {// 音频
              this.addCourseForm.logoUrl = this.logoUrl // 获取封面图片url
              this.addCourseForm.mediaList = JSON.stringify(this.audioUploadFile);// 获取多媒体文件
            } else {
              this.addCourseForm.mediaList = []
            }

            // console.log(this.addCourseForm.mediaList)
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
    width: 80%;
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
  .progress {
    width: 100px;
  }
  .uploadImg{
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
  .upload_warp{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    .upload_warp_div{
      width: 100%;
      margin-right: 10px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      div {
        display: inline-block;
      }
      .icon{
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
      .file-name {
        margin-right: 10px;
        display: inline-block;
        width: 300px;
        line-height: 20px;
      }
      img,video,audio{
        margin-right: 10px;
        width:100px;
        display: inline-block;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
      }
      textarea{
        margin-right: 10px;
        height: 70px;
        line-height: 20px;
        width: 300px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        padding: 5px;
        resize: none;
      }
      input {
        width: 100px;
        height: 30px;
        margin-right: 10px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        padding: 5px;
      }
    }
  }

</style>
