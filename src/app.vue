<template>
    <div class="container">
        <!--这里是头部,是从mint-UI里面找到的-->
        <mt-header fixed title="固定在顶部"></mt-header>
        <transition>
            <router-view></router-view>
        </transition>
        <!--这里是底部,是从MUI里面找到的-->
        <nav class="mui-bar mui-bar-tab">

            <!--就是这个mui-active导致第一个icon可以高亮,所以我们可以利用router-link-active 来使得点击每一个组件都可以高亮-->
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <!-- mui-icon这个类名要留下,不能删
                 现在添加了类名还没有效果,因为extra-icon除了要引入MUI,还要引入cons-extra.css-->
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>

</script>

<style scoped>
    .container{
        padding-top:40px;
        overflow: hidden;/*设置这个的原因主要是因为一个进来,另外一个出去,这时两个组件同时并存,就会拉大网页,出现横向滚动条,所以设置超出部分隐藏*/
        padding-bottom: 50px;
    }

    .v-enter{
        opacity: 0;
        transform: translateX(100%); /*我们想要的效果是,从右边进来,从左边出去,如果.v-enter和.v-leave-to都一起设置那么就会变成从右边进,从右边出*/
    }

    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position:absolute; /*这里为什么是absolute??
        因为想它离开时,脱离文档流,这样就可以不会妨碍到其他元素*/
    }

    .v-enter-active,.v-leave-active{
        transition: all 0.5s ease;
    }
</style>