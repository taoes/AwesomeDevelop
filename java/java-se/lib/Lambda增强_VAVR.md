众所周知，JDK8+ 提供的 Lambda 表达式和流Stream。受限于 Java 标准库的通用性要求和二进制文件大小，Java 标准库对函数式编程的 API 支持相对比较有限。函数的声明只提供了 Function 和 BiFunction 两种，流上所支持的操作的数量也较少。为了更好地进行函数式编程，我们需要第三方库的支持。Vavr 是 Java 平台上函数式编程库中的佼佼者。

Vavr的官方地址 [https://www.vavr.io/](https://www.vavr.io/) 声明中说明_**Vavr**** is an object-functional library for Java 8+. **_可见VAVR 是专门对Java8+ 支持的函数式编程库。

<a name="SPFjO"></a>
## 1、数据结构
<a name="IRFju"></a>
### 1.1 集合与Stream

<br />Vavr 提供了多种数据结构，用于对JDK的补充，下面将会展示Vavr的各个数据结构<br />
<br />
<br />Vavr 重新在 Iterable 的基础上实现了自己的集合框架。Vavr 的集合框架侧重在不可变上。Vavr 的集合类在使用上比 Java 流更简洁。Vavr 的 Stream 提供了比 Java 中 Stream 更多的操作。可以使用 `Stream.ofAll` 从 Iterable 对象中创建出 Vavr 的 Stream。下面是一些 Vavr 中添加的实用操作：<br />

- `groupBy`：使用 Fuction 对元素进行分组。结果是一个 Map，Map 的键是分组的函数的结果，而值则是包含了同一组中全部元素的 Stream。
- `partition`：使用 Predicate 对元素进行分组。结果是包含 2 个 Stream 的 Tuple2。Tuple2 的第一个 Stream 的元素满足 Predicate 所指定的条件，第二个 Stream 的元素不满足 Predicate 所指定的条件。
- `scanLeft` 和 `scanRight`：分别按照从左到右或从右到左的顺序在元素上调用 Function，并累积结果。
- `zip`：把 Stream 和一个 Iterable 对象合并起来，返回的结果 Stream 中包含 Tuple2 对象。Tuple2 对象的两个元素分别来自 Stream 和 Iterable 对象。



```java
 List<Integer> integers = List.of(1, 2, 3, 4, 5, 6);
    // 直接支持Stream [2,4,6]
    integers.filter(i -> i % 2 == 0).toJavaList();

    // 第一个集合元素符合条件，第二个条件不符合 ([2,4,6],[1,3,5])
    integers.partition(i -> i % 2 == 0).map(Value::toList, Value::toList);

    // Group
    List<Integer> numberList = List.range(1, 10);
    Map<Boolean, java.util.List<Integer>> listMap =
        numberList.groupBy(v -> v % 2 == 0).mapValues(Value::toJavaList);

    // Filter
    java.util.List<Integer> javaList = numberList.filter(num -> num % 3 == 0).toJavaList();
```

<br />
<br />Vavr 提供了常用的数据结构的实现，包括 List、Set、Map、Seq、Queue、Tree 和 TreeMap 等。这些数据结构的用法与 Java 标准库的对应实现是相似的，但是提供的操作更多，使用起来也更方便。

<a name="0e08e843"></a>
### 1.2、模式匹配
在 Java 中，我们可以使用 switch 和 case 来根据值的不同来执行不同的逻辑。不过 switch 和 case 提供的功能很弱，只能进行相等匹配。Vavr 提供了模式匹配的 API，可以对多种情况进行匹配和执行相应的逻辑。在清单 12 中，我们使用 Vavr 的 Match 和 Case 替换了 Java 中的 switch 和 case。Match 的参数是需要进行匹配的值。Case 的第一个参数是匹配的条件，用 Predicate 来表示；第二个参数是匹配满足时的值。$(value) 表示值为 value 的相等匹配，而 $() 表示的是默认匹配，相当于 switch 中的 default。<br />

```java
String input = "g";
String result = Match(input).of(
	Case($("g"), "good"),
	Case($("b"), "bad"),
	Case($(), "unknown")
);
System.out.println(result);
// 输出 good
```

<br />在下面面的代码中，我们用 $(v -> v > 0) 创建了一个值大于 0 的 Predicate。这里匹配的结果不是具体的值，而是通过 run 方法来产生副作用。<br />

```java
int value = -1;
Match(value).of(
	Case($(v -> v > 0), o -> run(() -> System.out.println("> 0"))),
	Case($(0), o -> run(() -> System.out.println("0"))),
	Case($(), o -> run(() -> System.out.println("< 0")))
);
// 输出<  0
```
<br />
<a name="M4WQ4"></a>
## 2、值与记忆方法
<br />
<a name="mYJWX"></a>
### 2.1 Option
<a name="option"></a>
### 
Vavr 中的 `Option` 与 Java 8 中的 `Optional` 是相似的。不过 Vavr 的 Option 是一个接口，有两个实现类 `Option.Some` 和 `Option.None`，分别对应有值和无值两种情况。使用 `Option.some` 方法可以创建包含给定值的 `Some` 对象，而 `Option.none` 可以获取到 `None` 对象的实例。`Option` 也支持常用的 `map`、`flatMap` 和 `filter` 等操作。
<a name="d41d8cd9"></a>
##### 
```java
Option<String> str = Option.of("Hello");
str.map(String::length);
str.flatMap(v -> Option.of(v.length()));
```
<a name="Dy0WZ"></a>
## 
<a name="cQNlC"></a>
### 2.2 Either
`Either` 表示可能有两种不同类型的值，分别称为左值或右值。只能是其中的一种情况。`Either` 通常用来表示成功或失败两种情况。惯例是把成功的值作为右值，而失败的值作为左值。可以在 `Either` 上添加应用于左值或右值的计算。应用于右值的计算只有在 `Either` 包含右值时才生效，对左值也是同理。
```java
import io.vavr.control.Either;
import java.util.concurrent.ThreadLocalRandom;

public class Eithers {

private static ThreadLocalRandom random = ThreadLocalRandom.current();

public static void main(String[] args) {
Either<String, String> either = compute()
.map(str -> str + " World")
.mapLeft(Throwable::getMessage);
System.out.println(either);
}

private static Either<Throwable, String> compute() {
return random.nextBoolean()
? Either.left(new RuntimeException("Boom!"))
: Either.right("Hello");
}
}
```
<a name="Iiwle"></a>
## 
<a name="L2Jmf"></a>
### 2.3 Try
`Try` 用来表示一个可能产生异常的计算。`Try` 接口有两个实现类，`Try.Success` 和 `Try.Failure`，分别表示成功和失败的情况。`Try.Success` 封装了计算成功时的返回值，而 `Try.Failure` 则封装了计算失败时的 `Throwable` 对象。Try 的实例可以从接口 `CheckedFunction0`、`Callable`、`Runnable` 或 `Supplier` 中创建。`Try` 也提供了 `map` 和 `filter` 等方法。值得一提的是 `Try` 的 `recover` 方法，可以在出现错误时根据异常进行恢复。<br />在下面的代码中，第一个 `Try` 表示的是 `1/0` 的结果，显然是异常结果。使用 `recover` 来返回 1。第二个 `Try` 表示的是读取文件的结果。由于文件不存在，`Try` 表示的也是异常。
```java
Try<Integer> result = Try.of(() -> 1 / 0).recover(e -> 1);
System.out.println(result);

Try<String> lines = Try.of(() -> Files.readAllLines(Paths.get("1.txt")))
    .map(list -> String.join(",", list))
    .andThen((Consumer<String>) System.out::println);
System.out.println(lines);
```
<a name="th5dC"></a>
## 


<a name="5saiR"></a>
### 2.4 Lazy
`Lazy` 表示的是一个延迟计算的值。在第一次访问时才会进行求值操作，而且该值只会计算一次。之后的访问操作获取的是缓存的值。在清单 9 中，`Lazy.of` 从接口 `Supplier` 中创建 `Lazy` 对象。方法 `isEvaluated` 可以判断 `Lazy` 对象是否已经被求值。
<a name="de811ce9"></a>
##### 清单 9. 使用 Lazy 的示例
```java
Lazy<BigInteger> lazy = Lazy.of(() -> BigInteger.valueOf(1024).pow(1024));

System.out.println(lazy.isEvaluated());
System.out.println(lazy.get());
System.out.println(lazy.isEvaluated());
```
<a name="4ADZi"></a>
## 
<a name="d0tHW"></a>
## 3、函数
<a name="3YDgX"></a>
### 3.1 柯里化方法

<br />使用 `curried` 方法可以得到当前函数的柯里化版本。由于柯里化之后的函数只有一个参数，`curried` 的返回值都是 Function1 对象。在清单 4 中，对于 function3，在第一次的 `curried` 方法调用得到 Function1 之后，通过 `apply` 来为第一个参数应用值。以此类推，通过 3 次的 `curried` 和 `apply` 调用，把全部 3 个参数都应用值。
<a name="d41d8cd9-1"></a>
##### 
```java
Function3<Integer, Integer, Integer, Integer> function3 = (v1, v2, v3) -> (v1 + v2) * v3;
int result = function3.curried().apply(1).curried().apply(2).curried().apply(3);
System.out.println(result);
```
<a name="rUwYB"></a>
## 
<a name="5lQjL"></a>
### 3.2 组合
函数的组合指的是用一个函数的执行结果作为参数，来调用另外一个函数所得到的新函数。比如 f 是从 x 到 y 的函数，g 是从 y 到 z 的函数，那么 `g(f(x))`是从 x 到 z 的函数。Vavr 的函数式接口提供了默认方法 `andThen` 把当前函数与另外一个 Function 表示的函数进行组合。Vavr 的 Function1 还提供了一个默认方法 compose 来在当前函数执行之前执行另外一个 Function 表示的函数。<br />
<br />在下面的代码中，第一个 function3 进行简单的数学计算，并使用 andThen 把 function3 的结果乘以 100。第二个 function1 从 String 的 `toUpperCase` 方法创建而来，并使用 `compose` 方法与 Object 的 `toString` 方法先进行组合。得到的方法对任何 Object 先调用 `toString`，再调用 `toUpperCase`。
<a name="d41d8cd9-2"></a>
##### 
```java
Function3< Integer, Integer, Integer, Integer> function3 = (v1, v2, v3) -> (v1 + v2) * v3;
Function3< Integer, Integer, Integer, Integer> composed = function3.andThen(v -> v * 100);
int result = composed.apply(1, 2, 3);
System.out.println(result);
// 输出结果 900

Function1< String, String> function1 = String::toUpperCase;
Function1< Object, String> toUpperCase = function1.compose(Object::toString);
String str = toUpperCase.apply(List.of("a", "b"));
System.out.println(str);
// 输出结果[A, B]
```

<br />事实上JDK8+ 也提供了一些比较弱的函数组合，比如
```java
@FunctionalInterface
public interface Consumer<T> {

    void accept(T t);

    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}


@FunctionalInterface
public interface Predicate<T> {

    boolean test(T t);

    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }

    default Predicate<T> negate() {
        return (t) -> !test(t);
    }

    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }
}

```

<br />
<br />

<a name="TYAZR"></a>
## 4、参考内容

- [【IBM Developer】使用 Vavr 进行函数式编程](https://developer.ibm.com/zh/articles/j-understanding-functional-programming-4/)
- [【官方】VAVR 官方文档](https://www.vavr.io/vavr-docs/)
