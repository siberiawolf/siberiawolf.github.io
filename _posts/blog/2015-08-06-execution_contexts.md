---
layout: post
title: 【转】chapter-1-execution-contexts
description: ECMA-262-3 深入解析.第一章.执行上下文
category: blog
---

## 说明

## Introduction
In this note we will mention execution contexts of ECMAScript and types of executable code related with them.  
只要执行到可执行代码处，就会进入到一个执行上下文。

## Definitions
Every time when control is transferred to ECMAScript executable code, control is entered an execution context.

> Execution context (abbreviated form — EC) is the abstract concept used by ECMA-262 specification for typification and differentiation of an executable code.

The standard does not define accurate structure and kind of EC from the technical implementation viewpoint; it is a question of the ECMAScript-engines implementing the standard.

Logically, set of active execution contexts forms a stack. The bottom of this stack is always a global context, the top — a current (active) execution context. The stack is modified (pushed/popped) during the entering and exiting various kinds of EC.  
在堆栈的底部永远是全局上下文，在顶部是当前活动的上下文。跟对堆栈的操作是一样，都是采用后进先出的原则。

## Types of executable code
With abstract concept of an execution context, the concept of type of an executable code is related. Speaking about code type, it is possible in the certain moments to mean an execution context.

For examples, we define the stack of execution contexts as an array:

	ECStack = [];
	
The stack is pushed every time on entering a function (even if the function is called recursively or as the constructor), and also at built-in eval function work.  
可执行代码和可执行上下文都是抽象的概念。可以通过数组来模拟可执行上下文堆栈。当进入到函数、递归、构造、eval的时候堆栈都会执行`push`。

## Global code
This type of code is processed at level Program: i.e. the loaded external .js-file or the local inline-code (inside the `<script></script>` tags). The global code does not include any parts of a code which are in bodies of functions.

At initialization (program start), ECStack looks like:

	ECStack = [
	  globalContext
	];

全局代码不包含任何函数体内的代码。（？？？？）

## Function code
On entering the function code (all kinds of functions), ECStack is pushed with new elements. It is necessary to notice that the code of concrete function does not include codes of the inner functions.  
当进入函数，ECStack会phus新的元素

For example, let's take the function which calls itself recursively once:
	
	(function foo(flag) {
	  if (flag) {
	    return;
	  }
	  foo(true);
	})(false);

Then, ECStack is modified as follows:

	// first activation of foo
	ECStack = [
	  <foo> functionContext // foo 函数上下文
	  globalContext
	];
	  
	// recursive activation of foo
	ECStack = [
	  <foo> functionContext – recursively // 递归函数上下文
	  <foo> functionContext				  // 之前的foo函数上下文，并没有删除
	  globalContext
	];

Every return from a function exits the current execution context and ECStack popped accordingly — consecutively and upside-down — quite natural implementation of a stack. After the work of this code is finished, ECStack again contains only globalContext — until the program end.  
每次都只push当前执行上下文，当前代码执行完毕，pop掉这个可执行上下文。直到整个程序都执行完毕之后，ECStack中只有全局上下文。

A thrown but not caught exception may also exit one or more execution contexts:

	(function foo() {
	  (function bar() {
	    throw 'Exit from bar and foo contexts';
	  })();
	})();

一个被抛出但是没有被截获的异常，同样存在一个或多个执行上下文。（？？？？）

## Eval code
Things are more interesting with eval code. In this case, there is a concept of a calling context, i.e. a context from which eval function is called.  
记住调用上下文就行了（calling context）。

The actions made by eval, such as variable or function definition, influence exactly the calling context:

	// influence global context
	eval('var x = 10');
	 
	(function foo() {
	  // and here, variable "y" is
	  // created in the local context
	  // of "foo" function
	  eval('var y = 20');
	})();
	  
	alert(x); // 10		// x 添加到了全局上下文中，所以可以访问到
	alert(y); // "y" is not defined 
			  // 因为此时foo的上下文，已经被pop掉了

For the example above we have the following ECStack modifications:

	ECStack = [
	  globalContext
	];
	  
	// eval('var x = 10');
	ECStack.push({
	  context: evalContext,
	  callingContext: globalContext
	});
	 
	// eval exited contexts
	ECStack.pop();	// 是将这个eval的上下文pop掉，但是全局的上下文，依然存在
	 
	// foo funciton call  
	ECStack.push(<foo> functionContext);	// foo 函数的上下文
	 
	// eval('var y = 20');
	ECStack.push({							// eval 的上下文
	  context: evalContext,
	  callingContext: <foo> functionContext
	});
	 
	// return from eval 					// 先移除foo 函数上下文
	ECStack.pop();
	 
	// return from foo
	ECStack.pop();

I.e. quite casual and logical call-stack.  
核心就是理解堆栈的操作。需要注意的是遇到了函数，就会push；遇到eval函数push的是一个对象，且存在一个调用上下文的概念。

## Conclusion
This theoretical minimum is required for the further analysis of details related with execution contexts, such as variable object or scope chain, which descriptions can be found in the appropriate chapters.



## 参考连接
- [原文链接][原文链接]
- [中文版][中文版]


[原文链接]:    http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/
[中文版]:    http://www.cnblogs.com/justinw/archive/2010/04/23/1718733.html 





