<template>
    <div class="outer">
        <h3>{{imgInfo.title}}</h3>
        <div>
            <span>发表时间:{{imgInfo.add_time | dateFormat}}</span>
            <span>点击次数:{{imgInfo.click}}次</span>
        </div>
        <hr>
        <div class="content" v-html="imgInfo.content">

        </div>
        <vue-preview :slides="slide1"></vue-preview>
        <!-- 评论子组件 -->
        <cmt :id="id"></cmt>
    </div>
</template>

<script>
	import comment from '../../subcomponents/comments.vue'

	export default {
		name: "image-des",
		data() {
			return {
				id: this.$route.params.id,
				imgInfo: {},
				slide1: []
			}
		},
		created() {
			this.getImgDes()
			this.getThumb()
		},
		methods: {
			getImgDes() {
				this.$http.get('api/getimageInfo/' + this.id).then(ret => {
					if (ret.body.status === 0) {
						console.log(ret.body)
						this.imgInfo = ret.body.message[0]/*这里为什么是message[0]??我觉得原因是首先文档中显示拿回来的数据只有一个对象,这时候会有疑问,那么后面的都是用这个信息?
                     很明显不是的,因为忽略了一点就是this.$http.get('api/getimageInfo/' + id)
                     因为这个id都不一样,所以直接就决定后面的信息也不一样的*/
					}
				})
			},
			getThumb() {
				this.$http.get('api/getthumimages/' + this.id).then(ret => {
					if (ret.body.status === 0) {
						/* this.list = ret.body.message 因为获取回来的信息是没有 w 和 h属性的,所以需要到对象中,但是不能直接加,因为src和h w都要在一个对象中,我也想过其他一些方法,因为是没有对象的方法的,所以只能动态地增加属性,这个动态给对象添加属性在jQuery是学过得
						* 因为message数组有多个对象,所以需要循环
						*
						* 还有 以后看到对象,就要想到 . 因为在我的想法,只有.才是对象唯一的方法*/

						ret.body.message.forEach(item => {
							item.w = 600
							item.h = 400
                          item.msrc = item.src
						})

						this.slide1 = ret.body.message
					}
				})
			},
			handleClose() {
				console.log('close event')
			}
		},
		components: {
			'cmt': comment
		}
	}
</script>

<style scoped lang="scss">
    .outer {
        h3 {
            color: #549BD5;
            margin: 5px;
        }

        .content {
            margin: 5px;
        }

        overflow: hidden;
    }
</style>