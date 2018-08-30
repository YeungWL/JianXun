<template>
 <section class="cms-body" v-loading="loading">
    <el-form  ref="form" :model="Formlist"
        class="cms-form" label-width="162px" style="width:95%;margin: 0 auto;margin-top:25px;">
        <el-form-item label="建迅钱包" class="flex-50">
          {{Formlist.userWallet}}
        </el-form-item> 
        <el-form-item class="rechargeList">
            <el-button type="primary" class="rechargeBtn">充值</el-button>
        </el-form-item>
        <el-form-item class="rechargeBtn-list">
            <div class="Record">充值与消费记录</div>
            <el-button type="primary btnRecharge" class="fr">发票管理</el-button>
        </el-form-item>
        <el-form-item label="文库收益（税前）:" class="flex-50">
           {{Formlist.textBefor}}元
        </el-form-item>
        <el-form-item label="文库收益（税后）:" class="flex-50">
          {{Formlist.textAfter}}
        </el-form-item> 
        <el-form-item label="文库累计收益（税后）:" class="flex-50">
          {{Formlist.textEnd}}元
        </el-form-item> 
        <el-form-item label="备注:" class="flex-100">
           <el-input v-model="Formlist.remarks" class="cms-width" type="textarea"></el-input>
        </el-form-item>
    </el-form>
  </section>
</template> 

<script>
export default {
  data(){
    return {
      loading:false,
      Formlist:{
        userWallet:'386.3',
        textBefor:'389.6',
        textEnd:'1888',
        textAfter:'待统计',
        remarks:'税前收益每月统计一次，税后收益每年底前统计，该处的税是指平台企业所负的增值税及企业所得税等，文件管理人收益的个人所得税由其自行办理。文库收益结算完成自动充入建讯钱包'
      }
    }
  },
  methods:{

  }
}
</script>
<style lang="scss" scoped>
.rechargeBtn-list{border-bottom:#ccc solid 1px; padding-bottom: 10px;}
.rechargeBtn{padding-left:24px; padding-right:24px; margin-left: -68px;}
.Record{line-height:60px; text-decoration: underline; margin-left: -68px;}
.btnRecharge{float:right; margin-right:20%; margin-top:-50px;}
</style>