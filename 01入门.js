vue和angular区别
	vue--简单，易学 
		指令以v-xxx
		一片html代码配合上json，在new出来vue实例
		个人维护项目
		适合移动端项目，小巧
		vue的发展势头很猛，github上的start数量已经超越ng
	angular---上手难
			指令以ng-xxx
			所有属性和方法都挂到$scope身上
			angular由google配合
		适合：pc端项目
共同点：不兼容低版本IE
-------------------------------------------
vue基本雏形
		angular展示一条基本数据：
			var app=angular.module('app',[]);
			app.controller('xxx',function($scope){
					$scope.msg='welcome'
			});

			html:
				div ng-controller='xxx'
				{{msg}}
		vue
			html:
				<div id="box">
			        {{msg}}
			    </div>
			script
				  <script>
				        window.onload=function () {
				            var c=new Vue({
				               el:'#box',    //选择器 className body都ok
				               data:{
				                   msg:'welcome vue'
				               }
				            });
				        }
				    </script>
常用指令：
	angular:
		ng-modwl ng-controller 
		ng-repeat
		ng-click
		ng-show
		$scope.show=function(){}
	指令扩展html标签功能，属性

	1.v-model 一般表单元素（input）   双向数据绑定
		<script>
	        window.onload=function () {
	            var c=new Vue({
	               el:'#box',
	               data:{
	                   msg:'welcome vue'
	               }
	            });
	        }
	    </script>
	    <div id="box">
       		 <input type="text" v-model="msg"><br>
        		{{msg}}
    	</div>
	2.v-for
	循环：
		 <div id="box">
	        <li v-for="value in arr">
	            {{value}}--{{$index}}
	        </li>
	    </div>
	    var c=new Vue({
               el:'#box',
               data:{
                   arr:['aa','bb','cc'],
                   json:{a:'aa',b:'bbb',c:'ccc'}
               }
            });

            <ul>
		        <li v-for="item in json">
		            {{$key}}--{{item}}--{{$index}}
		        </li>
		    </ul>
		    <ul>
		        <li v-for="(k,v) in json">
		            {{k}}--{{v}}--{{$index}}-{{$key}}
		        </li>
		    </ul>
	3.事件
			 v-on:click="函数"

			 v-on:click/mouseout/mouseover/dbclick/mousedown....

			 var c=new Vue({
               el:'#box',
               data:{
                   arr:['aa','bb','cc'],
                   json:{a:'aa',b:'bbb',c:'ccc'}
               },
                methods:{
                   show:function () {//方法
                       alert(1);
                   }
                }
            });
	    事件简写：
		    v-on=>@
			    v-on:click=>@click
		事件对象
			@click="show($event)"
		事件冒泡
				<div @click="show2()">
			        <input type="button" value="按钮" @click="show()">
			    </div>
			     methods:{
			            show:function () {
			                alert(1);
			            },
			            show2:function () {
			                alert(2);
			            }
			        }
		阻止冒泡
		a.方法	e.cancelBubble=true;
				<div @click="show2()">
				   <input type="button" value="按钮" @click="show($event)">
				</div>
				methods:{
			            show:function (e) {
			                alert(1);
			                e.cancelBubble=true;
			            },
			            show2:function () {
			                alert(2);
			            }
			        }
		b.方法 @click.stop推荐
				<div @click="show2()">
			        <input type="button" value="按钮" @click.stop="show()">
			    </div>
				methods:{
			            show:function () {
			                alert(1);
			            },
			            show2:function () {
			                alert(2);
			            }
			        }
		默认事件
			右键事件
			<div id="box">
		    <!--右键事件-->
		        <input type="button" value="按钮" @contextmenu="show()">
			</div>
			methods:{
	            show:function () {
	                alert(1);
	            }
	        }
	        阻止默认行为：
	        a.原声 e.preventDefault();
		        <div id="box">
				    <!--右键事件-->
				        <input type="button" value="按钮" @contextmenu="show($event)">
				</div>
		         methods:{
		            show:function (e) {
		                alert(1);
		//                阻止默认行为
		                e.preventDefault();
		            }
		        }
		    b.vue推荐 @contextmenu.prevent="show();
		    	<div id="box">
				    <!--右键事件-->
				        <input type="button" value="按钮" @contextmenu.prevent="show()">
				</div>
		    	methods:{
		            show:function () {
		                alert(1);
		            }
		        }
		键盘事件：
		keydown
			a.
			  <div id="box">
				 <!--键盘事件-->
				 <input type="text" @keydown="show">
			  </div>	
				 methods:{
		            show:function () {
		                alert(1);
		            }
		        }
		    b.$event
			    <div id="box">
				    <!--键盘事件-->
				    <input type="text" @keydown="show($event)">
				</div>
		    	 methods:{
			            show:function (e) {
			                alert(e.keyCode);
			            }
			        }
		回车keyup
			a. e.keyCode
				<div id="box">
			  		<!--键盘事件-->
			    	<input type="text" @keyup="show($event)">
				</div>
				<script>
				    new Vue({
				        el:"#box",
				        methods:{
				            show:function (e) {
				                alert(e.keyCode);
				            }
				        }
				    })
				</script>
			b. @keydown.13
				<div id="box">
				    <!--键盘事件-->
				    <input type="text" @keyup.13="show()">
				</div>
				</body>
				<script>
				    new Vue({
				        el:"#box",
				        data:{

				        },
				        methods:{
				            show:function () {
				                alert('您按的是回车');
				            }
				        }
				    })
				</script>
			c.@keyup.enter="show()"
		上键，下键左，键，右键
			<input type="text" @keydown.up="show()">
			<input type="text" @keydown.down="show2()">
			<input type="text" @keydown.left="show2()">
			<input type="text" @keydown.right="show2()">
		4.显示隐藏 v-show="true/false"

