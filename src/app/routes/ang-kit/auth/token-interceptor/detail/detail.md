## 特性

- 可配置
- 自动将Token放入请求头中

## 注册
```angular
import {SimpleTokenInterceptor} from '@ang-kit/auth';

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: SimpleTokenInterceptor, multi: true},
    ],
})
export class AppModule { }
```
