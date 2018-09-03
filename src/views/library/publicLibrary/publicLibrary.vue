<template>
  <div class="page-content-body">
    <div class="ui-form">
      <el-form ref="form" v-model="listForm" size="mini">
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="文件名称：" label-width="90px">
              <el-input v-model="listForm.lawName" placeholder="文件名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="文号：" label-width="60px">
              <el-input v-model="listForm.lawNo" placeholder="文号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="发布机构：" label-width="90px">
              <el-input v-model="listForm.deptUnit" placeholder="发布机构"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item label="文件类型：" prop="typeId" label-width="85px">
              <el-select v-model="listForm.typeId" placeholder="请选择">
                <el-option v-for="item in lawType" :key="item.index" :label="item.name" :value="item.bianma">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="上架状态：" prop="putaway" label-width="85px">
              <el-select v-model="listForm.putaway" placeholder="请选择">
                <el-option v-for="item in manageType" :key="item.index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="效力：" prop="valid" label-width="60px">
              <el-select v-model="listForm.valid" placeholder="请选择">
                <el-option v-for="item in validType" :key="item.index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态：" prop="status" label-width="60px">
              <el-select v-model="listForm.status" placeholder="请选择">
                <el-option v-for="item in statusType" :key="item.index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="上传人：" label-width="70px">
              <el-input v-model="listForm.manager" placeholder="上传人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="9">
            <el-form-item label="区域：" v-show="isShowArea" label-width="60px">
              <el-select v-model="listForm.provinceCode" placeholder="请选择省" @change="getProv()">
                <el-option v-for="item in provinceOptions" :key="item.areaId" :label="item.name" :value="item.areaCode">
                </el-option>
              </el-select>
              <el-select v-if="listForm.provinceCode!=''" v-model="listForm.cityCode" placeholder="请选择市" @change="getCity()">
                <el-option v-for="item in citys" :key="item.areaId" :label="item.name" :value="item.areaCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item>
              <el-button type="primary" size="small" class="search_btn" @click="handleSearch">搜索</el-button>
              <el-button type="primary" size="small" class="search_btn" @click="handleUploadFile">上传</el-button>
              <el-button type="text" @click="fileFormatDialogVisible = true">文件格式标准</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-tabs v-model="cateId" type="card" @tab-click="tabNameHandleClick">
        <el-tab-pane v-for="item in lawCate" :label="item.name" :name="item.bianma" :key="item.index"></el-tab-pane>
      </el-tabs>
      <div class="page-main customTable">
        <el-table ref="multipleTable" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" :data="tablelist"
          key="ArcDataArr">
          <el-table-column prop="lawName" label="文件名称" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lawNo" label="文号" min-width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="deptUnit" label="发布机构" min-width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="validateTime" label="生效时间" min-width="80"></el-table-column>
          <el-table-column prop="readCount" label="阅读量" min-width="50"></el-table-column>
          <el-table-column prop="creator" label="上传人" min-width="60"></el-table-column>
          <el-table-column label="效力" min-width="40">
            <template slot-scope="scope"> {{ scope.row.valid=== "0"? '无效' : '有效' }}</template>
          </el-table-column>
          <el-table-column label="状态" min-width="40">
            <template slot-scope="scope">
              <span class="edit" @click="documentAudit(scope.row)">{{ scope.row.status=== "Y"? '通过' :
                scope.row.status=== "N"? '待审' : '拒绝' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <span class="edit" @click="editDetails(scope.row)">修改</span>
              <span class="edit" @click="documentPublicHandle(scope.row)">{{ scope.row.putaway=== "Y"? '下架' : '上架' }}</span>
              <span class="edit" @click="documentDetails(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" @current-change="handlePageChange"
          :current-page.sync="listForm.currentPage" :page-size="listForm.showCount" :total="total">
        </el-pagination>
      </div>
    </div>

    <!-- 弹框 文库复核-->
    <el-dialog title="文库复核" :visible.sync="fileViewDialogVisible" width="70%" class="my-dialog my-library-dialog"
      center>
      <div>
        <div class="page-content">
          <div class="divBox">
            <div class="left"></div>
            <div class="right">
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
                  <div class="grid-content bg-purple">有效期至：{{fileView.expireTime}}</div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="content-summary" id="para" v-html="fileView.content">
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="tip-box">注：复核只针对合法性和格式，不涉及内容准确性，内容准确性由文件管理人负责。</div>
        <el-button @click="handleReject">不同意</el-button>
        <el-button type="primary" @click="handleApprove">同意</el-button>
      </span>
      <el-dialog width="30%" title="提示" :visible.sync="ApproveVisible" append-to-body center>
        <span>复核成功！</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ApproveVisible = false">返回</el-button>
        </span>
      </el-dialog>

      <!--弹框 复核不同意意见  -->
      <el-dialog width="30%" title="提示" :visible.sync="RejectVisible" append-to-body center>
        <div>复核不同意意见：</div>
        <el-checkbox-group v-model="rejectReasonIllegalVisible">
          <el-checkbox size="small" label="非法" border>非法</el-checkbox>
        </el-checkbox-group>
        <textarea style="margin-top: 6px" v-show="rejectReasonIllegalVisible" v-model="detailReasonIllegal" rows="1"
          cols="60"></textarea>
        <el-checkbox-group v-model="rejectReasonInconformityVisible">
          <el-checkbox size="small" label="格式不符合要求" border>格式不符合要求</el-checkbox>
        </el-checkbox-group>
        <textarea style="margin-top: 6px" v-show="rejectReasonInconformityVisible" v-model="detailReasonInconformity"
          rows="1" cols="60"></textarea>
        <el-checkbox-group v-model="rejectReasonDuplicateVisible">
          <el-checkbox size="small" label="与当前文库中文档重复" border>与当前文库中文档重复</el-checkbox>
        </el-checkbox-group>
        <textarea style="margin-top: 6px" v-show="rejectReasonDuplicateVisible" v-model="detailReasonDuplicate" rows="1"
          cols="60"></textarea>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleRejectReason">确定</el-button>
        </span>
      </el-dialog>
    </el-dialog>

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
    <el-dialog title="查看文库" :visible.sync="detailsViewDialogVisible" width="70%" class="my-dialog my-library-view-dialog">
      <div>
        <div class="page-content">
          <div class="divBox">
            <div class="left"></div>
            <div class="right">
              <div class="inner-left">阅读量： {{fileView.readCount}}</div>
              <!-- <div class="inner-right" @click="dialogVisible = true">举报</div> -->
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
                  <div class="grid-content bg-purple">生效时间：{{fileView.expireTime}}</div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="content-summary" id="para" v-html="fileView.content">
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 弹框 上传文件-->
    <el-dialog title="上传文件" :visible.sync="fileUploadDialogVisible" width="80%" class="my-dialog scwj-dialog" center>
      <div style="width:100%;margin: 30px 20px 10px 10px">
        <div class="ui-form">
          <el-form ref="fileEditForm" :model="fileEditForm" label-width="90px" size="mini">
            <el-row :gutter="24">
              <el-col :span="13">
                <el-form-item label="文件名称：">
                  <el-input v-model="fileEditForm.lawName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="文号：">
                  <el-input v-model="fileEditForm.lawNo"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="发布机构：">
                  <el-input v-model="fileEditForm.deptUnit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="生效日期:">
                  <el-date-picker type="date" placeholder="选择日期" v-model="fileEditForm.validateTime" style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="效力状态: ">
                  <el-radio-group v-model="fileEditForm.valid">
                    <el-radio label="1">有效</el-radio>
                    <el-radio label="0">失效</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="23">
              <el-col :span="8">
                <el-form-item label="文件类别：">
                  <el-select v-model="fileEditForm.cateId" placeholder="请选择文件类别" @change="abc">
                    <el-option v-for="item in lawCate" :label="item.name" :value="item.bianma" :key="item.index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="区域：" v-show="isShowArea">
                  <el-select v-model="fileEditForm.provinceCode" placeholder="请选择省" @change="getProvUpload()">
                    <el-option v-for="item in provinceOptions" :key="item.areaId" :label="item.name" :value="item.areaCode">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item v-show="isShowArea">
                  <el-select v-if="fileEditForm.provinceCode!=''" v-model="fileEditForm.cityCode" placeholder="请选择市"
                    @change="getCityUpload()">
                    <el-option v-for="item in citys" :key="item.areaId" :label="item.name" :value="item.areaCode">
                    </el-option>
                  </el-select>
                </el-form-item>
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
                  <textarea style="resize:none" class="ckeditor" id="editor1" name="content"></textarea>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">

        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 弹框 修改文件-->
    <el-dialog title="修改文件" :visible.sync="fileReviseDialogVisible" width="96%" class="my-dialog" center>
      <div class="content_revise">
        <div class="left_3">
          <div style="margin: 10px 10px 10px 10px">
            <p>复核意见：</p>
            <div class="red" id="para" v-html="auditOpinion"> </div>
          </div>
        </div>
        <div style="width:100%; margin: 30px 20px 10px 10px">
          <div>
            <div class="ui-form">
              <el-form ref="ReviseDetail" :model="ReviseDetail" size="mini">
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="文件名称：" label-width="90px">
                      <el-input :disabled="true" v-model="ReviseDetail.lawName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="文号：" label-width="60px">
                      <el-input v-model="ReviseDetail.lawNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="发布机构：" label-width="90px">
                      <el-input v-model="ReviseDetail.deptUnit"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="5">
                    <el-form-item label="生效日期：" label-width="90px">
                      <el-date-picker type="date" placeholder="选择日期" v-model="ReviseDetail.validateTime" style="width: 100%;"
                        value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="文件类别：" label-width="90px">
                      <el-select v-model="ReviseDetail.cateId" placeholder="请选择文件类别" @change="abc">
                        <el-option v-for="item in lawCate" :label="item.name" :value="item.bianma" :key="item.index">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="区域：" v-show="isShowArea" label-width="60px">
                      <el-select v-model="ReviseDetail.provinceCode" placeholder="请选择省" @change="getProvUpload()">
                        <el-option v-for="item in provinceOptions" :key="item.areaId" :label="item.name" :value="item.areaCode">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item v-show="isShowArea">
                      <el-select v-if="ReviseDetail.provinceCode!=''" v-model="ReviseDetail.cityCode" placeholder="请选择市"
                        @change="getCity()">
                        <el-option v-for="item in citys" :key="item.areaId" :label="item.name" :value="item.areaCode">
                        </el-option>
                      </el-select>

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="5">
                    <el-form-item label="效力状态: " label-width="90px">
                      <el-radio-group v-model="ReviseDetail.valid">
                        <el-radio label="1">有效</el-radio>
                        <el-radio label="0">失效</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="18">
                    <el-form-item label="文件属性：" prop="type" label-width="90px">
                      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                      <el-checkbox-group v-model="checkedEditType" @change="handleCheckedLawTypeChange" class="check_item">
                        <el-checkbox v-for="item in EditLawType" :label="item.bianma" :key="item.index">{{item.name}}</el-checkbox>
                      </el-checkbox-group>
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
      </div>
      <span slot="footer" class="dialog-footer">
<el-button type="primary" @click="onEditSubmit">确 定</el-button>
      </span>


    </el-dialog>
  </div>
</template>

<script>
import CKEDITOR from "CKEDITOR";
export default {
  name: "publicLibrary",

  data() {
    return {
      listForm: {
        lawName: "", //文库名称
        lawNo: "", //文号
        deptUnit: "", //发布机构
        manager: "",
        cateId: "", //tab选中文库类型
        typeId: "",
        provinceCode: "",
        cityCode: "",
        readCountSort: "",
        lawNameSort: "",
        valid: "",
        status: "",
        putaway: "",
        showCount: 10,
        currentPage: 1 //页码
      },

      fileView: {
        lawId: "", //文库id
        lawName: "", //文库名称
        cateId: "", //文库分类编码
        typeId: [], //文库类型编码
        lawNo: "", //文号
        content: "", //正文内容
        creator: "", //上传人名字
        createTime: "", //上传时间
        sortIndex: 0, //排序
        status: "N", //状态,Y代表审批,N代表未审批
        auditUid: "", //审核者ID
        auditTime: "", //审核时间
        provinceCode: "", //省关系地区表编码
        cityCode: "", //市关系地区表
        districtCode: "", //关系地区表
        deptNo: "", //部门类型
        deptUnit: "", //发布单位
        expireTime: "", //文库失效时间
        validateTime: "", //文库生效时间
        valid: "", //文库是否有效，0为无效，1为有效
        readCount: 0, //阅读量
        auditOpinion: "" //审核意见
      },

      ReviseDetail: {
        lawName: "",
        typeId: [],
        createTime: "",
        auditOpinion: "",
        accessToken: localStorage.getItem("accessToken"),
        token: this.getToken(),
        lawId: "",
        lawNo: "",
        deptUnit: "",
        cateId: "",
        typeIdAttrs: "",
        provinceCode: "",
        cityCode: "",
        validateTime: "",
        valid: 0,
        content: ""
      },

      SubmitAuditLaw: {
        token: this.getToken(),
        accessToken: localStorage.getItem("accessToken"),
        lawId: "", //当前被点击的lawId
        status: "",
        auditJson: ""
      },

      LawTypeInquiry: {
        token: this.getToken(),
        accessToken: localStorage.getItem("accessToken")
      },
      lawCateInquiry: {
        token: this.getToken(),
        accessToken: localStorage.getItem("accessToken")
      },

      fileEditForm: {
        accessToken: localStorage.getItem("accessToken"),
        token: this.getToken(),
        lawName: "",
        lawNo: "",
        deptUnit: "", //发布机构
        cateId: "", //cateId 文库类型id
        typeIdAttrs: "",
        provinceCode: "", //省编码
        cityCode: "", //市编码
        validateTime: "",
        valid: "", //文件状态
        content: ""
      },

      isIndeterminate: false,
      isShowArea: false, //是否显示区域，默认不显示
      /* 加载 */
      loading: false,

      checkAll: false, //全选

      /* 审核文库 */
      fileViewDialogVisible: false,

      /* 查看文件详情 */
      detailsViewDialogVisible: false,

      /* 修改文件 */
      fileReviseDialogVisible: false,

      outerVisible: false,
      innerVisible: false,
      ApproveVisible: false,
      RejectVisible: false,

      /* 查看文件格式弹框 */
      fileFormatDialogVisible: false,

      /* 上传文件弹框 */
      fileUploadDialogVisible: false,

      checkedLawType: [], //选择的文档类型
      checkedEditType: [],
      lawType: [], //文档类型列表
      EditLawType: [],
      lawCate: [], //文库类型列表
      provinceOptions: [], //省份
      citys: [], //城市
      tablelist: [],
      cateId: "", //tab选中文库类型
      total: 0, //总共多少条数据
      rejectReasonIllegalVisible: false,
      rejectReasonInconformityVisible: false,
      rejectReasonDuplicateVisible: false,
      detailReasonIllegal: "",
      detailReasonInconformity: "",
      detailReasonDuplicate: "",
      auditOpinion: "",
      statusType: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "R",
          label: "拒绝"
        },
        {
          value: "Y",
          label: "通过"
        },
        {
          value: "N",
          label: "待审"
        }
      ],
      validType: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "有效"
        },
        {
          value: "0",
          label: "无效"
        }
      ],
      manageType: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "Y",
          label: "上架"
        },
        {
          value: "N",
          label: "下架"
        }
      ]
    };
  },
  mounted() {
    this.lawTypeList();
    this.lawCateList();
    this.personLawList();
    this.getAreaAndCity();
  },
  created() {},
  methods: {
    /* 搜索的数据 */
    handleSearch() {
      this.personLawList();
    },

    //获取文档类型列表
    lawTypeList() {
      this.$api.lawTypeList(this.LawTypeInquiry).then(res => {
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
      });
    },

    //获取文库类型列表
    lawCateList() {
      this.$api.lawCateList(this.lawCateInquiry).then(res => {
        this.lawCate[0] = {
          bianma: "",
          jb: 2,
          name: "全部",
          orderBy: 0,
          parentId: "",
          pbm: "",
          zdId: ""
        };

        for (var i = 0; i < res.data.length; i++) {
          this.lawCate[i + 1] = res.data[i];
        }
      });
    },

    getAreaAndCity() {
      let params = {
        areaCode: "0"
      };
      this.$api.getAreaAndCity(params).then(res => {
        this.provinceOptions = res.data;
      });
    },

    abc(item) {
      if (item == "0003" || item == "0005") {
        this.isShowArea = true; //显示区域选择下拉框
        this.getAreaAndCity(); //获取区域数据
      } else {
        this.isShowArea = false;
      }
    },

    //选择省
    getProv() {
      let tempCity = [];
      this.citys = [];
      let allCity = this.provinceOptions;
      let prov = this.listForm.provinceCode;
      this.listForm.cityCode = "";
      for (var val of allCity) {
        if (prov == val.areaCode) {
          tempCity = val.childList;
        }
      }
      this.citys = tempCity;
    },

    //选择市
    getCity() {},

    //选择省
    getProvUpload() {
      let tempCity = [];
      this.citys = [];
      let allCity = this.provinceOptions;

      if (this.ReviseDetail.provinceCode.length != 0) {
        let prov = this.ReviseDetail.provinceCode;
        //this.ReviseDetail.cityCode = "";
        console.log(
          "this.ReviseDetail.provinceCode inner : " +
            this.ReviseDetail.provinceCode
        );
        for (var val of allCity) {
          if (prov == val.areaCode) {
            tempCity = val.childList;
          }
        }
        this.citys = tempCity;
      } else if (this.fileUploadDialogVisible.provinceCode.length != 0) {
        let prov = this.fileEditForm.provinceCode;
        this.fileEditForm.cityCode = "";
        for (var val of allCity) {
          if (prov == val.areaCode) {
            tempCity = val.childList;
          }
        }
        this.citys = tempCity;
      } else {
      }
    },

    //选择市
    getCityUpload() {},

    /* 获取待审核列表数据 */
    personLawList() {
      this.loading = true;

      if (this.cateId.length > 3) {
        this.listForm.cateId = this.cateId;
      }

      //获取列表
      this.$api.personLawList(this.listForm).then(res => {
        if (res.errorCode === "1") {
          this.tablelist = res.data;
          this.total = res.totalRecords; //总共多少条数据
          this.loading = false;
        }
      });
    },

    /* 跳转到审核页面 */
    documentAudit(val) {
      if (val.status === "N") {
        this.SubmitAuditLaw.lawId = val.lawId;
        this.$api
          .getViewLaw({
            token: this.getToken(),
            lawId: val.lawId,
            accessToken: localStorage.getItem("accessToken")
          })
          .then(res => {
            if (res.errorCode === "1") {
              this.fileView = res.data[0];
              this.fileViewDialogVisible = true;
            }
          })
          .catch(err => {
            this.$message.error(err);
            return false;
          });
      }
    },

    /* 查看页面 弹框 */
    documentDetails(val) {
      this.SubmitAuditLaw.lawId = val.lawId;
      this.$api
        .getViewLaw({
          token: this.getToken(),
          lawId: val.lawId,
          accessToken: localStorage.getItem("accessToken")
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.fileView = res.data[0];
            this.detailsViewDialogVisible = true;
            this.personLawList();
          }
        })
        .catch(err => {
          this.$message.error(err);
          return false;
        });
    },

    /* 修改页面 弹框 */
    editDetails(val) {
      this.auditOpinion = "";

      this.SubmitAuditLaw.lawId = val.lawId;
      this.$api
        .viewEditLaw({
          token: this.getToken(),
          lawId: val.lawId,
          accessToken: localStorage.getItem("accessToken")
        })
        .then(res => {
          if (res.errorCode === "1") {
            this.fileReviseDialogVisible = true;

            if (res.data[0].law === null) {
              console.log("搜索的数据 => search " + "not data");
            } else {
              this.ReviseDetail.lawId = res.data[0].law.lawId;
              this.ReviseDetail.lawName = res.data[0].law.lawName;
              this.ReviseDetail.cateId = res.data[0].law.cateId;
              this.ReviseDetail.lawNo = res.data[0].law.lawNo;
              this.ReviseDetail.content = res.data[0].law.content;
              this.ReviseDetail.createTime = res.data[0].law.createTime;
              this.ReviseDetail.provinceCode = res.data[0].law.provinceCode;
              this.ReviseDetail.cityCode = res.data[0].law.cityCode;
              this.ReviseDetail.deptUnit = res.data[0].law.deptUnit;
              this.ReviseDetail.validateTime = res.data[0].law.validateTime;
              this.ReviseDetail.valid = res.data[0].law.valid;
              this.checkedEditType = [];

              console.log(
                "this.ReviseDetail.cateId　：　" + this.ReviseDetail.cateId
              );

              if (
                this.ReviseDetail.cateId == "0003" ||
                this.ReviseDetail.cateId == "0005"
              ) {
                this.isShowArea = true; //显示区域选择下拉框
                this.getAreaAndCity(); //获取区域数据
                this.getProvUpload();
              } else {
                this.isShowArea = false;
              }

              var arr = res.data[0].law.typeId.replace(
                new RegExp("'", "gm"),
                ""
              );
              this.checkedEditType.push(arr);

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

            if (res.data[0].lawAudits === null) {
              console.log("搜索的数据 => search " + "not data");
            } else {
              for (var i = 0; i < res.data[0].lawAudits.length; i++) {
                this.auditOpinion =
                  this.auditOpinion +
                  res.data[0].lawAudits[i].auditTitle +
                  "。详情：" +
                  res.data[0].lawAudits[i].auditContent +
                  ";<br><br>";
              }
            }
          }
        })
        .catch(err => {
          this.$message.error(err);
          return false;
        });
    },

    //选中文档类型
    handleCheckedLawTypeChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.lawType.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.lawType.length;
      this.fileEditForm.typeId = "'" + value + "'";
    },

    //文库类型查询
    tabNameHandleClick(tab, event) {
      this.listForm.cateId = tab.name;

      this.listForm.currentPage = 1; //切换文库类型初始化分页到第一页
      if (tab.name == "0003" || tab.name == "0005") {
        this.isShowArea = true; //显示区域选择下拉框
        this.getAreaAndCity(); //获取区域数据
      } else {
        this.listForm.provinceCode = "";
        this.listForm.cityCode = "";
        this.isShowArea = false;
      }
      this.personLawList();
    },

    //列表切换相应方法
    handlePageChange(val) {
      this.listForm.currentPage = val;
      this.personLawList();
    },

    //复核同意
    handleApprove() {
      this.SubmitAuditLaw.status = 1;

      //审核文库
      this.$api.auditLaw(this.SubmitAuditLaw).then(res => {
        if (res.errorCode === "1") {
          this.fileViewDialogVisible = false;
          this.ApproveVisible = true;
          this.personLawList();
        }
      });
    },

    //复核不同意
    handleReject() {
      this.fileViewDialogVisible = false;
      this.RejectVisible = true;
    },

    //打开提交文件对话框
    handleUploadFile() {
      this.fileUploadDialogVisible = true;

      this.$nextTick(_ => {
        for (name in CKEDITOR.instances) {
          var editor = CKEDITOR.instances[name];
          if (editor) {
            editor.destroy(true);
          }
        }
        CKEDITOR.replace("editor1", {
          toolbarCanCollapse: true,
          toolbarStartupExpanded: false,
          height: 280
        }).setData(this.ReviseDetail.content);
      });
    },

    documentPublicHandle(val) {
      if (val.putaway === "Y") {
        this.$api
          .putawayLaw({
            token: this.getToken(),
            lawId: val.lawId,
            accessToken: localStorage.getItem("accessToken"),
            status: "2"
          })
          .then(res => {
            if (res.errorCode === "1") {
              this.$message({
                message: "你好，文件下架成功",
                type: "success"
              });
              this.personLawList();
            }
          })
          .catch(err => {
            this.$message.error(err);
            return false;
          });
      }

      if (val.putaway === "N") {
        this.$api
          .putawayLaw({
            token: this.getToken(),
            lawId: val.lawId,
            accessToken: localStorage.getItem("accessToken"),
            status: "1"
          })
          .then(res => {
            if (res.errorCode === "1") {
              this.$message({
                message: "你好，文件上架成功",
                type: "success"
              });
              this.personLawList();
            }
          })
          .catch(err => {
            this.$message.error(err);
            return false;
          });
      }
    },

    handleRejectReason() {
      this.SubmitAuditLaw.status = 0;
      this.SubmitAuditLaw.auditOpinion =
        this.rejectReasonIllegalVisible +
        " " +
        this.rejectReasonInconformityVisible +
        " " +
        this.rejectReasonDuplicateVisible +
        " " +
        " 详情：" +
        " " +
        this.detailReasonIllegal +
        " " +
        this.detailReasonInconformity +
        " " +
        this.detailReasonDuplicate;

      var param = [];

      if (this.rejectReasonIllegalVisible) {
        param.push({
          auditTitle: "非法",
          auditContent: this.detailReasonIllegal
        });
      }

      if (this.rejectReasonInconformityVisible) {
        param.push({
          auditTitle: "格式不符合要求",
          auditContent: this.detailReasonInconformity
        });
      }

      if (this.rejectReasonDuplicateVisible) {
        param.push({
          auditTitle: "与当前文库中文档重复",
          auditContent: this.detailReasonDuplicate
        });
      }

      var params = new Object();
      params.auditList = param;

      var json = JSON.stringify(params);
      this.SubmitAuditLaw.auditJson = json;

      //审核文库
      this.$api.auditLaw(this.SubmitAuditLaw).then(res => {
        if (res.errorCode === "1") {
          this.RejectVisible = false;
          this.personLawList();
        }
      });
    },

    //取消
    cancel() {
      this.$confirm("内容尚未完成，你要离开此页吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.fileUploadDialogVisible = false;

          // this.$router.replace({
          //   path: "/library/publicLibrary"
          // });
        })
        .catch(() => {});
    },

    //全选文档类型
    handleCheckAllChange(val) {
      let allLawTypeId = [];
      let allLawTypeName = [];

      if (val) {
        this.lawType.forEach(item => {
          allLawTypeId.push(item.bianma); //得到全部文档类型ID，用于搜索
          allLawTypeName.push(item.name); //得到全部文档类型名称，用于返显选中状态
        });

        this.fileEditForm.typeId = allLawTypeId;
      } else {
        this.fileEditForm.typeId = [];
      }
      this.checkedLawType = val ? this.fileEditForm.typeId : [];
      // this.checkedLawType = val ? allLawTypeName : [];
      this.isIndeterminate = false;
    },
    //选中文档类型
    handleCheckedLawTypeChange(value) {
      let checkedCount = value.length;

      this.checkAll = checkedCount === this.lawType.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.lawType.length;

      //this.listQuery.typeId = value;
    },

    onSubmit() {
      this.fileEditForm.content = CKEDITOR.instances.editor1.getData();
      this.fileEditForm.typeIdAttrs = "";

      //获取用户选择文件属性
      for (var val of this.checkedLawType) {
        if (this.fileEditForm.typeIdAttrs.length === 0) {
          this.fileEditForm.typeIdAttrs = val;
        } else {
          this.fileEditForm.typeIdAttrs =
            this.fileEditForm.typeIdAttrs + "-" + val;
        }
      }

      this.$api
        .saveLaw(this.fileEditForm)
        .then(res => {
          if (res.errorCode === "1") {
            this.$alert("添加文库成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.fileUploadDialogVisible = false;
                this.personLawList();
              }
            });
          } else {
            console.log("搜索的数据 => search");
          }
        })
        .catch(err => {
          this.$message.error(err);
          return false;
        });
    },

    onEditSubmit() {
      this.ReviseDetail.content = CKEDITOR.instances.editor2.getData();
      this.ReviseDetail.typeIdAttrs = "";

      //获取用户选择文件属性
      for (var val of this.checkedLawType) {
        if (this.ReviseDetail.typeIdAttrs.length === 0) {
          this.ReviseDetail.typeIdAttrs = val;
        } else {
          this.ReviseDetail.typeIdAttrs =
            this.ReviseDetail.typeIdAttrs + "-" + val;
        }
      }

      for (var val of this.checkedEditType) {
        if (this.ReviseDetail.typeIdAttrs.length === 0) {
          this.ReviseDetail.typeIdAttrs = val;
        } else {
          this.ReviseDetail.typeIdAttrs =
            this.ReviseDetail.typeIdAttrs + "-" + val;
        }
      }

      this.$api
        .editLaw({
          accessToken: localStorage.getItem("accessToken"),
          token: this.getToken(),
          lawId: this.ReviseDetail.lawId,
          lawNo: this.ReviseDetail.lawNo,
          deptUnit: this.ReviseDetail.deptUnit,
          cateId: this.ReviseDetail.cateId,
          typeIdAttrs: this.ReviseDetail.typeIdAttrs,
          provinceCode: this.ReviseDetail.provinceCode,
          cityCode: this.ReviseDetail.cityCode,
          validateTime: this.ReviseDetail.validateTime,
          valid: this.ReviseDetail.valid,
          content: this.ReviseDetail.content
        })
        .then(res => {
          console.log("res.errorCode" + res.errorCode);
          if (res.errorCode === "1") {
            this.$alert("修改文库成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.fileReviseDialogVisible = false;
                this.personLawList();
              }
            });
          } else {
            console.log("搜索的数据 => search");
          }
        })
        .catch(err => {
          this.$message.error(err);
          return false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.check_item {
  display: inline-block;
  margin-left: 30px;
}

.selarea-item {
  display: inline-block;
}

.header-search {
  padding: 20px;
}

.page-content {
  max-width: 100%; // margin:10px 5px 15px 20px;
  margin: auto; // position: absolute;
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

.msg {
  height: 10px;
  margin-bottom: 10px;
}

.msg_edit {
  padding-left: 10px;
  font-size: 12px;
  color: #999;
  display: inline;
}

.msg_edit span {
  padding-right: 20px;
}

.msg_edit .fr {
  float: right;
}

/* .msg_edit span:nth-child(2){float: right;} */

.meta_list {
  margin-bottom: 10px;
  background-color: #ebeaea;
  border-top: 3px solid #ddd;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
}

.meta_list li {
  width: 50%;
  display: inline-block;
  line-height: 30px;
  font-size: 14px;
}

.meta_list li:nth-child(2) {
  width: 10%;
  float: right;
}

.meta_list li:nth-child(3) {
  width: 10%;
  float: right;
}

.content-summary {
  padding: 0px 80px;
  margin-top: 10pxm;
  max-width: 100%;
}

.divBox {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}

.content_revise {
  margin: 0 auto;
  display: flex;
}

.left_3 {
  flex: 300px 0;

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

.inner-right {
  margin-left: 30%;
  height: 100%;
  text-align: center;
}

.left-1 {
  float: left;
  width: 50%;
  height: 100%;
  text-align: left;
}

.tip-box {
  text-align: left;
  margin-bottom: 20px;
}

.right-1 {
  margin-left: 59%;
  height: 100%;
  text-align: right;
}

.left-2 {
  float: left;
  width: 30%;
  height: 100%;
  text-align: left;
}

.right-2 {
  margin-left: 70%;
  height: 100%;
}

.inner-left-2 {
  float: right;
  width: 50%;
  height: 100%;
  text-align: right;
}

.inner-right-2 {
  margin-left: 50%;
  height: 100%;
  text-align: right;
}

.my-public-library-dialog {
  .el-dialog--center .el-dialog__header {
    padding: 0;
    padding-left: 10px;
    height: 40px;
    text-align: left;
    box-sizing: border-box;
  }

  .el-dialog {
    //Add for display the detail public libary
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 870%;
  }

  .el-dialog__body {
    padding: 15px 15px 0;
    padding: 0; //Add for display the detail public libary
    overflow: auto;
  }

  .el-table-column--selection .cell {
    padding: 0;
    padding-left: 10px;
  }

  .el-button {
    width: 78px;
  }

  .el-table th > .cell {
    padding: 0;
    padding-left: 10px;
  }

  .my-form {
    .el-form-item {
      margin-bottom: 8px;
    }

    .el-form-item__label {
      color: #5cb941;
    }

    .el-form-item__content {
      display: flex;
      align-items: center;
    }

    .search-btn {
      margin-left: 10px;
    }

    .el-input__inner {
      background: #f6f6f6;
    }

    .info-input {
      height: 80px;

      .el-textarea__inner {
        height: 100%;
        background: #f6f6f6;
        resize: none;
      }
    }

    .el-textarea__inner:focus {
      outline: 0;
    }
  }
}
</style>
