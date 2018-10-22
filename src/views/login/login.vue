<template>
	<div class="login-wrap">
		<header class="login-header">
			<div class="login-header-ctn mx-width clearfix">
				<h1 class="logo">
					<img src="../../assets/images/logo.png" alt="">
				</h1>
			</div>
		</header>
		<article class="login-content">
			<div class="login-content-ctn mx-width">
				<div class="login-box">
					<section class="login">
						<h2>用户登录</h2>
            <el-form class="form-horizontal" :model="loginForm" :rules="loginRules" ref="loginForm">
              <el-form-item class="login-input" prop="userName">
                <el-input name="user" placeholder="建信帐号/建信编码/手机号" class='yhm' v-model="loginForm.userName" auto-complete="off">
                </el-input>
              </el-form-item>
              <el-form-item class="login-mima"  prop="password">
                <el-input type='password'  placeholder="密码" class='mm' v-model="loginForm.password" auto-complete="off">
                </el-input>
              </el-form-item>
              <el-form-item class="login-yzm" prop="code">
                <el-input placeholder="验证码" :maxlength="4" class='yzm' @blur="checkImgCode()" v-model="loginForm.code" @keyup.enter.native="handleLogin">
                </el-input>
                <div class="yzm-pic"><img :src="codeUrl" alt="验证码" @click="getCodeUrl" ></div>
              </el-form-item>
              <el-form-item class="login-input">
                <el-checkbox v-model="checked" label="自动登录" name="type"></el-checkbox>
                <span class="u-cannot-login">
                   <el-button type="text"  class="forget-password" @click="goTofindPwd">忘记密码？</el-button>
                |  <el-button type="text"  class="btn-text"  @click="goToRegister">立即注册</el-button> 
                </span>         
              </el-form-item>           
              <el-form-item class="loginBtn">
                <el-button class="btn-login" type="success" :loading="loading"  @click="handleLogin">登录</el-button>
                <!--<div class="mt20">
                    <p class="blue">使用第三方账号登录</p>
                    <div class="top10"><a target="_blank" title="QQ" href="../../assets/images/qqLogin.do" class="u-qq"></a><a target="_blank" title="微信" href="javascript:;" class="u-wecat"></a></div>
                </div>						    	-->
              </el-form-item>
            </el-form>
					</section>
				</div>
			</div>
		</article>
	</div>  
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      checked: '',
      loginForm: {
        userName: '',
        password: '',
        code: '',
        isIm: '1',
        token: this.getToken()       
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'blur', message: '验证码不能为空' }]
      },
      codeUrl: '',
      loading: false,
      codeCheck: '1' 
    }
  },
  created() {
    this.getCodeUrl()
  },  
  mounted() {
    this.getCodeUrl()
  },   
  methods: {
    uuid(len, radix) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      var uuid = [], i;
      radix = radix || chars.length;
      
      if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
      } else {
      // rfc4122, version 4 form
      var r;
      
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      
      // Fill in random data. At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
          }
        }
      }
      localStorage.setItem("imageUid",uuid.join(''));
      return uuid.join('');

    },
    getImageUid(){
      var imageUid = localStorage.getItem("imageUid"); 
      if(!imageUid){
         return this.uuid(16, 36);       
      }else{
        return imageUid;
      }      
    },
    // 获取验证码
    getCodeUrl() {
     this.codeUrl = this.$api.codeUrl({
        'token': this.getToken(),
        'isCache': 0,
        'imageUid': this.uuid(16, 36)
      })
      // console.log("imageUid"+this.uuid(16, 36));
    },      
    // 验证验证码
    checkImgCode() {
      let imgCode = this.loginForm.code;
      if (!imgCode) {
        return false
      }  
      let data = {
        isCache: 0,
        imgCode: imgCode,
        token: this.getToken(),
        imageUid: this.getImageUid()
      }
      // console.log(this.getImageUid())
      this.$api.checkImgCode(data).then(res=>{
        // if (res.errorCode === '1') {
        //   // this.$message.success(res.resultMsg)
        //   return true
        // } else {
        //   return false
        // }    
        if (res.errorCode === '1') {
          // this.$message.success(res.resultMsg)
          this.codeCheck = '1'
        } else {
          // this.$message.warning(res.resultMsg)
          this.codeCheck = '2'
        }
      })
    },    
    // 登录
    handleLogin() {
      // 保存的账号
      let name = this.loginForm.userName
      // 保存的密码
      let pass = this.loginForm.password
      // console.log(this.codeCheck)
      // 校验验证码是否正确
      if (this.codeCheck != '1') {       
        this.$message.warning('验证码错误！')
        return false
      }

      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 检测IE浏览器
          if (window.ActiveXObject || "ActiveXObject" in window) {
            this.$confirm("为了您更好的用户体验，本平台推荐您使用谷歌或者火狐浏览器！", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              showCancelButton: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              type: "warning"
            }).catch(_ => {});
            return;
          }
          // 判断复选框是否被勾选 勾选则调用配置cookie方法
          if (this.checked) {
            // 传入账号名，密码，和保存天数3个参数
            this.setCookie(name,pass,30)
          }
          this.loading = true;
          this.$store.dispatch("login", this.loginForm).then(res => {
              this.loading = false;
              // //用户名,在系统唯一
              // this.$cookie.set('userName',res.data[0].userName)        
              if (res.errorCode === "1") {
                let vm = this;
                this.$message({
                  showClose: true,
                  duration:1200,
                  message: '登录成功！',
                  type: 'success',
                  onClose: function(){
                    vm.$router.push('/layout');
                  }
                })
                setTimeout(_ => {
                  this.getUserRoots()
                }, 1000)
                localStorage.setItem('userId',res.data[0].userId); // 用户id[32位长度]
                localStorage.setItem('phone',res.data[0].phone); // 手机号码
                localStorage.setItem('userName',name);//用户名,在系统唯一
                localStorage.setItem('name',res.data[0].name);//用户真实姓名
                localStorage.setItem('logoUrl',res.data[0].logoUrl); // 用户头像图片              
                localStorage.setItem('accessToken',res.data[0].accessToken);//succ为true时，唯一性访问令牌才返回,30天后自动过期，需要重新请求获取访问令牌
                localStorage.setItem('refreshToken',res.data[0].refreshToken);  //accessToken失效时，可通过refreshToken刷新访问令牌，获取用户自动登录37天后自动过期，需要重新请求获取访问令牌
                 localStorage.setItem('userSig',res.data[0].userSig);  // 即时通讯用户标识ID  
              } else {
                this.$message.warning(res.resultMsg)
              }              
            })
            .catch(error => {
              // this.$message.error(error);
              this.getCodeUrl();
            });
        } else {
          return false;
        }
      });
    }, 
    // 获取用户权限
    getUserRoots() {
      this.$store
        .dispatch('getRoots', {//分发 action
          menuName: '',
          menuCode: '',
          parentId: '',
          isLeaf: '2' 
        })
        .then(_ => {
          // console.log(_.data.data[0].url)
          // console.log(this.$store, 999999)
          // this.$router.push(_.data.data[0].url)
                //  this.$message.success('获取权限成功')
          setTimeout(_ => {}, 1000)
        })
        .catch(error => {
          this.$router.push('/login')
          // this.$message.error(error.code)
        })
    },           
    // //设置cookie
    setCookie(c_name,c_pwd,exdays) {
      var exdate=new Date();//获取时间
      exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
      //字符串拼接cookie
      window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
      window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
    },
    //读取cookie
    getCookie:function () {
      if (document.cookie.length>0) {
        var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
        for(var i=0;i<arr.length;i++){
          var arr2=arr[i].split('=');//再次切割
          //判断查找相对应的值
          if(arr2[0]=='userName'){
            this.loginForm.userName=arr2[1];//保存到保存数据的地方
          }else if(arr2[0]=='userPwd'){
            this.loginForm.password=arr2[1];
          }
        }
      }
    },  
    goToRegister(){
      this.$router.push('/register');
    },
    goTofindPwd(){
      this.$router.push('/findPwd');
      //清除cookie
      this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了      
    }
  },
  // 页面加载调用获取cookie值
  mounted(){
    // this.getCookie()
    let userName = localStorage.getItem('userName');
    this.loginForm.userName = userName;
    // if(this.$cookie.get(this.$api.TokenKey)){
    //   this.$api.getUserInfo(this.$cookie.get(this.$api.TokenKey)).then(res=>{
    //     this.$router.push('/project/projectList');
    //   })
    // }

  } 
}
</script>

