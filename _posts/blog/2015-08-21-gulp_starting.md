---
layout: post
title:  Hello Gulp!
description: 第一个Gulp程序；Gulp压缩html代码；Gulp合并、压缩JS并生成source map
category: blog
---

## 说明
之前的学习过[grunt 自动化之压缩javascript代码][grunt_uglify]，这次学习另外一种自动化工具。  
既然也是自动化工具，而且也是用node，那么跟学习曲线跟grunt应该是一样的。这里我将[@司徒正美](http://weibo.com/jslouvre)的文章和官网的手册结合起来学习。

## 安装gulp
[官网][gulpjs]的手册中就有详细的安装过程，按照[Getting Started][getting-started]，一步步做即可（需要提前安装过node哟）。如果一切顺利的话可以看到如下：
[![glup_start][glup_start]][glup_start]

## 编写gulpfile.js文件
在项目目录中创建gulpfile.js。从上面安装gulp的时候，可以发现，我的项目目录是E:\work\web\demo\gulp，那么我们就在这个项目里头创建gulpfile.js即可。按照Getting Started编写内容就行。复制粘贴。

	var gulp = require('gulp');

	gulp.task('default', function() {
	  // place code for your default task here
	  console.log("Hello Gulp!");
	});

## 运行gulp
直接在命令窗口中执行`gulp`中就可以看到如下提示信息。

	E:\work\web\demo\gulp>gulp
	[15:35:05] Using gulpfile E:\work\web\demo\gulp\gulpfile.js
	[15:35:05] Starting 'default'...
	Hello Gulp!
	[15:35:05] Finished 'default' after 229 μs

可以看到输出了Hello Gulp!，那么我们的第一个Gulp程序就运行结束啦。

## 压缩html
光输出个Hello Gulp实在无聊，接下来我按照司徒正美提供的教程操作一遍吧~   
文章在[这里][4286638]，重复内容就不冗余了，主要记录下结果和插件的安装。  
按照gulp_htmlmin[说明文档][gulp_htmlmin]，安装gulp_htmlmin即可。  
安装成功之后修改一下gulpfile.js，内容如下：
	
	var gulp = require('gulp');
	var htmlmin = require('gulp-htmlmin');
	 
	// 压缩HTML代码的任务
	gulp.task('minify', function() {
	  return gulp.src('src/*.html')	// src目录下所有后缀为html的文件
	    .pipe(htmlmin({collapseWhitespace: true}))	// html 压缩
	    .pipe(gulp.dest('dist'))	// 压缩之后保存到dist目录下
	});

	// 一个输出 Hello Gulp！ 的任务
	gulp.task('sysoutHello', function(){ console.log('Hello Gulp!'); });

	// 一个不会被执行的任务
	gulp.task('doNothing', function(){ console.log('doNothing'); });

	// Gulp 必须有一个default任务
	// 在default任务中，将任务的名称放到数组中执行即可
	// default任务相当于程序入口
	gulp.task('default', ['sysoutHello', 'minify']);

执行`gulp`命令之后，效果如下：
[![minify_sayhello][minify_sayhello]][minify_sayhello]

在名字为default的任务中，执行了sysoutHello和minmify两个任务。从控制台可以看到最后还执行了default任务。默认情况下，default任务就相当于程序的入口函数。假如没有这个默认的任务，控制台就会报错`Task 'default' is not in your gulpfile`。  
其实当我们在控制台执行`gulp`的时候，默认执行的是default任务，我们可以手动调用任务，例如`gulp doNothing`

	E:\work\web\demo\gulp>gulp doNothing
	[15:57:54] Using gulpfile E:\work\web\demo\gulp\gulpfile.js
	[15:57:54] Starting 'doNothing'...
	doNothing
	[15:57:54] Finished 'doNothing' after 231 μs

	E:\work\web\demo\gulp>

最后我们来看下压缩之后的文件，在dist目录下就是我们压缩之后的文件了。
[![htmlmin_end][htmlmin_end]][htmlmin_end]

**说明**
如果对gulpfile文件还是有疑问，或者出现了`Task 'default' is not in your gulpfile`错误，强烈推荐[gulpfile文件详解][9540447] 

## 监听html文件变化
现在我们确实是将html压缩了，但是每次修改了html文件，还要到控制台执行`gulp`命令。其实gulp可以监听文件变化的。将gulpfile.js文件修改为如下内容：
	
	var gulp = require('gulp');
	var htmlmin = require('gulp-htmlmin');
	 
	// 压缩HTML代码的任务
	gulp.task('minify', function() {
	  return gulp.src('src/*.html')	// src目录下所有后缀为html的文件
	    .pipe(htmlmin({collapseWhitespace: true}))	// html 压缩
	    .pipe(gulp.dest('dist'))	// 压缩之后保存到dist目录下
	});

	// 监听文件变化任务
	gulp.task("watch", function(){
		gulp.watch('src/*.html', ['minify']);
	});

	// 一个输出 Hello Gulp！ 的任务
	gulp.task('sysoutHello', function(){ console.log('Hello Gulp!'); });

	// 一个不会被执行的任务
	gulp.task('doNothing', function(){ console.log('doNothing'); });

	// Gulp 必须有一个default任务
	// 在default任务中，将任务的名称放到数组中执行即可
	// default相当于程序入口
	gulp.task('default', ['sysoutHello', 'minify', 'watch']);

再执行`gulp`命令，你会发现有些不一样的地方，执行完这个命令并没有退出程序，程序一直在等待的状态。修改一下html文件，就会看到控制台多出了如下信息。如果到dist目录下，查看一下文件，就会发现刚才修改的内容已经添加到压缩后的文件中了。
[![gulp_watching][gulp_watching]][gulp_watching]

## gulp 语法
请参考[第一个gulp程序][4286638]，比我整理的要详细得多啦~

## 合并、压缩JS代码，并生成sourcemap
合并、压缩、生成sourcemap拆分成了三个任务，既然我想执行这三个任务，那肯定是要通过三个插件完成的。首先安装这三个插件。

- [gulp-concat][gulp-concat]
- [gulp-uglify][gulp-uglify]
- [gulp-sourcemaps][gulp-sourcemaps]

插件安装方式跟安装htmlmin的时候一样。  
安装插件的时候可以会出现两种情况，第一种情况就是被墙了，可以尝试[这里][cross-wall]方式；第二种情况就是插件安装的路径不对，有可能安装到了全局目录导致模块引用出错。出现这种情况那就重新下载模块就行。需要注意的是，重新下载插件的之前，一定要把之前的node_modules目录下内容删干净，包括全局目录下和项目目录下。

	var gulp = require('gulp');
	var concat = require('gulp-concat');
	var uglify = require('gulp-uglify');
	var sourcemaps = require('gulp-sourcemaps');
	 
	gulp.task('javascript', function() {
	  return gulp.src('lib/*.js')
	  	.pipe(concat('all.js'))	// 将lib目录下的所有js文件，合并到all.js中
	  	.pipe(sourcemaps.init())	// 初始化sourcemaps
	  	// 压缩操作必须在sourcemapas插件的init()和write()之间
	  	// a list of such plugins: https://github.com/floridoo/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support
	    .pipe(uglify())			// 压缩js代码
	 	// .pipe(sourcemaps.write())	// 默认采用的是inline source map
	 	.pipe(sourcemaps.write("../maps"))	// 也可以生成一个source map 文件
	    .pipe(gulp.dest('dist'));	
	});
	gulp.task('default', ['javascript']);

## 总结
- gulp比grunt配置起来要简单。
- 其实gulp本身也使用了很多的别的模块，例如[node-glob][node-glob]
- 剩下的难点就是如何灵活的使用插件还有Gulp流不兼容的问题。

## 参考连接
- [原文链接][grunt_uglify]
- [第一个gulp程序 by 司徒正美][4286638]
- [gulpfile文件详解][9540447]
- [是时候搁置Grunt，耍一耍gulp了][是时候搁置Grunt，耍一耍gulp了]


[grunt_uglify]:    http://siberiawolf.com/grunt_uglify/
[4286638]:    http://www.cnblogs.com/rubylouvre/p/4286638.html
[gulpjs]:    https://github.com/gulpjs/gulp
[getting-started]:    https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
[glup_start]:    http://siberiawolf.qiniudn.com/@/images/grunt_uglify/glup_start.png
[gulp_htmlmin]:    https://github.com/jonschlinkert/gulp-htmlmin
[minify_sayhello]:    http://siberiawolf.qiniudn.com/@/images/grunt_uglify/minify_sayhello.png
[9540447]:    https://gist.github.com/chantastic/9540447
[htmlmin_end]:    http://siberiawolf.qiniudn.com/@/images/grunt_uglify/htmlmin_end.png
[gulp_watching]:    http://siberiawolf.qiniudn.com/@/images/grunt_uglify/gulp_watching.png
[node-glob]:    https://github.com/isaacs/node-glob
[是时候搁置Grunt，耍一耍gulp了]:    http://www.cnblogs.com/vajoy/p/4170525.html
[gulp-concat]:    https://www.npmjs.com/package/gulp-concat/
[gulp-uglify]:    https://www.npmjs.com/package/gulp-uglify/
[gulp-sourcemaps]:    https://www.npmjs.com/package/gulp-sourcemaps/
[cross-wall]:    http://hi.barretlee.com/2014/03/31/npm-cross-wall/





