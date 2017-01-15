手动配置自己
	webpack+vue-loader

	webpack加载模块
--------------------------
如何运行次项目

1.npm install 或者cnpm install
2.npm run　dev
	--》package.json:
			"script"：{
				"dev":"webpack-dev-server --inline --hot 8082"
			}

以后下载模块
npm install <包名> --save-dev

EADDRINUSE 端口被占用

少了：
	webpack-dev-server
	webpack
--------------------------------------------------
路由：
	vue-router
		--->查看版本：
			bower info vue-router   
	路由使用版本0.7.13
配合vue-loader的使用
1.下载vue-router模块
	cnpm install vue-router@0.7.13
2.import VueRouter from 'vue-router'
3.Vue.use(VueRouter);
4.配置路由
	var router=new VueRouter();
	router.map({
		路由规则
	});
5.开启
	router.start(App,"#app");
注意：
	之前：index.html		--><app></app>
	现在：index.html  		--><div id="app"></app>
	App.vue		-->需要一个<div id="app"></div>根元素

home news 
-------------------------------------------
路由嵌套
		和之前一模一样
-----------------------------------------------
上线
	npm run build
				--p   webpack-p 打包并压缩

	package.json中配置："build":"webpack -p"
注意：打包后直接生成build.js文件

-----------------------------------------------

脚手架：
		vue-cli-vue脚手架
			帮你提供好基本项目结构

	本身集成很多项目模板：
		simple 			个人觉得一点用都没有
		webpack 		可以使用(大型项目)
						eslint检查代码规范
						单元测试

		webpack-simple 个人推荐使用，没有代码检查

		browserify     --自己看
		browerify-simple

	脚手架基本使用流程
	1.npm install vue-cli -g  安装vue命令环境
			验证安装ok?
					vue--V
	2.生成项目模板
		vue init <模板名> 本地文件夹名称
		vue init webpack my-project
		vue init webpack#1.0 my-project
	3.进入到生成目录里面
		cd xxx
		npm install 
	4.npm　run dev