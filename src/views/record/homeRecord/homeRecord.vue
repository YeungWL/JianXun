<template>
  <div class="homeRecord">
    <div class="container">
      <div class="select">
        <el-form :inline="true">
          <el-form-item label="项目名称">
            <el-select v-model="selectProject" placeholder="请选择项目" @change="projectChange" style="width:200px;">
              <el-option v-for="item in projectList" :key="item.projectId" :label="item.proName" :value="item.projectId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组织名称" v-show="selectProject !== ''">
            <el-select v-model="selectOrg" placeholder="请选择组织" @change="orgChange" style="width:200px;">
              <el-option v-for="item in organizationList" :key="item.projectOrgId" :label="item.orgName" :value="item.projectOrgId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模版名称" v-show="selectOrg !== ''">
            <el-select v-model="orgTemplate" placeholder="请选择模版" value-key="id" style="width:200px;">
              <el-option v-for="item in logList" :key="item.id" :label="item.extendName ? item.extendName : item.tempName" :value="item">
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
          <el-button type="primary" @click="getAddTempList(0)" v-if="buttonShow" class="setion">设置</el-button>
        </div>
      </div>
    </div>

    <!-- 导出dialog -->
    <el-dialog title="导出" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="起始日期" label-width="120px">
          <el-date-picker v-model="form.beginTime" type="datetime" placeholder="开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期" label-width="120px">
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
      <ul class="setting">
        <li class="project">
          <span class="left">添加日志</span>
          <el-button icon="el-icon-plus" style="padding: 0;width: 30px;height: 32px;" @click="getTemplateList"></el-button>
        </li>
        <li class="project" v-for="item in logList" :key="item.id">
          <span class="left">{{item.extendName ? item.extendName : item.tempName}}</span>
          <span>
            <el-button style="height: 32px;" type="primary" @click="showUpdate(item.id)">修改名称</el-button>
            <el-button style="height: 32px;" type="success" @click="showInspect(item.path)">预览</el-button>
            <el-button style="height: 32px;" type="info" @click="queryBuildLog(item.id, item.typeCode)">设置参数</el-button>
          </span>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 添加日志模板dialog -->
    <el-dialog title="添加日志" :visible.sync="addDialog" class="my-dialog" width="600px">
      <div>
        <el-form :inline="true" :model="formInline">
          <el-form-item label="日志名称">
            <el-input v-model="formInline.templateName" placeholder="日志名称"></el-input>
          </el-form-item>
          <el-form-item label="工程模板">
            <el-select v-model="formInline.templateId" placeholder="工程模板">
              <el-option v-for="(item, index) in templateOption" :key="index" :label="item.name" :value="item.templateId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div>
          <div style="text-align: center;">预览</div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="bindTemplate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改名称dialog -->
    <el-dialog title="修改日志名称" :visible.sync="updateName" class="my-dialog" width="500px">
      <div>
        <el-form :inline="true" :model="updateFormInline">
          <el-form-item label="修改日志名称">
            <el-input v-model="updateFormInline.extendName" placeholder="修改日志名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateExtendName">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 预览dialog -->
    <el-dialog title="预览" :visible.sync="inspect" class="my-dialog">
      <div>
        <!-- <div style="text-align: center;">预览</div> -->
        <div>
          <img :src="imgSrc" alt="预览图片。。。" style="display: block;width: 90%;margin: 0 auto;">
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="inspect = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 设置参数dialog1 -->
    <el-dialog title="设置参数" :visible.sync="settingProp" class="my-dialog" width="560px">
      <div class="setting">
        <div class="project">
          <span class="left">分项工程</span>
          <el-button icon="el-icon-plus" style="padding: 0;width: 30px;height: 32px;"></el-button>
        </div>
        <ul class="projectList">
          <li v-for="(item, index) in itemJson" :key="index">
            <el-input v-model="item.itemName" v-show="item.edit"></el-input>
            <div style="width:380px;margin: 0 0 10px 10px;height:32px;line-height:32px;" v-show="!item.edit">{{item.itemName}}</div>
            <div v-if="!item.edit">
              <el-button class="my_button" icon="el-icon-edit" style="color:#3386e4;" @click="item.edit = !item.edit"></el-button>
              <el-button class="my_button" icon="el-icon-delete" style="color:#F56C6C;" @click="delBuildItem(item, index)"></el-button>
            </div>
            <div v-else>
              <el-button class="my_button" icon="el-icon-check" style="color:#67C23A;" @click="updateBuildItem(item)"></el-button>
              <el-button class="my_button" icon="el-icon-close" style="color:#F56C6C;" @click="item.edit = !item.edit"></el-button>
            </div>
          </li>
        </ul>
        <div class="project" style="border-top: 1px solid #DCDFE6;padding-top: 10px;">
          <span class="left">班组</span>
          <el-button icon="el-icon-plus" style="padding: 0;width: 30px;height: 32px;" @click="addGroup"></el-button>
        </div>
        <ul class="projectList">
          <li v-for="(group, index) in groupJson" :key="group.groupId">
            <el-input v-model="group.groupName" v-show="group.edit"></el-input>
            <div style="width:380px;margin: 0 0 10px 10px;height:32px;line-height:32px;" v-show="!group.edit">{{group.groupName}}</div>
            <div v-if="!group.edit">
              <el-button class="my_button" icon="el-icon-edit" style="color:#3386e4;" @click="group.edit = !group.edit"></el-button>
              <el-button class="my_button" icon="el-icon-delete" style="color:#F56C6C;" @click="delBuildGroup(group, index)"></el-button>
            </div>
            <div v-else>
              <el-button class="my_button" icon="el-icon-check" style="color:#67C23A;" @click="updateBuildGroup(group)"></el-button>
              <el-button class="my_button" icon="el-icon-close" style="color:#F56C6C;" @click="group.edit = !group.edit"></el-button>
            </div>
          </li>
        </ul>
        <div class="logTime" style="border-top:1px solid #DCDFE6;border-bottom:1px solid #DCDFE6;padding: 10px 0;">
          <span>组织负责人审阅日志时间: </span>
          <span>
            <el-input-number v-model="numTime" controls-position="right" :min="1" :max="24" size="mini" style="width:83px;"></el-input-number>
            <span>- 24</span>
          </span>
        </div>
        <div class="power">
          <div style="padding:10px 0;">查阅权限</div>
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="item" v-for="(item, index) in orgGrantJson" :key="index">{{item.orgName}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="setBuildAttr">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 设置参数dialog2 -->
    <el-dialog title="设置参数" :visible.sync="settingPropTwo" class="my-dialog" width="560px">
      <div class="setting">
        <el-form ref="form" :model="formData" label-width="100px">
          <el-form-item label="工程名称">
            <el-input v-model="formData.name" style="width:350px;" placeholder="工程名称"></el-input>
          </el-form-item>
          <el-form-item label="单位工程名称">
            <el-input v-model="formData.unitName" style="width:350px;" placeholder="单位工程名称"></el-input>
          </el-form-item>
          <el-form-item label="施工单位">
            <el-input v-model="formData.buildName" style="width:350px;" placeholder="施工单位"></el-input>
          </el-form-item>
          <el-form-item label="技术负责人">
            <el-select v-model="formData.principalId" style="width:350px;" placeholder="技术负责人">
              <el-option v-for="(item, index) in principalList" :key="index" :label="item.memberName" :value="item.memberUid"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="logTime" style="border-top:1px solid #DCDFE6;border-bottom:1px solid #DCDFE6;padding: 10px 0;">
          <span>组织负责人审阅日志时间: </span>
          <span>
            <el-input-number v-model="settingTime" controls-position="right" :min="1" :max="24" size="mini" style="width:83px;"></el-input-number>
            <span>- 24</span>
          </span>
        </div>
        <div class="power">
          <div style="padding:10px 0;">查阅权限</div>
          <el-checkbox-group v-model="selectList">
            <el-checkbox :label="item" v-for="(item, index) in orgGrantJson" :key="index">{{item.orgName}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="setBuild">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 组织图的dialog -->
    <div class="organization">
      <el-dialog title="选择日志查看人员" :visible.sync="dialogFormVisible2">
        <el-select v-model="value" placeholder="请选择">
          <el-option>
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
      imgSrc: '',
      selectProject: "", // 项目ID
      selectOrg: "", // 组织ID
      orgTemplate: {}, // 模版项的选择项
      projectList: [],
      organizationList: [],
      orgId: "",
      form: {
        name: "",
        type: [],
        beginTime: "",
        endTime: ""
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      value: "",
      demoEvents: [],
      buttonShow: false,
      addDialog: false,
      updateName: false,
      inspect: false,
      settingProp: false,
      settingPropTwo: false,
      logData: {},
      itemJson: [],
      groupJson: [],
      layerJson: [],
      orgGrantJson: [],
      templateOption: [],
      formInline: {
        templateName: '',
        templateId: '',
        user: ""
      },
      resultData: {},
      formData: {
        cityId: '',
        name: '',
        unitName: '',
        buildName: '',
        principalId: ''
      },
      principalList: [],
      numTime: "",
      settingTime: '',
      checkList: [],
      selectList: [],
      logList: [],
      updateFormInline: { // 修改模板扩展名数据
        extendName: '',
        orgTemplateId: ''
      }
    }
  },
  // watch: {
  //   test1() {
  //     let oldNum = this.test1
  //     let newNum = this.test1.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  //     console.log(newNum)
  //     this.test1 = newNum
  //     console.log(oldNum)
  //     if (this.test1.indexOf('*') === -1) {
  //       this.test2 = this.test1
  //     }
  //   }
  // },
  methods: {
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
      if ((numDays < days && numMonth == month) || numMonth < month || years < year) {
        if (this.orgId == "" || JSON.stringify(this.orgTemplate) == '{}') {
          this.$message("项目、组织或模版不能为空");
          return false;
        }
        this.$router.push({
          name: "detail",
          query: {
            orgId: this.orgId,
            logDate: day.date,
            templateId: this.orgTemplate.templateId
          }
        });
      }
      if (numDays == days && numMonth == month && year == years) {
        if (this.orgId == "" || JSON.stringify(this.orgTemplate) == '{}') {
          this.$message("项目、组织或模版不能为空");
          return false;
        }
        this.$api.isCanEdit({
          projectOrgId: this.orgId,
          orgTemplateId: this.orgTemplate.id
        }).then(res => {
          if(res.errorCode == '1') {
            if((res.data[0].role == '1' && res.data[0].status == '1') || (res.data[0].role == '0' && res.data[0].status == '1')) {
              if(this.orgTemplate.typeCode == '001') {
                this.$router.push({
                  name: "shiRecord",
                  query: {
                    orgId: this.orgId,
                    date: day.date,
                    orgTemplateId: this.orgTemplate.id
                  }
                })
              }
              if(this.orgTemplate.typeCode == '003') {
                this.$router.push({
                  name: "writeRecord",
                  query: {
                    orgId: this.orgId,
                    date: day.date,
                    orgTemplateId: this.orgTemplate.id
                  }
                })
              }
            }else {
              console.log(res)
              this.$message.warning('不可以填写日志')
            }
          }
        })
        
      }
    },
    onResultChange(val) {
      this.show = val;
    },
    //获取项目列表
    getProjectList() {
      this.$api.getMyProjectList({}).then(res => {
        if (res.errorCode === "1") {
          this.projectList = res.data
        }
      });
    },
    // 选择项目
    projectChange() {
      this.$api.getBuildOrgList({
        projectId: this.selectProject
      }).then(res => {
        if(res.errorCode == '1') {
          this.organizationList = res.data
          this.selectOrg = ''
          this.orgTemplate = {}
          this.buttonShow = false
        }
      })
    },
    // 获取自己参加的组织
    getMyOrg() {
      let params = {
        isMyCreate: 1,
        projectId: ""
      }
      this.$api.getMyOrganization(params, {}).then(res => {
        if (res.resultMsg !== "查询成功") return false;
        this.organizationList = res.data;
      })
    },
    // 选择组织
    orgChange(value) {
      this.orgId = value
      this.getAddTempList(1)
      this.$api.isChargeMan({
          projectOrgId: value
        }).then(res => {
          if (res.errorCode == "1") {
            if (
              res.data[0].isChargeMan == "0" ||
              res.data[0].isChargeMan == "1"
            ) {
              // 这里应该到请求回来之后再是true
              this.buttonShow = true;
              // this.queryBuildLog();
            } else {
              this.buttonShow = false;
            }
          }
        })
    },
    // 查阅权限改变
    // testChange(val) {
    //   let result = val.map(item => {
    //     return {
    //       orgId: item.orgId,
    //       orgName: item.orgName,
    //       orgTemplateId: item.orgTemplateId,
    //       selected: 1
    //     }
    //   })
    //   console.log(result)
    // },
    // 负责人获取日志设置项
    queryBuildLog(tId, typeCode) {
      if(this.selectProject == '') {
        this.$message.warning('缺少参数')
        return
      }
      this.$api.queryBuildLog({
        orgId: this.orgId,
        projectId: this.selectProject,
        orgTemplateId: tId
      }).then(res => {
        console.log(res.data[0])
        if (res.errorCode == "1") {
          if(typeCode == '003') {
            // 房屋建设设置dialog
            this.settingProp = true
            res.data[0].itemJson.map(value => {
              value.edit = false
            })
            res.data[0].groupJson.map(value => {
              value.edit = false
            })
            for(let i = 0; i < res.data[0].orgGrantJson.length; i++) {
              if(res.data[0].orgGrantJson[i].selected == 1) {
                this.checkList.push(res.data[0].orgGrantJson[i])
              }
            }
            res.data[0].orgTemplateId = tId
            this.logData = res.data[0]
            this.itemJson = res.data[0].itemJson
            this.groupJson = res.data[0].groupJson
            this.orgGrantJson = res.data[0].orgGrantJson
            this.layerJson = res.data[0].layerJson
            this.numTime = res.data[0].approveTime
          }
          if(typeCode == '001') {
            // 市政工程设置dialog
            this.settingPropTwo = true
            res.data[0].orgTemplateId = tId
            this.resultData = res.data[0]
            this.settingTime = res.data[0].approveTime
            this.orgGrantJson = res.data[0].orgGrantJson
            for(let i = 0; i < res.data[0].orgGrantJson.length; i++) {
              if(res.data[0].orgGrantJson[i].selected == 1) {
                this.selectList.push(res.data[0].orgGrantJson[i])
              }
            }
            this.principalList = res.data[0].principalList
            this.formData.name = res.data[0].cityPolicy.name
            this.formData.unitName = res.data[0].cityPolicy.unitName
            this.formData.buildName = res.data[0].cityPolicy.buildName
            this.formData.principalId = res.data[0].cityPolicy.principalId
            this.formData.cityId = res.data[0].cityPolicy.cityId || ''
          }
        }
      })
    },
    // 获取模板分页列表
    getTemplateList() {
      this.$api.getTemplateList().then(res => {
        console.log(res)
        if(res.errorCode === "1") {
          this.addDialog = true
          this.templateOption = res.data
        }
      })
    },
    // 组织关联模版
    bindTemplate() {
      this.$api.orgBindTemplate({
        orgId: this.orgId,
        templateName: this.formInline.templateName,
        templateId: this.formInline.templateId
      }).then(res => {
        if(res.errorCode === '1') {
          this.addDialog = false
          this.getAddTempList(0)
        }
      })
    },
    // 获取关联日志列表
    getAddTempList(valueItem) {
      this.$api.getAddTempListData({
        orgId: this.orgId
      }).then(res => {
        if(res.errorCode === '1') {
          this.logList = res.data
          if(valueItem == 0) {
            this.dialogFormVisible1 = true
          } else {
            this.$message.warning(res.resultMsg)
          }
        }
      })
    },
    // 展示弹窗
    showUpdate(tId) {
      this.updateName = true
      this.updateFormInline.orgTemplateId = tId
    },
    // 修改模板扩展名称
    updateExtendName() {
      if(this.updateFormInline.extendName == '') {
        this.$message.warning('修改名称不能为空')
        return
      }
      this.$api.updateExtendName(this.updateFormInline).then(res => {
        console.log(res)
        if(res.errorCode === '1') {
          this.updateName = false
          this.getAddTempList()
        }
      })
    },
    // 修改分项工程项
    updateBuildItem(data) {
      if (data.itemName == "") {
        this.$message.warning("分项工程名称不能为空");
        return;
      } else if (data.itemId == "") {
        data.edit = !data.edit;
        return;
      }
      this.$api
        .updateBuildItem({
          itemId: data.itemId,
          itemName: data.itemName
        })
        .then(res => {
          if (res.errorCode == "1") {
            this.$message.success("修改成功");
            data.edit = !data.edit;
          }
        });
    },
    // 删除分项工程项
    delBuildItem(data, index) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (data.itemId !== "") {
            this.$api
              .delBuildItem({
                itemId: data.itemId,
                isDeleted: "Y"
              })
              .then(res => {
                if (res.errorCode == "1") {
                  this.$message.success("删除成功");
                  this.queryBuildLog();
                }
              });
          } else {
            this.itemJson.splice(index, 1);
          }
        })
        .catch(() => {
          this.$message.warning("已取消删除");
        });
    },
    // 添加分项工程项
    addItem() {
      let itemData = {
        edit: true,
        itemId: "",
        itemName: "",
        orderNo: ""
      };
      this.itemJson.push(itemData);
    },
    // 添加工作组项
    addGroup() {
      let groupData = {
        edit: true,
        groupId: "",
        groupName: "",
        orderNo: ""
      };
      this.groupJson.push(groupData);
    },
    // 修改工作组项
    updateBuildGroup(data) {
      if (data.groupName == "") {
        this.$message.warning("班组名称不能为空");
        return;
      } else if (data.groupId == "") {
        data.edit = !data.edit;
        return;
      }
      this.$api.updateBuildGroup({
          groupId: data.groupId,
          groupName: data.groupName
        }).then(res => {
          if (res.errorCode == "1") {
            this.$message.success("修改成功");
            data.edit = !data.edit;
          }
        })
    },
    // 删除工作组项
    delBuildGroup(data, index) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (data.groupId !== "") {
            this.$api
              .delBuildGroup({
                groupId: data.groupId,
                isDeleted: "Y"
              })
              .then(res => {
                if (res.errorCode == "1") {
                  this.$message.success("删除成功");
                  this.queryBuildLog();
                }
              });
          } else {
            this.groupJson.splice(index, 1);
          }
        })
        .catch(() => {
          this.$message.warning("已取消删除");
        });
    },
    setBuild() {
      let cityPolicy = {
        'cityPolicyJson': this.formData
      }
      let result = this.selectList.map(item => {
        return {
          orgId: item.orgId,
          orgName: item.orgName,
          grantId: item.grantId,
          selected: 1
        }
      })
      let orgBind = {
        'orgBindJson': result
      }
      console.log(orgBind)
      this.$api.setBuildAttr({
        orgId: this.resultData.orgId,
        orgTemplateId: this.resultData.orgTemplateId,
        approveTime: this.settingTime,
        projectId: this.selectProject,
        cityPolicyJson: JSON.stringify(this.formData),
        orgBindJson: JSON.stringify(orgBind)
      }).then(res => {
        console.log(res)
        if(res.errorCode == '1') {
          this.settingPropTwo = false
        }
      })
    },
    // 预览弹窗
    showInspect(value) {
      this.inspect = true
      this.imgSrc = value
    },
    // 负责人设置分项内容
    setBuildAttr() {
      let item = {
        itemJson: this.itemJson
      }
      let group = {
        groupJson: this.groupJson
      }
      let layer = {
        layerJson: this.layerJson
      }
      let result = []
        console.log(11)
        result = this.checkList.map(item => {
          return {
            orgId: item.orgId,
            orgName: item.orgName,
            orgTemplateId: item.orgTemplateId,
            selected: 0
          }
        })
      
      let orgBind = {
        'orgBindJson': result
      }
      this.$api.setBuildAttr({
          orgId: this.logData.orgId,
          orgTemplateId: this.logData.orgTemplateId,
          approveTime: this.numTime,
          projectId: this.selectProject,
          itemJson: JSON.stringify(item),
          groupJson: JSON.stringify(group),
          layerJson: JSON.stringify(layer),
          orgBindJson: JSON.stringify(orgBind)
        }).then(res => {
          console.log(res)
          if (res.errorCode == "1") {
            this.settingProp = false
          }
        })
    }
  },
  created() {
    this.getProjectList();
  }
};
</script>

<style lang="scss" scoped>
.homeRecord {
  margin: 20px;
  display: block;
  background: #ffffff;
  .container {
    max-width: 940px;
    min-width: 720px;
    // width: 850px;
    padding: 20px;
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
    padding: 20px 40px;
  }
  .project {
    width: 482px;
    display: flex;
    justify-content: space-between;
    padding: 7px 0;
    line-height: 32px;
  }
  .projectList {
    width: 482px;
    margin-top: 10px;
    li {
      display: flex;
      justify-content: space-between;
      .el-input {
        width: 380px;
        margin: 0 0 10px 10px;
      }
      .my_button {
        padding: 0;
        font-size: 16px;
        width: 30px;
        height: 32px;
        text-align: center;
      }
    }
  }

  .organization {
    .el-select {
      width: 500px;
      margin-top: 10px;
    }
  }
}
</style>