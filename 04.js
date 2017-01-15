git page:
任何仓库master分支，都可以发布get page 

---------------------------------------
1.0
2.0
---------------------------------------
bower==>偏向npm更确切的说是偏向前端的包管理器
	npm install bower -g
			验证：bower --version
bower install <包名>#1.0.28   下载指定版本
bower uninstall <包名>
bower info <包名>  查看包版本信息
----------------
1.引入vue.js

vue==》过渡(动画)
 本质走的是css3的动画

规定名称：放置一个transition
  <div id="div1" v-show="isShow" transition="fade"></div>
动画：
	进入：
        .fade-enter{
            opacity: 0;
        }
	离开：
        .fade-leave{
            opacity: 0;
            transform: translateX(200px);
        }
       animate.css动画
--------------------------------------
vue组件
	组件：一个大的对象
定义一个组件：
1.全局组件
	方式1：
		<script>
		   var Aaa=Vue.extend({
		        template:'<h3>我是标题3</h3>'
		    });
		   Vue.component('aaa',Aaa);
		    new Vue({
		        data:{
		            isShow:false
		        }
		    }).$mount("#box")
		</script>
	方式2：
		<div id="box">
		    <aaa></aaa>
		</div>
		<script>
		    Vue.component('aaa',{
		        template:'<h3>我是标题三</h3>'
		    });
		    new Vue({
		        data:{
		            isShow:false
		        }
		    }).$mount("#box")
		</script>
2.组件里面放数据
	注意：data必须是函数，
		<div id="box">
		        <aaa></aaa>
		</div>
		<script>
		    var Aaa=Vue.extend({
		        data:function () {
		            return {
		                msg:"我是标题"
		            };
		        },
		        template:'<h3>{{msg}}</h3>'
		    });
		    Vue.component('aaa',Aaa);
		    new Vue({
		        data:{
		            isShow:false
		        }
		    }).$mount("#box")
		</script>
3.局部组件 :放到某个组件里面
	方式1:
		<div id="box">
		        <aaa></aaa>
		</div>
		<script>
		    var Aaa=Vue.extend({
		        template:'<h3>{{msg}}</h3>',
		        data(){
		            return {
		                msg:'aaaaa'
		            }
		        }
		    });
		    new Vue({
		        data:{
		            isShow:false
		        },
		        components:{
		//            局部组件
		            aaa:Aaa
		        }
		    }).$mount("#box")
		</script>
	方式二:
		<div id="box">
	        <my-aaa></my-aaa>
		</div>
		<script>
		    new Vue({
		        components:{
		            "my-aaa":{
		                template:"<strong>好</strong>"
		            }
		        }
		    }).$mount("#box")
		</script>
---------------------------
另一种方式： 这个使用的比较多
	<div id="box">
	        <my-aaa></my-aaa>
	</div>
	<script>
	    Vue.component("my-aaa",{
	        template:"<strong>好</strong>"
	    })
	    new Vue({
	    }).$mount("#box")
	</script>
配合模板：
1. template:"<strong @click='change'>{{msg}}</strong>
2.单独放到某个地方
	a>
		<div id="box">
	        <my-aaa></my-aaa>
		</div>
		<script type="x-template" id="aaa">
		    <strong @click='change'>标题==》{{msg}}</strong>
		</script>
		<script>
		    new Vue({
		        components:{
		            "my-aaa":{
		                data(){
		                  return{msg:"welcome vue"}
		                },
		                methods:{
		                    change:function () {
		                        this.msg="gaile";
		                    }
		                },
		                template:"#aaa"
		                // template:'<strong @click='change'>标题==》{{msg}}</strong>'
		            }
		        }
		    }).$mount("#box")
		</script>
	b).<template></template>方式
		<div id="box">
		        <my-aaa></my-aaa>
		</div>
		<template id="aaa">
		    <h1>欢迎你</h1>
		    <strong @click='change'>标题==》{{msg}}</strong>
		    <ul>
		        <li v-for="item in arr">
		            {{item}}
		        </li>
		    </ul>
		</template>
		<script>
		    new Vue({
		        components:{
		            "my-aaa":{
		                data(){
		                  return{
		                      msg:"welcome vue",
		                      arr:['aa','bb','cc']
		                  }
		                },
		                methods:{
		                    change:function () {
		                        this.msg="gaile";
		                    }
		                },
		                template:"#aaa"
		            }
		        }
		    }).$mount("#box")
		</script>
