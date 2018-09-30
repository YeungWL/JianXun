<template>
  <div class="organizationManage page-content-body">
    <div class="organizationManage_header">
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="组织编码">
          <el-input placeholder="请输入组织编码" v-model="listQuery.orgCode" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="组织创建人">
          <el-input placeholder="请输入组织创建人" v-model="listQuery.creator"></el-input>
        </el-form-item>
        <el-form-item label="组织负责人">
          <el-input placeholder="请输入组织负责人" v-model="listQuery.orgPrincipal"></el-input>
        </el-form-item>
        <el-form-item label="组织名称">
          <el-input placeholder="请输入组织名称" v-model="listQuery.orgName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getOrgsList">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="createDialog = true">创建组织</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="organizationManage_table page-main customTable">
      <el-table :data="orgList" style="width:100%">
        <el-table-column prop="orgCode" label="组织编码" min-width="150">
        </el-table-column>
        <el-table-column prop="orgName" label="组织名称" min-width="150">
        </el-table-column>
        <el-table-column prop="creator" label="组织创建人" min-width="150">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="150">
        </el-table-column>
        <el-table-column prop="createTime" label="修改时间" min-width="150">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="updateShow(scope.row)" :disabled="scope.row.isFreeze == 1">修改</el-button>
            <el-button size="mini" type="danger" @click="deleteByOrg(scope.row.projectOrgId)" :disabled="scope.row.isFreeze == 1">删除</el-button>
            <!-- <el-button size="mini" @click="freezeOrRecoverOrg(scope.row)">{{scope.row.isFreeze == 0? '冻结':'解冻'}}</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <ui-pagination :total="total" @change="getPages"></ui-pagination>

    <!-- 创建组织对话框 -->
    <el-dialog title="创建组织"
               class="my-dialog"
               :visible.sync="createDialog"
               :before-close="handleAddClose"
               width="30%">
      <div class="dialog-content">
        <el-form ref="createForm" :model="createForm" label-width="80px">
          <el-form-item label="组织名称" prop="orgName">
            <el-input v-model="createForm.orgName"></el-input>
          </el-form-item>
          <el-form-item label="组织简称" prop="orgShort">
            <el-input v-model="createForm.orgShort"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size='small' @click="handleAddClose">取 消</el-button>
        <el-button type="primary" @click="addOrgItem">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改组织对话框 -->
    <el-dialog title="修改组织"
               class="my-dialog"
               :visible.sync="updateDialog"
               :before-close="handleUpdateClose"
               width="30%">
      <div class="dialog-content">
        <el-form ref="updateForm" :model="updateForm" label-width="80px">
          <el-form-item label="组织名称" prop="orgName">
            <el-input v-model="updateForm.orgName"></el-input>
          </el-form-item>
          <el-form-item label="组织简称" prop="orgShort">
            <el-input v-model="updateForm.orgShort"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size='small' @click="handleUpdateClose">取 消</el-button>
        <el-button type="primary" @click="updateByOrg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "organizationManage",
  data() {
    return {
      listQuery: {
        creator: "",
        orgCode: "",
        orgName: "",
        orgPrincipal: "",
        currentPage: 1, //页码: 1,    
        pageSize: 10,//页面条数
      },
      total: 0,
      updateDialog: false, // 修改组织对话框
      updateForm: {},
      createDialog: false, // 创建组织对话框
      createForm: {
        orgName: '',
        orgShort: ''
      },
      orgList: []
    };
  },
  methods: {
    // 获取组织管理列表
    getOrgsList() {
      this.$api.getOrgsList(this.listQuery).then(response => {
        if(response.errorCode === '1') {
          this.orgList = response.data
          this.total = response.totalRecords
        }else {
          this.$message.warning(response.resultMsg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    // 分页
    getPages(currentPage, pageSize) {
      this.listQuery.currentPage = currentPage
      this.listQuery.pageSize = pageSize
      this.getOrgsList()
    },
    handlePageChange(val){
      this.listQuery.currentPage = val;
      this.getOrgsList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getOrgsList()
    }, 
    // 新增组织
    addOrgItem() {
      if(this.createForm.orgName == '' || this.createForm.orgShort == '') {
        this.$message.warning('请输入组织名称或组织简称')
        return
      }
      this.$api.addOrg(this.createForm).then(response => {
        let $this = this
        if(response.errorCode === '1') {
          this.$refs.createForm.resetFields()
          this.createDialog = false
          this.getOrgsList()
          this.$notify({
            title: '成功',
            message: '恭喜！'+response.data[0].orgName+'项目创建成功，项目编码为'+response.data[0].orgCode+'。(点击再创建项目)',
            type: 'success',
            duration: 0,
            offset: 80,
            onClick: function() {
              $this.createDialog = true
            }
          })
        }else {
          this.$message.warning(response.resultMsg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    // 关闭新增弹窗事件
    handleAddClose() {
      this.createDialog = false
      this.$refs.createForm.resetFields()
    },
    // 表格修改按钮事件
    updateShow(data) {
      this.updateForm = data
      this.updateDialog = true
    },
    // 关闭修改弹窗事件
    handleUpdateClose() {
      this.updateDialog = false
      this.$refs.updateForm.resetFields()
    },
    // 提交修改组织
    updateByOrg() {
      this.$confirm('此操作将修改该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        if(this.updateForm.orgName == '' || this.updateForm.orgShort == '') {
          this.$message.warning('组织名称或组织简称不能为空')
          return
        }
        this.$api.updateByOrg(this.updateForm).then(response => {
          if(response.errorCode == '1') {
            this.$message.success(response.resultMsg)
            this.updateDialog = false
            this.getOrgsList()
          }else {
            this.$message.warning(response.resultMsg)
          }
        }).catch(error => {
          this.$message.error(error)
        })
      }).catch(_ => {
        this.$message('已取消操作')
      })
    },
    // 冻结/解冻组织
    freezeOrRecoverOrg(data) {
      this.$api.freezeOrRecoverOrg({
        orgId: data.projectOrgId,
        type: data.isFreeze == 0? 1 : 0
      }).then(response => {
        this.getOrgsList()
      })
    },
    // 删除组织
    deleteByOrg(projectOrgId) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        this.$api.deleteByOrg({
          projectOrgId: projectOrgId
        }).then(response => {
          if(response.errorCode == '1') {
            this.$message.success(response.resultMsg)
            this.getOrgsList()
          }else {
            this.$message.warning(response.resultMsg)
          }
        }).catch(error => {
          this.$message.error(error)
        })
      }).catch(_ => {
        this.$message('已取消删除')
      })
    }
  },
  created() {
    this.getOrgsList()
  }
};
</script>

<style lang="scss">
.organizationManage {
  &_header {
    padding: 0px 5px;
    .el-col {
      line-height: 48px;
    }
  }
  &_table {
    width: 100%;
    margin-top: 20px;
    .el-table__fixed-body-wrapper {
      top: 55px !important;
    }
  }
}
</style>

