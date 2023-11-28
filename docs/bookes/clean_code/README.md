---
title: 代码整洁之道(Clean Code)
date: 2022-04-30
---


## 命名

### 方法名

方法名应当是动词或动词短语，如save, deletePage。 \
属性访问器、修改器、断言根据其值依JavaBean标准命名为get, set, is。

```java
    string name = employee.getName();
    customer.setName("Tom");
    if (paycheck.isPosted())...
```

重载构造函数，使用描述参数的静态工厂方法更优。

```java
    Complex fulcrumPoint = Complex.FromRealNumber(23.0);
```

通常好于

```java
    Complex fulcrumPoint = new Complex(23.0);
```

### 每个概念确定一个词

避免DeviceManager, ProtocolController类似词语混用，应统一为xxManager, xxController或xxDriver

### 使用尽量精确的名称

MAC地址、端口地址、Web地址相区别，使用MAC, PostalAddress, URI这样的精确的名字

## 函数

### 短小

每个函数不应过长，数行为佳，例如：

```java
    public static String renderPageWithSetupAndTeardowns(
            PageData pageData, boolean isSuite) throws Exception {
        if (isTestPage(pageData)){
            includeSetipAndTeardownPages(pageData, isSuite);
        }
        return pageData.getHtml();
    }
```

if, else, while语句中的代码块尽量只有一行，调用一个拥有较具说明性的函数名称的函数，增加文档上的价值，易于阅读与理解。

### 只做一件事

函数应该只做一件事，只做同一个抽象层级上的步骤。要判断函数是否只做了一件事，看它是否还能在拆分出函数。 \
一个函数中的语句应在一个抽象层级上，基础与细节不能混杂在一起。 \
要让代码具有自顶向下的阅读顺序，每个函数后跟着下一抽象层级的函数。逻辑上，每个函数形如要……就要……如果……就……。例如：

- 要容纳设置与分拆步骤，就先容纳设置步骤，然后纳入测试内容，再纳入分拆步骤
- 要容纳设置步骤，如果是套件，就纳入套件设置步骤，然后再纳入普通设置步骤
- 要容纳套件设置步骤，先搜索"SuiteSetUp"页面的继承关系，再添加包含页面路径的语句
- 要搜索"SuiteSetUp"页面，就要……

### 函数名称

函数命名要保持一致，一个模块内的名称采用一脉相承的描述性短语

### 函数参数

越少越好。如果函数看起来需要很多(3个或3个以上)参数，可能某些参数需要封装成类了。如：

```java
    Circle makeCircle(double x, double y, double radius);
    Circle makeCircle(Point center, double radius);
```

函数的输出最好通过返回值体现，而不是在参数中输出。习惯上，信息通过函数输入参数，通过返回值从函数中输出。 \
不要向函数传入boolean值标识参数，这等于大声宣布本函数不仅做一件事。 \
对于一元函数，函数名与参数形成良好的动宾形式，如：`write(name)`, `writeField(name)`。 \
也可以在函数名称中体现关键字。`assertExpectedEqualsActual(expected, actual)`优于`assertEqual(expected, actual)`。

### 无副作用

反例：

```java
    public class UserValidator {
        private Cryptographer cryptographer;

        public boolean checkPassword(String userName, String password) {
            User user = userGateway.findByName(useeName);
            if (user != user.NULL) {
                String codePhrase = user.getPhraseEncodedByPassword();
                String phrase = cryptographer.decrypt(codedPhrase, password);
                if ("Valid password".equals(phrase)) {
                    Session.initialize();
                    return true;
                }
            }
            return false;
        }
    }
```

副作用在于调用了`Session.initialize()`。函数名称并未体现初始化会话的功能，可能导致调用者顾名思义而误操作。这违反了函数“只做一件事”的规则。

### 将指令与查询分开

避免设计使用`if (set("username", "unclebob"))...`这种将判断与指令杂糅的函数，应将它们分开：

