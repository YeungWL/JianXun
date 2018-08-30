<template>
	<div class="box settingManage">
		<keep-alive>
			<el-aside width="240px">
			<el-menu :default-openeds="openeds" @select="handleSelect" :default-active="$route.path" :router="true">
				<el-submenu :index="item.value" v-for="(item,s) in thisAside.children" :key="s">
					<template slot="title">{{item.name}}</template>
					<el-menu-item-group v-for="(ele,i) in item.children" :key="i">
						<el-menu-item :index="ele.url">{{ele.name}}</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-aside>
		</keep-alive>
		<!-- 内容区域 -->
		<div class="settingCon">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			thisAside: {
				type: Object,
				default: () => {}
			}
		},
		name: 'setting',
		data() {
			return {
				openeds: ['1', '2'],
				activeIndex: '/setting/userManagement',
			}
		},
		created() {
		},
		methods: {
			handleSelect(key, keyPath) {
//				this.activeIndex = key;
//				console.log(key)		
//				this.$router.push({
//							path: key
//					});
			}
		}
	}
</script>

<style lang="scss" scoped>
	/*@import "../styles/mixin.scss";*/
	.settingManage {
		position: relative;
		padding-left: 240px;
		/*height: 100%;*/
		/*margin-top: -17px;*/
		.el-aside {
			box-sizing: border-box;
			height: 100%;
			overflow: auto;
			position: absolute;
			left: 0;
			top: 0;
			.el-submenu__title {
				height: 40px;
				line-height: 40px;
				padding-left: 26px !important;
			}
		}
		.settingCon {
			height: 100%;
			margin-top: 17px;
			position: relative;
			overflow: auto;
		}
	}
</style>