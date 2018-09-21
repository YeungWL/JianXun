<template>
  <div class="homeRecord" v-loading="loading" element-loading-text="拼命加载中">
    <div class="my-dialog scwj-dialog">
      <el-form size="mini">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="项目名称" label-width="90px">
              <el-select v-model="selectProject" placeholder="请选择项目" @change="handleProjectChange">
                <el-option v-for="item in projectList" :key="item.projectId" :label="item.proName" :value="item.projectId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织名称" label-width="90px">
              <el-select v-model="selectOrg" placeholder="请选择组织" @change="handleOrgChange">
                <el-option v-for="item in organizationList" :key="item.projectOrgId" :label="item.orgName" :value="item.projectOrgId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="日志名称" label-width="90px">
              <el-select v-model="selectLog" placeholder="请选择日志" @change="handleLogChange">
                <el-option v-for="item in logList" :key="item.id" :label="item.extendName" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="calinder">
      <vue-event-calendar :events="logHistoryList" @day-changed="dayChange" style="width:55%"></vue-event-calendar>
      <div style="padding-left:40%" v-if="buttonShow">
        <el-button type="primary" @click="handleExportFile()" class="rzbtn">导出日志</el-button>
        <el-button type="primary" @click="handleSetting()" class="setion">设置</el-button>
      </div>
    </div>

    <!-- 设置的dialog -->
    <el-dialog title="设置" :visible.sync="dialogSettingFormVisible" width="560px" class="my-dialog">
      <div class="setting">
        <div class="project">
          <span class="left">添加日志</span>
          <el-button icon="el-icon-plus" style="padding: 0;width: 30px;height: 32px;" @click="dialogAddLogFormVisible = true"></el-button>
        </div>
        <div>
          <ul>
            <li v-for="item in logList" :key="item.index" :label="item.extendName" :value="item.extendName">
              <div class="project">
                <span class="left">{{item.extendName}}</span>
                <span>
                  <el-button style="height: 32px;" type="primary" @click="handleExtendNameUpdate(item)">修改名称</el-button>
                  <el-button style="height: 32px;" type="success" @click="handlePreView(item)">预览</el-button>
                  <el-button style="height: 32px;" type="info" @click="handleLogParaUpdate(item)">设置参数</el-button>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="dialogSettingFormVisible = false ">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 添加日志dialog -->
    <el-dialog title="添加日志" :visible.sync="dialogAddLogFormVisible" width="560px" class="my-dialog" center>
      <div class="setting">
        <div class="project">
          <div style="width: 90px;">日志名称</div>
          <el-input placeholder="请输入日志名称" v-model="extendName"></el-input>
        </div>
        <div class="project">
          <el-select v-model="templateSelect" placeholder="请选择监理日志模板">
            <el-option v-for="item in templateList" :key="item.tempId" :label="item.name" :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="project">
          <div style="margin:0 auto;">预览</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddLog()">确定</el-button>
      </span>
    </el-dialog>

    <!-- 设置详情主页面的dialog -->
    <el-dialog title="设置参数" :visible.sync="dialogSettingDetailVisible" width="560px" class="my-dialog">
      <div class="setting">
        <div class="project">
          <span style="width: 150px;">工程名称：</span>
          <el-input placeholder="请输入工程名称" v-model="currentProjectName"></el-input>
        </div>
        <hr />
        <div class="project">
          <span>组织负责人审阅日志时间：</span>
          <el-input style="width: 80px;" placeholder="" v-model="currentProjectTime"></el-input>
          <span>-</span>
          <el-input style="width: 80px;" placeholder="24" :disabled="true"></el-input>
        </div>
        <div class="project">
          <span>注：日志填写人员需要在组织负责人审阅时间开始前完成填写</span>
        </div>
        <div class="project">
          <span></span>
        </div>
        <hr />
        <span>查阅权限</span>
        <div class="project">
          <ul>
            <li v-for="item in SettingOrgList" :key="item.index" :label="item.orgName" :value="item.orgName">
              <el-checkbox v-model="item.isAuthor">{{item.orgName}}</el-checkbox>
            </li>
          </ul>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="setPermission()">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 修改监理日志的名称的dialog -->
    <el-dialog title="修改监理日志的名称" :visible.sync="dialogUpdateExtendNameFormVisible" width="560px" class="my-dialog">
      <div class="setting">
        <div class="project">
          <div style="width: 450px;">原监理日志名称：{{editExtendNameInfo.extendName}}</div>
        </div>
        <div class="project">
          <div style="width: 150px;">新监理日志名称：</div>
          <el-input placeholder="请输入日志名称" v-model="inputNewLogName"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="updateExtendName()">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 预览监理日志的dialog -->
    <el-dialog title="预览" :visible.sync="dialogPreviewFormVisible" width="1060px" class="my-dialog">
      <div class="setting">
        <iframe :src="srcUrl" width="800px" height="1100px"></iframe>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="dialogPreviewFormVisible=false">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 导出dialog -->
    <el-dialog title="导出" :visible.sync="dialogExportFormVisible" center>
      <el-form :model="form">

        <el-form-item label="日志名称" :label-width="formLabelWidth">
          <el-select v-model="form.selectLog" placeholder="请选择日志" @change="handleLogChange">
            <el-option v-for="item in logList" :key="item.id" :label="item.extendName" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="起始日期" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.beginTime" value-format="yyyy-MM-dd">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="终止日期" :label-width="formLabelWidth">
          <el-date-picker type="date" range-separator="至" placeholder="结束日期" v-model="form.endTime" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="exportLogFile()">导出</el-button>
        <el-button @click="dialogExportFormVisible = false">关 闭</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      /* 加载 */
      loading: false,

      // 当前选择的项目
      selectProject: "",

      // 当前选择的组织
      selectOrg: "",

      // 与用户相关的项目列表
      projectList: [],

      // 与当前项目相关的组织列表
      organizationList: [],

      // 当前选择的日志信息
      selectLog: [],

      // 可供选择的监理日志列表
      logList: [],

      // 什么东东来着
      // demoEvents: [
      // ],

      //监理日志历史记录
      logHistoryList: [],

      demoEvents: [],

      //预览链接
      srcUrl: "",

      //授权同一项目组织列表
      SettingOrgList: [],

      // 设置对话框开关
      dialogSettingFormVisible: false,

      // 导出对话框开关
      dialogExportFormVisible: false,

      // 添加日志对话框开关
      dialogAddLogFormVisible: false,

      // 预览模板弹框
      dialogPreviewFormVisible: false,

      // 名称info储存
      editExtendNameInfo: [],

      // 日志名称
      extendName: "",

      // 当前被选中的模板
      templateSelect: [],

      // 可供选择的监理日志模板
      templateList: [],

      // 设置日志详情对话框开关
      dialogSettingDetailVisible: false,

      //设置日志详情之日志名称
      currentProjectName: "",

      //设置日志详情之编辑结束时间
      currentProjectTime: "",

      //修改日志名称对话框开关
      dialogUpdateExtendNameFormVisible: false,

      // 新监理日志名称
      inputNewLogName: "",

      // 是当天日期被点击
      checkWrite: false,

      // 导出日志
      form: {
        selectLog: [],
        beginTime: "",
        endTime: ""
      },

      show: {
        isShow: false
      },
      // need to confirm start

      token: this.getToken(),
      accessToken: localStorage.getItem("accessToken"),

      setting: {
        major: "",
        district: "",
        templateId: ""
      },
      formLabelWidth: "120px",
      value: "",
      value1: "",
      buttonShow: false,
      logData: {},
      logList: [],
      BeReferOrgs: [],
      currentTempId: "",
      currentLogId: "",
      isCanEdit: true
      // need to confirm end
    };
  },
  methods: {
    // 响应当前项目变动处理事件
    handleProjectChange() {
      this.selectOrg = "";
      this.organizationList = [];
      this.selectLog = "";
      this.logList = [];

      if (this.selectProject.length === 0) {
        this.$api.getNotBindOrgs().then(res => {
          if (res.resultMsg !== "查询成功") return false;
          this.organizationList = res.data;
        });
      } else {
        let params = {
          projectId: this.selectProject
        };
        this.$api.getSupervisorMyOrgs(params, {}).then(res => {
          if (res.resultMsg !== "查询成功") return false;
          this.organizationList = res.data;
        });
      }
    },

    // 响应当前组织变动处理事件
    handleOrgChange(value) {
      this.getAddTempList();
      this.selectOrg = value;
      this.$api
        .isChargeMan({
          projectOrgId: value
        })
        .then(res => {
          if (res.errorCode == "1") {
            if (
              res.data[0].isChargeMan == "0" ||
              res.data[0].isChargeMan == "1"
            ) {
              this.buttonShow = true;
            } else {
              this.buttonShow = false;
            }
          }
        });
    },

    // 响应到处按钮处理事件
    handleExportFile() {
      this.exportFile();
    },

    // 响应当前监理日志变动处理事件
    handleLogChange(value) {
      this.currentProjectName = value.projectName;
      this.currentProjectTime = value.setTime;
      this.currentTempId = value.tempId;
      this.currentLogId = value.id;

      console.log("currentTempId : " + this.currentTempId);
      console.log("currentLogId : " + this.currentLogId);
      this.getSupervisionHistoryList();
      this.whetherCanEdit();
    },

    // 响应设置页面点击预览处理事件
    handlePreView(item) {
      this.srcUrl =
        "http://120.25.121.72//jianzhumobile/mobile/supervision/previewPage.do?tempId=" +
        item.tempId;
      this.dialogPreviewFormVisible = true;
    },
    // 日历处理事件
    dayChange(day) {
      console.log(day);

      if (this.selectOrg === "") {
        this.$message("请选择一个组织");
        return false;
      }

      if (this.selectLog == "") {
        this.$message("请选择一个监理日志");
        return false;
      }

      let numDay = day.date;
      numDay = numDay.split("/");
      let years = numDay[0];
      let numDays = numDay[2];
      let numMonth = numDay[1];
      let date = new Date();
      let month = date.getMonth() + 1;
      let days = date.getDate();
      let year = date.getFullYear();

      if (
        (numDays < days && numMonth == month) ||
        numMonth < month ||
        years < year
      ) {
        this.$router.push({
          name: "supervisorDetail",
          query: {
            orgId: this.selectOrg,
            createDate: day.date,
            logId: this.currentLogId,
            tempId: this.currentTempId
          }
        });
      }
      if (numDays == days && numMonth == month && year == years) {
        this.checkWrite = true;
        this.whetherCanEdit();
      }
    },

    // 设置按钮处理事件
    handleSetting() {
      this.getAddTempList();
      this.dialogSettingFormVisible = true;
    },

    // 处理修改按钮点击事件
    handleExtendNameUpdate(item) {
      let editExtendNameInfoTmp = {
        extendName: item.extendName,
        orgId: item.orgId,
        logId: item.id
      };
      this.editExtendNameInfo = editExtendNameInfoTmp;
      this.inputNewLogName = "";
      this.dialogUpdateExtendNameFormVisible = true;
    },

    // 处理设置参数按钮点击事件
    handleLogParaUpdate(item) {
      this.currentProjectName = item.projectName;
      this.currentProjectTime = item.setTime;
      this.getBeReferOrgs(item);
    },

    // 添加日志 提交按钮处理事件
    handleAddLog() {
      let params = {
        orgId: this.selectOrg,
        tempId: this.templateSelect.tempId,
        tempName: this.templateSelect.name,
        extendName: this.extendName
      };
      this.$api.addTemp(params, {}).then(res => {
        if (res.resultMsg !== "查询成功") return false;
      });
    },

    // 获取日志列表
    getAddTempList() {
      let params = {
        orgId: this.selectOrg,
        projectId: this.selectProject
      };
      this.$api.getAddTempList(params, {}).then(res => {
        if (res.resultMsg !== "查询成功") return false;
        this.logList = res.data;
      });
    },

    // 设置日志
    setPermission() {
      var orgRefIds = "";
      for (var i = 0; i < this.SettingOrgList.length; i++) {
        if (this.SettingOrgList[i].isAuthor === true) {
          if (orgRefIds === "") {
            orgRefIds = this.SettingOrgList[i].projectOrgId;
          } else {
            orgRefIds = orgRefIds + "-" + this.SettingOrgList[i].projectOrgId;
          }
        }
      }

      let params = {
        projectName: this.currentProjectName,
        setTime: this.currentProjectTime,
        tempId: this.currentTempId,
        logId: this.currentLogId,
        projectId: this.selectProject,
        orgId: this.selectOrg,
        orgRefIds: orgRefIds
      };
      this.$api.setPermission(params, {}).then(res => {
        if (res.errorCode === "1") {
          this.getAddTempList();
          this.dialogSettingDetailVisible = false;
          this.$message.success("提交成功");
        }
      });
    },

    // 修改监理日志的名称
    updateExtendName() {
      let params = {
        orgId: this.editExtendNameInfo.orgId,
        logId: this.editExtendNameInfo.logId,
        extendName: this.inputNewLogName
      };
      this.$api.editExtendName(params, {}).then(res => {
        if (res.errorCode === "1") {
          this.getAddTempList();
          this.$message.success("提交成功");
          this.dialogUpdateExtendNameFormVisible = false;
        }
      });
    },

    getBeReferOrgs(item) {
      this.SettingOrgList = [];
      this.currentTempId = item.tempId;
      this.currentLogId = item.id;
      let params = {
        orgId: this.selectOrg,
        projectId: this.selectProject,
        tempId: item.tempId,
        logId: item.id
      };
      this.$api.getBeReferOrgs(params, {}).then(res => {
        if (res.errorCode === "1") {
          this.dialogSettingDetailVisible = true;
          this.BeReferOrgs = res.data;

          for (var i = 0; i < res.data[0].beReferOrgs.length; i++) {


            var orgData = {
              projectOrgId: res.data[0].beReferOrgs[i].projectOrgId,
              orgName: res.data[0].beReferOrgs[i].orgName,
              isAuthor:
                res.data[0].beReferOrgs[i].isAuthor === "2" ? true : false,
              index: i
            };
            this.SettingOrgList.push(orgData);

            console.log(
              "this.BeReferOrgs " + res.data[0].beReferOrgs[i].orgName
              +　 "　　this.BeReferOrgs " + res.data[0].beReferOrgs[i].isAuthor
            );
          }
        }
      });
    },

    onResultChange(val) {
      this.show = val;
    },

    //获取项目列表
    getProjectList() {
      this.loading = true;
      this.$api
        .getMyInPro({
          operateType: ""
        })
        .then(res => {
          if (res.resultMsg !== "查询成功") return false;
          this.projectList = res.data;
          this.projectList.push({
            createTime: "",
            creator: "",
            endTime: "",
            isDeleted: "",
            isTran: "",
            proCode: "",
            proCount: "",
            proDesc: "",
            proLogo: "",
            proName: "未关联项目的组织",
            projectId: "",
            shortName: "",
            startTime: "",
            status: "",
            tranUserId: ""
          });

          this.selectProject = "";
          this.loading = false;
        });
    },

    //获取自己参加的组织
    getMyOrg() {
      let params = {
        projectId: this.selectProject
      };
      this.$api.getSupervisorMyOrgs(params, {}).then(res => {
        if (res.resultMsg !== "查询成功") return false;
        this.organizationList = res.data;
      });
    },

    // 获取未关联项目的组织
    getNotBindOrgs() {
      let params = {
        projectId: this.selectProject
      };
      this.$api.getNotBindOrgs(params, {}).then(res => {
        if (res.resultMsg !== "查询成功") return false;
        this.organizationList = res.data;
      });
    },

    getSupervisionHistoryList() {
      let params = {
        orgId: this.selectOrg,
        logDate: "2018-09",
        tempId: this.currentTempId,
        logId: this.currentLogId
      };
      this.$api.getSupervisionHistoryList(params, {}).then(res => {
        if (res.resultMsg !== "查询成功") return false;
        this.logHistoryList = res.data;
        this.demoEvents = [];
        this.UpdateHistoryList();
      });
    },

    UpdateHistoryList() {
      var tmpLogHistoryList = [];
      for (var i = 0; i < this.logHistoryList.length; i++) {
        let params = {
          date: this.logHistoryList[i].startDate.replace(
            new RegExp("-", "gm"),
            "/"
          ),
          title: "",
          orgId: this.logHistoryList[i].orgId,
          startDate: this.logHistoryList[i].startDate,
          logId: this.logHistoryList[i].logId,
          historyId: this.logHistoryList[i].historyId,
          tempId: this.logHistoryList[i].tempId
        };

        tmpLogHistoryList.push(params);
      }
      this.logHistoryList = tmpLogHistoryList;
    },

    //根据当前用户的身份，做不同操作
    whetherCanEdit() {
      console.log(
        "orgId:" +
          this.selectOrg +
          "\ntempId:" +
          this.currentTempId +
          "\nlogId:" +
          this.currentLogId
      );

      let params = {
        orgId: this.selectOrg,
        tempId: this.currentTempId,
        logId: this.currentLogId
      };
      this.$api.whetherCanEdit(params, {}).then(res => {
        if (res.errorCode === "1") {
          console.log("res.data[0].status：" + res.data[0].status);
          if (this.checkWrite === true) {
            if (res.data[0].status === "1") {
              this.isCanEdit = false;
              console.log("ABC");
            } else {
              this.isCanEdit = true;
              console.log("DEF");
            }

            this.$router.push({
              name: "writeSupervisoRecord",
              query: {
                tempId: this.selectLog.tempId,
                logId: this.selectLog.id,
                orgId: this.selectOrg,
                isCanEdit: this.isCanEdit
              }
            });
          }
        }
      });
    },

    // 获取模板分页列表
    getlogList() {
      this.$api.getTempList().then(res => {
        if (res.errorCode == "1") {
          this.templateList = res.data;
        }
      });
    },

    // 导出日志
    exportFile() {
      this.dialogExportFormVisible = true;
    },

    exportLogFile() {
      var date = new Date();
      var nowDay = date.getDate();
      let big = [1, 3, 5, 7, 8, 10, 12];
      this.day = this.day + this.count;

      if (this.day === nowDay) {
        this.isCanClick = true;
        return false;
      }

      var date = new Date();
      var nowDay = date.getDate();

      this.day = this.day + this.count;

      if (this.day === nowDay) {
        this.isCanClick = true;
        return false;
      }

      var strUrl =
        this.baseURL() +
        "/jianzhumobile/mobile/supervision/exportFile.do?" +
        "startDate=" +
        this.form.beginTime +
        "&endDate=" +
        this.form.endTime +
        "&accessToken=" +
        this.accessToken +
        "&token=" +
        this.token +
        "&orgId=" +
        this.selectOrg +
        "&logId=" +
        this.form.selectLog.id +
        "&tempId=" +
        this.form.selectLog.tempId;
      window.open(strUrl);
    }
  },
  created() {
    this.getProjectList();
    this.getNotBindOrgs();
    this.getlogList();
  }
};
</script>

<style lang="scss" scoped>
.homeRecord {
  display: block;

  .container {
    max-width: 850px;
    min-width: 720px;
    // width: 850px;
    margin: 20px;

    .calinder {
      .btn {
        display: flex;
        margin: 0 30px;
        line-height: 32px;

        a {
          color: #26a2ff;
          text-decoration: underline;
          padding-left: 10px;
        }

        .rzbtn {
          width: 78px;
        }

        .setion {
          width: 50px;
        }

        .content {
          flex: 1;
          text-align: center;
        }
      }
    }
  }

  .el-date-editor.el-input {
    width: 250px;
  }

  .el-form-item {
    margin-top: 20px;
  }

  .setting {
    padding: 20px 0;
  }

  .project {
    width: 482px;
    display: flex;
    justify-content: space-between;
    padding: 7px 0;
    line-height: 32px;
  }

  .organization {
    .el-select {
      width: 500px;
      margin-top: 10px;
    }
  }
}
</style>
