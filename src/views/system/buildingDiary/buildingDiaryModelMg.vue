<template>
  <div class="page-content-body">
      <div class="page-header clearfix">
        <el-form class="search-form" :inline="true" :model="listQuery" ref="form">
          <el-form-item label="模板名称：">
            <el-input v-model="listQuery.name" @change="handleSearch" clearable></el-input>
          </el-form-item>
          <el-form-item label="模板编码：">
            <el-input v-model="listQuery.batchCode" @change="handleSearch" clearable></el-input>
          </el-form-item>                         
          <el-form-item>
            <el-button type="primary"  icon="el-icon-search" @click="handleSearch">查询</el-button>
          </el-form-item>
          <div class="btn-group fr">
            <el-button type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>        
          </div>              
        </el-form>
      </div>
      <!--  table开始  -->
      <div class="page-main customTable">
        <el-table ref="multipleTable" style="width: 100%" v-loading="loading"  element-loading-text="拼命加载中" :data="tableData">
          <!--<el-table-column type="selection" min-width="57"></el-table-column>-->
          <el-table-column prop="name" label="模板名称" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="batchCode" label="编码" min-width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="typeCode" label="模板类型" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="path" label="模板样例图" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if='scope.row.path != null' class="img-view" @click="handelView(scope.row.path)"><img :src="scope.row.path" alt="" width="20px" height="30px"></span>
              <span v-else >暂无</span>
            </template>
          </el-table-column>            
          <el-table-column prop="isDeleted" label="状态" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if='scope.row.isDeleted == "N"' class="green">正常</span> 
              <span v-else class="gray">删除</span> 
            </template>               
          </el-table-column> 
          <el-table-column prop="createTime" label="创建时间" min-width="160"  show-overflow-tooltip sortable></el-table-column>
          <el-table-column label="操作" min-width="120">
            <template slot-scope="scope"> 
              <span class="btn" title="编辑" @click="handleUpdate(scope.row)"><i class="iconfont icon-edit editicon"></i></span>             
              <span class="btn" v-if='scope.row.isDeleted == "N"' 
                @click="handelDelete(scope.row,'Y')" title="删除">
                <i class="iconfont icon-del delicon"></i>
              </span>
              <span class="btn" v-else @click="handelDelete(scope.row,'N')">恢复</span> 
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页组件 -->
      <ui-pagination :total="total" @change="getPages"></ui-pagination>
    <!-- 新增/编辑 -->
    <el-dialog :title="titleMap[dialogStatus]"
               :visible.sync="logsDialogVisible"
               :close-on-click-modal='false'
               width="30%" class="my-dialog">
      <div class="dialog-content">
        <div class="ui-form">
          <el-form ref="logsForm" :rules="rules" label-width="100px" :model="logsForm" class='my-form'>
            <el-form-item label="模板名称" prop="name">
              <el-input v-model="logsForm.name"></el-input>
            </el-form-item>
            <el-form-item label="模板编码" prop="batchCode">
              <el-input v-model="logsForm.batchCode" @blur="validateCheckTemplateCode(false)" @change="validateCheckTemplateCode(true)"></el-input>
            </el-form-item>
            <el-form-item label="模板类型" prop="typeCode">
              <el-input v-model="logsForm.typeCode"></el-input>
            </el-form-item>
            <el-form-item label="模板样例图" prop="path">
              <user-upload v-if="logsForm.path"
                          :imgSrc="logsForm.path"
                          ref="img"
                          accept="image/*"
                          theme="light"
                          size="small"
                          @onChange="setFileChange"></user-upload>
              <user-upload v-else
                          ref="img"
                          accept="image/*"
                          theme="light"
                          size="small"
                          @onChange="setFileChange"></user-upload>              
            </el-form-item>            
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="handleClose" >取 消</el-button>
        <el-button type="primary" v-if="dialogStatus === 'create'"  @click="create()">提 交</el-button>
        <el-button type="primary" v-if="dialogStatus === 'update'" @click="update()">提 交</el-button>  
      </span>
    </el-dialog>
        <el-dialog title="查看模板样例图"
               :visible.sync="imgDialogVisible"
               :close-on-click-modal='false'
               width="50%" class="my-dialog">
      <div class="dialog-content">
          <img :src="imgUrl" alt="模板样例图">
      </div>
    </el-dialog>
  </div>
