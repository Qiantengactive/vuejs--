使用被人的组件：
Vue.use(Vuesource)
Vue.use(VueRouter)
Vye.use(MintUi)
axios  不能直接use因为没有写install

Vue.use(Axios)


自定义vue全局组件：
使用：
<loading></Loading>
---------------------------------
npm install cnpm -g
----------------------------------
个人习惯
		|-loading/
				|-index.js		导出组件，并且install
				|-Loading-vue	//Loading组件
主要文件index.js代码
		import LoadingComponent from './Loading.vue'

		const Loading={
			// install是默认的方法  外界在use调用的时候就回调用install方法且传入一个参数Vue
			install:function(Vue){
				Vue.component('Loading',LoadingComponent)  //Loading是自定义组件
			}
		};
		export default Loading

调用Vue.use(Loading);
--------------------------------------------
vuex:集中式管理数据
	http://vuex.vuejs.org/

vuex提供两个非常靠谱的方法
	mapActions	管理所有事件(行为)  集成所有事件打包 提交事件
	mapGetters  获取数据
				Backend　Ａｐｉ
					↑
				　　│				Vuex
			   －－ │－－－－－－－－－－－－－－－－－
	Dispatch   │	↓			  Commit		　     │
	--------------→Actions-------------------	　     │
	|	       │						    |	　     │
	|		   │						    ↓　	　     │
Vue Components │						mutations←--------→Devtools
	↑		   │						    |          │
	|--------------state←-------------------↓          │
		Render │				Mutate                 │
			   │                                       │
			   －－－－－－－－－－－－－－－－－－－－－
cnpm install vuex -D




建议：一些公共文件jquery,jquery插件，一般在index.html 里面插入

main.js  require()/import


项目需要模块
  {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/
        },
npm install style-loader
npm install css-loader

assets ====>静态资源 img,css,js
想在js里面引入css模块：style-loader,css-loader

watch:{		//当路由发生变化时触发
	$route(){
		alert(1);
	}
}

axios:可以配置  具体看手册
		目前为止：axios,不能Vue.use(axios)//以为没有install
// 关于axios安装配置
	axios.interceptors.request.use(function(config) {
	  //配置发送请求的信息
	    store.dispatch('showLoading')  //显示loading
	    return config;
	}, function(error) {
	    return Promise.reject(error);
	});

	axios.interceptors.response.use(function(response) {
	  //配置请求回来的信息
	    store.dispatch('hideLoading')
	    return response;
	}, function(error) {
	    return Promise.reject(error);
	});

	//配置请求根路径
	axios.defaults.baseURL='http://localhost:8082/';
	// 设置post头部信息
	axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	//
	Vue.prototype.$http = axios; //把axios对象挂到Vue原型上
























