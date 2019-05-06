//入口文件

//引入vue
import Vue from 'vue'
//引入mint-UI
import MintUI from 'mint-ui'
//把mint-UI安装到vue上
Vue.use(MintUI)
//引入mint-UI样式
import 'mint-ui/lib/style.css'
//引入Header
import {Header} from 'mint-ui'
//配置mint-UI
Vue.component(Header.name,Header)

//引入mui
import './lib/mui/css/mui.min.css'

//引入router
import router from 'vue-router'
//引入app.vue
import app from './app.vue'


var vm = new Vue({
	el: '#app',
	data: {},
	methods: {},
	router,
	render: (c) => c(app)
});