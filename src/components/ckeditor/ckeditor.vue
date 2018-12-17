<template>
    <textarea id="editor" rows="10" cols="80"></textarea>
    <!--<textarea id="editor" rows="10" cols="80" @change="change"></textarea>-->
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
  //  change(){   
  //   this.$emit('change',this.content);
  //  } 
  },
  mounted(){
    // CKEDITOR.replace("editor")
    CKEDITOR.replace("editor", {
      toolbarCanCollapse: true,
      toolbarStartupExpanded: false,
      height: 280
    })
    CKEDITOR.instances.editor.setData(this.initData)
    // this.content = CKEDITOR.instances.editor.getData()
    // CKFinder.SetupCKEditor(editor) ;
  }
}
</script>

<style scoped lang="scss">
</style>