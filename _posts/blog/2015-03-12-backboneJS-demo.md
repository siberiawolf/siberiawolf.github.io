---
layout: post
title: backbone.js实战
description: 不能只学习backbone.js而不进行实战，本文记录实战中遇到的问题
category: blog
---

本篇文章代码在[Backbone.js入门教程第二版][mvcSecond]，主要记录自己遇到的问题。

## 安装python
按照文中提示下载[Python 2.7.6](https://www.python.org/download/releases/2.7.6/)。我本地安装目录为`D:\ProgramFiles\Python`。  
这里需要注意下在环境变量`PATH`中把python添加上。然后在命令提示符中运行`python`，看到如下提示，表示python安装成功。

    D:\>python
	Python 2.7.6 (default, Nov 10 2013, 19:24:18) [MSC v.1500 32 bit (Intel)] on win32
	Type "help", "copyright", "credits" or "license" for more information.
	>>>

## 安装webpy
文章中只是给出了web.py的网站，好在web.py提供[中文翻译版本](http://webpy.org/install.zh-cn)。教程中指出，需要执行`python setup.py install`，但是我在web.py安装目录下执行命令出现如下错误。

    D:\ProgramFiles\web.py-0.37>python setup.py
	Traceback (most recent call last):
	  File "setup.py", line 6, in <module>
	    from web import __version__
	  File "D:\ProgramFiles\web.py-0.37\web\__init__.py", line 14, in <module>
	    import utils, db, net, wsgi, http, webapi, httpserver, debugerror
	  File "D:\ProgramFiles\web.py-0.37\web\wsgi.py", line 12, in <module>
	    import httpserver
	  File "D:\ProgramFiles\web.py-0.37\web\httpserver.py", line 4, in <module>
	    from SimpleHTTPServer import SimpleHTTPRequestHandler
	  File "D:\ProgramFiles\Python\lib\SimpleHTTPServer.py", line 27, in <module>
	    class SimpleHTTPRequestHandler(BaseHTTPServer.BaseHTTPRequestHandler):
	  File "D:\ProgramFiles\Python\lib\SimpleHTTPServer.py", line 208, in SimpleHTTPRequestHandler
	    mimetypes.init() # try to read system mime.types
	  File "D:\ProgramFiles\Python\lib\mimetypes.py", line 358, in init
	    db.read_windows_registry()
	  File "D:\ProgramFiles\Python\lib\mimetypes.py", line 258, in read_windows_registry
	    for subkeyname in enum_types(hkcr):
	  File "D:\ProgramFiles\Python\lib\mimetypes.py", line 249, in enum_types
	    ctype = ctype.encode(default_encoding) # omit in 3.x!
	UnicodeDecodeError: 'ascii' codec can't decode byte 0xb0 in position 1: ordinal not in range(128)

然后通过搜索，发现原来是编码错误了。按照[这篇文章](http://blog.csdn.net/hugleecool/article/details/17996993)，添加一下gbk的编码就行了。  
PS：Python不像JS一样用`{}`判断语法块，而是通过空格来判断语法块的。如果你在修改文章中提到的`mimetypes.py`文件而出现了如下错误的时候，就是缩进不正确造成的。

    D:\ProgramFiles\web.py-0.37>python setup.py
	Traceback (most recent call last):
	  File "setup.py", line 6, in <module>
	    from web import __version__
	  File "D:\ProgramFiles\web.py-0.37\web\__init__.py", line 14, in <module>
	    import utils, db, net, wsgi, http, webapi, httpserver, debugerror
	  File "D:\ProgramFiles\web.py-0.37\web\wsgi.py", line 12, in <module>
	    import httpserver
	  File "D:\ProgramFiles\web.py-0.37\web\httpserver.py", line 4, in <module>
	    from SimpleHTTPServer import SimpleHTTPRequestHandler
	  File "D:\ProgramFiles\Python\lib\SimpleHTTPServer.py", line 20, in <module>
	    import mimetypes
	  File "D:\ProgramFiles\Python\lib\mimetypes.py", line 256
	    reload(sys)
	         ^
	IndentationError: expected an indented block 

最后如果一切顺利，再次执行命令`python setup.py install`，发现如下提示，表示安装成功啦。
    
    D:\ProgramFiles\web.py-0.37>python setup.py install
	running install
	running build
	running build_py
	creating build
	creating build\lib
	creating build\lib\web
	copying web\application.py -> build\lib\web
	copying web\browser.py -> build\lib\web
	copying web\db.py -> build\lib\web
	copying web\debugerror.py -> build\lib\web
	copying web\form.py -> build\lib\web
	copying web\http.py -> build\lib\web
	copying web\httpserver.py -> build\lib\web
	copying web\net.py -> build\lib\web
	copying web\python23.py -> build\lib\web
	copying web\session.py -> build\lib\web
	copying web\template.py -> build\lib\web
	copying web\test.py -> build\lib\web
	copying web\utils.py -> build\lib\web
	copying web\webapi.py -> build\lib\web
	copying web\webopenid.py -> build\lib\web
	copying web\wsgi.py -> build\lib\web
	copying web\__init__.py -> build\lib\web
	creating build\lib\web\wsgiserver
	copying web\wsgiserver\ssl_builtin.py -> build\lib\web\wsgiserver
	copying web\wsgiserver\ssl_pyopenssl.py -> build\lib\web\wsgiserver
	copying web\wsgiserver\__init__.py -> build\lib\web\wsgiserver
	creating build\lib\web\contrib
	copying web\contrib\template.py -> build\lib\web\contrib
	copying web\contrib\__init__.py -> build\lib\web\contrib
	running install_lib
	creating D:\ProgramFiles\Python\Lib\site-packages\web
	copying build\lib\web\application.py -> D:\ProgramFiles\Python\Lib\site-packages\web

## 显示Hello world
我是照着官网给出的[Hello World!][helloworld]例子实现的。在本地任意目录下创建`server.py`文件，将例子中的代码复制粘贴到`server.py`中。然后在命令提示符下进入`server.py`的目录下，执行`python server.py`，从控制台会返回`http://0.0.0.0:8080/`，表示服务服务器已经启动了。然后打开浏览器，访问`http://localhost:8080/`就可以看到页面中输出`Hello, world!`啦~

    E:\work\web\demo\backboneJS-demo>python server.py
	http://0.0.0.0:8080/
	127.0.0.1:60671 - - [24/Mar/2015 17:35:46] "HTTP/1.1 GET /" - 200 OK

每次启动服务器都需要进到server.py对应的目录下，然后执行`python server.py`，显的有些麻烦。其实只需要在目录下创建一个bat文件，当需要启动服务器的时候双击这个bat就行了。例如创建server.bat，里面的内容就一句话`python server.py`。

## 构建简单api
根据[教程][mvcSecond]中的介绍，修改上面的server.py文件。首先需要修改urls。  
这里需要补充一下urls的概念。从[web.py 0.3 新手指南][web.py 0.3 新手指南]中可以找到web.py对URL的处理。  
修改完urls之后，需要添加todo和todos。  
当我把文中的代码直接复制粘贴，然后保存的发现文件格式不支持中文。IDLE给我自动添加了编码声明`# -*- coding: cp936 -*-`。  
接下来访问`http://localhost:8080/todo/`，注意最后有个`/`，否则就会返回`not found`。此时页面会报错。
    
    <type 'exceptions.UnicodeDecodeError'> at /todo/
	'utf8' codec can't decode byte 0xcf in position 22: invalid continuation byte
 
很明显，还是编码不正确。这里需要将IDLE自动添加的编码声明，修改为utf-8。在文件最开始出，删掉`# -*- coding: cp936 -*-`然后添加`#coding:utf-8`。最后再访问页面。页面又报错了
    
    <type 'exceptions.NameError'> at /todo/
	global name 'json' is not defined

原因是没有引入json模块。在`import web`上面添加引入json模块`import json`，最后再刷新页面，就可以看到页面返回的数据了。`[{"done": false, "order": 0, "title": "\u4e0b\u53483\u70b9,coding"}]`  
完整代码可以从[文中源码下载][文中源码下载]。

## 安装sqlite
请访问[SQLite 下载页面][SQLite 下载页面]，从 Precompiled Binaries for Windows 区下载预编译的二进制文件。  
需要下载 sqlite-shell-win32-x86-*.zip 和 sqlite-dll-win32-x86-*.zip 压缩文件。  
创建文件夹 `D:\ProgramFiles\sqlite`，并在此文件夹下解压上面两个压缩文件，将得到 `sqlite3.def`、`sqlite3.dll` 和 `sqlite3.exe` 文件。  
添加 `D:\ProgramFiles\sqlite` 到 PATH 环境变量，最后在命令提示符下，使用 sqlite3 命令，将显示如下结果。

    C:\Users\Administrator>sqlite3
	SQLite version 3.8.8.3 2015-02-25 13:29:11
	Enter ".help" for usage hints.
	Connected to a transient in-memory database.
	Use ".open FILENAME" to reopen on a persistent database.
	sqlite>

## 使用sqlite数据库
- 创建数据库  
在命令提示符下，执行`sqlite3 test.db`。该命令将在当前目录下创建一个文件 test.db文件。  
此文件将被 SQLite 引擎用作数据库。此外在命令提示符窗口中将提供一个 `sqlite>` 提示符。
- 查看数据库  
在`sqlite>`提示符下，执行`.database`，可以看到创建好的数据库

	    sqlite> .database
		seq  name             file
		---  ---------------  ------------------------------------------
		0    main             E:\work\web\demo\backboneJS-demo\test.db


- 创建表  
在`sqlite>`提示符下，执行`create table mytable(id integer primary key, value text);`  
词条语句表示该表包含一个名为 id 的主键字段和一个名为 value 的文本字段。接下来往表里中写入一些数据：
    
	    sqlite> insert into mytable(id, value) values(1, 'Micheal');  
		sqlite> insert into mytable(id, value) values(2, 'Jenny');  
		sqlite> insert into mytable(value) values('Francis');  
		sqlite> insert into mytable(value) values('Kerk'); 

- 查询数据  
在`sqlite>`提示符下，执行`select * from mytable;`，返回如下结果
    
	    sqlite> select * from mytable;
		1|Micheal
		2|Jenny
		3|Francis
		4|Kerk

## 下载安装easy_install
因为[Backbone.js入门教程第二版][mvcSecond]中使用了[jinja][jinja]，而安装jinja最简单的方法，就是使用easy_install，所以这里先安装一下。  
从[setuptools][setuptools]找到[ez_setup.py][ez_setup.py]，另存到本地。然后在本地命令中运行这个文件。运行结束后，就会在**Python**的安装目录中生成Scripts目录，其中有easy_install.exe。  
将Scripts目录添加到环境变量中，就可以从命令提示符中运行`easy_install`了

### 安装jinja
在命令提示符中运行`easy_install Jinja2`,执行结束后，Jinja2就安装成功了

### 运行onlinetodos
首先需要将教程[Backbone.js入门教程第二版][mvcSecond]中的[代码][code]下载到本地。然后先双击运行init_sqlite.py创建数据库，在命令提示符下运行server.py启动服务器，最后在浏览器中访问`http://localhost:8080/`，就可以看到登录页面啦~~  


## sqlite可视化工具
在命令行中查看数据库中的数据总是不太方便。而且我有些时候在命令号下用`.database`都找不到我的db文件，也不知道为什么。所以我干脆找了个可视化工具。这里我使用的是[Navicat][Navicat]。

### 分析登录页面
虽然教程中给出各种注释比较多，大体的思路倒是也能看明白，但是由于不懂python，而且这个教程中有很多需要注意的地方，于是查资料继续整理。  
当用户输入`http://localhost:8080/`，也就是访问首页index，就会执行到`index`类。由于是GET请求，自然就会执行GET函数。
#### login.GET函数  
- 在GET函数中首先判断`session.login`是否为`False`，如果为`False`，就跳转到`/login`  
- 由于访问了`/login`就会执行`login`类，因为是GET请求，就会执行GET函数
- 在`login`类的`GET`函数中，通过[jinja][jinja]提供的get_template()方法，将templates目录下的login.html加载出来，这样登录界面就渲染完毕了。
接下来用户输入帐号密码。当用户点击登录，由于这里是一个表单，并且`method="POST"`，自然会执行POST函数。  
  
### login.POST函数
- 在POST函数中，首先通过`web.put()`获取用户输入的帐号和密码
- 如果当用户输入帐号并且帐号等于密码的时候，将`session.login`设置为`True`，表示用户登录成功。将页面跳转到`/`，也就是根目录下。
- 在`index.GET`函数中由于已经登录成功，就会通过[jinja][jinja]提供的get_template()方法，将templates目录下的index.html加载出来，这样todo页面就渲染完毕了。
- 如果当用户输入的帐号和密码不相等的时候，会通过get_template()再加载一遍login.html，并且会传递一个json对象`{"error": u"用户名或密码错误！"}`
- 再次进入到了login.html，这次用到了[jinja templates][jinja templates]。在login.html中，用模版语言判断了如果有error，就显示error信息。这样当帐号密码错误的时候，页面上就会提示`用户名或密码错误！`

### session.login
因为在调试模式下，web.py不能使用session，但是如果非要在调试模式下使用session也不是不可能。[解决方法][session_reloader]。  
所以在server.py中可以找到类似的代码。不同的是，server.py中存储的是login，值为False


### Jinja 
如何使用Jinja呢？需要引入jinja2，在[官网中][basics]给出的用例，使用的是`PackageLoader`，教程中使用的是`FileSystemLoader`，这个无所谓了，总之是需要使用jinja2中的`Environment`进行初始化即可。给`Environment`传递一个参数，就是当前templates所在的目录

#### 错误信息中字符串前，有个字母`u`
为什么要在错误信息前面添加一个`u`呢？如果去掉这个`u`就会出现如下错误。

    <type 'exceptions.UnicodeDecodeError'> at /login
	'gbk' codec can't decode bytes in position 22-23: illegal multibyte sequence

又是编码错误。原来Jinja使用的是[Unicode][unicode]编码，如果在字符串前面加上`u`，会使用当前model中的编码对字符串进行编码。而在当前model中使用的是utf-8编码，所以自然就会正常了


## 友情链接
- [文中源码下载][文中源码下载]
- [Backbone.js官方网站](http://backbonejs.org/)
    - [中文手册](http://www.css88.com/doc/backbone/)
- [Backbone.js源码带详细注释](http://backbonejs.org/docs/backbone.html)
- [Underscore.js官方网站](http://underscorejs.org/)
    - [中文手册](http://learningcn.com/underscore/)
- [Backbone.js入门教程第二版][mvcSecond]
- [MVC框架与Backbone.js](http://javascript.ruanyifeng.com/advanced/backbonejs.html)
- [Backbone Tutorials](http://backbonetutorials.com/)
- [SQLite 教程](http://www.w3cschool.cc/sqlite/sqlite-tutorial.html)
- [Jinja2中文手册](http://docs.jinkan.org/docs/jinja2/index.html)

[mvcSecond]:    https://github.com/the5fire/backbonejs-learning-note
[helloworld]:    http://webpy.org/cookbook/helloworld
[web.py 0.3 新手指南]:    http://webpy.org/docs/0.3/tutorial.zh-cn
[文中源码下载]:    http://siberiawolf.qiniudn.com/code/backboneJS.zip
[SQLite 下载页面]:    http://www.sqlite.org/download.html
[jinja]:    http://jinja.pocoo.org/docs/dev/intro/
[setuptools]:    https://pypi.python.org/pypi/setuptools
[ez_setup.py]:    https://bootstrap.pypa.io/ez_setup.py
[code]:    https://github.com/the5fire/onlinetodos
[Navicat]:    http://www.navicat.com/download
[jinja templates]:    http://jinja.pocoo.org/docs/dev/templates/
[unicode]:    http://jinja.pocoo.org/docs/dev/api/#unicode
[session_reloader]:    http://webpy.org/cookbook/session_with_reloader.zh-cn
[basics]:    http://jinja.pocoo.org/docs/dev/api/#basics