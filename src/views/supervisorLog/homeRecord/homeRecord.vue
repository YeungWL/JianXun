<template>
  <div class="homeRecord">
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
      <vue-event-calendar :events="demoEvents" @day-changed="dayChange"></vue-event-calendar>
      <div class="btn">
        <el-button type="primary" @click="dialogSettingFormVisible = true" class="rzbtn">导出日志</el-button>
        <div class="content">
          <span>当前有效期至 : 2018年6月30号 </span>
          <a href="javascript:;" @click="show.isShow = !show.isShow">续期</a>
        </div>
        <el-button type="primary" @click="handleSetting()" v-if="buttonShow" class="setion">设置</el-button>
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
                  <el-button style="height: 32px;" type="success">预览</el-button>
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
        <div class="project">
          <span>查阅权限</span>
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

    <!-- 导出dialog -->
    <el-dialog title="导出" :visible.sync="dialogExportFormVisible">
      <el-form :model="form">
        <el-form-item label="起始日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.beginTime" type="datetime" placeholder="开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.endTime" type="datetime" range-separator="至" placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fileFormatDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 续期的dialog -->
    <renewal :msg="show" @on-result-change="onResultChange"></renewal>
  </div>
</template>

<script>
import renewal from "@/components/renewal";
export default {
  components: {
    renewal
  },
  data() {
    return {
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
      demoEvents: [],

      // 续期内容是否显示
      show: {
        isShow: false
      },

      // 设置对话框开关
      dialogSettingFormVisible: false,

      // 导出对话框开关
      dialogExportFormVisible: false,

      // 添加日志对话框开关
      dialogAddLogFormVisible: false,

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

      // 导出日志
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        district: "",
        beginTime: "",
        endTime: ""
      },

      // need to confirm start
      orgId: "",
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
      isCanEdit: true, 
      // need to confirm end
    };
  },
  methods: {
    // 响应当前项目变动处理事件
    handleProjectChange() {
      this.selectOrg = "";
      this.organizationList = [];

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
      this.orgId = value;
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

    // 响应当前监理日志变动处理事件
    handleLogChange(value) {
      this.currentProjectName = value.projectName;
      this.currentProjectTime = value.setTime;
    },

    // 日历处理事件
    dayChange(day) {
      console.log(day);
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
        if (this.orgId == "") {
          this.$message("请选择一个组织");
          return false;
        }

        if (this.selectLog == "") {
          this.$message("请选择一个监理日志");
          return false;
        }
        this.$router.push({
          name: "detail",
          query: {
            orgId: this.orgId,
            logDate: day.date
          }
        });
      }
      if (numDays == days && numMonth == month && year == years) {
        if (this.orgId == "") {
          this.$message("请选择一个组织");
          return false;
        }
        if (this.selectLog == "") {
          this.$message("请选择一个监理日志");
          return false;
        }

        this.$router.push({
          name: "writeSupervisoRecord",
          query: {
            date: day.date,
            tempId: this.selectLog.tempId,
            logId: this.selectLog.id,
            orgId: this.selectOrg,
            isCanEdit: this.isCanEdit
          }
        });
      }
    },

    // 设置按钮处理事件
    handleSetting() {
      this.getAddTempList();
      if (this.logList.length > 0) {
        this.dialogSettingFormVisible = true;
      }
    },

    // 处理修改按钮点击事件
    handleExtendNameUpdate(item) {
      let editExtendNameInfoTmp = {
        extendName: item.extendName,
        orgId: item.orgId,
        logId: item.id
      };
      this.editExtendNameInfo = editExtendNameInfoTmp;
      this.inputNewLogName="";
      this.dialogUpdateExtendNameFormVisible = true;
    },

    // 处理设置参数按钮点击事件
    handleLogParaUpdate(item) {
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
      let params = {
        projectName: this.currentProjectName,
        setTime: this.currentProjectTime,
        tempId: this.currentTempId,
        logId: this.currentLogId,
        projectId: this.selectProject,
        orgId: this.selectOrg,
        orgRefIds: ""
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
        }
      });
    },

    onResultChange(val) {
      this.show = val;
    },

    //获取项目列表
    getProjectList() {
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
            proName: "未关联",
            projectId: "",
            shortName: "",
            startTime: "",
            status: "",
            tranUserId: ""
          });

          this.selectProject = "";
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

    getNotBindOrgs() {
      let params = {
        projectId: this.selectProject
      };
      this.$api.getNotBindOrgs(params, {}).then(res => {
        if (res.resultMsg !== "查询成功") return false;
        this.organizationList = res.data;
      });
    },

    // 负责人获取日志设置项
    queryBuildLog() {
      this.$api
        .queryBuildLog({
          orgId: this.orgId
        })
        .then(res => {
          console.log(res);
          if (res.errorCode == "1") {
            res.data[0].itemJson.map(value => {
              value.edit = false;
            });
            res.data[0].groupJson.map(value => {
              value.edit = false;
            });
            this.logData = res.data;
            this.itemJson = res.data[0].itemJson;
            this.groupJson = res.data[0].groupJson;
            this.layerJson = res.data[0].layerJson;
            console.log(res.data[0].itemJson);
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
