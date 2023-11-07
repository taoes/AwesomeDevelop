import{_ as n,o as s,c as a,e}from"./app-d035ab8f.js";const t="/assets/ApplicationListener-a8e66e1d.png",p="/assets/applicationListenerEvent架构图-a251e081.png",i="/assets/applicationEvent发送顺序-048440d1.png",c={},l=e('<h1 id="applicationlistener" tabindex="-1"><a class="header-anchor" href="#applicationlistener" aria-hidden="true">#</a> ApplicationListener</h1><p>SpringBoot 提供了各种各样的时间监听器( _ApplicationListener 的子类 _)，用来订阅SpringBoot在运行阶段的各种事件，整体的这种方式实现的逻辑图如下图:</p><p><img src="'+t+`" alt="image.png"></p><h2 id="事件监听器-applicationlistener" tabindex="-1"><a class="header-anchor" href="#事件监听器-applicationlistener" aria-hidden="true">#</a> 事件监听器 ApplicationListener</h2><p>这个接口是应用的事件的监听器，基于观察者模式实现，从Spring3.0开始，当监听器在Spring上下文注册后， 在Spring的某些阶段出现发出事件的时候，将会执行指定的方法。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ApplicationListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span> <span class="token keyword">extends</span> <span class="token class-name">ApplicationEvent</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">extends</span> <span class="token class-name">EventListener</span> <span class="token punctuation">{</span>

	<span class="token doc-comment comment">/**
	 * 处理一个应用事件
	 * <span class="token keyword">@param</span> <span class="token parameter">event</span> the event to respond to
	 */</span>
	<span class="token keyword">void</span> <span class="token function">onApplicationEvent</span><span class="token punctuation">(</span><span class="token class-name">E</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多路广播器-applicationeventmulticaster" tabindex="-1"><a class="header-anchor" href="#多路广播器-applicationeventmulticaster" aria-hidden="true">#</a> 多路广播器 ApplicationEventMulticaster</h2><p>同时，Spring 提供了 _ApplicationEventMulticaster _应用事件广播器，主要用于管理事件监听器和事件的发送。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ApplicationEventMulticaster</span> <span class="token punctuation">{</span>
    
    <span class="token comment">// 新增事件监听器</span>
	<span class="token keyword">void</span> <span class="token function">addApplicationListener</span><span class="token punctuation">(</span><span class="token class-name">ApplicationListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> listener<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 新增事件监听器</span>
	<span class="token keyword">void</span> <span class="token function">addApplicationListenerBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> listenerBeanName<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 移除事件监听器</span>
	<span class="token keyword">void</span> <span class="token function">removeApplicationListener</span><span class="token punctuation">(</span><span class="token class-name">ApplicationListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> listener<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 移除事件监听器	</span>
	<span class="token keyword">void</span> <span class="token function">removeApplicationListenerBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> listenerBeanName<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 移除全部事件监听器</span>
	<span class="token keyword">void</span> <span class="token function">removeAllListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 发送应用事件</span>
	<span class="token keyword">void</span> <span class="token function">multicastEvent</span><span class="token punctuation">(</span><span class="token class-name">ApplicationEvent</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 发送应用事件</span>
	<span class="token keyword">void</span> <span class="token function">multicastEvent</span><span class="token punctuation">(</span><span class="token class-name">ApplicationEvent</span> event<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">ResolvableType</span> eventType<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事件消息-applicationevent" tabindex="-1"><a class="header-anchor" href="#事件消息-applicationevent" aria-hidden="true">#</a> 事件消息 ApplicationEvent</h2><p>Spring 提供了Application类，并内置一些Spring的应用事件，如果需要定义领域事件，则需要继承 ApplicationEvent。SpringBoot 内置的SpringApplicationEvent如下图所示。</p><p><img src="`+p+'" alt="image.png"></p><p>SpringBoot 的事件发送时还有一定顺序，会按照SpringBoot的启动顺序发送：</p><p><img src="'+i+'" alt="image.png">)</p>',14),o=[l];function r(d,u){return s(),a("div",null,o)}const k=n(c,[["render",r],["__file","ApplicationListener.html.vue"]]);export{k as default};
