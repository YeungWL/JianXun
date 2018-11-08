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
                  <th align="left" style="width:160px;color:blue">{{publicSingleCount}}（题） *
                    {{radioScore}}（分）</th>
                </tr>
                <tr>
                  <th align="left" style="width:60px;">多项:</th>
                  <th align="left" style="width:160px;color:blue">{{publicMultiCount}}（题） *
                    {{selectScore}}（分）</th>
                </tr>
                <tr>
                  <th align="left" style="width:60px;">判断:</th>
                  <th align="left" style="width:160px;color:blue">{{publicTorFCount}}（题） *
                    {{judgeScore}}（分）</th>
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
                  <th align="left" style="width:160px;color:blue">{{personalSingleCount}}（题） *
                    {{radioScore}}（分）</th>
                </tr>
                <tr>
                  <th align="left" style="width:60px;">多项:</th>
                  <th align="left" style="width:160px;color:blue">{{personalMultiCount}}（题） *
                    {{selectScore}}（分）</th>
                </tr>
                <tr>
                  <th align="left" style="width:60px;"> 判断:</th>
                  <th align="left" style="width:160px;color:blue">{{personalTorFCount}}（题） *
                    {{judgeScore}}（分）</th>
                </tr>
                <tr>
                  <th align="left" style="width:60px;">合计:</th>
                  <th align="left" style="width:160px;color:blue">{{personalSummary}}（分）</th>
                </tr>
              </th>
              <th align="left" style="width:100px;color:blue"> 总分：{{totalSummary}}（分）</th>
            </table>

            <el-form :inline="true"  >
              <el-form-item label="题目名称：">
                <el-input style="width: 300px" v-model="searchTitle" clearable>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search">
                  搜索
                </el-button>
              </el-form-item>
            </el-form>

            <el-tabs v-model="currentTab" type="card" @tab-click="handleMainType">
              <!--公共题库-->
              <el-tab-pane label="公共题库" name="first">
                <el-tabs v-model="currentPublicTab" @tab-click="handleQuestionType">
                 
                  <el-tab-pane label="单选题" name="first">
                    <div class="customTable">
                      <el-table ref="publicQuestionTable" :data="publicRadioList" tooltip-effect="dark"
                        style="width: 100%" @selection-change="handleSelectionChangeEdit"
                        @select="selectionChange" v-loading="loading" element-loading-text="拼命加载中">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180"
                          show-overflow-tooltip>
                        </el-table-column>
                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="currentPage" :page-size="showCount" :total="total">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                  
                  <el-tab-pane label="多选题" name="second">
                    <div class="customTable">
                      <el-table ref="multipleTable" style="width: 100%" v-loading="loading"
                        element-loading-text="拼命加载中" :data="courseTableData" @select="selectionChange">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180"
                          show-overflow-tooltip>
                        </el-table-column>
  
                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="currentPage" :page-size="showCount" :total="total">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="判断题" name="third">
                    <div class="customTable">
                      <el-table ref="multipleTable" style="width: 100%" v-loading="loading"
                        element-loading-text="拼命加载中" :data="courseTableData" @select="selectionChange">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180"
                          show-overflow-tooltip>
                        </el-table-column>

                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="currentPage" :page-size="showCount" :total="total">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-tab-pane>
              <!--我的题库-->
              <el-tab-pane label="我的题库" name="second">
                <el-tabs v-model="currentPersonalTab" @tab-click="handleQuestionType">
                  <el-tab-pane label="单选题" name="first">
                    <div class="customTable">
                      <el-table ref="multipleTable" style="width: 100%" v-loading="loading"
                        element-loading-text="拼命加载中" :data="courseTableData" @select="selectionChange">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180"
                          show-overflow-tooltip>
                        </el-table-column>

                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="currentPage" :page-size="showCount" :total="total">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="多选题" name="second">
                    <div class="customTable">
                      <el-table ref="multipleTable" style="width: 100%" v-loading="loading"
                        element-loading-text="拼命加载中" :data="courseTableData" @select="selectionChange">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180"
                          show-overflow-tooltip>
                        </el-table-column>

                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="currentPage" :page-size="showCount" :total="total">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="判断题" name="third">
                    <div class="customTable">
                      <el-table ref="multipleTable" style="width: 100%" v-loading="loading"
                        element-loading-text="拼命加载中" :data="courseTableData" @select="selectionChange">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180"
                          show-overflow-tooltip>
                        </el-table-column>

                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="currentPage" :page-size="showCount" :total="total">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-tab-pane>
              <!--已选题库-->
              <el-tab-pane label="已选题库" name="third">
                <el-tabs v-model="currentSelectTab" @tab-click="handleQuestionType">
                  <el-tab-pane label="单选题" name="first">
                    <div class="customTable">
                      <el-table ref="multipleTable" style="width: 100%" v-loading="loading"
                        element-loading-text="拼命加载中" :data="courseTableData" @select="selectionChange">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180"
                          show-overflow-tooltip>
                        </el-table-column>

                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="currentPage" :page-size="showCount" :total="total">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="多选题" name="second">
                    <div class="customTable">
                      <el-table ref="multipleTable" style="width: 100%" v-loading="loading"
                        element-loading-text="拼命加载中" :data="courseTableData" @select="selectionChange">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180"
                          show-overflow-tooltip>
                        </el-table-column>

                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="currentPage" :page-size="showCount" :total="total">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="判断题" name="third">
                    <div class="customTable">
                      <el-table ref="multipleTable" style="width: 100%" v-loading="loading"
                        element-loading-text="拼命加载中" :data="courseTableData" @select="selectionChange">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180"
                          show-overflow-tooltip>
                        </el-table-column>

                      </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
                        :current-page.sync="currentPage" :page-size="showCount" :total="total">
                      </el-pagination>
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
    //已选的题目个数
    selectionLeg: 0,
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
    currentSelectTab: "first",
    //试卷单个单项的分数
    radioScore: this.$route.query.radioScore,
    //试卷单个多选的分数
    selectScore: this.$route.query.selectScore,
    //试卷单个判断的分数
    judgeScore: this.$route.query.judgeScore,
    //试卷ID
    examId: this.$route.query.examId,
    //搜索内容
    searchTitle:"",


    //一页显示几个
    showCount: 10,
    //当前是第几页
    currentPage: 1,
    //总共有几条记录
    total: 0,

    publicRadioList: [],
    publicSelectList: [],
    publicJudgeList: [],

    personalRadioList: [],
    personalSelectList: [],
    personalJudgeList: [],

    markRadioList: [],
    markSelectList: [],
    markJudgeList: [],

    listQuery: {
    orgId: "",
    bianma: "",
    title: "",
    grade: "",
    status: "",
    showCount: "",
    currentPage: ""
    },
    // 公共课件，我的课件列表
    courseTableData: [
    {
      bianma: "10001",
      title: "中华人民共和国安全生产法",
      grade: "公司级",
      status: "0"
    },
    {
      bianma: "10003",
      title: "中华人民共和国安全生产法",
      grade: "项目部级",
      status: "1"
    }
    ]
  };
  },
  methods: {
  handleSelectionChange(row) {},
  selectionChange(selection, row) {
    console.log(JSON.stringify(selection));
    if (selection.length < this.selectionLeg) {
    console.log("Un-check");
    } else {
    this.$api
      .eduSaveQastore({
      examId: this.examId,
      score: this.radioScore,
      qastoreJson: JSON.stringify(row)
      })
      .then(res => {
      if (res.errorCode === "1") {
        console.log("HAHA");
      } else {
        this.$message.error(res.message);
      }
      });

    console.log("checked");
    console.log("qaId: " + JSON.stringify(row));
    }
    this.selectionLeg = selection.length;
  },

  //   publicRadioList:[],
  //   publicSelectList:[],
  //   publicJudgeList:[],

  //   personalRadioList:[],
  //   personalSelectList:[],
  //   personalJudgeList:[],

  //   markRadioList:[],
  //   markSelectList:[],
  //   markJudgeList:[],

  getPublicRadioList() {
    this.$api
    .getExamQastoreList({
      examId: this.examId,
      qastoreType: 1,
      type: 1,
      title: this.searchTitle,
      showCount: 10,
      currentPage: this.currentPage
    })
    .then(res => {
      if (res.errorCode === "1") {
      this.publicRadioList = res.data;
      this.showCount = res.pageSize;
      this.currentPage = res.currentPage;
      this.total = res.totalRecords;
      this.$nextTick(function() {
        this.handleSelectionChangeEdit(); //每次更新了数据，触发这个函数即可。
      });
      } else {
      this.$message.error(res.message);
      }
    });
  },

  handleSelectionChangeEdit() {
    this.publicRadioList.forEach((row, index) => {
    if (row.isSelect != "N") {
      setTimeout(() => {
      this.$refs.publicQuestionTable.toggleRowSelection(
        this.publicRadioList[index],
        true
      );
      }, 100);
    }
    });
  },

  toggleSelection(rows) {
    if (rows) {
    rows.forEach(row => {
      this.$refs.multipleTable.toggleRowSelection(row);
    });
    } else {
    this.$refs.multipleTable.clearSelection();
    }
  },
  handlePageChange(val) {
    this.currentPage = val;
    this.getPublicRadioList();
  },
  getquestionList(data) {},

  handleMainType(tab, event) {},
  handleQuestionType() {
    switch (this.currentTab) {
    case "first":
      console.log(" ======================================");
      console.log(" handleMainType " + this.currentTab);
      console.log(" ======================================");
      console.log(" currentpublicTab: " + this.currentpublicTab);
      console.log(" currentPersonalTab: " + this.currentPersonalTab);
      console.log(" currentSelectTab: " + this.currentSelectTab);
      break;
    case "second":
      console.log(" ======================================");
      console.log(" handleMainType " + this.currentTab);
      console.log(" ======================================");
      console.log(" currentpublicTab: " + this.currentpublicTab);
      console.log(" currentPersonalTab: " + this.currentPersonalTab);
      console.log(" currentSelectTab: " + this.currentSelectTab);
      break;
    case "third":
      console.log(" ======================================");
      console.log(" handleMainType " + this.currentTab);
      console.log(" ======================================");
      console.log(" currentpublicTab: " + this.currentpublicTab);
      console.log(" currentPersonalTab: " + this.currentPersonalTab);
      console.log(" currentSelectTab: " + this.currentSelectTab);
      break;
    default:
      break;
    }
  },

  //关闭监理日志历史记录界面
  close() {
    //this.$router.go(-1);
    this.$router.replace({
    path: "/supervisorLog/homeRecord"
    });
  }
  },
  mounted() {
  //this.getpublicquestionList();
  this.getPublicRadioList();
  // this.handleSelectionChangeEdit()
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