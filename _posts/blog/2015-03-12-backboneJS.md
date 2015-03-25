---
layout: post
title: backbone.js基本概念入门
description: Backbone.js是一个web端javascript的MVC框架，算是轻量级的框架。
category: blog
---

随着JavaScript程序变得越来越复杂，往往需要一个团队协作开发，这时代码的模块化和组织规范就变得异常重要了。MVC模式就是代码组织的经典模式。backbone.js就是为前端开发提供MVC模式滴！

强烈推荐[Backbone.js入门教程第二版][mvcSecond]，本来以为国内教程不多，一搜索才发现国内牛人很犀利啊。自己第一遍看backbone时候的很多困惑在这里头都已经非常清晰的讲解了。最重要的是这个教程中有实践！光学了新技术不行，关键还得与实际项目结合起来。接下来我就站在巨人肩膀上面开始backbone之旅。

## backebone.js官网介绍

官网左侧菜单栏里面就是backbone.js的全部模块了

- **Events**  事件：backbone.js是事件驱动的，可以给对象绑定自定义事件
- **Model**   模型：MVC中的M，对数据的操作都在这里了
- **Collection** 集合：是Model的集合
- **Router**	路由：为客户端路由提供支持，并支持旧浏览器
- **History**	历史：处理hashchange或pushState
- **Sync**	同步：向服务器进行同步，默认同步方式调用的是jQuery.ajax，可以重写Sync修改为其他同步方式
- **View** 视图：含事件行为和渲染页面
- **Utility** 工具：为解决冲突提供工具
- **F.A.O** 问答：常见问答
- **Examples** 案例：backbone.js有很多案例，直接点击就可以查看了

在使用backbone.js的时候，必须引入underscore.js。  
此外在官网上面都会给出代码示例，在代码的右上角上，有一个运行的按钮，点击的运行就可以看到这段代码运行的结果啦。

## MVC

1. Model
Model表示数据层，也就是程序需要的数据源，通常使用JSON格式表示。
2. View
View表示表现层，也就是用户界面，对于网页来说，就是用户看到的网页HTML代码。
3. Controller
Controller表示控制层，用来对原始数据（Model）进行加工，传送到View。

由于网页编程不同于客户端编程，在MVC的基础上，JavaScript社区产生了各种变体框架MVP（Model-View-Presenter）、MVVM（Model-View-ViewModel）等等，有人就把所有这一类框架的各种模式统称为MV*。

框架的优点在于合理组织代码、便于团队合作和未来的维护，缺点在于有一定的学习成本，且限制你只能采取它的写法。

### 1.Events

#### listenTo

	$(function(){

		var User = Backbone.Model.extend({
			defaults : {
				name : 'tom'
			}
		});
		
		var View = Backbone.View.extend({
				
			initialize : function(){
				console.log("initialize");

				this.listenTo( this.model , 'change' , this.show );		
				// 当与这个view绑定的model数据发生变化的时候，调用show方法
				
			},
			show : function(model){	// 向页面中输出信息
				$('body').append( '<div>'+ this.model.get('name')+ 
				'</br>也可以通过参数调用</br>' + model.get('name') +'</div>' );
			}
			
		});
		
		
		var tom = new User;
		var view = new View({model:tom});		// 创建view实体
		setTimeout(function(){
			tom.set('name','jack');		// 修改数据
		}, 1000);		// 一秒后修改数据，触发show
		

	});

listenTo允许一个对象监听另一个对象的事件，上面的代码就是让view监听model的change事件，然后调用`show()`方法


### 2.Model

#### constructor

	var tom = new Backbone.Model({'name':'tom'});  // 创建学生tom
	var peter = new Backbone.Model({'name':'peter'}); // 创建学生peter

	var students = new Backbone.Collection(); // tom和peter都是学生
	students.add( tom );	// 向Collection中添加学生
	students.add( peter );

	console.log( JSON.stringify(students) ); //[{"name":"tom"},{"name":"peter"}]

