# SpringApplicationEvent 使用以及实现原理



# SpringApplicationEvent的使用方式


SpringApplicationEvent 是Spring提供的事件的一种编程范式，基于此我们可以监听SpringApplication的一些事件，或者自定事件来实现解耦操作。
对于自定义SpringEvent而言，我们可以定义自己的事件，比如
```java
public class CustomerEvent extends ApplicationEvent {

  public CustomerEvent(Object source) {
    super(source);
  }
}
```


对于此类事件，如果需要对其事件进行监听，我们可以通过三种方式来实现。


```java
/** 自定义事件监听器,继承ApplicationLitener */
@Component
class CustomerEventListener implements ApplicationListener<CustomerEvent> {

  @Override
  public void onApplicationEvent(@NotNull CustomerEvent event) {}
}


// 在一个普通方法上标注注解 @EventListener
@Component
public class CustomerEventListener {

  @EventListener
  public void handler(CustomerEvent event) {}
}

// 或者在SPring启动的代码中添加监听器
public static void main(){
	ConfigurableApplicationContext context = new SpringApplicationBuilder(Application.class).run(args);
	context.addApplicationListener(new CustomerEventListener());
}    


// 或者在application.ymal文件中配置context.lsitener.classes=xxxx 
// 或者在WEB-INF/spring.factories文件中配置 org.springframework.context.ApplicationListener=xxx
```




如果要测试事件的发送以及处理，则可以使用上下文发送事件,比如 `context.publishEvent(new CustomerEvent());` 






# SpringApplicationEvent的实现原理
这里以SpringApplicationStartingEvent事件为例，展示SpringBoot在启动中是如何触发。SpringApplication 对象构建完成之后，在调用的run()方法中，有以下代码
```java
	public ConfigurableApplicationContext run(String... args) {
        // .....
		SpringApplicationRunListeners listeners = getRunListeners(args);
		listeners.starting();
        // .....
    }

	// getSpringFactoriesInstances 中获取  SpringApplicationRunListener 
	// getSpringFactoriesInstances 方法已经看到，就是从spring.factories 中获取RunListener
	private SpringApplicationRunListeners getRunListeners(String[] args) {
		Class<?>[] types = new Class<?>[] { SpringApplication.class, String[].class };
		// 构造一个 SpringApplicationRunListeners 对象	
        return new SpringApplicationRunListeners(logger,
				getSpringFactoriesInstances(SpringApplicationRunListener.class, types, this, args));
	}
	
	class SpringApplicationRunListeners {

		private final Log log;

		private final List<SpringApplicationRunListener> listeners;

		SpringApplicationRunListeners(Log log, Collection<? extends SpringApplicationRunListener> listeners) {
			this.log = log;
			this.listeners = new ArrayList<>(listeners);
		}

		void starting() {
            // 遍历发送
			for (SpringApplicationRunListener listener : this.listeners) {
				listener.starting();
			}
		}
	}

	public class EventPublishingRunListener implements SpringApplicationRunListener, Ordered {

		@Override
		public void starting() {
            // 调用  initialMulticaster 广播器 发送
			this.initialMulticaster.multicastEvent(new ApplicationStartingEvent(this.application, this.args));
		}
        
		@Override
		public void environmentPrepared(ConfigurableEnvironment environment) {
            // 和Starting类似，构造环境准备完成
			this.initialMulticaster
				.multicastEvent(new ApplicationEnvironmentPreparedEvent(this.application, this.args, environment));
		}        
   }
```


比如后台任务就对 SpringApplicationEvent 感兴趣，所以其可以注册到该事件
```java
public class BackgroundPreinitializer implements ApplicationListener<SpringApplicationEvent> {}
```


- 这里我们也可以定义一个ApplicationListener 对 ApplicationEvent 监控，代码如下:
```java
public class SelfApplicationEventListener implements
    ApplicationListener<ApplicationEvent> {

  private static final Logger log = LoggerFactory.getLogger(SelfApplicationEventListener.class);

  @Override
  public void onApplicationEvent(ApplicationEvent event) {
    log.info("接收到 :{} ", event.getClass());
  }
}


//  同时需要添加到 META-INF/spring.factories 文件中
org.springframework.context.ApplicationListener=\
  com.zhoutao123.spring.springboot.event.SelfApplicationEventListener
  
// 或者在SpringApplication中添加
  public static void main(String[] args) {
    SpringApplication application = new SpringApplication(Application.class);
    application.addListeners(new SelfApplicationEventListener());
    application.run(args);
  }
  
```




控制台日志中，就可以看到：


