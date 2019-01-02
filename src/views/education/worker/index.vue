<template>
  <div class="page-content-body">
    <div class="page-header clearfix">
      <el-form class="search-form" :inline="true" ref="form">
        <el-form-item label="组织：" label-width="55px">
          <el-select v-model="listQuery.orgId" placeholder="请选择" class="item-org" @change="handleOrgChange()">
            <el-option v-for="item in orgList" :key="item.orgId" :label="item.orgName" :value="item.orgId"></el-option>
          </el-select>
        </el-form-item>
        <div class="btn-group fr">
          <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加工人</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="importBatchDialogVisible = true">批量导入</el-button>
        </div>
      </el-form>
      <el-form ref="form" v-model="listQuery" size="mini">
        <el-row :gutter="24">
          <el-col :span="4">
            <el-form-item label="姓名：" label-width="55px">
              <el-input v-model="listQuery.name" placeholder="姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="手机：" label-width="55px">
              <el-input v-model="listQuery.tel" placeholder="电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="班组：" prop="groupId" label-width="55px">
              <el-select v-model="listQuery.groupId" placeholder="请选择">
                <el-option v-for="item in groupList" :key="item.groupId" :label="item.groupName" :value="item.groupId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="入场时间：" prop="EnterTime" label-width="90px">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="listQuery.startTime"
                :picker-options="pickerOptions0" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="退场时间：" prop="EnterTime" label-width="90px">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="listQuery.endTime"
                :picker-options="pickerOptions0" style="width: 100%;"></el-date-picker>
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

    <div class="page-main customTable">
      <el-table ref="multipleTable" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" :data="workerList">
        <el-table-column prop="name" label="姓名" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tel" label="手机号码" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="groupName" label="所在班组" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="startTime" label="入场时间" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="endTime" label="退场时间" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="isUsed" label="开通考学" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>
              <el-switch v-model="scope.row.isUsed === 'Y'" active-color="#13ce66" inactive-color="#ff4949" @change="switchChange(scope.row)"
                :disabled="scope.row.endTime != null"></el-switch>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.endTime === null" class="btn" title="编辑" @click="handleUpdate(scope.row)">
              <i class="iconfont icon-edit iconblue"></i>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页-->
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange" :current-page.sync="currentPage"
        :page-size="showCount" :total="total"></el-pagination>
    </div>

    <!-- 弹框 添加工人-->
    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="workerDialogVisible" width="35%" class="my-dialog">
      <div class="dialog-content">
        <div class="ui-form">
          <el-form ref="workerForm" :model="workerForm" label-width="100px">
            <el-form-item label="姓名" prop="name" :rules="rules.workername">
              <el-input v-model="workerForm.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="tel" :rules="rules.phone">
              <el-input v-model="workerForm.tel" :disabled="dialogStatus === 'update'"></el-input>
            </el-form-item>
            <el-form-item label="所在班组" prop="groupId" :rules="rules.grade">
              <el-select v-model="workerForm.groupId" placeholder="请选择" :disabled="dialogStatus === 'update'">
                <el-option v-for="item in addWorkerGroupList" :disabled="dialogStatus === 'update'" :key="item.groupId"
                  :label="item.groupName" :value="item.groupId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入场时间" prop="startTime" :rules="rules.startTime" v-if="dialogStatus === 'create'">
              <el-date-picker v-model="workerForm.startTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期" align="right" :picker-options="pickerOptions3"></el-date-picker>
            </el-form-item>
            <el-form-item label="入场时间" prop="startTime" :rules="rules.startTime" v-if="dialogStatus === 'update'">
              <span>{{workerForm.startTime}}</span>
            </el-form-item>
            <el-form-item label="退场时间" prop="endTime" v-if="dialogStatus === 'update'">
              <el-date-picker v-model="workerForm.endTime" type="datetime" @change="workerForm.isUsed='N'" format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" align="right" :picker-options="pickerOptions3"></el-date-picker>
            </el-form-item>
            <el-form-item label="开通考学" prop="isUsed">
              <el-radio v-model="workerForm.isUsed" label="Y" :disabled="workerForm.endTime!=''">开</el-radio>
              <el-radio v-model="workerForm.isUsed" label="N">关</el-radio>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" v-if="dialogStatus === 'create'" @click="createWorker()">提 交</el-button>
        <el-button type="primary" v-if="dialogStatus === 'update'" @click="updateWorker()">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 批量导入-->
    <el-dialog title="批量新增" :visible.sync="importBatchDialogVisible" size="tiny" class="my-dialog batchAddWorkerDialog">
      <div class="dialog-content">
        <el-form label-width="80" class="ui-form">
          <el-form-item prop="group_id" label="温馨提示">
            <p>1.工人信息需符合定义的模板格式，且文件大小不超过10M.</p>
            <p>2.请核对系统中组别的名称,若班组名称不正确,导入后班组为空,请导入后手动选择班组.</p>
          </el-form-item>
          <el-form-item prop="group_id" label="导入文件">
            <el-input disabled v-model="fileName"></el-input>
            <el-button size="small" type="primary" @click="handleUpload">浏览</el-button>
            <input id="FileSelect" type="file" name="file" ref="file" @change="handleFileChange" style="display:none">
            <span style="font-weight: bold;text-decoration:underline" @click="download" ref="download">下载模板文件</span>
            <span v-if="loading" class="loading">
              <i class="el-icon-loading"></i>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleImport">导入</el-button>
      </span>
    </el-dialog>

    <!-- 导入情况-->
    <el-dialog title="导入情况" :visible.sync="importBatchResDialogVisible" width="360px" size="tiny" class="my-dialog batchAddWorkerDialog"
      center>
      <div class="dialog-content">
        <div style="margin-left: 80px;">
          <span>成功 :</span>
          <span style="color:#2AB452;">
            {{addWorkerSuccessCount}}
            条
          </span>
        </div>
        <div style="margin-left: 80px;">
          <span>失败 :</span>
          <span style="color:#FF0000;">
            {{addWorkerFailCount}}
            条
          </span>
        </div>
        <div v-if="addWorkerFailCount > 0 " style="margin-left: 80px;">
          <a style="font-weight: bold;text-decoration:underline " name="download" @click="failDownloadReson()">点击下载失败原因</a>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importBatchResDialogVisible=false">完 成</el-button>
        <el-button type="primary" @click="importBatchResDialogVisible=false;importBatchDialogVisible=true">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "worker",
  data() {
    return {
      // 加载数据进度条
      loading: false,

      // 批量添加工人结果-成功个数
      addWorkerSuccessCount: 0,
      // 批量添加工人结果-失败个数
      addWorkerFailCount: 0,

      //一页显示几个
      showCount: 10,
      //当前是第几页
      currentPage: 1,
      //总共有几条记录
      total: 0,
      // 组织列表
      orgList: [],
      // 工人列表
      workerList: [],
      // 班组列表
      groupList: [],
      // 添加工人班组列表
      addWorkerGroupList: [],

      importBatchResDialogVisible: false,

      // 查询工人列表条件
      listQuery: {
        orgId: "",
        groupId: "",
        name: "",
        tel: "",
        isUsed: "",
        startTime: "",
        endTime: "",
        showCount: 10,
        currentPage: 1
      },

      // 新建或修改工人信息表单
      workerForm: {
        orgId: "",
        groupId: "",
        name: "",
        tel: "",
        isUsed: "Y",
        groupLeader: "N",
        companyId: "",
        startTime: "",
        workerId: "",
        endTime: ""
      },

      // 限制结束时间不能大于开始时间
      pickerOptions0: {
        disabledDate: time => {
          let endDateVal = this.listQuery.endTime;
          if (endDateVal != "") {
            return time.getTime() > Date.now() || time.getTime() > endDateVal;
          } else {
            return time.getTime() > Date.now();
          }
        }
      },

      pickerOptions1: {
        disabledDate: time => {
          let beginDateVal = this.listQuery.startTime;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },

      pickerOptions3: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },

      errorKey: "",
      total: 0,
      titleMap: {
        update: "修改工人",
        create: "添加工人"
      },
      dialogStatus: "",
      workerDialogVisible: false,

      radio: "Y",
      rules: {
        workername: [
          {
            required: true,
            trigger: "blur",
            message: "请输入姓名！"
          }
        ],
        phone: [
          {
            required: true,
            trigger: "blur",
            pattern: /^1[3|4|5|7|8][0-9]{9}$/,
            message: "请输入正确的电话格式！"
          }
        ],
        grade: [{ required: true, message: "请选择班组", trigger: "blur" }],
        startTime: [
          { required: true, message: "请选择入场时间", trigger: "blur" }
        ]
      },
      // 批量导入
      importBatchDialogVisible: false,
      fileName: "",
      file: "",
      loading: false,
      batchAddDisable: false, // 批量录入用户确定按钮是否可用
      progress: {
        // 上传进度条模拟
        show: false, // 是否显示进度条
        textInside: true, // 文字是否显示在进度条中
        strokeWidth: 18, // 进度条宽度
        percentage: 0, // 百分比
        status: "success" // 状态
      },
      progressDialogVisible: false, // 进度条遮罩
      playProgressTimer: ""
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
          this.listQuery.orgId = this.orgList[0].orgId;
          this.loading = false;
          this.getGroupList();
        } else {
          this.$message.error(res.resultMsg);
        }
        this.createExamDialogVisible = false;
        this.isEdit = false;
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
        updateBy: null
      };

      this.$api
        .getExamgroupList({
          orgId: this.listQuery.orgId
        })
        .then(res => {
          if (res.errorCode === "1") {
            var j = 0;

            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].isDeleted === "N") {
                this.addWorkerGroupList[j] = res.data[i];
                this.groupList[j + 1] = res.data[i];
                j++;
              }
            }
            this.getWorkerList();
          } else {
            this.$message.error(res.resultMsg);
          }
        });
    },

    // 获取工人列表
    getWorkerList() {
      this.$api.workerList(this.listQuery).then(res => {
        if (res.errorCode === "1") {
          this.workerList = res.data;
          this.showCount = res.pageSize;
          this.currentPage = res.currentPage;
          this.total = res.totalRecords;
        } else {
          this.$message.error(res.resultMsg);
        }
      });
    },

    // 新增工人提交
    createWorker() {
      this.workerForm.orgId = this.listQuery.orgId;
      this.$refs.workerForm.validate(valid => {
        if (valid) {
          delete this.workerForm.workerId;
          this.$api.workerAdd(this.workerForm).then(response => {
            if (response.errorCode === "1") {
              this.getWorkerList();
              this.$message.success("添加工人成功！");
              this.workerDialogVisible = false;
            } else {
              this.$message.warning(response.resultMsg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 编辑工人提交
    updateWorker(data) {
      this.$refs.workerForm.validate(valid => {
        if (valid) {
          this.$api
            .workerUpdate(this.workerForm)
            .then(response => {
              if (response.errorCode === "1") {
                this.getWorkerList();
                this.$message.success("修改工人信息成功！");
                this.workerDialogVisible = false;
              } else {
                this.$message.warning(response.resultMsg);
              }
            })
            .catch(error => {
              this.$message.error(error);
            });
        } else {
          return false;
        }
      });
    },

    switchChange(data) {
      this.workerForm["orgId"] = data.orgId;
      this.workerForm["groupId"] = data.groupId;
      this.workerForm["name"] = data.name;
      this.workerForm["tel"] = data.tel;
      this.workerForm["isUsed"] = data.isUsed === "Y" ? "N" : "Y";
      this.workerForm["groupLeader"] = data.groupLeader;
      this.workerForm["companyId"] = data.companyId;
      this.workerForm["workerId"] = data.workerId;
      this.workerForm["startTime"] = data.startTime;

      this.$api
        .workerUpdate(this.workerForm)
        .then(response => {
          if (response.errorCode === "1") {
            this.getWorkerList();
          } else {
            this.$message.warning(response.resultMsg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },

    // 响应搜索按钮事件
    handleSearch() {
      this.getWorkerList();
    },

    // 响应组织改变事件
    handleOrgChange() {
      this.getWorkerList();
      this.getGroupList();
    },

    // 分页
    handlePageChange(val) {
      this.listQuery.currentPage = val;
      this.getWorkerList();
    },

    // 关闭弹窗
    handleClose() {
      this.workerDialogVisible = false;
    },

    // 新增弹窗
    handleCreate() {
      this.dialogStatus = "create";
      this.workerDialogVisible = true;
      this.$nextTick(_ => {
        this.$refs.workerForm.resetFields();
      });
    },
    // 编辑弹窗
    handleUpdate(data) {
      this.dialogStatus = "update";
      this.workerDialogVisible = true;
      this.$nextTick(_ => {
        this.$refs.workerForm.resetFields();
        this.workerForm["orgId"] = data.orgId;
        this.workerForm["groupId"] = data.groupId;
        this.workerForm["name"] = data.name;
        this.workerForm["tel"] = data.tel;
        this.workerForm["isUsed"] = data.isUsed;
        this.workerForm["groupLeader"] = data.groupLeader;
        this.workerForm["companyId"] = data.companyId;
        this.workerForm["workerId"] = data.workerId;
        this.workerForm["startTime"] = data.startTime;
      });
    },

    downloadFile(url) {
      try {
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
      } catch (e) {}
    },

    // 下载模板文件
    download() {
      this.$api
        .workerTempFile({ orgId: this.listQuery.orgId })
        .then(response => {
          if (response.errorCode === "1") {
            this.downloadFile(response.data[0].tempPath);
          } else {
            this.$message.warning(response.resultMsg);
          }
        });
    },

    // 选中上传文件窗口
    handleUpload() {
      this.$refs.file.value = ""; // 解决重复点击上传的BUG
      this.$refs.file.click();
    },

    // 已选中文件的处理
    handleFileChange(e) {
      let file = e.target.files[0];
      this.fileName = file.name;
      this.file = file;
    },

    // 导入结果
    UpdateResult(val) {
      this.$api.workerDownload({ errorKey: val }).then(response => {
        if (response.errorCode === "1") {
        } else {
          this.$message.warning(response.resultMsg);
        }
      });
    },

    failDownloadReson() {
      let strUrl =
        this.baseURL() +
        "/jianzhumobile/mobile/eduWorker/workerDownload.do?" +
        "accessToken=" +
        localStorage.getItem("accessToken") +
        "&token=" +
        this.getToken() +
        "&errorKey=" +
        this.errorKey;

      let xhr = new XMLHttpRequest();
      let fileName = "添加结果.xls"; // 文件名称
      xhr.open("post", strUrl, true);
      xhr.responseType = "arraybuffer";

      xhr.onload = function() {
        if (this.status === 200) {
          let type = xhr.getResponseHeader("Content-Type");

          let blob = new Blob([this.response], { type: type });
          if (typeof window.navigator.msSaveBlob !== "undefined") {
            /*
             * IE workaround for "HTML7007: One or more blob URLs were revoked by closing
             * the blob for which they were created. These URLs will no longer resolve as
             * the data backing the URL has been freed."
             */
            window.navigator.msSaveBlob(blob, fileName);
          } else {
            let URL = window.URL || window.webkitURL;
            let objectUrl = URL.createObjectURL(blob);
            if (fileName) {
              var a = document.createElement("a");
              // safari doesn't support this yet
              if (typeof a.download === "undefined") {
                window.location = objectUrl;
              } else {
                a.href = objectUrl;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
              }
            } else {
              window.location = objectUrl;
            }
          }
        }
      };
      xhr.send();
    },

    // 文件导入
    handleImport() {
      if (this.fileName === "") {
        this.$message.warning("请先选取需要导入的文档");
        return;
      } else {
        console.log("this.file.size   " + this.file.size);
        //判断文件大小10485760 10M
        if (this.file.size < 10485760) {
          var formData = new FormData();
          formData.append("file", this.file);
          formData.append("token", this.getToken());
          formData.append("groupId", this.listQuery.groupId);
          formData.append("orgId", this.listQuery.orgId);
          formData.append("accessToken", localStorage.getItem("accessToken"));
          axios({
            url:
              this.baseURL() +
              "/jianzhumobile/mobile/eduWorker/workerUpload.do",
            method: "post",
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
            .then(res => {
              if (res.data.errorCode === "1") {
                // 批量添加工人结果-成功个数
                this.addWorkerSuccessCount = res.data.data[0].succCount;
                // 批量添加工人结果-失败个数
                this.addWorkerFailCount = res.data.data[0].errorCount;
                this.errorKey = res.data.data[0].errorKey;
                this.importBatchResDialogVisible = true;
                this.importBatchDialogVisible = false;
                this.fileName = "";
                this.getWorkerList();
              } else {
                this.$message({
                  message: "操作失败，请重试！！！",
                  type: "warning"
                });
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          this.$message({
            message: "附件大于10MB, 不给上传！！！",
            type: "warning"
          });
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.batchAddWorkerDialog p {
  line-height: 30px;
}
</style>