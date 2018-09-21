<template>
  <div class="position page-content-body">
    <div class="page-header">
      <el-select v-model="selectOrgData" clearable placeholder="请选择" style="width:350px;" class="org-positon-select" @change="changByGetList">
        <el-option v-for="item in options" :key="item.projectOrgId" :label="item.orgName" :value="item.projectOrgId">
        </el-option>
      </el-select>
      <span class="director">
        <span>组织负责人 : </span>
        <span v-if="!managePerson.length">空缺</span>
        <span style="margin-right:10px" v-for="(item, index) in managePerson" :key="index" v-else>{{item}}</span>
      </span>
      <div class="btn">
        <el-button type="primary" @click="addDepartment">添加部门</el-button>
        <!-- <el-button type="primary">添加组织负责人</el-button> -->
      </div>
    </div>
    <div class="tables page-main customTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="departmentName" label="部门名称">
        </el-table-column>
        <el-table-column prop="memberList" label="部门负责人">
          <template slot-scope="scope">
            <span v-if="!scope.row.manageList.length">空缺</span>
            <el-tag style="margin:0 10px 10px 0"
                    v-for="(item,index) in scope.row.manageList"
                    :key="index"
                    closable
                    :class="{'activeRed':item.headRole === '0','activeYellow':item.headRole === '1','activeBlue':item.headRole === '2','activeGreen':item.headRole === '3'}"
                    @close="handleClose(item)"
                    v-else>{{item.memberName}}</el-tag>
            <!-- <span :class="{'activeRed':item.headRole === '0','activeYellow':item.headRole === '1','activeBlue':item.headRole === '2','activeGreen':item.headRole === '3'}"
                  style="margin-right:20px"
                  :type="{'success':item.headRole === '0','warning':item.headRole === '1','info':item.headRole === '2','danger':item.headRole === '3'}"
                  v-for="(item,index) in scope.row.manageList"
                  :key="index"
                  v-else>{{item.memberName}}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="commonList" label="部门成员">
          <template slot-scope="scope">
            <el-tag style="margin:0 10px 10px 0" v-for="(item,index) in scope.row.commonList" :key="index" closable @close="handleClose(item)">{{item.memberName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="button" size="small" @click="modify(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
            <el-button type="button" size="small" @click="addMember(scope.row)">添加人员</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加人员的dialog -->
    <el-dialog title="添加人员" width="30%" :visible.sync="dialogFormVisible">
      <el-form ref="createForm" :model="createForm" label-width="80px">
        <div class="select">
          <!-- <div class="selec-area"> -->
          <el-form-item label="角色" prop="vocation" style="margin:0">
            <!-- <span>角色：</span> -->
            <el-select v-model="createForm.vocation" placeholder="请选择" style="width:300px" @change="selected">
              <el-option label="组织负责人" value="0"></el-option>
              <el-option label="部门负责人" value="1"></el-option>
              <el-option label="普通员工" value="2"></el-option>
            </el-select> <br>
          </el-form-item>
          <!-- <div class="radio"> -->
          <el-form-item label="" prop="radio2" style="margin:0">
            <el-radio-group v-model="createForm.radio2" @change="radiosChange" :disabled="radioDisabled">
              <el-radio label="正职" v-if="show"></el-radio>
              <el-radio label="副职" v-if="show"></el-radio>
              <el-radio label="普通员工" v-if="!show"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- </div> -->
          <!-- </div> -->
          <!-- <div class="selec-person"> -->
          <el-form-item label="人才库" prop="checkList" style="margin:0">
            <!-- <span>人才库：</span> -->
            <div class="radios-person">

              <el-checkbox-group v-model="createForm.checkList" :disabled="selectDisabled" v-if=" this.headRole !== 0 " @change="personSelect">
                <el-checkbox v-for="(item,index) in memberList" :key="index" :label="item.nickName" :value="item.orgStorageId"></el-checkbox>
              </el-checkbox-group>
              <el-radio-group v-model="createForm.checkList" :disabled="selectDisabled" v-else @change="personSelect" style="margin-top:12px">
                <el-radio v-for="(item,index) in memberList" :key="index" :label="item.nickName" :value="item.orgStorageId" style="margin-bottom:10px"></el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <!-- </div> -->
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size='small' @click="service">维护人才库</el-button>
        <el-button type="primary" @click="addConirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 维护人才库的dialog -->
    <div class="member">
      <el-dialog title="维护人才库" :visible.sync="dialogTableVisible">
        <div class="title">广州市轨道交通十五号线建设项目管理办公室</div>
        <el-table :data="memberList" height="200" align>
          <el-table-column property="nickName" label="姓名" align="center"></el-table-column>
          <el-table-column property="phone" label="电话号码" align="center"></el-table-column>
          <el-table-column property="address" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="delPerson(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="add_member">
          <el-input v-model="nickName" placeholder="请输入名字"></el-input>
          <el-input v-model="phone" placeholder="请输入电话号码"></el-input>
          <el-button type="primary" @click="addPerson">添加</el-button>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button>Excel导入</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    filterCommonList(list) {
      console.log(123)
      return list
    }
  },
  data() {
    return {
      createForm: {
        vocation: '',
        radio2: [],
        checkList: []
      },
      show: true,
      nickName: '',
      phone: '',
      radio: '',
      radio1: [],
      radioDisabled: true,
      selectDisabled: true,
      role: '',
      pos: '',
      dialogFormVisible: false,
      dialogTableVisible: false,
      form: {
        name: '',
        region: ''
      },
      vocationList: [
        { label: '组织负责人', value: '0' },
        { label: '部门负责人', value: '1' },
        { label: '普通员工', value: '2' }
      ],

      memberList: [],
      member: {},
      comList: [],
      gridData: [],
      options: [],
      tableData: [],
      selectOrgData: '',
      managePerson: [],
      departmentName: '',
      orgId: '',
      headRole: '',
      departmentData: ''
    }
  },
  methods: {
    // 修改部门名称
    modify(val) {
      this.$prompt('请输入部门名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          let params = {
            departmentId: val.departmentId,
            orgId: this.orgId,
            departmentName: value
          }
          this.$api.modifyDepartment(params).then(res => {
            if (!res.errorCode === '1') return false
            this.changByGetList()
          })
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    // 添加部门
    addDepartment() {
      if (this.orgId == '') {
        this.$message('请选择一个组织')
        return false
      }
      this.$prompt('请输入部门名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          let params = {
            departmentOrgId: this.orgId,
            departmentName: value
          }
          this.$api.addDepartment(params).then(res => {
            if (!res.errorCode == '1') return false
            this.changByGetList()
          })
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    // 获取可以管理的组织列表
    getManageOrgList() {
      this.$api
        .getManageOrgList({
          isMyCreate: 2
        })
        .then(response => {
          this.options = response.data
        })
    },
    // 通过改变组织列表来获取部门信息
    changByGetList() {
      this.orgId = this.selectOrgData

      this.$api.getOrgInfo({
        projectOrgId: this.selectOrgData
      }).then(res => {
        console.log(res)
        if(res.errorCode == '1') {
          let commonList = []
          let manageList = []
          // 处理表格数据
          let departmentList = res.data[0].departmentList
          for(let i = 0; i < departmentList.length; i++) {
            for(let j = 0; j < departmentList[i].memberList.length; j++) {
              if(departmentList[i].memberList[j].headRole == '4') {
                commonList.push(departmentList[i].memberList[j])
              }else {
                manageList.push(departmentList[i].memberList[j])
              }
            }
            departmentList[i].commonList = commonList
            departmentList[i].manageList = manageList
            commonList = []
            manageList = []
          }
          this.tableData = departmentList
          console.log(departmentList)
          // 处理组织负责人
          let leaderList = res.data[0].orgLeaderedList.memberList
          this.managePerson = []
          for(let k = 0; k < leaderList.length; k++) {
            if(leaderList[k].headRole == '0') {
              this.managePerson.push(leaderList[k].memberName)
            }
            if(leaderList[k].headRole == '1') {
              this.managePerson.push(leaderList[k].memberName)
            }
          }
        }
      })
      // this.$api
      //   .getDepartmentList({
      //     orgId: orgData[0]
      //   })
      //   .then(response => {
      //     let commonList = []
      //     let manageList = []
      //     for (let i = 0; i < response.data.length; i++) {
      //       commonList = response.data[i].memberList.map(item => {
      //         return item
      //       })
      //       for (let j = 0; j < response.data[i].memberList.length; j++) {
      //         if (response.data[i].memberList[j].headRole !== '4') {
      //           manageList.push(response.data[i].memberList[j])
      //         }
      //         // else {
      //         //   commonList.push(response.data[i].memberList[j])
      //         // }
      //       }
      //       // console.log(response.data[i])
      //       response.data[i].commonList = commonList
      //       response.data[i].manageList = manageList
      //       manageList = []
      //       // commonList = []
      //     }
      //     this.tableData = response.data
      //     console.log(response)
      //   })
    },
    // 移除成员
    handleClose(data) {
      let params = {
        orgMemberId: data.orgMemberId
      }
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.$api
            .deleteMember(params)
            .then(response => {
              if (response.errorCode == '1') {
                this.$message.success(response.resultMsg)
                this.changByGetList()
              } else {
                this.$message.warning(response.resultMsg)
              }
            })
            .catch(error => {
              this.$message.error(error)
            })
        })
        .catch(_ => {
          this.$message('已取消删除')
        })
    },
    // 删除部门
    del(val) {
      console.log(val)
      let params = {
        departmentId: val.departmentId
      }
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.$api
            .deleteDepartment(params)
            .then(response => {
              if (response.errorCode == '1') {
                this.$message.success(response.resultMsg)
                this.changByGetList()
              } else {
                this.$message.warning(response.resultMsg)
              }
            })
            .catch(error => {
              this.$message.error(error)
            })
        })
        .catch(_ => {
          this.$message('已取消删除')
        })
    },
    //添加成员
    addMember(data) {
      console.log(data, 12)
      this.departmentData = data
      this.dialogFormVisible = true
      // 获取组织预存成员
      let params = {
        orgId: this.orgId
      }
      this.$api.getOrgStorageList(params).then(res => {
        if (res.errorCode !== '1') return false
        this.memberList = res.data
        console.log(this.memberList)
        for (let i = 0; i < this.memberList.length; i++) {
          if (this.memberList[i].isDist === '1') {
            console.log(567)
            this.memberList.splice(i, 1)
          }
        }
        console.log(this.memberList)
      })
    },
    // 选择角色
    selected(val) {
      this.role = val
      this.radioDisabled = false
      if (this.role === '2') {
        this.show = false
      } else {
        this.show = true
      }
    },
    // 选择职位
    radiosChange(val) {
      this.selectDisabled = false
      if (val === '正职') {
        this.headRole = 0
      }
      if (val === '副职') {
        this.headRole = 1
      }
      if (val === '普通员工') {
        this.headRole = 2
      }
    },
    //选择人员
    personSelect(val) {
      console.log(val)
      console.log(this.role)
      this.member.memberList = []
      // 组织负责人
      if (this.role == 0) {
        for (let i = 0; i < this.memberList.length; i++) {
          if (val === this.memberList[i].nickName) {
            this.member.memberList.push({
              orgStorageId: this.memberList[i].orgStorageId,
              memberName: this.memberList[i].nickName,
              memberPhone: this.memberList[i].phone
            })
            this.comList.push(this.memberList[i].nickName)
          }
        }
        this.member.departmentId = ''
        this.member.orgLeaderedId = this.orgId
      }
      if (this.role == 1 && this.headRole === 0) {
        for (let i = 0; i < this.memberList.length; i++) {
          if (val === this.memberList[i].nickName) {
            this.member.memberList.push({
              orgStorageId: this.memberList[i].orgStorageId,
              memberName: this.memberList[i].nickName,
              memberPhone: this.memberList[i].phone
            })
            this.comList.push(this.memberList[i].nickName)
          }
        }
        this.member.departmentId = this.departmentData.departmentId
        this.member.orgLeaderedId = ''
      }
      // 普通员工
      if (this.role == 2 || this.role == 1) {
        console.log(456)
        for (let i = 0; i < this.memberList.length; i++) {
          for (let j = 0; j < val.length; j++) {
            if (val[j] == this.memberList[i].nickName) {
              this.member.memberList.push({
                orgStorageId: this.memberList[i].orgStorageId,
                memberName: this.memberList[i].nickName,
                memberPhone: this.memberList[i].phone
              })
              this.comList.push(this.memberList[i].nickName)
            }
          }
        }
        this.member.departmentId = this.departmentData.departmentId
        this.member.orgLeaderedId = ''
      }
    },
    // 点击确定添加
    addConirm() {
      console.log(this.comList)
      this.member = JSON.stringify(this.member)
      let params = {
        memberJson: this.member,
        headRole: this.headRole
      }
      this.$api.addOrgMember(params).then(res => {
        if (res.errorCode !== '1') {
          this.$message(res.resultMsg)
          this.$refs.createForm.resetFields()
          this.dialogFormVisible = false
          this.member = {}
          this.radioDisabled = true
          this.selectDisabled = true
          return false
        }
        // 点击确认添加之后 将对应的成员删除掉
        for (let i = 0; i < this.memberList.length; i++) {
          for (let j = 0; j < this.comList.length; j++) {
            if (this.comList[j] === this.memberList[i].nickName) {
              console.log('进来了吗')
              this.memberList.splice(i, 1)
              console.log(this.memberList)
            }
          }
        }
        // console.log(this.memberList)
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.$refs.createForm.resetFields()
        this.dialogFormVisible = false
        this.member = {}
        this.radioDisabled = true
        this.selectDisabled = true
        this.changByGetList()
      })
    },
    //维护人才库
    service() {
      if (this.orgId === '') {
        this.$message('请选择一个组织')
        return false
      }
      this.dialogTableVisible = true
    },
    // 添加预存成员
    addPerson() {
      let params = {
        orgId: this.orgId,
        phone: this.phone,
        nickName: this.nickName
      }
      let isPhone = /^[1][3,4,5,7,8][0-9]{9}$/
      let isNickName = /\\s+/
      this.$api.addOrgStorage(params).then(res => {
        if (this.nickName === '') {
          this.$message('请输入成员姓名')
          return false
        }
        if (!isPhone.test(this.phone) || this.phone === '') {
          this.$message('手机号码格式不正确')
          return false
        }
        if (res.errorCode === '1008') {
          this.$message(res.resultMsg)
          return false
        }
        if (res.errorCode === '1000') {
          this.$message('请将信息填写完整')
          return false
        }
        if (res.errorCode !== '1') return false
        this.$message({
          message: '成员添加成功',
          type: 'success'
        })
        // 重新获取成员列表
        this.$api.getOrgStorageList({ orgId: this.orgId }).then(res => {
          if (res.errorCode !== '1') return false
          this.memberList = res.data
          this.phone = ''
          this.nickName = ''
        })
      })
    },
    // 删除预存成员
    delPerson(data) {
      console.log(data)
      let params = {
        orgStorageId: data.orgStorageId
      }
      this.$api.delOrgStorage(params).then(res => {
        console.log(res)
        if (res.errorCode !== '1') return false
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.$api.getOrgStorageList({ orgId: this.orgId }).then(res => {
          if (res.errorCode !== '1') return false
          this.memberList = res.data
        })
      })
    }
  },
  created() {
    this.getManageOrgList()
    console.log(this.getToken())
    console.log(localStorage.getItem('accessToken'))
  }
}
</script>

