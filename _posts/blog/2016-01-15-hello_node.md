---
layout: post
title:  NodeJS 基础
description: NodeJS基础入门（更新中...）
category: blog
---
NodeJS 火了这么久，我一直没有系统的学过NodeJS，虽然照着前辈的整理的文章，可以简单的使用NodeJS，但是不够系统。最近花点时间，系统的学习一下。所以本篇文章主要记录自己学习NodeJS的过程，以及学习时遇到的各种问题。

## 编辑器的选择
首先得选择一个合适的编辑器，由于我长期使用Sublime Text 3，所以首选就是Sublime了。首先得找个插件，google之，找到[此插件][SublimeNode]。安装插件的过程很简单，但是我却让我遇到了很多麻烦。一直提示我环境变量有问题，但是node确实又安装好了，经过反复的折腾，正确的安装步骤，应该如下： 

- 1.用`git clone`一份SublimeText-Nodejs 这个插件到Sublime Text 到Packages目录下。拷贝Github上，到命令即可。我的电脑是Mac的，所以使用第一条命令。
- 2.修改setting文件。首先进入到Sublime Text 3 到 Packages目录下，进入到Nodejs目录，然后找到Nodejs的setting文件。文件内容如下：

		{
			// save before running commands
			"save_first": true,
			// if present, use this command instead of plain "node"
			// e.g. "/usr/bin/node" or "C:\bin\node.exe"
			// 这个地方修改为自己的node安装目录，在mac下可以通过which node 命令查看
			"node_command": "/usr/local/bin/node",	// 将false修改为 /usr/local/bin/node
			// Same for NPM command
			// 同理修改为npm目录
			"npm_command": "/usr/local/bin/npm",		// 将false修改改 /usr/local/bin/npm
			// as 'NODE_PATH' environment variable for node runtime
			"node_path": false,
			"expert_mode": false,
			"ouput_to_new_tab": false
		}

- 3.然后在Sublime Text中，就可以运行NodeJS了

然并卵。。因为在Sublime Text 3 中，我发现NodeJs的提示，并不好用，不是很舒服～so，我直接去下[WebStorm][Webstorm]了，不折腾了。虽然SubStorm比Sublime Text 3 要占用很多内存，但是毕竟集成了很多工具，强烈建议使用。

## global对象
### JavaScript 和 NodeJS的区别
JavaScript组成：ECMAScript、DOM和BOM  
NodeJS组成：ECMAScript、io、net等组成  
JS是在浏览器中运行的，而NodeJS是在服务器中运行的，两者都遵循ECMAScript，所以语法没有什么区别。另外NodeJS的顶层对象是global，而JavaScript的顶层对象是window。下面运行两个demo，来说明一下区别：

	/**
	 * Created by yuxiangliang on 16/1/15.
	 */


	var a = 100; // 定义变量

	console.log(a); // 100

	var d = new Date(); // 定义时间
	console.log(d.getFullYear() );  // 2016
	console.log(d.getMonth() + 1); // 1

	var arr = [1,2,3]; // 定义数组
	arr.push(4);
	console.log(arr); // [ 1, 2, 3, 4 ]

	function Person(name) { //定义Person类
	 this.name = name;
	}
	Person.prototype.run = function() {
	 console.log(this.name + ' running'); //hello running
	};

	var p1 = new Person('hello');
	p1.run();

	var b = 100;  // 在定义哥变量
	console.log( global.b );    //undefined

其实和写JS代码没有什么区别。只是在`var`一个变量的时候，不会绑定到全局对象global上，这是和JS不同的。

### 关于模块  
首先需要明白一个概念，`module`也就是模块。在NodeJs中，每一个js文件，就是一个模块。
> These objects are available in all modules. Some of these objects aren't actually in the global scope but in the module scope - this will be noted.

在[文档][nodejs]的最上方，已经指明了，有些对象并不是全局的，而是属于模块的，例如：`__dirname`和｀__filename｀。也就是说，每一个模块都有属于自己的作用域。如果在一个js文件中需要使用另一个文件中的变量，可以绑定到global对象，但是不推荐使用。还可以使用通过module对象来传递数据。

	
	// 1.js
	var arr = [1, 2, 3, 4];

	global.aa = 1;
	// 将arr绑定在exports对象上
	module.exports.arr = arr;

	
	// 在2.js中使用1.js中的数组
	var arr = require("./1.js");

	// 也可以使用绝对路径引用1.js
	// var arr = require("/Users/yuxiangliang/Documents/NodeJS/module/1.js");

	console.log(arr);  // { arr: [ 1, 2, 3, 4 ] }

	// 因为global是全局的对象,所以也可以绑定到global对象上
	console.log(global.aa); // 1

关于require路径，规则如下：  

- `./`表示相对路径，从当前文件夹下获取1.js
- `/Users/yuxiangliang/Documents/NodeJS/module/1.js`表示绝对路径  
- 如果既不写想对路径，也不写绝对路径，直接写`require("1.js")`，则表示该文件是node核心模块，或者是node_modules中的文件

关于require查找文件，规则如下：

- 首先按照文件名称查找
- 如果没有查找到会在文件后面添加.js继续查找
- 如果没有查找到会在文件后面添加.json继续查找
- 如果没有查找到会在文件后面添加.node继续查找
- 最后如果还是没有查找到，就会抛出异常

关于module.exports注意事项：

- module.exports === exports
- 不要修改exports的引用，例如`module.exports = [1,2]`，修改了exports指向数据就传递不过去了






[nodejs]:    https://nodejs.org/api/
[nodejs中文]:    http://nodeapi.ucdok.com/#/api/
[SublimeNode]:    https://github.com/tanepiper/SublimeText-Nodejs
[Webstorm]:    https://www.jetbrains.com/webstorm/


