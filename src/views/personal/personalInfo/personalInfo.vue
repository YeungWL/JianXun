<template>
  <section class="cms-body" v-loading="loading">
    <el-form  ref="personalForm" :model="personalForm" 
        class="cms-form" label-width="162px">
        <el-form-item label="" class="flex-100">
					<user-upload v-if="imageUrl"
					             :imgSrc="imageUrl"
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
        <el-button class="btn-save"  @click="handleUpload()">保存头像</el-button>
        <span class="upload_span">用户头像支持大小不超过2M的JPG,GIF,PNG图片上传</span>
        </el-form-item>        
        <el-form-item label="姓名" class="flex-50" prop="name" :rules="rules.name">
          <el-input v-model="personalForm.name" class="cms-width"></el-input>
        </el-form-item> 
         <el-form-item label="性别" class="flex-50">
            <el-radio-group v-model="personalForm.sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
            </el-radio-group>
        </el-form-item>
         <el-form-item label="区域：" class="flex-50">
          <el-select placeholder="请选择省" v-model="personalForm.province" @change="getShowCity()">
            <el-option v-for="item in provinceOptions" :key="item.areaId" :label="item.name" :value="item.areaCode">
            </el-option>
          </el-select>
          <el-select placeholder="请选择市" v-model="personalForm.city">
            <el-option v-for="item in cityOptions" :key="item.areaId" :label="item.name" :value="item.areaCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" class="flex-50">
          <el-input v-model="personalForm.phone" class="cms-width" readonly></el-input>
        </el-form-item>
        <el-form-item label="学分" class="flex-50">
           <el-input v-model="personalForm.credit" class="cms-width"></el-input>
        </el-form-item>
        <el-form-item label="用户名" class="flex-50">
            <el-input v-model="personalForm.userName" class="cms-width"></el-input>
        </el-form-item> 
       <el-form-item label="常用邮箱" class="flex-50">
            <el-input v-model="personalForm.email" class="cms-width"></el-input>
       </el-form-item>
        <el-form-item label="学历" class="flex-50">
          <el-select v-model="personalForm.school" placeholder="请选择">
            <el-option 
              v-for="item in schoolOptions"
              :key="item.zdId"
              :label="item.name"
              :value="item.bianma">
            </el-option>
          </el-select>           
        </el-form-item>
        <el-form-item label="学位" class="flex-50">
          <el-select v-model="personalForm.degree" placeholder="请选择">
            <el-option 
              v-for="item in degreeOptions"
              :key="item.zdId"
              :label="item.name"
              :value="item.bianma">
            </el-option>
          </el-select>          
        </el-form-item>
        <el-form-item label="职称" class="flex-50">
          <el-select v-model="personalForm.zhiCheng" placeholder="请选择">
            <el-option 
              v-for="item in zhiChengOptions"
              :key="item.zdId"
              :label="item.name"
              :value="item.bianma">
            </el-option>
          </el-select>            
        </el-form-item>
        <el-form-item label="执业资格" class="flex-50">
          <el-select v-model="personalForm.competent" placeholder="请选择">
            <el-option 
              v-for="item in competentOptions"
              :key="item.zdId"
              :label="item.name"
              :value="item.bianma">
            </el-option>
          </el-select>            
        </el-form-item>
        <el-form-item label="专家资格" class="flex-100">
          <el-select v-model="personalForm.expertName" placeholder="请选择">
            <el-option 
              v-for="item in expertNameOptions"
              :key="item.zdId"
              :label="item.name"
              :value="item.bianma">
            </el-option>
          </el-select>  
        </el-form-item>
         <div class="form-footer">
            <el-button type="primary"  @click="updateUserInfo()">修改</el-button>
         </div>
    </el-form>
  </section>
