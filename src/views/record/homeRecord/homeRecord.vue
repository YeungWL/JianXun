<template>
  <div class="homeRecord">
    <div class="container">
      <div class="select">
        <el-form :inline="true">
          <el-form-item label="项目名称">
            <el-select v-model="selectProject" placeholder="请选择项目" >
              <el-option v-for="item in projectList" :key="item.projectId" :label="item.proName" :value="item.projectId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组织名称">
            <el-select v-model="selectOrg" placeholder="请选择组织" @change="orgChange">
              <el-option v-for="item in organizationList" :key="item.projectOrgId" :label="item.orgName" :value="item.projectOrgId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="calinder">
        <vue-event-calendar :events="demoEvents" @day-changed="dayChange"></vue-event-calendar>
        <div class="btn">
          <el-button type="primary" @click="dialogFormVisible = true" class="rzbtn">导出日志</el-button>
          <div class="content">
            <span>当前有效期至 : 2018年6月30号 </span>
            <a href="javascript:;" @click="show.isShow = !show.isShow">续期</a>
          </div>
          <el-button type="primary" @click="dialogFormVisible1 = true" v-if="buttonShow" class="setion">设置</el-button>
        </div>
      </div>
    </div>

    <!-- 导出dialog -->
    <el-dialog title="导出" :visible.sync="dialogFormVisible" width="40%">
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">导 出</el-button>
      </div>
    </el-dialog>

    <!-- 设置的dialog -->
    <el-dialog title="设置" :visible.sync="dialogFormVisible1" width="560px" class="my-dialog">
      <div class="setting">
        <div class="project">
          <span class="left">添加日志</span>
          <el-button icon="el-icon-plus" 
                     style="padding: 0;width: 30px;height: 32px;"
                     @click="addItem, addDialog = true"></el-button>
        </div>
        <div class="project">
          <span class="left">土建专业</span>
          <span>
            <el-button style="height: 32px;" type="primary" @click="updateName = true">修改名称</el-button>
            <el-button style="height: 32px;" type="success">预览</el-button>
            <el-button style="height: 32px;" type="info">设置参数</el-button>
          </span>
        </div>
        <div class="project">
          <span class="left">土建专业</span>
          <span>
            <el-button style="height: 32px;" type="primary">修改名称</el-button>
            <el-button style="height: 32px;" type="success">预览</el-button>
            <el-button style="height: 32px;" type="info">设置参数</el-button>
          </span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="setBuildAttr">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 添加日志模板dialog -->
    <el-dialog title="添加日志" :visible.sync="addDialog" class="my-dialog" width="600px">
      <div>
        <el-form :inline="true" :model="formInline">
          <el-form-item label="日志名称">
            <el-input v-model="formInline.user" placeholder="日志名称"></el-input>
          </el-form-item>
          <el-form-item label="工程模板">
            <el-select v-model="formInline.user" placeholder="工程模板"></el-select>
          </el-form-item>
        </el-form>
        <div>
          <div style="text-align: center;">预览</div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="addDialog = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改名称dialog -->
    <el-dialog title="修改日志名称" :visible.sync="updateName" class="my-dialog">
      <div>
        <el-form :model="formInline">
          <el-form-item label="修改日志名称">
            <el-input v-model="test1" placeholder="修改日志名称"></el-input>
            <el-input type="hidden" v-model="test2"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button type="primary" @click="updateName = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 组织图的dialog -->
    <div class="organization">
      <el-dialog title="选择日志查看人员" :visible.sync="dialogFormVisible2">
        <el-select v-model="value" placeholder="请选择">
          <el-option >
          </el-option>
        </el-select>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 续期的dialog -->
    <renewal :msg="show" @on-result-change="onResultChange"></renewal>
  </div>
</template>

