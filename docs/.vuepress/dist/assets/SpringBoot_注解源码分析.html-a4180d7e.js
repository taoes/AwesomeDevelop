import{_ as n,o as s,c as a,e as t}from"./app-d035ab8f.js";const e={},p=t(`<h1 id="springboot-注解源码分析" tabindex="-1"><a class="header-anchor" href="#springboot-注解源码分析" aria-hidden="true">#</a> SpringBoot 注解源码分析</h1><p><a href="#">@SpringBootApplication</a> 注解式标注一个SpringBoot应用的标志，比如下面的代码就可以正常的启动一个非常简单的SpringBoot应用</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringbootApplication</span> <span class="token punctuation">{</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SpringbootApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
      
    <span class="token comment">// 或者下面的这种方法</span>
    <span class="token class-name">SpringApplication</span> application <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SpringApplication</span><span class="token punctuation">(</span><span class="token class-name">SpringbootApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    application<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="springbootapplication" tabindex="-1"><a class="header-anchor" href="#springbootapplication" aria-hidden="true">#</a> SpringBootApplication</h2><p><a href="#">@SpringBootApplicaiton</a>源码如下:</p><ul><li>标识出一个配置类，声明一个或者多个Bean的方法，同时触发启用自动配置以及组件扫描</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**标识出一个配置类，声明一个或者多个Bean的方法，同时触发启用自动配置以及组件扫描 */</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Inherited</span>
<span class="token annotation punctuation">@SpringBootConfiguration</span>
<span class="token annotation punctuation">@EnableAutoConfiguration</span>
<span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span>excludeFilters <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token annotation punctuation">@Filter</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">FilterType</span><span class="token punctuation">.</span><span class="token constant">CUSTOM</span><span class="token punctuation">,</span> classes <span class="token operator">=</span> <span class="token class-name">TypeExcludeFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token annotation punctuation">@Filter</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">FilterType</span><span class="token punctuation">.</span><span class="token constant">CUSTOM</span><span class="token punctuation">,</span> classes <span class="token operator">=</span> <span class="token class-name">AutoConfigurationExcludeFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">SpringBootApplication</span> <span class="token punctuation">{</span><span class="token comment">//...}</span>

<span class="token doc-comment comment">/*** 标识提供了SpringBoot的配置功能*/</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token comment">// 标识一个类具有多个Bean方法，这些方法可以被Spring容器定义，使用</span>
<span class="token annotation punctuation">@Configuration</span> 
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">SpringBootConfiguration</span> <span class="token punctuation">{</span><span class="token comment">//...}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration" aria-hidden="true">#</a> Configuration</h2><p>注解Configuration 是一个非常重要的注解，他标识了的类的Bean对象会被Spring容器管理，具有非常多的应用场景，下面展示常用的示例</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/* Indicates that a class declares one or more @Bean methods and may be processed by the Spring container
to generate bean definitions and service requests for those beans at runtime, for example:
标识一个类具有多个Bean的方法，这些Bean 可以被Spring容器来定义BeanDefined以及使用
*/</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Configuration</span> <span class="token punctuation">{</span><span class="token comment">//...}        </span>
    

    
<span class="token comment">// 比如下面的形式</span>
   <span class="token annotation punctuation">@Configuration</span>
   <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppConfig</span> <span class="token punctuation">{</span>
       <span class="token annotation punctuation">@Bean</span>
       <span class="token keyword">public</span> <span class="token class-name">MyBean</span> <span class="token function">myBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token comment">// instantiate, configure and return bean ...</span>
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>

<span class="token comment">/*
Bootstrapping @Configuration classes Via AnnotationConfigApplicationContext
@Configuration classes are typically bootstrapped using either  AnnotationConfigApplicationContext or its web-capable variant,
AnnotationConfigWebApplicationContext. A simple example with the former follows:
*/</span>
  
<span class="token comment">//下面的示例展示了通过 AnnotationConfigApplicationContext 从@Configuration 标记的注解的类中获取Bean对象</span>
   <span class="token class-name">AnnotationConfigApplicationContext</span> ctx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AnnotationConfigApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   ctx<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token class-name">AppConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   ctx<span class="token punctuation">.</span><span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token class-name">MyBean</span> myBean <span class="token operator">=</span> ctx<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">MyBean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">// use myBean ...</span>
   
   
<span class="token comment">// 也可以充分的应用@Autwired或者@Injec, 构造方法等方式来注入其他的bean.</span>
   <span class="token annotation punctuation">@Configuration</span>
   <span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span><span class="token string">&quot;com.zhoutao123.app.services&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 配置到哪里扫描需要Bean</span>
   <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppConfig</span> <span class="token punctuation">{</span>
  
       <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">SomeBean</span> someBean<span class="token punctuation">;</span>
  
       <span class="token keyword">public</span> <span class="token class-name">AppConfig</span><span class="token punctuation">(</span><span class="token class-name">SomeBean</span> someBean<span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token keyword">this</span><span class="token punctuation">.</span>someBean <span class="token operator">=</span> someBean<span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
 
       <span class="token comment">// @Bean definition using &quot;SomeBean&quot;</span>
  
   <span class="token punctuation">}</span>
   
 <span class="token comment">// 也可以从   Environment 中获取环境变量值 </span>
   <span class="token annotation punctuation">@Configuration</span>
   <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppConfig</span> <span class="token punctuation">{</span>
  
       <span class="token annotation punctuation">@Autowired</span> <span class="token class-name">Environment</span> env<span class="token punctuation">;</span>
  
       <span class="token annotation punctuation">@Bean</span>
       <span class="token keyword">public</span> <span class="token class-name">MyBean</span> <span class="token function">myBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token class-name">MyBean</span> myBean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
           myBean<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;bean.name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
           <span class="token keyword">return</span> myBean<span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>

 <span class="token comment">// 甚至可以指定Properties元数据 然后从中获取环境变量值</span>
   <span class="token annotation punctuation">@Configuration</span>
   <span class="token annotation punctuation">@PropertySource</span><span class="token punctuation">(</span><span class="token string">&quot;classpath:/com/zhoutao123/app.properties&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppConfig</span> <span class="token punctuation">{</span>
  
       <span class="token annotation punctuation">@Inject</span> <span class="token class-name">Environment</span> env<span class="token punctuation">;</span>
  
       <span class="token annotation punctuation">@Bean</span>
       <span class="token keyword">public</span> <span class="token class-name">MyBean</span> <span class="token function">myBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MyBean</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;bean.name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
    
<span class="token comment">// 当然也可以使用@Value注解，没有PropertySource，会从SpringBoot的默认配置文件注入</span>
   <span class="token annotation punctuation">@Configuration</span>
   <span class="token annotation punctuation">@PropertySource</span><span class="token punctuation">(</span><span class="token string">&quot;classpath:/com/zhoutao123/app.properties&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppConfig</span> <span class="token punctuation">{</span>
  
       <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${bean.name}&quot;</span><span class="token punctuation">)</span> 
       <span class="token class-name">String</span> beanName<span class="token punctuation">;</span>
  
       <span class="token annotation punctuation">@Bean</span>
       <span class="token keyword">public</span> <span class="token class-name">MyBean</span> <span class="token function">myBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MyBean</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
   
   
<span class="token comment">// 使用 @Import 注入其他Config，由于其他@Configuration 对象是被Spring 容器管理的，因此其可以注入到AppConfig对象中</span>


   <span class="token annotation punctuation">@Configuration</span>
   <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DatabaseConfig</span> <span class="token punctuation">{</span>
  
       <span class="token annotation punctuation">@Bean</span>
       <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token comment">// instantiate, configure and return DataSource</span>
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
  
   <span class="token annotation punctuation">@Configuration</span>
   <span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">DatabaseConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
   <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppConfig</span> <span class="token punctuation">{</span>
  
       <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">DatabaseConfig</span> dataConfig<span class="token punctuation">;</span>
  
       <span class="token keyword">public</span> <span class="token class-name">AppConfig</span><span class="token punctuation">(</span><span class="token class-name">DatabaseConfig</span> dataConfig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token keyword">this</span><span class="token punctuation">.</span>dataConfig <span class="token operator">=</span> dataConfig<span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
  
       <span class="token annotation punctuation">@Bean</span>
       <span class="token keyword">public</span> <span class="token class-name">MyBean</span> <span class="token function">myBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token comment">// reference the dataSource() bean method</span>
           <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MyBean</span><span class="token punctuation">(</span>dataConfig<span class="token punctuation">.</span><span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
  
    
<span class="token comment">//还有其他的使用场景，更多情况这里不再过多的赘述，可以参考文件  org.springframework.context.annotation.Configuration    </span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Configuration classes must be provided as classes (i.e. not as instances returned from factory methods), allowing for runtime enhancements through a generated subclass. 必须是一个类</li><li>Configuration classes must be non-final (allowing for subclasses at runtime), unless the proxyBeanMethods flag is set to false in which case no runtime-generated subclass is necessary. 此类必须不是final修饰的</li><li>Configuration classes must be non-local (i.e. may not be declared within a method). 配置类必须不是</li><li>Any nested configuration classes must be declared as static. 嵌套的内部类必须是静态的</li><li>@Bean methods may not in turn create further configuration classes (any such instances will be treated as regular beans, with their configuration annotations remaining undetected).  Bean方法修饰的并不是further类型的配置类</li></ul>`,11),o=[p];function i(c,l){return s(),a("div",null,o)}const r=n(e,[["render",i],["__file","SpringBoot_注解源码分析.html.vue"]]);export{r as default};
