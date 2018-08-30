<!--权限下拉结构树-->
<template>
	<div class="institutionsTree">
		<el-select v-if="openSelect" v-model="selectItem.menuName" placeholder="请选择" :disabled="disabled" clearable> 
			<el-option  :key="selectItem.value" :label="selectItem.label" :value="selectItem.value" style="min-height: 200px;padding:0;overflow: auto;background-color: #fff;">
				<div >
					<el-tree :data="treeData" :props='defaultProps' @node-click="handleNodeClick" style="margin-top: 10px;"></el-tree>
				</div>
			</el-option>
		</el-select>
		<div  @mouseenter="openSelect=true;" v-else>
			<el-input  placeholder="请选择" v-model="selectItem.menuName" clearable  @focus="openSelect=true;" :disabled="disabled" >
		</el-input>
		</div>
	</div>
</template>

<script>
export default {
	name: 'root-tree',
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
					id:''
				}
			}
		}
	},
	data() {
		return {
			isfocus: true,
			selectItem: {
				label:'',
				value:''
			},
			openSelect: true,
			defaultProps: {			
				children: 'childList',
				label: 'menuName'
			}
		}
	},
	created(){
		let {menuName,menuId} = this.pItem
		this.selectItem = {menuName, menuId }
	},
	watch: {
		//选中上级，触发父级更新
		'selectItem.menuName': function() {
		//清空选项，手动清空id
		this.selectItem.menuId = this.selectItem.menuName?this.selectItem.menuId:'';
		this.$emit('changePid', this.selectItem)
		},
	},
	methods: {		
		//确定选中项
		handleNodeClick(data) {
			console.log(data.menuId)
			this.selectItem = { ...data
			};
			this.openSelect = false;
		}
	}
};
</script>

<style lang="scss">
</style>