---------------------------
动态组件：
 <component :is="组件名称"></component>
	 eg:
		<div id="box">
		    <input type="button" @click="a='aaa'" value="aaa组件">
		    <input type="button" @click="a='bbb'" value="bbb组件">
		    <component :is="a"></component>
		</div>
		<script>
		    new Vue({
		        data:{
		            a:'bbb'
		        },
		        components:{
		            'aaa':{
		                template:'<h2>我是aaa组件</h2>'
		            },
		            'bbb':{
		                template:'<h2>我是bbb组件</h2>'
		            }
		        }
		    }).$mount("#box")
		</script>

vue默认情况下，子组件没法访问父组件的数据
组件间的数据传输
1.组件就想获取父组件信息 data
	在调用子组件：
	<bbb :m='数据'></bbb>
	子组件之内：
	props:['m','myMsg']

	props:{
		'm':String,
		'myMsg':Number   //注意大小驼峰命名法
	}
		eg1：父到子
			<body>
			<div id="box">
			    <aaa></aaa>
			</div>
			<tempalte id="aaa">
			    <bbb :m="msg2" :my-msg="msg">{{msg2}}</bbb>
			</tempalte>
			<script>
			    new Vue({
			        data:{
			            a:'bbb'
			        },
			        components:{
			            'aaa':{
			                data(){
			                    return {
			                        msg:111,
			                        msg2:"我是父组件的数据"
			                    }
			                },
			                template:'#aaa',
			                components:{
			                    "bbb":{
			//                        props:{
			//                            'm':String
			//                        },
			                        props:['m','myMsg'],
			                        template:'<h2>我是bbb组件-->{{m}}<br>{{myMsg}}</h2>'
			                    }
			                }
			            }
			        }
			    }).$mount("#box")
			</script>
			</body>
			</html>
		eg2：子到父
			<body>
			<div id="box">
			    <aaa></aaa>
			</div>
			<template id="aaa">
			    <span>我是父级——》{{msg}}</span>
			    <bbb @child-msg="get"></bbb>
			</template>
			<template id="bbb">
			    <h3>子组件</h3>
			    <input type="button" value="send" @click="send">
			</template>

			<script>
			    new Vue({
			        data: {
			            a: 'aaa'
			        },
			        components: {
			            'aaa': {
			                data(){
			                    return {
			                        msg: 111,
			                        msg2: "我是父组件的数据"
			                    }
			                },
			                template: '#aaa',
			                methods: {
			                    get(msg){
			//                      alert(msg);
			                        this.msg = msg;
			                    }
			                },
			                components: {
			                    "bbb": {
			                        data: function () {
			                            return {
			                                a: '我是子组件的数据'
			                            }
			                        },
			                        template: '#bbb',
			                        methods: {
			                            send: function () {
			                                this.$emit('child-msg', this.a)
			                            }
			                        }
			                    }
			                }
			            }
			        }
			    }).$mount("#box")
			</script>
			</body>
			</html>
