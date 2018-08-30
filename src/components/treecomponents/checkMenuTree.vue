<template>
  <div class="tree-layout">
            <div class="tree">
                <el-tree :props="props" :load="ansyTree" lazy :indent='16' node-key="id" show-checkbox ref="tree"
                :default-expanded-keys="['']"
                @node-click="getNodes"
                @check-change="handleCheckChange"
                ></el-tree>
            </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "checkmenu-tree",
  props: {
    copy: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        // isLeaf: "isChild",//指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        id: "id"
      },
      root: '',
      refash: true,
      checked: ''
    };
  },
  methods: { 
     getNodes(data, node) {  
       this.$emit('change', data, node);

      //  console.log(data,node)
     },
     ansyTree(node, resolve) {
      let api=this.$api;
      //异步加载树形结构
      if (node.level === 0) {
        return resolve([
          {
            name: "根目录",
            id: ''
          }
        ]);
      }
      if (node.level > 0) {
        let  params = {   
          menuName: '',// 菜单名称
          menuCode:'',// 菜单编码
          parentId: node.data.id,// 父级菜单id[非必填项,默认o,即根节点跟他下面一级] 
          isLeaf: '' // 是否有节点[非必填项,1:没有节点,2有节点]    
        }
        api.menuList(params).then(res => {
            const data = [];
            for (let i in res.data) {
              let obj = {};
              obj.id = res.data[i].menuId;
              obj.isChild = res.data[i].isLeaf === 2 ? true : false;
              obj.name = res.data[i].menuName;
              obj.data = res.data;
              // boj.children = res.childList;
              data.push(obj);
              // console.log(obj.isChild);
            }
            return resolve(data);
          }).catch(error=>{ });
      }
     },
     handleCheckChange(data, checked, indeterminate) {
        // const menuIdArr = []
        // data.forEach((item, index) => {
        //   let menuObj = {}
        //   menuObj.menuId = item.id
        //   menuObj.menuName = item.name
        //   this.menuIdArr.push(menuObj)
        //   console.log(menuObj)
        // })      
        console.log(this.$refs.tree.getCheckedNodes());
        console.log(data.id)
     }   
  }
};
</script>

<style lang='scss' scoped>
.file-tree-items, .tree {
    min-width: 200px;
    height: 300px;
    overflow: auto;
    border: 1px solid #d4dde2;
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
