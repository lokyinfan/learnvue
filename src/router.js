import VR from 'vue-router'//引入vue-router
import home from './components/home-part.vue'
import member from './components/member-part.vue'
import search from './components/search-part.vue'
import cart from './components/cart-part.vue'
import newsInfo from './components/newsInfo.vue'
import newsDes from './components/newsdetails.vue'


var router = new VR({
	routes: [
		{path:'/',redirect:'/home'},
		{path: '/home', component: home},
		{path: '/member', component: member},
		{path: '/cart', component: cart},
		{path: '/search', component: search},
		{path:'/home/newsInfo',component:newsInfo},
		{path:'/home/newsInfo/newsdes/:id',component:newsDes}
	],
	linkActiveClass: 'mui-active'
})

export default router //将路由对象暴露出去