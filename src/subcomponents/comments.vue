<template>
    <div class="outer">
        <p class="postComment">发表评论</p>
        <hr>
        <textarea name="" id="" cols="10" rows="5" placeholder="输入评论内容,不超过120个字符" maxlength="120"
                  v-model="msg"></textarea>
        <mt-button type="danger" size="large" @click="postCmts">发送评论</mt-button>
        <div class="member" v-for="(item,index) in list" :key="index">
            <p class="member-info">
                <span>第{{index+1}}楼 用户:{{item.user_name}} 发表时间:{{item.add_time | dateFormat}}</span>
            </p>
            <div class="member-cmts">
                {{item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content}}
            </div>
        </div>
        <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
	import {Toast} from 'mint-ui'

	export default {
		name: "comments",
		data() {
			return {
				pageIndex: 1,
				// id: this.$route.params.id,这个是子组件,id是要从父组件那里拿的
				list: [],
				msg: '',
			}
		},
		created() {
			this.getCmts()
		},
		methods: {
			getCmts() {
				this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex)
				.then(ret => {
					if (ret.body.status === 0) {
						this.list = this.list.concat(ret.body.message)
					} else {
						Toast('获取评论失败')
					}
				}) //有API文件说明格式
			},
			// getCmts2() {
			// 	this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex)
			// 	.then(ret => {
			// 		if (ret.body.status === 0) {
			// 			this.pageIndex = 1
			// 			this.list = ret.body.message
			// 		} else {
			// 			Toast('获取评论失败')
			// 		}
			// 	}) //有API文件说明格式
			// },
			getMore() {
				this.pageIndex++
				this.getCmts()
			},
			postCmts() {
				this.$http.post('api/postcomment/' + this.id, {content: this.msg.trim()})
				.then(ret => {
					if (ret.body.status === 0) {
						var newCmts = {
							user_name: '匿名用户',
							add_time: Date.now(),
							content: this.msg
						}

						this.list.unshift(newCmts)
						this.msg = ''
                      // this.getCmts2()
                      // this.msg = ''
					}
				})
			}

		},
		props: ['id']
	}
</script>

<style scoped lang="scss">
    .outer {
        .postComment{
            font-size: 16px;
            color:black;
            font-weight: bold;
        }
        .member {
            margin-top: 8px;

            .member-info {
                background-color: grey;
                color: black;
                display: flex;
                justify-content: space-between;
            }

            .member-cmts {
                font-size: 13px;
            }
        }
    }

</style>