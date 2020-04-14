
# JavaScript数据结构和算法

## 数据结构

### 栈(stack)它是一种受限的线性表后进先出

1. 栈是一种遵从后进先出（LIFO）原则的有序集合。新添加的或待删除的元素都保存在栈的
同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

![avatar](/img/stack.png)

代码实现

```js
class Stack {
  // 存储数据
  items = [];
  constructor() {};
  // 进栈：添加新元素到栈顶
  push(ele) {
    this.items.push(ele);
  }
  // 出栈：移除栈顶的元素，同时返回被移除的元素。
  pop() {
    return this.items.pop();
  }
  // 返回栈顶的元素，不对栈做任何修改（这个方法不会移除栈顶的元素，仅仅返回它）。
  peek(){
    return this.items(this.items.length -1);
  }
  // 如果栈里没有任何元素就返回true，否则返回false。
  isEmpty() {
    return this.items.length === 0;
  }
  // 移除栈里的所有元素。
  claer() {
    this.items = []
  }
  // 返回栈里的元素个数。这个方法和数组的length属性很类似。
  size(){
    return this.items.length;
  }
}
```

### 队列数据结构

1. 队列是遵循FIFO（First In First Out，先进先出，也称为先来先服务）原则的一组有序的项。
队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

队列常用方法

```js
class Queue {
  items = [];
  constructor () {}
  // 向队列尾部添加一个（或多个）新的项。
  enqueue(ele) {
    this.items.push(ele)
  }
  // 移除队列的第一（即排在队列最前面的）项，并返回被移除的元素
  dequeue() {
    return this.items.shift()
  }
  // 返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息——与Stack类的peek方法非常类似）。
  front() {
    return this.items[0];
  }
  // 如果队列中不包含任何元素，返回true，否则返回false。
  isEmpty() {
    return !this.items.length;
  }
  // 返回队列包含的元素个数，与数组的length属性类似。
  size() {
    return this.items.length;
  }
}
```

优先队列

```js
class QueueElement {
  constructor(ele, priority) {
    this.ele = ele;
    this.priority = priority;
  }
}

class PriorityQueue {
  items = [];
  constructor(){};
  // 向队添加一个（或多个）新的项按照优先级进行排列。优先级大的排在前面 : 9 >8
  enqueue(ele, priority) {
    let node = new QueueElement(ele, priority)
    if(this.items.length === 0) {
      this.items.push(node)
    } else {
      for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (item.priority < priority ) {
          this.items.splice(i,0,node)
        } else if(i === this.items.length -1) {
          this.item.push(node)
        }
      }
    }
    // this.items.push(ele)
  }
  // 移除队列的第一（即排在队列最前面的）项，并返回被移除的元素
  dequeue() {
    return this.items.shift()
  }
  // 返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息——与Stack类的peek方法非常类似）。
  front() {
    return this.items[0];
  }
  // 如果队列中不包含任何元素，返回true，否则返回false。
  isEmpty() {
    return !this.items.length;
  }
  // 返回队列包含的元素个数，与数组的length属性类似。
  size() {
    return this.items.length;
  }
}
```

### 链表数据结构

1. 链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个
元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。下图展
示了一个链表的结构；
2. 优势：链表数据结构的优势，在删除和插入的时候性能较好，不需要一个连续的空间；
3. 劣势： 通过下标读取数据没有数组性能好；

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class LinkedList {
  length = 0;
  head = null;

  // 添加
  append(data) {
    if(!data) new Error('data不能为空')
    let newNode = new Node(data)
    if(this.head === null) {
      this.head = newNode
    } else {
      let current = this.head
      while(current.next) {
        current = current.next
      }
      current.next = newNode;
    }
    this.length ++;
  }
  // 插入
  insert(positon, data) {
    let newNode = new Node(data)
    let index = 0
    let current = this.head
    while(current.next && index < positon -1) {
      index ++;
      current = current.next
    }
    let insertNode = current.next
    current.next = newNode
    newNode.next = insertNode
    this.length++;
  }
  // 更新
  update(positon, data) {
    if (positon < 0 || positon > this.length - 1) return false;
    let index = 0;
    let current = this.head;
    while(current) {
      if (index === positon) {
        current.data = data
        return true
      }
      current = current.next;
      index ++;
    }
  }
  // 移除
  remove(position) {
    if(position >= 0 && position < this.length-1) {
      // 如果下标是0
      if (position === 0) {
        let current = this.head.next
        this.head = current
      } else {
        let index = 0
        let current = this.head
        while(current.next && index < position - 1) {
          index ++;
          current = current.next
        }
        let removeNode = current.next
        current.next = removeNode.next
      }
      this.length--
    }
  }
  // 没有返回-1有返回下标
  indexOf(data) {
    let index = -1 ;
    let current = this.head;
    while(current) {
      index++;
      if (current.data === data) {
        return index;
      }
      current = current.next
    }
    return -1;
  }
  // 查看
  toString() {
    let str = ''
    if(this.head){
      str += this.head.data
      let current = this.head
      while (current.next) {
        current = current.next
        if(current.data) {
          str += ',' + current.data
        }
      }
    }
    return str
  }
  // 查看第几个元素
  get(position) {
    if (position < 0 || position > this.length-1) return false;
    let current = this.head;
    let index = 0;
    while(current) {
      if (index === position) {
        return current.data;
      }
      index++;
    }
  }
  // 是否为空
  isEmpty() {
    return this.length === 0
  }
  // 包含的个数
  size() {
    return this.length
  }
}

let linked = new LinkedList()
```