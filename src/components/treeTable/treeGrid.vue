<template>
	<div class="treeGrid">
		<el-table :data="data"
		          style="width: 100%"
		          :row-style="showTr">
			<el-table-column v-for="(column, index) in columns"
			                 :key="column.dataIndex"
			                 :label="column.text" 
                       min-width='100'
                      show-overflow-tooltip>
				<template slot-scope="scope">
					<div :class="{ isOneTd: index==0 }">
						<span v-if="spaceIconShow(index)"
						      v-for="(space, levelIndex) in scope.row._level"
						      class="ms-tree-space"></span>
						<span v-if="toggleIconShow(index,scope.row)"
						      @click="toggle(scope.$index)">
							<i v-if="!scope.row._expanded"
							   class="el-icon-caret-right"
							   aria-hidden="true"></i>
							<i v-if="scope.row._expanded"
							   class="el-icon-caret-bottom"
							   aria-hidden="true"></i>
						</span>
						<span v-else-if="index===0" class="ms-tree-space"></span> 
						<span>{{scope.row[column.dataIndex]}}</span> 

					</div>

				</template>
			</el-table-column>
			<el-table-column label="操作"
			                 v-if="treeType === 'normal'"
			                 min-width="150">
				<template slot-scope="scope">
					<!--<span @click="toView(scope.row)"
					      class="btn">
						<i class="iconfont icon-sousuo1"></i>
					</span>-->
					<span @click="openEdit(scope.row)"
					      class="btn">
						<i class="iconfont icon-edit editicon"></i>
					</span>
					<span @click="delList(scope.row)"
					      class="btn">
						<i class="iconfont icon-shanchu delicon"></i>
					</span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import Utils from '../../utils/index.js'
//  import Vue from 'vue'
export default {
  name: 'tree-grid',
  props: {
    // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
    treeStructure: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    // 这是相应的字段展示
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 这是数据源
    dataSource: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
    requestUrl: {
      type: String,
      default: function() {
        return ''
      }
    },
    // 这个是是否展示操作列
    treeType: {
      type: String,
      default: function() {
        return 'normal'
      }
    },
    // 是否默认展开所有树
    defaultExpandAll: {
      type: Boolean,
      default: function() {
        return false
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    // 格式化数据源
    data: function() {
      let me = this
      if (me.treeStructure) {
        //      	debugger
        let data = Utils.MSDataTransfer.treeToArray(
          me.dataSource,
          null,
          null,
          me.defaultExpandAll
        )
        return data
      }
      return me.dataSource
    }
  },
  methods: {
    //执行查看详情
    toView(val) {
      this.$emit('toView', val)
    },
    //执行修改方法
    openEdit(val) {
      this.$emit('openEdit', val)
    },
    //执行删除方法
    delList(val) {
      this.$emit('delList', val)
    },
    // 显示行
    showTr: function(row, index) {
      let thisRow = row.row
      let show = thisRow._parent
        ? thisRow._parent._expanded && thisRow._parent._show
        : true
      thisRow._show = show
      return show ? '' : 'display:none;'
    },
    // 展开下级
    toggle: function(trIndex) {
      let me = this
      let record = me.data[trIndex]
      record._expanded = !record._expanded
    },
    // 显示层级关系的空格和图标
    spaceIconShow(index) {
      let me = this
      if (me.treeStructure && index === 0) {
        return true
      }
      return false
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow(index, record) {
      let me = this
      if (
        me.treeStructure &&
        index === 0 &&
        record.childList &&
        record.childList.length > 0
      ) {
        return true
      }
      return false
    },
    handleDelete() {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.treeGrid {
  .isOneTd {
    text-align: left;
    text-indent: 10px;
  }
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }
  .ms-tree-space::before {
    content: '';
  }
  .el-table {
    tr:nth-child(even) td{
      background-color: #fff;
    }
  }
  table td {
    line-height: 26px;
  }
  .s-sousuo {
    color: #68c5f1;
  }
  .s-edit {
    color: #3cc871;
  }
  .s-del {
    color: #f4ca12;
  }
}
</style>