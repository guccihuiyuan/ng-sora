## 7.4.4（`2019-03-28`）
## Features
> * @ang-kit/component：增加序号显示

<br>
<br>
<br>

## 7.4.3（`2019-03-15`）
## Bug Fixes
> * @ang-kit/component：res total 字段，只有当显示分页并且后端分页才进行处理

<br>
<br>
<br>

## 7.4.2（`2019-03-11`）
## Features
> * @ang-kit/auth：配置 token_ignores 字段，忽略不需要添加token的请求

<br>
<br>
<br>

## 7.4.1（`2019-03-07`）
## Bug Fixes
> * @ang-kit/component：修复内部请求无数据时，页面不刷新

<br>
<br>
<br>

## 7.4.0（`2019-03-03`）
## Features
> * @ang-kit/component：同步ng-zorro-antd@7.0.0

## Bug Fixes
> * @ang-kit/component：1.修复OnPush模式下数据不可变性（本地排序） 2.修复可展开按钮在ng-zorro-antd@7.0.0下占位问题 3.修复可展开按钮 extra 属性写死

<br>
<br>
<br>

## 7.3.2（`2019-03-01`）
## Features
> * @ang-kit/http：处理调自定义字段，不发出
> * @ang-kit/auth：增加 refresh_token、expires_in、expires_time 等字段、增加add()方法

<br>
<br>
<br>

## 7.3.1（`2019-02-27`）
## Features
> * @ang-kit/http：增加put请求处理

<br>
<br>
<br>

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
