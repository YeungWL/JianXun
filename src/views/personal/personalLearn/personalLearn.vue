<template>
  <!--  table开始  -->
  <div class="page-main customTable" style="margin-top:25px;">
    <el-table ref="multipleTable" style="width:100%" v-loading="loading" element-loading-text="拼命加载中"
      :data="tableData"  key="ArcDataArr">
      <el-table-column prop="username" label="文件名称" min-width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="文号" min-width="80"></el-table-column>
      <el-table-column prop="phone" label="文件状态" min-width="120"></el-table-column>
      <el-table-column prop="roleTime" label="学习时长" min-width="120"></el-table-column>   
      <el-table-column prop="roleName" label="学习比例" min-width="120"></el-table-column> 
      <el-table-column prop="roleNum" label="学分" min-width="120"></el-table-column>           
    </el-table>
  </div>
</template>

<script>
export default {
      data(){
      return{
        loading:false,
        tableData:[
          {
            username:'AA',
            name:'BB',
            phone:'CC',
            roleTime:'DD',
            rolenName:'FF',
            roleNum:'EE'
          }
        ]

      }
    },
  methods: {

  }
}
</script>