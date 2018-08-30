<template>
  <div class="pagination-container"
       v-if="total > 0">
    <el-pagination :page-size="size"
                   :current-page.sync="currentPage"
                   :total="total"
                   layout="prev, pager, next">
    </el-pagination>
    <span class="page-message">共 {{total}} 条数据，{{currentPage}}/{{totalPage}}页</span>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    total: {
      type: Number,
      default: 1
    },
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 8
    }
  },
  data() {
    return {
      currentPage: this.page
    }
  },
  computed: {
    totalPage() {
      let residue = this.total % this.size ? 1 : 0
      return parseInt(this.total / this.size) + residue
    }
  },
  watch: {
    page(val) {
      this.currentPage = val
    },
    currentPage(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang='scss' scoped>
.pagination-container {
  display: flex;
  align-items: center;
  .el-pagination {
    & /deep/ .btn-prev {
      border: 1px solid #d1d1d1;
      color: #d1d1d1;
      padding-right: 5px;
      .el-icon::before {
        content: '上一页';
      }
    }
    & /deep/ .btn-next {
      border: 1px solid #d1d1d1;
      color: #d1d1d1;
      padding-left: 5px;
      .el-icon::before {
        content: '下一页';
      }
    }
    & /deep/ .el-pager .number {
      border: 1px solid #d1d1d1;
      &:first-child,
      &:last-child {
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
      }
      &.active {
        background-color: #69c448;
        border-top: 1px solid #69c448;
        border-bottom: 1px solid #69c448;
        color: #fff;
      }
    }
  }
  .page-message {
    color: #c1c1c1;
  }
}
</style>
