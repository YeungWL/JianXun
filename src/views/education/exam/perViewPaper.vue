<template>
  <div class="page-content-body">
    <div class="my-dialog scwj-dialog">
      <div>
        <span style="font-weight:bold;font-size:20px">{{examName}}</span>
      </div>
      <div>
        <span
          style="color:#000;font-weight:bold"
        >单项选择题（每小题{{radioScore}}分，{{radioCount}}小题，共{{radioScore*radioCount}}分）</span>
        <ul>
          <li v-for="item in markRadioList">
            <div>
              <el-form ref="markRadioList" label-width="10px">
                <el-form-item prop="title">
                  <span>{{item.ordIndex}}. {{item.title}}</span>
                </el-form-item>
                <el-form-item label prop="answer">
                  <el-radio-group v-model="item.answer">
                    <span class="value">{{item.answer}}</span>
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
      <div>
        <span
          style="color:#000;font-weight:bold"
        >多项选择题（每小题{{selectScore}}分，{{selectCount}}小题，共{{selectScore*selectCount}}分）</span>
        <ul>
          <li v-for="item in markSelectList">
            <div>
              <el-form ref="markSelectList" label-width="10px">
                <el-form-item prop="title">
                  <span>{{item.ordIndex}}. {{item.title}}</span>
                </el-form-item>
                <el-form-item label prop="item.answer">
                  <el-checkbox-group v-model="item.answer">
                    <div class="ui-checkbox-item">
                      <el-checkbox
                        v-for="(item,index) in item.optionList"
                        :key="item.optName"
                        :label="item.optName"
                        disabled
                      >
                        <a class="value">{{item.optName}}</a>
                        <span style="width:500px">{{item.optContent}}</span>
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <span
          style="color:#000;font-weight:bold"
        >判断题（每小题{{judgeScore}}分，{{judgeCount}}小题，共{{judgeScore*judgeCount}}分）</span>
        <ul>
          <li v-for="item in markJudgeList">
            <div>
              <el-form ref="markJudgeList" label-width="10px">
                <el-form-item prop="title">
                  <span>{{item.ordIndex}}. {{item.title}}</span>
                </el-form-item>
                <el-form-item label prop="answer">
                  <el-radio-group v-model="item.answer">
                    <span class="value">{{item.answer}}</span>
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
      <div>
        <span style="font-weight:bold">注：一旦生成考卷，将不允许对各项参数及考题进行编辑修改。</span>
      </div>
    </div>
    <div class="page-header clearfix">
      <el-form class="search-form" :inline="true" ref="form">
        <div style="margin-left:20px;">
          <el-button type="primary" @click="finalPaper" v-if="isEdit==='Y'">生成考卷</el-button>
          <el-button type="primary" @click="goBack">{{isEdit=='Y'?"返回修改":"返回"}}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "perViewPaper",
  data() {
    return {
      examId: this.$route.query.examId,
      examName: this.$route.query.examName,
      isEdit: this.$route.query.isEdit,
      source: this.$route.query.source,
      orgId:this.$route.query.orgId,

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
    this.getPaperQuestionList(3, 2);
    this.getPaperQuestionList(3, 3);
  },
  methods: {
    indexAdd() {
      this.radioIndex = this.radioIndex + 1;
      return this.radioIndex + ".";
    },

    finalPaper() {
      this.$confirm(
        "一旦生成考卷，将不允许对各项参数及考题进行编辑修改。确定要生成吗?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false
        }
      )
        .then(() => {
          this.$api
            .saveFinalOrEditExam({
              examId: this.examId,
              examType: 2
            })
            .then(res => {
              if (res.errorCode === "1") {
                this.$message.success("成功生成考卷");
                this.source="1";
                this.goBack();
               
              } else {
                this.$message.error(res.resultMsg);
              }
            });
        })
        .catch(() => {
          this.$message.warning("操作取消");
          return false;
        });
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
                for (var i = 0; i < this.markSelectList.length; i++) {
                  this.markSelectList[i].ordIndex = i + 1;
                  this.markSelectList[i].answer = this.markSelectList[
                    i
                  ].answer.split(",");
                }
              } else if (questionType === 3) {
                this.markJudgeList = res.data;
                for (var i = 0; i < this.markJudgeList.length; i++) {
                  this.markJudgeList[i].ordIndex = i + 1;
                }
              }
            }
          } else {
            this.$message.error(res.resultMsg);
          }
        });
    },

    goBack() {
      if (this.source === "1") {

        this.$router.push({
        name: "examPaper",
          query: {
            orgId: this.orgId,
          }
        });
      } else {

          this.$router.go(-1)
          // this.$router.push({
          //   name: "editPaper",
          //   query: {
          //     radioScore: this.radioScore,
          //     selectScore: this.selectScore,
          //     judgeScore: this.judgeScore,

          //     examName: this.examName,
          //     orgId: this.orgId,
          //     examId: this.examId
          //   }
          // });


      }
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
  .el-radio + .el-radio {
    margin-left: 0px;
  }
  .el-radio__input.is-disabled + span.el-radio__label,
  span {
    color: #555;
  }
}
.ui-checkbox-item {
  .el-checkbox {
    display: block;
    padding: 0;
    line-height: 24px;
  }
  .el-checkbox + .el-checkbox {
    margin-left: 0px;
  }
  .el-checkbox__input.is-disabled + span.el-checkbox__label,
  span {
    color: #555;
  }
}
</style>