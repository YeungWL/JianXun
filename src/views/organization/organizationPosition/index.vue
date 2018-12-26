<template>
  <div class="position page-content-body">
    <div class="page-header">
      <el-select v-model="selectOrgData" clearable placeholder="请选择" style="width:350px;" class="org-positon-select" @change="changByGetList" value-key="projectOrgId">
        <el-option v-for="item in options" :key="item.projectOrgId" :label="item.orgName" :value="item">
        </el-option>
      </el-select>
      <span class="director">
        <span>组织负责人 : </span>
        <span v-if="!managePerson.length">空缺</span>
        <span style="margin-right:10px" 
              v-for="(item, index) in managePerson" 
              :key="index"
              v-else-if="userOrgRole !== '0'">{{item.memberName}}</span>
        <el-tag style="margin:0 10px 10px 0" 
                v-show="userOrgRole === '0'"
                v-for="(item, index) in managePerson"
                :key="index"
                closable
                :class="{'activeRed':item.headRole === '0','activeYellow':item.headRole === '1','activeBlue':item.headRole === '2','activeGreen':item.headRole === '3'}"
                @close="handleClose(item)"
                v-else-if="userOrgRole === '0'">{{item.memberName}}</el-tag>
      </span>
      <div class="btn">
        <el-button type="primary" @click="addDepartment">添加部门</el-button>
        <el-button type="primary" @click="addMember">分配岗位</el-button>
        <el-button type='primary' @click="service">维护人才库</el-button>
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
            <el-tag style="margin:0 10px 10px 0"
                    v-for="(item,index) in scope.row.commonList"
                    :key="index"
                    closable
                    @close="handleClose(item)">{{item.memberName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="button" size="small" @click="modify(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加人员的dialog -->
    <el-dialog title="添加人员" width="450px" :visible.sync="dialogFormVisible">
      <el-form ref="createForm" :model="createForm" label-width="80px">
        <div class="select">
          <el-form-item label="角色" prop="vocation" style="margin:0">
            <el-select v-model="createForm.vocation" placeholder="请选择" style="width:300px" @change="selected" value-key="departmentId">
              <el-option v-for="(item, index) in vocationList" :key="index" :label="item.departmentName" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="radio2" style="margin:0">
            <el-radio-group v-model="createForm.radio2" @change="radiosChange" :disabled="radioDisabled">
              <!-- <el-radio label="正职" v-if="show"></el-radio>
              <el-radio label="副职" v-if="show"></el-radio>
              <el-radio label="普通员工" v-if="!show"></el-radio> -->
              <el-radio label="正职"></el-radio>
              <el-radio label="副职"></el-radio>
              <el-radio label="普通员工" v-if="show"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- </div> -->
          <!-- </div> -->
          <!-- <div class="selec-person"> -->
          <el-form-item label="人才库" prop="checkList" style="margin-top:20px;">
            <!-- <span>人才库：</span> -->
            <div class="radios-person" style="overflow-y: scroll;height: 150px;">
              <el-checkbox-group v-model="createForm.checkList" :disabled="selectDisabled" v-if=" this.headRole !== 0 " @change="personSelect">
                <el-checkbox v-for="(item,index) in memberList" :key="index" :label="item" style="display:block;margin-left:0;">{{item.nickName}}</el-checkbox>
              </el-checkbox-group>
              <el-radio-group v-model="createForm.radioValue" :disabled="selectDisabled" v-else @change="personSelect">
                <el-radio v-for="(item,index) in memberList" :key="index" :label="item" style="display:block;margin-left:0;line-height:40px;">{{item.nickName}}</el-radio>
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
        <!-- <div class="title">广州市轨道交通十五号线建设项目管理办公室</div> -->
        <el-table :data="allMemberList" height="200" align>
          <el-table-column property="nickName" label="姓名" align="center"></el-table-column>
          <el-table-column property="phone" label="电话号码" align="center"></el-table-column>
          <el-table-column property="address" label="操作" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isDist === '1'">已分配</span> 
              <el-button type="text" size="small" @click="delPerson(scope.row)" v-else>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="add_member">
          <el-input v-model="nickName" placeholder="请输入名字"></el-input>
          <el-input v-model="phone" placeholder="请输入电话号码"></el-input>
          <el-button type="primary" @click="addPerson">添加</el-button>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="uploadDialog = true">Excel导入</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 导入Excel文件 -->
    <el-dialog title="批量新增" :visible.sync="uploadDialog" class="my-dialog batchAddWorkerDialog">
      <div class="dialog-content">
        <p>文件大小不超过10M.</p>
        <el-input disabled v-model="fileName"></el-input>
        <input type="file" name="file" ref="file" @change="handleFileChange" style="display:none">
        <el-button size="small" type="primary" @click="uploadExcel">浏览</el-button>
        <a :href="downloadUrl" target="_blank" style="text-decoration: underline;">下载Excel模板</a>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleImport">导入</el-button>
      </div>
    </el-dialog>

    <!-- 导入情况 -->
    <el-dialog title="导入情况" :visible.sync="importInfoDialog" class="my-dialog batchAddWorkerDialog" center width="360px">
      <div class="dialog-content">
        <div>
          <span> 成功 : </span>
          <span style="color:#2AB452;">{{importData.succCount}}条</span>
        </div>
        <div>
          <span> 失败 : </span>
          <span style="color:#FF0000;">{{importData.errorCount}}条 </span>
        </div>
        <a v-if="importData.errorCount > 0 " style="text-decoration:underline;" @click="getDownloadError(importData.errorKey)">点击下载失败原因</a>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importInfoDialog=false, service()">完 成</el-button>
        <el-button type="primary" @click="importInfoDialog=false;uploadDialog=true">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      createForm: {
        vocation: '',
        radio2: '',
        checkList: [],
        radioValue: ''
      },
      show: true,
      nickName: '',
      phone: '',
      radio: '',
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
      vocationList: [],
      allMemberList: [],
      memberList: [],
      memberData: {
        'departmentId': '',
        'orgLeaderedId': '',
        'memberList': []
      },
      comList: [],
      gridData: [],
      options: [],
      tableData: [],
      selectOrgData: {},
      managePerson: [],
      departmentName: '',
      orgId: '',
      projectId: '',
      headRole: '',
      departmentData: '',
      vocation: [
        { label: '组织负责人', value: '' }
      ],
      userOrgRole: '', // 判断是否是否拥有权限删除的
      downloadUrl: '', // 下载模板url
      uploadDialog: false, // 导入dialog
      fileName: '', // 文件名称
      importInfoDialog: false, // 导入详情dialog
      importData: {} // 导入返回信息
    }
  },
  methods: {
    // 修改部门名称
    modify(val) {
      this.$prompt('请输入部门名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: val.departmentName
      }).then(({ value }) => {
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
      }).catch(() => {
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
      this.$api.getManageOrgListByOrg({
          isMyCreate: 2
        })
        .then(response => {
          this.options = response.data
          this.selectOrgData = response.data[0]
          this.changByGetList()
        })
    },
    // 通过改变组织列表来获取部门信息
    changByGetList() {
      this.orgId = this.selectOrgData.projectOrgId
      this.projectId = this.selectOrgData.projectId

      this.$api.getOrgInfo({
        projectOrgId: this.selectOrgData.projectOrgId,
        projectId: this.selectOrgData.projectId
      }).then(res => {
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
          // console.log(this.tableData)
          // 获取添加部门到添加人员的下拉框
          let selectVocation = [
            {departmentName: '组织负责人', departmentId: '0'}
          ]
          for(let i = 0; i < this.tableData.length; i++) {
            selectVocation.push(this.tableData[i])
          }
          // console.log(selectVocation)
          this.vocationList = selectVocation
          // 处理组织负责人
          let leaderList = res.data[0].orgLeaderedList.memberList
          this.managePerson = []
          for(let k = 0; k < leaderList.length; k++) {
            if(leaderList[k].headRole == '0') {
              this.managePerson.push(leaderList[k])
            }
            if(leaderList[k].headRole == '1') {
              this.managePerson.push(leaderList[k])
            }
          }
          this.userOrgRole = res.data[0].userOrgRole
          // console.log(this.userOrgRole)
        }
      })
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
      }).then(_ => {
        this.$api.deleteMember(params).then(response => {
            if (response.errorCode == '1') {
              this.$message.success(response.resultMsg)
              this.changByGetList()
            } else {
              this.$message.warning(response.resultMsg)
            }
          }).catch(error => {
            this.$message.error(error)
          })
      }).catch(_ => {
        this.$message('已取消删除')
      })
    },
    // 删除部门
    del(val) {
      let params = {
        departmentId: val.departmentId
      }
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
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
      }).catch(_ => {
        this.$message('已取消删除')
      })
    },
    //添加成员
    addMember(data) {
      if (this.orgId == '') {
        this.$message('请选择一个组织')
        return false
      }
      // console.log(data, 12)
      // console.log(this.orgId, this.projectId)

      // this.departmentData = data
      if(data !== 1) {
        this.dialogFormVisible = true
      }
      // 获取组织预存成员
      let params = {
        orgId: this.orgId
      }
      this.$api.getOrgStorageList(params).then(res => {
        if (res.errorCode !== '1') return false
        let memberList = []
        this.allMemberList = res.data
        for(let i = 0; i < res.data.length; i++) {
          if(res.data[i].isDist !== '1') {
            memberList.push(res.data[i])
          }
        }
        this.memberList = memberList
      })
    },
    // 选择角色
    selected(val) {
      this.role = val
      this.radioDisabled = false
      // if (this.role === '2') {
      //   this.show = false
      // } else {
      //   this.show = true
      // }

      if(val.departmentId.length === 1) {
        this.show = false
      }else {
        this.show = true
      }
      this.selectDisabled = true
      this.member = {}
    },
    // 选择职位
    radiosChange(val) {
      this.selectDisabled = false
      if (val === '正职') {
        this.headRole = 0
        this.createForm.checkList = []
      }
      if (val === '副职') {
        this.headRole = 1
        this.createForm.radioValue = ''
      }
      if (val === '普通员工') {
        this.headRole = 2
        this.createForm.radioValue = ''
      }
    },
    //选择人员
    personSelect(val) {
      // console.log(val)
      // 组织负责人
      // if (this.role.departmentId.length === 1) {
      //   console.log(123)
        // for (let i = 0; i < this.memberList.length; i++) {
        //   if (val === this.memberList[i].nickName) {
        //     this.member.memberList.push({
        //       orgStorageId: this.memberList[i].orgStorageId,
        //       memberName: this.memberList[i].nickName,
        //       memberPhone: this.memberList[i].phone
        //     })
        //     this.comList.push(this.memberList[i].nickName)
        //   }
        // }
        // this.member.departmentId = ''
        // this.member.orgLeaderedId = this.orgId
      // }else {
      //   for (let i = 0; i < this.memberList.length; i++) {
      //     if (val === this.memberList[i].nickName) {
      //       this.member.memberList.push({
      //         orgStorageId: this.memberList[i].orgStorageId,
      //         memberName: this.memberList[i].nickName,
      //         memberPhone: this.memberList[i].phone
      //       })
      //       this.comList.push(this.memberList[i].nickName)
      //     }
      //   }
      //   this.member.departmentId = this.departmentData.departmentId
      //   this.member.orgLeaderedId = ''
      // }
      // if (this.role == 1 && this.headRole === 0) {
      //   for (let i = 0; i < this.memberList.length; i++) {
      //     if (val === this.memberList[i].nickName) {
      //       this.member.memberList.push({
      //         orgStorageId: this.memberList[i].orgStorageId,
      //         memberName: this.memberList[i].nickName,
      //         memberPhone: this.memberList[i].phone
      //       })
      //       this.comList.push(this.memberList[i].nickName)
      //     }
      //   }
      //   this.member.departmentId = this.departmentData.departmentId
      //   this.member.orgLeaderedId = ''
      // }
      // 普通员工
      // if (this.role == 2 || this.role == 1) {
      //   console.log(456)
      //   for (let i = 0; i < this.memberList.length; i++) {
      //     for (let j = 0; j < val.length; j++) {
      //       if (val[j] == this.memberList[i].nickName) {
      //         this.member.memberList.push({
      //           orgStorageId: this.memberList[i].orgStorageId,
      //           memberName: this.memberList[i].nickName,
      //           memberPhone: this.memberList[i].phone
      //         })
      //         this.comList.push(this.memberList[i].nickName)
      //       }
      //     }
      //   }
      //   this.member.departmentId = this.departmentData.departmentId
      //   this.member.orgLeaderedId = ''
      // }
    },
    // 点击确定添加
    addConirm() {
      // console.log(this.comList)
      // console.log(this.createForm)
      if(this.createForm.vocation.departmentId === '0') {
        // 组织管理员
        // 判断是否是单选还是多选
        // orgStorageId: this.memberList[i].orgStorageId,
        // memberName: this.memberList[i].nickName,
        // memberPhone: this.memberList[i].phone
        this.memberData.memberList = []
        this.createForm.checkList.length === 0 ? this.memberData.memberList.push({
          orgStorageId: this.createForm.radioValue.orgStorageId,
          memberName: this.createForm.radioValue.nickName,
          memberPhone: this.createForm.radioValue.phone
        }) : this.memberData.memberList = this.createForm.checkList.map(value => {
          return {
            orgStorageId: value.orgStorageId,
            memberName: value.nickName,
            memberPhone: value.phone
          }
        })
        this.memberData.departmentId = ''
        this.memberData.orgLeaderedId = this.orgId
        // console.log('组织负责人',this.memberData)
      }else {
        // 部门添加人员
        // 判断是否是单选还是多选
        this.memberData.memberList = []
        this.createForm.checkList.length === 0 ? this.memberData.memberList.push({
          orgStorageId: this.createForm.radioValue.orgStorageId,
          memberName: this.createForm.radioValue.nickName,
          memberPhone: this.createForm.radioValue.phone
        }) : this.memberData.memberList = this.createForm.checkList.map(value => {
          return {
            orgStorageId: value.orgStorageId,
            memberName: value.nickName,
            memberPhone: value.phone
          }
        })
        this.memberData.departmentId = this.createForm.vocation.departmentId
        this.memberData.orgLeaderedId = ''
        // console.log('部门添加人员',this.memberData)
      }
      let params = {
        memberJson: JSON.stringify(this.memberData),
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
              this.memberList.splice(i, 1)
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
      this.addMember(1)
      this.downloadExcel()
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
        this.phone = ''
        this.nickName = ''
        this.addMember()
        // 重新获取成员列表
        // this.$api.getOrgStorageList({ orgId: this.orgId }).then(res => {
        //   if (res.errorCode !== '1') return false
        //   this.memberList = res.data
        //   this.phone = ''
        //   this.nickName = ''
        // })

      })
    },
    // 删除预存成员
    delPerson(data) {
      let params = {
        orgStorageId: data.orgStorageId
      }
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        this.$api.delOrgStorage(params).then(res => {
          if (res.errorCode !== '1') return false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.addMember(1)
        })
      }).catch(_ => {
        this.$message('已取消删除')
      })
    },
    // 获取下载Excel模板
    downloadExcel() {
      this.$api.getDownloadUrl({
        orgId: this.orgId
      }).then(res => {
        if (res.errorCode === '1') {
          this.downloadUrl = res.data[0].tempPath
        } else {
          this.$message.error('获取下载模板地址失败')
        }
      })
    },
    // 导入预存人员Excel文件
    uploadExcel() {
      this.$refs.file.value = ""
      this.$refs.file.click()
    },
    handleFileChange(e) {
      let file = e.target.files[0]
      this.fileName = file.name
      this.file = file
    },
    handleImport() {
      if(this.fileName === '') {
        this.$message.warning("请先选取需要导入的文件")
        return
      }
      if (this.file.size < 10485760) {
        let formData = new FormData()
        formData.append('accessToken', localStorage.getItem('accessToken'))
        formData.append('token', this.getToken())
        formData.append('orgId', this.orgId)
        formData.append('file', this.file)
        axios({
          url: this.baseURL() + '/jianzhumobile/mobile/org/storageUpload.do',
          method: 'post',
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {
          if(res.data.errorCode === "1") {
            this.importInfoDialog = true
            this.uploadDialog = false
            this.importData = res.data.data[0]
            this.fileName = ''
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.warning('上传文件不能超过10M')
      }
    },
    getDownloadError(errorKey) {
      let strUrl = `${
                      this.baseURL()
                    }/jianzhumobile/mobile/eduWorker/workerDownload.do?accessToken=${
                      localStorage.getItem("accessToken")
                    }&token=${
                      this.getToken()
                    }&errorKey=${
                      errorKey
                    }`

      let xhr = new XMLHttpRequest()
      let fileName = "添加结果.xls" // 文件名称
      xhr.open("post", strUrl, true)
      xhr.responseType = "arraybuffer"

      xhr.onload = function() {
        if (this.status === 200) {
          let type = xhr.getResponseHeader("Content-Type")

          let blob = new Blob([this.response], { type: type })
          if (typeof window.navigator.msSaveBlob !== "undefined") {
            /*
             * IE workaround for "HTML7007: One or more blob URLs were revoked by closing
             * the blob for which they were created. These URLs will no longer resolve as
             * the data backing the URL has been freed."
             */
            window.navigator.msSaveBlob(blob, fileName)
          } else {
            let URL = window.URL || window.webkitURL
            let objectUrl = URL.createObjectURL(blob)
            if (fileName) {
              var a = document.createElement("a")
              // safari doesn't support this yet
              if (typeof a.download === "undefined") {
                window.location = objectUrl
              } else {
                a.href = objectUrl
                a.download = fileName
                document.body.appendChild(a)
                a.click()
                a.remove()
              }
            } else {
              window.location = objectUrl
            }
          }
        }
      }
      xhr.send()
    }
  },
  created() {
    this.getManageOrgList()
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
