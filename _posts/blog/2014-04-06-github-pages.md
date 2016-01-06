---
layout: post
title: 使用Github Pages搭建博客
description: 虽然已经有了<a href="http://beiyuu.com/github-pages/" target="_blank">BeiYuu</a>的搭建博客教程，一步一步跟着做，我还是遇到了很多的问题 20160104 更新mac ox 遇到的问题
category: blog
jd_id: 242878153
---

虽然已经有了<a href="http://beiyuu.com/github-pages/" target="_blank">BeiYuu</a>的搭建博客教程，一步一步跟着做，我还是遇到了很多的问题。整理如下：

##Github Pages的特点

####优点

1. 轻量级的博客系统，没有麻烦的配置
1. 使用标记语言，比如[Markdown语法][]
1. 无需自己搭建服务器
1. 根据Github的限制，对应的每个站都有空间限制
1. 可以绑定自己的域名

####缺点

1. 使用[Jekyll][]模板系统，相当于静态页发布，适合博客，文档介绍等。
1. 动态程序的部分相当局限，比如没有评论，不过还好我们有解决方案。
1. 基于[Git教程][]，很多东西需要动手，不像Wordpress有强大的后台

##学习Git

###Git简介

1. Git是目前世界上最先进的分布式版本控制系统（没有之一）。
1. Git有什么特点？简单来说就是：高端大气上档次。

###安装GIt

Windows下要使用很多Linux/Unix的工具时，需要Cygwin这样的模拟环境，Git也一样。Cygwin的安装和配置都比较复杂，就不建议你折腾了。不过，有高人已经把模拟环境和Git都打包好了，名叫msysgit，只需要下载一个单独的exe安装程序，其他什么也不用装，绝对好用。

msysgit是Windows版的Git，从http://msysgit.github.io/下载，然后按默认选项安装即可。
安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明Git安装成功！

##为github添加SSH key

###生成SSH key

    $ ssh-keygen -t rsa -C "youremail@example.com"

然后一路点击回车即可。如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。
查看id_rsa.pub有两种方式:  
1.windows7下看生成的文件

    C:\Users\username\.ssh\id_rsa.pub

2.通过vim命令查看

    vim ~/.ssh/id_rsa.pub

然后将生成的key拷贝到Github Pages中。

###测试连接

    $ ssh -T git@github.com  

如果提示如下内容表示添加SSH key 成功

    Hi yourusername! You've successfully authenticated, but GitHub does not provide shell access.  

