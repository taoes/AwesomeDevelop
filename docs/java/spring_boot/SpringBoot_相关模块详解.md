# SpringBoot 相关模块详解





### SpringBoot 
> The main library providing features that support the other parts of Spring Boot, these include:
> - The `SpringApplication` class, providing static convenience methods that make it easy to write a stand-alone Spring Application. Its sole job is to create and refresh an appropriate Spring `ApplicationContext`

> - Embedded web applications with a choice of container (Tomcat, Jetty or Undertow)

> - First class externalized configuration support

> - Convenience `ApplicationContext` initializers, including support for sensible logging defaults






### SpringBoot AutoConfigure
> Spring Boot can configure large parts of common applications based on the content of their classpath. A single `@EnableAutoConfiguration` annotation triggers auto-configuration of the Spring context.
> Auto-configuration attempts to deduce which beans a user might need. For example, if `HSQLDB` is on the classpath, and the user has not configured any database connections, then they probably want an in-memory database to be defined. Auto-configuration will always back away as the user starts to define their own beans.



### SpringBoot-starters
> Starters are a set of convenient dependency descriptors that you can include in your application. You get a one-stop-shop for all the Spring and related technology that you need without having to hunt through sample code and copy paste loads of dependency descriptors. For example, if you want to get started using Spring and JPA for database access just include the `spring-boot-starter-data-jpa` dependency in your project, and you are good to go.



### SpringBoot-Cli
> The Spring command line application compiles and runs Groovy source, making it super easy to write the absolute minimum of code to get an application running. Spring CLI can also watch files, automatically recompiling and restarting when they change.



### SpringBoot-actuator
> Actuator endpoints let you monitor and interact with your application. Spring Boot Actuator provides the infrastructure required for actuator endpoints. It contains annotation support for actuator endpoints. Out of the box, this module provides a number of endpoints including the `HealthEndpoint`, `EnvironmentEndpoint`, `BeansEndpoint` and many more.





### SpringBoot-actuator-autoconfigure
> 提供了Actiuator的自动配置信息





### spring-boot-test
> This module contains core items and annotations that can be helpful when testing your application.
> 提供了测试模块，让SPringBoot更方便的测试



### spring-boot-test-autoconfigure
> Like other Spring Boot auto-configuration modules, spring-boot-test-autoconfigure, provides auto-configuration for tests based on the classpath. It includes a number of annotations that can be used to automatically configure a slice of your application that needs to be tested.





### spring-boot-loader
> Spring Boot Loader provides the secret sauce that allows you to build a single jar file that can be launched using `java -jar`. Generally you will not need to use `spring-boot-loader` directly, but instead work with the [Gradle](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot-tools/spring-boot-gradle-plugin) or [Maven](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot-tools/spring-boot-maven-plugin) plugin.



### spring-boot-devtools
> The spring-boot-devtools module provides additional development-time features such as automatic restarts, for a smoother application development experience. Developer tools are automatically disabled when running a fully packaged application.
> 提供了额外的开发特性， 比如自动重启，一些平滑应用的开发体验，开发者工也会自动的被禁用，在程序在打包运行的时候后
