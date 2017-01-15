vue2.0 
		brwoer info vue
		http://vuejs.org
变化
1.在每个组件模板中，不支持片段代码
	组件中模板
			之前：
				<template>
						<h3>我是组件</h3><strong>我是加粗标签</strong>
				</template>
			现在：必须有根元素，包裹住所有的代码
				<template>
					<div>
						<h3>我是组件</h3>
						<strong>我是加粗标签</strong>
					</div>
				</template>
2.关于组件定义
	Vue.extend() 	       这种方式，在2.0里面有，但是有一些改动，这种写法，即
							使能用，咱也不用--废弃

	Vue.component(组件名称,{	//在2.0继续能用
		data(){}
		methosd:{}
		template:
	})

	2.0推出椅子组件，简介定义方式
		var Home={
			template:''       --->Vue.extend()
		}

		Vue.component("my-aaa",Home);

3生命周期

之前：
	init
	create 
	beforeCompile
	compiled
	ready 					√	->monuted
	beforeDestory
	destroyed
现在：
	beforeCreate				组件实例化刚刚被创建
	created 					实例化已经创建完成，属性已经被绑定
		beforeMonut 			模板编译/挂载之前
		monuted 				模板编译之后，代替之前ready   ***
		beforeUpdate 			组件更新之前
		update 					组件更新完毕				  ***
	beforeDestory 				组件销毁前
	destroyed 					组件销毁后

3循环
	2.0里面默认就可以添加重复数据
	terack-by="$index"   vue1.0必须写 vue2.0不用写

	arr.forEach(function (item,index){

	})

	去掉隐士一些变量
		$index $key
	之前
		v-for="(index,val) in array"   更贴近原声js语法
		{{val}}--{{$index}}

		v-for="val in array"
		{{val}}--{{$index}}
	现在
		v-for="(val,index) in array"
		{{val}}--{{index}}

4.track-by="id"   去掉 track-by="index"
 	变成
		<li v-for="(val,index) in list" :key="index"></li>  提升性能
5.自定义键盘事件
	之前1.0做法：Vue.directive('on').keyCodes.ctrl=17;

	现在：Vue.config.keyCodes.ctrl=17
6.过滤器   作者推荐自己实现
		之前：
				系统就自带很多过滤器
				{{msg | currency }}
				{{msg | json }}
				.....
				limitBy
				filterBy

	到了2.0,内置过滤器，全部删除了

	lodash工具库  _.debounce(fn,200)

	自定义过滤器---还有
			但是，自定义过滤器传参数
		之前：{{msg | toDou '12' '5'}}
		现在：{{msg | toDou("12","5")}}

--------------------------------------
7.组件通信
		vm.$emit()
		vm.$on()

		父组件和子组件
		子组件想要拿到父组件数据
				通过props

		之前：子组件可以更改父组件信息，可以同步 sync 

			注意：vue2.0中作者已经删除sync同步更新数据

		现在：不允许直接给父级的数据，做赋值操作

		问题：就想更改
			a).父组件每次传递一个对象给子组件，对象之间引用 *****
			b).只是不报错，mounted中转

可以单一事件管理组件信息
		var Event=new Vue();

		Event.$emit(事件名称,数据);

		Event.$on(事件名称,function (data) {
				//data
		}).bind(this);

-------------------------------------------------------

debounce        废弃
		--> lodash
					_.debounce(fn,时间)

-------------------------------------------------------------
8.动画：
之前：
	transition之前是属性  放到元素里面
	<p transition='fade'></p>
	.fade-transition{}
	.fade-enter{}
	.fade-leave{}

vue2.0以后 transition组件
<transition name="fade">
			运动东西(元素,属性,路由...)
</transition>

class定义
.fade-enter{} 				//初始化状态
.fade-enter-active{}  		//变化成什么样-->当元素出来(显示出来)

.fade-leave{} 				//
.fade-leave-active{} 		//变成什么样  -->当元素离开(消失)
属性：
<transition name="fade"
		@before-enter="beforeEnter"
		@enter="enter"
		@after-enter="afterEnter"

		@before-leave="beforeLeave"
		@leave="leave"
		@after-leave="afterLeave"
>
		<p v-show="show"></p>
			运动东西(元素,属性,路由...)
</transition>

如何animate.css配合用？
		<transition enter-active-class="animated zoomInLeft" leave-active-calss="animated zoomOutRight">
				<p v-show="show"></p>
		</transition>

多个元素运动 //:key=""
		<transition-group enter-active-class=" " leave-active-class=" ">
			<p :key=""></p>
			<p :key=""></p>
		</transition-group>

-----------------------------
9.路由：
http://router.vuejs.org/zh-cn/index.html

1》基本使用：
a.布局
		<router-link to="/home">主页</router-link>

		<router-view></router-view>
b.路由具体写法
	// 组件
	var Home={
		template:'<h3>我是主页</h3>'
	};
	var News={
		template:'<h3>我是新闻页</h3>'
	}
	// 配置路由
	const routes={
		{path:'/home',component:Home},
		{path:'/news',component:News}
	}

	//生成项目路由实例
	const router=new VueRouter({
		routes
	})
	//最后挂载到vue上
	new Vue({
		router,
		el:'#box'
	});
c.重定向
		之前 router.redirect  废弃了
		{path:'*',redirect:'/home'}
---------------------------------------
2》.路由镶嵌
	/user/username

	const routes=[
		{path:'/home',component:Home},
		{
			path:'/user',
			component:User,
			children:[  //核心 和routes配置方法一致
				{path:'username',component:UserDetail}
			]
		},
		{path:'*',redirect:'/home'}   //404
	]
--------------------------------------
/user/tom/age/10
:id
:username
:age
---------------------------------------
路由实例方法
		router.push({path:'home'})   //直接添加一个路由,表现切换路由，本质往历史记录里面添加一个
		router.replace({path:'news'})  //替换路由，不会往历史记录里面添加
-------------------------------------------
10.vue-cli
--------------------
npm install 
脚手架
	vue-loader
		1.0->
			new Vue({
				el:'#app',
				components:{App}
			});
		2.0->
			new Vue({
				el:'#app',
				render:h=>h(App)
			})
// ES5
(function (h) {
  return h(App);
});

// ES6
h => h(App);

----------------------
vue2.0
		vue-loader和vue-reouter配合
---------------------------------------
style-loader css-loader

cnpm install vue-router --save
cnpm install css-loader style-loader --save-dev