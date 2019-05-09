<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsInfo/newsdes/' + item.id"> <!--注意:1.自己导致报错,没有填写item.id,
                2.而且需要套两个引号,地址套一个单引号,整个套一个双引号
                3.需要在to属性前面加一个冒号,不然是获取不到item.id,因为item是属于 newslist里面的数据,而需要获取data就要加冒号-->
                    <img class="mui-media-object mui-pull-left"
                         :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发布时间:{{item.add_time | dateFormat}}</span>
                            <span>点击{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
	import {Toast} from 'mint-ui'

	export default {
		name: "newsInfo",
		data() {
			return {
				newslist: []
			}
		},
		created() {
			this.getNewsList()
		},
		methods: {
			getNewsList() {
				this.$http.get('api/getnewslist').then(ret => {
					if (ret.body.status === 0) { //记住这里是ret.body.status,找错找了很久
						this.newslist = ret.body.message
					} else {
						Toast('获取数据失败')
					}
					// console.log(ret.body)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
    .mui-table-view {
        li {
            h1 {
                font-size: 14px;
            }

            .mui-ellipsis {
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>