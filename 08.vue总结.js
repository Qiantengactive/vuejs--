vue:
	两种
		1.直接页面级开发,script直接引入vue
		2.工程性开发，webpack+loader\ vue-cli
------------------------------
webpack配置多文件入口
--------------------------------
webpack 打包完很大
		bundle.js
		build.js

		a>.webpack代码拆分：code-spliting;
		b>.提取公共(css.js)
		c>.预渲染：prerender-spa-plugin
		d>.后台---开启压缩.gz
		e>.异步加载组件
					require.ensure


---------------------------------
vuex
---------------------------------
Vue 10月1	==> 2.0 变简单 

--------------------------------
组件之间的通信
	vue1.0=》props=》子组件可以更改父组件数据 .sync

	解决问题：
			0.props一层一层传递
			1.$emit  单一事件管理

				单独准备Store.js
				var Event = new Vue();
				export default Event  全局组件

			2.对象之间的引用
				msg:'welcome'->子级

				msg:{
					title:'welcome'
				}

				msg:title
			3.vuex   管理状态

-------------------------------
src/


$http('../src/data/api')


localhost:8080#/home
localhost:8080#/home
--------------
Missing  reuqired prop :'to'
found in component <router-link>
------------------------------------
axios-组件库
axios---不能use==>需要 Vue.prototype.$http=axios;//把axios对象挂到Vue原型上

 			fetchData(id){
                var _this=this;
                this.$http.get('../src/data/article.data').then(function(res){
                    _this.articleData=res.data[id-1];
                }).catch(function(err){
                    console.log('文章详细页面:',err);
                })
            }
loading
		install
vue init webpack-simple

webpack 
this==>new Vue()
this==>原声DOM对象

data props mounted三种   可以放属性
-----------------------
vue中引入百度地图
		1.<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您需要index.html"

		2map.vue
			template
					<div id="div1" :style="style"></div>
			export default{
				data:(){
						style:{
							width:'100%',
							height:this.height+'px'
						}
				},
				props:{
						height:{
							type:Number,
							default:300
						},
						longitude:{},
						latitude:{}
				},
				mounted(){
					var map=new BMap.Map("div1");
					var point=new BMap.Point(this.longitude,this.latitude)
					map.centerAndZoom(point,12)
					var marker=new BMap.Marker(point);//创建标注
					map.addOverlay(marker);
				}

			}
-----------------------------------------------
App.vue
	template
		<MapView :height="300" :latitude=""></MapView>

import MapView

export default{
		components:{
			MapView
		},
		 mounted:
}

vue:
	指令 
	属性
	事件
	数据
			data,props/computed
	生命周期
-----------------------------
Vue2.0==》React
虚拟DOM树

json

node_module rm -rf

-g>命令环境用
		webpack