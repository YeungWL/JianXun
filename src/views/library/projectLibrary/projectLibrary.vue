<template>
  <div class="page-content-body">
    <div>
      <el-form :inline="true" ref="form" size="mini" v-model="getProjectLawListAttr">
        <el-form-item label="项目名称：">
          <el-select v-model="getProjectLawListAttr.projectId" placeholder="请选择" @change="UpdateProjectDocumentList">
            <el-option v-for="item in projectList" :key="item.projectId" :label="item.proName" :value="item.projectId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件名称：">
          <el-input v-model="getProjectLawListAttr.lawName" placeholder="文件名称"></el-input>
        </el-form-item>
        <el-form-item label="文号：">
          <el-input v-model="getProjectLawListAttr.lawNo" placeholder="文号"></el-input>
        </el-form-item>
        <el-form-item label="发布机构：">
          <el-input v-model="getProjectLawListAttr.deptUnit" placeholder="发布机构"></el-input>
        </el-form-item>
        <el-form-item label="管理人：">
          <el-input v-model="getProjectLawListAttr.manager" placeholder="管理人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" class="search_btn" @click="handleSearch">搜索</el-button>
          <el-button type="primary" size="small" class="search_btn" @click="handleUploadFile">上传</el-button>
          <el-button type="text" @click="fileFormatDialogVisible = true">文件格式标准</el-button>
        </el-form-item>
      </el-form>
      <el-tabs v-model="getProjectLawListAttr.typeId" type="card" @tab-click="tabNameHandleClick">
        <el-tab-pane v-for="item in lawType" :label="item.name" :name="item.bianma" :key="item.index"></el-tab-pane>
      </el-tabs>
      <div class="page-main customTable">
        <el-table ref="multipleTable" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" :data="projectDocumentList"
          key="ArcDataArr">
          <el-table-column prop="lawName" label="文件名称" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lawNo" label="文号" min-width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="deptUnit" label="发布机构" min-width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="validateTime" label="生效时间" min-width="50"></el-table-column>
          <el-table-column prop="creator" label="上传人" min-width="40"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="edit" @click="deletedocument(scope.row)">删除</span>
              <span class="edit" @click="editDetails(scope.row)">修改</span>
              <span class="edit" @click="documentDetails(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange" :current-page.sync="getProjectLawListAttr.currentPage"
          :page-size="getProjectLawListAttr.showCount" :total="total">
        </el-pagination>
      </div>
    </div>
    
    <!-- 弹框 查看文件格式标准-->
    <el-dialog title="查看文件格式标准" :visible.sync="fileFormatDialogVisible" width="30%" class="my-dialog">
      <div class="dialog-content">
        <p>格式标准：
          <span class="red">（当前只能导入word文本文档）</span>
        </p>
        <ul>
          <li>1、总标题、编、章标题：小二黑体居中，行前行后各0.5行，单倍行间距，前后无空行；</li>
          <li>2、文号：小四宋体居中，无缩进，行前行后各0行，1.5倍行间距；</li>
          <li>3、正文：小四宋体居左，首行缩进2字符，段前无空格，行前行后各0行，1.5倍行间距；</li>
          <li>4、章、条号后空一格；</li>
          <li>5、行尾无手动换行符；</li>
          <li>6、文头、文尾无空行；</li>
          <li>7、文号与发布文间空一行，发布文与正文间空一行；</li>
          <li>8、只能导入word文本文档。</li>
        </ul>
      </div>
      <div class="dialog-footer">
        <el-button @click="fileFormatDialogVisible = false">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 弹框 文库详情-->
    <el-dialog title="查看文库" :visible.sync="detailsViewDialogVisible" width="90%" class="my-dialog my-library-dialog" center>
      <div>
        <div class="content_revise">
          <div class="main_content_revise">
            <div class="page-content">
              <div class="divBox">
                <div class="left"></div>
                <div class="right">
                  <div class="inner-left">阅读量： {{fileView.readCount}}</div>
                </div>
              </div>
              <div class="meta_list">
                <h1 class="title" v-model:title="fileView.lawName">{{fileView.lawName}}</h1>
                <div class="divBox">
                  <div class="left-1">发布机构：{{fileView.deptUnit}}</div>
                  <div class="right-1">文号：{{fileView.lawNo}}</div>
                </div>
                <div class="divBox">
                  <el-row>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">管理人: {{fileView.creator}}</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple-light">上传时间：{{fileView.createTime}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">生效时间：{{fileView.validateTime}}</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="content-summary" id="para" v-html="fileView.content">
              </div>
            </div>
          </div>
          <div class="enclosure_revise">
            <div style="margin: 10px 10px 10px 10px">
              <div>
                <P>附件如下：</P>
              </div>
              <ul>
                <li v-for="item in viewAttachment" :key="item.index" :label="item.fileName" :value="item.fileName">
                  <div>
                    <a v-bind:href="item.filePath">{{item.fileName}}</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 弹框 修改文件-->
    <el-dialog title="上传文件" :visible.sync="fileReviseDialogVisible" width="80%" class="my-dialog">
      <div class="content_revise">
        <div class="main_content_revise">
          <div style="margin: 30px 20px 10px 10px">
            <div class="ui-form">
              <el-form ref="ReviseDetail" v-model="ReviseDetail" label-width="90px" size="mini">
                <el-row :gutter="23">
                  <el-col :span="13">
                    <el-form-item label="文件名称：">
                      <el-input :disabled="true" v-model="ReviseDetail.lawName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="文号：">
                      <el-input v-model="ReviseDetail.lawNo"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="23">
                  <el-col :span="9">
                    <el-form-item label="发布机构：">
                      <el-input v-model="ReviseDetail.deptUnit"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="生效日期:">
                      <el-date-picker type="date" placeholder="选择日期" v-model="ReviseDetail.validateTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                    <el-form-item>
                      <ul>
                        <li v-for="item in itemJson" :key="item.index" :label="item.fileName" :value="item.fileName">
                          <div>{{item.fileName}}
                            <el-button class="my_button" icon="el-icon-delete" @click="delBuildItem(item)" round></el-button>
                          </div>
                        </li>
                      </ul>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                    <el-form-item>
                      <textarea style="resize:none" class="ckeditor" id="editor2" name="content"></textarea>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
        <div class="enclosure_revise">
          <div style="margin: 10px 10px 10px 10px">
            <div>
              <input id="FileSelect" type="file" @change="getFile($event)">
            </div>
            <div>
              <P>附件如下：</P>
            </div>
            <ul>
              <li v-for="item in itemJson" :key="item.index" :label="item.fileName" :value="item.fileName">
                <div>{{item.fileName}}
                  <el-button class="my_button" icon="el-icon-delete" @click="delBuildItem(item)" type size="small"></el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="fileReviseDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onEditSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 弹框 上传文件 -->
    <el-dialog title="上传文件" :visible.sync="fileUploadDialogVisible" width="80%" class="my-dialog">
      <div style="margin: 30px 20px 10px 10px">
        <div class="ui-form">
          <el-form ref="saveProjectLawAttr" :model="saveProjectLawAttr" label-width="90px" size="mini">
            <el-row :gutter="23">
              <el-col :span="8">
                <el-form-item label="文件名称：">
                  <el-input v-model="saveProjectLawAttr.lawName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文号：">
                  <el-input v-model="saveProjectLawAttr.lawNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="发布机构：">
                  <el-input v-model="saveProjectLawAttr.deptUnit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="23">
              <el-col :span="8">
                <el-form-item label="生效日期:">
                  <el-date-picker type="date" placeholder="选择日期" v-model="saveProjectLawAttr.validateTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="文件状态：" prop="valid">
                  <el-select v-model="saveProjectLawAttr.valid" placeholder="请选择">
                    <el-option v-for="item in validType" :key="item.index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <form>
                  <input id="FileSelect" type="file" @change="getFile($event)">
                </form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="文件属性：" prop="type">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                  <el-checkbox-group v-model="checkedLawType" @change="handleCheckedLawTypeChange" class="check_item">
                    <el-checkbox v-for="item in EditLawType" :label="item.bianma" :key="item.index">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item>
                  <ul>
                    <li v-for="item in itemJson" :key="item.index" :label="item.fileName" :value="item.fileName">
                      <div>{{item.fileName}}
                        <el-button class="my_button" icon="el-icon-delete" @click="delBuildItem(item)" round></el-button>
                      </div>
                    </li>
                  </ul>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item>
                  <textarea style="resize:none" class="ckeditor" id="editor1" name="content"></textarea>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fileUploadDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onfileUploadSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CKEDITOR from "CKEDITOR";
import axios from "axios";
export default {
  name: "projectLibrary",

  data() {
    return {
      /**new add start*/
      isIndeterminate: false,

      validType: [
        {
          value: "1",
          label: "有效"
        },
        {
          value: "0",
          label: "无效"
        }
      ],

      checkAll: false, //全选
      checkedLawType: [], //选择的文档类型

      viewAttachment: [],

      /* 项目列表 */
      projectList: [],

      /* 项目文库列表 */
      projectDocumentList: [],

      /* 获取项目文库列表数据 参数 */
      getProjectLawListAttr: {
        projectId: "",
        deptUnit: "",
        manager: "",
        typeId: "",
        lawNo: "",
        lawName: "",
        showCount: 10,
        currentPage: 1 //页码
      },

      /** 文库类型 */
      lawType: [],
      /**new add end*/

      /* 加载 */
      loading: false,

      /* 查看文件详情 */
      detailsViewDialogVisible: false,

      /* 修改文件 */
      fileReviseDialogVisible: false,

      /* 查看文件格式弹框 */
      fileFormatDialogVisible: false,

      /* 上传文件弹框 */
      fileUploadDialogVisible: false,

      /** 从后台获取文库的总个数 */
      total: 0, //总共多少条数据

      /* 项目列表 */
      projectList: [],

      /* 项目文库列表 */
      projectDocumentList: [],

      /** 文件详细数据 */
      fileView: [],

      /* 修改项目文库数据 参数 */
      ReviseDetail: {
        lawName: "",
        createTime: "",
        accessToken: localStorage.getItem("accessToken"),
        token: this.getToken(),
        lawId: "",
        lawNo: "",
        deptUnit: "",
        validateTime: "",
        content: ""
      },

      itemJson: [],
      EditLawType: [],

      /* 添加项目文库数据 参数 */
      saveProjectLawAttr: {
        projectId: "",
        lawNo: "",
        lawName: "",
        deptUnit: "",
        typeIdAttrs: [],
        validateTime: "",
        valid: "",
        content: "",
        fileJson: ""
      }
    };
  },

  mounted() {
    this.lawAttrList();
    this.getMyPros();
  },

  created() {},

  methods: {
    /**new add start*/

    /* 获取我参与的项目 */
    getMyPros() {
      this.$api.getMyPros().then(res => {
        if (res.errorCode === "1") {
          this.projectList = res.data;
        }
      });
    },

    //获取文库属性列表
    lawAttrList() {
      this.$api
        .lawAttr({
          zidianCode: "PROJECT_LAW"
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.lawType[0] = {
              bianma: "",
              jb: 2,
              name: "全部",
              orderBy: 0,
              parentId: "",
              pbm: "",
              zdId: ""
            };

            for (var i = 0; i < res.data.length; i++) {
              this.lawType[i + 1] = res.data[i];
              this.EditLawType[i] = res.data[i];
            }
          }
        });
    },

    /* 获取项目文库列表 */
    getProjectLawList() {
      if (this.getProjectLawListAttr.projectId.length === 0) {
        this.$message({
          message: "请选择要操作的项目",
          type: "warning"
        });
        return false;
      }
      this.loading = true;

      this.$api.getProjectLawList(this.getProjectLawListAttr).then(res => {
        if (res.errorCode === "1") {
          this.projectDocumentList = res.data;
          this.total = res.totalRecords; //总共多少条数据
          this.loading = false;
        }
      });
    },

    /* 切换项目是刷新项目文库列表 */
    UpdateProjectDocumentList() {
      this.saveProjectLawAttr.projectId = this.getProjectLawListAttr.projectId;
      this.getProjectLawList();
    },

    //文库类型查询
    tabNameHandleClick(tab, event) {
      this.getProjectLawListAttr.typeId = tab.name;
      this.getProjectLawList();
    },

    //列表切换相应方法
    handlePageChange(val) {
      this.getProjectLawListAttr.currentPage = val;
      this.getProjectLawList();
    },

    /* 根据条件刷新项目文库列表 */
    handleSearch() {
      if (this.getProjectLawListAttr.projectId.length > 0) {
        this.getProjectLawList();
      } else {
        this.$message({
          message: "请选择要操作的项目",
          type: "warning"
        });
      }
    },

    //删除附件
    delBuildItem(item) {
      this.$api
        .canCelFile({
          path: this.itemJson[item.index].path,
          fileId: this.itemJson[item.index].fileId,
          accessToken: localStorage.getItem("accessToken"),
          token: this.getToken()
        })
        .then(res => {
          if (res.errorCode === "1") {
            var tempitem = [];
            for (var i = 0; i < this.itemJson.length; i++) {
              if (i != item.index) {
                tempitem.push(this.itemJson[i]);
              }
            }
            var tempitem2 = [];
            for (var i = 0; i < tempitem.length; i++) {
              tempitem[i].index = i;
              tempitem2.push(tempitem[i]);
            }
            this.itemJson = tempitem2;
          }
        });
    },

    //删除文件
    deletedocument(val) {
      this.$confirm("是否确认删除文件？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "不删除"
      })
        .then(() => {
          this.$api
            .deleteLaw({
              token: this.getToken(),
              lawId: val.lawId,
              accessToken: localStorage.getItem("accessToken")
            })
            .then(res => {
              if (res.errorCode === "1") {
                this.$alert("删除文库成功", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {
                    this.fileReviseDialogVisible = false;
                    this.getProjectLawList();
                  }
                });
              }
            })
            .catch(err => {
              this.$message.error(err);
              return false;
            });
        })
        .catch(action => {});
    },

    //打开提交文件对话框
    handleUploadFile() {
      this.itemJson = [];
      if (this.getProjectLawListAttr.projectId.length > 0) {
        this.fileUploadDialogVisible = true;
        this.$nextTick(_ => {
          for (name in CKEDITOR.instances) {
            var editor = CKEDITOR.instances[name];
            if (editor) {
              editor.destroy(true);
            }
          }
          CKEDITOR.replace("editor1", {
            height: 280
          }).setData(this.ReviseDetail.content);
        });
      } else {
        this.$message({
          message: "请选择要操作的项目",
          type: "warning"
        });
      }
    },

    /* 修改页面 弹框 */
    editDetails(val) {
      this.ReviseDetail = [];
      this.itemJson = [];

      if (this.getProjectLawListAttr.projectId.length > 0) {
        this.$api
          .watchEditLaw({
            token: this.getToken(),
            lawId: val.lawId,
            accessToken: localStorage.getItem("accessToken")
          })
          .then(res => {
            if (res.errorCode === "1") {
              this.fileReviseDialogVisible = true;
              if (res.data[0].law != null) {
                this.ReviseDetail.lawId = res.data[0].law.lawId;
                this.ReviseDetail.lawName = res.data[0].law.lawName;
                this.ReviseDetail.lawNo = res.data[0].law.lawNo;
                this.ReviseDetail.content = res.data[0].law.content;
                this.ReviseDetail.createTime = res.data[0].law.createTime;
                this.ReviseDetail.deptUnit = res.data[0].law.deptUnit;
                this.ReviseDetail.validateTime = res.data[0].law.validateTime;
                var index = 0;
                for (var i = 0; i < res.data[0].fileList.length; i++) {
                  if (this.itemJson.length > 0) {
                    index = this.itemJson.length;
                  }
                  let itemData = {
                    fileName: res.data[0].fileList[i].fileName,
                    fileId: res.data[0].fileList[i].fileId,
                    fileSize: res.data[0].fileList[i].fileSize,
                    path: res.data[0].fileList[i].path,
                    index: index
                  };
                  this.itemJson.push(itemData);
                }
                this.$nextTick(_ => {
                  for (name in CKEDITOR.instances) {
                    var editor = CKEDITOR.instances[name];
                    if (editor) {
                      editor.destroy(true);
                    }
                  }
                  CKEDITOR.replace("editor2", {
                    height: 280
                  }).setData(this.ReviseDetail.content);
                });
              }
            }
          })
          .catch(err => {
            this.$message.error(err);
            return false;
          });
      } else {
        this.$message({
          message: "请选择要操作的项目",
          type: "warning"
        });
      }
    },

    onEditSubmit() {
      this.ReviseDetail.content = CKEDITOR.instances.editor2.getData();
      this.editPrivateLaw();
    },

    // 修改文库
    editPrivateLaw() {
      var json = JSON.stringify(this.itemJson);
      this.ReviseDetail.fileJson = json;
      this.$api
        .editPrivateLaw(this.ReviseDetail)
        .then(res => {
          if (res.errorCode === "1") {
            this.$alert("修改文库成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.fileReviseDialogVisible = false;
              }
            });
          }
        })
        .catch(err => {
          this.$message.error(err);
          return false;
        });
    },

    /* 查看页面 弹框 */
    documentDetails(val) {
      this.$api
        .watchLaw({
          token: this.getToken(),
          lawId: val.lawId,
          accessToken: localStorage.getItem("accessToken")
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.fileView = res.data[0].law;
            this.viewAttachment = res.data[0].fileList;
            this.detailsViewDialogVisible = true;
          }
        })
        .catch(err => {
          this.$message.error(err);
          return false;
        });
    },

    /**new add end*/

    //全选文档类型
    handleCheckAllChange(val) {
      let allLawTypeId = [];
      let allLawTypeName = [];

      if (val) {
        this.lawType.forEach(item => {
          allLawTypeId.push(item.bianma); //得到全部文档类型ID，用于搜索
          allLawTypeName.push(item.name); //得到全部文档类型名称，用于返显选中状态
        });

        this.saveProjectLawAttr.typeIdAttrs = allLawTypeId;
      } else {
        this.saveProjectLawAttr.typeIdAttrs = [];
      }
      this.checkedLawType = val ? this.saveProjectLawAttr.typeIdAttrs : [];
      // this.checkedLawType = val ? allLawTypeName : [];
      this.isIndeterminate = false;
    },
    //选中文档类型
    handleCheckedLawTypeChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.lawType.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.lawType.length;
      this.saveProjectLawAttr.typeIdAttrs = value;
    },

    getFile(event) {
      var oInput = document.getElementById("FileSelect");
      if (this.itemJson.length >= 10) {
        this.$message({
          message: "附件最多是10个 ！！！",
          type: "warning"
        });
        oInput.value = ""; //虽然file的value不能设为有字符的值，但是可以设置为空值
        oInput.outerHTML = oInput.outerHTML; //重新初始化了file的html
        return false;
      }

      //判断是否已经选择文件
      if (oInput.value.length > 0) {
        //判断文件大小10485760 10M
        if (event.target.files[0].size < 10485760) {
          var formData = new FormData();
          formData.append("file", event.target.files[0]);
          formData.append("token", this.getToken());
          formData.append("accessToken", localStorage.getItem("accessToken"));

          axios({
            url:
              "http://120.25.121.72//jianzhumobile/mobile/privateLaw/uploading.do",
            method: "post",
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
            .then(re => {
              if (re.data.errorCode === "1") {
                var index = 0;
                if (this.itemJson.length > 0) {
                  index = this.itemJson.length;
                }

                let itemData = {
                  fileName: re.data.data.fileName,
                  fileSize: re.data.data.fileSize,
                  path: re.data.data.path,
                  index: index
                };
                this.itemJson.push(itemData);

                oInput.value = ""; //虽然file的value不能设为有字符的值，但是可以设置为空值
                //oInput.outerHTML = oInput.outerHTML; //重新初始化了file的html
              } else {
                this.$message({
                  message: "操作失败，请重试！！！",
                  type: "warning"
                });
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          this.$message({
            message: "附件大于10MB, 不给上传！！！",
            type: "warning"
          });
        }
      } else {

      }
    },

    onfileUploadSubmit() {
      this.saveProjectLawAttr.content = CKEDITOR.instances.editor1.getData();
      var tmpLawType = "";

      if (this.saveProjectLawAttr.lawName.trim().length === 0) {
        this.$message({
          message: "文件名称不能为空",
          type: "warning"
        });
        return false;
      }

      if (this.saveProjectLawAttr.lawNo.trim().length === 0) {
        this.$message({
          message: "文号不能为空",
          type: "warning"
        });
        return false;
      }

      if (this.saveProjectLawAttr.deptUnit.trim().length === 0) {
        this.$message({
          message: "发布机构不能为空",
          type: "warning"
        });
        return false;
      }

      if (this.saveProjectLawAttr.validateTime.trim().length === 0) {
        this.$message({
          message: "生效日期不能为空",
          type: "warning"
        });
        return false;
      }

      if (this.saveProjectLawAttr.validateTime.trim().length === 0) {
        this.$message({
          message: "文件属性不能为空",
          type: "warning"
        });
        return false;
      }

      //获取用户选择文件属性
      for (var val of this.saveProjectLawAttr.typeIdAttrs) {
        if (tmpLawType.length === 0) {
          tmpLawType = val;
        } else {
          tmpLawType = tmpLawType + "-" + val;
        }
      }

      var json = JSON.stringify(this.itemJson);
      this.$api
        .saveProjectLaw({
          projectId: this.saveProjectLawAttr.projectId,
          lawName: this.saveProjectLawAttr.lawName,
          lawNo: this.saveProjectLawAttr.lawNo,
          deptUnit: this.saveProjectLawAttr.deptUnit,
          validateTime: this.saveProjectLawAttr.validateTime,
          content: this.saveProjectLawAttr.content,
          fileJson: json,
          typeIdAttrs: tmpLawType,
          valid: 0
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.$alert("添加文库成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.fileUploadDialogVisible = false;
                this.getProjectLawList();
              }
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-content {
  max-width: 90%; // margin:10px 5px 15px 20px;
  margin: auto; // position: absolute;
}

.divBox {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}

.content_revise {
  // margin: 0 auto;
  display: flex;
}

.main_content_revise {
  flex: 80% 0;
}

.left {
  float: left;
  width: 70%;
  height: 100%;
  text-align: left;
}

.right {
  margin-left: 70%;
  height: 100%;
}

.inner-left {
  float: left;
  width: 70%;
  height: 100%;
  text-align: center;
}

.meta_list {
  margin-bottom: 10px;
  background-color: #ebeaea;
  border-top: 3px solid #ddd;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
}

.title {
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: 400;
  font-size: 18px;
  padding-left: 10px;
  line-height: 1.4;
}

.left-1 {
  float: left;
  width: 50%;
  height: 100%;
  text-align: left;
}

.right-1 {
  margin-left: 59%;
  height: 100%;
  text-align: right;
}
</style>
