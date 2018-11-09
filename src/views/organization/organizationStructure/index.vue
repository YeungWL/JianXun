<template>
<div class="page-content-body">
  <div class="organizationStructure">
    <message v-model="showMessage" :visitor="visitor"></message>
    <div class="page-header clearfix">
      <el-form :inline="true">
        <el-form-item label="项目：">
          <el-select v-model="orgList" placeholder="请选择" @change="selectOrgList" style="width:320px;" value-key="orgList">
            <el-option v-for="item in project" :key="item.projectId" :label="item.proName" :value="item.orgList">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组织：">
        <el-select v-model="projectOrgId" placeholder="请选择" @change="selectOrg" style="width:320px;">
          <el-option v-for="item in orgList" :key="item.projectOrgId" :label="item.orgName" :value="item.projectOrgId">
            <span>{{item.orgName}}</span>
          </el-option>
        </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <el-row>
        <Organization-View :render-data="structure" :prop="setting">
          <template slot="card" slot-scope="prop">
            <ul class="department" :class="prop.departmentName==='组织负责人' ?'departmentManager':''">
              <li class="departmentName">
                {{prop.departmentName}}
              </li>
              <li class="member" :key="member.departmentId" v-for="member in prop.memberList" @dblclick="openMessage(member)">
                <img class="avatar" :src="member.logoUrl" alt="">
                <i class="tag" v-show="member.headRole !='4'" :class="member.headRole==='0'|| member.headRole==='2'?'tagzz':'tagfz'">{{member.headRole|headRole}}</i>
                <span>
                  <span>{{member.memberName}}</span>
                </span>
              </li>
            </ul>
          </template>
        </Organization-View>
      </el-row>
    </div>
  </div>
</div>
</template>
<style lang="scss">
.organizationStructure {
  margin: 10px;
  overflow-y: auto;
  .root{ 
    .branch {
      .card .line-row, .card  .line-column{
        //  background-color: #6c8fb2;
         background-color: #b1b1b1;
      }   
      .card-solt{
        min-height: 85px;
        // border-color: #6c8fb2;
        // background: #d7e2ee;
        border-color: #b1b1b1;
        background: #f5f5f5;        
      }
    }
   }
  .department {
    width: 147px;
    // padding-bottom: 10px;
    &.departmentManager{
      width: auto;
      .member {
        display: inline-block;
        & > span {
        text-align: left;
        padding-left: 20px;        
        }
      }
    }
    .departmentName {
      line-height: 30px;
      font-size: 15px;
      font-weight: 900;
      // background: #6c8fb2;
      background: #7a7a7a;
      color: #fff;
    }
    .member {
      padding: 10px 10px;
      line-height: 30px;
      margin: 5px 0px;
      cursor: pointer;
      position: relative;
      .avatar {
        // display: inline-block;
        vertical-align: middle;
        width: 30px;
        height: 30px;
        float: left;
      }
      & > span {
        display: inline-block;
        width: 80px;
        box-sizing: border-box;
        height: 24px;
        text-align: left;
        padding-left: 15px;        
        }
      .tag{
        color: #fff;
        font-size: 12px;
        padding: 0 5px;
        width: auto;
        font-style: normal;
        margin-left: -10px; 
        position: absolute;
        top: 15px;
        height: 14px;
        line-height: 14px;
        left: 40px;       
        &.tagzz{
          background:#f56c6c;
        }
        &.tagfz{
          background:#e6a23c;
        }          
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
    // width: 900px;
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
    this.orgList = ctx.data[0].orgList
    // console.log(this.project)
    this.selectOrgList(this.orgList)
  },
  methods: {
    selectOrgList(orgList) {
      // console.log(orgList)
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
      // console.log(JSON.stringify(newStructure), newStructure[0])
      this.structure = newStructure
    },
    openMessage(item) {
      this.visitor = item
      this.showMessage = true
    }
  }
}
</script>
