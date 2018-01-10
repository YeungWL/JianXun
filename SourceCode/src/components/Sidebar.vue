<template>
  <div class="col-md-3 left_col" >
            <div class="left_col scroll-view">
                <div class="navbar nav_title" style="border: 0;">
                <router-link :to="{path:'/home'}">
                <a class="site_title"><i class="fa fa-paw"></i> <span>数据管理后台</span></a>
                </router-link>
                </div>

                <div class="clearfix"></div>

                <!-- menu profile quick info -->
                <div class="profile clearfix">
                    <div class="profile_pic">
                        <img src="../assets/images/img.jpg" alt="..." class="img-circle profile_img">
                    </div>
                    <div class="profile_info">
                        <span>Welcome,</span>
                        <h2>John Doe</h2>
                    </div>
                </div>
                <!-- /menu profile quick info -->

                <br />

                <!-- sidebar menu -->
                <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
                    <div class="menu_section">
                        <ul class="nav side-menu">
                            <li><router-link :to="{path:'/userManagement'}"><i class="fa  fa-group"></i> 用户管理</router-link></li>
                            <li><router-link :to="{path:'/businessManagement'}"><i class="fa  fa-user"></i> 商户管理 </router-link></li>
                            <li><router-link :to="{path:'/error'}"><i class="fa fa-dashboard"></i> 营运中心管理</router-link></li>
                            <li><router-link :to="{path:'/error'}"><i class="fa  fa-jsfiddle"></i> 财务管理</router-link></li>
                            <li><router-link :to="{path:'/error'}"><i class="fa  fa-line-chart"></i>消费管理 </router-link></li>
                        </ul>
                    </div>
                </div>
                <!-- /sidebar menu -->
            </div>
        </div>
</template>
<style scoped>
  .side-menu .router-link-active{
       border-right: 5px solid #1ABB9C;
       background: rgba(255,255,255,.05);
   }
</style>