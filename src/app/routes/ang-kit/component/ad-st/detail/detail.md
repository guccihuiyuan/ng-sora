## 注册
```angular
import {AngKitComponentModule} from '@ang-kit/component';

@NgModule({
  imports: [
    AngKitComponentModule
  ]
})
export class AppModule { }
```


### 全局配置
一般在项目中，表格的风格和一些参数基本是一致的，现在可以通过注册服务，给表格统一设置，这样可以减少页面中表格的配置项，使用方式如下：
```angular
import {ADSTConfig} from '@ang-kit/component';
export function fnSTConfig(): ADSTConfig {
  return {
    ...new ADSTConfig(),
    ...{
      dataKey: 'id',
    } as ADSTConfig
  };
}
@NgModule({
  providers: [
    { provide: ADSTConfig, useFactory: fnSTConfig },
  ],
})
export class AppModule { }
```
