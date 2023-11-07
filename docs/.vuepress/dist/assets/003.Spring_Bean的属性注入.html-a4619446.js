import{_ as n,o as s,c as a,e}from"./app-d035ab8f.js";const t={},p=e(`<h1 id="spring-bean的属性注入" tabindex="-1"><a class="header-anchor" href="#spring-bean的属性注入" aria-hidden="true">#</a> Spring Bean的属性注入</h1><nav class="table-of-contents"><ul></ul></nav><p>在Spring的工作开发中，我们经常使用的是 <code>@Value</code> 注解，来实现bean的属性注入，使用@Value注解总计有三种方式来注入值：</p><ol><li>直接赋值</li><li>EL表达式</li><li>Properties配置</li></ol><p>下面的代码展示了，这三种方式的使用示例</p><ol><li>为了延时Properties的使用，这里需要创建一个简单的 <code>.properties</code> 配置文件，放置于resources目录下</li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>person.nickName=燕归来兮
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>在配置类上注入对象，添加Properties源类,注意，如果出现中文 乱码，可以使用 <code>encoding = &quot;UTF-8&quot;</code> 的形式指定编码</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@PropertySource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;classpath:/person.properties&quot;</span><span class="token punctuation">,</span>encoding <span class="token operator">=</span> <span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>创建一个Bean对象，下面以Person为演示对象，展示三种方式的使用</li></ol><blockquote><p>Person对象暂时未实现setter/getter 方法，请手动添加这些属性的的setter/getter方法</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>

  <span class="token comment">// 注入方式: Properties 注入</span>
  <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${person.name}&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

  <span class="token comment">// 注入方式: Properties 注入    </span>
  <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${person.nickName}&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> nickName<span class="token punctuation">;</span>

  <span class="token comment">// 注入方式: EL 表达式注入</span>
  <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;#{18 + 8 * 2 -9}&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>

  <span class="token comment">// 注入方式: 直接注入</span>
  <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;安徽省芜湖市&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> address<span class="token punctuation">;</span>
    
  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Person{&quot;</span> <span class="token operator">+</span>
        <span class="token string">&quot;name=&#39;&quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
        <span class="token string">&quot;, nickName=&#39;&quot;</span> <span class="token operator">+</span> nickName <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
        <span class="token string">&quot;, age=&quot;</span> <span class="token operator">+</span> age <span class="token operator">+</span>
        <span class="token string">&quot;, address=&#39;&quot;</span> <span class="token operator">+</span> address <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
        <span class="token char">&#39;}&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>新增一个测试类</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AnnotationConfigClassPath</span> <span class="token punctuation">{</span>

  <span class="token class-name">AnnotationConfigApplicationContext</span> context<span class="token punctuation">;</span>

  <span class="token annotation punctuation">@Before</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 指定配置类</span>
    context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AnnotationConfigApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">MainConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token annotation punctuation">@Test</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">initComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 输出注入的值</span>
    <span class="token class-name">Person</span> bean <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>bean<span class="token punctuation">)</span><span class="token punctuation">;</span>
      
    <span class="token comment">// 从上下文环境中获取配置</span>
    <span class="token class-name">String</span> property <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;person.nickName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Value = &quot;</span> <span class="token operator">+</span> property<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Person{name=&#39;123&#39;, nickName=&#39;燕归来兮&#39;, age=25, address=&#39;安徽省芜湖市&#39;}
Value = 燕归来兮
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,16),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","003.Spring_Bean的属性注入.html.vue"]]);export{r as default};
