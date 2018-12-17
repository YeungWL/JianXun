<template>
  <div class="page-content-body" v-loading="loading" element-loading-text="拼命加载中">
    <div class="page-header  clearfix">
      <el-form class="search-form" :inline="true" ref="form">
        <el-form-item label="组织：">
          <el-select v-model="selectOrgID" placeholder="请选择" class="item-org" @change="UpdateOrgList">
            <el-option v-for="item  in  orgList" :key="item.orgId" :label="item.orgName" :value="item.orgId">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="btn-group  fr">
          <el-button type="primary" icon="el-icon-plus" @click="handleAddExamRoom">
            添加考场
          </el-button>
        </div>
      </el-form>
    </div>
    <!--  table开始  -->
    <div class="page-main  customTable">
      <el-table ref="multipleTable" style="width:  100%" :data="roomList">
        <el-table-column prop="actName" label="考场名称" min-width="60" show-overflow-tooltip="">
        </el-table-column>
        <el-table-column prop="examName" label="试卷名称" min-width="200" show-overflow-tooltip="">
        </el-table-column>
        <el-table-column prop="groupName" label="应用对象" min-width="60" show-overflow-tooltip="">
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="scope">
            <span v-if='scope.row.isDeleted === "N"' class="green" @click="setEduSetActIsDeleted(scope.row)">
              开
            </span>
            <span v-else class="red" @click="setEduSetActIsDeleted(scope.row)">
              关
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  分页-->
    <div class="pagination">
      <el-pagination background="" layout="total,  prev,  pager,  next" @current-change="handlePageChange"
        :current-page.sync="currentPage" :page-size="showCount" :total="total">
      </el-pagination>
    </div>

    <!--  添加考场 -->
    <el-dialog title="添加考场" :visible.sync="examRoomDialogVisible" width="400px" center>
      <el-form ref="form" v-model="createRoom" size="mini">
        <el-row>
          <el-form-item label="场次名称：" label-width="100px">
            <el-input placeholder="" v-model="createRoom.actName" clearable="" >
            </el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="考卷配置：" label-width="100px">
            <el-select v-model="createRoom.examId" placeholder="请选择" class="item-org" >
              <el-option v-for="item in paperList" :key="item.examId" :label="item.examName" :value="item.examId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="角色配置：" label-width="100px">
            <el-select v-model="createRoom.groupId" placeholder="请选择" class="item-org" >
              <el-option v-for="item in groupList" :key="item.groupId" :label="item.groupName" :value="item.groupId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="考卷开关：" label-width="100px">
            <el-radio v-model="createRoom.isDeleted" label="N">开</el-radio>
            <el-radio v-model="createRoom.isDeleted" label="Y">关</el-radio>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlecreateRoom">
          提交
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "examManage",
  data() {
    return {
      loading: true,
      //组织列表
      orgList: [],
      //当前选择的组织ID
      selectOrgID: "",
      //录入考卷弹框开关
      examRoomDialogVisible: false,
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
      }
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

          this.selectOrgID = this.orgList[0].orgId;
          this.loading = false;
        } else {
          this.$message.error(res.message);
        }
        this.createExamDialogVisible = false;
        this.isEdit = false;
      });
    },

    // 获取考场列表
    getRoomList() {
      this.$api
        .getActList({
          orgId: this.selectOrgID,
          showCount: this.showCount,
          currentPage: this.currentPage
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.roomList = res.data;
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
      this.$api
        .getExamgroupList({
          orgId: this.selectOrgID
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.groupList = res.data;
          } else {
            this.$message.error(res.resultMsg);
          }
        });
    },

    // 获取考卷列表
    getPaperList() {
      this.$api
        .getExamList({
          orgId: this.selectOrgID
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.paperList = res.data;
          } else {
            this.$message.error(res.resultMsg);
          }
        });
    },

    UpdateOrgList() {
      this.getRoomList();
      this.getGroupList();
      this.getPaperList();
    },

    //  添加考卷
    handleAddExamRoom() {
      this.isSelectOrg();
      this.createRoom = [];
    },

    //处理table列表转换
    handlePageChange() {
      this.getRoomList();
    },

    //处理创建考卷按钮事件
    handlecreateRoom() {
      this.isSelectOrg();
      if (this.canProcess === false) return false;
      this.createRoom.orgId = this.selectOrgID;
      this.$api.eduSaveAct(this.createRoom).then(res => {
        if (res.errorCode === "1") {
          this.examRoomDialogVisible = false;
          this.getRoomList();
        } else {
          this.$message.error(res.resultMsg);
        }
      });
    },

    //判断是否已经选择了组织
    isSelectOrg() {
      if (this.selectOrgID === "") {
        this.canProcess = false;
        this.$message.warning("请选择要操作的组织");
      } else {
        this.examRoomDialogVisible = true;
        this.canProcess = true;
      }
    },

    //控制考卷开关
    setEduSetActIsDeleted(data) {
      this.$api
        .eduSetActIsDeleted({
          actId: data.actId,
          isDeleted: data.isDeleted === "Y" ? "N" : "Y"
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.getRoomList();
          } else {
            this.$message.error(res.resultMsg);
          }
        });
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