用new的方式创建了两个Model的实例；通过json对象传参方式给Model的constuctor构造函数传递了name属性。  
用new的方式创建了一个Collection实例；调用students的add方法，将tom和peter添加到集合中。  
在[文档](http://backbonejs.org/#Model-constructor)中可以看出，使用`{'name':'tom'}`这种方式给Model设置的属性，实际上会调用model.set()方法。

#### extend

	var User = Backbone.Model.extend({
	sayHello : function(){  //实例方法
			console.log("hello");
		}
	},
	{
	sayWorld : function(){  //静态方法
			console.log("world");
		}
	});

	var tom = new User;	// 创建一个用户
	tom.sayHello();	// 调用用户的实例方法
	User.sayWorld(); // 直接调用Model的静态方法

使用extend扩展Backbone.Model，第一个参数是实例对象中的属性，第二个可选的参数会直接注册到构造函数成为静态方法。这样即使没有实例化对象，也能调用Model中定义的方法  
    
	var User = Backbone.Model.extend({
		defaults : {		// 默认属性，但是子类也会继承
			"name": "tom"
		},
		sayHello : function(){	// 父类的方法
			console.log("hello");
		}
	});

	var ChildUser = User.extend({	// ChildUser 继承自User
		sayChild : function(){	// 子类的方法
			console.log("child");
		}
	}); 

	var child = new ChildUser;	// 创建ChildUser实例
	child.sayHello();		// 子类继承父类sayHello()方法
	child.sayChild();		// 子类自己的方法
	console.log(child.get("name"));  // 子类继承父类属性

extend会正确的设置原型链，所以可以通过extend实现继承。上面的代码就是创建父类User，然后子类ChildUser继承子父类。子类会继承父类的属性和方法

#### initialize

    var User = Backbone.Model.extend({
		defaults : {		
			name : 'tom'	// 默认的名字
		},
		initialize : function(){  //当model创建的时候，调用
			console.log("initialize");	

			this.on('change',function(){	// 当数据发生变化的时候触发
				console.log("此时我的名字是："+this.get("name"));
			});
			
		}
	});

	var tom = new User;
	tom.set('name','jack');	// 修改模型的数据，会被change检测到

如果指定了`initialize`方法，会在创建实例对象之后调用`initialize()`。  
当修改了模型数据（通过`set()`方法修改数据），会触发自定义事件。

	var User = Backbone.Model.extend({
		defaults : {		
			name : 'tom',	// 默认的名字
			age : 10
		},
		initialize : function(){  //当model创建的时候，调用
			console.log("initialize");	

			this.on('change:name',function(){	// 只检测name的变化
				console.log("此时我的名字是："+this.get("name"));
			});
			
		}
	});

	var tom = new User;
	tom.set('name','jack');	// 修改模型的数据，会被change检测到
	tom.set('age','20');// 修改年龄不会被change检测

如果只想检测某个属性的变化，可以通过添加命名空间的方式区别开事件。通过`:`的方式给事件添加命名空间。

#### validate
    var Man = Backbone.Model.extend({
	    initialize: function(){
	        console.log('Hey, you create me!');
	        //初始化时绑定监听, change事件会先于validate发生
	        this.on("change:name",function(){
	            var name = this.get("name");
	            console.log("你改变了name属性为：" + name);
	        });
	        // 第一种绑定方式：初始化的时候绑定invalid事件
	        this.on("invalid",function(model,error){
	            console.log(error);
	        });
	    },
	    defaults: {
	        name:'张三',
	        age: '38'
	    },
	    validate:function(attributes){
	        if(attributes.name == '') {
	            return "name不能为空！";
	        }
	    },
	    aboutMe: function(){
	        return '我叫' + this.get('name') + ',今年' + this.get('age') + '岁';
	    }
	});
	var man = new Man;
	// 第二种绑定方式：给实例对象绑定invalid事件
	// man.on('invalid', function(model, error){
	//         console.log(error);
	// });

	// 默认set时不进行验证
	man.set({name:''});

	// 第一种触发方式：给set传递{validate:true}参数
	// 其中的validate就是方法名，也可以是别的
	// man.set({name:''}, {'validate':true});


	// 第二种触发方式：save的时候触发
	man.save();

	// 第三种触发方式：通过isValid()触发
	// 这种方式不需要通过on绑定事件
	// if (!man.isValid()) {
	//   console.log(man.validationError);
	// }

向服务器提交数据之前，我们一般都会对数据验证。比如是否为空、是否为手机号等。在backbone中可以通过绑定事件对数据进行验证、或者通过`isValid()`对数据进行验证。  
绑定事件的时候，事件名是`invalid`；    
用`set()`或者`save()`触发验证的时候，必须绑定事件，而用`isValid()`进行判断则不用绑定事件；  
如果使用`isValid()`进行判断，注意验证的方法名称必须是`validate`；  
如果验证错误，会返回`validationError`，它的消息就是在验证时候`return`回来的信息；  
如果验证失败是不会向服务器发送请求保存数据的，也就是说model数据并不会被修改。

### 3.View

#### extend

   	var BodyView = Backbone.View.extend({
		
		el : $('body'),	// 如果没有指定el，el就会是个空div
		events : {
			'click input' : 'sayHello',	// 点击input的时候调用sayHello方法
			'mouseover li' : 'moveLi'// 鼠标悬浮li标签的时候调用moveLi方法
		},
		sayHello : function(){
			console.log("Hello");
		},
		moveLi : function(){
			console.log("mouseover li");
		}
		
	});
	
	var view = new BodyView;

如果设置了tagName、className、id、attributes属性（为视图设置根元素），那么`view.el`就会被创建，如果没有指定`view.el`就是个空的div。  
Backbone.events可以写成对象的形式，给视图绑定一组自定义事件。

#### template
	
	var Name = Backbone.Model.extend({
		defaults : {
			name : 'tom'
		}
	});
	
	var NameView = Backbone.View.extend({
			
		initialize : function(){
			
			this.listenTo( this.model , 'change' , this.showName );
			
		},
		showName : function(model){
			// $('body').append( "<div>" + model.get("name") + "</div>" );		
			// 不使用template的时候html代码与js写在一起
			$('body').append( this.template(this.model.toJSON()) );	
			// 使用模版之后，html代码与js代码相分离
		},
		template: _.template($('#name').html())
		// _.template中传入需要编译的模版
		// 返回的结果就是编译后的html代码
		// 最后在showName中调用，将编译后的html显示到body中
	});	
	
	var name = new Name;
	var nameView = new NameView({model:name});
	name.set('name','jack');

    <script type="text/template" id="name">
		<% for (var i=0;i<5;i++) { %>
			<div><%= name %></div>
		<% } %>
	</script>
	

使用js模版不仅可以将html代码和js代码分离，提高可读性，也能提高开发效率。backbone.js使用的underscore.js中的template

### 4.Sync

#### 重写Backbone.sync

    Backbone.sync = function(method, model) {
	  console.log(method + ": " + JSON.stringify(model));
	  model.set('id', 1);	// 模型的特殊属性
	};

	var Book = Backbone.Model.extend({
	  	defaults:{
	  		title: "The Rough Riders",
	  		author: "Theodore Roosevelt"
	  	}
	});

	var b = new Book;
	b.save();		
	// create: {"title":"The Rough Riders","author":"Theodore Roosevelt"}
	b.save({author: "Teddy"}); 
	// update: {"title":"The Rough Riders","author":"Teddy","id":1}

调用模型的save方法，就是委托Backbone.sync对数据进行持久化处理（保存到数据库），如果验证成功返回jqXHR，否则返回false。  
sync默认情况下是使用的是jQuery.ajax，可以通过重写sync来使用其他方式进行持久化处理。如WebSockets,XML,或者Local Storage。  
上面的代码就是重写Backbone.sync的过程。第一次`save`的时候发送的create请求，第二次save的时候发送的是`update`请求。
Backbone是如何区分第一次请求还是第二次请求的呢？  
是根据通过`model.isNew`这个方法进行判断的。如果模型没有id属性，就是表示模型是新模型。可以通过下面的代码进行测试

    Backbone.sync = function(method, model) {
	  console.log(method + ": " + JSON.stringify(model));
	  console.log(model.isNew());	// 此时不存在id属性，所以是true
	  model.set('id', 1);	// 模型的特殊属性
	  console.log(model.isNew()); // 此时存在id属性，所以是false
	};

在[Model.id文档](http://backbonejs.org/#Model-id)中指出，如果通过set设置了model的id，就会将这个id拷贝到模型上，作为model的直接属性。在下图中可以发现通过`Model.set('id',1)`，给attributes中添加了id属性，也直接给model添加了id属性。
![setId](http://siberiawolf.qiniudn.com/images/backboneJS/setId.png)
但是相反的，如果用`model.id=1`的方式直接给model添加id属性，是不会拷贝到attributes中的。如果只是给model直接添加了id，`Model.isNew`返回的一直都会是true。

    Backbone.sync = function(method, model) {
	  console.log(method + ": " + JSON.stringify(model));
	  console.log(model.isNew());	// 返回true
	  model.id=1;	// 给model直接添加id属性
	  console.log(model.isNew()); // 返回true
	};
![attributeId](http://siberiawolf.qiniudn.com/images/backboneJS/attributeId.png)



###F.A.Q.

#### events 是如何给视图绑定一组事件的？

#### el属性和$el属性的区别？

#### url和urlRoot的区别？

#### 单词为啥首字母大写？

#### 使用bind还是on？

#### Backbone.sync自动传参CRUD是怎么回事？


### 友情链接
- [文中源码下载](http://siberiawolf.qiniudn.com/code/backboneJS.zip)
- [Backbone.js官方网站](http://backbonejs.org/)
    - [中文手册](http://www.css88.com/doc/backbone/)
- [Backbone.js源码带详细注释](http://backbonejs.org/docs/backbone.html)
- [Underscore.js官方网站](http://underscorejs.org/)
    - [中文手册](http://learningcn.com/underscore/)
- [Backbone.js入门教程第二版][mvcSecond]
- [MVC框架与Backbone.js](http://javascript.ruanyifeng.com/advanced/backbonejs.html)
- [Backbone Tutorials](http://backbonetutorials.com/)

[mvcSecond]:    https://github.com/the5fire/backbonejs-learning-note
