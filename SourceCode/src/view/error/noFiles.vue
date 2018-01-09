<template>
  <div class="style-3">
    <div class="wrap404">
        <div class="row">
            <div class="mod-notfound grid-98"><img class="img-notfound" src="../../assets/images/notfound.gif">
                <p >错误页面！</p>
                <p style="MARGIN-BOTTOM: 30px"><router-link to="">返回</router-link></p>
        </div>
    </div>
</div>
  </div>
</template>
<style scoped>
    @import '../../assets/css/login.css';
    @media screen  and (min-width:768px) and (max-width:992px) {.img-notfound{width:70%}.wrap404{padding: 5% 15%}}
    @media screen  and (min-width:992px) and (max-width: 1200px){.img-notfound{width:60%}.wrap404{padding: 5% 15%}}
    @media (min-width:1200px){.img-notfound{width:55%}.wrap404{padding: 5% 20%}}
    @media (max-width:768px){.img-notfound{width:80%} .wrap404{padding: 5% 10%}}
    .mod-notfound {
        BORDER-RIGHT: #e1e1e1 1px solid;
        BORDER-TOP: #e1e1e1 1px solid;
        MARGIN-TOP: 50%;
        BACKGROUND: #fff;
        BORDER-LEFT: #e1e1e1 1px solid;
        BORDER-BOTTOM: #e1e1e1 1px solid;
        TEXT-ALIGN: center;
        border-radius: 10px;
        padding-bottom: 15px;
    }
</style>