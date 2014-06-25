---
layout: post
title: mongodb简单CRUD
description: 如何启动mongodb、通过mongodb进行简单CRUD操作
category: blog
---

#启动#
##创建db文件夹##
启动之前，我们要给mongodb指定一个文件夹，这里取名为”db",用来存放mongodb的数据。
我本地目录：
```
D:\ProgramFiles\mongodb\db
```
##指定db文件夹位置##
首先需要进入到db文件夹，然后通过--dbpath制定
```
C:\Users\Administrator>d:

D:\>cd ProgramFiles\mongodb\bin

D:\ProgramFiles\mongodb\bin>mongod --dbpath=d:\ProgramFiles\mongodb\db
```

##测试##
通过通过控制台可以看到本地端口：27017
**启动信息**
```
MongoDB starting : pid=2748 port=27017 dbpath=d:\ProgramFiles\mongodb\db 64-bit host=wolf-PC
```
**测试连接**
```
http://localhost:27017/
```
**测试结果**
```
It looks like you are trying to access MongoDB over HTTP on the native driver port.
```
如果页面中显示上面的信息，说明mongodb启动成功~
#基本操作#
通过mongo命令启动一个cmd shell，这个shell其实就mongodb客户端，同时也是一个**js的编辑器**。启动完mongdodb后，默认连接的数据库是**"test"**
**启动shell**
重新打开一个cmdshell，输入如下命令
```
C:\Users\Administrator>d:

D:\>cd d:ProgramFiles\mongodb\bin

D:\ProgramFiles\mongodb\bin>mongo
```
然后通过连接信息，可以看到连接的数据库为test
```
MongoDB shell version: 2.6.1
connecting to: test
```
##添加##
mongodb中文档是json的扩展（BSON），所以增删改的操作，就通过json的方式添加。下面代码向person集合（collections）中添加一条数据，而一个集合，就类似关系型数据库中的table.
```
> db.person.insert({"name" : "peter","age" : 23})
WriteResult({ "nInserted" : 1 })
```
##删除##
mongodb中可以使用remove删除一个或全部集合，但是不会删除索引，可以使用drop既删除集合，也可以删除索引
```
> db.person.remove({name:'tom'})
> db.person.remove({})
```
删除一条数据，可以传递一个对象，对象中的属性就是要删除的数据，而且因为支持JS编辑所以，我删除的时候，属性没有使用双引号，也会正常删除数据
如果要删除全部数据，可以传递一个空的对象
##修改##
修改的方法需要传递两个参数，第一个参数是查找的条件，第二个参数是要修改的内容
```
> db.person.update({"name" : "peter"},{"name" : "tom"})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```
##查找##
查找使用find()方法，通过BSON传递要查找的条件，如果什么都不传递，就是查找全部
```
> db.person.find()
{ "_id" : ObjectId("53aae7211943938aa643c4e9"), "name" : "tom" }
> db.person.find({"name" : "tom"})
{ "_id" : ObjectId("53aae7211943938aa643c4e9"), "name" : "tom" }
```
其中_id是mongodb默认添加的唯一标识
