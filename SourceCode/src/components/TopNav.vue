<template>
  <div>
      <sidebar ></sidebar>
      <!-- top navigation -->
        <div class="top_nav">
            <div class="nav_menu">
                <nav>
                    <div class="nav toggle"  @click="toggle">
                        <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                    </div>

                    <ul class="nav navbar-nav navbar-right">
                        <li class="">
                            <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <img :src="userInfo.thumbnail_pic" alt="">{{userInfo.username}}
                                <span class=" fa fa-angle-down"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-usermenu pull-right">
                                <li><router-link to="/login"><i class="fa fa-sign-out pull-right"></i>Log Out</router-link> </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="row">
                <ol class="breadcrumb" style="margin-bottom: 0;background: #EDEDED;    border-bottom: 1px solid #D9DEE4;padding: 8px 30px">
                    <li ><router-link to="/home">后台首页</router-link></li>
                    <li class="active"><router-link to="/userManagement">用户管理</router-link></li>
                </ol>
            </div>
        </div>
        <!-- /top navigation -->
  </div>
</template>
<script type="text/javascript">
import Sidebar from './Sidebar'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isOpen: false
    }
  },
  components: {
    Sidebar: Sidebar
  },
  created () {
    // 获取用户信息
    this.$store.commit('GETUSERINFO')
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    open () {
      this.isOpen = true
      this.$store.state.isOpen = this.isOpen
    },
    close () {
      this.isOpen = false
      this.$store.state.isOpen = this.isOpen
    },
    toggle () {
      if (this.isOpen) {
        this.close()
      } else {
        this.open()
      }

      if (this.$store.state.myChartList.length > 0) {
        this.$store.state.myChartList.forEach((myChart) => {
          setTimeout(function () {
            myChart.resize()
          }, 100)
        })
      }
    }
  }
}
</script>