```java
    if (attributeExists("username")) {
        setAttribute("username", "unclebob");
    }
```

这样的代码可读性更高。

### 使用异常

与TIJ中所讲的类似，使用异常可以将函数中的错误处理单独拎出来，减小使用if语句进行错误判断带来的层层嵌套。 \
在CleanCode中，作者鼓励将try/catch代码块抽离出去另外形成函数使得代码结构规整美观。

```java
    public void delete(Page page) {
        try {
            deletePageAndAllReferences(page);
        } catch (Exception e) {
            logError(e);
        }
    }

    private void deletePageAndAllReferences(Page page) throws Exception {
        deletePage(page);
        registry.deleteReference(page.name);
        configKeys.deleteKey(page.name.makeKey());
    }

    private void logError(Exception e) {
        logger.log(e.getMessage());
    }
```

错误处理本来就是一件事，函数应该专注于一件事，所以`delete`函数只与错误处理相关。 而`deletePageAndAllReferences`函数只与删除页面有关。`logError`只与记录异常有关。

### 如何写出这样的函数

写代码如同写文章。先写出粗陋的底稿，在此之上不断打磨成型。将写代码当作讲故事。

## 注释

### 用代码来阐述

尽量用代码来解释意图，比如说：

```java
// Check to see if the employee is eligible for full benefits
if ((employee.flags & HOURLY_FLAG) && employee.age > 65) { }
```

远不如

```java
if(employee.isEligibleForFullBenefits()) { }
```

### 好注释

- 提供信息的注释：

```java
// format matched kk:mm:ss EEE, MMM dd, yyyy
Pattern timeMatcher = Pattern.compile(
    "\\d*:\\d*:\\d* \\w*, \\w* \\d*, \\d*"
);
```

- 解释代码目的
- 解释某些参数或返回值：

```java
assertTrue(a.compareTo(b) == -1); // a < b
```

- 警示会产生某种后果的代码段
- TODO
- Javadoc（不可滥用）

## 格式

使用空行将概念隔开，联系紧密的代码行相靠近；行内应有缩进、空格：

```java
public class ReporterConfig {
    private String className;
    private List<Property> properties = new ArrayList<Property>();

    public void addProperty(Property property) {
        properties.add(property);
    }
}
```

将实体变量放在类的顶部，按照自上而下的顺序展示函数调用以来顺序，从而建立**自顶向下**贯穿源代码模块的信息流。让最重要的概念以包括最少细节的方式展现，让底层的细节最后出来。

一个团队内部应当采用相同的代码规范。

## 对象和数据结构

### 数据抽象

变量设置为`private`表明我们不希望其他人依赖这些变量，但是为什么许多程序员要为其自动添加getter/setter，使其如同`public`一般？

```java
// 具象的点
public class Point {
    double x;
    double y;
}
```

```java
// 抽象的点
public interface Point {
    double getX();
    double getY();
    void setCartesian(double x, double y);

    double getR();
    double getTheta();
    void setPolar(double r, double theta);
}
```

抽象的点不但呈现了其数据结构，还表明了一种使用策略：可以单个读取坐标，但必须原子性地修改所有坐标。不可乱加getter/setter。

抽象数据意味着隐藏数据细节，而不是简单地在形式上使用了接口、抽象类。

```java
// 具象机动车
public interface Vehicle {
    double getFuelTankCapacityInGallons();
    double getGallonsOfGasoline();
}
```

```java
// 抽象机动车
public interface Vehicle {
    double getPercentFuelRemaining();
}
```

显然，并不是使用了接口就是抽象。前者暴露了燃油存放在油箱中，油箱的单位是加仑。但我们无从得知后者的数据结构。

### 数据与对象、过程式与面向对象编程

