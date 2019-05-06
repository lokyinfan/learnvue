const path = require('path');

//const webpack = require('webpack') 热更新第二步

//需要引入html-webpack-plugin这个模块
const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin=require('vue-loader/lib/plugin')

module.exports = {
	entry: path.join(__dirname, './src/main.js'),
	
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	mode: 'development',
	
	/*为了能直接访问页面,所以引入plugin属性,plugin有两个作用,第一个是如果要在webpack.config.js配置热更新的话,就有plugins
	* 第二个作用就是直接在内存中存放模板页面,这样我们就不需要在HTML文件中手动引入js文件,我们安装了html-webpack-plugin就可以帮我们自动完成*/
	plugins: [ //plugins是一个节点
		//	new webpack.HotModuleReplacementPlugin() 热更新的第三步
		new htmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'),//这是指定模板页面的相对路径,将来会根据这个指定的路径去生成内存的页面
			filename: 'index.html' //指定生成页面的名称
		}),
		new VueLoaderPlugin()
		
	],
	module: {	//这个节点,用于配置所有第三方模块加载器
		rules: [ //所有第三方模块的匹配规则
			{test: /\.css$/, use: ['style-loader', 'css-loader']},
			{test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
			{test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
			/*
			*url-loader后面可以添加参数,跟url添加参数传值一模一样,?后面以key=value&key=value的形式传参
			* 那传参有什么用?如果不传的话,为了防止重名,会被base64位转码
			* 如果想要展示该图片本来的名字,就要传参进去
			* 参数是固定的
			* 第一个参数 limit,limit是图片大小的限制,单位是byte,如果引用的图片大于limit值,则不会转为64格式字符串,如果小于就会
			* 第二个参数是name,name的值可以说也是固定的
			* 值为[name].[ext],name=[name].[ext]中,
			* [name]意思是设置文件名为文件原来的名字,[ext]是本来的后缀名*/
			{test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7630&name=[hash:8]-[name].[ext]'},
			/*
			* 因为本来在index.scss里面,就引入了两个处于不同文件夹,但文件名相同的图片,经过上面的操作,两个图片都是以自己名字出现,这就导致后面同名的文件会覆盖前面同名的文件,所以为了又可以显示自己的文件名,又可以不被覆盖,在name前面添加一个hash值
			*
			* 以这种形式呈现 name=[hash:8]-[name].[ext],hash值跟name之间用-连接,
			* 给两个同名的文件前面加一个随机的hash值,这就相当于变相地让他们的名字不一样
			* [hash:8]的意思是,随机取hash值的前八位,因为hash值是32位的,也可以设置取前32位,看个人喜欢*/
			
			{test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
			{test:/\.js$/,use:'babel-loader', exclude: /node_modules/},
			{test:/\.vue$/,use:'vue-loader'}
		]
	},
	resolve:{
		alias:{ //修改包的路径,默认的是vue.runtime.common.js
			// "vue$":"vue/dist/vue.js"
		}
	}
	
// 	devServer: {
// 		//自动打开浏览器
// 		open: true,
// 		//端口号
// 		port: 3000,
// //热更新(配置方式可选)
// 		hot: true //热更新的第一步
// 	}
}