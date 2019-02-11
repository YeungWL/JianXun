<template>
  <div class="page-content-body">
    <div class="page-header page-navbar clearfix">
      <div class="ui-title float_l"><span class="iconfont icon-home"></span>
        <span v-if="this.$route.query.status ==='0'">整改</span>
        <span v-else>复查</span>
      </div>
      <el-button type="primary"  icon="el-icon-d-arrow-left" class="float_r" @click="goBack">返回</el-button> 
    </div>
    <div class="page-main" style="width:70%">
      <section>
        <div class="ui-form form-bdnone" >
          <el-form ref="historyForm" label-width="100px" :model="questionForm" class='flex-form'>
            <el-form-item label="问题名称："  class="flex-100">
              <el-input v-model="questionForm.title" :readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="问题描述："  class="flex-100">
              <el-input type="textarea" v-model="questionForm.queDesc" :readonly="readonly"></el-input>
            </el-form-item>            
            <el-form-item label="要求时间："  class="flex-100">
              <el-input v-model="questionForm.requireTime" :readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="问题属性："  class="flex-50">
              <el-input v-model="questionForm.questionAttr" :readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="检查类别："  class="flex-50">
              <el-input v-model="questionForm.checkType" :readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="检查人："  class="flex-50">
              <el-input v-model="questionForm.userName" :readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="检查时间："  class="flex-50">
               <el-input v-model="questionForm.createTime" :readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="图片："  class="flex-100">
              <div class="imgbox" v-for="item in questionForm.replyPictures">
                <a href="javascript:;" @click="handlePhotoPreview(questionForm.replyPictures)"><img :src="item.path"></a>
              </div>
            </el-form-item>                                                
          </el-form>
        </div>
      </section>
      <div  v-if="replyVoListForm.length != 0">
        <section v-for="(item, index) in replyVoListForm">
          <div class="ui-form form-bdnone" v-if="(index%2) != 1">
            <el-form label-width="100px" class='flex-form'>
              <el-form-item label="整改描述："  class="flex-100">
                <el-input type="textarea" v-model="item.replyDesc" :readonly="readonly"></el-input>
              </el-form-item>            
              <el-form-item label="整改人："   class="flex-50">
                <el-input v-model="item.replyName" :readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="整改时间："   class="flex-50">
                <el-input v-model="item.replyTime" :readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="图片："  class="flex-100" v-if="item.replyPictures.length != 0">
                <div class="imgbox" v-for="j in item.replyPictures">
                  <a href="javascript:;" @click="handlePhotoPreview(item.replyPictures)"><img :src="j.path"></a>
                </div>
              </el-form-item>                                              
            </el-form>
          </div>
          <div class="ui-form form-bdnone" v-else>
            <el-form label-width="100px" class='flex-form'>
              <el-form-item label="复查描述："  class="flex-100">
                <el-input type="textarea" v-model="item.replyDesc" :readonly="readonly"></el-input>
              </el-form-item>            
              <el-form-item label="复查人："   class="flex-50">
                <el-input v-model="item.replyName" :readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="复查时间："   class="flex-50">
                <el-input v-model="item.replyTime" :readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="图片："  class="flex-100" v-if="item.replyPictures.length != 0">
                <div class="imgbox" v-for="j in item.replyPictures">
                  <a href="javascript:;" @click="handlePhotoPreview(item.replyPictures)"><img :src="j.path"></a>
                </div>
              </el-form-item>                                              
            </el-form>
          </div>
        </section> 
      </div>
      <section>
        <div class="ui-form">
          <el-form label-width="100px" class='flex-form'  ref="rectifyForm" :model="rectifyForm" :rules="rules">
            <el-form-item label="整改描述："  class="flex-100"  prop="replyDesc"  v-if="this.$route.query.status ==='0'">
              <el-input type="textarea" v-model="rectifyForm.replyDesc"></el-input>
            </el-form-item> 
            <el-form-item label="复查描述："  class="flex-100"  prop="replyDesc"  v-else>
              <el-input type="textarea" v-model="rectifyForm.replyDesc"></el-input>
            </el-form-item>
            <el-form-item label="要求时间："  class="flex-100" placeholder="天"  prop="requireTime" v-if="this.$route.query.status ==='1'">
              <el-input v-model="rectifyForm.requireTime"></el-input>
            </el-form-item>                           
            <el-form-item label="图片："  class="flex-100" >
              <div class="upload_warp_img" v-show="imgList.length!=0">
                <div class="upload_warp_img_div" v-for="(item,index) of imgList" >
                    <i class="icon el-icon-error" @click="fileDel(index)"></i>
                    <img :src="item.file.src">
                </div>            
              </div>
              <div class="uploadImg" @click="fileClick">
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </div>
              <input type="file" @change="fileChange($event)"  id="upload_file" multiple style="display: none">              
              <!--<span class="upload_span">图片支持大小不超过2M的JPG,GIF,PNG图片上传</span>-->
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-if="this.$route.query.status ==='0'" @click="handleRectify">提交</el-button>
              <el-button type="primary" v-if="this.$route.query.status ==='1'" @click="handleReview('1')">同意</el-button>
              <el-button  v-if="this.$route.query.status ==='1'" @click="handleReview('2')">重整</el-button>
            </el-form-item>                                              
          </el-form>
        </div>
      </section>

    </div>
    <el-dialog title="查看图片"
               :visible.sync="replyPicturesDialogVisible"
               :close-on-click-modal='false'
               width="80%" class="my-dialog">
      <div class="dialog-content">
        <photo-preview :photoData="photoData"></photo-preview>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import photoPreview from  'components/media/photoPreview.vue'// 查看图片
