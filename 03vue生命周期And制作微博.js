vue制作微博


this.$http({
	url:地址
	data:给后台提交数据
	method:'get'/post/jsop
	jsonp:'cb'/cbName
})


vue事件：
	@click=""
数据：

添加一条留言

获取某一页数据
	getPageData(1)
---------------------
vue生存周期==》1.0.21版本==》2.0版本更新了
	钩子函数：
	created			==>实例已经创建							这里也可以
	beforeCompile	==>编译之前
	compiled		==>编译之后 
	ready			==>渲染DOM树  将文本节点插入到文本中   一般页面加载放到这里

	beforeDestory	==>销毁之前
	destroyed		==>销毁之后
-----------------------------
闪烁：	v-cloak
用户会看到花括号标记
	v-cloak			防止闪速   [v-cloak]{display:none}
	eg:
	span
	 <span>{{msg}}</span>    ==>v-text
	 <span v-text="msg"></span>    ==>v-text
	 {{{msg}}}vue2.0已经删除 ==>v-html

------------------
ng:$scope.$watch

vue:
计算属性的使用
	是属性不是函数
	computed:{
			b:function () {   //默认调用get
					return 值
			}
	}
	computed:{
		b:{
			get:function () {

			},
			set:function (val) {   //val是一个默认值
				// 设置值
			}
		}
	}

	computed里面可以放置一些业务逻辑代码，一定记得return
----------------------------------------------
vue实例简单方法：
	vm.$el 	  	=》就是元素
	vm.$data  	=》就是data
	vm.$mount 	=>就是挂在vue程序
			方法一：
			var vm = new Vue({
			// el: '#box',
	        data: {
	            a:"互联网世界",
		        }
		    });
		    vm.$mount('#box');   //收到挂载
		    方法二
		    var vm = new Vue({
			// el: '#box',
	        data: {
	            a:"互联网世界",
		        }
		    }).$mount('#box');

		    vm.$mount('#box');   //收到挂载
	vm.$options =>获取自定义属性
				<script>
				//    angular.bootstrap 引导
				//    vm是vue的实例
				    var vm = new Vue({
				//        el: '#box',
				        aa:11,  //自定义属性
				        data: {
				            a:"互联网世界",
				        }
				    });
				    vm.$mount('#box');   //收到挂载
				    console.log(vm.$options.aa)
				</script>
	vm.$detroy =》销毁对象
	vm.$log()   =>查看现在数据状态
------------
循环：
	v-for="item in items"

	会有重复数据
	track-by="索引"
	track-by="$index/userid "
----------------------------
过滤器
	1.vue提供过滤器：
		capitalize uppercase
		debounce  	//配合事件，延迟执行
	2.数据配合使用过滤器
		limitBy+参数	//限制几个（取几个）
		limitBy+参数1+参数2    //参数1取几个 参数2从第几个开始
			<li v-for="val in arr |limitBy 2 arr.length-1">
	3.过滤数据
		filterBy过滤数据
		filterBy+"过滤谁"
	4.过滤数据排序
		orderBy   a/1/-1     //1正序排列//-1倒叙排列
	5.自定义过滤器   model--》view
		Vue.filter(name,function (shuru) {
			return	shuru<10?"0"+input:input+'';
		});

	<div id="box">
	    {{ a |toDou 1 2}}
	</div>
	<script>
	//    自定义过滤器
	    Vue.filter('toDou',function (input,a,b) {
	    	alert(a+","+b)
	        return input<10?'0'+input:input+'';
	    })
	    var vm = new Vue({
	        data: {
	            a:10
	        },
	        methods:{
	            show:function () {
	                alert(1);
	            }
	        }
	    }).$mount('#box');   //收到挂载
	</script>
	时间转换器：
	过滤html标记

	6.双向过滤器：
		数据==》试图
		model==>过滤==>view
		    Vue.filter("filterHtml",{
        read:function (input) {
//       model==>view
//            alert(1);
            return input.replace(/<[^<]+>/g,'');
        },
        write:function (val) {
//            view==>model数据流
//            alert(2);
            console.log(val);
            return val;
        }
    })
-------------------------------------
指令： 扩展html语法
	v-html
	v-for
	v-html
1.自定义指令
a.属性指令
<div v-red="参数"></div>
	指令名称 v-red	->red
	 Vue.directive("指令名称",function (参数) {
        this.el     ==>原声DOM元素
    })

	指令v-html写入时就要写入这个样子==>html
***注意：指令必须必须以v-开头
		eg1:
			<div id="box">
			    <span v-red>aaaaaaaaa</span>
			</div>
			<script>
			    Vue.directive("red",function () {
			        this.el.style.background='red'
			    })
			    var vm = new Vue({
			        data: {
			            msg:'a'
			        }
			    }).$mount('#box');   //收到挂载
			</script>
eg2:<div v-red="参数"></div>

			<div id="box">
    			<span v-red="'red'"></span>
			</div>
			<script>
			    Vue.directive("red",function (agv) {
			        alert(agv);
			        this.el.style.background=agv;
			    });
			    var vm = new Vue({
			        data: {
			//            msg:'red'
			        }
			    }).$mount('#box');   //收到挂载
			</script>
b.元素指令(用处不大)
		<script>
		    Vue.elementDirective("zns-red",{
		        bind:function () {
		            this.el.style.background='red';
		        }
		    });
		    var vm = new Vue({
		        data: {
		//            msg:'red'
		        }
		    }).$mount('#box');   //收到挂载
		</script>
-----------------------------------

@keydown.up
@keydown.enter
@keydown.a/b/c
自定义键盘事件
Vue.directive('on').keyCodes.ctrl=17;
Vue.directive('on').keyCodes.myenter=13;

--------------------------------------
监听数据变化
vm.$el/$mount/$options/......
vm.$watch(name,fnCb);   //浅度监听

	<div id="box">
	{{a}}
	    <br>
	{{b}}
	</div>
	<script>
	    var vm = new Vue({
	        data: {
	            a:111,
	            b:121
	        }
	    }).$mount('#box');   //收到挂载
	    document.onclick=function () {
	            vm.a=1;
	        }
	    vm.$watch('a',function () {
	        alert("a变化了");
	        this.a=this.a+100;
	    })
	</script>
vm.$watch(name,fnCb){deep:true};   //深度监听
