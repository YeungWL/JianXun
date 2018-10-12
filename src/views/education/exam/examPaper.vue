<template>
  <div class="page-content-body">
    <div class="my-dialog scwj-dialog">
      <el-form size="mini">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="考题名称" label-width="90px">
              <el-input placeholder="请输入考题名称" v-model="queryInfo.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="考题类型" label-width="90px">
              <el-select v-model="queryInfo.type" placeholder="全部">
                <el-option v-for="item in questionType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="handleSearch()">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="page-main customTable">
        <el-table ref="multipleTable" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" :data="tablelist"
          key="ArcDataArr">
          <el-table-column prop="title" label="考题名称" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="type" label="考题类型" min-width="80" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <span class="edit" @click="documentDetails(scope.row)">冻结</span>
              <span class="edit" @click="editDetails(scope.row)">修改</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页-->
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
          :current-page.sync="queryInfo.currentPage" :page-size="queryInfo.showCount" :total="total">
        </el-pagination>
      </div>
      <div style="padding-left:40%">
        <el-button type="primary" @click="questionTypeDialogVisible=true">录入考题</el-button>
      </div>
    </div>

    <!-- 录入题型选择弹框 -->
    <el-dialog title="考题类型" :visible.sync="questionTypeDialogVisible" width="30%" append-to-body center>
      <el-button style="width:100%" type="primary" @click="SingleChoiceDialogVisible=true">单选</el-button>
      <br /><br />
      <el-button style="width:100%" type="primary" @click="multipleChoiceDialogVisible=true">多选</el-button>
      <br /><br />
      <el-button style="width:100%" type="primary" @click="TorFDialogVisible=true">判断</el-button>
      <!-- 输入单选题，弹框 -->
      <el-dialog title="多选题" :visible.sync="SingleChoiceDialogVisible" width="50%" append-to-body center>
        <ul class="projectList">
          <li v-for="(item, index) in itemJson" :key="index">
            <el-input v-model="item.itemName" v-show="item.edit"></el-input>
            <div style="width:380px;margin: 0 0 10px 10px;height:32px;line-height:32px;" v-show="!item.edit">{{item.itemName}}</div>
            <div v-if="!item.edit">
              <el-button class="my_button" icon="el-icon-edit" style="color:#3386e4;" @click="item.edit = !item.edit"></el-button>
              <el-button class="my_button" icon="el-icon-delete" style="color:#F56C6C;" @click="delBuildItem(item, index)"></el-button>
            </div>
            <div v-else>
              <el-button class="my_button" icon="el-icon-check" style="color:#67C23A;" @click="updateBuildItem(item)"></el-button>
              <el-button class="my_button" icon="el-icon-close" style="color:#F56C6C;" @click="closeBuild(item, index)"></el-button>
            </div>
          </li>
        </ul>
      </el-dialog>

      <!-- 输入多选题，弹框 -->
      <el-dialog title="单选题" :visible.sync="multipleChoiceDialogVisible" width="50%" append-to-body center>
        <el-button style="width:100%" type="primary" @click="handleSearch()">单选</el-button>
        <br /><br />
        <el-button style="width:100%" type="primary" @click="handleSearch()">多选</el-button>
        <br /><br />
        <el-button style="width:100%" type="primary" @click="handleSearch()">判断</el-button>
      </el-dialog>

      <!-- 输入判断题，弹框 -->
      <el-dialog title="判断题" :visible.sync="TorFDialogVisible" width="50%" append-to-body center>
        <el-button style="width:100%" type="primary" @click="handleSearch()">单选</el-button>
        <br /><br />
        <el-button style="width:100%" type="primary" @click="handleSearch()">多选</el-button>
        <br /><br />
        <el-button style="width:100%" type="primary" @click="handleSearch()">判断</el-button>
      </el-dialog>
    </el-dialog>






  </div>
</template>

<script>
  export default {
    name: "EducationExam",
    data() {
      return {
        // loading 事件控制开关
        loading: true,

        // 录入题型选择弹框开关
        questionTypeDialogVisible: false,

        // 录入单选题弹框开关
        SingleChoiceDialogVisible: false,

        // 录入多选题弹框开关
        multipleChoiceDialogVisible: false,

        // 录入判断题弹框开关
        TorFDialogVisible: false,


        // 题库总数量
        total: 0,
        // 题库查询条件
        queryInfo: {
          type: "",
          title: "",
          isPublic: "",
          showCount: "",
          currentPage: "",
          showCount: 10,
          currentPage: 1 //页码
        },
        // 题库列表
        tablelist: [],
        //题目类型
        questionType: [{
            value: "",
            label: "全部"
          },
          {
            value: "1",
            label: "单选"
          },
          {
            value: "2",
            label: "多选"
          },
          {
            value: "3",
            label: "判断"
          }
        ]


      };
    },
    created() {
      this.getQuestionList();
    },
    methods: {
      // 获取题目列表
      getQuestionList(data) {
        this.$api
          .questionList(this.queryInfo)
          .then(res => {
            if (res.errorCode === "1") {
              this.tablelist = res.data[0];
              this.loading = false;
              this.total = res.totalRecords;
            }
          })
          .catch(err => {
            this.$message.error(err);
            return false;
          });
      },
      handleSearch() {
        this.getQuestionList();
      },
      //列表切换相应方法
      handlePageChange(val) {
        this.queryInfo.currentPage = val;
        this.personLawList();
      }
    }
  };

</script>
<style lang="scss" scoped>
</style>
