# ApplicationContextInitializer

ApplicationContextInitializer 类是SpringBoot对外预留的拓展点，定义的系统初始化器会在系统正在执行refreshContext 之前的 prepareContext() 中执行初始化执行。


ApplicationContextInitializer是Spring框架原有的东西，这个类的主要作用就是在ConfigurableApplicationContext类型(或者子类型)的ApplicationContext做refresh之前，允许我们对ConfiurableApplicationContext的实例做进一步的设置和处理。


```java
	private void prepareContext(ConfigurableApplicationContext context, ConfigurableEnvironment environment,
			SpringApplicationRunListeners listeners, ApplicationArguments applicationArguments, Banner printedBanner) {
		//..... 忽略无关代码
		applyInitializers(context);
		//..... 忽略无关代码
	}	


	protected void applyInitializers(ConfigurableApplicationContext context) {
		for (ApplicationContextInitializer initializer : getInitializers()) {
			Class<?> requiredType = GenericTypeResolver.resolveTypeArgument(initializer.getClass(),
					ApplicationContextInitializer.class);
			Assert.isInstanceOf(requiredType, context, "Unable to call initializer.");
			initializer.initialize(context);
		}
	}
```




我们可以通过自定义系统初初始化器来实自己的需求， 主要是通过继承 `    ApplicationContextInitializer<ConfigurableApplicationContext>` 来实现逻辑，比如天机自定义的配置，创建新的监听器等等。


```java
/**
 * 自定义系统初始化器
 */
@Order(1)
public class FirstInitializer implements
    ApplicationContextInitializer<ConfigurableApplicationContext> {

  public static final Logger log = LoggerFactory.getLogger(FirstInitializer.class);

  @Override
  public void initialize(ConfigurableApplicationContext context) {
    ConfigurableEnvironment environment = context.getEnvironment();

    Map<String, Object> map = new HashMap<>();
    map.put("test-key", "测试的环境变量");
    MapPropertySource propertySource = new MapPropertySource("firstInitializer", map);

    environment.getPropertySources().addLast(propertySource);
    log.info("自定义初始化器初始化完成:{}", this.getClass().getName());
  }
}
```




启用自定义的系统初始化器有两种方法:


- [x]  在 `resource/MATE-INF` 目录下创建 `spring.factoties` 文件，文件内填写自定义加载器的全类名，这是利用了SpringBoot在启动初期，会扫描JAR包下面的 `spring.factories` 文件来实现的。
```java
org.springframework.context.ApplicationContextInitializer= \
  com.zhoutao123.spring.springboot.init.FirstInitializer
```


- [x]  或者在系统初始化器启动的时候，手动构造SpringApplication，然后设置系统初始化器,如下
```java
    SpringApplication application = new SpringApplication(Application.class);
    application.addInitializers(new FirstInitializer());
    application.run(args);



	// 其原理是添加在当前上下文的initizlizes中
	public void addInitializers(ApplicationContextInitializer<?>... initializers) {
		this.initializers.addAll(Arrays.asList(initializers));
	}
```


- [x]  在SpringBoot的配置文件中添加(优先于前两者)，实现原理是委托给DelegatingApplicationContextInitializer 系统初始化器
```java
context.initializer.classes: com.zhoutao123.spring.springboot.init.FirstInitializer
```
其实现原理是将在系统配置中的系统初始化器委托 DelegatingApplicationContextInitializer 系统初始化器，因为 order = 0，所以委托给 DelegatingApplicationContextInitializer 的系统初始化器会优先被执行。


```java
public class DelegatingApplicationContextInitializer
		implements ApplicationContextInitializer<ConfigurableApplicationContext>, Ordered {

	//寻找环境变量的key
	private static final String PROPERTY_NAME = "context.initializer.classes";

    // 执行优先级
	private int order = 0;

	@Override
	public void initialize(ConfigurableApplicationContext context) {
		ConfigurableEnvironment environment = context.getEnvironment();
		List<Class<?>> initializerClasses = getInitializerClasses(environment);
		if (!initializerClasses.isEmpty()) {
            //应用初始化
			applyInitializerClasses(context, initializerClasses);
		}
	}

    // 从环境中获取Class
	private List<Class<?>> getInitializerClasses(ConfigurableEnvironment env) {
		String classNames = env.getProperty(PROPERTY_NAME);
		List<Class<?>> classes = new ArrayList<>();
		if (StringUtils.hasLength(classNames)) {
			for (String className : StringUtils.tokenizeToStringArray(classNames, ",")) {
				classes.add(getInitializerClass(className));
			}
		}
		return classes;
	}
```






配置完成之后，我们需要验证系统上下文的环境中已经正确配置了当前的值，可以创建一个Bean来验证。


```java
@Component
public class EnvService implements ApplicationContextAware {

  private static final Logger log = LoggerFactory.getLogger(EnvService.class);

  @Override
  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    String value = applicationContext.getEnvironment().getProperty("test-key");
    log.info("从环境中获取到的 Value = {}", value);
    assert Objects.equals(value,"测试的环境变量");
  }
}
```
> **如果Spring配置文件中所定义或者注解自动注入的Bean类实现了ApplicationContextAware 接口，那么在加载Spring配置文件时，会自动调用ApplicationContextAware 接口中的方法：public void setApplicationContext (ApplicationContext context) throws BeansException**





在控制台输出界面我们可以看到输出的日志，证明自定义的系统初始化器配置完成.
```java
Initializing Spring embedded WebApplicationContext
Root WebApplicationContext: initialization completed in 582 ms
从环境中获取到的 Value = 测试的环境变量
Initializing ExecutorService 'applicationTaskExecutor'
Tomcat started on port(s): 8080 (http) with context path ''
Started Application in 1.229 seconds (JVM running for 1.601)
```
re