<style lang='scss' scoped>

/*-----login----*/
.login-wrap{height:100%;}
.login-wrap {
  .login-header {
    width: 100%;
    height: 80px;
    background-color: #438fe5;
    background-image:url('../../assets/images/header_bg.png');
    background-position:710px bottom;
    background-repeat:no-repeat;
    border: none;
    color: #fff;
    font-size: 14px;
    }
}
.mx-width{width:1000px;margin:0 auto;}
@media screen and (max-width:1000px) {
  .mx-width{width:100%;}
  .full-width{width:auto !important;}
}
.login-header {
  .logo{float:left;margin-top:15px;font-size:26px;color:#fff;font-weight:bold;}
  img{vertical-align:middle;margin-right:10px;}
}

.login-content{height:auto;}
.login-content-ctn{position:relative;}
.login-box{padding:80px 0 50px 0;background:url('../../assets/images/login_bg.png') no-repeat left 150px;
  .form-control-icon {
      color: #dad9d9;
      line-height: 42px;
      position: absolute;
      top: -3px;
      left: 15px;  
      z-index: 2;
      display: block;
      width: 34px;
      height: 34px; 
      text-align: center;
  }
}

.login{
  margin-left:610px;width:360px;padding:20px;border:1px solid #d6d6d6;color:#999;position: relative;
  .error{
    position: absolute;top:46px;left:38px;color:red;transition: right .5s;
    transition: right .25s linear;
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  h2{padding-bottom:10px;margin-top:0;text-align:center;font-weight:bold;font-size:18px;color:#438fe5;}
  .login-input {
    position: relative;

    .yhm:before {
        position: absolute;
        top: 2px;
        left: 8px;
        color: #ccc;
        font-size: 20px;
        font-family: iconfont;
        content: "\e60e";
    }    
  }
  .login-yzm {
    .yzm:before {
        position: absolute;
        top: 2px;
        left: 8px;
        color: #ccc;
        font-size: 20px;
        font-family: iconfont;
        content: "\e638";
    }   
    .yzm {
      width: 70%;
      height: 35px;
    }
    .yzm-pic {
      width: 70px;
      height: 35px;
      float: right;
      margin-top: 5px;
    }
  }
  .login-mima {
    .mm{
      width:100%;
    }
    .mm:before {
        position: absolute;
        top: 2px;
        left: 8px;
        color: #ccc;
        font-size: 20px;
        font-family: iconfont;
        content: "\e615";
    } 
  }
  .loginBtn {
    .btn-login {
      width: 100%;
      height: 36px;
      color: #fff;
      background-color: #f0ad4e;
      border-color: #eea236;
    }
    .btn-login:hover{
      color: #fff;
      background-color: #ec971f;
      border-color: #d58512;
    }
  }
  .form-horizontal {
    padding-left:15px;padding-right:15px;
    .form-group {
      margin-right:0px;
      margin-left:0px;
      position:relative;
      }
  }
  .form-control{border: 1px solid #d6d6d6;border-radius: 4px;}
  .btn-text, .forget-password{
    color: #555;
    background: 0 0;
    border:0;
    padding-left: 0;
    padding-right: 0;
  }
  .btn-text{color: #409EFF;}
}
.u-cannot-login{ float: right;}
.u-qq,.u-wecat{float:left;width:24px;height:24px;margin-right:8px;background-image:url('../../assets/images/sprite-hash.png')}
.u-qq{background-position: -84px 0px;}
.u-qq:hover{background-position: -196px 0px;}
.u-wecat{background-position: -56px 0px;}
.u-wecat:hover{background-position: -168px 0px;}
</style>
