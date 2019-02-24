## 7.3.0（`2019-02-24`）
## Bug Fixes
> * @ang-kit/auth：优化模块引用（破坏性改动，将原有的config移动到新增的token.config.ts中）
> * @ang-kit/util：优化模块引用
> * @ang-kit/component：1.修复局部reqReName、resReName只配置单项的时候导致其他项失效；2.修复树形结构只能遍历第二级

## Features
> * @ang-kit/component：新增树形结构树，外部请求的情况下，异步加载子数据功能

<br>
<br>
<br>

## 7.2.9（`2019-02-21`）
## Bug Fixes
> * @ang-kit/http：post application/x-www-form-urlencoded 形式提交的时候 增加encode参数，是否编码;去掉服务依赖
> * @ang-kit/component：去掉导入@ang-kit/http模块

<br>
<br>
<br>

## 7.2.3（`2019-02-20`）
## Bug Fixes
> * @ang-kit/component：extraParams改变时，并且有分页的时候，表格跳回到第一页

<br>
<br>
<br>

## 7.2.2（`2019-02-12`）
## Bug Fixes
> * @ang-kit/component：修复当数据源改变，清空column缓存

<br>
<br>
<br>

## 7.2.1（`2019-02-11`）
## Features
> * @ang-kit/component：column：新增 titleFormatCache、formatCache、formatFromCache 属性，当使用这些回调值的时候，下次自动从缓存中取值

<br>
<br>
<br>

## 7.2.0（`2019-01-17`）
## Features
> * @ang-kit/component：column：新增 rowSpan、colSpan 属性，使表格支持表头分组功能

<br>
<br>
<br>

## 7.1.2（`2019-01-17`）
## Bug Fixes
> * @ang-kit/component：修正 reqMehtod 为 reqMethod

<br>
<br>
<br>

## 7.1.1（`2019-01-16`）
## Bug Fixes
> * @ang-kit/component：修复空样式为 undefine

<br>
<br>
<br>

## 7.1.0（`2019-01-16`）
## Features
> * @ang-kit/component：列 、数据 项增加自定义样式配置
> * @ang-kit/component：增加全局自定义样式配置

<br>
<br>
<br>

## 7.0.0（`2019-01-05`）
## Features
> * 保持与 Angular 的主版本号一致

<br>
<br>
<br>

## 0.6.0（`2019-01-02`）
## Features
> * @ang-kit/component：增加全局配置类 ADSTConfig
> * @ang-kit/component：根据列配置属性，决定某一列是否显示

<br>
<br>
<br>

## 0.5.5（`2018-12-29`）
## Bug Fixes
> * @ang-kit/component：修复 可展开表格 当某一行没有展开数据的时候不显示展开按钮
