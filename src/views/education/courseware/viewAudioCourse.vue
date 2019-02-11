<template>
  <div class="page-content-body">
    <div class="page-header page-navbar clearfix">
      <div class="ui-title float_l"><span class="iconfont icon-home"></span>课件详情
      </div>
      <el-button type="primary"  icon="el-icon-d-arrow-left" class="float_r" @click="goBack">返回</el-button>
    </div>
    <div class="page-main">
      <div class="page-content">
        <div class="meta-list">
          <h1 class="title">{{viewCourseForm.courseName}}</h1>
          <p class="sub-title">创建时间：{{viewCourseForm.createTime}}</p>
        </div>
        <div class="logoUrl"><img :src="viewCourseForm.logoUrl" alt=""></div>
        <div class="audio-play">
          <div class="play-bar"><audio class="audio-bar" :src="currAudio" autoplay="" controls="" @ended="nextAudio"></audio></div>
          <ul  class="audioList-header">
            <li><span>共<em>{{viewCourseForm.mediaList.length}}</em>个</span><span>名称</span><span>描述</span></li>
          </ul>
          <ul class="audioList-body">
               <li v-for="(item,index) in viewCourseForm.mediaList" :class="{selected:indexAudio == index}" @click="play(index)">
                  <span><i class="index">{{index+1}}</i><i class="iconfont icon-play play-btn"></i></span>
                   <span>{{ item.name }}</span>
                  <span>{{ item.attachDesc }}</span>

               </li>
           </ul>
        </div>
        <div class="block-title"><h2>课件描述</h2></div>
        <div class="content" v-html="viewCourseForm.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'courseware',
  data() {
    return {
      viewCourseForm: {
        courseId: '',
        courseName: '',
        createTime:'',
        courseType: 3,
        content: '',
        logoUrl: '',
        attachList: [],
        mediaList: [], // 媒体文件
      },
      resoureUploadFile: [],
      indexAudio: 0,
    }   
  },
  mounted() {
    this.editCoursePage()
  },
  methods: {
    play (index){
      this.indexAudio = index
    },
    nextAudio (){
      if (this.indexAudio === this.viewCourseForm.mediaList.length-1){
        this.indexAudio = -1
      }
      this.indexAudio ++

    },
    // 获取信息
    editCoursePage() {
      let params = {
        courseId: this.$route.query.id,
        courseType: this.$route.query.courseType,
        attachType: 0
      }
        this.$api
          .editCoursePage(params)
          .then(response => {
            if (response.errorCode === '1') {
                this.viewCourseForm.courseId = response.data.courseId;
                this.viewCourseForm.courseName = response.data.courseName;
                this.viewCourseForm.createTime = response.data.createTime;
                this.viewCourseForm.content = response.data.content;
                this.viewCourseForm.logoUrl = response.data.logoUrl;
                this.resoureUploadFile = response.data.attachList;
                this.viewCourseForm.mediaList = response.data.mediaList;// 多媒体类型附件

            }
          })
    },
    // 返回
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    currAudio () {
      if (this.viewCourseForm.mediaList.length != 0) {
        return this.viewCourseForm.mediaList[this.indexAudio].filePath
      }
      // console.log(this.indexAudio);

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
      margin: 0 auto;
      max-width: 1200px;
    }
    .page-content{

      padding-bottom: 20px;
    }
    .enclosure_revise{
      position: absolute;
      right: 0;
      top: 20px;
      width: 300px;
    }
    .title, .sub-title{
      text-align: center;
    }
    .sub-title{
      padding-bottom: 15px;
    }
    .block-title{
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      height: 84px;
      padding: 0 15px;
      h2 {
        font-size: 24px;
      }
    }
    .content {
      line-height: 24px;
      padding: 8px 15px;
      font-size: 14px;
      border: 1px solid #d1d1d1;
      border-radius: 2px;
      display: block;
      resize: none;
      width: 100%;
      min-height: 90px;
      margin-bottom: 15px;
      height: 90px;
    }
  .logoUrl {
    text-align: center;
    img {
      margin: 0 auto;
      width: auto;
      height: 200px;
    }
  }
    .play-bar {
      position: relative;
      height: 72px;
      min-width: 850px;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: center;
      align-items: center;
      .audio-bar {
        width: 100%;
      }
    }
    .audioList-header{
      li{
        em {
          color:#555;
        }
        background: #fff!important;
        border-bottom: 1px solid #ededed;
        margin-bottom: 15px;
      }

    }
    .audioList-body,.audioList-header {
      color: #aaa;
      li{
        text-align: left;
        height: 50px;
        line-height: 50px;
        transition: background-color .2s linear;
        cursor: pointer;
        &:nth-child(odd){
          background: #f7f7f7;
        }
        &:hover {
          background-color: #e8e9ed;
        }
        .select-link {
          display: inline-block;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &.selected {
          background-color: #e8e9ed;
          color: #555;
          .index {
            display: none;
          }
          .play-btn {
            display: block;
          }
        }
        .index {
          display: block;
          font-style: normal;
        }
        .play-btn {
          display: none;
          font-size: 20px;
          color: #3386e4;
          line-height: 46px;
        }

        span{
          display: inline-block;
          vertical-align: inherit;
          padding: 0 9px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:nth-child(1){
            width: 8%;
          }
          &:nth-child(2){
            width: 22%;
          }
          &:nth-child(3){
            width: 64%;
          }
        }
      }
    }
</style>
