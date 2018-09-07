<template>
 <section class="cms-body">
    <el-form  ref="feedbackForm" class="cms-form" label-width="162px">
        <el-form-item label="反馈内容" class="flex-100" >
          <textarea class="el-textarea__inner" style="min-height: 33px;" v-model="feedbackForm.remarks"></textarea>
        </el-form-item> 
        <el-form-item label="内容图" class="flex-100">
           <div class="uploadImg">
             <input type="file" @change="fileChange($event)"  ref="file" id="file" multiple="multiple">
             <i class="el-icon-plus avatar-uploader-icon"></i>
          </div>
          <div class="img-box" v-show="imgList.length!=0">
            <div class="upload_warp_img_div" v-for="(item,index) of imgList" >
                <div class="upload_warp_img_div_top" >
                    <div class="upload_warp_img_div_text" >
                        {{item.file.name}}
                    </div>
                    <!--<img src="./del.png" class="upload_warp_img_div_del" @click="fileDel(index)">-->
                </div>
                <img :src="item.file.src" style="width:60px;">
            </div>            
          </div>
          <span class="upload_span">图片支持大小不超过2M的JPG,GIF,PNG图片上传</span>
        </el-form-item>
        <div class="form-footer">
           <el-button type="primary" @click="feedbackContent()">提交</el-button>
        </div>
    </el-form>
  </section>
</template>
<script>
// https://blog.csdn.net/weixin_41957098/article/details/80351914
export default {
  data() {
     return {
        src:'',
        imgList: [],
        size: 0,
       feedbackForm:{
         remarks:'测试反馈', 
       }
     }
  },
  created() {
  },
  methods: {
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
        }
    },
    getFile (e) {
        var files = e.target.files[0]
        if (!e || !window.FileReader) return  // 看支持不支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          this.src = this.result;
        }
    },
    //提交反馈内容
    feedbackContent(){
      let _this = this
       let imgurl =_this.src.replace("data:image/png;base64,", "")
       let params={
             photoUrl:imgurl,
             content:_this.feedbackForm.remarks
            }
        _this.$api.feedback(params).then(Response=>{
          if(response.errorCode === '1'){
              console.log(response,222222222)
          }else{
          }
      }).catch(Error=>{
        
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.cms-body{
  background: #fff;
  position: relative;
  width: 100%;
  border: 1px solid #e7ecf3;
  border-bottom: none;
  min-height: 100%;
  .noneDefault {
    pointer-events: none;
    cursor: default; //禁止点击
  }
  .cms-form{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      padding: 26px 0;
      margin: 0 50px;
      .el-form-item {
        margin-bottom: 0;
        padding: 15px 0;
        border-top: 1px dashed #eee;
        &:first-child{
          border-top:0;
        }
        .el-textarea__inner {
          min-height: 80px!important;
        }
        .uploadImg{
          float: left;
          width:130px;
          height:130px;
          border:#ccc dashed 1px;
          display: block;
          input{
             position: relative;
             margin: 30px; 
             opacity: 0;
             z-index: 1200;
          }
          .avatar-uploader-icon{
            position: relative;
            top: -97px;
            left: 12px;
          }
        }
        .img-box{
            float: left;
            width: 90%;
            height: 130px;
            border:#ccc solid 1px;
            .img-preview-img{
              width:130px;
              height:130px;
            }
        }
      }
      .form-footer {
        width: 100%;
        display: block;
        padding: 15px 162px;
      }
      .el-button--primary, .el-button--primaryn:focus {
          background: #3386e4;
          border-color: #3386e4;
          color: #fff;
          padding: 8px 20px;
      }
      .btn-save{
        margin-left: 10px;
        position: relative;
        top:5px;
      }    
   }
 }
</style>