---
layout: post
title: grunt 自动化之压缩图片
description: 自动化压缩图片，谁用谁知道
category: blog
---

## 遇到的问题
昨天闲来无事，想起了雅虎的前端优化十四条军规，然后安装了一个PageSpeed插件，检测了下自己的网站，其中有一个优化图片的建议，让我比较感兴趣。
![优化图片建议](http://siberiawolf.qiniudn.com/images/grunt_imagemin/image_pageSpeed.png)
从上图可以看到，按照谷歌的建议，压缩后的大小减少31%，还是比较可观的。  
其实这个问题，很久之前就遇到过（大概2年前），当时Google还没有PageSpeed这个Chrome插件，也是提示我优化图片。后来用ps调整图片的分辨率等信息，图片大小也确实变小了。然后就没有继续思考这个问题。  
使用ps优化图片固然是一种解决办法，但是实际项目中，图片都是由美工制作的。有些图片还是会有压缩的空间。如果把能压缩的图片用ps一个个打开，在优化的话，又会很麻烦，so，自动化

## imagemin
用过了Grunt之后，再来使用imagemin灰常简单。  
执行命令`npm install grunt-contrib-imagemin --save-dev`安装imagemin，如下图
![安装imagemin](http://siberiawolf.qiniudn.com/images/grunt_imagemin/install_imagemin.png)
然后配置下Gruntfile.js。没按照官网给出的Example config配置，找了个简单的
    
    module.exports = function (grunt) {
	    grunt.initConfig({
	        imagemin: {
	            dist: {
	                options: {
	                    optimizationLevel: 3 //定义 PNG 图片优化水平
	                },
	                files: [{
	                    expand: true,
	                    cwd: 'imagemin/',	// 图片在imagemin目录下
	                    src: ['**/*.{png,jpg,jpeg}'], // 优化 imagemin 目录下所有 png/jpg/jpeg 图片
	                    dest: 'imagemin/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
	                }]
	            }
	        },
	    });
	    grunt.loadNpmTasks('grunt-contrib-imagemin');
	    grunt.registerTask('default', ['imagemin']);
	};
最后，执行命令`grunt`，然后就可以啦！有多少张图片，都可以自动压缩完成了。  
压缩之后的效果如下图，然后在PageSpeed中就不会给我优化图片的建议了~
![压缩图片](http://siberiawolf.qiniudn.com/images/grunt_imagemin/after_imagemin.png)

## 参考连接
- [page speed 百科][page speed]
- [PageSpeed Google Developers][PageSpeed Tools]
- [前端优化十四条军规][前端优化十四条军规]
- [imagemin github][imagemin]


[page speed]:    http://baike.baidu.com/link?url=DxwsmKuA2uZm0h3-FJpwQ1opqt9HwSwNt-_lMxfCJoFuP3xwxLzEc5Toq9uUENnvA9ekjQcX5WmumxVRy0uxJ_
[PageSpeed Tools]:    https://developers.google.com/speed/pagespeed/?hl=zh-CN
[前端优化十四条军规]:    http://developer.51cto.com/art/201207/347525_all.htm
[imagemin]:    https://github.com/gruntjs/grunt-contrib-imagemin




