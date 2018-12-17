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
                <el-option v-for="item in questionType" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="handleSearch()">搜索</el-button>
          </el-col>
          <el-col :span="7">
            <div class="btn-group fr">
              <el-button type="primary" @click="questionTypeDialogVisible=true">录入考题</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="page-main customTable">
        <el-table ref="multipleTable" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中"
          :data="tablelist" key="ArcDataArr">
          <el-table-column prop="title" label="考题名称" min-width="400" show-overflow-tooltip></el-table-column>
          <el-table-column label="考题类型" min-width="80">
            <template slot-scope="scope">{{ scope.row.type=== "1"? '单选题' : (scope.row.type=== "2"? '多选题' :
              '判断题') }}</template>
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <span class="edit" @click="changeQuestionStatus(scope.row)">{{ scope.row.isDeleted=== "N"?
                '冻结' : '激活' }}</span>
              <span class="edit" @click="handleEdit(scope.row)">修改</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页-->
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
          :current-page.sync="queryInfo.currentPage" :page-size="queryInfo.showCount" :total="total"></el-pagination>
      </div>
    </div>

    <!-- 录入题型选择弹框 -->
    <el-dialog title="考题类型" :visible.sync="questionTypeDialogVisible" width="30%" append-to-body center>
      <el-button style="width:100%" type="primary" @click="addQuestionDialogVisible=true;InputFrom.type=1;reSetForm();questionTypeDialogVisible=false">单选</el-button>
      <br>
      <br>
      <el-button style="width:100%" type="primary" @click="addQuestionDialogVisible=true;InputFrom.type=2;reSetForm();questionTypeDialogVisible=false">多选</el-button>
      <br>
      <br>
      <el-button style="width:100%" type="primary" @click="addQuestionDialogVisible=true;InputFrom.type=3;reSetForm();questionTypeDialogVisible=false">判断</el-button>
    </el-dialog>

    <!--新建题目-->
    <el-dialog :title="isEdit?'编辑题目':'新建题目'" :visible.sync="addQuestionDialogVisible" size="tiny" class="customDialog createExamDialog"
      width="800px" append-to-body center>
      <el-form ref="InputFrom" label-width="110px" :model="InputFrom" :rules="fromRules">
        <el-form-item label="题目：" prop="title">
          <el-input type="textarea" v-model="InputFrom.title"></el-input>
        </el-form-item>

        <el-form-item label="选项及答案：" v-if="InputFrom.type=='1'" prop="answer">
          <el-radio-group v-model="InputFrom.answer">
            <el-radio :key="index" :label="item.optName" v-for="(item,index) in InputFrom.optionList">
              <a class="value">{{item.optName}}</a>
              <el-form-item class="inlineItem">
                <el-input v-model="item.optContent" style="width:500px"></el-input>
              </el-form-item>
              <a class="delete" @click.prevent="reDelete(index, InputFrom.optionList)">删除</a>
            </el-radio>
          </el-radio-group>
          <a class="add" @click="reAdd(InputFrom.optionList)">添加选项</a>
        </el-form-item>

        <el-form-item label="选项及答案：" v-if="InputFrom.type=='2'" prop="answer">
          <el-checkbox-group v-model="InputFrom.answer">
            <el-checkbox v-for="(item,index) in InputFrom.optionList" :label="item.optName" :key="item.optName">
              <a class="value">{{item.optName}}</a>
              <el-form-item class="inlineItem">
                <el-input v-model="item.optContent" style="width:500px"></el-input>
              </el-form-item>
              <a class="delete" @click.prevent="reDelete(index, InputFrom.optionList)">删除</a>
            </el-checkbox>
          </el-checkbox-group>
          <a class="add" @click="reAdd(InputFrom.optionList)">添加选项</a>
        </el-form-item>

        <el-form-item label="正确答案：" v-if="InputFrom.type=='3'" prop="answer">
          <el-select placeholder="全部" v-model="InputFrom.answer">
            <el-option label="正确" value="A"></el-option>
            <el-option label="错误" value="B"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addQuestion">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EducationExam",
  data() {
    const validateAnswer = (rule, value, callback) => {
      let opArr = [];
      let sign = this.InputFrom.optionList.every(item => {
        if (opArr.indexOf(item.optContent) === -1) {
          opArr.push(item.optContent);
        }
        return item.optContent !== "";
      });
      if (this.InputFrom.answer.length === 0) {
        callback(new Error("请填写正确答案"));
      } else if (
        !sign &&
        (this.InputFrom.type === 1 || this.InputFrom.type === 2)
      ) {
        callback(new Error("选项答案不能为空"));
      } else if (
        opArr.length < this.InputFrom.optionList.length &&
        (this.InputFrom.type === 1 || this.InputFrom.type === 2)
      ) {
        callback(new Error("选项答案不能重复"));
      } else {
        callback();
      }
    };
    return {
      // loading 事件控制开关
      loading: true,

      // 录入题型选择弹框开关
      questionTypeDialogVisible: false,

      // 录入问题弹框开关
      addQuestionDialogVisible: false,

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
      questionType: [
        {
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
      ],
      InputFrom: {
        // 单项选择题表单
        title: "", // 新建单选题目
        type: "1", // 题目类型 (1 单选题, 2 多选题, 3 判断题)
        qaId: "",
        isPublic: "",
        optionList: [
          {
            // 新建单选选项数组
            optName: "A",
            optContent: "",
            optId: ""
          },
          {
            optName: "B",
            optContent: "",
            optId: ""
          },
          {
            optName: "C",
            optContent: "",
            optId: ""
          }
        ],
        answer: "" // 新建选中的答案 或者填写的答案
      },

      isEdit: false, // 新建题目和编辑题目共用了一个弹窗，用此来区分是新建还是编辑

      fromRules: {
        // 验证规则
        title: [
          {
            required: true,
            trigger: "blur",
            message: "题目不能为空"
          }
        ],
        answer: [
          {
            required: true,
            trigger: "blur",
            validator: validateAnswer
          }
        ]
      }
    };
  },
  created() {
    this.getQuestionList();
  },
  methods: {
    /* 初始化数据 */
    reSetForm() {
      // 初始化数据
      this.InputFrom.title = "";
      this.InputFrom.optionList = [
        {
          // 新建单选选项数组
          optName: "A",
          optContent: "",
          optId: ""
        },
        {
          optName: "B",
          optContent: "",
          optId: ""
        },
        {
          optName: "C",
          optContent: "",
          optId: ""
        },
        {
          optName: "D",
          optContent: "",
          optId: ""
        }
      ];
      this.InputFrom.answer_analysis = "";

      if (this.InputFrom.type === 2) {
        this.InputFrom.answer = [];
      } else {
        this.InputFrom.answer = "";
      }
    },

    /* 单、多项选择项删除 */
    reDelete(index, obj) {
      let deleteData = obj.splice(index, 1)[0];
      // 删选项时考虑一下是否是把当前选中的项给删了，如果是，选中项要去除这一项
      if (this.createTestType === "单项选择题") {
        // 如果是单项选择，选中项是string
        deleteData.optName === this.InputFrom.answer
          ? (this.InputFrom.answer = "")
          : "";
        if (this.InputFrom.answer > deleteData.optName) {
          this.InputFrom.answer = String.fromCharCode(
            this.InputFrom.answer.charCodeAt(0) - 1
          );
        }
      } else if (this.createTestType === "多项选择题") {
        // 如果是多项选择题，选中项是arr
        // 如果删掉的事选中项，从选中项数组中把它去掉，否则不做处理
        this.InputFrom.answer.indexOf(deleteData.optName) !== -1
          ? this.InputFrom.answer.splice(
              this.InputFrom.answer.indexOf(deleteData.optName),
              1
            )
          : "";
        // 之后看一看是否有选中项在被删掉的项的后头，在的话因为后面重新计算了选择序号，相应的在被删掉的项后面的选中项的值也要重新计算
        let checkArr = this.InputFrom.answer.map((item, index, arr) => {
          if (item > deleteData.optName) {
            item = String.fromCharCode(item.charCodeAt(0) - 1);
          }
          return item;
        });
        this.InputFrom.answer = checkArr;
      }
      this.reCount(this.InputFrom.optionList);
    },

    /* 重新计算选项值 */
    reCount(arr) {
      arr.forEach((item, index) => {
        item.optName = String.fromCharCode(65 + index);
      });
    },
    /* 单、多项选择项增加 */
    reAdd(oldArr) {
      oldArr.push({
        optName: "",
        optContent: "",
        optId: ""
      });
      this.reCount(oldArr);
    },

    /* 创建题目 */
    addQuestion() {
      this.$refs.InputFrom.validate(valid => {
        if (valid) {
          let data = Object.assign({}, this.InputFrom);
          data.answer =
            typeof data.answer === "object"
              ? data.answer.join(",")
              : data.answer;             
          if (data.type === 3) {
            data.optionList =
              '[{"optName":"A","optContent":"对","optId":""},{"optName":"B","optContent":"错","optId":""}]';
          } else {
            data.optionList = JSON.stringify(data.optionList);
          }

          if (this.isEdit) {
            // 编辑题目提交
            data.question_id = this.question_id;
            this.$api.editQuestion(data).then(res => {
              if (res.errorCode === "1") {
                this.$message.success("编辑题目成功");
              } else {
                this.$message.error(res.message);
              }
              this.addQuestionDialogVisible = false;
              this.isEdit = false;
            });
          } else {
            // 新建题目提交
            this.$api.saveQuestion(data).then(res => {
              if (res.errorCode === "1") {
                this.$confirm("题目添加成功, 是否继续?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    this.questionTypeDialogVisible = true;
                    this.addQuestionDialogVisible = false;
                    this.reSetForm();
                    this.getQuestionList();

                  })
                  .catch(() => {
                    this.addQuestionDialogVisible = false;
                    this.getQuestionList();
                  });
              } else {
                this.$message.error("网络......");
              }
            });
          }
        }
      });
    },

    // 获取题目列表
    getQuestionList() {
      this.$api
        .questionList(this.queryInfo)
        .then(res => {
          if (res.errorCode === "1") {
            this.tablelist = res.data;
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
      this.getQuestionList();
    },
    changeQuestionStatus(val) {
      this.$api
        .freezeQuestion({
          qaId: val.qaId,
          isDeleted: val.isDeleted === "N" ? "Y" : "N"
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.getQuestionList();
            this.$message.success(
              val.isDeleted === "N" ? "成功激活题目" : "成功冻结题目"
            );
          }
        })
        .catch(err => {
          this.$message.error(err);
          return false;
        });
    },
    handleEdit(val) {
      this.isEdit = true;
      this.$api
        .questionPage({
          qaId: val.qaId
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.InputFrom.type = res.data.type;
            this.reSetForm();

            this.InputFrom = res.data;

            if (this.InputFrom.type === "2") {
              var arr = this.InputFrom.answer.split(",");
              this.InputFrom.answer = [];
              this.InputFrom.answer = arr;
            }

            this.addQuestionDialogVisible = true;
          }
        })
        .catch(err => {
          this.$message.error(err);
          return false;
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
</style>
