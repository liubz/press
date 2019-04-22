# 移动端常见问题

::: tip 提示
主题组件同样受到[浏览器 API 访问限制](./using-vue.md#浏览器-api-访问限制)。
:::

## CSS 相关

### 禁止用户选择页面中的文字或者图片

```css
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
```

### 移动端如何清除输入框内阴影

```css
-webkit-appearance: none;
```

### 禁止文本缩放

```css
webkit-text-size-adjust: 100%;
```

### 用户设置字号放大或者缩小导致页面布局错误

```css
用户设置字号放大或者缩小导致页面布局错误
```

### 移动端去除 type 为 number 的箭头

```css
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
```

### 常用 meta

```html
<!-- 设置缩放 -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui"
/>
<!-- 可隐藏地址栏，仅针对IOS的Safari（注：IOS7.0版本以后，safari上已看不到效果） -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<!-- 仅针对IOS的Safari顶端状态条的样式（可选default/black/black-translucent ） -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!-- IOS中禁用将数字识别为电话号码/忽略Android平台中对邮箱地址的识别 -->
<meta name="format-detection" content="telephone=no, email=no" />

其他meta标签
<!-- 启用360浏览器的极速模式(webkit) -->
<meta name="renderer" content="webkit" />
<!-- 避免IE使用兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true" />
<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320" />
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait" />
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait" />
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes" />
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true" />
<!-- UC应用模式 -->
<meta name="browsermode" content="application" />
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app" />
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no" />
```

### IOS 的 H5 页面 scroll 不流畅解决方案

```css
webkit-overflow-scrolling: touch;
```

### IOS 禁止保存或拷贝图像

```css
img {
  -webkit-touch-callout: none;
}
```

### ios 和 android 下触摸元素时出现半透明灰色遮罩

```css
/*E:这个是代指字符，实际自己替换，ID,CLASS,TAG*/
-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
```

## JavaScript 相关

### IOS 移动端上传图片

```js
www;
```

## vue 相关

### keep-alive 缓存组件

```text
不过是有代价的..占有内存会多了...所以无脑的缓存所有组件!!!别说性能好了..切换几次,有些硬件 hold不住的,浏览器直接崩溃或者卡死..
所以keep-alive一般缓存都是一些列表页,不会有太多的操作,更多的只是结果集的更换..
给路由的组件meta增加一个标志位,结合v-if就可以按需加上缓存了!

```