```java
// 过程式形状
public class Square {
    public Point topLeft;
    public double side;
}

public class Circle {
    public Point center;
    public double radius;
}

public class Geometry {
    public final double PI = 3.1416;

    public double area(Object shape) throws NoSuchShapeException {
        if (shape instanceof Square) {
            Square s = (Square)shape;
            return s.side*s.side;
        } else if (shape instanceof Circle) {
            Circle c = (Circle)shape;
            return PI*c.radius*c.radius;
        }
        throw new NoSuchShapeException();
    }
}
```

```java
// 多态式形状
abstract class Shape {
    double area();
}

public class Square extends Shape {
    private Point topLeft;
    private double side;

    @Override
    public double area() {
        return side*side;
    }
}

public class Circle extends Shape {
    private Point center;
    private double radius;
    private final double PI = 3.1416;

    @Override
    public double area(){
        return PI*radius*radius;
    }
}
```

如果要添加三角形类，在过程式代码中不单要添加新类，还需要更改Geometry中的函数来处理它，而在面向对象式代码中只需要专心于这个新的类即可。 \
但是，如果需要添加求周长的方法`primeter()`，过程式代码中只要专注于添加方法，在面向对象式代码中，由于Shape都能求周长，需要修改所有的类。

也就是说，过程式代码便于在不改动已有数据结构的前提下添加新函数；面向对象式代码便于在不改动已有方法的情况下添加新类。
反之，过程式代码难以修改数据结构；而面向对象式代码难以添加新的方法。

### 迪米特法则(Law of Demeter)/最少知识原则(Least Knowledge Principle)

模块不应该知晓它所操作对象的内部情况。对象隐藏了数据，暴露了操作，它的存取方法不应暴露它的内部结构。

一个类C的方法f只能调用以下对象的方法：

- C
- 由f创建的对象
- 作为参数传递给f的对象
- 由C的实体变量所持有的对象

方法**不应**调用由任何函数返回的对象的方法。即“不与陌生人说话”。

避免火车式代码：

```java
final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
```

最好将其划分为：

```java
Options opts = ctxt.getOptions();
File scratchDir = opts.getScratchDir();
final String outputdir = scratchDir.getAbsolutePath();
```

### 数据传输对象(Data Transfer Objects, DTO)

DTO是指一种只有公共变量，没有函数的类。用于与数据库通信，或解析套接字传递的消息等场景中。它们可以将原始数据转换为数据库数据。

拥有由赋值器、取值器操作的私有变量的"bean"豆式结构举例：

```java
public class Address {
    private String street;
    private String city;
    private String zip;

    public Address(String street, String city, String zip) {
        this.street=street;
        this.city=city;
        this.zip=zip;
    }

    public String getStreet(){
        return street;
    }

    public String getCity(){
        return city;
    }

    public String getZip(){
        return zip;
    }
}
```

## 错误处理

### 封装第三方类

```java
LocalPort port = new LocalPort(12);
try {
    port.open();
} catch (PortDeviceFailure e){
    reportError(e);
    logger.log(e.getMessage(), e);
} finally {
    // ...
    ;
}
```

```java
public class LocalPort {
    private ACMEPort innerPort;

    public LocalPort(int portNumber) {
        innerPort = new ACMEPort(portNumber);
    }

    public void open() {
        try {
            innerPort.open();
        } catch (DeviceResponseException e) {
            throw new PortDeviceFailure(e);
        } catch (ATM1212UnlockedException e) {
            throw new PortDeviceFailure(e);
        } catch (GMXError e) {
            throw new PortDeviceFailure(e);
        }
    }
    // ...
}
```

其中，LocalPort是对第三方类ACMEPort进行的封装。它将自己的设备错误处理与第三方API分离开，降低了对第三方API的依赖性，以备不时之需，切换其他代码库。\
其他时候，为了隐藏边界，也要进行封装。

### 不要返回/传递`null`

不如使用异常或特例对象。 \
特例对象：在特殊条件下返回的继承自正常对象的对象。

仿照TIJ中给出的例子，我们还可以定义空对象：

