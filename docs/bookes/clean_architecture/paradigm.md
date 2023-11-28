---
title: 编程范式
date: 2021-11-28
---

本章将讲述三个编程范式，它们分别是结构化编程（structured programming）、 面向对象编程（object-oriented programming）以及函数式编程（functional programming）。

## 结构化编程

结构化编程是第一个普遍被采用的编程范式（但是却不是第一个被提出的），由 Edsger Wybe Dijkstra 于 1968 年最先提出。与此同时，Dijkstra 还论证了使用 goto 这样的无限制跳转语句将会损害程序的整体结构。接下来的章节我们还会说到，二是这位 Dijkstra 最先主张用我们现在熟知的 if/then/else 语句和 do/while/until 语句来代替跳转语句的。

`Structured programming imposes discipline on direct transfer of control.`

> 结构化编程对程序控制权的直接转移进行了限制和规范。


## 面向对象编程

说到编程领域中第二个被广泛采用的编程范式，当然就是面向对象编程了：事实上，这个编程范式的提出比结构化编程还早了两年，是在 1966 年由 Ole Johan Dahl 和 Kriste Nygaard 在论文中总结归纳出来的。这两个程序员注意到在 ALGOL 语言中. 函数调用堆栈（call stack frame）可以被挪到堆内存区域里，这样函数定义的本地变量就可以在函数返回之后继续存在。这个函数就成为了一个类（class）的构造函数，而它所定义的本地变量就是类的成员变量，构造函数定义的嵌套函数就成为了成员方法（method）。这样一来，我们就可以利用多态（polymorphism）来限制用户对函数指针的使用。


`Object-oriented programming imposes discipline on indirect transfer of control.`

> 面向对象编程对程序控制权的间接转移进行了限制和规范。

## 函数式编程

尽管第三个编程范式是近些年才刚刚开始被采用的，但它其实是三个范式中最先被发明的。事实上，函数式编程概念是基于与阿兰·图灵同时代的数学家 Alonzo Church 在 1936 年发明的入演算的直接衍生物。1958 年 John Mccarthy 利用其作为基础发明了 LISP 语言。众所周知，λ 演算法的一个核心思想是不可变性——某个符号所对应的值是永远不变的，所以从理论上来说，函数式编程语言中应该是没有赋值语句的。大部分函数式编程语言只允许在非常严格的限制条件下，才可以更改某个变量的值。


`Functional programming imposes discipline upon assignment.`

> 函数式编程对程序中的赋值进行了限制和规范。


## 本章小结

大家可能会问，这些编程范式的历史知识与软件架构有关系吗？当然有，而目关系相当密切。譬如说，多态是我们跨越架构边界的手段，函数式编程是我们规范和限制数据存放位置与访问权限的手段，结构化编程则是各模块的算法实现基础。

这和软件架构的三大关注重点不谋而合：`功能性`、`组件独立性`以及`数据管理`。