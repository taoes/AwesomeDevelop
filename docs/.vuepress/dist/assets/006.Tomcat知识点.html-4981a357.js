import{_ as n,o as s,c as a,e}from"./app-d035ab8f.js";const t={},l=e(`<h2 id="tomcat的运行方式" tabindex="-1"><a class="header-anchor" href="#tomcat的运行方式" aria-hidden="true">#</a> Tomcat的运行方式</h2><ol><li>bio(blocking I/O)</li><li>nio(non-blocking I/O)</li><li>apr(Apache Portable Runtime/Apache可移植运行库)</li></ol><h2 id="servlet" tabindex="-1"><a class="header-anchor" href="#servlet" aria-hidden="true">#</a> Servlet</h2><ul><li>HttpServletRequest：封装了与请求相关的信息</li><li>HttpServletResponse：封装了与响应相关的信息</li></ul><h3 id="servlet-的生命周期" tabindex="-1"><a class="header-anchor" href="#servlet-的生命周期" aria-hidden="true">#</a> Servlet 的生命周期</h3><ol><li>加载Servlet: 当Tomcat第一次访问Servlet的时候，Tomcat会负责创建Servlet的实例</li><li>初始化: 当Servlet被实例化后，Tomcat会调用init()方法初始化这个对象</li><li>处理服务: 当浏览器访问Servlet的时候，Servlet 会调用service()方法处理请求</li><li>销毁: 当Tomcat关闭时或者检测到Servlet要从Tomcat删除的时候会自动调用destroy()方法，让该实例释放掉所占的资源,一个Servlet如果长时间不被使用的话，也会被Tomcat自动销毁</li><li>卸载: 当Servlet调用完destroy()方法后，等待垃圾回收。如果有需要再次使用这个Servlet，会重新调用init()方法进行初始化操作。</li></ol><blockquote><p>简单总结：只要访问Servlet，service()就会被调用。init()只有第一次访问Servlet的时候才会被调用。destroy()只有在Tomcat关闭的时候才会被调用</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MyServlet</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * Servlet 第被初始化的时候调用或者第一次访问时候执行
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>具体和值<span class="token punctuation">{</span><span class="token keyword">@code</span>  <span class="token code-section"><span class="token code language-java">load<span class="token operator">-</span>on<span class="token operator">-</span>startup</span></span><span class="token punctuation">}</span> 有关系&lt;/&gt;
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Servlet 被销毁的时候调用
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Service 负责根据请求方式分发到 doGet/doPost/doDelete/doOptions
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">service</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> req<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> resp<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">service</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> resp<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tomcat调优" tabindex="-1"><a class="header-anchor" href="#tomcat调优" aria-hidden="true">#</a> Tomcat调优</h3><ul><li>线程池优化</li></ul><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code>maxThreads：tomcat处理请求的最大线程数500
minSpareThreads：最小空闲线程数
maxSpaceThreads：最大备用线程数，tomcat创建的线程数超过50，便会关闭不在需要的socket。
maxIdelTime：当线程空闲时间超过这个时间点，就会关闭线程。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),c=[l];function i(o,p){return s(),a("div",null,c)}const d=n(t,[["render",i],["__file","006.Tomcat知识点.html.vue"]]);export{d as default};