```java
public class Employee {
    private String name;
    private String office;

    public static final Employee NULL = new Employee("Null Name", "Null Office");

    Employee(String name, String office) {
        this.name = name;
        this.office = office;
    }
}
```

## 测试

### 测试驱动开发(TDD)

在本书作者Robert C. Martin(Uncle Bob)的博客中，有一个BowlingGame Kata。可以看作学习TDD的一个样板。
<http://butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata>

kata（かた、形），空手道、柔道用语，一招一式皆称为“形”。也就是招式、套路。 \
观察保龄球计分器的开发过程，可以看到，在TDD中，用例先行，紧接着编写能使单元测试通过的代码，然后写下一个测试用例，再写项目代码……在编写单元测试、编写项目代码的同时，将其中杂糅的、重复的代码抽出去，进行重构，让测试更加自动化，在不影响输出的情况下改善代码。

IDEA中自带JUnit，在Project Structure中将新建文件夹改为"Test"类型即可在其下创建测试文件。

### TDD三定律

- 在编写不能通过的单元测试前，不可编写生产代码。
- 只可编写刚好无法通过的单元测试，不能编译也算不通过。
- 只可编写刚好足以通过当前失败测试的生产代码。

如果严格地按照TDD进行开发，测试代码量将与工作代码量相当。那么，一旦写出了混乱的测试代码，随着代码版本更新，测试将会变得愈发无序，难以维护。因此，要像对待工作代码一样对待测试代码，保持代码整洁。

### 构造-操作-检验模式

结合测试三段论Given-When-Then，写出用户故事。

Given：上下文，指定测试预设\
When：进行一系列操作\
Then：得到一系列可观测结果，即待检测的断言。

- 第一个环节：**构造**测试数据 -> Given
- 第二个环节：**操作**测试数据 -> When
- 第三个环节：**检验**操作是否得到期望的结果 -> Then

在对测试代码进行重构的过程中，逐步构建出简洁的测试API。尽量保证测试代码的整洁，测试环境不需要像生产环境一样考虑内存或CPU效率的问题。

```java
// 重构前
void testGetPageHieratchyAsXml() {
    crawler.addPage(root, PathParser.parse("PageOne"));
    crawler.addPage(root, PathParser.parse("PageOne.ChildOne"));
    crawler.addPage(root, PathParser.parse("PageTwo"));

    request.setResource("root");
    request.addInput("type", "pages");
    Responder responder = new SerializedPageResponder();
    SimpleResponse response = (SimpleResponse)responder.makeResponse(
        new FitNesseContext(root), request
    );
    String xml = response.getContent();

    assertEquals("text/xml", response.getContentType());
    assertSubString("<name>PageOne</name>", xml);
    assertSubString("<name>PageTwo</name>", xml);
    assertSubString("<name>ChildOne</name>", xml);
}
```

```java
// 重构后(遵循每个测试一个断言原则)
void testGetPageHieratchyAsXml() {
    // 构造
    givenPages("PageOne", "PageOne.ChildOne", "PageTwo");

    // 操作
    whenRequestIsIssued("root", "type:pages");

    // 检验 
    thenResponseShouldBeXML();
}

void testGetPageHierarchyHasRightTags() {
    // 构造
    givenPages("PageOne", "PageOne.ChildOne", "PageTwo");

    // 操作
    whenRequestIsIssued("root", "type:pages");

    // 检验 
    thenResponseShouldContain(
        "<name>PageOne</name>", "<name>PageTwo</name>", "<name>ChildOne</name>"
    );
}
```

### F.I.R.S.T

整洁的测试应遵循FIRST原则：

- 快速（Fast）：测试应该能够快速运行，以便频繁地运行。
- 独立（Independent）：测试之间相互独立，每个测试可以单独运行。
- 可重复（Repeatable）：测试可在任何环境重复通过，无论是生产环境、质检环境还是个人计算机。
- 自足验证（Self-Validating）：测试应有布尔输出，不应由开发者通过手工对比日志判断测试是否通过。
- 及时（Timely）：测试应该及时编写，单元测试应该恰好在使其通过的生产代码之前编写。这有助于编写易于测试的生产代码。

