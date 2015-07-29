---
layout: post
title: grunt 自动化压缩代码
description: 为何要用构建工具？一句话：自动化。
category: blog
---

## 遇到的问题
说grunt之前，先来说说开发中遇到的问题。  
**1.压缩代码很麻烦**  
如果不使用自动化工具，压缩代码一般使用在线工具。将本地代码拷到网页中，压缩，然后再拷贝回本地。如果文件不多，还可以忍受。但是实际开发中文件肯定是少不了的。更令人抓狂的是，如果文件频繁的修改，那就需要不断的复制粘贴。。
此外不同的在线工具，压缩代码标准是不一样的。有的在线工具只是去掉注释、换行符；有的在线工具使用的Uglify压缩；有的在线工具使用的是Yui压缩... 不同的压缩自然生成的文件不一样。每个人使用的压缩工具都不一样，开发中一定会遇到问题。  
**2.压缩之后的代码无法调试**    
压缩代码，自然是为了减少文件大小，提高网站的访问速度。但是压缩之后的代码根本没法阅读，给开发带来了不少困难。尤其是如果使用类似Uglify这种压缩方式的工具，压缩之后的代码变量名都会被修改成a、b、c、d了，想调试，完全不可能。

开发应该是件很easy的事情。以上问题不光是我会遇到，肯定有不少人会遇到，那么就一定会有牛人解决了这些问题。grunt就可以解决上面这些简单事情。

## grunt
关于[Grunt][Grunt]的简介，官网上面很详细。此外还有[Grunt中文网][Grunt中文网]。  
为了解决上面的两个问题，需要使用到Grunt的两个插件   

- grunt-contrib-concat  合并js代码  
- grunt-contrib-uglify  压缩js代码，并生成source map文件

## 安装node
要想使用grunt，必须要安装node。因为grunt中的插件都是使用npm来安装并管理的。So~ 安装node。从[Node.js][Node.js]官网上下一个windows版本的node.js，然后安装到本地。安装完成后，要确保自己的环境变量中有node.exe的路径。然后打开命令提示符，输入node，就进入到node.js交互模式下了。说明node已经安装成功了。

    C:\Users\Administrator>node
	> console.log("Hello World");
	Hello World
	undefined
	>

## 安装grunt
在命令提示符下，运行`npm install -g grunt-cli`，这条命令就会将grunt命令植入到系统路径，然后在任意目录下就可以运行grunt了。

## 配置grunt
要想让grunt自动干活，还得写点配置文件。package.json和Gruntfile.js。  
`package.json`文件就是告诉grunt需要使用哪些插件，例如这里我们就需要使用grunt-contrib-concat和grunt-contrib-uglify这两个插件。  
`Gruntfile.js`是告诉每个插件具体应该如何干活的。例如哪几个文件需要合并，那个文件需要压缩，压缩之后生成的文件路径等等。  

## package.json
package.json文件如下
    
    {
	  "name": "my-project-name",		// 项目名称
	  "version": "0.1.0",				// 项目版本
	  "devDependencies": {
	    "grunt": "~0.4.5",				// 使用grunt；版本是0.4.5
	    "grunt-contrib-concat": "~0.5.1",	// 使用concat；版本是0.5.1
	    "grunt-contrib-uglify": "~0.9.1"   // 使用uglify；版本是0.9.1
	  }
	}

文件的配置很简单，就是在package.json中配置上项目中需要使用哪些插件，以及插件的版本。  
找插件的方法也很简单，在[plugins][plugins]中有一个列表，这里头包括了所有可以使用的插件。将需要使用的插件名称、版本号添加到package.json中即可。  
如果列表前面有"contrib"字样的，说明该插件是由官网维护的。例如grunt-contrib-concat就是官方维护的。  
那么该如何知道该插件的版本号呢？通过列表点到插件的详情页中，在每个插件的右侧都会有该插件的最新版本号。例如`0.5.1 is the latest of 11 releases`，那么0.5.1就是最新的版本号了。  
添加完package.json之后，我们需要下载一下插件。既然我们要使用concat和uglify这两个插件，没有代码可不行。所以必须下载下来。
在项目目录中命令提示符下，执行`npm install`，然后稍等片刻，我们所需要的插件就全都下载好了。在你的目录下会多出一个node_modules文件夹，这个文件夹中就是上面配置的三个插件grunt、concat、uglify。