<script>
import renewal from "@/components/renewal";
export default {
  components: { renewal },
  data() {
    return {
      show: {
        isShow: false
      },
      selectProject:'',
      selectOrg:'',
      projectList:[],
      organizationList:[],
      orgId:'',
      form: {
        name: "",
        type: [],
        beginTime: "",
        endTime: ""
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      value: "",
      value1: "",
      demoEvents: [],
      buttonShow: false,
      addDialog: false,
      updateName: false,
      logData: {},
      itemJson: [],
      groupJson: [],
      layerJson: [],
      formInline: {
        user: ''
      },
      test1: '',
      test2: ''
    }
  },
  watch: {
    test1() {
      let oldNum = this.test1
      let newNum = this.test1.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      console.log(newNum)
      this.test1 = newNum
      console.log(oldNum)
      if (this.test1.indexOf('*') === -1) {
        this.test2 = this.test1
      }
    }
  },
  methods: {
    dayChange(day) {
      console.log(day)
      let numDay = day.date;
      numDay = numDay.split("/");
      let years = numDay[0];
      let numDays = numDay[2];
      let numMonth = numDay[1];
      let date = new Date();
      let month = date.getMonth() + 1;
      let days = date.getDate();
      let year = date.getFullYear();
      if ((numDays < days && numMonth == month) ||numMonth < month ||years < year) {
        if(this.orgId == '') {
          this.$message('请选择一个组织');
          return false
        }
        this.$router.push({
          name: "detail",
          query:{
            orgId:this.orgId,
            logDate:day.date
          }
        })
      }
      if (numDays == days && numMonth == month && year == years) {
         if(this.orgId == '') {
          this.$message('请选择一个组织');
          return false
        }
        this.$router.push({
          name: "writeRecord",
          query:{
            orgId:this.orgId,
            date:day.date
          }
        })
      }
    },
    onResultChange(val) {
      this.show = val
    },
    //获取项目列表
    getProjectList() {
      this.$api
        .getMyProjectList({
          operateType: "",
        })
        .then(res => {
          if(res.resultMsg !== '查询成功') return false
          this.projectList = res.data
          // console.log(res)
        });
    },
    //获取自己参加的组织
    getMyOrg () { 
      let params = {
        isMyCreate:1,
        projectId:''
      }
      this.$api.getMyOrganization(params,{}).then(res=>{
          if(res.resultMsg !== '查询成功') return false
          this.organizationList = res.data
      })
    },
    // 选择组织
    orgChange(value){
      this.orgId = value
      this.$api.isChargeMan({
        projectOrgId: value
      }).then(res => {
        if(res.errorCode == '1') {
          if(res.data[0].isChargeMan == '0' || res.data[0].isChargeMan == '1') {
            this.buttonShow = true
            this.queryBuildLog()
          }else {
            this.buttonShow = false
          }
        }
      })
    },
    // 负责人获取日志设置项
    queryBuildLog() {
      this.$api.queryBuildLog({
        orgId: this.orgId
      }).then(res => {
        console.log(res)
        if(res.errorCode == '1') {
          res.data[0].itemJson.map(value => {
            value.edit = false
          })
          res.data[0].groupJson.map(value => {
            value.edit = false
          })
          this.logData = res.data
          this.itemJson = res.data[0].itemJson
          this.groupJson = res.data[0].groupJson
          this.layerJson = res.data[0].layerJson
          console.log(res.data[0].itemJson)
        }
      })
    },
    // 获取模板分页列表
    getTemplateList() {},
    // 修改分项工程项
    updateBuildItem(data) {
      if(data.itemName == "") {
        this.$message.warning('分项工程名称不能为空')
        return
      }else if(data.itemId == "") {
        data.edit = !data.edit
        return
      }
      this.$api.updateBuildItem({
        itemId: data.itemId,
        itemName: data.itemName
      }).then(res => {
        if(res.errorCode == '1') {
          this.$message.success('修改成功')
          data.edit = !data.edit
        }
      })
    },
    // 删除分项工程项
    delBuildItem(data, index) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(data.itemId !== "") {
          this.$api.delBuildItem({
            itemId: data.itemId,
            isDeleted: 'Y'
          }).then(res => {
            if(res.errorCode == '1') {
              this.$message.success('删除成功')
              this.queryBuildLog()
            }
          })
        }else {
          this.itemJson.splice(index, 1)
        }
      }).catch(() => {
        this.$message.warning('已取消删除')     
      })
    },
    // 添加分项工程项
    addItem() {
      let itemData = {
        edit: true,
        itemId:"",
        itemName:"",
        orderNo:""
      }
      this.itemJson.push(itemData)
    },
    // 添加工作组项
    addGroup() {
      let groupData = {
        edit: true,
        groupId:"",
        groupName:"",
        orderNo:""
      }
      this.groupJson.push(groupData)
    },
    // 修改工作组项
    updateBuildGroup(data) {
      if(data.groupName == "") {
        this.$message.warning('班组名称不能为空')
        return
      }else if(data.groupId == "") {
        data.edit = !data.edit
        return
      }
      this.$api.updateBuildGroup({
        groupId: data.groupId,
        groupName: data.groupName
      }).then(res => {
        if(res.errorCode == '1') {
          this.$message.success('修改成功')
          data.edit = !data.edit
        }
      })
    },
    // 删除工作组项
    delBuildGroup(data, index) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(data.groupId !== "") {
          this.$api.delBuildGroup({
            groupId: data.groupId,
            isDeleted: 'Y'
          }).then(res => {
            if(res.errorCode == '1') {
              this.$message.success('删除成功')
              this.queryBuildLog()
            }
          })
        }else {
          this.groupJson.splice(index, 1)
        }
      }).catch(() => {
        this.$message.warning('已取消删除')     
      })
    },
    // 负责人设置分项内容
    setBuildAttr() {
      let item = {
        "itemJson": this.itemJson
      }
      let group = {
        "groupJson": this.groupJson
      }
      let layer = {
        "layerJson": this.layerJson
      }
      this.$api.setBuildAttr({
        templateId: '',
        orgId: this.logData[0].orgId,
        itemJson: JSON.stringify(item),
        groupJson: JSON.stringify(group),
        layerJson: JSON.stringify(layer)
      }).then(res => {
        console.log(res)
        if(res.errorCode == '1') {
          this.queryBuildLog()
          this.dialogFormVisible1 = false
        }
      })
    }
  },
  created() {
    this.getProjectList()
    this.getMyOrg()
  }
}
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
        .rzbtn{
          width: 78px;
        }
        .setion{
          width: 50px;
        }
        .content{
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