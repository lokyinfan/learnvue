<template>
    <div class="outer">
        <h3 class="title">{{message.title}}</h3>
        <div class="data">
            <span>发布时间:{{message.add_time}}</span>
            <span>点击{{message.click}}次</span>
        </div>
        <hr>
        <div class="content" v-html="message.content">
        </div>
        <cmts-box :id="this.id"></cmts-box> <!-- 之前一直没有内容就是没有在这里设置,所以才会一直没有内容-->
    </div>
</template>

<script>
    import comments from '../subcomponents/comments.vue'

	export default {
		name: "newsdetails",
		data() {
			return {
				id: this.$route.params.id, //这样就可以拿到路由对象的后面传来的参数
				message:{}
			}
		},
		created() {
			this.getNewsDes()
		},
		methods: {
			getNewsDes() {
				this.$http.get("api/getnew/" + this.id).then(ret => {
					if(ret.body.status === 0){
						this.message = ret.body.message[0]
					}
				})
			}
		},
      components:{
        'cmts-box':comments
      }
	}
</script>

<style scoped lang="scss">
    .outer {

        .data {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;

            span {
                font-size: 12px;
            }
        }

        .title {
            color: red;
            text-align: center;
        }

        .content {
            color: grey
        }
        padding:4px
    }
</style>