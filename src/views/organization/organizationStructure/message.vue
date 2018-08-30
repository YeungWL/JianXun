<template>
  <el-dialog
  title="聊天"
  :visible="value"
  width="30%"
  :before-close="close">
  <div>
    <th-message ref="messagebox" :useText="true" :usePulldown="true" :pulldownConfig="pulldownconfig" :topPadding="0" :messageData="messageData" :funcList="funclist" :bigBtn="bigbtn" :showInput="showinput" :selfFace="selfface" :otherFace="visitor.logoUrl" :showEmoticon="true" @sendOut="senRequest" @galleryCall="gallery" @cameraCall="camera" @quickCall="quick" @bigBtnCall="btncall" @faceClick="faceclick" @msgClick="msgclick" @pulldownCall="pulldowncall">
    </th-message>
  </div>

    <!-- <th-dialog :isShow.sync="showdialog" :showFrom="dialogfrom" :closeOnClickshadow="true" @onHide="hidedialog">
    </th-dialog> -->
  </el-dialog>
</template>

<style>
.messagebox{
    height: 500px!important;
}
</style>

<script>

import facelist from './imoji.setting'

//测试
const messageData = [
  {
    type: 1,
    text: "在吗？医生"
  },
  {
    type: 2,
    text: "你好，有什么事？"
  },
  {
    type: 1,
    text: "在吗？医生"
  },
  {
    type: 2,
    text: "你好，有什么事？"
  },
  {
    type: 1,
    text: "在吗？医生"
  },
  {
    type: 2,
    text: "你好，有什么事？"
  },
  {
    type: 1,
    text: "在吗？医生"
  },
  {
    type: 2,
    text: "你好，有什么事？"
  },
  {
    type: 1,
    text: "在吗？医生"
  },
  {
    type: 2,
    text: "你好，有什么事？"
  },
  {
    type: 1,
    text: "在吗？医生"
  },
  {
    type: 2,
    text: "你好，有什么事？"
  },
  {
    type: 1,
    text: "在吗？医生"
  },
  {
    type: 2,
    text: "你好，有什么事？"
  },
  {
    type: 1,
    text: "在吗？医生"
  },
  {
    type: 2,
    text: "你好，有什么事？"
  },
  {
    type: 1,
    text: "在吗？医生"
  },
  {
    type: 1,
    text:
      '<img draggable="false" src="http://img0.imgtn.bdimg.com/it/u=92848021,3933526889&fm=11&gp=0.jpg" />',
    isimg: true
  },
  {
    type: 2,
    text:
      '<img draggable="false" src="http://img1.imgtn.bdimg.com/it/u=3044191397,2911599132&fm=27&gp=0.jpg">',
    isimg: true
  },
  {
    type: 1,
    text:
      '<img draggable="false" src="http://img4.imgtn.bdimg.com/it/u=3088474657,3195539965&fm=11&gp=0.jpg">',
    isimg: true
  },
  {
    type: 1,
    text:
      "你好，有什么事？你好，有什么事？你好，有什么事？你好，有什么事？你好，有什么事？你好，有什么事？你好，有什么事？你好，有什么事？你好，有什么事？你好，有什么事？"
  }
];

export default {
  name: "",
  props:{
    value:Boolean,
    visitor:Object
  },
  watch:{
      visitor(newValue){
          if(this.$refs.messagebox){
              this.$refs.messagebox.messageReset();
          }
          this.getMessageData();
      } 
  },
  data () {
    return {
      bigbtn: "",
      showinput: true,
      funclist: ["gallery", "camera", "quick"],
      messageData:[],
      count: 10,
      showdialog: false,
      dialogfrom: "bottom",
      selfface: localStorage.getItem('logoUrl'),
      otherface: '',
      facelist: facelist,
      openconfig: {
        open: "打开",
        close: "关闭"
      },
      pulldownconfig: {
        default: "<div>下拉刷新</div>",
        up: "<div style='color:red'>下拉刷新</div>",
        down: "<div style='color:blue'>松手刷新</div>",
        loading: "<span style='color:green'>加载中</span>"
      }
    };
  },
  mounted () {
  },
  methods: {
      close(){
          this.$emit('input',false)
      },
      getMessageData(){
          
          this.messageData = Math.random()>0.5?messageData:[];
      },
    replaceImg (word) {
      return word.replace(/\[[\u4E00-\u9FA5]{1,3}\]/gi, word => {
        let newWord = word.replace(/\[|\]/gi, "");
        let index = this.facelist.indexOf(newWord);
        return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`;
      });
    },
    senRequest (h) {
      this.messageData.push({
        type: 1,
        text: this.replaceImg(h)
      });
      console.log(h);
    },
    gallery () {
      console.warn("调起了自定义组件");
      this.messageData.push({
        type: 3,
        text: "调起了自定义相册组件"
      });
    },
    camera () {
      // this.messageData.push({
      //   type: 3,
      //   text: "调起了自定义拍照组件"
      // });
      this.messageData.push({
        type: 1,
        text:
          '<img src="http://img4.imgtn.bdimg.com/it/u=3088474657,3195539965&fm=11&gp=0.jpg">',
        isimg: true
      });
    },
    btncall () {
      alert("前往评价了");
      this.doctorbar.btn = "已评价";
      this.doctorbar.btntype = "default";
    },
    topbtncall () {
      this.messageData.push({
        type: 4,
        text: "您已完成咨询，请前往评价"
      });
      this.bigbtn = "前往评价";
      this.showinput = false;
      this.doctorbar.btncanlick = false;
    },
    quick () {
      this.showdialog = true;
    },
    hidedialog () {
      this.showdialog = false;
    },
    faceclick (d) {
      console.log(d);
    },
    msgclick (d) {
      if (d.isimg) alert(d.text);
    },
    headclick () {
      console.log("点击了头像");
    },
    pulldowncall () {
      console.log("pulldown");
      this.messageData.unshift({
        type: 1,
        text: "新增"
      });
      setTimeout(() => {
        this.$refs.messgebox.resetpulldown();
      }, 2000);
    }
  }
};
</script>
