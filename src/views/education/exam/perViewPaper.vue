<template>
  <div class="page-content-body">
    <div class="my-dialog scwj-dialog">
      <div>
        <span>一、单项选择题（每小题{{radioScore}}分，{{radioCount}}小题，共{{radioScore*radioCount}}分）</span>
        <ul>
          <li v-for="item in markRadioList">
            <div>
              <el-form ref="markRadioList" label-width="10px">
                <el-form-item prop="title">
                  <span>{{item.ordIndex}}. {{item.title}}</span>
                </el-form-item>
                <el-form-item label prop="answer">
                  <el-radio-group v-model="item.answer">
                    <div class="ui-radio-item">
                      <el-radio
                        :key="index"
                        :label="item.optName"
                        v-for="(item,index) in item.optionList"
                        disabled
                      >
                        <a class="value">{{item.optName}}</a>
                        
                        <span style="width:500px">{{item.optContent}}</span>
                      </el-radio>
                    </div>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
          </li>
        </ul>
      </div>

      <!-- <div>
       <span>
        二、多项选择题（每小题{{}}分，{{}}小题，共{{}}分）
       </span>
       <ul>
        <li v-for="item in viewAttachment">
         <div>
        <el-form ref="InputFrom" label-width="110px" :model="InputFrom">
         <el-form-item :label="selectItem" prop="title">
          <span>{{}}</span>
         </el-form-item>
         <el-form-item label="" prop="answer">
          <el-checkbox-group v-model="InputFrom.answer">
           <el-checkbox v-for="(item,index) in InputFrom.optionList" :label="item.optName"
          :key="item.optName">
          <a class="value">
           {{item.optName}}
          </a>
          <el-form-item class="inlineItem">
           <span>{{item.optContent}}</span>
          </el-form-item>
           </el-checkbox>
          </el-checkbox-group>
         </el-form-item>
        </el-form>
         </div>
        </li>
       </ul>
      </div>
     
      <div>
       <span>
        三、判断题（每小题{{}}分，{{}}小题，共{{}}分）
       </span>
       <ul>
        <li v-for="item in viewAttachment">
         <div>
        <el-form ref="InputFrom" label-width="110px" :model="InputFrom">
         <el-form-item :label="radioItem" prop="title">
          <span>{{}}</span>
         </el-form-item>
         <el-form-item label="" prop="answer">
          <el-radio-group v-model="InputFrom.answer">
           <el-radio :key="index" :label="item.optName" v-for="(item,index) in InputFrom.optionList">
          <a class="value">
           {{item.optName}}
          </a>
          <el-form-item class="inlineItem">
           <span>{{item.optContent}}</span>
          </el-form-item>
           </el-radio>
          </el-radio-group>
         </el-form-item>
        </el-form>
         </div>
        </li>
       </ul>
      </div>-->
      <div>
        <span>注：一旦生成考卷，将不允许对各项参数及考题进行编辑修改。</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "perViewPaper",
  data() {
    return {
      examId: this.$route.query.examId,

      radioIndex: 0,
      radioScore: 0,
      selectScore: 0,
      judgeScore: 0,

      radioCount: 0,
      selectCount: 0,
      judgeCount: 0,
      totalSummary: 0,
      markRadioList: [],
      markSelectList: [],
      markJudgeList: []
    };
  },
  created() {
    this.getExamPaperInfo();
    this.getPaperQuestionList(3, 1);
  },
  methods: {
    indexAdd() {
      this.radioIndex = this.radioIndex + 1;
      return this.radioIndex + ".";
    },

    // 获取考卷信息
    getExamPaperInfo() {
      this.$api
        .getExamInfo({
          examId: this.examId
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.radioScore = res.data.radioScore;
            this.selectScore = res.data.selectScore;
            this.judgeScore = res.data.judgeScore;
          } else {
            this.$message.error(res.resultMsg);
          }
        });

      this.$api
        .getExamQastoreCount({
          examId: this.examId
        })
        .then(res => {
          if (res.errorCode === "1") {
            // 单项选择个数
            this.radioCount =
              res.data.publicQastore.radioCount +
              res.data.personQastore.radioCount;
            // 多项选择个数
            this.selectCount =
              res.data.publicQastore.selectCount +
              res.data.personQastore.selectCount;
            //判断个数
            this.judgeCount =
              res.data.publicQastore.judgeCount +
              res.data.personQastore.judgeCount;

            // 总计分数
            this.totalSummary = res.data.totalScore;
          } else {
            this.$message.error(res.resultMsg);
          }
        });
    },

    getPaperQuestionList(TabType, questionType) {
      this.$api
        .getExamQastoreList({
          examId: this.examId,
          qastoreType: TabType,
          type: questionType,
          title: "",
          showCount: 100,
          currentPage: 1
        })
        .then(res => {
          if (res.errorCode === "1") {
            if (TabType === 3) {
              if (questionType === 1) {
                this.markRadioList = res.data;
                for (var i = 0; i < this.markRadioList.length; i++) {
                  this.markRadioList[i].ordIndex = i + 1;
                }
              } else if (questionType === 2) {
                this.markSelectList = res.data;
              } else if (questionType === 3) {
                this.markJudgeList = res.data;
              }
            }
          } else {
            this.$message.error(res.resultMsg);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.createExamDialog {
  label.el-radio,
  label.el-checkbox {
    margin-left: -0;
    margin-bottom: 10px;
  }

  .inlineItem {
    display: inline-block;
  }

  .value {
    margin-right: 5px;
  }

  .delete,
  .add {
    color: #555;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 5px;
  }

  .msg {
    color: red;
  }
}
.el-form-item {
    margin-bottom: 0px;
}
.ui-radio-item {
    .el-radio {
        display: block;
        padding: 0;
        line-height: 24px;
    }
    .el-radio+.el-radio {
      margin-left: 0px;
    }
    .el-radio__input.is-disabled+span.el-radio__label, span {
      color: #555;
    }
}
</style>