import VR from 'vue-router'//引入vue-router
import home from './components/home-part.vue'
import member from './components/member-part.vue'
import search from './components/search-part.vue'
import cart from './components/cart-part.vue'
import newsInfo from './components/newsInfo.vue'
import newsDes from './components/newsdetails.vue'
import shareImages from './components/share-images/image-list.vue'
import imgDes from './components/share-images/image-des.vue'
import productList from './components/product/productList.vue'
import productInfo from './components/product/productInfo.vue'
import productComment from "./components/product/productComment.vue"
import productInt from "./components/product/productInt.vue"



var router = new VR({
	routes: [
		{path:'/',redirect:'/home'},
		{path: '/home', component: home},
		{path: '/member', component: member},
		{path: '/cart', component: cart},
		{path: '/search', component: search},
		{path:'/home/newsInfo',component:newsInfo},
		{path:'/home/newsInfo/newsdes/:id',component:newsDes},
		{path:'/home/shareImages',component:shareImages},
		{path:'/home/imgdes/:id',component:imgDes},
		{path:'/home/productList',component:productList},
		{path:'/home/productInfo/:id',component:productInfo,name:'productInfo'},
		{path:'/home/productComment/:id',component:productComment},
		{path:'/home/productInt/:id',component:productInt}
	],
	linkActiveClass: 'mui-active'
})

export default router //将路由对象暴露出去