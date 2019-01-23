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
          <el-form ref="addCententForm" :rules="rules" label-width="100px" :model="addCententForm" class="flex-form">
            <el-form-item label="内容标题："  class="flex-100" prop="title">
              <el-input v-model="addCententForm.title" ></el-input>
            </el-form-item>
            <el-form-item label="归属栏目" prop="parentId">
              <root-tree v-model="addCententForm.parentId" :treeData="treeData" @changePid="changePid"></root-tree>
              <span class="gray">若不选，则是一级栏目</span>
            </el-form-item> 
            <el-form-item label="内容类型："  class="flex-100" prop="type">
              <el-radio-group v-model="addCententForm.type">
                <el-radio :label="1">内容文章</el-radio>
                <el-radio :label="2">外链内容</el-radio>
                <el-radio :label="3">广告位</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="el-form-item flex-100" v-show="addCententForm.type === 1">    
              <el-form-item label="内容："  class="flex-100" prop="content">
                <ckeditor :height="200" :init-data="addCententForm.content"></ckeditor>
              </el-form-item>
            </div>
            <div class="el-form-item flex-100" v-show="addCententForm.type === 2"> 
               <!--外链内容URL功能正在开发中，敬请期待！-->
                 <el-form-item label="外链内容URL"  class="flex-100" prop="url">
                    <el-input type="text" v-model="addCententForm.url"></el-input>
                  </el-form-item>
            </div>
            <div class="el-form-item flex-100" v-show="addCententForm.type === 3"> 
               <!--广告位功能正在开发中，敬请期待！-->
            </div>
            <el-form-item label="发布者：" prop="author">
              <el-input v-model="addCententForm.author" ></el-input>
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
import rootTree from 'components/treecomponents/rootTree.vue';// 选择上级栏目组件
import axios from "axios";
export default {  
  name: 'addCentent',
  components:{ ckeditor, rootTree },
  data() {
    return {
      addCententForm: {
        title: '',
        type: 1,
        parentId:'0',
        content: '',
        author:'',
        attachList: []
      },
      treeData: [], // 全部栏目
      content:'',
      resoureUploadFile: [],
      fileFormatDialogVisible: false,
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur'}],
        type: [{ required: true, message: '请选择类型', trigger: 'blur'}],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        author: [{ required: true, message: '请输入发布者', trigger: 'blur' }]  
      }               
    }
  },  
  created() {

  },
  mounted() {
    this.getMenuList(); // 获取所有栏目
    if( this.$route.query.type === "update"){
     this.editCenterPage()
    }  
  },
  computed: {
    // type() {
    //   return this.$route.query.type ? "update" : "create";
    // }
  },
  methods: {
    // 获取信息
    editCenterPage() {
        this.$api
          .editCenterPage({ courseId: this.$route.query.id })
          .then(response => {
            if (response.errorCode === '1') {
                this.addCententForm['courseId'] = response.data.courseId;
                this.addCententForm.courseName = response.data.courseName;
                this.addCententForm.content = response.data.content;
                this.resoureUploadFile = response.data.attachList;
                // 访问CKEditor中的iframe，获取里头body元素，直接插入数据，解决直接赋值无效问题
                var _html = this.addCententForm.content;
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
          this.addCententForm.attachList = JSON.stringify(this.resoureUploadFile)
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
      this.addCententForm.content = CKEDITOR.instances.editor.getData()
      // console.log(this.addCententForm+"addCententForm")
       this.$refs.addCententForm.validate(valid => {
        if (valid) {
          delete this.addCententForm.courseId
          this.$api.savaeCourse(this.addCententForm).then(response => {
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
      this.addCententForm.content = CKEDITOR.instances.editor.getData()
      // console.log(this.addCententForm.content+"content")
       this.$refs.addCententForm.validate(valid => {
        if (valid) {
          this.$api.editSaveCourse(this.addCententForm).then(response => {
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
    // 获取所有栏目
    getMenuList() {
      let params = {   
        menuName: '',
        menuCode:'',
        parentId: '',
        isLeaf: '2' 
      }
      this.$api.menuList(params).then(response => {
        this.treeData = response.data;
      })
    },
    // 获取选中栏目的数据
    changePid(val) {
      // console.log("menuId："+ val.menuId)
      this.menuForm.parentId = val.menuId
    },
    // 获取点击的栏目父级id，更新右侧列表数据  
    getChannelId(data, node) { 
      this.listQuery.parentId = data.id
      this.menuForm.parentId = data.id
      this.getList(this.listQuery)
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
</style>