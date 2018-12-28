# 你可能不值得console
 *原文链接 [被忽略的console.log](https://segmentfault.com/a/1190000017333162?utm_source=tag-newest)*
  *原文链接 [你可能不知道console强大](https://www.cnblogs.com/liyunhua/p/4529079.html)*
### console.log()

console.log()的几种使用方法，大多数人只知道console.log（obj）这一种，console.log（object，otherObject，string）、console.log（msg，values）这两种方式

常见的占位符是％o（这是一个字母o，而不是零），它接受一个对象，％s接受一个字符串，％d是一个十进制或整数。
```js
console.log('I like %s but I do not like %s.', 'Skittles', 'pus');
// 输出 I like Skittles but I do not like pus.

```
另一个有趣的是％c， 它实际上是CSS值的占位符。

```
console.log('I am a %cbutton', 'color: white; background-color: orange; padding: 2px 5px; border-radius: 2px');
```

输出结果

![avatar](/img/1546010431.png)

### console.dir()
这是一种更加客观的方式来查看元素。 有时候这就是你真正想要的东西，更像是检查元素。

普通console.log(element)
![avatar](/img/1546011014.png)

console.dir(element)
![avatar](/img/1546011061.png)

### console.warn()

可能是最明显的直接替换log()，你可以用完全相同的方式使用console.warn()。 唯一真正的区别是输出有点黄。 具体来说，输出处于警告级别而不是信息级别，因此浏览器将稍微区别对待它。 这具有使其在杂乱输出中更明显的效果。

但是，有一个更大的优势。 因为输出是警告而不是信息，所以您可以过滤掉所有console.log并仅保留console.warn。 这对于偶尔会在浏览器中输出大量无用废话的偶尔繁琐的应用程序尤其有用。 清除噪音可以让您更轻松地看到输出。

### console.table()
令人惊讶的是，这并不是更为人所知，但是console.table()函数旨在以比抛出原始对象数组更简洁的方式显示表格数据。
例如，这是一个数据列表。
```js
const transactions = [{
  id: "7cb1-e041b126-f3b8",
  seller: "WAL0412",
  buyer: "WAL3023",
  price: 203450,
  time: 1539688433
},
{
  id: "1d4c-31f8f14b-1571",
  seller: "WAL0452",
  buyer: "WAL3023",
  price: 348299,
  time: 1539688433
},
{
  id: "b12c-b3adf58f-809f",
  seller: "WAL0012",
  buyer: "WAL2025",
  price: 59240,
  time: 1539688433
}];
console.tabl(transactions);
console.table(transactions, ["id", "price"]);
```
输出结果
![avatar](/img/1546012885.png)
