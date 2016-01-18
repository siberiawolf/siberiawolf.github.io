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

### process对象
process 对象是一个全局对象，通过这个对象提供的属性和方法，可以让我们对当前运行的程序进行访问和控制。其中主要涉及以下几个属性和方法：

- argv：一组包含命令行参数的数组
- execPath：当前进程的绝对路径
- env：返回用户环境信息
- version：返回node版本信息
- versions：返回node以及node依赖包版本信息
- pid：当前进程的pid
- title：当前进程的显示名称（Getter／Setter）
- arch：返回当前CPU处理器架构arm/ia32/x64
- platform：返回当前操作系统平台
- cwd：返回当前进程的工作目录
- chdir(directory)：改变当前进程的工作目录
- memoryUsage()：返回node进程的内存使用情况，单位为byte
- exit(code)：退出
- kill(pid)：向进程发出信息
- stdin：标准输入设备
- stdout：标准输出设备

** 示例1：process.argv **

	/*
	* 中文文档手册上的示例
	* */
	// 打印 process.argv
	process.argv.forEach(function(val, index, array) {
	    console.log(index + ': ' + val);
	});

	/*
	* 官方文档手册上的示例
	* */
	// print process.argv
	process.argv.forEach((val, index, array) => {
	    console.log(`${index}: ${val}`);
	});

	/*
	* 两者运行的结果一致
	* */
	//0: /usr/local/bin/node
	//1: /Users/yuxiangliang/Documents/study/miaov/NodeJS/process/1.js

NodeJS中文手册上使用的是ES6之前的demo，而官网给出的是ES6的demo。在ES6中，新支持了箭头函数。现在的Chrome已经支持了这种新特性。  
官网给出的demo中，也使用到了ES6字符扩展的一个特性：模版字符串。模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

** 实例2：stdin、stdout **
	

	// 标准输出流
	//process.stdout.write("Hello NodeJS");
	//process.stderr.write("haha");

	// 实际上console.log 就是标准输出流
	console.log = function(msg) {
	    process.stdout.write('标准输出流:'+`${msg}\n`);
	};
	console.log('test');

	// 官网API示例，监听readable
	process.stdin.setEncoding('utf8');
	process.stdin.on('readable', () => {
	    var chunk = process.stdin.read();
	    if (chunk !== null) {
	        process.stdout.write(`输入了: ${chunk}`);
	    }
	});
	process.stdin.on('end', () => {
	    process.stdout.write('end');
	});

	// 其他示例，监听data
	// 默认情况下输入流是关闭的,要监听处理输入流数据,首先要开启输入流
	process.stdin.resume();
	process.stdin.on("data", function(data){
	    console.log("输入了:"+data);
	});

上面这两个demo的效果是一致的，都是等待用户输入，然后打印出输入内容。不同的是监听的事件不一样。


## Buffer类
通过Buffer类可以更好的操作二进制数据。在操作文件、网络数据的时候，其实操作的就是二进制数据流。Node提供的Buffer类，就是为了更方便的操作数据流。Buffer是一个全局的类。



** 构造 ** 

	var bf = new Buffer(5);
	console.log(bf);

	bf[6] = 'aa';
	console.log(bf);// 一旦buffer长度固定,不会再改变

	var bf2 = new Buffer([1,2,3]);
	console.log(bf2);

	// 默认的编码是utf-8
	var bf3 = new Buffer('中国','utf-8');
	console.log(bf3);

	for(var i=0; i<bf3.length; i++){
	    //console.log(bf3[i].toString(16));
	    console.log(String.fromCharCode(bf3[i]));
	}

	//Buffer对象的length长度是字节长度,而不是字符串长度.
	//一个中文是三个字节

	var str1 = "test";
	var buf1 = new Buffer("test");
	console.log(str1.length);
	console.log(buf1.length);

	var str2 = "中国";
	var buf2 = new Buffer("中国");
	console.log(str2.length); // 字符个数
	console.log(buf2.length); // 字节长度,一个汉字三个字节

需要注意的是buf.length，指的是字节长度，一个汉字是三个字节。

** buf.write **

	const buf = new Buffer(256);
	const len = buf.write('\u00bd + \u00bc = \u00be', 0);
	console.log(`${len} bytes: ${buf.toString('utf8', 0, len)}`);
	//12 bytes: ½ + ¼ = ¾

	var str = 'test';
	var bf = new Buffer(4);
	bf.write(str);  // 向buffer中写入字符串
	console.log(bf);

	var str2 = 'test';
	var bf2 = new Buffer(4);
	var length = bf2.write(str2, 1, 2); // offset参数为写入到buff中的下标
	// 这里的bufer对象长度是4,实际上只写入了2个字节
	// 剩下的两个字节,随机生成
	console.log(bf2);
	console.log(length);//写入字节的个数

