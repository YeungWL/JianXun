<template>
  <div class="page-content-body">
    <div class="my-dialog scwj-dialog">
      <el-form ref="form" size="mini" v-model="getOrgLawListAttr">
        <el-row :gutter="24">
          <el-col :span="9">
            <el-form-item label="组织名称：" label-width="90px">
              <el-select v-model="getOrgLawListAttr.orgId" placeholder="请选择" @change="UpdateOrgDocumentList">
                <el-option v-for="item in orgList" :key="item.projectOrgId" :label="item.orgName" :value="item.projectOrgId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="查找" label-width="60px">
              <el-input v-model="getOrgLawListAttr.search" placeholder="文件名称\文号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" size="small" class="search_btn" @click="handleSearch">搜索</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" size="small" class="search_btn" @click="handleUploadFile">上传</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="text" @click="fileFormatDialogVisible = true">文件格式标准</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="page-main customTable">
        <el-table ref="multipleTable" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" :data="orgDocumentList"
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
        <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
          :current-page.sync="getOrgLawListAttr.currentPage" :page-size="getOrgLawListAttr.showCount" :total="total">
        </el-pagination>
      </div>
    </div>

    <!-- 弹框 查看文件格式标准-->
    <el-dialog title="查看文件格式标准" :visible.sync="fileFormatDialogVisible" width="30%" class="my-dialog" center>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="fileFormatDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 弹框 文库详情-->
    <el-dialog title="查看文库" :visible.sync="detailsViewDialogVisible" width="90%" class="my-dialog my-library-dialog details"
      center>
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
            <div style="margin: 10px 10px 10px 10px;" class="pos-fix">
              <div>
                <P>附件如下：</P>
              </div>
              <ul>
                <li v-for="item in viewAttachment" :key="item.index" :label="item.fileName" :value="item.fileName">
                  <div>
                    <a v-bind:href="item.filePath" target="_blank">{{item.fileName}}</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 弹框 上传文件-->
    <el-dialog title="上传文件" :visible.sync="fileUploadDialogVisible" width="80%" class="my-dialog" center>
      <div style="margin: 30px 20px 10px 10px">
        <div class="ui-form">
          <el-form ref="saveOrgLawAttr" :model="saveOrgLawAttr" label-width="90px" size="mini">
            <el-row :gutter="24">
              <el-col :span="13">
                <el-form-item label="文件名称：">
                  <el-input v-model="saveOrgLawAttr.lawName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="文号：">
                  <el-input v-model="saveOrgLawAttr.lawNo"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="9">
                <el-form-item label="发布机构：">
                  <el-input v-model="saveOrgLawAttr.deptUnit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="生效日期:">
                  <el-date-picker type="date" placeholder="选择日期" v-model="saveOrgLawAttr.validateTime" style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="添加附件:">
                  <input id="FileSelect" type="file" @change="getFile($event)">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
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
              <el-col :span="24">
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

    <!-- 弹框 修改文件-->
    <el-dialog title="修改文件" :visible.sync="fileReviseDialogVisible" width="90%" class="my-dialog">
      <div class="content_revise">
        <div class="main_content_revise">
          <div style="margin: 30px 20px 10px 10px">
            <div class="ui-form">
              <el-form ref="ReviseDetail" :model="ReviseDetail" label-width="90px" size="mini">
                <el-row :gutter="24">
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
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="发布机构：">
                      <el-input v-model="ReviseDetail.deptUnit"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="生效日期:">
                      <el-date-picker type="date" placeholder="选择日期" v-model="ReviseDetail.validateTime" style="width: 100%;"
                        value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
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
          <div style="margin: 10px 10px 10px 10px;" class="pos-fix">
            <div>
              <input id="FileSelect2" type="file" @change="getFile($event)">
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
        <el-button type="primary" @click="onEditSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CKEDITOR from "CKEDITOR";
