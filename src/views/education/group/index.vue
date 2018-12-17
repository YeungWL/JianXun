<template>
  <div class="page-content-body" v-loading="loading" element-loading-text="拼命加载中">
    <div class="page-header clearfix">
      <el-form class="search-form" :inline="true" ref="form">
        <el-form-item label="组织：">
          <el-select v-model="selectOrgID" placeholder="请选择" class="item-org" @change="UpdateOrgList">
            <el-option v-for="item in orgList" :key="item.orgId" :label="item.orgName"
            :value="item.orgId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前关联的公司：">
          <div>{{companyName}}</div>
        </el-form-item>
        <div class="btn-group fr">
          <el-button type="primary"  @click="handleRelateCompany">{{ isRelate==true? '解除关联' : '关联公司' }}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleAddGroup">添加班组 </el-button>
        </div>
      </el-form>
    </div>
    <!-- table开始 -->
    <div class="page-main customTable">
      <el-table ref="multipleTable" style="width: 100%" :data="groupList">
        <el-table-column prop="groupName" label="班组名称" min-width="200" show-overflow-tooltip="">
        </el-table-column>
        <el-table-column prop="groupLeader" label="班组长" min-width="80" show-overflow-tooltip="">
        </el-table-column>
        <el-table-column prop="leaderPhone" label="组长电话" min-width="120" show-overflow-tooltip="">
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="180" show-overflow-tooltip="">
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="scope">
            <span class="btn" title="编辑" @click="handleUpdate(scope.row)">
              <i class="iconfont icon-edit iconblue"></i>
            </span>
            <span class="btn" @click="handelDelete(scope.row)" title="删除">
              <i class="iconfont icon-del iconred"></i>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页-->
    <div class="pagination">
      <el-pagination background="" layout="total, prev, pager, next" @current-change="handlePageChange"
      :current-page.sync="currentPage" :page-size="showCount" :total="total">
      </el-pagination>
    </div>

    <!-- 添加班组 -->
    <el-dialog :title="isEdit?'修改班组':'添加班组'" :visible.sync="AddGroupDialogVisible"
    width="380px" center>
      <el-form class="" :inline="true" :model="createGroup" ref="createGroup">

        <el-form-item label="班组名称:" prop="groupName" label-width="85px"  v-if="isEdit === false">
          <el-input placeholder="" v-model="createGroup.groupName" clearable>
          </el-input>
        </el-form-item>

        <el-form-item label="班组名称:"  prop="groupName"  label-width="85px" :rules="rules.grade"  v-if="isEdit === true">
          <span>{{createGroup.groupName}}</span>
        </el-form-item>

        <el-form-item label="班组长:" label-width="85px" prop="groupLeader" :rules="rules.groupLeader">
          <el-input placeholder="" v-model="createGroup.groupLeader" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="组长电话:" label-width="85px" prop="leaderPhone" :rules="rules.phone">
          <el-input placeholder="" v-model="createGroup.leaderPhone" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="备注:" label-width="85px">
          <el-input placeholder="" v-model="createGroup.remark" clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCreateGroup">
          {{ isEdit? '修改' : '添加' }}
        </el-button>
      </span>
    </el-dialog>

    <!-- 关联公司 -->
    <el-dialog title="关联公司" :visible.sync="relateCompanyDialogVisible" width="360px" center>
      <el-form class="" :inline="true" ref="form">
        <el-form-item label="公司名称:" label-width="80px">
          <el-select v-model="newCompanyName"  filterable="" remote="" allow-create="" reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" >
            <el-option v-for="item in companyList" :key="item.companyId" :label="item.companyName" :value="item.companyName">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer"> 
        <el-button @click="bulidRelateCompany">
         关联
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "groupManage",
  data() {
    return {

      rules: {
        phone: [
          {
            required: true,
            trigger: "blur",
            pattern: /^1[3|4|5|7|8|9][0-9]{9}$/,
            message: "请输入正确的电话格式！"
          }
        ],
        groupLeader: [{ required: true, message: "请填写班组组长名字", trigger: "blur" }],
        grade: [{ required: true, message: "请填写班组名称", trigger: "blur" }],
      },

      isEdit: false,
      loading: true,
      isRelate: false,
      // 添加班组接口弹框开关
      AddGroupDialogVisible: false,
      relateCompanyDialogVisible: false,

      //组织列表
      orgList: [],
      //班组列表
      groupList: [],

      companyList: [],
      //当前选择的组织ID
      selectOrgID: "",
      // 公司名称
      companyName: "无",
      companyId: "",
      newCompanyName: "",
      //一页显示几个
      showCount: 10,
      //当前是第几页
      currentPage: 1,
      //总共有几条记录
      total: 0,
      //创建班组
      createGroup: {
        orgId: "",
        companyId: "",
        groupName: "",
        groupLeader: "",
        leaderPhone: "",
        remark: "",
        groupId: ""
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
          this.getGroupList();
          this.getOrgBindCompany();
        } else {
          this.$message.error(res.message);
        }
        this.createExamDialogVisible = false;
        this.isEdit = false;
      });
    },

    // 处理关联公司按钮事件
    handleRelateCompany() {
      if (this.isRelate === false) {
        this.relateCompanyDialogVisible = true;
      } else {
        this.unbindCompany();
      }
    },

    remoteMethod(query) {

      if (query !== "") {
      this.newCompanyName = query;
        setTimeout(() => {
          this.$api
            .companyList({
              companyName: query
            })
            .then(res => {

              if (res.errorCode === "1") {
                this.companyList = res.data;

                
              } else {
                this.$message.error(res.message);
              }
            });
        }, 1000);
      } else {
        this.companyList = {};
        this.newCompanyName = query;
      }
    },

    bulidRelateCompany() {
      this.$api
        .bindCompany({
          orgId: this.selectOrgID,
          companyName: this.newCompanyName
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.getGroupList();
            if(this.newCompanyName.length === 0) {
              this.companyName = "无";

            } else {
            this.companyName = this.newCompanyName;
            }
            this.relateCompanyDialogVisible = false;
            this.getOrgBindCompany();
            this.$message({
              message: "修改公司成功",
              type: "success"
            });
          } else {
            this.$message.error(res.resultMsg);
          }
        });
    },

    // 处理添加班组按钮事件
    handleAddGroup() {
      this.createGroup.groupId = "";
      this.createGroup.companyId = "";
      this.createGroup.groupName = "";
      this.createGroup.groupLeader = "";
      this.createGroup.leaderPhone = "";
      this.createGroup.remark = "";
      this.AddGroupDialogVisible = true;
      this.isEdit = false;
    },

    // 修改班组信息
    handleUpdate(val) {
      this.AddGroupDialogVisible = true;
      this.isEdit = true;
      this.createGroup.groupId = val.groupId;
      this.createGroup.companyId = val.companyId;
      this.createGroup.groupName = val.groupName;
      this.createGroup.groupLeader = val.groupLeader;
      this.createGroup.leaderPhone = val.leaderPhone;
      this.createGroup.remark = val.remark;
    },

    // 删除班组
    handelDelete(val) {
      this.$confirm("确定删除该班组吗？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "返回",
        type: "warning"
      })
        .then(() => {
          this.$api
            .eduGroupDelete({
              groupId: val.groupId
            })
            .then(res => {
              if (res.errorCode === "1") {
                this.getGroupList();
                this.groupList = res.data;
                this.showCount = res.pageSize;
                this.currentPage = res.currentPage;
                this.total = res.totalRecords;
              } else {
                this.$message.error(res.resultMsg);
              }
            });
        })
        .catch(() => {
          this.getGroupList();
        });
    },

    //处理table列表转换
    handlePageChange() {
      this.getGroupList();
    },

    // 获取班组列表
    getGroupList() {
      this.$api
        .eduGroupGetList({
          orgId: this.selectOrgID,
          showCount: this.showCount,
          currentPage: this.currentPage
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.getOrgBindCompany();

            this.groupList = res.data;
            this.showCount = res.pageSize;
            this.currentPage = res.currentPage;
            this.total = res.totalRecords;
          } else {
            this.$message.error(res.resultMsg);
          }
        });
    },

    // 获取班组列表
    getOrgBindCompany() {
      this.$api
        .getOrgBindCompany({
          orgId: this.selectOrgID
        })
        .then(res => {
          if (res.errorCode === "1") {
            if (res.data.length > 0) {

              
              this.companyName = res.data[0].companyName;
              this.companyId = res.data[0].companyId;
              console.log("this.companyName" + this.companyName);
              if (this.companyName.length === 0) {
                this.companyName ="无";
                this.isRelate = false;
              } else {
                this.isRelate = true;
              }
            }else {
              this.companyName="无";
            }

          } else {

            this.$message.error(res.resultMsg);
          }
        });
    },

    unbindCompany() {
      this.$confirm("确定解除关联？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .unbindCompany({
              orgId: this.selectOrgID,
              companyId: this.companyId
            })
            .then(res => {
              if (res.errorCode === "1") {
                this.companyName = "无";
                this.isRelate = false;
              } else {
                this.$message.error(res.resultMsg);
              }
            });
        })
        .catch(() => {
          this.getGroupList();
        });
    },

    // 创建班组响应事件
    handleCreateGroup() {


      this.$refs.createGroup.validate(valid => {
        if (valid) {
      if (this.isEdit === false) {
        this.$api
          .eduGroupAdd({
            orgId: this.selectOrgID,
            companyId: this.createGroup.companyId,
            groupName: this.createGroup.groupName,
            groupLeader: this.createGroup.groupLeader,
            leaderPhone: this.createGroup.leaderPhone,
            remark: this.createGroup.remark
          })
          .then(res => {
            if (res.errorCode === "1") {
              this.AddGroupDialogVisible = false;
              this.$confirm("添加成功.", "提示", {
                confirmButtonText: "继续添加",
                cancelButtonText: "返回",
                type: "warning"
              })
                .then(() => {
                  this.createGroup.groupName = "";
                  this.createGroup.groupLeader = "";
                  this.createGroup.leaderPhone = "";
                  this.createGroup.remark = "";
                  this.getGroupList();
                  this.AddGroupDialogVisible = true;
                })
                .catch(() => {
                  this.getGroupList();
                });
            } else {
              this.$message.error(res.resultMsg);
            }
          });
      } else {
        this.$api
          .eduGroupUpdate({
            orgId: this.selectOrgID,
            companyId: this.createGroup.companyId,
            groupId: this.createGroup.groupId,
            groupLeader: this.createGroup.groupLeader,
            leaderPhone: this.createGroup.leaderPhone,
            remark: this.createGroup.remark
          })
          .then(res => {
            if (res.errorCode === "1") {
              this.AddGroupDialogVisible = false;
              this.getGroupList();
              this.$message({
                message: "修改成功",
                type: "success"
              });
            } else {
              this.$message.error(res.resultMsg);
            }
          });
      }
        } else {
          return false;
        }
      });



    },
    // 响应组织切换事件
    UpdateOrgList() {
      this.getGroupList();
    }
  }
};
</script>

<style lang="scss" scoped="">
</style>