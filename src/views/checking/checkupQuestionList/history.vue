<template>
  <div class="page-content-body">
    <div class="page-header page-navbar clearfix">
      <div class="ui-title float_l"><span class="iconfont icon-home"></span>历史记录</div>
      <el-button type="primary"  icon="el-icon-d-arrow-left" class="float_r" @click="goBack">返回</el-button> 
    </div>
    <div class="page-main">
      <section>
        <div class="ui-form">
          <el-form ref="historyForm" label-width="100px" :model="questionForm" class='my-form'>
            <el-form-item label="问题名称：" >
              <el-input v-model="questionForm.title"></el-input>
            </el-form-item>
            <el-form-item label="问题描述：" >
                 <el-input v-model="questionForm.queDesc"></el-input>
            </el-form-item>            
            <el-form-item label="要求时间：" >
              <el-input v-model="questionForm.requireTime"></el-input>
            </el-form-item>
            <el-form-item label="问题属性：" >
              <el-input v-model="questionForm.questionAttr"></el-input>
            </el-form-item>
            <el-form-item label="检查类别：" >
              <el-input v-model="questionForm.checkType"></el-input>
            </el-form-item>
            <el-form-item label="图片：" >
               <el-input v-model="questionForm.replyPictures"></el-input>
            </el-form-item>
            <el-form-item label="检查人：" >
              <el-input v-model="questionForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="检查时间：" >
               <el-input v-model="questionForm.createTime"></el-input>
            </el-form-item>                                    
          </el-form>
        </div>
      </section>
      <section>
        <div class="ui-form">
          <el-form ref="historyForm" label-width="100px" :model="replyVoListForm" class='my-form'>
            <el-form-item label="整改描述：" >
              <el-input v-model="replyVoListForm.replyDesc"></el-input>
            </el-form-item>
            <el-form-item label="图片：" >
                 <el-input v-model="replyVoListForm.replyName"></el-input>
            </el-form-item>            
            <el-form-item label="整改人：" >
              <el-input v-model="replyVoListForm.replyTime"></el-input>
            </el-form-item>
            <el-form-item label="整改时间：" >
              <el-input v-model="replyVoListForm.replyPictures"></el-input>
            </el-form-item>                                  
          </el-form>
        </div>
      </section>      
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
      replyVoListForm: {
        replyDesc: '',
        replyName: '',
        replyTime: '',
        replyPictures: []
      }           
    }
  },
  mounted() { 
  },  
  created() {
  },
  methods: {
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

</style>