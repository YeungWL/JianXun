<template>
  <div class="page-content-body">
    <div class="page-header page-navbar clearfix">
      <div class="ui-title float_l"><span class="iconfont icon-home"></span>添加课件</div>
      <el-button type="primary"  icon="el-icon-d-arrow-left" class="float_r" @click="goBack">返回</el-button> 
    </div>
    <div class="page-main" style="width:70%">
      <section  class="dialog-content">
        <div class="ui-form" >
          <el-form ref="questionForm" :rules="rules" label-width="100px" :model="questionForm" class="flex-form">
            <div class="format">
              <i class="el-icon-arrow-down"></i>
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
            </div>            
            <el-form-item label="课件名称："  class="flex-100" prop="title">
              <el-input v-model="questionForm.title" ></el-input>
            </el-form-item>
            <el-form-item label="课件类型："  class="flex-100" prop="queDesc">
              <el-radio-group v-model="type">
                <el-radio :label="1">图文</el-radio>
                <el-radio :label="2">视频</el-radio>
                <el-radio :label="3">音频</el-radio>
              </el-radio-group>
            </el-form-item>            
            <el-form-item label="课件内容："  class="flex-100" prop="requireTime">
              <el-input v-model="questionForm.requireTime"  placeholder="天"></el-input>
            </el-form-item>
            <el-form-item label="上传附件："  class="flex-100" prop="questionAttr">
              <el-select v-model="questionForm.questionAttr" placeholder="请选择">
                <el-option
                  v-for="item in questionAttrOptions"
                  :key="item.bianma"
                  :label="item.name"
                  :value="item.bianma">
                </el-option>
              </el-select>              
            </el-form-item>
            <el-form-item label="共享状态："  class="flex-100" prop="queDesc">
              <el-radio-group v-model="status">
                <el-radio :label="1">开放</el-radio>
                <el-radio :label="2">私有</el-radio>
              </el-radio-group>
            </el-form-item>  
            <el-form-item>
              <el-button type="primary" @click="handleSubmit">确定</el-button>
            </el-form-item>            
          </el-form>
        </div>      
      </section>

    </div>
  </div>
</template>
<script>
export default {  
  name: 'addCheckupQuestion',
  data() {
    return {
      type: 1,
      status: 1,
      questionForm: {
        projectId: this.$route.query.projectId,
        orgId: this.$route.query.orgId,
        title: '',
        queDesc: '',
        requireTime: '',
        questionAttr: '',
        checkType: '',
        pictureJson: []
      },
      questionAttrOptions: [],
      checkTypeOptions: [],
      imgList: [],
      size: 0,
      rules: {
        title: [{ required: true, message: '请输入问题名称', trigger: 'blur'}],
        queDesc: [{ required: true, message: '请输入问题描述', trigger: 'blur'}],
        requireTime: [{ required: true, message: '请输入要求时间', trigger: 'blur' }],
        questionAttr: [{ required: true, message: '请选择问题属性', trigger: 'change'}],
        checkType: [{ required: true, message: '请选择检查类型', trigger: 'change'}]     
      }               
    }
  },
  mounted() {
    this.getQuestionAttr()
    this.getCheckupType()      
  },  
  created() {
  },
  methods: {
    // 获取问题属性列表
    getQuestionAttr() {
      this.$api.questionAttr().then(response => {     
        if (response.errorCode === '1') {           
          this.questionAttrOptions = response.data
        }      
      })    
    },
    // 获取检查类别列表
    getCheckupType() {
      this.$api.checkupType().then(response => {     
        if (response.errorCode === '1') {           
          this.checkTypeOptions = response.data
        }      
      })    
    }, 
    // 选择本地图片
    fileClick(){
        document.getElementById('upload_file').click()
    },    
    //本地预览
    fileChange(el){
        if (!el.target.files[0].size) return;
        this.fileList(el.target.files);
        el.target.value = ''
    },
    fileList(files){
        for (let i = 0; i < files.length; i++) {
            this.fileAdd(files[i]);
        }
    },
    fileAdd(file){
        this.size = this.size + file.size;//总大小
        let reader = new FileReader();
        reader.vue = this;
        reader.readAsDataURL(file);
        reader.onload = function () {
            file.src = this.result;
            this.vue.imgList.push({
                file
            });
            // console.log("this.imgList"+this.vue.imgList)
            let pictureListArr = []
            for (let i = 0; i < this.vue.imgList.length; i++) {
                pictureListArr.push({
                  pictureUrl: this.vue.imgList[i].file.src.replace(/^data:image\/(jpeg|png|gif);base64,/, "")
                })
            }          
            // console.log( pictureListArr) 
            this.vue.questionForm.pictureJson = JSON.stringify({'pictureList': pictureListArr}) 
             
        }
         
    },
    fileDel(index){
        this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgList.splice(index, 1);
    },
    // 提交
    handleSubmit() {
       console.log( this.questionForm) 
        console.log("this.questionForm.pictureJson"+ this.questionForm.pictureJson) 
       this.$refs.questionForm.validate(valid => {
        if (valid) {
          this.$api.inputQuestion(this.questionForm).then(response => {
            if (response.errorCode === '1') {
   
              this.$message.success(response.resultMsg)

            } else {
              this.$message.warning(response.resultMsg)
            }
          })
        }
       })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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