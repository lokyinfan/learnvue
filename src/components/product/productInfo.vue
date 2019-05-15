<template>
    <div>
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="flag" ref="redBall"></div>
        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <carousel :list="list" :isfull="false"></carousel>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{info.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>
                        <span><del>市场价:￥{{info.market_price}}</del></span>
                        <span class="now_price">销售价:￥{{info.sell_price}}</span>
                    </p>
                    <!-- numbox子组件 -->
                    <numBox @getCount="getSelectedCount" :max="info.stock_quantity"></numBox>
                    <!-- numbox子组件 -->
                    <div class="btn">
                        <mt-button size="small" type="primary">立即购买</mt-button>
                        <mt-button size="small" type="danger" @click="addShopcart">加入购物车</mt-button>
                    </div>

                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{info.goods_no}}</p>
                    <p>库存情况:{{info.stock_quantity}}</p>
                    <p>上架时间:{{info.add_time|dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <router-link :to="'/home/productInt/'+id">
                    <mt-button size="large" type="primary">图文介绍</mt-button>
                </router-link>
                <router-link :to="'/home/productComment/'+id">
                    <mt-button size="large" type="danger">商品评论</mt-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
	import carousel from '../../subcomponents/carousel.vue'

	import numBox from '../../subcomponents/numbox.vue'

	import mui from '../../lib/mui/js/mui.min.js'

	export default {
		name: "productInfo",
		data() {
			return {
				id: this.$route.params.id,
				list: [],
				info: {},
				flag: false,
				pCount: 1 //将pCount设定为1的意思就是,至少为1,如果不设置的话,至少都要设置一个null
			}
		},
		created() {
			this.getCarousel(),
				this.getInfo()
		},
		mounted() {
			mui('.mui-numbox').numbox()
		},
		methods: {
			getCarousel() {
				this.$http.get('api/getthumimages/' + this.id).then(ret => {
					if (ret.body.status === 0) {
						ret.body.message.forEach(item => {
							item.img = item.src
						})
						this.list = ret.body.message
					}
				})
			},
			getInfo() {
				this.$http.get('api/goods/getinfo/' + this.id).then(ret => {
					if (ret.body.status === 0) {
						this.info = ret.body.message[0]
						// console.log(ret.body.message)
					}
				})
			},
			addShopcart() {
				this.flag = !this.flag
			},
			beforeEnter(el) {
				el.style.transform = 'translate(0,0)'
			},
			enter(el, done) {
				el.offsetWidth

				const badgePosition = document.getElementById('badge').getBoundingClientRect()

				const redBallPosition = this.$refs.redBall.getBoundingClientRect()
				const x = badgePosition.left - redBallPosition.left
				const y = badgePosition.top - redBallPosition.top


				el.style.transform = `translate(${x}px,${y}px)`
				el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)'
				done()
			},
			afterEnter(el) {
				this.flag = !this.flag
			},
			//父组件传递方法给子组件
			getSelectedCount(count) {
				this.pCount = count
				console.log(this.pCount)
			}
		},
		components: {
			carousel,
			numBox
		}
	}
</script>

<style scoped lang="scss">
    .now_price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .btn {
        margin-top: 10px;
    }

    .mui-card-footer {
        display: block;

        button {
            margin-top: 10px;
        }
    }

    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        left: 79px;
        top: 390px;
        z-index: 1000;
    }
</style>