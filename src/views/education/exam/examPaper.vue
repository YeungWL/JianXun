<template>
  <div class="page-content-body" v-loading="loading" element-loading-text="拼命加载中">
    <div class="page-header clearfix">
      <el-form class="search-form" :inline="true" ref="form">
        <el-form-item label="组织：">
          <el-select v-model="selectOrgID" placeholder="请选择" class="item-org" @change="UpdatePaperList">
            <el-option v-for="item in orgList" :key="item.orgId" :label="item.orgName"
            :value="item.orgId">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="btn-group fr">
          <el-button type="primary" icon="el-icon-plus" @click="handleAddPaper">
            添加考卷
          </el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleChoiceCourse">
            一键生成考卷
          </el-button>
        </div>
      </el-form>
    </div>
    <!-- table开始 -->
    <div class="page-main customTable">
      <el-table ref="multipleTable" style="width: 100%" :data="tableData">
        <el-table-column prop="examName" label="考卷名称" min-width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="avgScore" label="合格分数" min-width="60" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="isDeleted" label="考卷开关" min-width="60" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if='scope.row.isDeleted === "N"' class="green" @click="setExamIsDeleted(scope.row)">
              开
            </span>
            <span v-else class="red" @click="setExamIsDeleted(scope.row)">
              关
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="scope">
            <span class="btn" title="编辑" @click="handleUpdate(scope.row)">
              <i class="iconfont icon-edit iconblue">
              </i>
            </span>
            <span class="btn" @click="handelDelete(scope.row)" title="删除">
              <i class="iconfont icon-del iconred">
              </i>
            </span>
            <span class="btn" @click="handelDelete(scope.row)" title="查看">
              <i class="iconfont icon-chakan iconred">
              </i>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页-->
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
      :current-page.sync="currentPage" :page-size="showCount" :total="total">
      </el-pagination>
    </div>
    <!-- 选课成功提示 -->
    <el-dialog title="提示" :visible.sync="successTipsDialogVisible" width="30%"
    center>
      <span>
        选课成功！
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gobackList">
          返 回
        </el-button>
        <el-button type="primary" @click="successTipsDialogVisible = false">
          继续选课
        </el-button>
      </span>
    </el-dialog>
    <!-- 添加/编辑考卷 -->
    <el-dialog :title="isEdit?'编辑考卷':'添加考卷'" :visible.sync="paperDialogVisible"
    width="700px" center>
      <el-form ref="form" v-model="createPaper" size="mini">
        <el-row :gutter="24">
          <el-col :span="16">
            <el-form-item label="考卷名称：" label-width="120px">
              <el-input placeholder="" v-model="createPaper.examName" clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="试卷合格分数：" label-width="120px">
              <el-input placeholder="" v-model="createPaper.avgScore" clearable>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="单选题每题(分)：" label-width="120px">
              <el-input placeholder="" v-model="createPaper.radioScore" clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="多选题每题(分)：" label-width="120px">
              <el-input placeholder="" v-model="createPaper.selectScore" clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="判断题每题(分)：" label-width="120px">
              <el-input placeholder="" v-model="createPaper.judgeScore" clearable>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCreatePaper">
          下一步
        </el-button>
      </span>
    </el-dialog>
    <!-- 选择题目 -->
    <el-dialog title="选择题目" :visible.sync="choiceCoursehDialogVisible" :close-on-click-modal='false'
    width="800px" class="my-dialog">
      <div class="dialog-content">
        <div class="ui-form">
          <div style="width:700px; margin: 10px 10px 10px 10px">
            <th align="left" style="width:80px;">
              公共题库
            </th>
            <th align="left" style="width:200px;">
              <tr>
                <th align="left" style="width:60px;">
                  单项:
                </th>
                <th align="left" style="width:160px;color:blue">
                  {{commonSingleCount}}（题） * {{createPaper.radioScore}}（分）
                </th>
              </tr>
              <tr>
                <th align="left" style="width:60px;">
                  多项:
                </th>
                <th align="left" style="width:160px;color:blue">
                  {{commonMultiCount}}（题） * {{createPaper.selectScore}}（分）
                </th>
              </tr>
              <tr>
                <th align="left" style="width:60px;">
                  判断:
                </th>
                <th align="left" style="width:160px;color:blue">
                  {{commonTorFCount}}（题） * {{createPaper.judgeScore}}（分）
                </th>
              </tr>
              <tr>
                <th align="left" style="width:60px;">
                  合计:
                </th>
                <th align="left" style="width:160px;color:blue">
                  {{commonSummary}}（分）
                </th>
              </tr>
            </th>
            <th align="left" style="width:80px;">
              我的题库
            </th>
            <th align="left" style="width:200px;">
              <tr>
                <th align="left" style="width:60px;">
                  单项:
                </th>
                <th align="left" style="width:160px;color:blue">
                  {{personalSingleCount}}（题） * {{createPaper.radioScore}}（分）
                </th>
              </tr>
              <tr>
                <th align="left" style="width:60px;">
                  多项:
                </th>
                <th align="left" style="width:160px;color:blue">
                  {{personalMultiCount}}（题） * {{createPaper.selectScore}}（分）
                </th>
              </tr>
              <tr>
                <th align="left" style="width:60px;">
                  判断:
                </th>
                <th align="left" style="width:160px;color:blue">
                  {{personalTorFCount}}（题） * {{createPaper.judgeScore}}（分）
                </th>
              </tr>
              <tr>
                <th align="left" style="width:60px;">
                  合计:
                </th>
                <th align="left" style="width:160px;color:blue">
                  {{personalSummary}}（分）
                </th>
              </tr>
            </th>
            <th align="left" style="width:100px;color:blue">
              总分：{{totalSummary}}（分）
            </th>
            <el-form :inline="true" :model="listQuery" class='my-form search-form'>
              <el-form-item label="题目名称：">
                <el-input v-model="listQuery.title" clearable>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search">
                  搜索
                </el-button>
              </el-form-item>
            </el-form>
            <el-tabs v-model="currentTab" type="card" @tab-click="handleCourseType">
              <!--公共题库-->
              <el-tab-pane label="公共题库" name="first">
                <el-tabs v-model="currentCommonTab" @tab-click="handleCourseType">
                  <el-tab-pane label="单选题" name="first">
                    <div class="customTable">
                      <el-table ref="multipleTable" style="width: 100%" v-loading="loading"
                      element-loading-text="拼命加载中" :data="courseTableData">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180" show-overflow-tooltip>
                        </el-table-column>
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
                      element-loading-text="拼命加载中" :data="courseTableData">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180" show-overflow-tooltip>
                        </el-table-column>
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
                      element-loading-text="拼命加载中" :data="courseTableData">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180" show-overflow-tooltip>
                        </el-table-column>
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
                <el-tabs v-model="currentPersonalTab" @tab-click="handleCourseType">
                  <el-tab-pane label="单选题" name="first">
                    <div class="customTable">
                      <el-table ref="multipleTable" style="width: 100%" v-loading="loading"
                      element-loading-text="拼命加载中" :data="courseTableData">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180" show-overflow-tooltip>
                        </el-table-column>
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
                      element-loading-text="拼命加载中" :data="courseTableData">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180" show-overflow-tooltip>
                        </el-table-column>
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
                      element-loading-text="拼命加载中" :data="courseTableData">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180" show-overflow-tooltip>
                        </el-table-column>
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
                <el-tabs v-model="currentSelectTab" @tab-click="handleCourseType">
                  <el-tab-pane label="单选题" name="first">
                    <div class="customTable">
                      <el-table ref="multipleTable" style="width: 100%" v-loading="loading"
                      element-loading-text="拼命加载中" :data="courseTableData">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180" show-overflow-tooltip>
                        </el-table-column>
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
                      element-loading-text="拼命加载中" :data="courseTableData">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180" show-overflow-tooltip>
                        </el-table-column>
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
                      element-loading-text="拼命加载中" :data="courseTableData">
                        <el-table-column type="selection" min-width="57">
                        </el-table-column>
                        <el-table-column prop="title" label="课件名称" min-width="180" show-overflow-tooltip>
                        </el-table-column>
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
      <span slot="footer" class="dialog-footer" center>
        <el-button @click="handleClose">
          取 消
        </el-button>
        <el-button type="primary" @click="choiceCourse()">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