bootstrap+vue简易留言板 todolist
bootstrap:css框架
--------------------------------------------
属性
	1.v-bind:src=""
		  <img src="{{url}}" alt="">			效果能出来，但是会报404错误
		vue推荐：
		  <img v-bind:src="url" alt="">			效果能出来，但是不会报404错误
	2.简写  :src="/width/title/..."
	3.class和style
		:class   		v-bind:class=""
		:style 			v-bind:style=""
		1.:class="[red,blue]"
		eg:	<strong :class="[red]">hello word</strong>   这个class使用的是data的数据
			<script>
			    new Vue({
			        el:"#box",
			        data:{
			            red:'red'
			        }
			    })
			</script>
			<style>
		        .red{
		            color: red;
		        }
		        .blue{
		            background: blue;
		        }
		    </style>
	2.class="{red:true,blue:true}"   这里直接是style数据 不需要data数据
		eg:
			<style>
			        .red{
			            color: red;
			        }
			        .blue{
			            background: blue;
			        }
			    </style>
			</head>
			<div id="box">
			    <strong :class="{red:true,blue:true}">hello word</strong>
			</div>
			<script>
			    new Vue({
			        el:"#box",
			        data:{}
			    })
			</script>
	3.结合data 数组:class="{red:a,blue:b}"
			<style>
		        .red{
		            color: red;
		        }
		        .blue{
		            background: blue;
		        }
		    </style>
			<div id="box">
			    <strong :class="{red:b,blue:b}">hello word</strong>
			</div>
			<script>
			    new Vue({
			        el:"#box",
			        data:{
			            a:true,
			            b:false
			        }
			    })
			</script>
	4.json    :class="json"    data：{json{ red:true,blue:false}}
			<style>
		        .red{
		            color: red;
		        }
		        .blue{
		            background: blue;
		        }
		    </style>
			<div id="box">
			    <strong :class="json">hello word</strong>
			</div>
			<script>
			    new Vue({
			        el:"#box",
			        data:{
			            json:{
			                red:true,
			                blue:false
			            }
			        }
			    })
			</script>
		style:
			 :style="[c]"
			 :style="[c,b]"
			 :style="json"

			注意:复合样式采用复合命名法
				eg:1
					<div id="box">
					    <strong :style="[c]">hello word</strong>
					    <!--<strong :style="{color:'red'}">hello word</strong>-->
					</div>
					<script>
					    new Vue({
					        el:"#box",
					        data:{
					            c:{color:'red'}
					        }
					    })
					</script>
				eg:2
					<div id="box">
					    <strong :style="[c,b]">hello word</strong>
					</div>
					<script>
					    new Vue({
					        el:"#box",
					        data:{
					            c:{color:'red'},
					            b:{backgroundColor:"blue"}
					        }
					    })
					</script>
				eg3
					<div id="box">
					    <strong :style="json">hello word</strong>
					</div>
					<script>
					    new Vue({
					        el:"#box",
					        data:{
					            json:{
					                color:'red',
					                backgroundColor:"blue"
					            }
					        }
					    })
					</script>
