<template>
    <div class="outer">
        <div class="product" v-for="(item,i) in list" tag="div" :key="i"
             @click="getRouter(item.id)">
            <img :src="item.img_url" alt="">
            <p class="title">{{item.title}}</p>
            <!--            <p class="detail">{{item.zhaiyao}}</p>-->
            <div class="grey">
                <div class="price">
                    <span class="new_price">${{item.sell_price}}</span>
                    <span class="old_price">${{item.market_price}}</span>
                </div>
                <div class="quantity">
                    <span class="hot">热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMoreP">加载更多</mt-button>
    </div>
</template>

<script>
	import {Toast} from 'mint-ui'

	export default {
		name: "productList",
		data() {
			return {
				pageIndex: 1,
				list: [],
				ret: []
			}
		},
		created() {
			this.getProductList()
		},
		methods: {
			getProductList() {
				this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then(ret => {
					if (ret.body.status === 0) {
						this.list = this.list.concat(ret.body.message)
						this.ret = ret.body.message
						// console.log(ret.body.message)
					}
				})
			},
			getMoreP() {

				if (this.ret.length != 0) {
					this.pageIndex++;
					this.getProductList()
				} else {
					Toast('没有更多商品可以加载')
				}
			},
			getRouter(id) {
				this.$router.push({name:'productInfo',params:{id}})
			}
		}
	}
</script>

<style scoped lang="scss">

    * {
        margin: 0;
        padding: 0;
    }

    .outer {
        /*padding:10px 10px;*/

        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;


        .product {
            width: 48%;
            padding: 5px;
            margin-top: 8px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .grey {
                background-color: gainsboro;
            }

            img {
                width: 100%;
            }

            .title {
                /*text-align: center;*/
                font-size: 14px;
            }

            .price {
                text-align: center;

                .old_price {
                    text-decoration: line-through;
                    font-size: 12px;
                }

                .new_price {
                    color: red;
                }
            }

            .detail {
                text-align: left;
                width: 100%;
                height: 50px;
            }

            .quantity {
                display: flex;
                justify-content: space-between;

                span {
                    font-size: 13px;
                }

                .hot {
                    color: red;
                }
            }
        }
    }
</style>