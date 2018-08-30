<template>
    <textarea id="editor" rows="10" cols="80"></textarea>
</template>
<script>
import CKEDITOR from "CKEDITOR"
export default {
  data(){ 
    return{
    editorId:"editor",
    content:"",
    editorOption:{}
    } 
  },
  props:{
    initData:String
  },
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
  },
  mounted(){
    CKEDITOR.replace("editor")
    CKEDITOR.instances.editor.setData(this.initData)
    // CKFinder.SetupCKEditor(editor) ;
  }
}
</script>

<style scoped lang="scss">
</style>