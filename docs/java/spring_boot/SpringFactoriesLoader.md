# SpringFactoriesLoader

SpringFactoriesLoader 是Spring提供的通用的加载 classPath目录下的各个JAR包中的META-INF目录下的 `spring.factories` 文件的工具，该文件的格式应该符合properties的文件的格式，如果多个值可以通过逗号分割 比如 **example.MyService=example.MyServiceImpl1,example.MyServiceImpl2**_, _全类名为 `org.springframework.core.io.support.SpringFactoriesLoader`  


总结来说，如下:

- [x]  框架内部使用的通用工厂加载机制
- [x] 从ClassPath目录下读取多个JAR报的指定文件
- [x] 文件内容必须是KV，即properties格式
- [x] key是全限定名(抽象类或者接口)，value是实现方式, 多个实现，使用逗号分割 





其主要流程为:


![](https://cdn.nlark.com/yuque/__puml/80d0547a1e1ba2aa285c072a92e67a4d.svg#lake_card_v2=eyJjb2RlIjoiQHN0YXJ0dW1sXG5cbnRpdGxlIFNwcmluZ0ZhY3Rvcmllc0xvYWRlciDliqDovb3mnLrliLZcXG5cbiBcbjpzdGFydDtcbjrmn6Xor6LnvJPlrZg7XG5pZiAo57yT5a2Y5a2Y5ZyoPykgdGhlbiAo5a2Y5ZyoKVxuICA66L-U5Zue57yT5a2Y55qE57uT5p6cO1xuICBzdG9wXG5lbHNlICjkuI3lrZjlnKgpXG4gIDror7vlj5ZKQVLmlofku7bnmoTotYTmupDmlofku7Y7XG4gIDrmnoTpgKBQcm9wZXJ0aWVz6LWE5rqQO1xuICA66K-75Y-WVmFsdWXvvIzlrZjlnKjlpJrkuKrmjInpgJflj7fliIblibI7XG4gIDrkv53lrZjnu5PmnpzliLDnvJPlrZg7XG4gIDrku6XmraTlrp7kvovljJbvvIzlubbmjInnhadPcmRlcuaOkuW6jztcbiAgOui_lOWbnuWunuS-i-WMluWvueixoee7k-aenDtcblxuOuWKoOi9vXNwcmluZy5mYWN0b3JpZXMg57uT5p2fO1xuc3RvcFxuQGVuZHVtbFxuIiwidHlwZSI6InB1bWwiLCJtYXJnaW4iOnRydWUsImlkIjoiekM4MkYiLCJ1cmwiOiJodHRwczovL2Nkbi5ubGFyay5jb20veXVxdWUvX19wdW1sLzgwZDA1NDdhMWUxYmEyYWEyODVjMDcyYTkyZTY3YTRkLnN2ZyIsImhlaWdodCI6NDgwLCJjYXJkIjoiZGlhZ3JhbSJ9)

```java
	public static final String FACTORIES_RESOURCE_LOCATION = "META-INF/spring.factories";	

	public static List<String> loadFactoryNames(Class<?> factoryType, @Nullable ClassLoader classLoader) {
		String factoryTypeName = factoryType.getName();
		// 根据factorynName文件名过滤出Value信息
        return loadSpringFactories(classLoader).getOrDefault(factoryTypeName, Collections.emptyList());
	}
	
	// 查找spring.factories 文件对象信息
	private static Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader) {
		MultiValueMap<String, String> result = cache.get(classLoader);
		if (result != null) {
			return result;
		}

		try {
            // 查询目录下的spring.factories 文件路径信息
            
			Enumeration<URL> urls = (classLoader != null ?
					classLoader.getResources(FACTORIES_RESOURCE_LOCATION) :
					ClassLoader.getSystemResources(FACTORIES_RESOURCE_LOCATION));
			result = new LinkedMultiValueMap<>();
			while (urls.hasMoreElements()) {
				URL url = urls.nextElement();
				UrlResource resource = new UrlResource(url);
                // 构造Properties
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
```


比如SpringBoot应用获取ApplicationContextInitializer的实例就使用如下的代码：


```java
 	getSpringFactoriesInstances(ApplicationContextInitializer.class);

	private <T> Collection<T> getSpringFactoriesInstances(Class<T> type, Class<?>[] parameterTypes, Object... args) {
		ClassLoader classLoader = getClassLoader();
		// 获取实现的类限定名
		Set<String> names = new LinkedHashSet<>(SpringFactoriesLoader.loadFactoryNames(type, classLoader));
		// 实例化对象
        List<T> instances = createSpringFactoriesInstances(type, parameterTypes, classLoader, args, names);
		AnnotationAwareOrderComparator.sort(instances);
		return instances;
	}
```