import axios from "axios";
export default {
  name: "orgLibrary",

  data() {
    return {
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

      /* 组织列表 */
      orgList: [],

      /* 组织文库列表 */
      orgDocumentList: [],

      /** 文件详细数据 */
      fileView: [],

      /**附件列表 */
      fileList: [],

      /**附件路径列表 */
      filePathList: [],

      itemJson: [],

      viewAttachment: [],

      /* 获取组织文库列表数据 参数 */
      getOrgLawListAttr: {
        orgId: "",
        search: "",
        deptUnit: "",
        manager: "",
        showCount: 10,
        currentPage: 1 //页码
      },

      /* 修改组织文库数据 参数 */
      ReviseDetail: {
        lawName: "",
        createTime: "",
        accessToken: localStorage.getItem("accessToken"),
        token: this.getToken(),
        lawId: "",
        lawNo: "",
        deptUnit: "",
        validateTime: "",
        content: "",
        fileJson: ""
      },

      /* 添加组织文库数据 参数 */
      saveOrgLawAttr: {
        token: this.getToken(),
        accessToken: localStorage.getItem("accessToken"),
        orgId: "",
        lawName: "",
        lawNo: "",
        deptUnit: "",
        validateTime: "",
        content: "",
        file: ""
      }
    };
  },
  mounted() {
    this.getMyOrgs();
  },
  created() {},
  methods: {
    /* 获取我参与的项目 */
    getMyOrgs() {
      this.$api.getMyOrgs().then(res => {
        if (res.errorCode === "1") {
          this.orgList = res.data;
        }
      });
    },

    /* 获取组织文库列表 */
    getOrgLawList() {
      this.loading = true;
      this.$api.getOrgLawList(this.getOrgLawListAttr).then(res => {
        if (res.errorCode === "1") {
          this.orgDocumentList = res.data;
          this.total = res.totalRecords; //总共多少条数据
          this.loading = false;
        }
      });
    },

    /* 切换组织是刷新组织文库列表 */
    UpdateOrgDocumentList() {
      this.getOrgLawList();
    },

    /* 根据条件刷新组织文库列表 */
    handleSearch() {
      if (this.getOrgLawListAttr.orgId.length > 0) {
        this.getOrgLawList();
      } else {
        this.$message({
          message: "请选择要操作的组织",
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

    //列表切换相应方法
    handlePageChange(val) {
      this.getOrgLawListAttr.currentPage = val;
      this.getOrgLawList();
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

    /* 修改页面 弹框 */
    editDetails(val) {
      this.itemJson = [];
      if (this.getOrgLawListAttr.orgId.length > 0) {
        this.$api
          .watchEditLaw({
            token: this.getToken(),
            lawId: val.lawId,
            accessToken: localStorage.getItem("accessToken")
          })
          .then(res => {
            if (res.errorCode === "1") {
              if (res.data[0].law === null) {
              } else {
                this.ReviseDetail.lawId = res.data[0].law.lawId;
                this.ReviseDetail.lawName = res.data[0].law.lawName;
                this.ReviseDetail.lawNo = res.data[0].law.lawNo;
                this.ReviseDetail.content = res.data[0].law.content;
                this.ReviseDetail.createTime = res.data[0].law.createTime;
                this.ReviseDetail.deptUnit = res.data[0].law.deptUnit;
                this.ReviseDetail.validateTime = res.data[0].law.validateTime;
                for (var i = 0; i < res.data[0].fileList.length; i++) {
                  var itemData = {
                    fileName: res.data[0].fileList[i].fileName,
                    fileSize: res.data[0].fileList[i].fileSize,
                    path: res.data[0].fileList[i].path,
                    index: i,
                    fileId: res.data[0].fileList[i].fileId,
                    filePath: res.data[0].fileList[i].filePath
                  };
                  this.itemJson.push(itemData);
                }
                this.fileReviseDialogVisible = true;
                this.$nextTick(_ => {
                  for (name in CKEDITOR.instances) {
                    var editor = CKEDITOR.instances[name];
                    if (editor) {
                      editor.destroy(true);
                    }
                  }
                  CKEDITOR.replace("editor2", {
                    toolbarCanCollapse: true,
                    toolbarStartupExpanded: false,
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
          message: "请选择要操作的组织",
          type: "warning"
        });
      }
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
                    this.getOrgLawList();
                  }
                });
              } else {
              }
            })
            .catch(err => {
              this.$message.error(err);
              return false;
            });
        })
        .catch(action => {});
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
          } else {
          }
        })
        .catch(err => {
          this.$message.error(err);
          return false;
        });
    },

    submitUpload() {
      //this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},

    getFile(event) {
      if (this.fileReviseDialogVisible === true)
        var oInput = document.getElementById("FileSelect");
      else var oInput = document.getElementById("FileSelect2");

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
                  index: index,
                  fileId: "",
                  filePath: ""
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
      this.saveOrgLawAttr.content = CKEDITOR.instances.editor1.getData();
      var json = JSON.stringify(this.itemJson);
      if (this.saveOrgLawAttr.lawName.trim().length === 0) {
        this.$message({
          message: "文件名称不能为空",
          type: "warning"
        });
        return false;
      }

      if (this.saveOrgLawAttr.lawNo.trim().length === 0) {
        this.$message({
          message: "文号不能为空",
          type: "warning"
        });
        return false;
      }

      if (this.saveOrgLawAttr.deptUnit.trim().length === 0) {
        this.$message({
          message: "发布机构不能为空",
          type: "warning"
        });
        return false;
      }

      if (this.saveOrgLawAttr.validateTime.trim().length === 0) {
        this.$message({
          message: "生效日期不能为空",
          type: "warning"
        });
        return false;
      }

      this.$api
        .saveOrgLaw({
          token: this.getToken(),
          accessToken: localStorage.getItem("accessToken"),
          orgId: this.getOrgLawListAttr.orgId,
          lawName: this.saveOrgLawAttr.lawName,
          lawNo: this.saveOrgLawAttr.lawNo,
          deptUnit: this.saveOrgLawAttr.deptUnit,
          validateTime: this.saveOrgLawAttr.validateTime,
          content: this.saveOrgLawAttr.content,
          fileJson: json
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.$alert("添加文库成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.fileUploadDialogVisible = false;
                this.getOrgLawList();
              }
            });
          }
        });
    },

    //打开提交文件对话框
    handleUploadFile() {
      this.saveOrgLawAttr.lawName = "";
      this.saveOrgLawAttr.lawNo = "";
      this.saveOrgLawAttr.deptUnit = "";
      this.saveOrgLawAttr.validateTime = "";
      this.saveOrgLawAttr.content = "";

      this.itemJson = [];

      if (this.getOrgLawListAttr.orgId.length > 0) {
        this.fileUploadDialogVisible = true;
        for (name in CKEDITOR.instances) {
          var editor = CKEDITOR.instances[name];
          if (editor) {
            editor.destroy(true);
          }
        }
        this.$nextTick(_ => {
          CKEDITOR.replace("editor1", {
            toolbarCanCollapse: true,
            toolbarStartupExpanded: false,
            height: 280
          });
        });
      } else {
        this.$message({
          message: "请选择要操作的组织",
          type: "warning"
        });
      }
    },

    onEditSubmit() {
      this.ReviseDetail.content = CKEDITOR.instances.editor2.getData();
      this.editPrivateLaw();
    }
  }
};
</script>

<style lang="scss" scoped>
input[type="file"] {
  color: transparent;
}

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
