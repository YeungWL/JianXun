<template>
  <div class="page-content-body">
    <div class="page-header page-navbar clearfix">
      <div class="ui-title float_l"><span class="iconfont icon-home"></span>历史记录</div>
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
                <a href="javascript:;"><img :src="item.path"></a>
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
              <el-form-item label="整改人：" >
                <el-input v-model="item.replyName" :readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="整改时间：" >
                <el-input v-model="item.replyTime" :readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="图片："  class="flex-100" v-if="item.replyPictures.length != 0">
                <div class="imgbox" v-for="j in item.replyPictures">
                  <a href="javascript:;"><img :src="j.path"></a>
                </div>
              </el-form-item>                                              
            </el-form>
          </div>
          <div class="ui-form form-bdnone" v-else>
            <el-form label-width="100px" class='flex-form'>
              <el-form-item label="复查描述："  class="flex-100">
                <el-input type="textarea" v-model="item.replyDesc" :readonly="readonly"></el-input>
              </el-form-item>            
              <el-form-item label="复查人：" >
                <el-input v-model="item.replyName" :readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="复查时间：" >
                <el-input v-model="item.replyTime" :readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="图片："  class="flex-100" v-if="item.replyPictures.length != 0">
                <div class="imgbox" v-for="j in item.replyPictures">
                  <a href="javascript:;"><img :src="j.path"></a>
                </div>
              </el-form-item>                                              
            </el-form>
          </div>
        </section> 
      </div>     
    </div>
  </div>
</template>
<script>
export default {  
  name: 'history',
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
      readonly: true        
    }
  },
  mounted() {
    this.getHistoryRecord() 
    // console.log(this.$route.query.questionId)
  },  
  created() {
    
  },
  methods: {
    
    getHistoryRecord() {
      this.$api.historyRecord({questionId: this.$route.query.questionId}).then(response => {     
        if (response.errorCode === '1') {          
          this.questionForm = response.data[0].question
          this.replyVoListForm =  response.data[0].replyVoList
        }      
      }) 
    },     
    /* 返回 */
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
        display: inline-block;
        margin-right: 10px;
        img{
          width: 200px;
        }        
      }

    }
  }
}
</style>