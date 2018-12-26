<template>
  <div class="page-content-body" v-loading="loading" element-loading-text="拼命加载中">
    <div class="page-header clearfix">
      <el-form class="search-form" :inline="true" ref="form">
        <el-form-item label="组织：">
          <el-select v-model="selectOrgID" placeholder="请选择" class="item-org" @change="UpdatePaperList">
            <el-option v-for="item in orgList" :key="item.orgId" :label="item.orgName" :value="item.orgId"></el-option>
          </el-select>
        </el-form-item>
        <div class="btn-group fr">
          <el-button type="primary" icon="el-icon-plus" @click="handleAddPaper">添加考卷</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleOnKeyAddPaper">一键生成考卷</el-button>
        </div>
      </el-form>
    </div>

    <!-- table开始 -->
    <div class="page-main customTable">
      <el-table ref="multipleTable" style="width: 100%" :data="tableData">
        <el-table-column prop="examName" label="考卷名称" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="avgScore" label="合格分数" min-width="60" show-overflow-tooltip></el-table-column>
        <el-table-column prop="isDeleted" label="考卷开关" min-width="60" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.isDeleted === 'N'" class="green" @click="setExamIsDeleted(scope.row)">开</span>
            <span v-else class="red" @click="setExamIsDeleted(scope.row)">关</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="scope">
            <span class="btn" @click="handelView(scope.row)" title="查看">
              <i class="iconfont icon-chakan iconred"></i>
            </span>
            <span class="btn" @click="handelDelete(scope.row)" title="删除">
              <i class="iconfont icon-del iconred"></i>
            </span>
            <span v-if="scope.row.isEdit ===  'Y'" class="btn" title="编辑" @click="handleUpdate(scope.row)">
              <i class="iconfont icon-edit iconblue"></i>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页-->
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
        :current-page.sync="currentPage" :page-size="showCount" :total="total"></el-pagination>
    </div>

    <!-- 添加/编辑考卷 -->
    <el-dialog :title="isEdit?'编辑考卷':'添加考卷'" :visible.sync="paperDialogVisible" width="700px" center>
      <el-form ref="form" v-model="createPaper" size="mini">
        <el-row :gutter="24">
          <el-col :span="16">
            <el-form-item label="考卷名称：" label-width="120px">
              <el-input placeholder v-model="createPaper.examName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="试卷合格分数：" label-width="120px">
              <el-input placeholder v-model="createPaper.avgScore" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="单选题每题(分)：" label-width="120px">
              <el-input placeholder v-model="createPaper.radioScore" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="多选题每题(分)：" label-width="120px">
              <el-input placeholder v-model="createPaper.selectScore" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="判断题每题(分)：" label-width="120px">
              <el-input placeholder v-model="createPaper.judgeScore" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCreatePaper">下一步</el-button>
      </span>
    </el-dialog>

    <!-- 一键生成考卷 -->
    <el-dialog title="一键生成考卷" :visible.sync="oneKeyPaperDialogVisible" width="700px" center>
      <div style="padding: 20px 20px 10px 20px">
        <el-form ref="form" v-model="oneKeyCreatePaper" size="mini">
          <div>
            <p align="center">
              <b>题型分值</b>
            </p>
          </div>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="单选题每题(分)：" label-width="120px">
                <el-input placeholder v-model="oneKeyCreatePaper.radioScore" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="多选题每题(分)：" label-width="120px">
                <el-input placeholder v-model="oneKeyCreatePaper.selectScore" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="判断题每题(分)：" label-width="120px">
                <el-input placeholder v-model="oneKeyCreatePaper.judgeScore" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <hr style="height:1px;border:none;border-top:1px dashed #0066CC;">

          <table border="0" style="padding: 20px 20px 20px 20px">
            <th align="left" style="width:200px;">
              <p align="center">
                <b>公共题库(题目数)</b>
              </p>
              <tr>
                <th align="left" style="width:60px;">单项题:</th>
                <th align="left" style="width:160px;">
                  <el-input size="mini" placeholder v-model="oneKeyCreatePaper.publicQastore[0].radioQaNum"
                    clearable></el-input>
                </th>
              </tr>
              <tr>
                <th align="left" style="width:60px;">多项题:</th>
                <th align="left" style="width:160px;">
                  <el-input size="mini" placeholder v-model="oneKeyCreatePaper.publicQastore[0].selectQaNum"
                    clearable></el-input>
                </th>
              </tr>
              <tr>
                <th align="left" style="width:60px;">判断题:</th>
                <th align="left" style="width:160px;">
                  <el-input size="mini" placeholder v-model="oneKeyCreatePaper.publicQastore[0].judgeQaNum"
                    clearable></el-input>
                </th>
              </tr>
              <tr>
                <th align="left" style="width:60px;">合计:</th>
                <th align="left" style="width:160px;">
                  {{publicSummary =
                  oneKeyCreatePaper.judgeScore*oneKeyCreatePaper.publicQastore[0].judgeQaNum+
                  oneKeyCreatePaper.radioScore*oneKeyCreatePaper.publicQastore[0].radioQaNum+
                  oneKeyCreatePaper.selectScore*oneKeyCreatePaper.publicQastore[0].selectQaNum}}（分）
                </th>
              </tr>
            </th>

            <th align="right" style="width:200px;">
              <div>
                <p align="center">
                  <b>我的题库(题目数)</b>
                </p>
              </div>
              <tr>
                <th align="left" style="width:60px;">单项题:</th>
                <th align="left" style="width:160px;">
                  <el-input size="mini" placeholder v-model="oneKeyCreatePaper.personalQastore[0].radioQaNum"
                    clearable></el-input>
                </th>
              </tr>
              <tr>
                <th align="left" style="width:60px;">多项题:</th>
                <th align="left" style="width:160px;">
                  <el-input size="mini" placeholder v-model="oneKeyCreatePaper.personalQastore[0].selectQaNum"
                    clearable></el-input>
                </th>
              </tr>
              <tr>
                <th align="left" style="width:60px;">判断题:</th>
                <th align="left" style="width:160px;">
                  <el-input size="mini" placeholder v-model="oneKeyCreatePaper.personalQastore[0].judgeQaNum"
                    clearable></el-input>
                </th>
              </tr>
              <tr>
                <th align="left" style="width:60px;">合计:</th>
                <th align="left" style="width:160px;">
                  {{personalSummary =
                  oneKeyCreatePaper.judgeScore*oneKeyCreatePaper.personalQastore[0].judgeQaNum+
                  oneKeyCreatePaper.radioScore*oneKeyCreatePaper.personalQastore[0].radioQaNum +
                  oneKeyCreatePaper.selectScore*oneKeyCreatePaper.personalQastore[0].selectQaNum}}（分）
                </th>
              </tr>
            </th>
            <th align="right" style="width:160px;">
              <div>
                <p align="center">
                  <b>分数统计(分)</b>
                </p>
              </div>
              <tr>
                <th align="left" style="width:60px;">总计:</th>
                <th align="left" style="width:160px;color:blue">{{publicSummary+personalSummary}}（分）</th>
              </tr>
            </th>
          </table>
          <hr style="height:1px;border:none;border-top:1px dashed #0066CC;">

          <el-row :gutter="24" style="padding: 20px 1px 1px 1px">
            <el-col :span="16">
              <el-form-item label="考卷名称：" label-width="100px">
                <el-input placeholder v-model="oneKeyCreatePaper.examName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="试卷合格分数：" label-width="120px">
                <el-input placeholder v-model="oneKeyCreatePaper.avgScore" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleOneKeyCreatePaper">生成考卷</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "examPaper",
  data() {
    return {
      // 是否是编辑考卷
      isEdit: false,
      loading: true,
      //录入考卷弹框开关
      paperDialogVisible: false,
      // 一键创建考卷开关
      oneKeyPaperDialogVisible: false,
      //能否进行操作
      canProcess: false,
      //公共题库总选择分数
      publicSummary: 0,
      //我的题库总选择分数
      personalSummary: 0,
      //组织列表
      orgList: [],
      //当前选择的组织ID
      selectOrgID: "",
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

      // 一键创建考卷
      oneKeyCreatePaper: {
        orgId: "",
        examName: "",
        avgScore: "",
        radioScore: "0",
        selectScore: "0",
        judgeScore: "0",
        publicQastore: [
          {
            radioQaNum: "0",
            selectQaNum: "0",
            judgeQaNum: "0"
          }
        ],
        personalQastore: [
          {
            radioQaNum: "0",
            selectQaNum: "0",
            judgeQaNum: "0"
          }
        ]
      },

      //考卷列表
      tableData: []
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

          this.selectOrgID = JSON.stringify(this.$route.query) !== '{}' ? this.$route.query.orgId : (this.orgList[0].orgId || '')
          this.UpdatePaperList();
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
            this.$message.error(res.resultMsg);
          }
        });
    },

    handleOneKeyCreatePaper() {
      this.$api
        .randomSaveExam({
          orgId: this.oneKeyCreatePaper.orgId,
          examName: this.oneKeyCreatePaper.examName,
          avgScore: this.oneKeyCreatePaper.avgScore,
          radioScore: this.oneKeyCreatePaper.radioScore,
          selectScore: this.oneKeyCreatePaper.selectScore,
          judgeScore: this.oneKeyCreatePaper.judgeScore,
          publicQastore: JSON.stringify(
            this.oneKeyCreatePaper.publicQastore
          ).replace(/\[|]/g, ""),
          personalQastore: JSON.stringify(
            this.oneKeyCreatePaper.personalQastore
          ).replace(/\[|]/g, "")
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.oneKeyPaperDialogVisible = false;
            this.UpdatePaperList();
          } else {
            this.$message.error(res.resultMsg);
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
          this.$router.push({
            name: "editPaper",
            query: {
              radioScore: this.createPaper.radioScore,
              selectScore: this.createPaper.selectScore,
              judgeScore: this.createPaper.judgeScore,
              examId: res.data.examId
            }
          });
        } else {
          this.$message.error(res.resultMsg);
        }
      });
    },

    handleOnKeyAddPaper() {
      this.isSelectOrg();
      if (this.canProcess === false) return false;
      this.oneKeyCreatePaper.orgId = this.selectOrgID;
      this.oneKeyPaperDialogVisible = true;
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
      this.$confirm("删除考卷, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
        })
        .catch(() => {});
    },

    //查看考卷
    handelView(data) {
      this.$router.push({
        name: "perViewPaper",
        query: {
          orgId:this.selectOrgID,
          examId: data.examId,
          examName: data.examName,
          isEdit: data.isEdit,
          source: "1"
        }
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
          } else {
            this.$message.error(res.resultMsg);
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
          } else {
            this.$message.error(res.resultMsg);
          }
        });
      this.isEdit = true;
      this.paperDialogVisible = true;
    },

    // 添加考卷
    handleAddPaper() {
      this.paperDialogVisible = true;
      this.createPaper = [];
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