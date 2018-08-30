<template>
  <div class="organizationStructure">
    <message v-model="showMessage" :visitor="visitor"></message>
    <div class="header">
      <el-row>
        项目：
        <el-select v-model="orgList" placeholder="请选择" @change="selectOrgList" style="width:400px;margin-top:10px;">
          <el-option v-for="item in project" :key="item.projectId" :label="item.proName" :value="item.orgList">
          </el-option>
        </el-select>
        组织：
        <el-select v-model="projectOrgId" placeholder="请选择" @change="selectOrg" style="width:400px;margin-top:10px;">
          <el-option v-for="item in orgList" :key="item.projectOrgId" :label="item.orgName" :value="item.projectOrgId">
            <span>{{item.orgName}}{{item.status}}</span>
          </el-option>
        </el-select>

      </el-row>
    </div>
    <div class="content">
      <el-row>
        <Organization-View :render-data="structure" :prop="setting">
          <template slot="card" slot-scope="prop">
            <ul class="department">
              <li class="departmentName">
                {{prop.departmentName}}
              </li>
              <li class="member" :key="member.departmentId" v-for="member in prop.memberList" @dblclick="openMessage(member)">
                <img class="avatar" :src="member.logoUrl" alt="">
                <span>
                  <span class="fl">姓名</span>
                  <span>{{member.memberName}}</span>
                  <span class="fr">({{member.headRole|headRole}})</span>
                </span>
              </li>
            </ul>
          </template>
        </Organization-View>
      </el-row>
    </div>
  </div>
</template>
<style lang="scss">
.organizationStructure {
  margin: 10px;
  overflow-y: auto;
  .department {
    width: 200px;
    padding-bottom: 10px;
    .departmentName {
      line-height: 30px;
      font-size: 15px;
      font-weight: 900;
      // margin-bottom: 5px;
    }

    .member {
      padding: 0px 5px;
      line-height: 30px;
      margin: 5px 0px;
      cursor: pointer;
      .avatar {
        display: inline-block;
        vertical-align: middle;
        width: 30px;
        height: 30px;
      }
      & > span {
        display: inline-block;
        width: 120px;
        border-bottom: 1px solid black;
        box-sizing: border-box;
        height: 24px;

        .fl {
          float: left;
        }
        .fr {
          float: right;
        }
      }
    }
  }
  .content {
    width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
<script>
import message from './message'

export default {
  name: 'organizationStructure',
  components: {
    message
  },
  data() {
    return {
      showMessage: false,
      project: [],
      orgList: [],
      projectOrgId: '',
      org: {},
      structure: [],
      setting: {
        classname: 'structure',
        children: 'departmentList'
      },
      visitor: {}
    }
  },
  async created() {
    let data = {
        token: this.getToken(),
        accessToken: localStorage.getItem('accessToken')
      },
      ctx = {}
    await this.$api.getOrganizationList(data, ctx)
    this.project = ctx.data
  },
  methods: {
    selectOrgList(orgList) {
      if (orgList.length) {
        this.projectOrgId = orgList[0].projectOrgId
        this.org = orgList[0]
        this.getOrganizationInfo()
      } else {
        this.projectOrgId = ''
      }
    },
    selectOrg(projectOrgId) {
      for (let i = 0; i < this.orgList.length; i++) {
        if (this.orgList[i].projectOrgId == projectOrgId) {
          this.org = this.orgList[i]
          this.getOrganizationInfo()
          break
        }
      }
    },
    async getOrganizationInfo() {
      let data = {
          token: this.getToken(),
          accessToken: localStorage.getItem('accessToken'),
          projectOrgId: this.projectOrgId
        },
        ctx = {}
      await this.$api.getOrganizationInfo(data, ctx)
      let newStructure = [ctx.data[0].orgLeaderedList]
      newStructure[0].departmentList = ctx.data[0].departmentList
      newStructure[0].departmentName = newStructure[0].orgLeadered
      newStructure[0].departmentId = 'root'
      console.log(JSON.stringify(newStructure), newStructure[0])
      this.structure = newStructure
    },
    openMessage(item) {
      this.visitor = item
      this.showMessage = true
    }
  }
}
</script>
