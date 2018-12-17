<template>
  <div class="page-content-body" v-loading="loading" element-loading-text="拼命加载中">
    <div class="page-header clearfix">
      <div class="dialog-content">
        <div class="ui-form">
          <div style=" margin: 10px 10px 10px 50px">
            <table border="0">
              <th align="left" style="width:80px;">公共题库</th>
              <th align="left" style="width:200px;">
                <tr>
                  <th align="left" style="width:60px;">单项:</th>
                  <th align="left" style="width:160px;color:blue">
                    {{publicSingleCount}}（题） *
                    {{radioScore}}（分）
                  </th>
                </tr>
                <tr>
                  <th align="left" style="width:60px;">多项:</th>
                  <th align="left" style="width:160px;color:blue">
                    {{publicMultiCount}}（题） *
                    {{selectScore}}（分）
                  </th>
                </tr>
                <tr>
                  <th align="left" style="width:60px;">判断:</th>
                  <th align="left" style="width:160px;color:blue">
                    {{publicTorFCount}}（题） *
                    {{judgeScore}}（分）
                  </th>
                </tr>
                <tr>
                  <th align="left" style="width:60px;">合计:</th>
                  <th align="left" style="width:160px;color:blue">{{publicSummary}}（分）</th>
                </tr>
              </th>
              <th align="left" style="width:80px;">我的题库</th>
              <th align="left" style="width:200px;">
                <tr>
                  <th align="left" style="width:60px;">单项:</th>
                  <th align="left" style="width:160px;color:blue">
                    {{personalSingleCount}}（题） *
                    {{radioScore}}（分）
                  </th>
                </tr>
                <tr>
                  <th align="left" style="width:60px;">多项:</th>
                  <th align="left" style="width:160px;color:blue">
                    {{personalMultiCount}}（题） *
                    {{selectScore}}（分）
                  </th>
                </tr>
                <tr>
                  <th align="left" style="width:60px;">判断:</th>
                  <th align="left" style="width:160px;color:blue">
                    {{personalTorFCount}}（题） *
                    {{judgeScore}}（分）
                  </th>
                </tr>
                <tr>
                  <th align="left" style="width:60px;">合计:</th>
                  <th align="left" style="width:160px;color:blue">{{personalSummary}}（分）</th>
                </tr>
              </th>
              <th align="left" style="width:110px;color:blue">总分：{{totalSummary}}（分）</th>
            </table>

            <el-form :inline="true">
              <el-form-item label="题目名称：">
                <el-input style="width: 300px" v-model="searchTitle" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="finalPaper">生成考卷</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="close">返回考卷管理主页</el-button>
              </el-form-item>
            </el-form>

            <el-tabs v-model="currentTab" type="card" @tab-click="handleMainType">
              <!--公共题库-->
              <el-tab-pane label="公共题库" name="first">
                <el-tabs v-model="currentPublicTab" @tab-click="handleMainType">
                  <el-tab-pane label="单选题" name="first">
                    <div class="customTable">
                      <el-table ref="publicRadioQuestionTable" :data="publicRadioList" style="width: 100%"
                        @select="selectionChange" v-loading="loading" element-loading-text="拼命加载中">
                        <el-table-column type="selection" min-width="57"></el-table-column>
                        <el-table-column prop="title" label="题目名称" min-width="180"
                          show-overflow-tooltip></el-table-column>
                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="publicRadioCurrentPage" :page-size="publicRadioShowCount"
                        :total="publicRadioTotal"></el-pagination>
                    </div>
                  </el-tab-pane>

                  <el-tab-pane label="多选题" name="second">
                    <div class="customTable">
                      <el-table ref="publicSelectQuestionTable" :data="publicSelectList" style="width: 100%"
                        @select="selectionChange" v-loading="loading" element-loading-text="拼命加载中">
                        <el-table-column type="selection" min-width="57"></el-table-column>
                        <el-table-column prop="title" label="题目名称" min-width="180"
                          show-overflow-tooltip></el-table-column>
                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="publicSelectCurrentPage" :page-size="publicSelectShowCount"
                        :total="publicSelectTotal"></el-pagination>
                    </div>
                  </el-tab-pane>

                  <el-tab-pane label="判断题" name="third">
                    <div class="customTable">
                      <el-table ref="publicJudgeQuestionTable" :data="publicJudgeList" style="width: 100%"
                        @select="selectionChange" v-loading="loading" element-loading-text="拼命加载中">
                        <el-table-column type="selection" min-width="57"></el-table-column>
                        <el-table-column prop="title" label="试题名称" min-width="180"
                          show-overflow-tooltip></el-table-column>
                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="publicJudgeCurrentPage" :page-size="publicJudgeShowCount"
                        :total="publicJudgeTotal"></el-pagination>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-tab-pane>

              <!--我的题库-->
              <el-tab-pane label="我的题库" name="second">
                <el-tabs v-model="currentPersonalTab" @tab-click="handleMainType">
                  <el-tab-pane label="单选题" name="first">
                    <div class="customTable">
                      <el-table ref="personalRadioQuestionTable" :data="personalRadioList" style="width: 100%"
                        @select="selectionChange" v-loading="loading" element-loading-text="拼命加载中">
                        <el-table-column type="selection" min-width="57"></el-table-column>
                        <el-table-column prop="title" label="题目名称" min-width="180"
                          show-overflow-tooltip></el-table-column>
                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="personalRadioCurrentPage" :page-size="personalRadioShowCount"
                        :total="personalRadioTotal"></el-pagination>
                    </div>
                  </el-tab-pane>

                  <el-tab-pane label="多选题" name="second">
                    <div class="customTable">
                      <el-table ref="personalSelectQuestionTable" :data="personalSelectList"
                        style="width: 100%" @select="selectionChange" v-loading="loading"
                        element-loading-text="拼命加载中">
                        <el-table-column type="selection" min-width="57"></el-table-column>
                        <el-table-column prop="title" label="题目名称" min-width="180"
                          show-overflow-tooltip></el-table-column>
                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="personalSelectCurrentPage" :page-size="personalSelectShowCount"
                        :total="personalSelectTotal"></el-pagination>
                    </div>
                  </el-tab-pane>

                  <el-tab-pane label="判断题" name="third">
                    <div class="customTable">
                      <el-table ref="personalJudgeQuestionTable" :data="personalJudgeList" style="width: 100%"
                        @select="selectionChange" v-loading="loading" element-loading-text="拼命加载中">
                        <el-table-column type="selection" min-width="57"></el-table-column>
                        <el-table-column prop="title" label="试题名称" min-width="180"
                          show-overflow-tooltip></el-table-column>
                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="personalJudgeCurrentPage" :page-size="personalJudgeShowCount"
                        :total="personalJudgeTotal"></el-pagination>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-tab-pane>

              <!--已选题库-->
              <el-tab-pane label="已选题库" name="third">
                <el-tabs v-model="currentMarkTab" @tab-click="handleMainType">
                  <el-tab-pane label="单选题" name="first">
                    <div class="customTable">
                      <el-table ref="markRadioQuestionTable" style="width: 100%" v-loading="loading"
                        element-loading-text="拼命加载中" :data="markRadioList" @select="selectionChange">
                        <el-table-column type="selection" min-width="57"></el-table-column>
                        <el-table-column prop="title" label="试题名称" min-width="180"
                          show-overflow-tooltip></el-table-column>
                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="markRadioCurrentPage" :page-size="markRadioShowCount"
                        :total="markRadioTotal"></el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="多选题" name="second">
                    <div class="customTable">
                      <el-table ref="markSelectQuestionTable" style="width: 100%" v-loading="loading"
                        element-loading-text="拼命加载中" :data="markSelectList" @select="selectionChange">
                        <el-table-column type="selection" min-width="57"></el-table-column>
                        <el-table-column prop="title" label="试题名称" min-width="180"
                          show-overflow-tooltip></el-table-column>
                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="markSelectCurrentPage" :page-size="markSelectShowCount"
                        :total="markSelectTotal"></el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="判断题" name="third">
                    <div class="customTable">
                      <el-table ref="markJudgeQuestionTable" style="width: 100%" v-loading="loading"
                        element-loading-text="拼命加载中" :data="markJudgeList" @select="selectionChange">
                        <el-table-column type="selection" min-width="57"></el-table-column>
                        <el-table-column prop="title" label="试题名称" min-width="180"
                          show-overflow-tooltip></el-table-column>
                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="markJudgeCurrentPage" :page-size="markJudgeShowCount"
                        :total="markJudgeTotal"></el-pagination>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "editPaper",
  data() {
    return {
      loading: false,
      //公共题库单项的题目数
      publicSingleCount: 0,
      //公共题库多项的题目数
      publicMultiCount: 0,
      //公共题库判断题的题目数
      publicTorFCount: 0,
      //公共题库总选择分数
      publicSummary: 0,
      //我的题库单项的题目数
      personalSingleCount: 0,
      //我的题库多项的题目数
      personalMultiCount: 0,
      //我的题库判断题的题目数
      personalTorFCount: 0,
      //我的题库总选择分数
      personalSummary: 0,
      // 总计分数
      totalSummary: 0,
      //当前主Tab
      currentTab: "first",
      //当前公共题库的tab
      currentPublicTab: "first",
      //当前我的题库的tab
      currentPersonalTab: "first",
      //当前已选题目的tab
      currentMarkTab: "first",
      //试卷单个单项的分数
      radioScore: this.$route.query.radioScore,
      //试卷单个多选的分数
      selectScore: this.$route.query.selectScore,
      //试卷单个判断的分数
      judgeScore: this.$route.query.judgeScore,
      //试卷ID
      examId: this.$route.query.examId,
      //搜索内容
      searchTitle: "",

      //一页显示几个
      showCount: 10,
      //当前是第几页
      currentPage: 1,
      //总共有几条记录
      total: 0,

      publicRadioCurrentPage: 1,
      publicRadioShowCount: 10,
      publicRadioTotal: 0,

      publicSelectCurrentPage: 1,
      publicSelectShowCount: 10,
      publicSelectTotal: 0,

      publicJudgeCurrentPage: 1,
      publicJudgeShowCount: 10,
      publicJudgeTotal: 0,

      publicRadioList: [],
      publicSelectList: [],
      publicJudgeList: [],

      personalRadioCurrentPage: 1,
      personalRadioShowCount: 10,
      personalRadioTotal: 0,

      personalSelectCurrentPage: 1,
      personalSelectShowCount: 10,
      personalSelectTotal: 0,

      personalJudgeCurrentPage: 1,
      personalJudgeShowCount: 10,
      personalJudgeTotal: 0,

      personalRadioList: [],
      personalSelectList: [],
      personalJudgeList: [],

      markRadioCurrentPage: 1,
      markRadioShowCount: 10,
      markRadioTotal: 0,

      markSelectCurrentPage: 1,
      markSelectShowCount: 10,
      markSelectTotal: 0,

      markJudgeCurrentPage: 1,
      markJudgeShowCount: 10,
      markJudgeTotal: 0,

      markRadioList: [],
      markSelectList: [],
      markJudgeList: []
    };
  },
  methods: {
    // 获取考卷题目数量
    getExamQastoreCount() {
      this.$api
        .getExamQastoreCount({
          examId: this.examId
        })
        .then(res => {
          if (res.errorCode === "1") {
            //公共题库单项的题目数
            this.publicSingleCount = res.data.publicQastore.radioCount;
            //公共题库多项的题目数
            this.publicMultiCount = res.data.publicQastore.selectCount;
            //公共题库判断题的题目数
            this.publicTorFCount = res.data.publicQastore.judgeCount;
            //公共题库总选择分数
            this.publicSummary = res.data.publicQastore.subTotal;
            //我的题库单项的题目数
            this.personalSingleCount = res.data.personQastore.radioCount;
            //我的题库多项的题目数
            this.personalMultiCount = res.data.personQastore.selectCount;
            //我的题库判断题的题目数
            this.personalTorFCount = res.data.personQastore.judgeCount;
            //我的题库总选择分数
            this.personalSummary = res.data.personQastore.subTotal;
            // 总计分数
            this.totalSummary = res.data.totalScore;
          } else {
            this.$message.error(res.resultMsg);
          }
        });
    },


    finalPaper(){

        this.$confirm('一旦生成考卷，将不允许对各项参数及考题进行编辑修改。确定要生成吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
                this.$api
        .saveFinalOrEditExam({
          examId: this.examId,
          examType: 2
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.$message.success('成功生成考卷');
          } else {
            this.$message.error(res.resultMsg);
          }
        });
          
        })
        .catch(() => {
          this.$message.warning('操作取消')
          return false
        })



      

    },

    selectionChange(rows, row) {
      var flag = 0;
      let selected = rows.length && rows.indexOf(row) !== -1;

      if (selected) {
        flag = 1;
      } else {
        flag = 0;
      }

      if (flag === 1) {
        let currentScore = 0;

        switch (this.currentTab) {
          case "first":
            switch (this.currentPublicTab) {
              case "first":
                currentScore = this.radioScore;
                break;
              case "second":
                currentScore = this.selectScore;
                break;
              case "third":
                currentScore = this.judgeScore;
                break;
              default:
                break;
            }
            break;

          case "second":
            switch (this.currentPersonalTab) {
              case "first":
                currentScore = this.radioScore;
                break;
              case "second":
                currentScore = this.selectScore;
                break;
              case "third":
                currentScore = this.judgeScore;
                break;
              default:
                break;
            }
            break;

          case "third":
            switch (this.currentMarkTab) {
              case "first":
                currentScore = this.radioScore;
                break;
              case "second":
                currentScore = this.selectScore;
                break;
              case "third":
                currentScore = this.judgeScore;
                break;
              default:
                break;
            }
            break;

          default:
            break;
        }

        this.$api
          .eduSaveQastore({
            examId: this.examId,
            score: currentScore,
            qastoreJson: JSON.stringify(row)
          })
          .then(res => {
            if (res.errorCode === "1") {
              this.getExamQastoreCount();
            } else {
              this.$message.error(res.resultMsg);
            }
          });
      } else {
        this.$api
          .eduCancelQastore({
            examId: this.examId,
            qaId: row.qaId
          })
          .then(res => {
            if (res.errorCode === "1") {
              this.getExamQastoreCount();
              row.isSelect = "N";
            } else {
              this.$message.error(res.resultMsg);
            }
          });
      }
    },

    getPaperQuestionList(TabType, questionType, CurrentPage) {
      this.$api
        .getExamQastoreList({
          examId: this.examId,
          qastoreType: TabType,
          type: questionType,
          title: this.searchTitle,
          showCount: 10,
          currentPage: CurrentPage
        })
        .then(res => {
          if (res.errorCode === "1") {
            if (TabType === 1) {
              if (questionType === 1) {
                this.publicRadioList = res.data;
                this.publicRadioCurrentPage = res.currentPage;
                this.publicRadioShowCount = res.pageSize;
                this.publicRadioTotal = res.totalRecords;

                this.$nextTick(function() {
                  this.publicRadioList.forEach((row, index) => {
                    if (row.isSelect != "N") {
                      setTimeout(() => {
                        this.$refs.publicRadioQuestionTable.toggleRowSelection(
                          this.publicRadioList[index],
                          true
                        );
                      }, 200);
                    }
                  });
                });
              } else if (questionType === 2) {
                this.publicSelectList = res.data;
                this.publicSelectCurrentPage = res.currentPage;
                this.publicSelectShowCount = res.pageSize;
                this.publicSelectTotal = res.totalRecords;

                this.$nextTick(function() {
                  this.publicSelectList.forEach((row, index) => {
                    if (row.isSelect != "N") {
                      setTimeout(() => {
                        this.$refs.publicSelectQuestionTable.toggleRowSelection(
                          this.publicSelectList[index],
                          true
                        );
                      }, 200);
                    }
                  });
                });
              } else if (questionType === 3) {
                this.publicJudgeList = res.data;
                this.publicJudgeCurrentPage = res.currentPage;
                this.publicJudgeShowCount = res.pageSize;
                this.publicJudgeTotal = res.totalRecords;

                this.$nextTick(function() {
                  this.publicJudgeList.forEach((row, index) => {
                    if (row.isSelect != "N") {
                      setTimeout(() => {
                        this.$refs.publicJudgeQuestionTable.toggleRowSelection(
                          this.publicJudgeList[index],
                          true
                        );
                      }, 200);
                    }
                  });
                });
              }
            } else if (TabType === 2) {
              if (questionType === 1) {
                this.personalRadioList = res.data;
                this.personalRadioCurrentPage = res.currentPage;
                this.personalRadioShowCount = res.pageSize;
                this.personalRadioTotal = res.totalRecords;

                this.$nextTick(function() {
                  this.personalRadioList.forEach((row, index) => {
                    if (row.isSelect != "N") {
                      setTimeout(() => {
                        this.$refs.personalRadioQuestionTable.toggleRowSelection(
                          this.personalRadioList[index],
                          true
                        );
                      }, 200);
                    }
                  });
                });
              } else if (questionType === 2) {
                this.personalSelectList = res.data;
                this.personalSelectCurrentPage = res.currentPage;
                this.personalSelectShowCount = res.pageSize;
                this.personalSelectTotal = res.totalRecords;

                this.$nextTick(function() {
                  this.personalSelectList.forEach((row, index) => {
                    if (row.isSelect != "N") {
                      setTimeout(() => {
                        this.$refs.personalSelectQuestionTable.toggleRowSelection(
                          this.personalSelectList[index],
                          true
                        );
                      }, 200);
                    }
                  });
                });
              } else if (questionType === 3) {
                this.personalJudgeList = res.data;
                this.personalJudgeCurrentPage = res.currentPage;
                this.personalJudgeShowCount = res.pageSize;
                this.personalJudgeTotal = res.totalRecords;

                this.$nextTick(function() {
                  this.personalJudgeList.forEach((row, index) => {
                    if (row.isSelect != "N") {
                      setTimeout(() => {
                        this.$refs.personalJudgeQuestionTable.toggleRowSelection(
                          this.personalJudgeList[index],
                          true
                        );
                      }, 200);
                    }
                  });
                });
              }
            } else if (TabType === 3) {
              if (questionType === 1) {
                this.markRadioList = res.data;
                this.markRadioCurrentPage = res.currentPage;
                this.markRadioShowCount = res.pageSize;
                this.markRadioTotal = res.totalRecords;

                this.$nextTick(function() {
                  this.markRadioList.forEach((row, index) => {
                    if (row.isSelect != "N") {
                      setTimeout(() => {
                        this.$refs.markRadioQuestionTable.toggleRowSelection(
                          this.markRadioList[index],
                          true
                        );
                      }, 200);
                    }
                  });
                });
              } else if (questionType === 2) {
                this.markSelectList = res.data;
                this.markSelectCurrentPage = res.currentPage;
                this.markSelectShowCount = res.pageSize;
                this.markSelectTotal = res.totalRecords;

                this.$nextTick(function() {
                  this.markSelectList.forEach((row, index) => {
                    if (row.isSelect != "N") {
                      setTimeout(() => {
                        this.$refs.markSelectQuestionTable.toggleRowSelection(
                          this.markSelectList[index],
                          true
                        );
                      }, 200);
                    }
                  });
                });
              } else if (questionType === 3) {
                this.markJudgeList = res.data;
                this.markJudgeCurrentPage = res.currentPage;
                this.markJudgeShowCount = res.pageSize;
                this.markJudgeTotal = res.totalRecords;

                this.$nextTick(function() {
                  this.markJudgeList.forEach((row, index) => {
                    if (row.isSelect != "N") {
                      setTimeout(() => {
                        this.$refs.markJudgeQuestionTable.toggleRowSelection(
                          this.markJudgeList[index],
                          true
                        );
                      }, 200);
                    }
                  });
                });
              }
            }
          } else {
            this.$message.error(res.resultMsg);
          }
        });
    },

    handlePageChange(val) {
      switch (this.currentTab) {
        case "first":
          switch (this.currentPublicTab) {
            case "first":
              this.publicRadioCurrentPage = val;
              this.getPaperQuestionList(1, 1, this.publicRadioCurrentPage);
              break;
            case "second":
              this.publicSelectCurrentPage = val;
              this.getPaperQuestionList(1, 2, this.publicSelectCurrentPage);
              break;
            case "third":
              this.publicJudgeCurrentPage = val;
              this.getPaperQuestionList(1, 3, this.publicJudgeCurrentPage);
              break;
            default:
              break;
          }
          break;

        case "second":
          switch (this.currentPersonalTab) {
            case "first":
              this.personalRadioCurrentPage = val;
              this.getPaperQuestionList(2, 1, this.personalRadioCurrentPage);
              break;
            case "second":
              this.personalSelectCurrentPage = val;
              this.getPaperQuestionList(2, 2, this.personalSelectCurrentPage);
              break;
            case "third":
              this.personalJudgeCurrentPage = val;
              this.getPaperQuestionList(2, 3, this.personalJudgeCurrentPage);
              break;
            default:
              break;
          }
          break;

        case "third":
          switch (this.currentMarkTab) {
            case "first":
              this.markRadioCurrentPage = val;
              this.getPaperQuestionList(3, 1, this.markRadioCurrentPage);
              break;
            case "second":
              this.markSelectCurrentPage = val;
              this.getPaperQuestionList(3, 2, this.markSelectCurrentPage);
              break;
            case "third":
              this.markJudgeCurrentPage = val;
              this.getPaperQuestionList(3, 3, this.markJudgeCurrentPage);
              break;
            default:
              break;
          }
          break;

        default:
          break;
      }
    },

    handleMainType(tab, event) {
      switch (this.currentTab) {
        case "first":
          switch (this.currentPublicTab) {
            case "first":
              this.getPaperQuestionList(1, 1, this.publicRadioCurrentPage);
              break;
            case "second":
              this.getPaperQuestionList(1, 2, this.publicSelectCurrentPage);
              break;
            case "third":
              this.getPaperQuestionList(1, 3, this.publicJudgeCurrentPage);
              break;
            default:
              break;
          }
          break;

        case "second":
          switch (this.currentPersonalTab) {
            case "first":
              this.getPaperQuestionList(2, 1, this.personalRadioCurrentPage);
              break;
            case "second":
              this.getPaperQuestionList(2, 2, this.personalSelectCurrentPage);
              break;
            case "third":
              this.getPaperQuestionList(2, 3, this.personalJudgeCurrentPage);
              break;
            default:
              break;
          }
          break;

        case "third":
          switch (this.currentMarkTab) {
            case "first":
              this.getPaperQuestionList(3, 1, this.markRadioCurrentPage);
              break;
            case "second":
              this.getPaperQuestionList(3, 2, this.markSelectCurrentPage);
              break;
            case "third":
              this.getPaperQuestionList(3, 3, this.markJudgeCurrentPage);
              break;
            default:
              break;
          }
          break;

        default:
          break;
      }
    },

    //关闭编辑考卷界面
    close() {
      this.$router.replace({
        path: "/education/exam/examPaper"
      });
    }
  },

  mounted() {
    this.getExamQastoreCount();
    this.getPaperQuestionList(1, 1, 1);
    this.getPaperQuestionList(2, 1, 1);
    this.getPaperQuestionList(3, 1, 1);
  }
};
</script>

<style lang="scss" scoped>
.detail {
  width: 80%;
  margin: 20px;

  .topBar {
    display: flex;
    justify-content: space-between;

    span {
      padding: 0 20px;
    }
  }

  .content {
    width: 100%;
    height: 600px;
    border: 1px solid #bbb;
    margin-top: 20px;
  }

  .btn {
    width: 100%;
    position: relative;
    left: 50%;
    margin-top: 20px;
  }
}
</style>