<template>
    <mt-swipe :auto="4000">
        <!--            <mt-swipe-item>1</mt-swipe-item>-->
        <!--            <mt-swipe-item>2</mt-swipe-item>-->
        <!--            <mt-swipe-item>3</mt-swipe-item>-->
        <!-- item是list的值,所以item是里面的对象 -->
        <mt-swipe-item v-for="item in list" :key="item.id">
            <img :src="item.img" alt="" :class="{'full':isfull,height:true}">
        </mt-swipe-item>
       <!-- 因为标签里面的list 都是从父组件拿过来的,所以需要加一个props属性 -->

    </mt-swipe>
</template>

<script>
	export default {
		name: "carousel",
      props:['list','isfull']
	}
</script>

<style scoped lang="scss">
    .mint-swipe {
        height: 200px;


        .mint-swipe-item {
            .full{
                width:100%;
            }

            .height{
                height: 100%;
            }

            text-align: center;
        }



    }
</style>