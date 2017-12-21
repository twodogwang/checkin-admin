# vueAdmin-template

> 基于vue admin 管理后台 它包含了 Element UI & axios & iconfont & permission control & lint，使用了vuex、vue-router以及axios。

[线上地址](http://47.92.106.10:28889)

1. 使用vuex进行全局信息储存，如token，各页内容以及分页信息。
2. 使用vue-router进行路由渲染，根据与后端约定好的url字段进行筛选，得出路由结构。
3. 合理使用elementUI框架进行表格表单的构建，在每页的beforeCreate狗子函数中进行页面信息判断或请求信息。


## Build Setup

``` bash

# Clone project
git clone https://github.com/twodogwang/checkin-admin.git

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
