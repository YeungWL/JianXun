<template>
  <div class="page-content-body" v-loading="loading" element-loading-text="拼命加载中">
    <div class="page-header clearfix">
      <el-form class="search-form" :inline="true" ref="form">
        <el-form-item label="组织：" label-width="55px">
          <el-select v-model="listForm.orgId" placeholder="请选择" class="item-org" @change="UpdateOrgList()">
            <el-option v-for="item in orgList" :key="item.orgId" :label="item.orgName" :value="item.orgId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form ref="form" v-model="listForm" size="mini">
        <el-row :gutter="24">
          <el-col :span="4">
            <el-form-item label="姓名：" label-width="55px">
              <el-input v-model="listForm.name" placeholder="姓名" width="50px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="电话：" label-width="55px">
              <el-input v-model="listForm.tel" placeholder="电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="考卷：" label-width="55px">
              <el-input v-model="listForm.examName" placeholder="考卷名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="班组：" prop="groupId" label-width="55px">
              <el-select v-model="listForm.groupId" placeholder="请选择">
                <el-option v-for="item in groupList" :key="item.groupId" :label="item.groupName" :value="item.groupId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="完成状态：" prop="status" label-width="85px">
              <el-select v-model="listForm.status" placeholder="请选择">
                <el-option v-for="item in statusOption" :key="item.index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-form ref="form" v-model="listForm" size="mini">
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item label="成绩：" label-width="55px">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                <tbody>
                  <tr>
                    <td width="45%">
                      <el-input v-model="listForm.minScore" placeholder width="50px"></el-input>
                    </td>
                    <td width="10%" align="center">-</td>
                    <td width="45%" align="right">
                      <el-input v-model="listForm.maxScore" placeholder></el-input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" class="search_btn" @click="handleSearch">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- table开始 -->
    <div class="page-main customTable">
      <el-table ref="multipleTable" style="width: 100%" :data="examRecordList">
        <el-table-column prop="name" label="姓名" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tel" label="手机号码" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="groupName" label="所在班组" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="actName" label="考场场次" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="examName" label="考卷名称" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="examScore" label="考卷成绩" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="完成状态" min-width="100">
          <template slot-scope="scope">{{ scope.row.status=== "Y"? '合格' : '不合格' }}</template>
        </el-table-column>
        <el-table-column prop="updateTime" label="考试时间" min-width="200" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <!-- 分页-->
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
        :current-page.sync="currentPage" :page-size="showCount" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "examList",
    data() {
      return {
        loading: true,

        //组织列表
        orgList: [],

        //一页显示几个
        showCount: 10,
        //当前是第几页
        currentPage: 1,
        //总共有几条记录
        total: 0,
        // 考卷列表
        paperList: [],
        //考场列表
        roomList: [],
        // 班组列表
        groupList: [],
        //能否进行操作
        canProcess: false,

        listForm: {
          orgId: "",
          name: "",
          tel: "",
          groupId: "",
          examId: "",
          status: "",
          minScore: 0,
          maxScore: 100,
          showCount: 10,
          currentPage: 1
        },

        examRecordList: [],

        manageType: [],

        //创建考场
        createRoom: {
          orgId: "",
          actName: "",
          examId: "",
          groupId: "",
          isDeleted: "N"
        },
        examRecordDetail: {},

        loading: true,

        currentWorkerName: "",
        currentGroupName: "",

        statusOption: [{
            value: "",
            label: "全部"
          },
          {
            value: "Y",
            label: "完成"
          },
          {
            value: "N",
            label: "未完成"
          }
        ],

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
            this.listForm.orgId = this.orgList[0].orgId;
            this.loading = false;
          } else {
            this.$message.error(res.message);
          }
          this.createExamDialogVisible = false;
          this.isEdit = false;
        });
      },

      examRecord() {
        this.$api.examRecord(this.listForm).then(res => {
          if (res.errorCode === "1") {
            this.examRecordList = res.data;
            this.showCount = res.pageSize;
            this.currentPage = res.currentPage;
            this.total = res.totalRecords;
          } else {
            this.$message.error(res.resultMsg);
          }
        });
      },

      // 获取班组列表
      getGroupList() {
        this.groupList[0] = {
          groupId: "",
          groupName: "全部",
          groupCode: "",
          remark: "",
          orgId: "",
          companyId: null,
          groupLeader: null,
          leaderPhone: null,
          createTime: "",
          creator: "",
          updateTime: null,
          updateBy: null,
          isDeleted: ""
        };

        this.$api
          .getExamgroupList({
            orgId: this.listForm.orgId
          })
          .then(res => {
            if (res.errorCode === "1") {
              for (var i = 0; i < res.data.length; i++) {
                this.groupList[i + 1] = res.data[i];
              }
            } else {
              this.$message.error(res.resultMsg);
            }
          });
      },

      //查看学习详情
      documentDetails(data) {
        this.currentWorkerName = data.name;
        this.currentGroupName = data.groupName;
        this.$api
          .getexamRecord({
            crecordId: data.crecordId
          })
          .then(res => {
            if (res.errorCode === "1") {
              this.examRecordDetail = res.data;
              this.educationDialogVisible = true;
            } else {
              this.$message.error(res.resultMsg);
            }
          });
      },

      UpdateOrgList() {
        this.examRecord();
        this.getGroupList();
      },

      // 关闭弹窗
      handleClose() {
        this.educationDialogVisible = false;
      },

      handleSearch() {
        this.examRecord();
      },

      //处理table列表转换
      handlePageChange() {
        this.examRecord();
      },

      //判断是否已经选择了组织
      isSelectOrg() {
        if (this.listForm.orgId === "") {
          this.canProcess = false;
          this.$message.warning("请选择要操作的组织");
        } else {
          this.educationDialogVisible = true;
          this.canProcess = true;
        }
      }
    }
  };
</script>
<style lang="scss" scoped="">
  .content_revise {
    margin: 0 auto;
    display: flex;
  }

  .left_3 {
    flex: 250px 0;
  }
</style>