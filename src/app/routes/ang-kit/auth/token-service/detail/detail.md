## 特性

- 可配置
- 存储、获取、清空token

## 方法

- `set(data: TokenModel): void`
- `get(): TokenModel`
- `clear(): void`

## 注册
```angular
import {AngKitTokenModule} from '@ang-kit/auth';

@NgModule({
  imports: [
    // 可传入配置，类型为TokenConfig
    AngKitTokenModule.forRoot()
  ]
})
export class AppModule { }
```

## 使用
```angular
constructor(
    private tokenService: TokenService
  ) {}
ngOnInit() {
    this.tokenService.set({token: 'token'});
    this.tokenService.clear();
}
```

## TokenModel
```angular
export interface TokenModel {
  /**
   * token
   */
  token: string;
  /**
   * 其他
   */
  [key: string]: any;
}
```

## TokenConfig
```angular
/**
 * 可传入的配置信息
 */
export interface TokenConfig {
  /**
   * 登陆页面地址（用于当不满足token条件的时候，跳到登陆页面）
   */
  token_login_url?: string;
  /**
   * 哪些请求忽略Token
   */
  token_ignores?: Array<string>;
  /**
   * 发送Token认证请求的时候，header头中的key
   */
  token_send_key_header?: string;
  /**
   * 在每个请求头中放入token的模板字段（比如：Bearer ${token}，会解析成 Bearer token）
   */
  token_send_template_header?: string;
  /**
   * localStorage的存储KEY值
   */
  token_store_key?: string;
  /**
   * 定义token存储类型
   */
  token_store_type?: TokenStoreType;
}
```

## TokenStoreType
```angular
export enum TokenStoreType {
  LocalStorage,
  SessionStorage
}
```