官网给出的demo里头用到了ES6的另一个新增特性：const。const也用来声明变量，但是声明的是常量。一旦声明，常量的值就不能改变。  
另外需要注意的是buf.write中的offset参数，是相对于buffer而言，并不是相对于str。

** buf.toString **
	
	var bf = new Buffer('中国');
	console.log(bf.toString());
	console.log(bf.toString('utf-8', 1));//��国
	// 出现乱码,因为"中"应该是3个字节,如果从第一位开始,那么剩下的两个字节就会乱码

	console.log(bf.toJSON());
	//{ type: 'Buffer', data: [ 228, 184, 173, 229, 155, 189 ] }

如上例所示，buf.toString中的start参数，指的字节开始位数。  
如果buffer对象和字符串通过`+`相连，会自动调用buf.toString。

** buf.slice和buf.copy **

	const buf1 = new Buffer(26);

	for (var i = 0 ; i < 26 ; i++) {
	    buf1[i] = i + 97; // 97 is ASCII a
	}

	const buf2 = buf1.slice(0, 3);
	buf2.toString('ascii', 0, buf2.length);
	// Returns: 'abc'
	buf1[0] = 33;   //修改了buf1
	buf2.toString('ascii', 0, buf2.length); // buf2也被修改了
	// Returns : '!bc'

	//Note that modifying the new Buffer slice will modify the memory
	//in the original Buffer because the allocated memory of the two objects overlap.

	//slice截取的buffer引用的是和之前的buffer同一个内存地址,
	//如果修改了其中一个,另外一个也会被修改
	//这点和数组的slice是有区别的


	const buf1 = new Buffer(26);
	const buf2 = new Buffer(26).fill('!');  // buf2全是!

	for (var i = 0 ; i < 26 ; i++) {    // buf1是26个英文字母
	    buf1[i] = i + 97; // 97 is ASCII a
	}
	//参数:(targetBuffer[, targetStart][, sourceStart][, sourceEnd])
	buf1.copy(buf2, 8, 16, 20);
	console.log(buf2.toString('ascii', 0, 25));
	// Prints: !!!!!!!!qrst!!!!!!!!!!!!!

	buf2[0] = "97"; // 修改buf2
	console.log(buf2.toString());
	console.log(buf1.toString()); // buf1并没有修改

** bufer类方法 **
	

	// 判断Buffer是否支持某个编码
	console.log(Buffer.isEncoding('utf-8')); // 支持utf-8
	console.log(Buffer.isEncoding('gbk'));  // 不支持gbk

	// 判断是否为Buffer对象
	const arr = [1,2,3];
	const bf = new Buffer(10);
	console.log(Buffer.isBuffer(arr));
	console.log(Buffer.isBuffer((bf)));

	// 返回Buffer对象的字节长度
	//Returns the actual byte length of a string.
	// If not specified, encoding defaults to 'utf8'.
	// This is not the same as String.prototype.length since that returns
	// the number of characters in a string.
	var str1 = "test";
	var str2 = "中国";
	console.log(Buffer.byteLength(str1)); // 4
	console.log(Buffer.byteLength(str2)); // 6
	// 不同的编码返回的字节长度不一样,默认编码是utf-8
	console.log(Buffer.byteLength(str2, 'ascii')); // 2

	// 将Buffer数组拼接成新的Buffer对象
	const buf1 = new Buffer(10).fill(0);
	const buf2 = new Buffer(14).fill(0);
	const buf3 = new Buffer(18).fill(0);
	const totalLength = buf1.length + buf2.length + buf3.length;

	console.log(totalLength);
	// totalLength可以不指定,程序内部会循环计算Buffer的长度
	// 但是这样会降低性能,所以最好指定
	const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);
	console.log(bufA);
	console.log(bufA.length);

	// 42
	// <Buffer 00 00 00 00 ...>
	// 42



[nodejs]:    https://nodejs.org/api/
[nodejs中文]:    http://nodeapi.ucdok.com/#/api/
[SublimeNode]:    https://github.com/tanepiper/SublimeText-Nodejs
[Webstorm]:    https://www.jetbrains.com/webstorm/


