<template>
  <section class="project-container page-content-body">
    <div class="page-header">
      <el-button type="primary" size="small" class="search_btn" @click="creationDialog = true,creationForm.name='',creationForm.forShort=''">创建项目</el-button>
    </div>
    <!-- 表格 -->
    <div class="page-main customTable">
      <el-table ref="multipleTable" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" :data="projectList" key="ArcDataArr">
        <!--<el-table-column type="selection" width="35"></el-table-column>-->
        <el-table-column prop="proCode" label="项目编码" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="proName" label="项目名称" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shortName" label="项目简称" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="modifyProject(scope.row)" >修改</el-button>
            <!-- <el-button type="success" size="mini" @click="attorn(scope.row)" :disabled="btnDisabled">转让</el-button>
            <el-button size="mini" @click="fronze">冻结</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 创建项目对话框 -->
    <el-dialog title="创建项目" class="my-dialog" :visible.sync="creationDialog" width="30%">
      <div class="dialog-content">
        <el-form ref="form" :model="creationForm" label-width="80px">
          <el-form-item label="项目名称">
            <el-input v-model="creationForm.name"></el-input>
          </el-form-item>
          <el-form-item label="项目简称">
            <el-input v-model="creationForm.forShort"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="creationDialog = false,creationForm.name='',creationForm.forShort=''">取 消</el-button>
        <el-button type="primary" @click="buildProject">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 修改项目对话框 -->
    <el-dialog title="修改项目" class="my-dialog" :visible.sync="updateDialog" width="30%">
      <div class="dialog-content">
        <el-form ref="form" :model="creationForm" label-width="80px">
          <el-form-item label="项目名称" >
            <el-input v-model="creationForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="项目简称">
            <el-input v-model="creationForm.forShort"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false,creationForm.name='',creationForm.forShort=''">取 消</el-button>
        <el-button type="primary" @click="modify">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 转让项目对话框 -->
    <el-dialog title="转让项目" class="my-dialog" :visible.sync="changeDialog" width="30%">
      <div class="dialog-content">
        <el-form ref="form" :model="creationForm" label-width="84px">
          <el-form-item label="受让人姓名">
            <el-input v-model="creationForm.name"></el-input>
          </el-form-item>
          <el-form-item label="受让人帐号">
            <el-input v-model="creationForm.forShort"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeDialog = false">取 消</el-button>
        <el-button type="primary" @click="clickChange">提 交</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      btnDisabled:false,
      projectList: [],
      creationForm: {
        name: '',
        forShort: ''
      },
      projectItem: '',
      creationDialog: false,
      updateDialog: false,
      changeDialog: false
    }
  },
  methods: {
    clickChange() {
      this.$confirm('确定转让?', '提示', {
        type: 'warning'
      })
        .then(_ => {
          this.$message.success('转让成功')
        })
        .catch(_ => {
          this.$message.warning('已经取消操作')
        })
    },
    // 获取项目列表
    getProjectList() {
      this.$api.getMyProjectList({
        operateType: '0'
      }).then(res => {
        if (res.errorCode === '1') {
          this.projectList = res.data
        }
      })
    },
    //创建项目
    buildProject() {
      let params = {
        proName: this.creationForm.name,
        shortName: this.creationForm.forShort
      }
      this.$api.addProject(params).then(res => {
        if (this.creationForm.name === '') {
          this.$message('请输入项目名称')
          return false
        }
        if (res.errorCode !== '1') {
          this.$message('请将信息填写完整')
          return false
        }
        this.creationDialog = false
        this.getProjectList()
        this.$message.success('项目创建成功')
        this.creationForm.name = ''
        this.creationForm.forShort = ''
      })
    },
    //修改项目
    modifyProject(data) {
      this.projectItem = data
      this.updateDialog = true
      this.creationForm.name = data.proName
      this.creationForm.forShort = data.shortName
    },
    modify() {
      let params = {
        proName: this.creationForm.name,
        shortName: this.creationForm.forShort,
        projectId: this.projectItem.projectId
      }
      this.$api.updateProject(params).then(res => {
        if (this.creationForm.name === '') {
          this.$message('请输入项目名称')
          return false
        }
        if (res.errorCode !== '1') {
          this.$message('请将信息填写完整')
          return false
        }
        this.getProjectList()
        this.updateDialog = false
        this.$message.success('项目修改成功')
        this.creationForm.name = ''
        this.creationForm.forShort = ''
      })
    },
    //转让项目
    attorn(data) {
      this.changeDialog = true
      console.log(data)
    },
    //冻结
    fronze(){
      this.btnDisabled = !btnDisabled
    }
  },
  created() {
    this.getProjectList()
  }
}
</script>

<style lang="scss" scoped>
.project-container {
  .page-header {
    padding-bottom: 10px;
    border-bottom: 1px solid #d1d1d1;
  }
  .customTable {
    padding: 0;
    padding-top: 10px;
  }
}
</style>
