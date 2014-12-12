---
layout: post
title: chrome调试
description: chrome如何使用Elements、Resources、Network、Scripts、Timeline、Profiles等标签进行前端开发调试。（待整理）
category: blog
jd_id: 220519230
---

在强大的Chrome下不仅可以调试PC端的页面、JS、请求，可以模拟手机进行前端开发。自从使用了Chrome，我就离不开它了~
下面整理一下如何使用Chrome进行调试。

##怎样打开Chrome的开发者工具？

直接在页面上点击右键，然后选择审查元素：
![审查元素](http://siberiawolf.qiniudn.com/images/chrome_bebug/282113337336.png)

或者在Chrome的工具中找到：
![工具中找到](http://siberiawolf.qiniudn.com/images/chrome_bebug/282113354040.png)

或者，你直接记住这个快捷方式： Ctrl+Shift+I (或者Ctrl+Shift+J直接打开控制台)，或者直接按**F12**。
打开的开发者工具就长下面的样子：
![F12](http://siberiawolf.qiniudn.com/images/chrome_bebug/282113416445.png)

不过我一般习惯与点左下角的那个按钮，**将开发者工具弹出作为一个独立的窗口**：
![独立窗口](http://siberiawolf.qiniudn.com/images/chrome_bebug/282113445035.png)



##Elements标签页

Elements标签页的**左侧**就是对页面HTML结构的查看与编辑，你可以直接在某个元素上双击修改元素的属性。
![Elements标签页](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141212153306.png)

1. **Edit as HTML**直接对元素的HTML进行编辑，或者删除某个元素，所有的修改都会即时在页面上得到呈现。
1. **Copy**可以将HTML代码直接复制下来，在拷贝别人网站上面的HTML代码的时候灰常方便，你懂的~~
1. **Delete node**删掉一个HTML Node
1. **Break on**可以对某个元素进行监听，在JS对元素的属性或者HTML进行修改的时候，直接触发断点，跳转到对改元素进行修改的JS代码处

Elements标签页的**右侧**可以对元素的CSS进行查看与编辑修改：
![CSS进行查看与编辑](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141212164759.png)

1. **Style**看HTML元素的样式
1. **Computed**可以看元素的盒子模型
1. **Properties**看到元素具有的方法与属性，比查API手册要方便得多

##Network标签页

Network标签页对于分析网站请求的网络情况、查看某一请求的请求头和响应头还有响应内容很有用。注意是在你打开Chrome开发者工具后发起的请求，才会在这里显示的哦。
![Network标签页](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141212173210.png)
点击左侧某一个具体请求URL，可以看到该请求的详细HTTP请求情况：
![HTTP请求情况](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141212180752.png)
我们可以在这里看到HTTP请求头、HTTP响应头、HTTP返回的内容等信息。

1. **Headers**请求头信息和响应头信息
1. **Preview**预览结果，如果是文件可以查看这个文件；如果是图片可以预览这个图片
1. **Response**从服务器返回的响应结果
1. **Cookies**请求和响应的Cookie
1. **Timing**具体的响应时间

##Resources标签页

Resources标签页可以查看到请求的资源情况，包括CSS、JS、图片等的内容，同时还可以查看到存储相关的如Cookies、HTML5的Database和LocalStore等，你可以对存储的内容编辑和删除。
这里的CSS文件有一个好玩的特性，你可以直接修改CSS文件，并且修改即时生效哦：

##Scripts标签页

很明显，这个标签页就是查看JS文件、调试JS代码的，直接看下图的说明：

还有你可以打开Javascript控制台，做一些其他的查看或者修改：

你甚至还可以为某一XHR请求或者某一事件设置断点：



##Timeline标签页

注意这个Timeline的标签页不是指网络请求的时间响应情况哦（这个在Network标签页里查看），这个Timeline指的JS执行时间、页面元素渲染时间：

点击底部的Record就可以开始录制页面上执行的内容。

##Profiles标签页

这个主要是做性能优化的，包括查看CPU执行时间与内存占用：


这个也不熟悉，不多说。

##Audits标签页

这个对于优化前端页面、加速网页加载速度很有用哦（相当与Yslow）：

点击run按钮，就可以开始分析页面，分析完了就可以看到分析结果了：

它甚至可以分析出页面上样式表中有哪些CSS是没有被使用的哦：


##Console标签页

就是Javascript控制台了：

这个除了查看错误信息、打印调试信息（console.log()）、写一些测试脚本以外，还可以当作Javascript API查看用。
例如我想查看console都有哪些方法和属性，我可以直接在Console中输入"console"并执行：

怎么样，一目了然了吧 ？再例如我想查看日期函数都有哪些方法：

（注：注意在这里看到的某些方法和属性是ES5新增的，记得兼容其他浏览器的支持情况哦）