const gradeOptions = [
  {
    id: "1",
    name: "公司级"
  },
  {
    id: "2",
    name: "项目级"
  },
  {
    id: "3",
    name: "土木班"
  }
];
const statusOptions = [
  {
    id: "0",
    name: "开"
  },
  {
    id: "1",
    name: "关"
  }
];
export default {
  name: "examPaper",
  data() {
    return {
      //公共题库单项的题目数
      commonSingleCount: 0,
      //公共题库多项的题目数
      commonMultiCount: 0,
      //公共题库判断题的题目数
      commonTorFCount: 0,
      //公共题库总选择分数
      commonSummary: 0,
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

      auditOpinion: "",

      //组织列表
      orgList: [],
      //当前选择的组织ID
      selectOrgID: "",
      //录入考卷弹框开关
      paperDialogVisible: false,
      //能否进行操作
      canProcess: false,
      //一页显示几个
      showCount: 10,
      //当前是第几页
      currentPage: 1,
      //总共有几条记录
      total: 0,
      //创建考卷
      createPaper: {
        examId: "",
        examName: "",
        examDesc: "",
        orgId: "",
        avgScore: "",
        radioScore: "",
        selectScore: "",
        judgeScore: "",
        setTime: "",
        pattern: "",
        totalScore: "",
        optionCount: "",
        isDeleted: "",
        creator: "",
        createTime: "",
        updateTime: "",
        updateBy: "",
        isEdit: ""
      },
      //考卷列表
      tableData: [],
      listQuery: {
        orgId: "",
        bianma: "",
        title: "",
        grade: "",
        status: "",
        showCount: "",
        currentPage: ""
      },
      // 是否是编辑考卷
      isEdit: false,

      gradeArr: gradeOptions,
      statusArr: statusOptions,
      loading: true,
      total: 0,
      choiceCoursehDialogVisible: false,
      successTipsDialogVisible: false,
      currentTab: "first",
      currentCommonTab: "first",
      currentPersonalTab: "first",
      currentSelectTab: "first",

      // 公共课件，我的课件列表
      courseTableData: [
        {
          bianma: "10001",
          title: "中华人民共和国安全生产法",
          grade: "公司级",
          status: "0"
        },
        {
          bianma: "10002",
          title: "中华人民共和国安全生产法",
          grade: "项目部级",
          status: "1"
        },
        {
          bianma: "10002",
          title: "中华人民共和国安全生产法",
          grade: "项目部级",
          status: "1"
        },
        {
          bianma: "10002",
          title: "中华人民共和国安全生产法",
          grade: "项目部级",
          status: "1"
        },
        {
          bianma: "10002",
          title: "中华人民共和国安全生产法",
          grade: "项目部级",
          status: "1"
        },
        {
          bianma: "10002",
          title: "中华人民共和国安全生产法",
          grade: "项目部级",
          status: "1"
        },
        {
          bianma: "10002",
          title: "中华人民共和国安全生产法",
          grade: "项目部级",
          status: "1"
        },
        {
          bianma: "10002",
          title: "中华人民共和国安全生产法",
          grade: "项目部级",
          status: "1"
        },
        {
          bianma: "10002",
          title: "中华人民共和国安全生产法",
          grade: "项目部级",
          status: "1"
        },
        {
          bianma: "10002",
          title: "中华人民共和国安全生产法",
          grade: "项目部级",
          status: "1"
        }
      ]
    };
  },
  created() {
    this.getOrgList();
  },
  methods: {
    //获取组织列表
    getOrgList() {
      this.$api.getEduOrgList().then(res => {
        if (res.errorCode === "1") {
          this.orgList = res.data;
          this.loading = false;
        } else {
          this.$message.error(res.message);
        }
        this.createExamDialogVisible = false;
        this.isEdit = false;
      });
    },

    //获取试卷列表
    UpdatePaperList() {
      this.$api
        .examList({
          orgId: this.selectOrgID
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.tableData = res.data;
            this.showCount = res.pageSize;
            this.currentPage = res.currentPage;
            this.total = res.totalRecords;
          } else {
            this.$message.error(res.message);
          }
        });
    },

    //处理创建考卷按钮事件
    handleCreatePaper() {
      this.isSelectOrg();
      if (this.canProcess === false) return false;
      this.createPaper.orgId = this.selectOrgID;
      this.$api.saveOrUpdateExam(this.createPaper).then(res => {
        if (res.errorCode === "1") {
          this.loading = false;
          // this.choiceCoursehDialogVisible = true;
          this.$router.push({
            name: "editPaper",
            query: {
              radioScore: this.createPaper.radioScore,
              selectScore: this.createPaper.selectScore,
              judgeScore: this.createPaper.judgeScore,
              examId: res.data.examId,
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //判断是否已经选择了组织
    isSelectOrg() {
      if (this.selectOrgID === "") {
        this.canProcess = false;
        this.$message.warning("请选择要操作的组织");
      } else {
        this.canProcess = true;
      }
    },

    handlePageChange() {},

    // 删除考卷
    handelDelete(data) {
      this.$api
        .deletedExam({
          examId: data.examId
        })
        .then(response => {
          if (response.errorCode === "1") {
            this.$message.success("删除成功！");
            this.UpdatePaperList();
          } else {
            this.$message.warning(response.resultMsg);
          }
        })
        .catch(error => {
          this.$message.error(error);
          return false;
        });
    },

    //控制考卷开关
    setExamIsDeleted(data) {
      this.$api
        .setExamIsDeleted({
          examId: data.examId,
          isDeleted: data.isDeleted === "Y" ? "N" : "Y"
        })
        .then(res => {
          if (res.errorCode === "1") {
            console.log(res.data);
          } else {
            this.$message.error(res.message);
          }
        });
    },

    //编辑考卷
    handleUpdate(data) {
      // 获取考卷信息
      this.$api
        .getExamInfo({
          examId: data.examId
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.createPaper = res.data;
            console.log(res.data);
          } else {
            this.$message.error(res.message);
          }
        });
      this.isEdit = true;
      this.paperDialogVisible = true;
    },

    // 添加考卷
    handleAddPaper() {
      this.paperDialogVisible = true;
      this.createPaper = [];
    },

    handleChoiceCourse() {},

    choiceCourse() {
      this.successTipsDialogVisible = true;
    },
    // 关闭弹窗
    handleClose() {
      this.choiceCoursehDialogVisible = false;
    },
    // 放回列表
    gobackList() {
      this.successTipsDialogVisible = false;
      this.choiceCoursehDialogVisible = false;
    },
    handleCourseType(tab, event) {
      // console.log(tab, event);
    },
    handleAddCourse() {
      this.$router.push({
        path: "/education/addCourse"
      });
    },
    handleMyCourse() {
      this.$router.push({
        path: "/education/myCourse"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content_revise {
  margin: 0 auto;
  display: flex;
}
.left_3 {
  flex: 250px 0;
}
</style>