<template>
  <div class="page-content-body">
    <div class="page-header page-navbar clearfix">
      <div class="ui-title float_l"><span class="iconfont icon-home"></span>{{this.$route.query.type === 'update'?'编辑内容':'添加内容'}}
      <el-button type="text" icon="el-icon-view"  @click="fileFormatDialogVisible = true">查看文件格式标准</el-button>
      </div>
      <el-button type="primary"  icon="el-icon-d-arrow-left" class="float_r" @click="goBack">返回</el-button> 
    </div>
    <div class="page-main" style="width:70%">
      <section  class="dialog-content">
        <div class="ui-form" >
          <el-form ref="addContentForm" :rules="rules" label-width="100px" :model="addContentForm" class="flex-form">
            <el-form-item label="内容标题："  class="flex-100" prop="title">
              <el-input v-model="addContentForm.title" ></el-input>
            </el-form-item>
            <el-form-item label="归属栏目" prop="columnId">
              <select-column-tree v-model="addContentForm.columnId" :treeData="treeData" @changePid="changePid"></select-column-tree>
            </el-form-item>
            <el-form-item label="内容类型："  class="flex-100" prop="type">
              <el-radio-group v-model="addContentForm.type">
                <el-radio :label="1" :disabled="typeDisable">内容文章</el-radio>
                <el-radio :label="2" :disabled="typeDisable">外链文章</el-radio>
                <el-radio :label="3" :disabled="typeDisable">广告位</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="el-form-item flex-100" v-show="addContentForm.type === 1">
              <el-form-item label="内容："  class="flex-100" prop="content" v-if="addContentForm.type === 1" :rules="addContentForm.type === 1?[{ required: true, message: '请输入内容', trigger: 'blur'}]:rules.content">
                <ckeditor :height="200" :init-data="addContentForm.content"></ckeditor>
              </el-form-item>
            </div>
            <div class="el-form-item flex-100">
               <!--外链内容URL功能正在开发中，敬请期待！-->
                 <el-form-item label="外链内容url"  class="flex-100" prop="hrefUrl" v-if="addContentForm.type === 2" :rules="addContentForm.type === 2?[{ required: true, message: '请输入url', trigger: 'blur'}]:rules.hrefUrl">
                    <el-input type="text" v-model="addContentForm.hrefUrl" ></el-input>
                  </el-form-item>
            </div>
            <div class="el-form-item flex-100" v-show="addContentForm.type === 3">
               <!--广告位功能正在开发中，敬请期待！-->
            </div>
            <div class="el-form-item flex-100">
              <el-form-item label="摘要：" class="flex-100" prop="summary" >
                <textarea v-model="addContentForm.summary" placeholder="最多可输入128个字符" maxlength="128"></textarea>
              </el-form-item>
            </div>
            <el-form-item label="发布者：" prop="publisher">
              <el-input v-model="addContentForm.publisher" ></el-input>
            </el-form-item>
            <el-form-item label="缩略图："  prop="imageUrl" class="flex-100">
              <user-upload v-if="addContentForm.imageUrl"
                           :imgSrc="addContentForm.imageUrl"
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
              <!--<div>点击上图提交要更换的图片</div>-->
            </el-form-item>
            <el-form-item label="上传附件："  class="flex-100" >
              <el-button size="small" type="primary" icon="el-icon-plus" @click="handleUploadFile" >点击上传</el-button>
              <span class="upload_span">提示：附件格式支持doc\docx\xls\xlsx\ppt\pptx\pdf\txt\png\jpg\jpeg\gif\dwg\bmp\tif\cdr\psd</span>
              <input type="file" name="chapter_pdf[]" ref="pdf" @change="handleFileChange" style="display:none">
              <div v-for="(item,index) in resoureUploadFile" :key="item.name">
                {{item.name}}
                <el-button class="my_button" icon="el-icon-delete" title="删除" @click="handleDeleteFile(item.path, item.attachId, index)" type size="small"></el-button>
              </div>
            </el-form-item>
            <el-form-item   class="flex-100">
              <el-button type="primary" @click="handleSubmit">确定</el-button>
               <el-button @click="goBack">取消</el-button>
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
import ckeditor from 'components/ckeditor/ckeditor';// ckeditor组件
import selectColumnTree from 'components/treecomponents/selectColumnTree.vue';// 选择上级栏目
import axios from "axios";
import userUpload from 'components/upload/userUpload.vue'
export default {  
  name: 'addContent',
  components:{ ckeditor, selectColumnTree, userUpload },
  data() {
    return {
      addContentForm: {
        contentId:'',
        title: '',
        summary:'', // 内容摘要
        type: 1,
        columnId:'',
        content: '',
        hrefUrl:'', // 外链内容地址
        imageUrl: '', // 缩略图
        publisher:'',
        attachList: []
      },
      imageUrl:'',
      typeDisable: false,
      treeData: [], // 全部栏目
      resoureUploadFile: [],
      fileFormatDialogVisible: false,
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur'}],
        columnId: [{ required: true, message: '请选择归属栏目', trigger: 'change'}],
        type: [{ required: true, message: '请选择类型', trigger: 'blur'}],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        publisher: [{ required: true, message: '请输入发布者', trigger: 'blur' }],
        hrefUrl: [{ required: true, message: '请输入URL', trigger: 'blur' }],
      }               
    }
  },  
  created() {

  },
  mounted() {
    this.getMenuList(); // 获取所有栏目
    if( this.$route.query.type === "update"){
     this.getContentInfo()
      this.typeDisable = true; // 禁止选择课件类型
    }  
  },
  computed: {
  },
  methods: {
    // 获取所有栏目数据
    getMenuList() {
      this.$api.columnListAll().then(response => {
        if (response.errorCode === '1') {
          this.treeData = response.data;
        }
      })
    },
    // 获取选中栏目的id
    changePid(val) {
      // console.log("columnId："+ val.id)
      this.addContentForm.columnId = val.id
    },
    // 获取信息
    getContentInfo() {
        this.$api
          .getContentInfo({ contentId: this.$route.query.id })
          .then(response => {
            if (response.errorCode === '1') {
                this.addContentForm.contentId = response.data.id;
                this.addContentForm.columnId = response.data.columnId;
                this.addContentForm.title = response.data.title;
                this.addContentForm.publisher = response.data.publisher;
                this.addContentForm.content = response.data.content;
                this.addContentForm.type = response.data.type;
                this.addContentForm.imageUrl = response.data.imagePath;
                this.addContentForm.hrefUrl= response.data.hrefUrl;
                this.addContentForm.summary = response.data.summary;
                this.resoureUploadFile = response.data.attachList;
                // 访问CKEditor中的iframe，获取里头body元素，直接插入数据，解决直接赋值无效问题
                var _html = this.addContentForm.content;
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
                // CKEDITOR.instances.editor.setData(this.addCententForm.content)
            } else {
              this.$message.warning(response.data.resultMsg)
            }
          })
    },
    // 上传缩略图
    setFileChange(file, name) {
      let _this = this
      let formData = new FormData();
      formData.append("file", file);
      formData.append("token", this.getToken());
      formData.append("accessToken", localStorage.getItem("accessToken"));
      axios({
        url: this.baseURL() + "/jianzhumobile/mobile/cms/uploadPic.do",
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(response => {
        if (response.data.errorCode === "1") {
          _this.$message.success(response.data.resultMsg)
          _this.imageUrl = response.data.data.path
          // _this.addContentForm.imageUrl = response.data.data.path // 获取缩略图url
          console.log("imageUrl"+ _this.imageUrl);
        } else {
          _this.$message.warning(response.data.resultMsg)
        }
      }).catch(error => {
        console.log(error)
        return false
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
      let size = file.size / 1024;
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
      formData.append("attachDesc", '');
      formData.append("token", this.getToken());
      formData.append("accessToken", localStorage.getItem("accessToken"));
      console.log(formData);
      // 接口跨域问题
      axios({
          url:
          this.baseURL() + "/jianzhumobile/mobile/cms/uploading.do",
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
            // filePath: ""
          }
          this.resoureUploadFile.push(itemData);
          this.addContentForm.attachList = JSON.stringify(this.resoureUploadFile)
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
          .contentCancelAttach({path: path, attachId: attachId})
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
      this.addContentForm.content = CKEDITOR.instances.editor.getData()
      // console.log(this.addContentForm)
       this.$refs.addContentForm.validate(valid => {
        if (valid) {
          this.addContentForm.imageUrl = this.imageUrl // 获取缩略图url
          delete this.addContentForm.contentId
          this.$api.contentAdd(this.addContentForm).then(response => {
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
      this.addContentForm.content = CKEDITOR.instances.editor.getData()
      // console.log(this.addCententForm.content+"content")
       this.$refs.addContentForm.validate(valid => {
        if (valid) {
          this.addContentForm.imageUrl = this.imageUrl // 获取缩略图url
          this.$api.contentEdit(this.addContentForm).then(response => {
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
}
</style>
