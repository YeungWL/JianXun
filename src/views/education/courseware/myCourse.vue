<template>
  <div class="page-content-body">
      <div class="page-header clearfix">
        <el-form :inline="true" :model="listQuery" ref="form">
          <!--<el-form-item label="组织：" >
            <el-select v-model="listQuery.orgId" placeholder="请选择" class="item-org">
              <el-option v-for="item in orgList" :key="item.orgId" :label="item.orgName" :value="item.orgId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课件编码：">
            <el-input v-model="listQuery.bianma" clearable></el-input>
          </el-form-item>-->
          <el-form-item label="课件名称：">
            <el-input v-model="listQuery.title" clearable></el-input>
          </el-form-item>          
          <el-form-item>
            <el-button type="primary"  icon="el-icon-search">搜索</el-button>
          </el-form-item>         
          <div class="btn-group fr">
            <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加课件</el-button>
          </div>                        
        </el-form>
      </div>
      <!--  table开始  -->
      <div class="page-main customTable">
        <el-table ref="multipleTable" style="width: 100%" v-loading="loading"  element-loading-text="拼命加载中"
          :data="tableData">
          <!--<el-table-column type="selection" min-width="57"></el-table-column>-->
          <!--<el-table-column prop="bianma" label="课件编码" min-width="100" show-overflow-tooltip></el-table-column>-->
          <el-table-column prop="title" label="课件名称" min-width="250" show-overflow-tooltip></el-table-column>
          <el-table-column prop="time" label="上传时间" min-width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="共享状态" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if='scope.row.status === "0"' class="green">开放</span>
              <span v-else class="red">私有</span>  
            </template>               
          </el-table-column> 
          <el-table-column label="操作" min-width="120">
            <template slot-scope="scope"> 
             <span class="btn" title="修改"  @click="handleUpdate(scope.row)">
                <i class="iconfont icon-edit iconblue"></i>
              </span>
              <span class="btn"  @click="handelDelete(scope.row)" title="删除">
                <i class="iconfont icon-del iconred"></i>
              </span>                
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页组件 -->
      <ui-pagination :total="total" @change="getPages" class="pb60"></ui-pagination>
            

  </div>
</template>

<script>
const gradeOptions = [{'id':'1','name':'公司级'},{ 'id':'2','name':'项目级'},{'id':'3','name':'土木班'}];
const statusOptions = [{'id':'0','name':'开'},{ 'id':'1','name':'关'}];  
export default {
  name: 'courseware',
  data() {
    return {
      orgList: [
        {orgId:'1',orgName:'中铁一局集团广州市轨道交通二十一号线工程施工20标项目经理部'},
        {orgId:'2',orgName:'中铁十六局集团广州市轨道交通二十一号线工程施工16标项目经理部'}
      ],          
      tableData: [
        {bianma:'10001',title:'中华人民共和国安全生产法',time:'2018-10-07',status:'0'},
        {bianma:'10002',title:'中华人民共和国安全生产法',time:'2018-10-07',status:'1'}
      ],      
      listQuery: { 
        orgId: '',
        bianma: '',  
        title: '',
        grade: '',
        status: '',
        showCount: '',
        currentPage: ''           
      }, 
      gradeArr: gradeOptions,
      statusArr: statusOptions,
      loading: false,      
      total: 0,
      choiceCoursehDialogVisible: false,
    }   
  },
  created() {

  },
  methods: { 
    getPages(currentPage, pageSize) {
        // 获取翻页数据
        this.listQuery.currentPage = currentPage
        this.listQuery.showCount = pageSize
        // this.getList(this.listQuery)
    },
    // 分页
    handlePageChange(val) {
      this.listQuery.currentPage = val
      // this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      // this.getList()
    },     
    // 删除
    handelDelete(data) {
        this.$api.deleteQues({           
            questionId: data.questionId
        })
        .then(response => {
          if (response.errorCode === '1') {
            this.$message.success('删除成功！')
            this.getList()
          } else {
            this.$message.warning(response.resultMsg)
          }
        })
        .catch(error => {
          this.$message.error(error)
          return false
        })      
    },
    // 新增课件
    handleCreate() {
      this.$router.push({
        path: "/education/addCourse",
        query: { projectId: this.listQuery.projectId}
      })
    },                  
  }
}
</script>
<style lang="scss" scoped>
</style>
