# Java 并发编程知识点

> 正在完善中，麻烦跳转到本人博客网站浏览 [燕归来兮-Java并发编程学习笔记](https://www.zhoutao123.com/page/book/11)

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