export default {  
  name: 'rectifyCheckupQuestion',
  components:{
    photoPreview
  },
  data() {
    return {
      questionForm: {
        title: '',
        queDesc: '',
        requireTime: '',
        questionAttr: '',
        checkType: '',
        createTime: '',
        userName: '',
        replyPictures: []
      },
      replyVoListForm:[],
      rectifyForm: {
        questionId: this.$route.query.questionId,
        replyDesc: '',
        pictureJson: '',
        requireTime: '',
        status:''
      },      
      readonly: true,
      imgList: [],
      size: 0, 
      rules: {
        replyDesc: [{ required: true, message: '请输入整改描述', trigger: 'blur'}]
      },
      replyPicturesDialogVisible: false,
      photoData: []
    }
  },
  mounted() {
    this.getReplyQuestionPage() 
    // console.log(this.$route.query.questionId)
  },  
  created() {
    
  },
  methods: {
    handlePhotoPreview(data){
      this.replyPicturesDialogVisible = true
      this.photoData = data
      // console.log(this.photoData);
    },
    // 获取问题的整改页面数据
    getReplyQuestionPage() {
      this.$api.replyQuestionPage({questionId: this.$route.query.questionId}).then(response => {     
        if (response.errorCode === '1') {          
          this.questionForm = response.data[0].question
          this.replyVoListForm =  response.data[0].replyVoList
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
            this.vue.rectifyForm.pictureJson = JSON.stringify({'pictureList': pictureListArr}) 
             
        }
         
    },
    fileDel(index){
        this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgList.splice(index, 1);
    },
    // 整改回复提交
    handleRectify() {
        console.log( this.rectifyForm.pictureJson)
        // console.log("this.rectifyForm.pictureJson"+ this.rectifyForm.pictureJson)  
        // console.log(this.rectifyForm)
      delete this.rectifyForm.requireTime
      delete this.rectifyForm.status    
      this.$refs.rectifyForm.validate(valid => {
        if(valid){
          this.$api.rectifyCheckupQuestion(this.rectifyForm).then(response => {
            if (response.errorCode === '1') {
              this.$message.success(response.resultMsg)
              setTimeout(_ => {
                  this.goBack()
              }, 1000)
            } else {
              this.$message.warning(response.resultMsg)
            }
          })
        }
      })
    },
    // 复查回复提交
    handleReview(status) {
      //  console.log( this.rectifyForm.pictureJson)
        // console.log("this.rectifyForm.pictureJson"+ this.rectifyForm.pictureJson)
      this.rectifyForm.status = status // 复查是否通过[必填项，1通过，2是重整]
      // console.log(this.rectifyForm) 
      this.$refs.rectifyForm.validate(valid => {
        if(valid){
          this.$api.reviewCheckupQuestion(this.rectifyForm).then(response => {
            if (response.errorCode === '1') {
              this.$message.success(response.resultMsg)
              setTimeout(_ => {
                  this.goBack()
              }, 1000)
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
    &:last-child{
      border-bottom:0;
    }
    .imgbox{
      a{
        float: left;
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
        img{
          width: 200px;
        }        
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
        float: left;
        .upload_warp_img_div{
          float: left;
          display: inline-block;
          margin-right: 10px;
          margin-bottom: 10px;
          position: relative;
          .icon{
            position: absolute;
            right: -8px;
            top: -8px;
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
            width:200px;
          }
        }
    }    
  }
}
</style>
