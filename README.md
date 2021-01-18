个人学习笔记，主要是自己近些年的学习内容记录，同时会记录一些最新的观点和问题，文章同步发布在 [个人博客](https://www.zhoutao123.com)
以及 [语雀文档](https://www.yuque.com/zhoutao123) 如果您对我的文章感兴趣，欢迎关注，如果文章对您有帮助的话，欢迎 Star 支持一下，您的支持是我不断更新的动力~

> 目前项目内容正在逐步迁移到 Gitee中，更多文章建议先访问 [个人博客](https://www.zhoutao123.com) 以及 [语雀文档](https://www.yuque.com/zhoutao123) ！！！

+ [《 深入理解 Java 虚拟机》](https://www.zhoutao123.com/page/book/1)
+ [《 后端架构设计》](https://www.zhoutao123.com/page/book/2)
+ [《 Java 基础知识进阶》](https://www.zhoutao123.com/page/book/3)
+ [《 Nginx 学习笔记》](https://www.zhoutao123.com/page/book/4)
+ [《 前端开发杂记》](https://www.zhoutao123.com/page/book/5)
+ [《 设计模式学习笔记》](https://www.zhoutao123.com/page/book/6)
+ [《 DevOps 最佳实践指南》](https://www.zhoutao123.com/page/book/7)
+ [《 Netty 入门与实战》](https://www.zhoutao123.com/page/book/8)
+ [《 高性能MYSQL》](https://www.zhoutao123.com/page/book/9)
+ [《 JavaEE 常用框架》](https://www.zhoutao123.com/page/book/10)
+ [《 Java 并发编程学习笔记》](https://www.zhoutao123.com/page/book/11)
+ [《 分布式系统》](https://www.zhoutao123.com/page/book/12)
+ [《 数据结构与算法》](https://www.zhoutao123.com/page/book/13)

项目目前涵盖了: Java、JVM、Java并发、DevOps、设计模式、架构设计、各种中间件入门以及原理等等，因个人 能力有限，如果文档有错误，欢迎指出，非常感谢

# JavaWeb 相关框架

## Spring 源码分析

+ [Spring深入学习笔记概述](java/spring/001.Spring深入学习笔记概述.md)
+ [SpringBean的初始化方法](java/spring/008.SpringBean_的初始化方法.md)
+ [Spring Bean的循环依赖以及其解决方式](java/spring/005.Spring_Bean的循环依赖以及其解决方式.md)
+ [Spring Bean的属性注入](java/spring/003.Spring_Bean的属性注入.md)
+ [Spring Bean的创建方式](java/spring/002.Spring_Bean的创建方式.md)
+ [Spring 常用注解示例](java/spring/004.Spring_常用注解示例.md)
+ [BeanPostProcessor 的底层原理以及应用](java/spring/006.BeanPostProcessor_的底层原理以及应用.md)
+ [SpringAOP 从 EnableAspectJAutoProxy 说起](java/spring/007.SpringAOP从_EnableAspectJAutoProxy说起.md)

## SpringBoot 注解源码分析

+ [JAR文件格式以及JDWP调试](java/spring_boot/JAR文件格式以及JDWP调试.md)
+ [JarLauncher 源码分析](JarLauncher_源码分析.md)
+ [SprintApplication 源码分析](java/spring_boot/SpringBoot_注解源码分析.md)
+ [SpringBoot 相关模块详解](java/spring_boot/SpringBoot_相关模块详解.md)
+ [SpringBoot的日志配置](java/spring_boot/SpringBoot的日志配置.md)
+ [ApplicationListener](java/spring_boot/ApplicationListener.md)
+ [SpringApplicationEvent 使用以及实现原理](java/spring_boot/SpringApplicationEvent_使用以及实现原理.md)
+ [ApplicationContextInitializer](java/spring_boot/ApplicationContextInitializer.md)
+ [SpringFactoriesLoader](java/spring_boot/SpringFactoriesLoader.md)

## Spring Cloud 组件与原理

+ [概述](java/spring_cloud/概述.md)
+ [服务注册与发现](java/spring_cloud/服务注册与发现.md)
+ [微服务熔断机制与Hystrix原理](java/spring_cloud/微服务熔断机制与Hystrix原理.md)
+ [Zuul 网关路由](java/spring_cloud/Zuul_网关路由.md)
+ [Ribbon 客户端负载均衡](java/spring_cloud/Ribbon_客户端负载均衡.md)

## MyBatis 入门及原理

+ [Mybatis 基本概念](java/mybatis/001.MyBatis概念.md)
+ [MyBatis 项目搭建以及配置](java/mybatis/002.MyBatis_项目搭建以及配置项.md)
+ [MyBatis 执行源码解析.md](java/mybatis/003.MyBatis_执行源码解析.md)
+ [MyBatis二级缓存实现原理.md](java/mybatis/004.MyBatis二级缓存实现原理.md)

# Java虚拟机

+ 说明
+ 第1章 走进 Java 虚拟机
+ 第2章 JVM的内存区域与内存溢出异常
    + 运行时数据区域
    + HotSpot VM 探秘
    + Java对象创建以及内存布局
    + 常见的JVM 异常演示

+ 第3章 垃圾搜集器与内存分配策略
    + 对象已死吗?
    + 垃圾回收(GC)算法
    + HotSpot 算法实现
    + 垃圾回收器
    + Java 内存泄漏的分析
    + GC 日志分析

+ 第4章 虚拟机性能监控与故障处理工具

+ 第5章 调优案例分析与实战

+ 第6章 类的文件结构
    + 概述
    + 魔数与 编译JDK版本
    + 常量池
    + 访问标记与类、父类、接口索引
    + 字段表集合
    + 方法表集合
    + 属性表集合
    + 从字节码认识Java语法的实现原理
    + 实战手动分析字节码文件

+ 第7章 虚拟接类加载机制
    + 概述
    + 类加载的过程
    + 线程上下文类加载器
    + 类加载器以及类的双亲委派加载机制
    + Launcher 源码分析
    + 命名空间与类的卸载

+ 第8章 虚拟机字节码执行引擎
    + Java 栈帧结构
    + 局部变量表(Local Variable Table)
    + 操作数栈帧
    + 动态链接与方法返回地址
    + 附加信息
    + 静态分派与动态分派

# Java 并发编程

+ Java 内存模型基础

+ 第1章 并发编程的挑战
    + 上下文切换
    + 死锁的检测以及示例代码

+ 第2章 Java 并发编程的底层实现原理
    + Java并发编程的底层实
    + Volatile的应用和实现

+ 第3章 Java 的内存模型
    + 重排序-指令重排
    + Happens-Before 原则
    + 顺序一致性与其内存模型
    + final 域的内存语义
    + volatile 的内存语义
    + Lock的内存语义
    + 双重检查与延迟初始化

+ 第4章 Java 并发编程基础
    + 进程 VS 线程 ?
    + 线程状态以及守护线程
    + 线程创建 & 线程优先级
    + 线程的启动和终止
    + 线程之间的通讯机制详解
    + 多线程的应用-异步任务线程池的简单实现
    + 多线程的应用-简单实现数据库连接池

+ 第5章 Java 中锁的应用以及原理
    + Lock 与 队列同步器 AbstractQueueSynchronizer
    + AbstractQueueSynchronizer 独占式超时获取同步状态
    + AbstractQueueSynchronizer 独占式同步状态的获取与释放原理
    + AbstractQueueSynchronizer 共享式同步状态获取与释放原理
    + 可重入锁 ReentrantLock 使用与实现原理
    + Condition 的使用范式以及原理
    + 读写锁的使用与实现远离 & LockSupport 工具

+ 第6章 并发编程容器和框架
    + 并发编程容器与框架
    + Frok/Join示例与原理

+ 第7章 原子化操作
    + 原子更新与Unsafe操作
    + 原子化更新操作使用案例以及实现原理

+ 第8章 并发编程工具类
    + 等待多线程完成 CountDownLatch
    + 同步屏障 CyclicBarrier
    + 控制线程并发数 Semaphore
    + 线程间交换数据 Exchanger

+ 第9章 Java 线程池和 Executor 框架

# DevOps

# 分布式系统

+ 概述
+ 分布式系统的特征
    + 分布式系统示例
    + 分布式系统的挑战

+ 分布式系统模型
    + 物理与体系模型
    + 分布式系统 基础模型

+ 分布式的基础-网络通信
    + 网络通信方式概述
    + 网络通信原理
    + 网络通信协议

+ 远程服务调用
    + RMI 设计以及实现
    + RPC 设计以及使用

+ 间接通信
    + 共享资源系统
    + 消息队列系统
    + 发布-订阅 系统

+ WEB 服务
    + Java 中的 SOAP
    + Web服务的应用

+ 分布式文件系统
    + 分布式文件系统特点

+ 分布式事务与并发控制
    + 锁
    + 事务与嵌套事务

+ 分布式事务
    + 扁平事务 与 分布式事务
    + 原子提交协议 与分布式事务的并发控制
    + 事务恢复

+ 复制与同步
    + 系统模型与容错服务
    + 复制数据的事务
    + 示例: MySQL的主从同步复制 
