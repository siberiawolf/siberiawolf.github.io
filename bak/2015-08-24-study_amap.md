---
layout: post
title:  Hello 高德
description: 学习高德地图API
category: blog
---

## 说明
由于公司项目需要，需要学习如何使用高德地图完成需求。说实话，在这之前只知道高德地图，但是从来没有用过，所有与地图有关的搜索都会直接用度娘的~ 下面记录自己学习过程。

## 学习资源
在不了解高德地图的前提下，需要找一找学习资源~ 

- [高德LBS开放平台][高德LBS开放平台]：在学习一样技术的时候，官网一定是最好、最权威的地方了。
- [常见问题][常见问题]：浏览一下常见问题，在学习的时候如果遇到类似问题不至于丈二和尚摸不着头脑
- [JavaScript API开发指南][JavaScript API开发指南]：需要主要学习的API
- [demo][js_demo]：移动端js demo
- [视频][amap_video]：高德开发者公开课
- [高德segmentfault平台][segmentfault平台]：也是有好多例子

## 公开课
先从[公开课][http://lbsbbs.amap.com/forum.php?mod=viewthread&tid=1436&extra=]学起吧。首先为了更方便学习，先下载课件喽~。

### 第一讲
第一讲刚开始主要就是介绍高德地图JS API的。其中视频已经介绍了如何使用官方帮助文档，非常简单却非常重要。根据视频的介绍操作一遍，由于所有的demo、ppt、视频在课件里头已经有了，所以直接记录遇到的问题。  

- 申请KEY绑定服务选择JavaScript API。
- 输出Hello word，可以参考[使用入门][使用入门]，也可以参考课件。
- 如果想显示地图，一定要添加样式，如果没有任何样式，默认是不会显示地图的
- JS API 支持异步加载
- `AMap.Map('map')`中的map就是HTML容器名称，也就是Id名字
- lng（Longitude）表示经度，lat（Latitude）表示纬度
- 添加放大、缩小的图层时，需要设置z-index值
- event 事件提供的是静态方法，通过AMap.event.XXX调用
- 添加控件的方法`MapInstance.addControl`
- 一定要在控制台中添加白名单！！否则根本查询不到数据



## 总结

## 参考连接
- [LBS][LBS]
- [POI][POI]


[grunt_uglify]:    http://siberiawolf.com/grunt_uglify/
[高德LBS开放平台]:    http://lbs.amap.com/?spm=0.0.0.0.MxMrBd
[常见问题]:    http://lbs.amap.com/home/faq/%E5%9D%90%E6%A0%87%E4%BD%93%E7%B3%BB/
[JavaScript API开发指南]:    http://lbs.amap.com/api/javascript-api/guide-2/guide/
[js_demo]:    http://lbs.amap.com/others/demo_list/js_demo.html
[amap_video]:    http://lbsbbs.amap.com/forum.php?mod=viewthread&tid=476				 
[segmentfault平台]:    http://segmentfault.com/blog/gaodelbs
[LBS]:    http://baike.baidu.com/link?url=XRx7pL41v1PGUQZ4CzSiZMeuYdtyY08e9GJfZWic4LPjzIHRjuyZ4XRBebFQ5ca7JAzKbef1PhSGomocl9Q73eEzcGGQPTwlzDkXZmf9RiW
[POI]:    http://baike.baidu.com/subview/517279/5442944.htm#viewPageContent
[使用入门]:    http://lbs.amap.com/api/javascript-api/guide-2/map_show/






