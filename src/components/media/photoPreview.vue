<template>
  <div class='photo-preview'>
    <div class="carousel-wrap" :data="photoData">
      <el-carousel height="700px" :autoplay="false" >
        <el-carousel-item v-for="(item,index) in photoList" :key="index">
          <img class="carousel-img" :src="item.path" alt="" height="600">
          <div class="carousel-index"><span><em>{{index+1}}</em>/{{photoList.length}}</span></div>
        </el-carousel-item>
      </el-carousel>

    </div>
  </div>
</template>

<script>
export default {
  name: 'photo-preview',
  props: {
    photoData: {
      type: Array,
      default: []
    }
  },
    // 这是数据源
  data() {
    return {
      photoList:[]
    }
  },
  watch: {//这里用watch方法来监听父组件传过来的值，来实现实时更新
    photoData(val) {//即为父组件的值，val参数为值
      this.photoList = val;//将父组件的值赋给 子组件的值
      // console.log(val);
    }
  },
  created(){

  },
  mounted() {
    this.photoList = this.photoData
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .photo-preview {
    height: 100%;
    width: 100%;
  }
  .carousel-wrap {
    border: 1px solid #ddd;
    .el-carousel {
      .carousel-index{
        text-align: center;
        em{
          font-size: 16px;
          color: #ed4040;
        }
      }
      .carousel-img{
        width: auto;
        margin: 0 auto;
      }
      .carousel-desc{
        border-top: 1px solid #ddd;
        padding: 10px;
        text-align: center;
        margin: 0 auto;
      }
    }
  }

</style>
