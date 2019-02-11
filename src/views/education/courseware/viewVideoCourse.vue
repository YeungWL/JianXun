<template>
    <div class="page-content-body">
        <div class="page-header page-navbar clearfix">
            <div class="ui-title float_l"><span class="iconfont icon-home"></span>课件详情
            </div>
            <el-button type="primary"  icon="el-icon-d-arrow-left" class="float_r" @click="goBack">返回</el-button>
        </div>
        <div class="page-main">
            <div class="page-content">
                <div class="meta_list">
                    <h1 class="title">{{viewCourseForm.courseName}}</h1>
                    <p class="sub-title">创建时间：{{viewCourseForm.createTime}}</p>
                </div>
                <div id="play">
                    <div class="video-content clearfix" id="videoContent">
                        <!--右侧目录-->
                        <div class="right info-box">
                            <ul class="qy-episode-txt" v-for="(item,index) in mediaList ">
                                <li class="select-item " :class="{selected:selectedItem == index}" @click="selectItem(item,index)"><a href="javascript:void(0)"  class="select-link">课件{{index+1}}&nbsp;&nbsp;{{item.name}} <p class="item-desc">{{item.attachDesc}}</p></a>
                                </li>
                            </ul>
                        </div>
                        <!--//右侧目录-->
                        <!--播放器-->
                        <div class="player-box box-shadow" :class="isShow?'toLeft':'toRight'">
                            <custom-video ref="customVideo" ></custom-video>
                        </div>
                        <!--//播放器-->
                    </div>
                </div>

                <div class="content" ><em class="item-title">课程详情：</em><div class="item-content" v-html="viewCourseForm.content"></div></div>

            </div>
        </div>
    </div>
</template>

<script>
    import customVideo from 'components/media/customVideo'
    export default {
        name: 'viewVideoCourse',
        components:{ customVideo },// 视频组件
        data() {
            return {
                viewCourseForm: {
                    courseId: '',
                    courseName: '',
                    createTime:'',
                    courseType: 1,
                    content: '',
                    attachList: [],
                    mediaList: [], // 媒体文件
                },
                resoureUploadFile: [],
                mediaList:[],
                isShow: true,
                selectedItem: 0 // 选择第几个视频
            }
        },
        mounted() {
            this.editCoursePage()
            // this.editCoursePage(courseId)
        },
        methods: {
          // 选择播放哪一个视频
          selectItem(item,index){
                this.$nextTick(function () {
                  this.$refs.customVideo.playerOptions.sources[0].src = item.filePath
                  this.selectedItem = index
                });
            },
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
                            this.resoureUploadFile = response.data.attachList;
                            this.mediaList = response.data.mediaList;// 视频
                            this.$nextTick(function () {
                              this.$refs.customVideo.playerOptions.sources[0].src = this.mediaList[0].filePath // 获取视频地址，默认第一个
                            });
                          // console.log(this.mediaList);
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
        margin: 0 auto;
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
    .content {
        color: #ccc;
        background: #292929;
        border-top-width: 0px;
        padding:10px;
        .item-title {
            line-height: 24px;
            color: #666;
            font-size: 14px;
            font-style: normal;
        }
        .item-content {
            display: inline-block;
            line-height: 24px;
            vertical-align: top;
        }
    }
    .transition{
        transition: all 1s ease;
        -moz-transition: all 1s ease;
        -webkit-transition: all 1s ease;
        -o-transition: all 1s ease;
    }

    .toLeft{
        margin-right: 200px !important;
    }

    .toRight{
        margin-right: 40px !important;
    }

    .toHide{
        right: -160px !important;
    }

    .toShow{
        right: 0px !important;
    }

    // 播放区
    .player-box{
        margin-right: 540px;
        height: 100%;
        position: relative;
    }
    //侧边信息区
    .info-box {
        float: right;
        width: 200px;
        height: 100%;
        background: transparent;
        position: relative;
        overflow: hidden;
    }
     // 视频内容区
    .video-content {
        background: #1f1f1f;
        position: relative;
        padding: 20px 0 20px 20px;
        .select-item {
            position: relative;
            padding-left: 16px;
            border-bottom: 1px solid #282828;
            font-size: 14px;
        }
        .select-item.selected .select-link, .select-link:hover{
            color: #3386e4;
        }
        .select-link {
            display: inline-block;
            max-width: 220px;
            margin-right: 5px;
            line-height: 38px;
            color: #ccc;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .select-item.selected .select-link:before {
            content: "\e67e";
        }
        .select-link:before {
             display: inline-block;
             font-family: iconfont!important;
             font-style: normal;
             -webkit-font-smoothing: antialiased;
             -moz-osx-font-smoothing: grayscale;
             vertical-align: top;
             color: #3386e4;
             font-size: 14px;
             margin-right: 5px;
         }
      .item-desc{
        color: #999;
        font-size: 12px
      }
    }

</style>