## 类

### 单一职责原则(Single Responsibility Principle, SRP)

类或模块应有且只有一条加以修改的理由。类只应有一个职责——只有一条修改的理由。

```java
public class SuperDashBoard extends JFrame implements MetaDataUser {
    public Component getLastFocusedComponent(){}
    public void setLastFocused(Component lastFocused){}
    public int getMaorVersionNumber(){}
    public int getMinorVersionNumber(){}
    public int getBuildNumber(){}
}
```

这个类既负责了管理Swing组件，又要跟踪版本信息，可以把负责版本信息的方法置于Version类中：

```java
public class Version {
    public int getMaorVersionNumber(){}
    public int getMinorVersionNumber(){}
    public int getBuildNumber(){}
}
```

### 内聚

类应该只有少量的实体变量。类中每个方法都应该操作一个或多个实体变量。类中的方法与变量相互依程度越高，这个类的内聚性就越强。

### 开闭原则(Open Closed Principle, OCP)

类应当对扩展开放，对修改封闭。添加或修改特性时不应触及其他部分。

```java
// 添加update功能必须修改这个类，有可能触及其他代码
public class Sql {
    Sql(String table, Column[] columns){}
    public String create(){}
    public String insert(Object[] fields){}
}
```

```java
// 通过扩展系统而非修改来增加新的特性
abstract class Sql {
    Sql(String table, Column[] columns){}
    abstract String generate();
}

public class CreateSql extends Sql {
    public CreateSql(String table, Column[] columns) {}
    @Override
    public String generate(){}
}

public class InsertSql extends Sql {
    public InsertSql(String table, Column[] columns) {}
    @Override
    public String generate(){}
}
```

## 简单设计

简单设计的原则：

- 测试
- 重构
- 消除重复
- 代码描述性、表达力强
- 尽可能少的类与方法

## 并发

引言：“对象是过程的抽象。线程是调度的抽象。”

### 为什么要并发

并发是一种解耦策略。它帮助我们把**目的**与**时机**分离开。在单线程应用中，目的与时机紧密耦合。

从结构上看，将目的与时机解耦，使得应用程序看起来像是多台协同工作的机器，而非一个大循环。

从响应时间与吞吐量上看，以网络信息聚合为例，多线程使得程序可以同时访问多个站点，减少了阻塞在套接字I/O上的时间。

- 并发会在性能和编写代码上增加一些开销
- 正确的并发是复杂的
- 并发缺陷视作偶发事件
- 并发常常需要对设计策略的根本性修改

### 并发遇到的问题与挑战与进程同步模型

同操作系统课程内容。略。

### 并发防御原则

#### 单一职责原则

- 并发代码有自己的开发、修改、调优生命周期
- 并发代码有并发代码独有的挑战
- 较差的并发代码容易出错
  
建议：分离并发代码与其他代码

#### 限制临界区

synchronized可以给临界区数据加锁。但是，如果需要共享数据的地方过多，可能：

- 漏掉保护临界区数据
- 破坏DRY原则以费力保证有效保护
- 难以判断错误源

建议：谨记数据封装，严格限制共享数据访问

#### 使用数据副本

复制对象分发给各个线程，最终在单线程中合并各个对象，避免共享数据

#### 线程尽可能独立

使线程按本地变量存储从源头接纳的数据，不与其他线程共享。将数据分解为可以被独立的线程操作的独立子集

### 共享对象需要多个方法的应对策略

+ **基于客户端的锁定**：客户端代码在调用第一个方法前锁定服务端，确保锁的范围覆盖了调用最后一个方法的代码。
+ **基于服务端的锁定**：在服务端内创建锁定服务端的方法，调用所有方法后解锁，让客户端代码调用新方法。
+ **适配服务端**：创建执行锁定的中间层。是不修改服务端代码的基于服务端的锁定。