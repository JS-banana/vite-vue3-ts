# 主题换肤

## 方案一：CSS variables

不依赖任何框架，使用原生属性即可

> CSS variables 只支持现代浏览器，非 IE 11，兼容插件：[postcss-custom-properties](https://github.com/postcss/postcss-custom-properties)

基本原理就是：

1. 通过改变类的权重，使对应的变量值生效（`<body class="theme-dark">`）
2. 改变 `head link`的引入样式路径 （`<link rel="stylesheet" href="./dark.css">`）

> 如：当我们触发暗黑主题切换的操作时，把 `theme-dark`类添加到 `body`等最外层的标签上，让其权限变化，变量生效

```css
/* 定义变量 */
:root{
    --title-color: #111827
}

.theme-dark{
    --title-color: #F3F4F6
}

/* class 类，颜色值以 var 通过变量的形式使用 */
.post__title{
    color: var(--title-color)
}
```

看起来比较简单，但是有个问题，就是要统一管理变量

如果网站比较简易，模块不多，UI不复杂，感觉还是可以尝试的，总的来说，这种方式还是比较原始的

## 方案二：Tailwind

## antd组件库

## 保存用户的设置

localStorage
