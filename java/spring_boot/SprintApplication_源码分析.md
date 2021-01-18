# SprintApplication 源码分析

在JarLauncher根据MAINFEST.MF 文件中的Start-class的类名找到我们定义的SpringBoot应用，通过反射执行其main方法之后, 程序开始调用 SpringApplicaiton的静态run方法执行，形如下面的示例代码
```java
@SpringBootApplication
public class SpringbootApplication {

  public static void main(String[] args) {
    SpringApplication.run(SpringBootApplication.class,args);
  }
}
```


## SpringApplication 源码分析
首先给出源码代码，可以看到， `run(Class<?> primarySource, String... args)`  调用
`run(Class<?>[] primarySources, String... args)` 传递的是多个`primarySource ` 然后调用了使用new指令创建了  `primarySource` 其构造方法的签名为 `public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources)` 




![](https://cdn.nlark.com/yuque/__puml/69bf782b422ae07b4bf72df077cd5241.svg#lake_card_v2=eyJjb2RlIjoiQHN0YXJ0dW1sXG5cbmVudGl0eSDlupTnlKggQVMgYVxuZW50aXR5IFNwcmluZ-S4iuS4i-aWhyBBUyBzXG5cbmEgLT4gIHM6IOWIm-W7uiBTcHJpbmdBcHBsaWNhdGlvbuWunuS-i1xucyAtPiBzOiDmjqjmlq3lvZPliY3lupTnlKjnsbvlnotcbnMgLT4gczog5qC55o2u5aSa5Liqc3ByaW5nLmZhY3RvcmllcyDmiavmj48gXFxuIEFwcGxpY2F0aW9uQ29udGV4dEluaXRpYWxpemVyICAmIOWIm-W7uuWunuS-i1xucyAtPiBzOiDmoLnmja7lpJrkuKpzcHJpbmcuZmFjdG9yaWVzIOaJq-aPjyBcXG4gQXBwbGljYXRpb25MaXN0ZW5lciAmIOWIm-W7uuWunuS-i1xucyAtPiBzOiDmoLnmja7loIbmoIjkv6Hmga_lkJHkuIrmn6Xmib5tYWlu5pa55rOVXG5zIC0tPiBhOiDov5Tlm54gQ29uZmlndXJhYmxlQXBwbGljYXRpb25Db250ZXh0IOWvueixoVxuXG5hLT4gczog6LCD55SoIHJ1bigp5pa55rOVXG5cblxuQGVuZHVtbFxuIiwidHlwZSI6InB1bWwiLCJtYXJnaW4iOnRydWUsImlkIjoiZ1NiNXEiLCJ1cmwiOiJodHRwczovL2Nkbi5ubGFyay5jb20veXVxdWUvX19wdW1sLzY5YmY3ODJiNDIyYWUwN2I0YmY3MmRmMDc3Y2Q1MjQxLnN2ZyIsImNhcmQiOiJkaWFncmFtIn0=)

在构造方法中主要实现了一下内容:

- [x] 推测当前应用类型，主要是根据ClassPath是否存在Servlet或者其他相应的类来推断
- [x] 在当前 ClassPath中寻找META-INF/spring.factories 文件，根据文件内容找到 ApplicationContextInitializer 并初始化实例对象 
- [x] 在当前 ClassPath中寻找META-INF/spring.factories 文件，根据文件内容找到 ApplicationListener 并初始化实例对象
- [x] 推断出指定的main方法的类型
```java
	
	public static ConfigurableApplicationContext run(Class<?> primarySource, String... args) {
		return run(new Class<?>[] { primarySource }, args);
	}

	public static ConfigurableApplicationContext run(Class<?>[] primarySources, String[] args) {
		return new SpringApplication(primarySources).run(args);
	}

	public SpringApplication(Class<?>... primarySources) {
		this(null, primarySources);
	}

	public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
		this.resourceLoader = resourceLoader;
		Assert.notNull(primarySources, "PrimarySources must not be null");
		this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));
        // 推断当前应用类型
		this.webApplicationType = WebApplicationType.deduceFromClasspath();
        // 查找ApplicationContextInitializer，创建实例对象设置给当前上下文的成员变量
		setInitializers((Collection) getSpringFactoriesInstances(ApplicationContextInitializer.class));
        // 查找 ApplicationListener，创建实例对象设置给当前上下文的成员变量
		setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
        // 推断出main方法所在的类，非常巧妙
		this.mainApplicationClass = deduceMainApplicationClass();
	}


// 推断main方法所在的类
	private Class<?> deduceMainApplicationClass() {
		try {
			StackTraceElement[] stackTrace = new RuntimeException().getStackTrace();
			for (StackTraceElement stackTraceElement : stackTrace) {
				if ("main".equals(stackTraceElement.getMethodName())) {
					return Class.forName(stackTraceElement.getClassName());
				}
			}
		}
		catch (ClassNotFoundException ex) {}
		return null;
    }
// 推荐Web应用的类型

	private static final String WEBMVC_INDICATOR_CLASS = "org.springframework.web.servlet.DispatcherServlet";

	private static final String WEBFLUX_INDICATOR_CLASS = "org.springframework.web.reactive.DispatcherHandler";

	private static final String JERSEY_INDICATOR_CLASS = "org.glassfish.jersey.servlet.ServletContainer";

	private static final String SERVLET_APPLICATION_CONTEXT_CLASS = "org.springframework.web.context.WebApplicationContext";

	private static final String REACTIVE_APPLICATION_CONTEXT_CLASS = "org.springframework.boot.web.reactive.context.ReactiveWebApplicationContext";

	static WebApplicationType deduceFromClasspath() {
        // 包含DispatcherHandler类并且不包含 DispatcherServlet & ServletContainer 则认为是 REACTIVE(Spring5提供)
		if (ClassUtils.isPresent(WEBFLUX_INDICATOR_CLASS, null) && !ClassUtils.isPresent(WEBMVC_INDICATOR_CLASS, null)
				&& !ClassUtils.isPresent(JERSEY_INDICATOR_CLASS, null)) {
			return WebApplicationType.REACTIVE;
		}
        // 如果不包含 DispatcherServlet & ServletContainer 认为是NODE
		for (String className : SERVLET_INDICATOR_CLASSES) {
			if (!ClassUtils.isPresent(className, null)) {
				return WebApplicationType.NONE;
			}
		}
        
        // 否则认为是 SERVLET
		return WebApplicationType.SERVLET;
	}
```


### 初始化 ApplicationContextInitializer




```java
	// 获取Spring工厂实例集合
	private <T> Collection<T> getSpringFactoriesInstances(Class<T> type, Class<?>[] parameterTypes, Object... args) {
		// 获取类加载器，如果给定的资源类加载器不为null，则使用资源的类加载器，否在使用线程上下文类加载器
        // 如果上下文中不存在类加载器，则使用系统类加载器，详情参考 ClassUtils.getDefaultClassLoader();
        ClassLoader classLoader = getClassLoader();
        // 根据指定的类类型信息，查找到多个 META-INF/spring.factories 中定义的  ApplicationContextInitializer的类名
        // 在这里的type = ApplicationContextInitializer.class
		Set<String> names = new LinkedHashSet<>(SpringFactoriesLoader.loadFactoryNames(type, classLoader));
		// 根据全类名和参数创建Spring工厂实例
        List<T> instances = createSpringFactoriesInstances(type, parameterTypes, classLoader, args, names);
        AnnotationAwareOrderComparator.sort(instances);
		return instances;
	}	

	public ClassLoader getClassLoader() {
		if (this.resourceLoader != null) {
			return this.resourceLoader.getClassLoader();
		}
		return ClassUtils.getDefaultClassLoader();
	}

  // =====================================================================================

	// 查找到多个 META-INF/spring.factories 中定义的  ApplicationContextInitializer的类名
	public static List<String> loadFactoryNames(Class<?> factoryType, @Nullable ClassLoader classLoader) {
		String factoryTypeName = factoryType.getName();
        // 从所有的定义中找到符合当前type信息的类集合
		return loadSpringFactories(classLoader).getOrDefault(factoryTypeName, Collections.emptyList());
	}

	//查找出 所有的 spring.factories 文件中定义的类信息
	private static Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader) {
		MultiValueMap<String, String> result = cache.get(classLoader);
		if (result != null) {
			return result;
		}

		try {
			Enumeration<URL> urls = (classLoader != null ?
					classLoader.getResources(FACTORIES_RESOURCE_LOCATION) :
					ClassLoader.getSystemResources(FACTORIES_RESOURCE_LOCATION));
			result = new LinkedMultiValueMap<>();
			while (urls.hasMoreElements()) {
				URL url = urls.nextElement();
				UrlResource resource = new UrlResource(url);
				Properties properties = PropertiesLoaderUtils.loadProperties(resource);
				for (Map.Entry<?, ?> entry : properties.entrySet()) {
					String factoryTypeName = ((String) entry.getKey()).trim();
					for (String factoryImplementationName : StringUtils.commaDelimitedListToStringArray((String) entry.getValue())) {
						result.add(factoryTypeName, factoryImplementationName.trim());
					}
				}
			}
			cache.put(classLoader, result);
			return result;
		}
		catch (IOException ex) {
			throw new IllegalArgumentException("Unable to load factories from location [" +
					FACTORIES_RESOURCE_LOCATION + "]", ex);
		}
	}

	// 根据给到的类型信息等参数，创建实例对象，并返回
	private <T> List<T> createSpringFactoriesInstances(Class<T> type, Class<?>[] parameterTypes,
			ClassLoader classLoader, Object[] args, Set<String> names) {
		List<T> instances = new ArrayList<>(names.size());
		for (String name : names) {
			try {
				Class<?> instanceClass = ClassUtils.forName(name, classLoader);
				Assert.isAssignable(type, instanceClass);
				Constructor<?> constructor = instanceClass.getDeclaredConstructor(parameterTypes);
				T instance = (T) BeanUtils.instantiateClass(constructor, args);
				instances.add(instance);
			}
			catch (Throwable ex) {
				throw new IllegalArgumentException("Cannot instantiate " + type + " : " + name, ex);
			}
		}
		return instances;
	}
```


### 初始化 ApplicationListener
初始化 ApplicationListener 的过程和上述过程非常类似,这里不再赘述，只是传递的type信息不一致，和 ApplicationContextInitializer 一样。


```java
setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
```


## Run 方法分析 


在成功构造SpringApplication之后，会调用run方法执行，首先来看一下run 方法的源码内容.




- **第一步：获取并启动监听器**
- **第二步：构造容器环境**
- **第三步：创建容器**
- **第四步：实例化SpringBootExceptionReporter.class，用来支持报告关于启动的错误**
- **第五步：准备容器**
- **第六步：刷新容器**
- **第七步：刷新容器后的扩展接口**



```java
	/**
	 * Run the Spring application, creating and refreshing a new
	 * {@link ApplicationContext}.
	 * @param args the application arguments (usually passed from a Java main method)
	 * @return a running {@link ApplicationContext}
	 */
	public ConfigurableApplicationContext run(String... args) {
        // 创建一个StopWatch 
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		ConfigurableApplicationContext context = null;
		Collection<SpringBootExceptionReporter> exceptionReporters = new ArrayList<>();
		// 配置HeadLess环境
        configureHeadlessProperty();
        // 和 ApplicationContextInitializer & ApplicationListener一样，生成对象 SpringApplicationRunListener
        // Spring应用运行回调监听器，会在Spring应用不同的声明周期执行相应的方法， 并且运行他们的starting方法
		SpringApplicationRunListeners listeners = getRunListeners(args);
		listeners.starting();
		try {
			ApplicationArguments applicationArguments = new DefaultApplicationArguments(args);
			ConfigurableEnvironment environment = prepareEnvironment(listeners, applicationArguments);
			configureIgnoreBeanInfo(environment);
			Banner printedBanner = printBanner(environment);
			context = createApplicationContext();
			exceptionReporters = getSpringFactoriesInstances(SpringBootExceptionReporter.class,
					new Class[] { ConfigurableApplicationContext.class }, context);
			prepareContext(context, environment, listeners, applicationArguments, printedBanner);
			refreshContext(context);
			afterRefresh(context, applicationArguments);
			stopWatch.stop();
			if (this.logStartupInfo) {
				new StartupInfoLogger(this.mainApplicationClass).logStarted(getApplicationLog(), stopWatch);
			}
			listeners.started(context);
			callRunners(context, applicationArguments);
		}
		catch (Throwable ex) {
			handleRunFailure(context, ex, exceptionReporters, listeners);
			throw new IllegalStateException(ex);
		}

		try {
			listeners.running(context);
		}
		catch (Throwable ex) {
			handleRunFailure(context, ex, exceptionReporters, null);
			throw new IllegalStateException(ex);
		}
		return context;
	}
```


##### ConfigurableApplicationContext context = null;
> 一个SpringBoot上下文提供了一下功能
> - [x]  Bean factory methods for accessing application components. Inherited from ListableBeanFactory.
> - [x]  The ability to load file resources in a generic fashion. Inherited from the org.springframework.core.io.ResourceLoader interface.
> - [x]  The ability to publish events to registered listeners. Inherited from the ApplicationEventPublisher interface.
> - [x]  The ability to resolve messages, supporting internationalization. Inherited from the MessageSource interface.
> - [x]  Inheritance from a parent context. Definitions in a descendant context will always take priority. This means, for example, that a single parent context can be used by an entire web application, while each servlet has its own child context that is independent of that of any other servlet

```java
public interface ApplicationContext extends EnvironmentCapable, ListableBeanFactory, HierarchicalBeanFactory,
		MessageSource, ApplicationEventPublisher, ResourcePatternResolver {
        // ....
        }
```


##### SpringApplicationRunListeners listeners = getRunListeners(args);
> SpringApplicationRunListeners 对象内部是众多 SpringApplicationRunListener 对象，当调用其starting方法的会后，会使用 EventPublishingRunListener 发送SpringApplicationEvent 

```java
	@Override
	public void starting() {
		this.initialMulticaster.multicastEvent(new ApplicationStartingEvent(this.application, this.args));
	}


// 其中ApplicationStartingEvent的定义如下
@SuppressWarnings("serial")
public class ApplicationStartingEvent extends SpringApplicationEvent {

	/**
	 * Create a new {@link ApplicationStartingEvent} instance.
	 * @param application the current application
	 * @param args the arguments the application is running with
	 */
	public ApplicationStartingEvent(SpringApplication application, String[] args) {
		super(application, args);
	}

}

```


> 实际上，SpringApplicationEvent 有众多的实现类，分别对应了不同的SpringApplication的生命周期事件。
> ![image.png](https://cdn.nlark.com/yuque/0/2020/png/437981/1588349210908-fad61318-987d-4321-8f8f-6a7d43879f4e.png#align=left&display=inline&height=206&margin=%5Bobject%20Object%5D&name=image.png&originHeight=412&originWidth=1204&size=130275&status=done&style=none&width=602)






##### ApplicationArguments applicationArguments = new DefaultApplicationArguments(args);
> 这里构造了应用参数对象，使用的默认JVM参数，记录了应用的激活的profile以及应用的配置源信息





##### ConfigurableEnvironment environment = prepareEnvironment(listeners, applicationArguments);
> - 创建一个可配置的环境对象，环境是Spring中非常重要的一个组件，代表着当前应用正在运行的环境
> - 传递 listeners 是为了触发SpringApplicationEvent事件，即上图的第二个实现，ApplicationEnvironmentPreparedEvent

```java
	private ConfigurableEnvironment prepareEnvironment(SpringApplicationRunListeners listeners,
			ApplicationArguments applicationArguments) {
		// 创建并配置一个环境，根据不同的应用类型来配置
		ConfigurableEnvironment environment = getOrCreateEnvironment();
		configureEnvironment(environment, applicationArguments.getSourceArgs());
		ConfigurationPropertySources.attach(environment);
		listeners.environmentPrepared(environment);
		bindToSpringApplication(environment);
		if (!this.isCustomEnvironment) {
			environment = new EnvironmentConverter(getClassLoader()).convertEnvironmentIfNecessary(environment,
					deduceEnvironmentClass());
		}
		ConfigurationPropertySources.attach(environment);
		return environment;
	}
```


##### Banner printedBanner = printBanner(environment);
> - 打印输出Banner的信息
> - 根据 bannerMode (默认值： **CONSOLE **) 来调用不同的流程来处理日志信息

```java
	private Banner printBanner(ConfigurableEnvironment environment) {
		if (this.bannerMode == Banner.Mode.OFF) {
			return null;
		}
		ResourceLoader resourceLoader = (this.resourceLoader != null) ? this.resourceLoader
				: new DefaultResourceLoader(getClassLoader());
		SpringApplicationBannerPrinter bannerPrinter = new SpringApplicationBannerPrinter(resourceLoader, this.banner);
		if (this.bannerMode == Mode.LOG) {
			return bannerPrinter.print(environment, this.mainApplicationClass, logger);
		}
		return bannerPrinter.print(environment, this.mainApplicationClass, System.out);
	}


	// 默认的banner的文件名称
	public class SpringApplicationBannerPrinter{
		static final String DEFAULT_BANNER_LOCATION = "banner.txt";
        
        //.....
    }

	// 获取Banner的过程，返回的默认Banner DEFAULT_BANNER 则就是 SpringBootBanner 
	private Banner getBanner(Environment environment) {
		Banners banners = new Banners();
		banners.addIfNotNull(getImageBanner(environment));
		banners.addIfNotNull(getTextBanner(environment));
		if (banners.hasAtLeastOneBanner()) {
			return banners;
		}
		if (this.fallbackBanner != null) {
			return this.fallbackBanner;
		}
		return DEFAULT_BANNER;
	}

```


在代码执行完成之后，控制台会输出
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.2.6.RELEASE)
```
## 
## 常用的接口声明

- [x]   ApplicationListener 应用监听器 监听Spring应用的各种事件
```java
 @FunctionalInterface
public interface ApplicationListener<E extends ApplicationEvent> extends EventListener {

	/**
	 * Handle an application event.
	 * @param event the event to respond to
	 */
	void onApplicationEvent(E event);

}
```

- [x]   ApplicationContextInitializer 应用上下文初始化
```java
public interface ApplicationContextInitializer<C extends ConfigurableApplicationContext> {

	/**
	 * Initialize the given application context.
	 * @param applicationContext the application to configure
	 */
	void initialize(C applicationContext);

}
```

- [x]  SpringApplicationRunListener Spring应用运行周期的先关回调
```java
public interface SpringApplicationRunListener {

	// 早起初始化的时候启动
	default void starting() {
	}

	// 当环境信息准备好的时候执行一次    
	default void environmentPrepared(ConfigurableEnvironment environment) {
	}

	// 调用一次，当应用上下文被创建并且准备好，但信息被在载入之前执行    
	default void contextPrepared(ConfigurableApplicationContext context) {
	}

    // 当应用上下文加载完成，并在refreshed之前调用
	default void contextLoaded(ConfigurableApplicationContext context) {
	}
    
    // 上下文加载并刷新完成已经started，但 CommandLineRunners &  ApplicationRunner 未被调用之前
	default void started(ConfigurableApplicationContext context) {
	}

    // 上下文被加载之前并且CommandLineRunners &  ApplicationRunner 被调用之后
	default void running(ConfigurableApplicationContext context) {
	}

	default void failed(ConfigurableApplicationContext context, Throwable exception) {
	}

}

```
