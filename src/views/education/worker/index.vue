<template>
  <div class="page-content-body">
      <div class="page-header clearfix">
        <el-form class="search-form" :inline="true" :model="listQuery" ref="form">
          <el-form-item label="组织：" >
            <el-select v-model="listQuery.orgId" placeholder="请选择" class="item-org">
              <el-option v-for="item in orgList" :key="item.orgId" :label="item.orgName" :value="item.orgId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="listQuery.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机：">
            <el-input v-model="listQuery.phone" clearable></el-input>
          </el-form-item>          
          <el-form-item label="班组：">
            <el-select v-model="listQuery.grade" placeholder="请选择" >
              <el-option v-for="item in gradeArr" :key="item.id" :label="item.name" :value="item.id">
                <span>{{item.name}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间：">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择入场时间" value-format="yyyy-MM-dd" v-model="listQuery.startTime"   
                :picker-options="pickerOptions0" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择退场时间" value-format="yyyy-MM-dd" v-model="listQuery.endTime"
                :picker-options="pickerOptions1" style="width: 100%;"></el-date-picker>
              </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  icon="el-icon-search">搜索</el-button>
          </el-form-item>         
          <div class="btn-group fr">
            <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加工人</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="importBatchDialogVisible = true">批量导入</el-button>
          </div>                        
        </el-form>
      </div>
      <!--  table开始  -->
      <div class="page-main customTable">
        <el-table ref="multipleTable" style="width: 100%" v-loading="loading"  element-loading-text="拼命加载中"
          :data="tableData">
          <!--<el-table-column type="selection" min-width="57"></el-table-column>-->
          <el-table-column prop="name" label="姓名" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" label="手机号码" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="grade" label="所在班组" min-width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="startTime" label="入场时间" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="endTime" label="退场时间" min-width="160" show-overflow-tooltip></el-table-column>          
          <el-table-column prop="status" label="开通考学" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if='scope.row.status === "0"' class="green">开</span>
              <span v-else class="red">关</span>  
            </template>               
          </el-table-column> 
          <el-table-column label="操作" min-width="120">
            <template slot-scope="scope"> 
              <span class="btn" title="修改"  @click="handleUpdate(scope.row)">
                <i class="iconfont icon-edit iconblue"></i>
              </span>  
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页组件 -->
      <ui-pagination :total="total" @change="getPages" class="pb60"></ui-pagination>

      <!-- 弹框 添加工人-->
      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="workerDialogVisible" width="35%" class="my-dialog">
        <div class="dialog-content">
          <div class="ui-form">
            <el-form ref="workerForm" :model="workerForm" label-width="100px">
              <el-form-item label="姓名"  prop="workername" :rules="rules.workername">
                <el-input v-model="workerForm.workername" :disabled="dialogStatus === 'update'" auto-complete="off" @blur="validateCheckworkerUnique(false)" @change="validateCheckworkerUnique(true)" ></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone"  :rules="rules.phone">
                <el-input v-model="workerForm.phone"  @blur="validateCheckPhone(false)" @change="validateCheckPhone(true)"></el-input>
              </el-form-item>
               <el-form-item label="所在班组" prop="grade"  :rules="rules.grade">
                <el-select v-model="workerForm.grade" placeholder="请选择">
                  <el-option v-for="item in gradeArr" :key="item.id" :label="item.name" :value="item.id">
                    <span>{{item.name}}</span>
                  </el-option>
                </el-select> 
              </el-form-item>
              <el-form-item label="入场时间" prop="enterTime" :rules="rules.enterTime">
                <el-date-picker
                  v-model="workerForm.enterTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="开通考学" prop="isOpen">
                <el-radio v-model="radio" label="1">开</el-radio>
                <el-radio v-model="radio" label="2">关</el-radio>
              </el-form-item>                                                       
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose" >取 消</el-button>
          <el-button type="primary" v-if="dialogStatus === 'create'"  @click="create()">提 交</el-button>
          <el-button type="primary" v-if="dialogStatus === 'update'" @click="update()">提 交</el-button>
        </span>
      </el-dialog>

    <!--批量导入-->
    <el-dialog title="批量新增" :visible.sync="importBatchDialogVisible" size="tiny" class="my-dialog batchAddWorkerDialog">
      <div class="dialog-content">
        <el-form label-width="80" class="ui-form">
          <el-form-item prop="group_id" label="温馨提示">
            <p>1.工人信息需符合定义的模板格式，且文件大小不超过20M.</p>
            <p>2.请核对系统中组别的名称,若班组名称不正确,导入后班组为空,请导入后手动选择班组. </p>
          </el-form-item>
          <el-form-item prop="group_id" label="导入文件">
            <el-input disabled v-model="fileName"></el-input>
            <el-button size="small" type="primary" @click="handleUpload">浏览</el-button>
            <input type="file" name="file" ref="file" @change="handleFileChange" style="display:none">
            <span class="handle" @click="download" ref="download">下载模板文件</span>
            <span v-if="loading" class="loading"><i class="el-icon-loading"></i></span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleImport">导入</el-button>
      </span>
    </el-dialog>      

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
        {name:'张三',phone:'13800138000',grade:'公司级',status:'0'},
        {name:'李四',phone:'13800138000',grade:'项目部级',status:'1'}
      ],          
      listQuery: { 
        orgId: '',
        name: '',  
        phone: '',
        grade: '',
        status: '',
        startTime: '',
        endTime: '',
        showCount: '',
        currentPage: ''           
      }, 
      // 限制结束时间不能大于开始时间 
      pickerOptions0: {
        disabledDate: (time) => {
          let endDateVal = this.listQuery.endTime;
          if ( endDateVal != "") {
              return time.getTime() > Date.now() || time.getTime() > endDateVal;
          } else {
              return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          let beginDateVal = this.listQuery.startTime;
          if (beginDateVal) {
            return (
              time.getTime() < new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },            
      gradeArr: gradeOptions,
      statusArr: statusOptions,
      loading: false,      
      total: 0,
      titleMap: {
        update: '修改工人',
        create: '添加工人'
      },
      dialogStatus: '',      
      workerDialogVisible: false,
      workerForm: {
        workerId: '',
        isOpen: '',
        grade: '',
        name: '',
        phone: '',
        enterTime: ''
      },
      radio:'1',
      rules: {
        workername: [{ required: true, message: '请输入用户名', trigger: 'blur', pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{5,20}$/, message: '5-20位字符（至少包含数字、字母、特殊字符其中两种）'}],
        phone: [{ required: true, trigger: 'blur', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的电话格式！'}],       
        grade: [{ required: true, message: '请选择班组', trigger: 'blur' }],
        enterTime: [{ required: true, message: '请选择入场时间', trigger: 'blur' }]
      },
      // 批量导入
      importBatchDialogVisible: false,
      fileName: "",
      file: "",
      loading: false,
      batchAddDisable: false, // 批量录入用户确定按钮是否可用
      progress: {
        // 上传进度条模拟
        show: false, // 是否显示进度条
        textInside: true, // 文字是否显示在进度条中
        strokeWidth: 18, // 进度条宽度
        percentage: 0, // 百分比
        status: "success" // 状态
      },
      progressDialogVisible: false, // 进度条遮罩
      playProgressTimer: ""
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
    // 验证用户名唯一性
    validateCheckworkerUnique(isChange) {
      this.$api.checkworkerUnique({
        workerName: this.workerForm.workername,
        workerId: ''
      }).then(response => {
        if (response.errorCode === '1') {
          this.$message.success('该用户账号可以正常使用！')
          return true
        } else {
          this.$message.warning(response.resultMsg)
          return false
        }
      })
    },
    // 验证手机号唯一性
    validateCheckPhone(isChange) {
      if (this.workerForm.phone) {
        if (!isChange) return
        this.$api.checkworkerName({
          workerName: this.workerForm.phone,
          actionCode: ''
        }).then(response => {
          if (response.errorCode === '1') {
            this.$message.success('该手机号码可以正常使用！')
            return true
          } else {
            this.$message.warning(response.resultMsg)
            return false
          }
        })
      }
    }, 
    // 关闭弹窗
    handleClose() {
      this.choiceCoursehDialogVisible = false
    },
    // 新增弹窗
    handleCreate() {
      this.dialogStatus = "create"
      this.workerDialogVisible = true
      this.$nextTick(_ => {
        this.$refs.workerForm.resetFields()
        this.workerForm['workername'] = ''
        this.workerForm['name'] = ''
        this.workerForm['phone'] = ''  
        this.workerForm['grade'] = ''
        this.workerForm['entertime'] = ''
      })  
    },    
    // 编辑弹窗
    handleUpdate(data) {
      this.dialogStatus = "update"
      this.workerDialogVisible = true
      this.$nextTick(_ => {
        this.$refs.workerForm.resetFields()
        this.workerForm['workerId'] = data.workerId
        this.workerForm.entertime = data.entertime
        this.workerForm.name = data.name
        this.workerForm.phone = data.phone
        this.workerForm.grade = data.grade
      })
    },    
    // 新增提交
    create() {
      this.$refs.workerForm.validate(valid => {
        if (valid) {
          delete this.workerForm.workerId
          this.$api.addworker(this.workerForm).then(response => {
            if (response.errorCode === '1') {
              this.getList()
              this.$message.success("新建成功！")
              this.workerDialogVisible = false
            } else {
              this.$message.warning(response.resultMsg)
            }
          })
        } else {
          return false
        }
      })
    },
    // 编辑提交
    update(data) {
      this.$refs.workerForm.validate(valid => {
        if (valid) {

          this.$api.updateworker(this.workerForm).then(response => {
            if (response.errorCode === '1') {
              // this.getList()
              this.$message.success('修改成功！')
              this.workerDialogVisible = false
            } else {
              this.$message.warning(response.resultMsg)
            }
          }).catch(error => {
            this.$message.error(error)
          })
        } else {
          return false
        }
      })
    },
    // 下载模板文件
    download() {
      downLoadFile("user.download-student-import-template");
    },
    // 选中上传文件窗口
    handleUpload() {
      this.$refs.file.value = ""; // 解决重复点击上传的BUG
      this.$refs.file.click();
    },
    // 已选中文件的处理
    handleFileChange(e) {
      let file = e.target.files[0];
      this.fileName = file.name;
      this.file = file;
    },
    // 文件导入
    handleImport() {
      if (this.fileName === "") {
        this.$message.warning("请先选取需要导入的文档");
        return;
      }
      this.loading = true;
      let formData = new FormData();
      formData.append("students", this.file);
      this.$api.organize.importTeacherInfo(formData).then(response => {
        if (response.success) {
          this.$message.success("导入成功！");
          this.batchData = response.data;
          this.batchData.forEach(element => {
            element.id = Math.random();
          });
          this.loading = false;
          this.importBatchDialogVisible = false;
          this.fileName = "";
        } else {
          this.loading = false;
          this.$message.error(response.message);
        }
      });
    }                       
  }
}
</script>
<style lang="scss" scoped>
.batchAddWorkerDialog p{
  line-height: 30px;
}
</style>
