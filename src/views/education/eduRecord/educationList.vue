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
              <el-input v-model="listForm.name" placeholder="姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="电话：" label-width="55px">
              <el-input v-model="listForm.tel" placeholder="电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="班组：" prop="groupId" label-width="55px">
              <el-select v-model="listForm.groupId" placeholder="请选择">
                <el-option v-for="item in groupList" :key="item.groupId" :label="item.groupName" :value="item.groupId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="完成状态：" prop="status" label-width="85px">
              <el-select v-model="listForm.status" placeholder="请选择">
                <el-option v-for="item in statusOption" :key="item.index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="进退场状态" prop="isExit" label-width="90px">
              <el-select v-model="listForm.isExit" placeholder="请选择">
                <el-option v-for="item in isExitOption" :key="item.index" :label="item.label" :value="item.value"></el-option>
              </el-select>
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
      <el-table ref="multipleTable" style="width: 100%" :data="couseRecordList">
        <el-table-column prop="name" label="姓名" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tel" label="手机号码" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="groupName" label="所在班组" min-width="100" show-overflow-tooltip></el-table-column>

        <el-table-column label="完成状态" min-width="100">
          <template slot-scope="scope">{{ scope.row.status=== "Y"? '完成' : '未完成' }}</template>
        </el-table-column>

        <el-table-column label="进退场状态" min-width="100">
          <template slot-scope="scope">{{ scope.row.isExit=== "Y"? '退场' : '进场' }}</template>
        </el-table-column>

        <el-table-column label="学习详情" min-width="100">
          <template slot-scope="scope">
            <span class="edit" @click="documentDetails(scope.row)">查看</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页-->
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
        :current-page.sync="currentPage" :page-size="showCount" :total="total"></el-pagination>
    </div>

    <!-- 查看详情 -->
    <el-dialog title="学习详情" :visible.sync="educationDialogVisible" width="600px" center>
      <div class="page-header clearfix">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
          <tbody>
            <tr>
              <td>学习详情</td>
              <td align="right">{{currentWorkerName}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr>
      <div class="page-header clearfix">组织名称：{{CourseRecordDetail.orgName}}</div>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
        <tbody>
          <tr>
            <td>公司级：</td>
          </tr>
          <tr>
            <td>
              <ul>
                <li v-for="item in CourseRecordDetail.companyRecord" :key="item.index" :label="item.courseName"
                  :value="item.courseName">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                    <tbody>
                      <tr>
                        <td>{{item.courseName}}</td>
                        <td align="right">
                          <table>
                            <tr>
                              <td align="right">{{item.finished}}</td>
                              <td align="right" style="width:80px;color:blue">{{item.studyMinutes}}  分钟</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <hr>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
        <tbody>
          <tr>
            <td>项目部级：</td>
          </tr>
          <tr>
            <td>
              <ul>
                <li v-for="item in CourseRecordDetail.orgRecord" :key="item.index" :label="item.courseName"
                  :value="item.courseName">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                    <tbody>
                      <tr>
                        <td>{{item.courseName}}</td>
                        <td align="right">
                          <table>
                            <tr>
                              <td align="right">{{item.finished}}</td>
                              <td align="right" style="width:80px;color:blue">{{item.studyMinutes}}  分钟</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <hr>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
        <tbody>
          <tr>
            <td>班组级-{{currentGroupName}};</td>
          </tr>
          <tr>
            <td>
              <ul>
                <li v-for="item in CourseRecordDetail.groupRecord" :key="item.index" :label="item.courseName"
                  :value="item.courseName">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                    <tbody>
                      <tr>
                        <td>{{item.courseName}}</td>
                        <td align="right">
                          <table>
                            <tr>
                              <td align="right">{{item.finished}}</td>
                              <td align="right" style="width:80px;color:blue">{{item.studyMinutes}} 分钟</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "educationList",
  data() {
    return {
      loading: true,

      currentWorkerName: "",
      currentGroupName: "",
      //组织列表
      orgList: [],
      orgName: "",

      listForm: {
        orgId: "",
        name: "",
        tel: "",
        groupId: "",
        status: "",
        showCount: 10,
        currentPage: 1
      },

      statusOption: [
        {
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

      isExitOption: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "Y",
          label: "退场"
        },
        {
          value: "N",
          label: "进场"
        }
      ],

      couseRecordList: [],

      //录入考卷弹框开关
      educationDialogVisible: false,
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

      //创建考场
      createRoom: {
        orgId: "",
        actName: "",
        examId: "",
        groupId: "",
        isDeleted: "N"
      },
      CourseRecordDetail: {}
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

    courseRecord() {
      this.$api.courseRecord(this.listForm).then(res => {
        if (res.errorCode === "1") {
          this.couseRecordList = res.data;
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
        .getCourseRecord({
          crecordId: data.crecordId
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.CourseRecordDetail = res.data;
            this.educationDialogVisible = true;
          } else {
            this.$message.error(res.resultMsg);
          }
        });
    },

    UpdateOrgList() {
      this.courseRecord();
      this.getGroupList();
    },

    // 关闭弹窗
    handleClose() {
      this.educationDialogVisible = false;
    },

    handleSearch() {
      this.courseRecord();
    },

    //处理table列表转换
    handlePageChange(val) {
      this.listForm.currentPage = val;
      this.courseRecord();
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