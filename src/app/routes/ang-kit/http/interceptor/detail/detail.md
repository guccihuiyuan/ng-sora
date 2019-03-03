## 特性

- 处理POST、PUT请求，将参数转换成URL查询参数
- 处理POST、PUT请求，参数编码

## 使用示例
```angular
import {DefaultHttpInterceptor} from '@ang-kit/http';

@NgModule({
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: DefaultHttpInterceptor, multi: true},
  ]
})
export class AppModule { }
```

## 注意
如果某个POST或者PUT请求不需要参数转换，则需要在提交的参数中添加如下key-value对象即可：
```angular
{ANGKIT_NO_PARSE_FORM_BODY: true}
```

如果某个POST或者PUT参数不需要编码，则需要在提交的参数中添加如下key-value对象即可：
```angular
{NO_ENCODE: true}
```
