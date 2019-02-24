## 数据请求
在项目中，会用到很多数据请求，我们需要把这些请求抽象成服务，这样做的好处是：
- 1.可重复利用
- 2.可配合数据模型使用，对应的服务，对应的方法有明确的传参和返参类型
- 3.可对数据进行加工或过滤处理，外部只管拿有用的数据

## 示例
#### user.model.ts
```angular
export interface ExampleUserModel {
  id?: number;
  username?: string;
  nickname?: string;
  email?: string;
}
```

#### user.request.ts
```angular
import { Injectable } from '@angular/core';
import { HttpService } from '@ang-kit/http';
import { Observable, zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { HttpApiUrls } from '@appConfig/http.config';
import { ExampleMenu, ExampleUserModel } from '@models/data-models/example/example.model';

@Injectable()
export class ExampleRequest {
  constructor(private http: HttpService) {}

  login(username: string, password: string): Observable<ExampleUserModel> {
    return this.http.post(HttpApiUrls.example.getUser, {username: username, password: password}).pipe(
      map(res => res.flag ? res.data['data'] : null)
    )
  }

  getUserInfo(exampleUserModel?: ExampleUserModel): Observable<ExampleUserModel> {
    return this.http.post(HttpApiUrls.example.getUser, exampleUserModel).pipe(
      map(res => res.flag ? res.data['data'] : null)
    )
  }

  getUserMenusSwitchToMenu(exampleUserModel?: ExampleUserModel): Observable<ExampleMenu[]> {
    return this.http.post(HttpApiUrls.example.getMenus, exampleUserModel).pipe(
      map(res => res.flag ? res.data['data'] : null)
    )
  }

  /**
   * 合并上面两个请求
   */
  getUserAndMenusFromZip(exampleUserModel?: ExampleUserModel): Observable<[ExampleUserModel, ExampleMenu[]]> {
    const getUserInfo$ = this.getUserInfo(exampleUserModel);
    const getUserMenus$ = this.getUserMenusSwitchToMenu(exampleUserModel);
    return zip(getUserInfo$, getUserMenus$);
  }

  /**
   * 处理完上一个请求在处理下一个请求
   * @param exampleUserModel
   */
  getMenusFromMergeMap(exampleUserModel?: ExampleUserModel): Observable<ExampleMenu[]> {
    return this.getUserInfo(exampleUserModel).pipe(
      mergeMap(exampleUserModel => {
        // 获取用户ID
        const userId = exampleUserModel.id;
        return this.getUserMenusSwitchToMenu(exampleUserModel);
      })
    )
  }
}

```