##学习Markdown 
[Markdown语法]比较简单，我这里使用的是在线编辑器[Cmd Markdown](https://www.zybuluo.com/mdeditor)。在这个编辑器中，可以通过ctrl+alt+H方式查看Markdown语法。

##学习Jekyll
这里耽误最多时间的就是学习Jekyll了。尤其是搭建本地Jekyll的时候。我的环境是windows 7 64 bit，而Jekyll官网上面并没有支持这个版本，所以我遇到了不少问题。

[Jekyll][]（发音/'dʒiːk əl/，"杰克尔"）是一个静态站点生成器，它会根据网页源码生成静态文件。它提供了模板、变量、插件等功能，所以实际上可以用来编写整个网站。
整个思路到这里就很明显了。你先在本地编写符合Jekyll规范的网站源码，然后上传到github，由github生成并托管整个网站。

####优点：

1. 免费，无限流量
1. 享受git的版本管理功能，不用担心文章遗失。
1. 你只要用自己喜欢的编辑器写文章就可以了，其他事情一概不用操心，都由github处理。

####缺点：

1. 有一定技术门槛，你必须要懂一点git和网页开发。
1. 它生成的是静态网页，添加动态功能必须使用外部服务，比如评论功能就只能用disqus。
1. 它不适合大型网站，因为没有用到数据库，每运行一次都必须遍历全部的文本文件，网站越大，生成时间越长。　

### 为何要使用静态网站生成器？

  不同于 WordPress 这类博客平台（以及其他众多流行的CMS内容管理系统）在服务器端执行PHP等语言的动态框架、访问SQL数据库并动态产生Web页面的工作方式，静态网站生成器的原理十分简单：将所有的页面、布局和帖子集合在一起，预先生成静态的站点。对于动态内容并非必要的站点——例如个人博客，静态网站生成器这样做有几个明显的优势：
####1.快速访问和弱服务器需求

  静态HTML页面的载入速度理所当然地更快——因为它无需在服务器端执行任何代码。同时，这还大大地减轻了服务器的压力。
####2.高安全性

  基于与上述相同的理由，静态页面有着与生俱来的安全性。不像WordPress或者其他任何动态的框架，静态站点本身并不存在安全漏洞的问题。
####3.版本控制

  你无需通过WordPress来维护一整个复杂的数据库——静态站点的内容完全仅由文件系统中独立的目录和文件构成，这意味着你不但可以使用Shell、grep、sed、awk这些传统的Unix工具对它们执行操作和维护，更可以使用 Git 这样的分布式版本控制系统来管理它们，并且享受版本控制所带来的一切好处，如同维护任何软件项目的源代码库一样。你甚至可以重新生成以前任意时间点的整个网站！
####4.简单部署

  一旦静态网站生成以后，任何Web服务器都能够轻易地部署静态站点，而无须在服务器端安装配置其他任何多余的东西。你所需要做的仅仅是通过git、rsync甚至ftp简单地上传文件到你的托管服务器。相比之下，WordPress博客的维护显得复杂得多，你可能需要在你的开发服务器和托管服务器上安装、配置一整套LAMP+WordPress平台，并经常性地升级版本和维护。这是个繁重的技术活。
####5.文本编辑器和自由格式书写

  也许你不这么认为，但是作为一个hacker而言，在浏览器中一个300x300的文本区里码字写博客并非一件很酷的事情——如果你使用Jekyll这样的静态网站生成器，你就可以用你喜欢的任何文本编辑器（vi、emacs……），用你习惯的标记语言以书写文本文件的方式来直接写博客文章（就好像你平常写代码一样），避免了使用那些简陋和功能有限的Web界面。

###搭建本地Jekyll环境

我本地的操作系统是windows 7 64位系统。早前我没有搭建本地环境，所以每一次修改都需要提交到[Github][] 上面才能查看修改效果，非常不方便。所以搭建了一个本地环境。

[官方文档](http://jekyllrb.com/docs/installation/)中指出了可以在Linux, Unix, 和 Mac OS X中安装Jekyll。虽然不支持windows，但是在下方给出了在windows中的解决方案。[Running Jekyll on windows](http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html)。

####1.下载RubyInstaller。我选择的是Ruby 2.0.0-p451 (x64)

【错误1】按照Ruby时路径错误  
在安装Ruby的时候，我的出现了一个安装问题。我安装在了D:\Program Files目录。注意这里有一个空格哟，Ruby安装不成功的。但是我想不明白，明明在C盘下面就一个C:\Program Files的嘛。为什么win7安装目录会有一个空格呢？

【解决1】修改路径名  
将带空格的路径改为不带空格就行了呗。

####2.安装Ruby DEVELOPMENT KIT。我选择的是For use with Ruby 2.0 (x64 – 64bits only)

【错误2】配置Ruby DEVELOPMENT KIT出错。  
按照上面给出的windows解决方案中，会执行一下`ruby dk.rb init`，然后可以在devkit中找到一个config.fml文件。

【解决2】修改config.fml文件  
修改文件如下:

    # This configuration file contains the absolute path locations of all  
    # installed Rubies to be enhanced to work with the DevKit. This config  
    # file is generated by the 'ruby dk.rb init' step and may be modified  
    # before running the 'ruby dk.rb install' step. To include any installed  
    # Rubies that were not automagically discovered, simply add a line below  
    # the triple hyphens with the absolute path to the Ruby root directory.  
    #  
    # Example:  
    #  
    # ---  
    # - C:/ruby19trunk  
    # - C:/ruby192dev  
    #  
    ---  
    - D:/ProgramFiles/Ruby200-x64  

**说明：**

1. `#`表示注释。
1. 一定要保留"-"
1. 在下面填写你本地Ruby的安装目录
1. `ruby dk.rb init` 的时候如果提示"Initialization complete!"。表示成功了。
1. 执行成功后，继续执行`ruby dk.rb review`和 `ruby dk.rb install`

####3.安装Jekyll  
当Ruby环境配置完成后（不提示任何错误），就可以安装Jekyll了。执行`gem jekyll install`  
【错误3】安装Jekyll 时候出错。

    ERROR:  Could not find a valid gem 'jekyll' (>= 0) in any repository  
    ERROR:  Possible alternatives: jekyll`   

【解决3】[Github jekyll](https://github.com/jekyll/jekyll/issues/1409)中有解决方案

    $ gem sources --remove http://rubygems.org/
    $ gem sources -a http://ruby.taobao.org/
    $ gem sources -l
    *** CURRENT SOURCES ***
    http://ruby.taobao.org    
    $ gem install rack 

然后继续执行`gem install jekyll`即可。等待片刻，会提示21 gems installed。jekyll 安装完毕。

---------- **20150316补充** ----------

确保`gem sources -l`之后列表中只有ruby.taobao.org。详情请看[RubyGems 镜像](http://ruby.taobao.org/)

####4.创建blog  
在随便一个磁盘下面创建一个文件夹myblog即可

    G:\work>jekyll new myblog
    G:\work>jekyll serve

【错误4】`invalid byte sequence in GBK `  
注意，我这里是在work目录下启动的jekyll哦。这也是出现问题的一个原因了。。囧。  
错误如下：

    Configuration file: none  
            Source: G:/work  
       Destination: G:/work/_site  
      Generating... Error reading file G:/work/web/github-    pages/siberiawolf.gith  
    ub.io/_posts/blog/2012-02-22-github-pages.md: invalid byte sequence in GBK  
    error: invalid byte sequence in GBK. Use --trace to view backtrace  

【解决4】这个问题解决的让我比较纠结。全都记录下来吧。  
**解决方法1**  
根据[Jekyll在Windows下面中文编码问题解决方案](http://www.cnblogs.com/aleda/articles/Jekyll-in-Windows-following-Chinese-encoding-problem-solutions.html)这里的解决方案，我全都找了一遍，但是依然没有解决。
首先在我`convertible.rb`文件中，根本就没有文章中提到的那段添加`utf-8`的代码。
最后这个文章中提到的编码格式、换行符、YAML格式，我这里都没有问题。

**解决方法2**  
最后我只是简单的将出现GBK错误的文件删掉了。这里出现错误的原因是因为在我的G盘下面，存在的一个文件被Jekyll检测到了。而问题的根本原因是，我启动`jekyll serve`的时候，是在work目录下进行的，而不是在myblog这个目录下。Jekyll将work目录下的所有文件都遍历了一遍。  

【错误5】`Forbidden   no access permission to / `  
这个错误是跟上面错误相关联的。  
**解决方法1**  
google找到到stackoverflow中的一篇[问答](http://stackoverflow.com/questions/17364028/jekyll-on-windows-pygments-not-working)，试着修改一下 Pygments.rb。但是我不确定他的版本是多少。
结果发现我的版本是0.5.4，然后按照里面提供的方法，将0.5.4卸载掉，安装0.5.0,然后重新启动服务，打开浏览器访问，发现，还是会出现这个Forbidden ..  

**解决方法2**  
进入到myblog(我创建的jekyll目录)，在这个目录下试着启动jekyll serve，然后用浏览器访问就不会出现forbidden了。。囧.....
然后【错误4】也就解决了。

【错误6】页面空白  
页面虽然能访问了，但是一片空白啊，什么都没有

【解决6】删掉highlight代码  
在Jekyll new myblog的时候，在_post目录下生成的文件中，找到如下代码，然后删除掉。

**最后成功启动Jekyll 的界面如下**：
![Jekyll ok](http://siberiawolf.qiniudn.com/images/githubpages/jekyll-ok.jpg)

####5.代码高亮
【错误7】Conversion error: There was an error converting..  
就是在md文件中存在Ruby代码`$ cd ~/.ssh `。而这段代码应该是通过高亮的方式显示的。

【解决7】使用Markdown rdiscount  
这个博客使用的是[Google Code Prettify](https://code.google.com/p/google-code-prettify/)代码高亮。我本地的是使用方法没有问题，但是为什么会不支持代码高亮呢？
对比发现我的_config.yml文件markdown属性不是rdiscount，默认生成的_config.yml文件是redcarpet 。然后我就将这个值修改为rdiscount，但是报错。

    ERROR: YOUR SITE COULD NOT BE BUILT:------------------------------------Missing dependency: rdiscount

根据提示，我执行命令`$ gem install rdiscount`，但是我这里一直安装不上。
![jekyll-makdown-rdiscount](http://siberiawolf.qiniudn.com/images/githubpages/jekyll-makdown-rdiscount.jpg)

偶然间，我修改了一下**控制面板**中的**区域语言**中的格式修改为**英语（美国）**，然后在执行`$ gem install rdiscount`，居然成功了。
![jekyll-language](http://siberiawolf.qiniudn.com/images/githubpages/jekyll-language.jpg)
![jekyll-gem-suc](http://siberiawolf.qiniudn.com/images/githubpages/jekyll-gem-suc.jpg)

提示gem安装成功。然后代码也就高亮了。而且也不会出现那个Conversion error了。

以下资源解决了我不少困惑：  

1. [Getting My Site Running With Markdown + Jekyll!](http://davidajowi.com/posts/getting-my-site-running-with-markdown-and-jekyll.html)
1. [Jekyll中使用google-code-prettify高亮代码](http://blog.evercoding.net/2013/02/27/highlight-code-with-google-code-prettify/)


####6.解决中文编码
上面提到过，出现了GBK问题。而且我也没有找到convertible.rb文件中的那段代码。那么怎么支持中文呢？
实际上最新版本的Jekyll已经解决了这个问题。只是不再这里处理了。而是在_config.fml文件中配置一下即可。

    encoding: utf-8
    markdown: rdiscount

##学习Jekyll Liquid模板语言  
[Jekyll][]使用[Liquid模板语言][]，{{ page.title }}表示文章标题，{{ content }}表示文章内容，更多模板变量请参考官方文档。

需要用到什么语法，直接看文档就行了。

---------- **20150317补充** ----------

####依赖包 rdiscount 未找到
    Generating... You are missing a library required for Markdown. Please run:
    $ [sudo] gem install rdiscount
    Conversion error: There was an error converting '_posts/2013-04-22-yizeng-hello-world.md/#excerpt'.

    ERROR: YOUR SITE COULD NOT BE BUILT:
       ------------------------------------
       Missing dependency: rdiscount

依赖包 rdiscount 未找到。 此问题最有可能的原因是，网站使用的是 rdiscount 作为 Markdown 引擎，而不是 Jekyll 默认的引擎，故需要手动自行安装。执行`gem install rdiscount`

#### cannot load such file -- hitimes/hitimes (LoadError)
    /Library/Ruby/Gems/2.0.0/gems/hitimes-1.2.2/lib/hitimes.rb:37:in `require': cannot load such file -- hitimes/hitimes (LoadError)
    from /Library/Ruby/Gems/2.0.0/gems/hitimes-1.2.2/lib/hitimes.rb:37:in `rescue in <top (required)>'
    from /Library/Ruby/Gems/2.0.0/gems/hitimes-1.2.2/lib/hitimes.rb:32:in `<top (required)>'
    from /Library/Ruby/Gems/2.0.0/gems/timers-4.0.1/lib/timers/group.rb:4:in `require'
    from /Library/Ruby/Gems/2.0.0/gems/timers-4.0.1/lib/timers/group.rb:4:in `<top (required)>'
    from /Library/Ruby/Gems/2.0.0/gems/timers-4.0.1/lib/timers.rb:4:in `require'
    from /Library/Ruby/Gems/2.0.0/gems/timers-4.0.1/lib/timers.rb:4:in `<top (required)>'
    from /Library/Ruby/Gems/2.0.0/gems/celluloid-0.16.0/lib/celluloid/receivers.rb:3:in `require'
    from /Library/Ruby/Gems/2.0.0/gems/celluloid-0.16.0/lib/celluloid/receivers.rb:3:in `<top (required)>'
    from /Library/Ruby/Gems/2.0.0/gems/celluloid-0.16.0/lib/celluloid.rb:475:in `require'
    from /Library/Ruby/Gems/2.0.0/gems/celluloid-0.16.0/lib/celluloid.rb:475:in `<top (required)>'
    from /Library/Ruby/Gems/2.0.0/gems/listen-2.7.11/lib/listen.rb:1:in `require'
    from /Library/Ruby/Gems/2.0.0/gems/listen-2.7.11/lib/listen.rb:1:in `<top (required)>'
    from /Library/Ruby/Gems/2.0.0/gems/jekyll-watch-1.1.2/lib/jekyll/watcher.rb:25:in `require'
    from /Library/Ruby/Gems/2.0.0/gems/jekyll-watch-1.1.2/lib/jekyll/watcher.rb:25:in `build_listener'
    from /Library/Ruby/Gems/2.0.0/gems/jekyll-watch-1.1.2/lib/jekyll/watcher.rb:6:in `watch'
    from /Library/Ruby/Gems/2.0.0/gems/jekyll-2.5.1/lib/jekyll/commands/build.rb:68:in `watch'
    from /Library/Ruby/Gems/2.0.0/gems/jekyll-2.5.1/lib/jekyll/commands/build.rb:38:in `process'
    from /Library/Ruby/Gems/2.0.0/gems/jekyll-2.5.1/lib/jekyll/commands/serve.rb:26:in `block (2 levels) in init_with_program'
    from /Library/Ruby/Gems/2.0.0/gems/mercenary-0.3.4/lib/mercenary/command.rb:220:in `call'
    from /Library/Ruby/Gems/2.0.0/gems/mercenary-0.3.4/lib/mercenary/command.rb:220:in `block in execute'
    from /Library/Ruby/Gems/2.0.0/gems/mercenary-0.3.4/lib/mercenary/command.rb:220:in `each'
    from /Library/Ruby/Gems/2.0.0/gems/mercenary-0.3.4/lib/mercenary/command.rb:220:in `execute'
    from /Library/Ruby/Gems/2.0.0/gems/mercenary-0.3.4/lib/mercenary/program.rb:35:in `go'
    from /Library/Ruby/Gems/2.0.0/gems/mercenary-0.3.4/lib/mercenary.rb:22:in `program'
    from /Library/Ruby/Gems/2.0.0/gems/jekyll-2.5.1/bin/jekyll:20:in `<top (required)>'
    from /usr/local/bin/jekyll:23:in `load'
    from /usr/local/bin/jekyll:23:in `<main>'

[hitimes版本冲突了](https://github.com/copiousfreetime/hitimes/issues/32)。我的解决办法是[安装hitimes-1.2.1](https://rubygems.org/gems/hitimes/versions/1.2.1)，执行命令`gem 'hitimes', '~> 1.2.1'`，然后把Ruby安装目录下`D:\ProgramFiles\Ruby22\lib\ruby\gems\2.2.0\gems`多余的hitimes版本删除掉

---------- **20160104补充** ----------  
由于16年元旦新购置了一台mac本，以下主要记录在mac系统上出现的问题。

#### taobao.ruby.org 
今天在执行`gem jekyll install`提示等错误跟[之前一样](https://github.com/jekyll/jekyll/issues/1409)。不同的是淘宝停用了基于HTTP协议的镜像服务。只需要把`http://ruby.taobao.org`替换成`https://ruby.taobao.org/`

#### Caching your GitHub password in Git
如果采用https的方式push到Github上，每次都会提示输入用户名到验证码。在Mac上我是修改成了SSH的方式。为了熟练使用Https连接方式，Mac上我才用的是Https连接方式。
直接从[Github帮助](https://help.github.com/articles/caching-your-github-password-in-git/)上配置即可，内容如下：
    
    $ git credential-osxkeychain
    # Test for the cred helper
    # 测试是否安装了osxkeychain，如果安装了酒会提示下方内容。
    Usage: git credential-osxkeychain <get|store|erase>

    ＃ 由于我已经安装了，所以第二步、第三步就省略了，直接配置让git使用osxkeychain

    git config --global credential.helper osxkeychain
    # 设置git使用osxkeychain
    # Set git to use the osxkeychain credential helper

    vi ~/.gitconfig
    # 检查.gitconfig 文件是否配置成功，如果`helper = osxkeychain`则说明配置成功了。

我的电脑是新配置的环境，还没有成功push，所以需要先输入用户名和密码。等下次再push的时候，就不会提示输入用户名和密码了。  
如果不了解什么是OSX keychanin，可以看[这里](http://www.mac52ipod.cn/post/mac-keychain-access-helps-you-find-back-forgotten-password.php)  
在mac的钥匙串中可以查看github的帐号和密码：![osxchain](http://siberiawolf.qiniudn.com/images/githubpages/osxkeychain.png)

#### write permissions for gem install bundler
本以为像windows中一样，直接执行`gem jekyll install`就可以了呢，结果提示我没有权限。看到好多解决方案，最终还是使用sudo命令安装了。执行`sudo gem jekyll install`。因为mac是linux系统，而有些操作是必须取得root用户权限的。  
[解决权限](https://teamtreehouse.com/community/write-permissions-for-gem-install-bundler)

####  Failed to build gem native extension.
然后又报错了，提示信息如下。百度出来的解决方案是可以安装Xcode，简单粗暴。但是我不想这么解决。直接安装`xcode-select`经过漫长的等待，安装成功后，再执行一遍`sudo gem install jekyll`，jekyll总算是安装成功了。

    ERROR:  Error installing jekyll:
    ERROR: Failed to build gem native extension.

    /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/bin/ruby extconf.rb

[Problem installing jekyll](https://github.com/jekyll/jekyll-help/issues/167)
[Compass cannot be installed unless we have Mac Xcode](https://teamtreehouse.com/community/compass-cannot-be-installed-unless-we-have-mac-xcode)

#### cannot load such file -- rdiscount
这个错误之前在windows中见过，就是没有rdiscount，安装一下就行了。`sudo gem install rdiscount`，稍等片刻，下载成功后，执行`jekyll serve`启动jekyll。
这次大功告成了！😊


[BeiYuu]:    http://beiyuu.com  "BeiYuu"
[Github]:   http://github.com "Github"
[jQuery]:   https://github.com/jquery/jquery "jQuery@github"
[Twitter]:  https://github.com/twitter/bootstrap "Twitter@github"
[Github Pages]: http://pages.github.com/ "Github Pages"
[Godaddy]:  http://www.godaddy.com/ "Godaddy"
[Jekyll]:   http://jekyllrb.com/ "Jekyll"
[DNSPod]:   https://www.dnspod.cn/ "DNSPod"
[Disqus]: http://disqus.com/
[多说]: http://duoshuo.com/
[Markdown语法]: http://markdown.tw/ "Markdown语法"
[Git教程]: http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000 "Git教程"
[Liquid模板语言]:   https://github.com/shopify/liquid/wiki/liquid-for-designers "Liquid模板语言"
