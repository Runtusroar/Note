## 一、jQuery简介
### 1、jQuery概述
jQuery就是一个JavaScript库  
```js
//引入jquery后设置等页面DOM加载完后再执行js代码  
//方法1
$(document).ready(function(){
    //js代码
})
//方法2
$(function(){
    //js代码
})
```
### 2、DOM对象 和 jQuery对象
> 1、通过原生js获取过来的对象就是DOM对象  
> 2、通过jQuery获取的对象就是jQuery对象 (以伪数组形式存储)  
> 3、jQuery对象只能使用jQuery方法，DOM对象只能使用原生JavaScript属性和方法  

