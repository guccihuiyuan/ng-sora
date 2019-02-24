# ng-sora 脚手架工具
- 仅支持 angular-cli@7.1.4+ 版本
- 使用 ng add ng-sora 自动添加并注册 @ang-kit 模块
- 使用 ng g ng-sora 来构业务页

## ng add ng-sora
```angular
ng add ng-sora [options]
```
### 参数
|参数名|默认值|描述|
|------|------|------|
| --http | true | 是否安装 @ang-kit/http |
| --auth | true | 是否安装 @ang-kit/auth |
| --component | true | 是否安装 @ang-kit/component |
| --util | true | 是否安装 @ang-kit/util |

## ng update ng-sora（暂不可用）
```angular
ng update ng-sora
```

## ng g ng-sora
目前支持创建多种类型的 ad-st 表格页面
```angular
ng g ng-sora:command [name] [options]
```

### command
- ad-st

### name
- --tableType

### options
- basic 默认
- checkbox
- sort
- expand
- tree
- external-request
- internal-request
- styles
