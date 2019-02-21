<template>
  <div class="page-content-body">
    <div class="page-header clearfix">
      <el-form ref="form" v-model="listMeetingQuery" size="mini">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="会议名称：" label-width="90px">
              <el-input v-model="listMeetingQuery.meetingTitle" placeholder="会议名称" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会议开始时间：" label-width="120px">
              <el-date-picker align="right" unlink-panels v-model="meetingTimeRange" type="daterange" start-placeholder="开始时间"
                end-placeholder="结束时间" range-separator="-" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"
                style="width: 100%;" :picker-options="pickerOptions2" :default-time="['00:00:00', '23:59:59']" @change="timeRangeChange"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form ref="form" v-model="listMeetingQuery" size="mini">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="主持人：" label-width="90px">
              <el-input v-model="listMeetingQuery.holder" placeholder="主持人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参加人：" label-width="90px">
              <el-select v-model="tmpAttendType" multiple filterable allow-create default-first-option placeholder="请选择参与人"
                style="width: 100%;" @change="selectedChange">
                <el-option v-for="item in meetingAttendType" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="通知状态：" label-width="90px">
              <el-select v-model="listMeetingQuery.noticeType" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in meetingMsgStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form ref="form" v-model="listMeetingQuery" size="mini">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="取消状态：" label-width="90px">
              <el-select v-model="listMeetingQuery.stateType" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in meetingStateType" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button type="primary" @click="handleNewOne">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="page-main customTable">
      <el-table ref="multipleTable" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" :data="meetingListCurrent">
        <el-table-column prop="noticeType" label="通知状态" min-width="60" show-overflow-tooltip></el-table-column>
        <el-table-column prop="meetingTitle" label="会议名称" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="holders" label="主持人" min-width="60" show-overflow-tooltip></el-table-column>
        <el-table-column prop="meetingBeginTime" label="会议开始时间" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="totalNum" label="参会人数" min-width="60" show-overflow-tooltip></el-table-column>
        <el-table-column prop="readNum" label="已读人数" min-width="60" show-overflow-tooltip></el-table-column>
        <el-table-column prop="stateType" label="取消状态" min-width="60" show-overflow-tooltip></el-table-column>
        <el-table-column prop="attendType" label="参加人" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="scope">
            <span class="btn" title="查看" @click="documentDetails(scope.row)">
              <i class="iconfont icon-view iconblue"></i>
            </span>
            <span v-show="scope.row.isEdit === 'Y'" class="btn" title="编辑" @click="handleUpdate(scope.row)">
              <i class="iconfont icon-edit iconblue"></i>
            </span>
            <span v-show="scope.row.isEdit === 'Y'">
              <el-switch v-model="scope.row.meetingState === '0'" active-color="#13ce66" inactive-color="#ff4949"
                @change="switchChange(scope.row)" size="mini"></el-switch>
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

    <!-- 新增会议通知弹框-->
    <el-dialog title="新增会议通知" :visible.sync="addNewMeetingDialogVisible" width="70%" class="my-dialog my-library-view-dialog"
      center>
      <div style="margin: 60px 60px 20px 60px">
        <div class="ui-form">
          <el-form ref="form" :model="addNewMeeting" size="mini">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="会议名称：" label-width="90px">
                  <el-input v-model="addNewMeeting.meetingTitle"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="14">
                <el-form-item label="开始时间：" label-width="90px">
                  <el-date-picker style="width: 100%;" v-model="meetingBeginDay" placeholder="选择日期" type="date"
                    format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item>
                  <el-time-picker style="width: 100%;" v-model="meetingBeginDate" placeholder="选择时间" format="HH:mm" value-format="HH:mm"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="14">
                <el-form-item label="结束时间：" label-width="90px">
                  <el-date-picker style="width: 100%;" v-model="meetingEndDay"  placeholder="选择日期" type="date"
                    format="yyyy-MM-dd"  value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item>
                  <el-time-picker style="width: 100%;" v-model="meetingEndDate" placeholder="选择时间" format="HH:mm" value-format="HH:mm"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="会议地点：" label-width="90px">
                  <el-input v-model="addNewMeeting.meetingPlace"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="主持人：" label-width="90px">
                  <el-tag size="small" :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                    @close="handleTagClose(tag)">{{tag}}</el-tag>
                  <el-button class="button-new-tag" size="small" @click="showInput">+主持人</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="会议议程：" label-width="90px">
                  <el-input v-model="addNewMeeting.meetingContent" type="textarea" :autosize="{ minRows: 2, maxRows: 10}"
                    placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <!-- <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="添加附件：" label-width="90px">
                  <input id="FileSelect" type="file" @change="getFile($event)" style="display:none">
                  <el-button @click="buttonGetFile">添加附件</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item>
                  <ul>
                    <li v-for="item in itemJson" :key="item.index" :label="item.fileName" :value="item.fileName">
                      <div>
                        {{item.fileName}}
                        <el-button class="my_button" icon="el-icon-delete" @click="delBuildItem(item)" round></el-button>
                      </div>
                    </li>
                  </ul>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="14">
                <el-form-item label="参会人：" label-width="90px">
                  <el-button style="width: 100%;" @click="fileUploadDialogVisible = false">选择组织内参会人</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item>
                  <el-button style="width: 100%;" @click="onfileUploadSubmit">选择组织外参会人</el-button>
                </el-form-item>
              </el-col>
            </el-row> -->
            <!-- <el-row>
              <el-col :span="24">
                <el-form-item>
                  <ul>
                    <li v-for="item in itemJson" :key="item.index" :label="item.fileName" :value="item.fileName">
                      <div>
                        {{item.fileName}}
                        <el-button class="my_button" icon="el-icon-delete" @click="delBuildItem(item)" round></el-button>
                      </div>
                    </li>
                  </ul>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item>
                  <ul>
                    <li v-for="item in itemJson" :key="item.index" :label="item.fileName" :value="item.fileName">
                      <div>
                        {{item.fileName}}
                        <el-button class="my_button" icon="el-icon-delete" @click="delBuildItem(item)" round></el-button>
                      </div>
                    </li>
                  </ul>
                </el-form-item>
              </el-col>
            </el-row> -->
          </el-form>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "meetingCurrent",
    data() {
      return {
        // 加载数据进度条
        loading: false,
        //一页显示几个
        showCount: 10,
        //当前是第几页
        currentPage: 1,
        //总共有几条记录
        total: 0,

        // 查询会议通知列表条件
        listMeetingQuery: {
          meetingTitle: "",
          meetingPlace: "",
          holder: "",
          beginTime: "",
          endTime: "",
          noticeType: "",
          stateType: "",
          attendType: "",
          operateType: 0,
          currentPage: 1,
          showCount: 10
        },

        //暂时用来存储临时数据
        tmpAttendType: "",

        // 会议通知时间段
        meetingTimeRange: "",

        //当前会议列表
        meetingListCurrent: [],

        // 会议通知消息读取状态
        meetingMsgStatus: [{
            value: "",
            label: "全部"
          },
          {
            value: "1",
            label: "未读"
          },
          {
            value: "2",
            label: "已读"
          },
          {
            value: "3",
            label: "其他"
          }
        ],

        // 会议通知状态
        meetingStateType: [{
            value: "",
            label: "全部"
          },
          {
            value: "1",
            label: "正常"
          },
          {
            value: "2",
            label: "取消"
          }
        ],

        // 会议参加人员级别
        meetingAttendType: [{
            value: "",
            label: "全部"
          },
          {
            value: "1",
            label: "我参加的"
          },
          {
            value: "2",
            label: "我下一级"
          },
          {
            value: "3",
            label: "我下两级"
          }
        ],

        // 添加新会议弹框开关
        addNewMeetingDialogVisible: false,

        meetingBeginDay: "",
        meetingBeginDate: "",
        meetingEndDay: "",
        meetingEndDate: "",

        // 添加新会议模型
        addNewMeeting: {
          meetingTitle: "",
          meetingPlace: "",
          meetingBeginTime: "",
          meetingEndTime: "",
          meetingContent: ""
        },

        dynamicTags: ["标签一", "标签二", "标签三"],
        inputVisible: false,
        inputValue: "",

        EditLawType: ["上海", "北京", "广州", "深圳"],

        checkedLawType: [], //选择的文档类型
        /**new add start*/
        isIndeterminate: false,

        endTimeRange: "",

        startTimeRange: "",

        // 批量添加工人结果-成功个数
        addWorkerSuccessCount: 0,
        // 批量添加工人结果-失败个数
        addWorkerFailCount: 0,

        importBatchResDialogVisible: false,

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

        pickerOptions2: {
          shortcuts: [{
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },

        pickerOptions3: {
          shortcuts: [{
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

        dialogStatus: "",
        workerDialogVisible: false,

        radio: "Y",

        // 批量导入
        importBatchDialogVisible: false,
        fileName: "",
        file: "",

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

    mounted() {
      this.currentMeetingList();
    },

    methods: {
      // 处理查询会议开始时间范围变动事件
      timeRangeChange() {
        if (JSON.stringify(this.meetingTimeRange).length > 4) {
          this.listMeetingQuery.beginTime = this.meetingTimeRange[0];
          this.listMeetingQuery.endTime = this.meetingTimeRange[1];
        } else {
          this.listMeetingQuery.beginTime = "";
          this.listMeetingQuery.endTime = "";
        }
      },

      // 获取会议列表
      currentMeetingList() {
        this.$api.meetingList(this.listMeetingQuery).then(res => {
          if (res.errorCode === "1") {
            this.meetingListCurrent = res.data;
            this.showCount = res.pageSize;
            this.currentPage = res.currentPage;
            this.total = res.totalRecords;
          } else {
            this.$message.error(res.resultMsg);
          }
        });
      },

      // 响应搜索按钮事件
      handleSearch() {
        this.currentMeetingList();
      },

      // 添加新会议
      handleNewOne() {
        this.addNewMeetingDialogVisible = true;
      },

      selectedChange(val) {
        if (val[val.length - 1] == "") {
          val.length = 1;
          val[0] = "";
        }

        if (val.length == "2") {
          var tmpVal = val[1];
          if (val[0] == "") {
            val.length = 1;
            val[0] = tmpVal;
          }
        }

        if (val.length == "1" && val[0] == "") {
          this.listMeetingQuery.attendType = "";
        } else {
          this.listMeetingQuery.attendType = "[" + val.toString() + "]";
        }

        return;
      },

      handleTagClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = "";
      },

      startTimeUpdate() {
        if (JSON.stringify(this.startTimeRange).length > 4) {
          this.listQuery.startLastTime = this.startTimeRange[1];
          this.listQuery.startTime = this.startTimeRange[0];
        } else {
          this.listQuery.startLastTime = "";
          this.listQuery.startTime = "";
        }
      },

      //选中文档类型
      handleCheckedLawTypeChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.lawType.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.lawType.length;
        // this.saveProjectLawAttr.typeIdAttrs = value;
      },

      endTimeUpdate() {
        if (JSON.stringify(this.endTimeRange).length > 4) {
          this.listQuery.endLastTime = this.endTimeRange[1];
          this.listQuery.endTime = this.endTimeRange[0];
        } else {
          this.listQuery.endLastTime = "";
          this.listQuery.endTime = "";
        }
      },

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
          .workerTempFile({
            orgId: this.listQuery.orgId
          })
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
        this.$api
          .workerDownload({
            errorKey: val
          })
          .then(response => {
            if (response.errorCode === "1") {} else {
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

        xhr.onload = function () {
          if (this.status === 200) {
            let type = xhr.getResponseHeader("Content-Type");

            let blob = new Blob([this.response], {
              type: type
            });
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
          //判断文件大小10485760 10M
          if (this.file.size < 10485760) {
            var formData = new FormData();
            formData.append("file", this.file);
            formData.append("token", this.getToken());
            formData.append("groupId", this.listQuery.groupId);
            formData.append("orgId", this.listQuery.orgId);
            formData.append("accessToken", localStorage.getItem("accessToken"));
            axios({
                url: this.baseURL() +
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
              .catch(function (err) {});
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

  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>