# SpringBoot 注解源码分析



    [@SpringBootApplication](#) 注解式标注一个SpringBoot应用的标志，比如下面的代码就可以正常的启动一个非常简单的SpringBoot应用


```java
@SpringBootApplication
public class SpringbootApplication {

  public static void main(String[] args) {
    SpringApplication.run(SpringbootApplication.class, args);
      
    // 或者下面的这种方法
    SpringApplication application = new SpringApplication(SpringbootApplication.class);
    application.run(args);
  }
}
```


## SpringBootApplication


[@SpringBootApplicaiton](#)源码如下:

- 标识出一个配置类，声明一个或者多个Bean的方法，同时触发启用自动配置以及组件扫描



```java
/**标识出一个配置类，声明一个或者多个Bean的方法，同时触发启用自动配置以及组件扫描 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {//...}

/*** 标识提供了SpringBoot的配置功能*/
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
// 标识一个类具有多个Bean方法，这些方法可以被Spring容器定义，使用
@Configuration 
public @interface SpringBootConfiguration {//...}
```


## Configuration
注解Configuration 是一个非常重要的注解，他标识了的类的Bean对象会被Spring容器管理，具有非常多的应用场景，下面展示常用的示例
```java
/* Indicates that a class declares one or more @Bean methods and may be processed by the Spring container
to generate bean definitions and service requests for those beans at runtime, for example:
标识一个类具有多个Bean的方法，这些Bean 可以被Spring容器来定义BeanDefined以及使用
*/
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Configuration {//...}        
    

    
// 比如下面的形式
   @Configuration
   public class AppConfig {
       @Bean
       public MyBean myBean() {
           // instantiate, configure and return bean ...
       }
   }

/*
Bootstrapping @Configuration classes Via AnnotationConfigApplicationContext
@Configuration classes are typically bootstrapped using either  AnnotationConfigApplicationContext or its web-capable variant,
AnnotationConfigWebApplicationContext. A simple example with the former follows:
*/
  
//下面的示例展示了通过 AnnotationConfigApplicationContext 从@Configuration 标记的注解的类中获取Bean对象
   AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
   ctx.register(AppConfig.class);
   ctx.refresh();
   MyBean myBean = ctx.getBean(MyBean.class);
   // use myBean ...
   
   
// 也可以充分的应用@Autwired或者@Injec, 构造方法等方式来注入其他的bean.
   @Configuration
   @ComponentScan("com.zhoutao123.app.services") // 配置到哪里扫描需要Bean
   public class AppConfig {
  
       private final SomeBean someBean;
  
       public AppConfig(SomeBean someBean) {
           this.someBean = someBean;
       }
 
       // @Bean definition using "SomeBean"
  
   }
   
 // 也可以从   Environment 中获取环境变量值 
   @Configuration
   public class AppConfig {
  
       @Autowired Environment env;
  
       @Bean
       public MyBean myBean() {
           MyBean myBean = new MyBean();
           myBean.setName(env.getProperty("bean.name"));
           return myBean;
       }
   }

 // 甚至可以指定Properties元数据 然后从中获取环境变量值
   @Configuration
   @PropertySource("classpath:/com/zhoutao123/app.properties")
   public class AppConfig {
  
       @Inject Environment env;
  
       @Bean
       public MyBean myBean() {
           return new MyBean(env.getProperty("bean.name"));
       }
   }
    
// 当然也可以使用@Value注解，没有PropertySource，会从SpringBoot的默认配置文件注入
   @Configuration
   @PropertySource("classpath:/com/zhoutao123/app.properties")
   public class AppConfig {
  
       @Value("${bean.name}") 
       String beanName;
  
       @Bean
       public MyBean myBean() {
           return new MyBean(beanName);
       }
   }
   
   
// 使用 @Import 注入其他Config，由于其他@Configuration 对象是被Spring 容器管理的，因此其可以注入到AppConfig对象中


   @Configuration
   public class DatabaseConfig {
  
       @Bean
       public DataSource dataSource() {
           // instantiate, configure and return DataSource
       }
   }
  
   @Configuration
   @Import(DatabaseConfig.class)
   public class AppConfig {
  
       private final DatabaseConfig dataConfig;
  
       public AppConfig(DatabaseConfig dataConfig) {
           this.dataConfig = dataConfig;
       }
  
       @Bean
       public MyBean myBean() {
           // reference the dataSource() bean method
           return new MyBean(dataConfig.dataSource());
       }
 }
  
    
//还有其他的使用场景，更多情况这里不再过多的赘述，可以参考文件  org.springframework.context.annotation.Configuration    

```


- Configuration classes must be provided as classes (i.e. not as instances returned from factory methods), allowing for runtime enhancements through a generated subclass. 必须是一个类
- Configuration classes must be non-final (allowing for subclasses at runtime), unless the proxyBeanMethods flag is set to false in which case no runtime-generated subclass is necessary. 此类必须不是final修饰的
- Configuration classes must be non-local (i.e. may not be declared within a method). 配置类必须不是
- Any nested configuration classes must be declared as static. 嵌套的内部类必须是静态的
- @Bean methods may not in turn create further configuration classes (any such instances will be treated as regular beans, with their configuration annotations remaining undetected).  Bean方法修饰的并不是further类型的配置类





