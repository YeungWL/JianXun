<!--组织成员结构树-->
<template>
	<div class="institutionsTree">
    <el-tree :data="treeData"
             node-key="_id"
             :props='defaultProps'
             show-checkbox
             :check-strictly="true"
             @check-change="checkChange"
             ref="treeForm"
             :default-expand-all="true" style="margin-top: 10px;">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}
                <span v-if="data.role === '0' || data.role === '2'">(正职)</span>
                <span v-else-if="data.role === '1'  || data.role === '3'">(副职)</span>
                <span v-else="data.role === '-1'"></span>
              </span>
            </span>
    </el-tree>
		<!--<el-select v-if="openSelect" v-model="selectItem.name" placeholder="请选择" :disabled="disabled" clearable>-->
			<!--<el-option  :key="selectItem.omId" :label="selectItem.name" :value="selectItem.omId" style="min-height: 200px;padding:0;overflow: auto;background-color: #fff;">-->
    <!--<div >-->
      <!--<el-tree :data="treeData"-->
               <!--node-key="id"-->
               <!--:props='defaultProps'-->
               <!--show-checkbox-->
               <!--check-strictly-->
               <!--@check-change="handleClick"-->
               <!--ref="treeForm"-->
               <!--@node-click="nodeClick" :default-expand-all="true" :highlight-current="true" style="margin-top: 10px;">-->
            <!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
              <!--<span>{{ node.label }}-->
                <!--<span v-if="data.role === '0' || data.role === '2'">(正职)</span>-->
                <!--<span v-else-if="data.role === '1'  || data.role === '3'">(副职)</span>-->
                <!--<span v-else="data.role === '-1'"></span>-->
              <!--</span>-->
            <!--</span>-->
      <!--</el-tree>-->
    <!--</div>-->
  <!--</el-option>-->
    <!--</el-select>-->
    <!--<div  @mouseenter="openSelect=true;" v-else>-->
      <!--<el-input  placeholder="请选择" v-model="selectItem.name" clearable  @focus="openSelect=true;" :disabled="disabled" >-->
      <!--</el-input>-->
    <!--</div>-->
	</div>
</template>

<script>
export default {
	name: 'select-organization-tree',
	props: {
		// 所有结构树数据
		treeData: {
			type: Array,
			default: []
		},
		disabled:{
			type: Boolean,
			default: false
		},
		pItem: {
			type: Object,
			default: function() {
				return {
          name:'',
          omId:'',
          _id: '',
				}
			}
		}
	},
	data() {
		return {
      selectMember:[],
			isfocus: true,
			selectItem: {
        name:'',
        omId:'',
        _id:''
			},
			openSelect: true,
			defaultProps: {			
				children: 'memberList',
				label: 'name'
			}
		}
	},
	created(){
		// let {name,omId,_id} = this.pItem
		// this.selectItem = {name,omId, _id }
	},
	watch: {
		//选中上级，触发父级更新
		// 'selectItem.name': function() {
		// //清空选项，手动清空id
		// this.selectItem.omId = this.selectItem.name?this.selectItem.omId:'';
		// this.$emit('changePid', this.selectItem)
		// },
	},
	methods: {
	  checkChange (data,checked, indeterminate){
      // console.log(data,checked);
      this.$emit('changePid',data);
      // 先获取当前选择的id 在数组中的索引
      const indexs = this.selectMember.indexOf(data._id)
      if (indexs < 0 && this.selectMember.length === 1 && checked) {
        // 如果不存在在数组中，并且数组中已经有一个id 并且 checked 为 true 的时候，代表不能再次选择
        this.$message({
          message: '只能选择一个被指派人',
          type:'error',
          showClose: true
        })
        // 设置已选择的节点为false 很重要
        this.$refs.treeForm.setChecked(data, false)

      } else if (this.selectMember.length === 0 && checked){
        // 发现数组为空并且是已选择
        // 防止数组有值，首页清空，再push
        this.selectMember = []
        this.selectMember.push(data._id)

      }else if (indexs >= 0 && this.selectMember.length === 1 && !checked){
        // 再次直接进行赋空操作
        this.selectMember = []
      }
    },
		// //确定选中项
		// handleNodeClick(data) {
		// 	// console.log(data)
		// 	this.selectItem = { ...data
		// 	};
		// 	this.openSelect = false;
		// }
	}
};
</script>

<style lang="scss">
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }


</style>
