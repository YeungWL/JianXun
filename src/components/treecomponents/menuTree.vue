<template>
  <div class="tree-layout">
            <div class="tree">
                <div class="reflash">
                  <div @click="reflashClick"><span class="el-icon-refresh" :class="[rotating?'rotating':'']"> </span> 刷新 </div>
                   <!--<div v-if="copy" @click.self="clickEvent" class="copy-channel">复制栏目</div>-->
                </div>
                <el-tree :props="props" :load="ansyTree" lazy :indent='16' node-key="id" 
                :default-expanded-keys="['']"
                @node-click="getNodes"
                v-if="refash"
                ></el-tree>
            </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "menu-tree",
  props:{
    copy:{
      type:Boolean,
      default:false
    }
  },

  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "isChild",
        id: "id"
      },
      root:'',
      refash:true,
      rotating:true
    };
  },
  methods: {
  //  clickEvent(){
  //    this.routerLink('/channel/copy','copy',0);
  //  }, 
    reflashClick(){
         this.refash=false;
         setTimeout(() => {
             this.refash=true;      
         },100);
     },
     getNodes(data, node){  
       this.$emit('change',data,node);
      //  console.log(data,node)
     },
    ansyTree(node, resolve) {
      // console.log(node)
      let api = this.$api;
      //异步加载树形结构
      if (node.level === 0) {     
        return resolve([
          {
            name: "根目录",
            id: ''
          }
        ])
      }
      if (node.level > 0) {
        this.rotating=true;
        // console.log(localStorage.getItem('accessToken'))
        let  params = {   
          // accessToken: localStorage.getItem('accessToken'),
          // token: this.getToken(),
          menuName: '',//菜单名称
          menuCode:'',//菜单编码
          parentId: node.data.id,//父级菜单id[非必填项,默认o,即根节点跟他下面一级] 
          isLeaf:'' //是否所有节点[非必填项,1:二级节点，2:所有节点．默认为1]    
        }
        api.menuList(params).then(res => {
            this.rotating=false;
            const data = [];
            for (let i in res.data) {
              let obj = {};
              obj.id = res.data[i].menuId;
              obj.isChild = res.data[i].isLeaf>0 ? false : true;
              obj.name = res.data[i].menuName;
              obj.data = res.data;
              // boj.children = res.childList;
              data.push(obj);
            }
            // console.log(data);
            
            return resolve(data);
          }).catch(error=>{ this.rotating=false;});
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.tree-layout {
    position: absolute;
    left: 20px;
    top: 0;
    min-height: 100%;
    width: 200px;
    background: #fff;
}
.file-tree-items, .tree {
    width: 200px;
    height: 100%;
    overflow: auto;
    position: absolute;
    border-right: 1px solid #d4dde2;
}
.reflash {
    height: 50px;
    line-height: 50px;
    padding: 0 24px;
    color: #8a8e98;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 14px;
}
.copy-channel {
    color: #4184b7;
}
.el-tree {
    cursor: default;
    background: #fff;
    color: #606266;
}
   @keyframes rotating{
        from{transform:rotate(0)}
        to{transform:rotate(360deg)}
}
.rotating{
        animation:rotating 1.2s linear infinite
}
.copy-channel{
  color: #4184b7;
}
</style>