## Gruntfile.js
Gruntfile.js文件如下

    module.exports = function(grunt) {

	  // 项目配置信息
	  grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),	// grunt会读取package.json中的文件信息
	    concat : {    	// concat插件的配置信息
	       test_grunt : {	// 名称而已~
	         files : {	// 将source目录下doT.js和common.js合并成tmp.js，并保存到dist目录下
	           'dist/tmp.js': ['source/doT.js','source/common.js']
	         }
	       }
	     },
	     uglify: {	// uglify插件的配置信息
	       test_grunt : {	// 名称而已~
	       	  options: {
	            sourceMap: true	// 允许自动生成source map文件
	          },
	         files : {	// 将tmp.js压缩成tmp.min.js
	           'dist/tmp.min.js' : 'dist/tmp.js'
	         }
	       }
	     }
	  });

	  // 加载插件
	  grunt.loadNpmTasks('grunt-contrib-concat');
	  grunt.loadNpmTasks('grunt-contrib-uglify');

	  // 执行任务，任务名称是default
	  grunt.registerTask('default', ['concat','uglify']);

	};

就是告诉concat将哪些文件合并，告诉uglify将哪些文件进行压缩，是否生成source map。更高级的配置方法可以从插件的详情中找到：[concat][concat]、[uglify][uglify]。将上面的文件都配置完之后，运行`grunt`命令，然后稍等片刻，可以看到如下信息
    
    e:\work\web\demo\grunt>grunt
	Running "concat:test_grunt" (concat) task
	File dist/tmp.js created.

	Running "uglify:test_grunt" (uglify) task
	>> 1 sourcemap created.
	>> 1 file created.

	Done, without errors.

## 生成的文件

最后我们再来看下生成的文件吧。
![审查元素](http://siberiawolf.qiniudn.com/@/images/grunt_uglify/list.png)
dist文件夹下是压缩之后的代码  
node_modules文件夹下是通过package.json配置生成的插件  
source文件夹下是未压缩的代码  
dist文件夹下内容如下  
![审查元素](http://siberiawolf.qiniudn.com/@/images/grunt_uglify/dist.png)
tmp.js是将doT.js和common.js合并之后的文件  
tmp.min.js是将tmp.js压缩之后的文件
tmp.min.js.map是生成的source map文件

## source map
source map就是一个信息文件，通过这个信息文件，可以让压缩后的*.min.js文件找到与之对应的未压缩的*.js文件。调试的时候直接使用未压缩的文件。  
开启source map的方法也很简单，在Chrome浏览器中F12开启开发者工具，打开Setting面板，找到Sources，其中有个`Enable JavaScript source maps`选项，勾选上就可以了(PS:Chrome版本是39之后的)。然后在Sources标签下，就会发现多加载了个js文件。
![审查元素](http://siberiawolf.qiniudn.com/@/images/grunt_uglify/tmp.png)
关于[Source map的详解][JavaScript Source Map 详解]，直接看吧~  
如何在Chrome下使用Source map，谷歌已经给出了详细方法：[Chrome using Source Maps][Chrome using Source Maps]  
此外有很多语言支持source map，也有很多工具支持source map，甚至包括css也支持source map。已经有人整理出来一份列表了[Source maps][Source maps]

## 总结
使用了grunt之后压缩代码、调试压缩代码，就很方便了~当然如果你不想配置node和grunt环境，宁愿使用在线工具，也是可以的~  
grunt并不只是可以用来压缩代码。实际上对于需要返回重复的任务，如压缩、编译、单元测试等，使用grunt都可以自动话解决。  
补充一篇文章：[grunt整合版][grunt整合版]

[Grunt]:    http://gruntjs.com/
[plugins]:    http://gruntjs.com/plugins
[Grunt中文网]:    http://www.gruntjs.net/
[Node.js]:    https://nodejs.org/
[concat]:    https://www.npmjs.com/package/grunt-contrib-concat
[uglify]:    https://www.npmjs.com/package/grunt-contrib-uglify
[JavaScript Source Map 详解]:    http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
[Chrome using Source Maps]:    https://developer.chrome.com/devtools/docs/javascript-debugging#using-source maps
[Source maps]:    https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info
[grunt整合版]:    http://www.cnblogs.com/yexiaochai/p/3603389.html
