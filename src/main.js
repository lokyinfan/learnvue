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
import {Header,Swipe,SwipeItem,Button} from 'mint-ui'
//配置mint-UI
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Button.name,Button)

//引入mui
import './lib/mui/css/mui.min.css'

//引入mui的icons-extra.css 因为有些额外的图标需要引入这个css文件
import './lib/mui/css/icons-extra.css'

//因为Module not found: Error: Can't resolve '../fonts/mui-icons-extra.ttf' in 'D:\H5\vue\7day\project\src\lib\mui\css'
//所以还要引入ui-icons-extra.ttf 才能让 icons-extra.css正常使用
import './lib/mui/fonts/mui-icons-extra.ttf'

/*注意除了要引入router.js还要引入vue-router,如果没有引入就会识别不了router.js*/
import VueRouter from 'vue-router'

Vue.use(VueRouter) //记得安装路由

import router from './router.js'

//先安装vue-resource,再引入vue-resource
import VueResource from 'vue-resource' //如果发现是灰色的,就可能代表是需要安装到vue
Vue.use(VueResource)

Vue.http.options.root='http://www.liulongbin.top:3005'
//引入app.vue
import app from './app.vue'

import moment from 'moment'

Vue.filter('dateFormat',function (dateStr) {
	return moment(dateStr).format('YYYY-MM-DD HH:mm:ss')
})

var vm = new Vue({
	el: '#app',
	data: {},
	methods: {},
	router,
	render: (c) => c(app)
});