<style lang="scss" scoped>
.position {
  .org-positon-select {
    /deep/ .el-input__icon {
      line-height: 32px;
    }
  }
  .page-header {
    .btn {
      float: right;
    }
  }
  .director {
    padding-left: 20px;
  }
  .tables {
    margin-top: 20px;
  }
  .select {
    .radio {
      margin: 10px 0 0 40px;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
    .selec-person {
      display: flex;
      // align-items: center;
      .radios-person {
        .el-checkbox-group,
        .el-radio-group {
          display: flex;
          flex-direction: column;
          margin-top: 5px;
        }
        .el-checkbox,
        .el-radio {
          margin: 0px 0 10px 10px;
        }
      }
    }
  }
  .title {
    width: 100%;
    text-align: center;
    line-height: 30px;
    font-weight: 700;
    font-size: 16px;
  }
  .del {
    color: #26a2ff;
    font-size: 14px;
  }
  .activeRed {
    color: #F56C6C;
    border: 1px solid rgba(#F56C6C,.2);
    background-color: rgba(#F56C6C,.1);
  }
  .activeYellow {
    color: #E6A23C;
    border: 1px solid rgba(#E6A23C,.2);
    background-color: rgba(#E6A23C,.1);
  }
  .activeBlue {
    color: #909399;
    border: 1px solid rgba(#909399,.2);
    background-color: rgba(#909399,.1);
  }
  .activeGreen {
    color: #67C23A;
    border: 1px solid rgba(#67C23A,.2);
    background-color: rgba(#67C23A,.1);
  }
}
</style>
