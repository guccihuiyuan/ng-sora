## 特性

- 更友好的调用方法
- 处理请求参数中的空值
- 统一返回参数的格式


## 方法

- `request(type: HttpRequestType, url: string, params: any = {}, options: any = HttpContentType.FORM): Observable<HttpResponse>`
- `post(url: string, params: any = {}, options: any = HttpContentType.FORM): Observable<HttpResponse>`
- `get(url: string, params: any = {}, options: any = HttpContentType.FORM): Observable<HttpResponse>`
- `delete(url: string, params: any = {}, options: any = HttpContentType.FORM): Observable<HttpResponse>`

## 注册
```angular
import {AngKitHttpModule} from '@ang-kit/http';

@NgModule({
  imports: [
    AngKitHttpModule
  ]
})
export class AppModule { }
```

## 使用
```angular
constructor(private http: HttpService) {}

this.http.get('/api', {params1: 1, params2: 2}).subscribe(res => {
  if (res.flag) {// 正确处理
  
  } else {// 错误处理
  
  }
});
```

## HttpRequestType
```angular
export enum HttpRequestType {
  GET,
  POST,
  PUT,
  DELETE
}
```

## HttpResponse
```angular
export interface HttpResponse {
  // 返回结果是否正确
  flag: boolean;
  // 返回信息
  message: string;
  // 返回数据
  data?: any;
  // 错误信息
  error?: any;
}
```
