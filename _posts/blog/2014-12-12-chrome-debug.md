---
layout: post
title: chrome调试
description: Chrome浏览器不仅可以调试页面、JS、请求、资源、cookie，还可以模拟手机进行调试。自从使用了Chrome，我就离不开它了。 
category: blog
jd_id: 242891127
---

Chrome浏览器不仅可以调试页面、JS、请求、资源、cookie，还可以模拟手机进行调试。自从使用了Chrome，我就离不开它了。
下面整理一下如何使用Chrome进行调试。

##怎样打开Chrome的开发者工具？

直接在页面上点击右键，然后选择审查元素：
![审查元素](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222160739.png)

或者在Chrome的工具中找到：
![工具中找到](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222161026.png)

或者，你直接记住这个快捷方式： Ctrl+Shift+I (或者Ctrl+Shift+J直接打开控制台)，或者直接按**F12**。
打开的开发者工具就长下面的样子：
![F12](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222161221.png)

不过我一般习惯与点右下角的那个按钮，**将开发者工具弹出作为一个独立的窗口**：
![独立窗口](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222160612.png)



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
1. **Preview**预览结果，如果是文件可以查看这个文件；如果是图片可以预览这个图片；如果是从服务器返回来的JSON数据，可以查看格式话后的JSON
1. **Response**从服务器返回的响应结果
1. **Cookies**请求和响应的Cookie
1. **Timing**具体的响应时间

![格式化JSON](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222143902.png)
![字符串JSON](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222143929.png)

##Resources标签页

Resources标签页可以查看到请求的资源情况，包括CSS、JS、图片等的内容。也可以设置各种断点。对存储的内容进行编辑然后保存也会实时的反应到页面上。
![调试面板](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222151153.png)
![断点设置](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222152514.png)

##Timeline标签页

注意这个Timeline的标签页不是指网络请求的时间响应情况，这个Timeline指的JS执行时间、页面元素渲染时间（每个信息都怎么看，我没弄懂..）
![Timeline标签页](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222153738.png)

##Profiles标签页

主要是做性能优化的，包括查看CPU执行时间与内存占用（这个也没弄懂）
![Profiles1](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222154345.png)
![Profiles2](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222154353.png)

##Audits标签页

这个对于优化前端页面、加速网页加载速度很有用哦（相当与Yslow）
![Audits1](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222154620.png)
点击run按钮，就可以开始分析页面，分析完了就可以看到分析结果了
![Audits2](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222154931.png)

##Console标签页

就是Javascript控制台了：
![Console.log](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222155456.png)
在这个面板可以查看错误信息、打印调试信息（console.log()）、写一些测试脚本，还可以当作Javascript API查看用。
![Console.log](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222160218.png)

##移动端开发调试

现在新版chrome弹出控制台后如下图，其中的工具对移动端调试非常方便。
![Console.log](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222170954.png)
在控制台中可以直接模拟手机、调整UA、修改网络连接状态
![Console.log](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222172041.png)


##说明
**官方帮助手册（需要翻墙）**

1. [编辑样式和DOM](https://developer.chrome.com/devtools/docs/dom-and-styles)
1. [javascript 调试](https://developer.chrome.com/devtools/docs/javascript-debugging)
1. [移动端调试](https://developer.chrome.com/devtools/docs/device-mode)

**截图文字看不清问题**

现在部分截图看不清，请鼠标右键点击“在新标签页中打开图片”。以后会支持预览大图。
![文字看不清](http://siberiawolf.qiniudn.com/images/chrome_bebug/20141222175633.png)

**欢迎纠错、补充**

