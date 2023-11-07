从 Java 8 引入的一个很有趣的特性是 _Optional  _类，Optional 类主要解决的问题是NPE。他使用以一些API可以很好的帮助我们避免空指针的出现，大大提高了代码的可阅读性。Optional 的出现被广大程序员朋友非常欢迎，尽管这个类并不复杂，但它带来的效果却是非常明显的。

<a name="JD1wN"></a>
## 为什么Optional 这么受欢迎？

<br />分析下面的代码，给定学生列表，统计所有学生的姓名字符串长度总和，常规的代码写法如下:<br />

```java
    for (Student student : studentList) {
      if (student != null) {
        String name = student.getName();
        if (name != null) {
          length += name.length();
        }
      }
    }
```
相信每个朋友都非常的清楚这些代码，这里不做过多的阐述，但是相信每个人看到这个代码都会大呼头疼，流程复杂，代码结构不清晰，控制层逻辑嵌套，如果使用Optional效果会怎么样呢？<br />

```java
    for (Student student : studentList) {
      length += Optional.ofNullable(student)
          .map(Student::getName)
          .map(String::length)
          .orElse(0);
    }
```

<br />显然，使用Optional大大减少了代码，提高了代码的可阅读性，这就是Optional的受欢迎的原因。<br />

<a name="x2dUV"></a>
## 相关 API
> Optional的相关API源码比较简单，这里不做过多的赘述，有疑问的读者可以随时留言



<a name="g1dkH"></a>
### Optional.isPresent()
> 如果引用的value不为空，则返回true,一般用户判断是否计算完成并且没有出现NPE

```java
public boolean isPresent() {
        return value != null;
    }
```


<a name="2s3Hp"></a>
### Optional.of(T t)
> 构造一个Optional的对象，标识t元素不可能为null，但是t的子属性可能为null；

```java
    public static <T> Optional<T> of(T value) {
        return new Optional<>(value);
    }
```


<a name="FqW3p"></a>
### Optional.empty()
> 返回一个空的Optional的对象

```java
    public static<T> Optional<T> empty() {
        @SuppressWarnings("unchecked")
        Optional<T> t = (Optional<T>) EMPTY;
        return t;
    }
```
<br />
<a name="HTjIG"></a>
### Optional.ofNullable()
> 返回一个值可能为Null的值的Optional，如果值为null，将返回Optional.empty();
> 

```java
    public static <T> Optional<T> ofNullable(T value) {
        return value == null ? empty() : of(value);
    }
```
<br />
<a name="EiZXJ"></a>
### Optional.map(Function? super T, ? extends U)
_
> _如果值存在，就应用提供的函数，如果函数的值也不为null，就返回这个结果的引用，否则返回Optional.empty()_
> _  _

```java
    public<U> Optional<U> map(Function<? super T, ? extends U> mapper) {
        Objects.requireNonNull(mapper);
        if (!isPresent())
            return empty();
        else {
            return Optional.ofNullable(mapper.apply(value));
        }
    }
```
<br />
<a name="vxzeF"></a>
### Optional.else(T other)
> _如value不为null，则返回value，否则返回other_

```java
    public T orElse(T other) {
        return value != null ? value : other;
    }
```
_
<a name="3pEZF"></a>
### Optional.elseGet(Supplier<? extend T> supplier)
> _如value不为null，则返回value，否则执行supplier方法返回执行结果_

```java
    public T orElseGet(Supplier<? extends T> other) {
        return value != null ? value : other.get();
    }
```
<a name="vjRaR"></a>
### public T orElseThrow(Supplier<? extends X> e)
> 如果value == null，则抛出e执行结果（其执行结果是一个Exception 的子类，由具体的函数定义） 

```java
    public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X {
        if (value != null) {
            return value;
        } else {
            throw exceptionSupplier.get();
        }
    }
```


