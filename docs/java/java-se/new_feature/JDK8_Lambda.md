第一次看到用lambda表达式写出来的Java代码时，我对这种神秘的语法感到非常不理解，认为这样的Java搞得不可读。没有专门的去学习和认识，今天花了几个小时写了示例的练习后，我开心的看到了更清晰的Java代码。这有点像学习泛型，第一次见的时候我很讨厌它。<br />
<br />所以现在的想法就是，不要畏惧lambda表达式以及方法引用的神秘语法，做几次示例Demo，从集合类中提取、过滤数据之后，你就会发现很多东西不是表面看起来那样，实际操作起来发现确实有进步。<br />

<a name="135faaba"></a>
## 传递匿名内部类类


```java

public class CreateThread {

  public static void main(String[] args) {
    // JDK  8之前创建线程
    new Thread(
            new Runnable() {
              @Override
              public void run() {
                System.out.println("this is a thread！" + Thread.currentThread().getName());
              }
            })
        .start();
    // JDK  8创建线程
    new Thread(()->System.out.println("this is a thread of lambda " + Thread.currentThread().getName())).start();
  }
}
```


<a name="6078f282"></a>
## 遍历集合


```java
  public static void main(String[] args) {

    List<String> list = Arrays.asList("one","two","three","four","five","six","seven");
    System.out.println("\n------JDK8之前的遍历方式----------");
    for(String data:list){
      System.out.print(data+"\t");
    }

    System.out.println("\n\n\n------JDK8之后的遍历方式----------");
    list.forEach(data -> System.out.print(data + "\t"));
  }
```


<a name="fc9ea9be"></a>
## 接口式编程


```java

  public static void main(String[] args) {

    List<String> list = Arrays.asList("one", "two", "three", "four", "five", "six", "seven");

    System.out.println("以f开头的数据信息：");
    filter(list, (str) -> str.toString().startsWith("f"));

    System.out.println("以e结尾的数据信息：");
    filter(list, (str) -> str.toString().endsWith("e"));

    System.out.println("输出全部数据：");
    filter(list, (str) ->true);

    System.out.println("输出长度大于等于4的数据：");
    filter(list, (str) -> str.toString().length() >= 4);
  }

  public static void filter(List<String> names, Predicate condition) {
    for (String name : names) {
      if (condition.test(name)) {
        System.out.print(name + "\t ");
      }
    }
    System.out.println();
  }
```


<a name="0028ba35"></a>
## 遍历集合并处理数据


```java
 public static void main(String[] args) {
    System.out.println("不使用lambda表达式为每个订单加上12%的税");
    List<Integer> costBeforeTax = Arrays.asList(100, 200, 300, 400, 500);
    for (Integer cost : costBeforeTax) {
      double price = cost + .12 * cost;
      System.out.print(price + "\t");
    }
    System.out.println();

    System.out.println("使用lambda表达式为每个订单加上12%的税");
    costBeforeTax
        .stream()
        .map(cost -> cost + cost * .12)
        .collect(Collectors.toList())
        .forEach(data -> System.out.print(data + "\t"));

  }
```


<a name="9c2d3347"></a>
## 过滤数据


```java
  public static void main(String[] args) {
    List<String> list = Arrays.asList("1", "2", "3", "2", "1", "4", "2");
    List<String> collect = list.stream().distinct().collect(Collectors.toList());

    System.out.println("源数据");
    list.forEach(data -> System.out.print(data + "\t"));

    System.out.println("\n\n过滤后的数据源");
    collect.forEach(data -> System.out.print(data + "\t"));
  }
```


<a name="eb93ab84"></a>
## 统计数据信息


```java
  public static void main(String[] args) {

    ArrayList<String> arrayList = new ArrayList<>(16);

    for (int i = 0; i < 5; i++) {
      arrayList.add(String.valueOf(Math.random()));
    }

    arrayList.forEach(data -> System.out.print(data + "\t"));
    System.out.println();

    DoubleSummaryStatistics statistics =
        arrayList.stream().mapToDouble((x) -> Double.parseDouble(x)).summaryStatistics();

    System.out.println("Max = " + statistics.getMax());
    System.out.println("Min = " + statistics.getMin());
    System.out.println("Average = " + statistics.getAverage());
    System.out.println("Sum = " + statistics.getSum());
  }
```
