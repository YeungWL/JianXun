<template>
  <div class="layout">
    <header class="header">
      <!--<div class="logo"></div>-->
      <div class="nav">
        <el-menu :default-active="activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 @select="handleSelect">
          <el-menu-item index="index1">
            <i class="iconfont icon-xiangmuguanli"></i><br>
            <span>项目管理</span>
          </el-menu-item>
          <el-menu-item index="index2">
            <i class="iconfont icon-zuzhijigouguanli"></i><br>
            <span>组织管理</span>
          </el-menu-item>
          <el-menu-item index="index3">
            <i class="iconfont icon-shigongrizhi"></i><br>
            <span>施工日志</span>
          </el-menu-item>
          <el-menu-item index="index4">
            <i class="iconfont icon-shigongrizhi"></i><br>
          <span>监理日志</span>
          </el-menu-item>
          <el-menu-item index="index5">
            <i class="iconfont icon-sanjijiaoyu"></i><br>
            <span>三级教育</span>
          </el-menu-item>
          <el-menu-item index="index6">
            <i class="iconfont icon-wenjianguanli"></i><br>
            <span>文库管理</span>
          </el-menu-item>
          <el-menu-item index="index7">
            <i class="iconfont icon-xitongshezhi"></i><br>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="user">
        <div class="item">
          <img class="userbg" :src="!logoUrl?headerIcon:logoUrl" >
          <!--<img class="userbg" src="../../assets/images/user.png" >-->
          <span>
            <el-dropdown @command="handleClick" trigger="click">
              <span class="el-dropdown-link names"> 
                <span>{{account}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                    <router-link to="/personal/personalInfo"><el-dropdown-item  command="1"><i class="iconfont icon-icon-geren"></i><span>个人信息</span></el-dropdown-item></router-link>
                    <el-dropdown-item  command="2"><i class="iconfont icon-icon-mima"></i><span>修改密码</span></el-dropdown-item>
                    <router-link to="/personal/personalCollection"><el-dropdown-item  command="3"><i class="iconfont icon-shoucang1"></i><span>我的收藏</span></el-dropdown-item></router-link>
                    <el-dropdown-item  command="4"><span>退出系统</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <span class="stand">|</span>
          <span class="wechat">
            <i class="iconfont icon-xiaoxi"></i>
            <span class="msg-num">4</span>
          </span>
          <span>
            <el-dropdown  class="colorBtn " trigger="click"  @command="changeColor">
              <span class="ringing">
                <i class="iconfont icon-huanfu"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a"  @click="change_type(a)">萌葱绿</el-dropdown-item>
                <el-dropdown-item command="b"  @click="change_type(b)">栀子黄</el-dropdown-item>
                <el-dropdown-item command="c"  @click="change_type(c)">亮晶蓝</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <!--<span class="message">
            <i class="iconfont icon-commenting-o"></i>
          </span>-->
        </div>
      </div>
    </header>
    <!-- 修改密码 -->
    <el-dialog title="修改密码" class="my-dialog" :visible.sync="changePasswordDialog" width="30%">
      <div class="dialog-content">
        <el-form :model="changePwdForm" :rules="rules" label-width="100px" class="registered-form">
            <el-form-item label="原始密码" prop="password">
              <el-input type="password" v-model="changePwdForm.password"  placeholder="请输入密码(6~16位数字和字母组合)"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="newPassword">
              <el-input type="password" v-model="changePwdForm.newPassword"  placeholder="请输入新密码(6~16位数字和字母组合)"></el-input>
            </el-form-item> 
             <el-form-item label="确认密码" prop="againPassword">
              <el-input type="password" v-model="changePwdForm.againPassword"  placeholder="请重复新密码(6~16位数字和字母组合)"></el-input>
            </el-form-item> 
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="changePwd()">提 交</el-button>
      </span>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>
<script>
import md5 from "js-md5"
import { toCheckPwd2 } from "@/utils/validate"
import headerIcon from '../../assets/images/user.png'
export default {
  name: "layout",
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入原始密码"));
      } else {
        // if(!toCheckPwd2(this.changePwdForm.password)){
        //   callback(new Error('密码格式错误'));
        // }else{
        //   callback();
        // }
        callback();
      }
    };
    var validateNewPass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入新密码"));
      } else {
        // if(!toCheckPwd2(this.changePwdForm.newPassword)){
        //   callback(new Error('密码6-16位字符（包含数字和字母两种）'));
        // }else{
        //   callback();
        // }
        callback();
      }
    };
    var validateAgainPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.changePwdForm.newPassword) {
        //  else if (!toCheckPwd2(this.changePwdForm.againPassword)) {
        //     callback(new Error('密码6-16位字符（包含数字和字母两种）'));
        // }
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      account: "",
      logoUrl: "",
      changePwdForm: {
        password: "",
        newPassword: "",
        againPassword: ""
      },
      token: this.getToken(),
      prams: {},
      changePasswordDialog: false,
      //校验
      rules: {
        password: [
          { required: true, validator: validatePassword, trigger: "blur" }
        ],
        newPassword: [
          { required: true, validator: validateNewPass, trigger: "blur" }
        ],
        againPassword: [
          { required: true, validator: validateAgainPass, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getMyMenuList()
    //计算重载activeIndex
    var path = this.$route.matched[1].path;
    switch (path) {
      case "/organization":
        this.activeIndex = "index2";
        break;
      case "/record":
        this.activeIndex = "index3";
        break;
      case "/supervisorLog":
        this.activeIndex = "index4";
        break;
      default:
        this.activeIndex = "index1";
        break;
    }
    // console.log(this.$route.matched[1]);
    this.account = localStorage.getItem('name')
    this.logoUrl = localStorage.getItem('logoUrl')
    //换肤
    if (localStorage.getItem("themeClass") != null) {
      document.getElementById("app").className = localStorage.getItem(
        "themeClass"
      );
    }
  },
  methods: {
    //获取用户权限
    getMyMenuList(){
      let params = {   
        menuName: '',
        menuCode:'',
        parentId: '',
        isLeaf: '' 
      }
      this.$api.getMyMenuList(params).then(res=> {
        if(res.errorCode === '1'){
          localStorage.setItem('getUserAuthorityList',JSON.stringify(res.data));
          // this.$store._mutations.getUserAuthorityList[0](res.data);
          console.log(res.data)
        }
      })
    },    
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      switch (key) {
        case "index1":
          this.$router.push("/project");
          break;
        case "index2":
          this.$router.push("/organization");
          break;
        case "index3":
          this.$router.push("/record");
          break;
        case "index4":
          this.$router.push("/supervisorLog");
          break;
        case "index6":
          this.$router.push("/library");
          break;
        case "index7":
          this.$router.push("/system");
          break;
      }
    },
    //点击换肤
    changeColor(command) {
      document.getElementById("app").className = "theme" + command;
      //存储换肤记录
      var a = document.getElementById("app").className;
      localStorage.setItem("themeClass", a);
    },
    // 悬浮姓名下拉框内的点击事件
    handleClick(command) {
      if (command == 4) {
        this.$confirm("退出当前用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let refreshToken = localStorage.getItem("refreshToken");
            let accessToken = localStorage.getItem("accessToken");
            let data = {
              accessToken: accessToken,
              refreshToken: refreshToken,
              isIm: "",
              token: this.getToken()
            };
            this.$store.dispatch("logout", data).then(() => {
              localStorage.clear();
              this.$router.push({ path: "/login" });
              this.$message({
                type: "success",
                message: "退出成功！"
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消退出"
            });
          });
      } else if (command == 2) {
        this.changePasswordDialog = true;
      } else if (command == 1) {
        // this.personalInformation = true
      } else if (command == 3) {
        //  this.personalInformation = true
      }
    },
    //修改密码
    changePwd() {
      let Base64 = require("js-base64").Base64;
      let prams = {
        oldPassword: Base64.encode(md5(this.changePwdForm.password)),
        password: Base64.encode(md5(this.changePwdForm.newPassword))
      };
      this.$api
        .editPwd(prams)
        .then(response => {
          if (response.errorCode === "1") {
            this.$message.success("修改密码成功！");
            this.changePasswordDialog = false;
            this.$store.dispatch("logout").then(() => {
              localStorage.clear();
              this.$router.push({ path: "/login" });
            });
          } else {
            this.$message.warning(response.resultMsg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../styles/mixin.scss";
@media screen and (max-width: 1220px) {
  .layout {
    .header {
      .nav {
        .el-menu {
          & .el-menu-item {
            padding: 0 8px !important;
          }
        }
      }
    }
  }
}
.layout {
  height: 100%;
  .index {
    height: 100%;
    padding-top: 80px;
    box-sizing: border-box;
  }
  .header {
    width: 100%;
    height: 80px;
    box-shadow: 10px 1px 15px rgba(0, 0, 0, 0.17);
    position: fixed;
    top: 0;
    z-index: 1002;
    // background:#438fe5;
    color: #fff;
    .logo {
      height: 54px;
      width: 285px;
      float: left;
      margin-top: 18px;
      background: url("../../assets/images/logo.png") no-repeat;
      background-position: center center;
    }
    .nav {
      float: left;
      position: relative;
      border: #ccc solid 0px;
      .el-menu {
        & .el-menu-item {
          padding: 0 12px;
          float: left;
          text-align: center;
          color: #abd3ff;
          height: 80px;
          border: 0;
          i {
            font-size: 30px;
          }
        }
      }
      // .el-menu-demo {
      //   background-color:#438fe5;
      // }

      .el-dropdown-item {
        padding: 0 30px;
      }
      // .el-menu-item.is-active {
      //   background: #fff;
      //    span,i{
      //     color:#438fe5;
      //   }
      // }
      // .el-menu--horizontal .el-menu-item:hover {
      //   background: #fff;
      //   color:#438fe5;
      //    span,i{
      //     color:#438fe5;
      //   }
      // }
    }
    .item {
      border-left: 1.5px solid rgba(255, 255, 255, 0.5);
      float: right;
      margin: 11px 0;
      padding: 11px 0;
      padding-left: 24px;
      font-size: 16px;
      line-height: 32px;
      color: #fff;
      img,
      .span {
        float: left;
      }
      .wechat {
        position: relative;
        i {
          font-size: 20px;
        }
      }
      .msg-num {
        position: absolute;
        left: 12px;
        width: 16px;
        height: 16px;
        border-left: 1px solid #fff;
        line-height: 16px;
        text-align: center;
        background-color: #e85657;
        border-radius: 50%;
        font-size: 12px;
      }
      .names {
        font-size: 14px;
        padding-left: 7px;
        i {
          position: relative;
          top: 2px;
          font-size: 16px;
        }
      }
      .el-icon-arrow-down {
        padding-left: 5px;
      }
      .el-dropdown {
        .iconfont {
          font-size: 18px;
          color: #fff;
          padding: 0px 8px 0px 0px;
          line-height: 40px;
          display: inline-block;
        }
      }
      .stand {
        padding: 0 7px;
        color: rgba(255, 255, 255, 0.5);
      }
      .ringing {
        padding: 0 5px;
        i {
          font-size: 20px;
        }
      }
      .message {
        padding-right: 15px;
        i {
          font-size: 20px;
        }
      }
      img {
        width: 33px;
        height: 33px;
        border-radius: 100%;
      }
    }
  }
}
/* 导航栏动画效果 */
.v-enter {
  opacity: 0;
}
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
