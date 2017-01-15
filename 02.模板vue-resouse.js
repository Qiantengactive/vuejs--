模板
{{msg}}   	数据更新模板跟着更新
{{*msg}}  	数据只绑定一次
{{{msg}}}   html转义输出

过滤器：==》过滤模板数据
			系统提供一些过滤器
		{{msg|filterA}}
		{{msg|filterA|filterB}}

		uppercase		eg:{{"welcome"|uppercase}}
		lowercase
		capitalize
		currency过滤器		{{msg|filterA 参数}}
交互
		ng:
			$http    (ajax)
		vue交互
			引入:vue-resouce
			get
					获取一个普通文本
						eg:
							<div id="box">
							    <input type="button" value="按钮" @click="get()">
							</div>
							<script>
							    var vm=new Vue({
							        el:"#box",
							        data:{
							            msg:"hello word"
							        },
							        methods:{
							            get:function () {
							                this.$http.get("asaa.txt").then(function (res) {
							                    alert("成功了");
							                    alert(res.status);
							                    alert(res.data);
							                },function (res) {
							                    alert(res.status);
							                    alert(res.data);
							                })
							            }
							        }
							    })
							</script>
			给服务器发送数据:用的最多
					<div id="box">
					    <input type="button" value="按钮" @click="get()">
					</div>
					</body>
					<script>
					    var vm=new Vue({
					        el:"#box",
					        data:{
					            msg:"hello word"
					        },
					        methods:{
					            get:function () {
					                this.$http.get("get.php",{
					                    a:1,
					                    b:2
					                }).then(function (res) {
					                    alert("成功了");
					                    alert(res.status);
					                    alert(res.data);
					                },function (res) {
					                    alert(res.status);
					                    alert(res.data);
					                })
					            }
					        }
					    })
					</script>

			post:
				<div id="box">
				    <input type="button" value="按钮" @click="get()">
				</div>
				</body>
				<script>
				    var vm=new Vue({
				        el:"#box",
				        data:{
				            msg:"hello word"
				        },
				        methods:{
				            get:function () {
				                this.$http.get("get.php",{
				                    a:1,
				                    b:2
				                },{
				                    emulateJSON:true
				                }).then(function (res) {
				                    alert("成功了");
				                    alert(res.status);
				                    alert(res.data);
				                },function (res) {
				                    alert(res.status);
				                    alert(res.data);
				                })
				            }
				        }
				    }) 
				</script>
		jsonp
		https://sug.so.360.cn/suggest?callback=suggest_so&word=a
		https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=a&cb=js

		<div id="box">
		    <input type="button" value="按钮" @click="get()">
		</div>
		<script>
		    var vm=new Vue({
		        el:"#box",
		        data:{
		            msg:"hello word"
		        },
		        methods:{
		            get:function () {
		                this.$http.jsonp("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",{
		                    wd:'a'
		                },{
		                    jsonp:'cb'   //callback名字  vue默认名字就是callback
		                }).then(function (res) {
		                    alert("成功了");
		                    alert(res.status);
		                    alert(res.data.s);
		                },function (res) {
		                    alert(res.status);
		                    alert(res.data);
		                })
		            }
		        }
		    })
		</script>
回车搜索借口
https://www.baidu.com/s?wd=s