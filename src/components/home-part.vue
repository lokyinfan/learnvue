<template>
    <div>
        <!--因为是在首页设置轮播图,所以swipe放在home这里-->
<!--        <mt-swipe :auto="4000">-->
<!--            &lt;!&ndash;            <mt-swipe-item>1</mt-swipe-item>&ndash;&gt;-->
<!--            &lt;!&ndash;            <mt-swipe-item>2</mt-swipe-item>&ndash;&gt;-->
<!--            &lt;!&ndash;            <mt-swipe-item>3</mt-swipe-item>&ndash;&gt;-->
<!--            &lt;!&ndash; item是list的值,所以item是里面的对象 &ndash;&gt;-->
<!--            <mt-swipe-item v-for="item in list" :key="item.id">-->
<!--                <img :src="item.img" alt="" class="carousel">-->
<!--            </mt-swipe-item>-->
<!--            &lt;!&ndash;这里为什么是url,因为老师说,在互联网里面什么url之类的这些都是唯一的,所以key绑定的是唯一的数据就可以&ndash;&gt;-->

<!--        </mt-swipe>-->
        <carousel :list="list" :isfull="true"></carousel>
        <ul class="mui-table-view mui-grid-view mui-grid-9" id="u1">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" id="l1"><router-link to="/home/newsInfo">
                <img src="../images/六宫格小图标/menu1.png" height="119" width="120"/>
                <div class="mui-media-body">新闻资讯</div>
            </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" id="l2"><router-link to="/home/shareImages">
                <img src="../images/六宫格小图标/menu2.png" height="119" width="120"/>
                <div class="mui-media-body">图片分享</div>
            </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" id="l3"><router-link to="/home/productList">
                <img src="../images/六宫格小图标/menu3.png" height="119"
                     width="120"/>
                <div class="mui-media-body">商品购买</div>
            </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" id="l4"><a href="#">

                <img src="../images/六宫格小图标/menu4.png" height="119" width="120"/>
                <div class="mui-media-body">留言反馈</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" id="l5"><a href="#">

                <img src="../images/六宫格小图标/menu5.png" height="119" width="120"/>
                <div class="mui-media-body">视频专区</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" id="l6"><a href="#">

                <img src="../images/六宫格小图标/menu6.png" height="119" width="120"/>
                <div class="mui-media-body">联系我们</div>
            </a></li>
        </ul>
    </div>
</template>

<script>
	import Toast from 'mint-ui'

    import carousel from '../subcomponents/carousel.vue'

	export default {
		name: "home-part",
		data: function () {
			return {
				list: []
			}
		},
		created() {
			this.getCarousel()
		},
		methods: {
			getCarousel() {
				this.$http.get('api/getlunbo').then(ret => {
					// console.log(ret.body)
					if (ret.body.status === 0) {
						this.list = ret.body.message
					} else {
						Toast('获取数据失败')
					}
				})
			}
		},
      components:{
			'carousel':carousel
      }
	}
</script>

<style scoped lang="scss">
    /*div{*/
    /*    height: 200px;*/
    /*    width: 200px;*/
    /*}*/
    /*.mint-swipe {*/
    /*    height: 200px;*/


    /*    .mint-swipe-item {*/
    /*        &:nth-child(1) {*/
    /*            background: #2ac845;*/
    /*        }*/

    /*        &:nth-child(2) {*/
    /*            background: #007aff;*/
    /*        }*/
    /*    }*/
    /*}*/



    .mui-table-view{
        img{
            height: 60px; /*为什么是60呢?通常假如图片是120*120,那么手机端都取一半*/
            width: 60px;
        }
        li{
            background-color: white;
        }
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell {
        background-color: white;
    }

    /*ul{*/
    /*    display: flex;*/
    /*    justify-content: space-between;*/
    /*    flex-wrap: wrap;*/


    /*}*/

    /*#u1{*/
    /*    display: flex;*/
    /*    justify-content: space-between;*/

    /*    .mui-table-view-cell{*/
    /*        flex: 32%;*/
    /*    }*/

    /*}*/

    .mui-media-body{
        margin-top:10px;
    }
</style>