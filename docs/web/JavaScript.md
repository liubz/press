# JavaScript

## 作真实 DOM Virtual DOM

### 1. 原生 DOM 操作 vs. 通过框架封装操作。

这是一个性能 vs. 可维护性的取舍。框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。针对任何一个 benchmark，我都可以写出比任何框架更快的手动优化，但是那有什么意义呢？在构建一个实际应用的时候，你难道为每一个地方都去做手动优化吗？出于可维护性的考虑，这显然不可能。框架给你的保证是，你在不需要手动优化的情况下，我依然可以给你提供过得去的性能。

### 2. 对 React 的 Virtual DOM 的误解。

React 从来没有说过 “React 比原生操作 DOM 快”。React 的基本思维模式是每次有变动就整个重新渲染整个应用。如果没有 Virtual DOM，简单来想就是直接重置 innerHTML。很多人都没有意识到，在一个大型列表所有数据都变了的情况下，重置 innerHTML 其实是一个还算合理的操作... 真正的问题是在 “全部重新渲染” 的思维模式下，即使只有一行数据变了，它也需要重置整个 innerHTML，这时候显然就有大量的浪费。我们可以比较一下 innerHTML vs. Virtual DOM 的重绘性能消耗：innerHTML: render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change)

Virtual DOM render + diff 显然比渲染 html 字符串要慢，但是！它依然是纯 js 层面的计算，比起后面的 DOM 操作来说，依然便宜了太多。可以看到，innerHTML 的总计算量不管是 js 计算还是 DOM 操作都是和整个界面的大小相关，但 Virtual DOM 的计算量里面，只有 js 计算和界面大小相关，DOM 操作是和数据的变动量相关的。前面说了，和 DOM 操作比起来，js 计算是极其便宜的。这才是为什么要有 Virtual DOM：它保证了 1）不管你的数据变化多少，每次重绘的性能都可以接受；2) 你依然可以用类似 innerHTML 的思路去写你的应用

### 3. MVVM vs. Virtual DOM

相比起 React，其他 MVVM 系框架比如 Angular, Knockout 以及 Vue、Avalon 采用的都是数据绑定：通过 Directive/Binding 对象，观察数据变化并保留对实际 DOM 元素的引用，当有数据变化时进行对应的操作。MVVM 的变化检查是数据层面的，而 React 的检查是 DOM 结构层面的。MVVM 的性能也根据变动检测的实现原理有所不同：Angular 的脏检查使得任何变动都有固定的 O(watcher count) 的代价；Knockout/Vue/Avalon 都采用了依赖收集，在 js 和 DOM 层面都是 O(change)：

脏检查：scope digest O(watcher count) + 必要 DOM 更新 O(DOM change)
依赖收集：重新收集依赖 O(data change) + 必要 DOM 更新 O(DOM change)

可以看到，Angular 最不效率的地方在于任何小变动都有的和 watcher 数量相关的性能代价。但是！当所有数据都变了的时候，Angular 其实并不吃亏。依赖收集在初始化和数据变化的时候都需要重新收集依赖，这个代价在小量更新的时候几乎可以忽略，但在数据量庞大的时候也会产生一定的消耗。

MVVM 渲染列表的时候，由于每一行都有自己的数据作用域，所以通常都是每一行有一个对应的 ViewModel 实例，或者是一个稍微轻量一些的利用原型继承的 "scope" 对象，但也有一定的代价。所以，MVVM 列表渲染的初始化几乎一定比 React 慢，因为创建 ViewModel / scope 实例比起 Virtual DOM 来说要昂贵很多。这里所有 MVVM 实现的一个共同问题就是在列表渲染的数据源变动时，尤其是当数据是全新的对象时，如何有效地复用已经创建的 ViewModel 实例和 DOM 元素。假如没有任何复用方面的优化，由于数据是 “全新” 的，MVVM 实际上需要销毁之前的所有实例，重新创建所有实例，最后再进行一次渲染！这就是为什么题目里链接的 angular/knockout 实现都相对比较慢。相比之下，React 的变动检查由于是 DOM 结构层面的，即使是全新的数据，只要最后渲染结果没变，那么就不需要做无用功。

