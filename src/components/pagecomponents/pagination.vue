<template>
  <div class="pagination" v-if="total > 0">
      <div class="page-input">
         <span>每页显示</span>
          <el-input class="small" style="padding:0 5px;" type="number" min="0"
           v-model.number="inputNum"
           @blur="setPage"
          @keyup.enter.native="setPage"
          ></el-input>
          <span>条，</span>
      </div>
      <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="size"
            :total="total"
            :current-page="current"
           @current-change="handleCurrentChange"
            >
     </el-pagination>
     <!--<span class="page-message">共 {{total}} 条，{{current}}/{{totalPage}}页</span>-->
  </div>
</template>

<script>
/**
 *  <pagination :total="total" @change="getPages"></pagination>
 * 
 *  getPages(pageNo,pageSize){
      this.params.pageNo=pageNo;
      this.params.pageSize=pageSize;
      this.getTableData(this.params);
    }
 * 
 * 
 */


export default {
  name: "ui-pagination",
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      inputNum: 10, //默认输入的条数
      size: 0,
      current: 1
    };
  },
  computed: {
    totalPage() {
      let residue = this.total % this.size ? 1 : 0
      return parseInt(this.total / this.size) + residue
    }
  },  
  methods: {
    setPage(event) {
      let num = event.target.value;
      let re = /^[0-9]+$/; //做一下数据过滤
      let state = re.test(num);
      if (state) {
        this.size = parseInt(num);
      } else {
        this.size = 10;
        this.inputNum=10;
      }
      this.current=1;
     this.$emit("change", this.current, this.size);
    },
  
    handleCurrentChange(val) {
      this.current = val;
      this.$emit("change", this.current, this.size);
    }
  },
  created() {
    this.size = this.inputNum;
    // this.$emit("change", this.current, this.size); //触发 change 事件，并传入新值 第一次创建默认第一页，this.size条数据
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  .el-pagination{display: inline-block;}
}
.page-input {
  display: inline-block;
  padding: 2px 5px;
  vertical-align: sub;
  > span {
    display: inline-block;
    color: #8a8e98;
    font-size: 14px;
    user-select: none;
    white-space: nowrap;
  }
  .small {
    width: 88px;
    padding: 0 5px;
  }
}
</style>