2.父级获取子级数据
	*子组件把自己的数据，发送到父级
	vm.$emit(事件名，数据);
	v-on:  ==>@
	eg：
			<body>
			<div id="box">
			    <aaa></aaa>
			</div>
			<template id="aaa">
			    <span>我是父级——》{{msg}}</span>
			    <bbb @child-msg="get"></bbb>
			</template>
			<template id="bbb">
			    <h3>子组件</h3>
			    <input type="button" value="send" @click="send">
			</template>

			<script>
			    new Vue({
			        data:{
			            a:'aaa'
			        },
			        components:{
			            'aaa':{
			                data(){
			                    return {
			                        msg:111,
			                        msg2:"我是父组件的数据"
			                    }
			                },
			                template:'#aaa',
			                methods:{
			                  get(msg){
			//                      alert(msg);
			                      this.msg=msg;
			                  }
			                },
			                components:{
			                    "bbb":{
			                        data:function () {
			                            return{
			                                a:'我是子组件的数据'
			                            }
			                        },
			                        template:'#bbb',
			                        methods:{
			                            send:function () {
			                                this.$emit('child-msg',this.a)
			                            }
			                        }
			                    }
			                }
			            }
			        }
			    }).$mount("#box")
			</script>
--------------------------------------------
vm.$dispatch(事件名，数据)  子级向父级发送数据
vm.$broadcast(事件名，数据) 父级向子集广播数据
	配合event:{}
		注：在vue2.0里面已经报废
----------------------------------------------
slot：
	位置，槽口
	作用：占个位置
	类似ng里面transclude(指令)
	eg1:
			<!doctype html>
			<html lang="en">
			<head>
			    <meta charset="UTF-8">
			    <meta name="viewport"
			          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
			    <meta http-equiv="X-UA-Compatible" content="ie=edge">
			    <title>Document</title>
			    <script src="bower_components/vue/dist/vue.js"></script>
			    <style>
			    </style>
			</head>
			<body>
			<div id="box">
			    <aaa>
			        <ul>
			            <li>aaa111</li>
			            <li>aaa222</li>
			            <li>aaa333</li>
			            <li>aaa444</li>
			        </ul>
			    </aaa>
			</div>
			<script>
			    var vm=new Vue({
			        el:'#box',
			        data:{
			            a:'aaa'
			        },
			        components:{
			            'aaa':{
			                template:'<h1>xxxxx</h1>'
			            }
			        }
			    })
			</script>
			</body>
			</html>
	eg2:
		<!doctype html>
		<html lang="en">
		<head>
		    <meta charset="UTF-8">
		    <meta name="viewport"
		          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
		    <meta http-equiv="X-UA-Compatible" content="ie=edge">
		    <title>Document</title>
		    <script src="bower_components/vue/dist/vue.js"></script>
		    <style>
		    </style>
		</head>
		<body>
		<div id="box">
		    <aaa>
		        <ul>
		            <li>aaa111</li>
		            <li>aaa222</li>
		            <li>aaa333</li>
		            <li>aaa444</li>
		        </ul>
		    </aaa>
		    <hr>
		    <aaa>

		    </aaa>
		</div>
		<template id="aaa">
		    <h1>xxxx</h1>
		    <slot>这是默认情况-没有填充就显示</slot>
		    <p>welcome vue</p>
		</template>
		<script>
		    var vm=new Vue({
		        el:'#box',
		        data:{
		            a:'aaa'
		        },
		        components:{
		            'aaa':{
		                template:'#aaa'
		            }
		        }
		    });
		</script>
		</body>
		</html>
	eg3:
		<!doctype html>
		<html lang="en">
		<head>
		    <meta charset="UTF-8">
		    <meta name="viewport"
		          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
		    <meta http-equiv="X-UA-Compatible" content="ie=edge">
		    <title>Document</title>
		    <script src="bower_components/vue/dist/vue.js"></script>
		    <style>
		    </style>
		</head>
		<body>
		<div id="box">
		    <aaa>
		        <ul slot="ul-slot">
		            <li>aaa111</li>
		            <li>aaa222</li>
		            <li>aaa333</li>
		            <li>aaa444</li>
		        </ul>
		        <ol  slot="ol-slot">
		            <li>bbb111</li>
		            <li>bbb222</li>
		            <li>bbb333</li>
		            <li>bbb444</li>
		        </ol>
		    </aaa>
		    <hr>
		    <aaa>
		    </aaa>
		</div>
		<template id="aaa">
		    <h1>xxxx</h1>
		    <slot name="ol-slot">这是默认情况-没有填充就显示</slot>
		    <p>welcome vue</p>
		    <slot name="ul-slot">这是默认情况-没有填充就显示</slot>
		</template>
		<script>
		    var vm=new Vue({
		        el:'#box',
		        data:{
		            a:'aaa'
		        },
		        components:{
		            'aaa':{
		                template:'#aaa'
		            }
		        }
		    });
		</script>
		</body>
		</html>