</template>
<script>
import userUpload from 'components/upload/userUpload.vue'
export default {
  components: {
    userUpload
  },   
  data(){
    return {
      loading: false,
      personalForm: {
        name: '',
        companyName: '',
        sex: '',
        province: '',
        city: '',
        school: '',
        degree: '',
        competent: '',
        zhiCheng: '',        
        expertName: '',
        isExpert: '',
        credit: '',
        userName: '',
        email: '',  
        phone: ''     
      },
      ReviseDetail: {
        accessToken: localStorage.getItem("accessToken"),
        token: this.getToken(),
        provinceName: "",
        cityName: ""
        },
      disabled: true,
      // 头像地址
      imageUrl: '',
      // isDisable: true,
      schoolOptions: [],
      degreeOptions: [],
      zhiChengOptions: [],
      competentOptions: [],
      expertNameOptions: [],
      provinceOptions:[],
      cityOptions:[],
      rules: {
        name: [{ required: true, message: '请输入真实姓名', trigger: 'blur', pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]{2,8}$/, message: '2-8字符，允许中文、英文字母'}]
      }      
    }
  },
  watch: {
    imageUrl(url){
      // console.log("url"+url)
    }
  },   
  created() {
    this.getUserInfo()
    this.getXueliCateList()
    this.getXueweiCateList()
    this.getZhiChengCateList()
    this.getZyzgCateList()
    this.getZjzgCateList()
    this.getAreaCity()
    this.getCity()
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      let params = {
        phone: localStorage.getItem('phone'),
        userId: localStorage.getItem('userId')
      }
      this.$api.getUserInfo(params).then(response => {
        if (response.errorCode === '1') {
          this.personalForm = response.data[0]
          this.imageUrl = response.data[0].logoUrl
          if(response.data[0].sex === '0') {
            this.personalForm.sex = 0
          } else {
            this.personalForm.sex = 1
          }
        }
      })
    },
    //获取省份
    getAreaCity(){
      let params ={
          areaCode: "0",
          token: this.personalForm.token
      };
     this.$api.getAreaAndCity(params).then(response =>{
        this.provinceOptions = response.data;
     })
   },
    //获取所有市
    getCity(){
      let params={
          areaCode: "430101",
          token: this.personalForm.token
      };
      this.$api.childrentAreaList(params).then(response =>{
        this.cityOptions = response.data;
      })
    },
    //选择省份查找对应的市区
    getShowCity(){
      // this.personalForm.city = "";
       let viewCity=[];//定义一个存放城市的数组
       this.cityOptions = [];//原设定存放城市的数组
       let allCity = this.provinceOptions;//全国的城市
       let prov = this.personalForm.province; //获取选择省的唯一区号
       this.personalForm.city = ""; //假设选择城市是空
       for(var val of allCity){
          if(prov == val.areaCode){//判断省市地区唯一号是否相等
            viewCity = val.childList;
          }
       }
        this.cityOptions =viewCity;
    },
    // 获取学历分类列表
    getXueliCateList() {
      this.$api.xueliCateList().then(response => {
         if (response.errorCode === '1') {
            this.schoolOptions = response.data
         } else {
            this.$message.warning(response.resultMsg)
         }
      }).catch(error => {
        this.$message.error(error)
        return false
      })
    },
    // 获取学位分类列表
    getXueweiCateList() {
      this.$api.xueweiCateList().then(response => {
         if (response.errorCode === '1') {
            this.degreeOptions = response.data
         } else {
            this.$message.warning(response.resultMsg)
         }
      }).catch(error => {
        this.$message.error(error)
        return false
      })
    },
    // 获取职称列表
    getZhiChengCateList() {
      this.$api.zhiChengCateList().then(response => {
         if (response.errorCode === '1') {
            this.zhiChengOptions = response.data
         } else {
            this.$message.warning(response.resultMsg)
         }
      }).catch(error => {
        this.$message.error(error)
        return false
      })
    },
    // 获取执业资格类型列表
    getZyzgCateList() {
      this.$api.zyzgCateList().then(response => {
         if (response.errorCode === '1') {
            this.competentOptions = response.data
         } else {
            this.$message.warning(response.resultMsg)
         }
      }).catch(error => {
        this.$message.error(error)
        return false
      })
    },
    // 获取专家资格类型列表
    getZjzgCateList() {
      this.$api.zjzgCateList().then(response => {
         if (response.errorCode === '1') {
            this.expertNameOptions = response.data
         } else {
            this.$message.warning(response.resultMsg)
         }
      }).catch(error => {
        this.$message.error(error)
        return false
      })
    },                          
    //修改用户信息
    updateUserInfo() {
      this.$refs.personalForm.validate(valid => {
        if(valid) {
          let data = {
            name: this.personalForm.name,
            companyName: this.personalForm.companyName,
            sex: this.personalForm.sex,
            province: this.personalForm.province,
            city: this.personalForm.city,
            school: this.personalForm.school,
            degree: this.personalForm.degree,
            competent: this.personalForm.competent,
            zhiCheng: this.personalForm.zhiCheng,        
            expertName: this.personalForm.expertName,
            isExpert: this.personalForm.isExpert   
          } 
          this.$api.updateUserInfo(data).then(response => {
            if (response.errorCode === '1') {
              this.getUserInfo()
              this.$message.success('修改成功！')
              this.$nextTick(_ => {
                this.$refs.personalForm.resetFields()
              })
            } else {
              this.$message.warning(response.resultMsg)
            }
          }).catch(error => {
            this.$message.error(error)
          })
        } else {
          return false
        }
      })
    },
    //修改时，传递过来的图片信息
    setFileChange(file, name) {
      // let _this = this
      // let imgurl = _this.$refs.img.dataUrl
      // console.log("imgurl"+imgurl)
      // return imgurl 
    },   
    // 上传用户头像
    handleUpload() { 
      let _this = this
      let imgurl = _this.$refs.img.dataUrl.replace(/^data:image\/(jpeg|png|gif);base64,/, "")
      // console.log("imgurl"+imgurl)          
      let params = {
        fileUrl: imgurl,
        fileTypes: '',
        fileName: ''
      }
      _this.$api.uploadUserLogo(params).then(response => {
         if(response.errorCode === '1') {
            _this.$message.success('上传头像成功！')
            _this.imageUrl = response.data[0].logoUrl
         } else {
            _this.$message.warning(response.resultMsg)
         }
      }).catch(error => {
        _this.$message.error(error)
        return false
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
        top: -10px;
      }    
   }
 }
</style>