</template>
<script>
import userUpload from 'components/upload/userUpload.vue'
export default {
  components: {
    userUpload
  },   
  name: 'buildingDiary',
  data() {
    return {      
      tableData: [], 
      isIndeterminate: false,        
      listQuery: { 
        name: '',  
        batchCode: '',
        isDeleted:'',
        pageSize: '',
        currentPage: ''           
      }, 
      loading: true,      
      total: 0,
      multipleSelection:[],
      logsDialogVisible: false,
      imgDialogVisible: false,
      imgUrl:'',
      titleMap: {
        update: '修改信息',
        create: '新增施工日志模板'
      },
      dialogStatus: '',
      logsForm: {
        templateId: '',
        name: '',
        batchCode:'',
        typeCode:'',
        path:''
      },       
      rules: {
        name: [{ required: true, message: '请输入模板名称', trigger: 'blur', pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '允许中文、英文字母、数字！'}],
        batchCode: [{ required: true, message: '请输入编码', trigger: 'blur'}],
        typeCode: [{ required: true, message: '请输入类型', trigger: 'blur' }]
      }             
    }   
  },
  mounted() {
    this.getList()
  },  
  created() {
    // 请求第一页数据
    this.listQuery.currentPage = this.$route.query.currentPage ? parseInt(this.$route.query.currentPage) : 1
  },
  methods: {    
    // 获取列表数据
    getList() {
      this.loading = true
      // 获取列表
      this.$api.getAttrTemplateList(this.listQuery).then(response => {     
        if (response.errorCode === '1') { 
          this.loading = false            
          this.tableData = response.data
          this.total = response.totalRecords
        }      
      })    
    },
    getPages(currentPage, pageSize) {
        // 获取翻页数据
        this.listQuery.currentPage = currentPage
        this.listQuery.pageSize = pageSize
        this.getList(this.listQuery)
    },
    // 分页
    handlePageChange(val) {
      this.listQuery.currentPage = val
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },       
    // 查询 
    handleSearch() {  
      this.getList()
    },
    // 关闭弹窗
    handleClose() {
      this.logsDialogVisible = false
      this.$refs.logsForm.resetFields()
    },
    // 新增弹窗
    handleCreate() {
      this.dialogStatus = "create"
      this.logsDialogVisible = true
      this.$nextTick(_ => {
        this.$refs.logsForm.resetFields()
        this.logsForm['name'] = ''
        this.logsForm['batchCode'] = ''
        this.logsForm['typeCode'] = ''
        this.logsForm['path'] = ''     
      })  
    },    
    // 编辑弹窗
    handleUpdate(data) {   
      this.dialogStatus = 'update'
      this.logsDialogVisible = true
      this.$nextTick(_ => {
        this.$refs.logsForm.resetFields()
        this.logsForm.templateId = data.templateId
        this.logsForm.name = data.name
        this.logsForm.batchCode = data.batchCode
        this.logsForm.typeCode = data.typeCode
        this.logsForm.path = data.path
        console.log(data.path) 
      })
    },
    // 修改时，传递过来的图片信息
    setFileChange(file, name) {
      // let _this = this
      // let imgurl = _this.$refs.img.dataUrl
      // console.log("imgurl"+imgurl)
    },
    handelView(val){
       this.imgDialogVisible = true
       this.imgUrl = val
    },     
    // 验证模板编码唯一性
    validateCheckTemplateCode(isChange) {
      if (this.logsForm.batchCode) {
        if (!isChange) return
        this.$api.checkTemplateCode({
          batchCode: this.logsForm.batchCode,
          templateId: this.logsForm.templateId
        }).then(response => {
          if (response.data[0].isExist) {
            this.$message.warning(response.resultMsg)
            return false
          }
        })
      }
    },      
    // 新增提交
    create() {
      let _this = this
      let imgurl = _this.$refs.img.dataUrl.replace(/^data:image\/(jpeg|png|gif);base64,/, "")
      _this.logsForm.path = imgurl
      delete this.logsForm.templateId  
      _this.$refs.logsForm.validate(valid => {
        if (valid) {
          _this.$api.addAttrTemplate(_this.logsForm).then(response => {
            if (response.errorCode === '1') {
              _this.getList()
              _this.$message.success('新建成功！')
              _this.logsDialogVisible = false
            } else {
              _this.$message.warning(response.resultMsg)
            }
          })
        } else {
          return false
        }
      })
    },
    // 编辑提交
    update(data) {  
      let _this = this
      let imgurl = _this.$refs.img.dataUrl.replace("data:image/png;base64,", "")       
      _this.logsForm.path = imgurl
      _this.$refs.logsForm.validate(valid => {
        if (valid) {
          _this.$api.updateAttrTemplate(_this.logsForm).then(response => {
            if (response.errorCode === '1') {
              _this.getList()
              _this.$message.success('修改成功！')
              _this.logsDialogVisible = false
            } else {
              _this.$message.warning(response.resultMsg)
            }
          }).catch(error => {
            _this.$message.error(error)
          })
        } else {
          return false
        }
      })
    },        
    handelDelete(data,val) {
        this.$api.delAttrTemplate({           
            templateId: data.templateId,
            isDeleted: val
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
    } 
  }    
}
</script>

<style lang="scss" scoped>
.img-view{
  display: inline-block;
  width: 30px;
}
</style>