---------------------------------------------
vue-SPA应用，单页面应用
	vue-resouce 	交互
	vue-router 		路由
	根据不同url地址，出现不同效果
	vue-router 0.7.13
主页： 	home
新闻页  news
html:
	<a v-link={path:'/home'}>主页</a>		跳转链接
	展示内容
	<router-view></router-view>
js：
	// 1.准备一个根组件
		var App=Vue.extend();
	// 2.Home News组件都准备
		var Home=Vue.extend({
			template:'<h3>我是主页</h3>'
		});
		var News=Vue.extend({
			template:'<h3>我是新闻</h3>'
		});
	// 3准备路由
		var router=new VueRouter();
	4.关联
		router.map({
			'home':{
				component:Home
			},
			'news':{
				component:News
			}
		});
	// 5.启动路由
		router.start(App,"#box");
	// 6.跳转：
		router.redirect({
			'/':'home'
		})
-----------------------------------------
路由嵌套(多层路由)
	主页：home
		  登录	home/login
		  注册	home/reg
	新闻页 news 
	subRoutes:{
		'login':{
			component:{
				template:'<strong>我是登录信息</strong>'
			}
		},
		'reg':{
			component:{
				template:'<strong>我是注册信息</strong>'
			}
		}
	}
路由其他信息
	/detail/:id/age/:age

	{{$route.params | json }}   ===>当前参数

	{{$route.path}}				====>当前路径

	{{$route.query |json }} 	====>数据
----------------------------------------------
vue-loader:
	其他loader=>css-loader,url-loader,html-loader.........
	后台：nodeJS	==》require,exports 
	broserify		模块加载，只能加载js
	webpack 		模块加载器，一切东西都是模块，最后打包到一块了

	require('style.css')  ==>css-loader,style-loader

	vue-loader基于webpack

	.vue文件：
	放置的是vue组件代码
	<template>
	</template>
	<style>
			css
	</style>
	<script>
			js (平时代码 es6)   babel-loader
	</script>
-----------------------------------------
简单的目录结构
|-index.html 
|-main.js			入口文件
|-App.vue           vue文件,官方推荐命名法
|-package.json 		工程文件(项目依赖，命名，配置)
		npm init   生成
|-webpack.config.js		webpack配置文件

es6模块化开发
		导出模块
			export default {}
		引入模块
			import 模块名 from 地址
-----------------------------------------
webpack准备工作    ---save-dev以后使用install

		1.cnpm install webpack  --save-dev 自带服务器
		c2.npm install webpack--dev-save--save-dev
		注意： --dev-save是表示自带服务器
			   --save-dev是表示表示放在开发项目依赖中

		App.vue=>变成正常代码  vue-loader@8.5.4
		3.cnpm install vue-loader@8.5.4 --save-dev
		4.cnpm install vue-html-loader--save-dev
						加载css
						--------------------------
		vue-html-loader,css-loader,vue-style-loader

		改变代码刷新没有错误加载js
		--------------------
		vue-hot-reload-api@1.3.2

		babel-loader
		babel-core 									核心语法
		babel-plugin-transform-runtime
		babel-preset-es2015
		babel-runtime

最最核心
	必须依赖使用：save
	开发放在dev中
	npm install vue@1.0.28 --save