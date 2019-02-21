<template>
  <div class="page-content-body">
    <div class="page-header page-navbar clearfix">
      <div class="ui-title float_l"><span class="iconfont icon-home"></span>添加现场检查问题</div>
      <el-button type="primary"  icon="el-icon-d-arrow-left" class="float_r" @click="goBack">返回</el-button> 
    </div>
    <div class="page-main" style="width:70%">
      <section  class="dialog-content">
        <div class="ui-form" >
          <el-form ref="questionForm" :rules="rules" label-width="100px" :model="questionForm" class="flex-form">
            <el-form-item label="问题名称："  class="flex-100" prop="title">
              <el-input v-model="questionForm.title" ></el-input>
            </el-form-item>
            <el-form-item label="问题描述："  class="flex-100" prop="queDesc">
              <el-input type="textarea" v-model="questionForm.queDesc" ></el-input>
            </el-form-item>            
            <el-form-item label="要求时间："  class="flex-100" prop="requireTime">
              <el-input v-model="questionForm.requireTime"  placeholder="天"></el-input>
            </el-form-item>
            <el-form-item label="问题属性："  class="flex-50" prop="questionAttr">
              <el-select v-model="questionForm.questionAttr" placeholder="请选择">
                <el-option
                  v-for="item in questionAttrOptions"
                  :key="item.bianma"
                  :label="item.name"
                  :value="item.bianma">
                </el-option>
              </el-select>              
            </el-form-item>
            <el-form-item label="检查类型："  class="flex-50" prop="checkType">
              <el-select v-model="questionForm.checkType" placeholder="请选择">
                <el-option
                  v-for="item in checkTypeOptions"
                  :key="item.bianma"
                  :label="item.name"
                  :value="item.bianma">
                </el-option>  
              </el-select>            
            </el-form-item>
            <el-form-item label="指派给："  class="flex-50" prop="handlerName">
              <el-input v-model="questionForm.handlerName" readonly></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="handleShowHandler">指派</el-button>
            </el-form-item>
            <el-form-item label="现场照片："  class="flex-100" >
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
              <el-button type="primary" @click="handleSubmit">提交</el-button>
              <el-button  @click="resetForm('questionForm')">重置</el-button>
            </el-form-item>            
          </el-form>
        </div>      
      </section>
    </div>
    <!-- 指派 -->
    <el-dialog title="指派："
               :visible.sync="selectHandlerDialogVisible"
               :close-on-click-modal='false'
               width="605px" class="my-dialog">
      <div class="dialog-content">
        <div class="ui-form">
          <select-organization-tree :treeData="treeData" @changePid="changePid"></select-organization-tree>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import selectOrganizationTree from 'components/treecomponents/selectOrganizationTree.vue' // 选择组织人员
export default {  
  name: 'addCheckupQuestion',
  components: {
    selectOrganizationTree
  },
  data() {
    return {
      questionForm: {
        projectId: this.$route.query.projectId,
        orgId: this.$route.query.orgId,
        title: '',
        queDesc: '',
        requireTime: '',
        questionAttr: '',
        checkType: '',
        pictureJson: [],
        handlerId:'',
        orgMemberId:'',
        handlerName:'',
      },
      selectHandlerDialogVisible: false,
      treeData:[],
    //   treeData: [
    //   {
    //     "_id": "da6d40addb2a400a92456f632fa414f6", //组织id, ordId
    //     "omId": null,
    //     "role": "-1",
    //     "name": "十三号线施工1标", //组织名称
    //     disabled: true,
    //     "memberList": [ //部门列表
    //       {
    //         "_id": null,
    //         "omId": null,
    //         "role": "-1",
    //         "name": "组织负责人",
    //         disabled: true,
    //         "memberList": [
    //           {
    //             "_id": "501b2db9b9f040ccab456700e199db16", //handlerId
    //             "omId": "a389044d6cbf443d9b50a67bd4bebab6", //orgMemberId
    //             "role": "0", //orgRole
    //             "name": "敖荣" //name
    //           }
    //         ]
    //       },
    //       {
    //         "_id": "4f5a1288a1a64e94a77e209dd8d0743f",
    //         "omId": null,
    //         "role": "-1",
    //         "name": "财务部",
    //         disabled: true,
    //         "memberList": [
    //           {
    //             "_id": "1a796a1a6f714dcdb9f6e33c8738495d",
    //             "omId": "a389044d6cbf443d9b50a67bd4bebab6",
    //             "role": "2",
    //             "name": "陈显增"
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ],
      questionAttrOptions: [],
      checkTypeOptions: [],
      imgList: [],
      size: 0,
      rules: {
        title: [{ required: true, message: '请输入问题名称', trigger: 'blur'}],
        queDesc: [{ required: true, message: '请输入问题描述', trigger: 'blur'}],
        requireTime: [{ required: true, message: '请输入要求时间', trigger: 'blur' }],
        questionAttr: [{ required: true, message: '请选择问题属性', trigger: 'change'}],
        checkType: [{ required: true, message: '请选择检查类型', trigger: 'change'}],
        handlerName: [{ required: true, message: '请选择指派人员', trigger: 'change'}]
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
    // 获取指派人员
    getAssignChecking() {
      let params = {
        assignType: '1',//1:检查时指派,2:整改时指派,3:复查时指派
        orgId: this.$route.query.orgId
      }
      this.$api.assignChecking(params).then(response => {
        this.treeData = response.data;
        // console.log(this.treeData);
      })
    },
    // 选中的人员
    changePid(val) {
      // console.log("handler:"+val)
      this.questionForm.handlerId = val._id
      this.questionForm.orgMemberId = val.omId
      this.questionForm.handlerName = val.name
    },
    handleShowHandler (){
      this.selectHandlerDialogVisible = true
      this.getAssignChecking()
    },
    // 关闭选择指派人弹窗
    handleClose(){
      this.selectHandlerDialogVisible = false
    },
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
      //  console.log( this.questionForm) 
      //   console.log("this.questionForm.pictureJson"+ this.questionForm.pictureJson)

       this.$refs.questionForm.validate(valid => {
        if (valid) {
          delete this.questionForm.handlerName
          this.$api.inputQuestion(this.questionForm).then(response => {
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },                
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    beforeRouteLeave(to, from, next) { 

      next()
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
