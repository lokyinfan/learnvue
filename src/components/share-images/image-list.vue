<template>
    <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl"
             class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" href="#item1mobile"
                   data-wid="tab-top-subpage-1.html"
                   v-for="item in this.list" :key="item.id" @click="getImgList(item.id)">
                    {{item.title}}
                </a>
            </div>
        </div>
        <!--图片列表-->
        <ul class="img-ul">
            <router-link v-for="(item,i) in imgList" :key="i" tag="li" :to="'/home/imgdes/'+item.id">
                <img v-lazy="item.img_url">
                <div class="img-info">
                    <p class="img-info-title">{{item.title}}</p>
                    <p class="img-info-detail">{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
	//引入MUI的js文件
	import mui from '../../lib/mui/js/mui.min.js'

	export default {
		name: "image-list",
		data() {
			return {
				list: [],
				imgList: []
			}
		},
		created() {
			this.getImgCategory()
			this.getImgList(0)
		},
		mounted() {
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});

		},
		methods: {
			getImgCategory() {
				this.$http.get('api/getimgcategory').then(ret => {
					if (ret.body.status === 0) {
						ret.body.message.unshift({title: "全部", id: 0});
						this.list = ret.body.message;
						/*之前是直接this.list = ret.body.message.unshift({title:'全部',id:0}) 一直都出不了效果,因为unshift()方法返回的是一个新长度,所以如果这样的话 this.list=7 ,其实我应该console.log一下this.list*/
						// console.log(this.list)
					}
				})
			},
			getImgList(cateid) {
				this.$http.get('api/getimages/' + cateid).then(ret => {
					if (ret.body.status === 0) {
						this.imgList = ret.body.message
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
    .container {
        .mui-slider {
            .mui-scroll {
                position: fixed;
                z-index: 1000;
                background-color: white;
            }
        }
    }

    .img-ul {
        padding: 0;
        margin: 0;
        list-style: none;

        li {

            margin-bottom: 10px;
            position: relative;


            img {
                width: 100%;
                vertical-align: middle;
            }

            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            background-color: #8f8f94;
            box-shadow: 0 0 6px #999999;
        }

        .img-info {
            .img-info-title {
                color: white;
                font-size: 16px;
            }

            .img-info-detail {
                color: white;
                font-size: 14px;
            }

            background-color: rgba(0, 0, 0, 0.6);
            position: absolute;
            bottom: 0;
        }
    }
</style>