Angular 和 Vue 都提供了列表重绘的优化机制，也就是 “提示” 框架如何有效地复用实例和 DOM 元素。比如数据库里的同一个对象，在两次前端 API 调用里面会成为不同的对象，但是它们依然有一样的 uid。这时候你就可以提示 track by uid 来让 Angular 知道，这两个对象其实是同一份数据。那么原来这份数据对应的实例和 DOM 元素都可以复用，只需要更新变动了的部分。或者，你也可以直接 track by $index 来进行 “原地复用”：直接根据在数组里的位置进行复用。在题目给出的例子里，如果 angular 实现加上 track by $index 的话，后续重绘是不会比 React 慢多少的。甚至在 dbmonster 测试中，Angular 和 Vue 用了 track by \$index 以后都比 React 快: dbmon (注意 Angular 默认版本无优化，优化过的在下面）

顺道说一句，React 渲染列表的时候也需要提供 key 这个特殊 prop，本质上和 track-by 是一回事。

作者：尤雨溪
链接：https://www.zhihu.com/question/31809713/answer/53544875
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 堆（heap）与栈（stack）

### heap

heap 是没有结构的，数据可以任意存放。heap 用于复杂数据类型（引用类型）分配空间，例如数组对象、object 对象。

### stack

stack 是有结构的，每个区块按照一定次序存放（后进先出），stack 中主要存放一些基本类型的变量和对象的引用，存在栈中的数据大小与生存期必须是确定的。可以明确知道每个区块的大小，因此，stack 的寻址速度要快于 heap。

## EventLoop

### 1. 基础知识

- js 作为浏览器脚本语言，它的主要用途是与用户互动，以及操作 DOM，因此 js 是单线程，也避免了同时操作同一个 DOM 的矛盾问题；
- 为了利用多核 CPU 的计算能力，H5 的 Web Worker 实现的“多线程”实际上指的是“多子线程”，完全受控于主线程，且不允许操作 DOM；
- js 引擎存在 monitoring process 进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去 Event Queue 那里检查是否有等待被调用的函数。这个过程是循环不断的，所以整个的这种运行机制又称为 Event Loop（事件循环）
- 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）；
- 如果在微任务执行期间微任务队列加入了新的微任务，会将新的微任务加入队列尾部，之后也会被执行；

### 2.js 中的异步操作

- setTimeOut
- setInterval
- ajax
- promise
- I/O

### 3.同步任务 or 异步任务

- 同步任务(synchronous)：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
- 异步任务(asynchronous)：不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行

### 4.宏任务 or 微任务

这里需要注意的是 new Promise 是会进入到主线程中立刻执行，而 promise.then 则属于微任务

- 宏任务(macro-task)：整体代码 script、setTimeOut、setInterval
- 微任务(mincro-task)：promise.then、promise.nextTick(node)

### 5. Event Loop 事件循环

![avatar](/img/4820992-82913323252fde95.png)

- 作者：StarryLake
- 链接：[js 运行机制详解（Event Loop）](https://www.jianshu.com/p/e06e86ef2595)
- 来源：简书

### 相关文章

- ssssyoki《这一次，彻底弄懂 JavaScript 执行机制》
  https://juejin.im/post/59e85eebf265da430d571f89#heading-9

- js 运行机制详解（Event Loop）
  https://www.jianshu.com/p/e06e86ef2595

- 阮一峰《JavaScript 运行机制详解：再谈 Event Loop》
  http://www.ruanyifeng.com/blog/2014/10/event-loop.html

## 预编译

1. 创建AO(Activation Object || 执行期上下文)对象
2. 找形参和变量声明，将变量声明和形参名作为AO的属性名，值为undefined
3. 将实参值和形参统一
4. 在函数体里面找函数声明，赋值予函数体

```js
function fn(a) {
  console.log(a)
  var a = 123
  console.log(a)
  function a () {}
  var b = function() {}
  console.log(b)
  function d () {}
}
fn(1)
/*
预编过程
1.创建AO对象
AO{

}
2.找形参和变量声明，将变量声明和形参名作为AO的属性名，值为undefined
AO{
  a: undefined,
  b: undefined
}
3.将实参值和形参统一
AO{
  a: 1,
  b:function b() {}
}
4. 在函数体里面找函数声明，赋值予函数体
AO{
  a: function a {},
  b:function b() {},
  d: function d {}
}
5. 代码执行
*/
```

## 作用域链

1. [[scope]]: 每个JavaScript函数都是一个对象，对象中有些属性我们是可以访问的，但有些不可以，这些属性仅供JavaScript引擎存取，[[scope]]就是其中一个。[[scope]]指的就是我们所说的作用域，其中储存了运行期上下文的集合。
2. 作用域链： [[scope]]中所存储的执行期上下文的集合，这个集合呈链式链接，我们把这种链式链接叫做作用域链。
3. 变量查找：从作用域链的顶端依次往下查找。

示例

```js
function a () {
  function b() {
    var b = 234
  }
  b();
}
var glob = 100;
a();
/*
a函数 定义 a.[[scope]] --> 0: GO {}
a函数 运行 a.[[scope]] --> 0: AO {} (a的A0)
                          1: GO {}
b函数 定义 b.[[scope]] --> 0: AO {} (a的A0)
                          1: GO {}
b函数 运行 b.[[scope]] --> 0: AO {} (b的A0)
                          1: AO {} (a的A0)
                          2: GO {}
*/
```

图解
a 函数被定义时的作用域链
![avatar](/img/scope-a-defined.png)

a 函数执行时的作用域链
![avatar](/img/scope-a-doing.png)

b 函数被定义时的作用域链
![avatar](/img/scope-b-defined.png)

b 函数执行时的作用域链
![avatar](/img/scope-b-doing.png)

## 闭包

1. 当内部函数被保存到外部时，将会产生闭包。
2. 缺点：闭包会导致原有作用域链不释放，造成内存泄漏。
3. 优点： 实现私有变量，可以做缓存，可以模块化开发，避免全局变量的污染

```js
function a () {
 var temp = 100;
 function b () {
   console.log(temp)
 }
 return b;
}
var dome = a();
dome();
/*
由于a函数执行把b函数保存到了函数的外部，b函数的作用域链中还保存这a函数的执行时生成的作用域链，导致a函数执行完内存没有得到释放。
*/
```
