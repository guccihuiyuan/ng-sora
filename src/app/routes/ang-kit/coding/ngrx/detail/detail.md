## Action
```angular
import { Action } from '@ngrx/store';
import { ExampleUserModel } from '@models/data-models/example/example.model';

export const ExampleUserActionTypes = {
  // 登陆
  LOGIN:                      '[ExampleUser] Login',
  // 登陆成功
  LOGIN_SUCCESS:              '[ExampleUser] LoginSuccess',
  // 登陆失败
  LOGIN_FAIL:                 '[ExampleUser] LoginFail',
};

// 登陆
export class ExampleUserLoginAction implements Action {
  readonly type = ExampleUserActionTypes.LOGIN;
  constructor(public payload: {username: string, password: string}) {}
}
// 登陆成功
export class ExampleUserLoginSuccessAction implements Action {
  readonly type = ExampleUserActionTypes.LOGIN_SUCCESS;
  constructor(public payload: ExampleUserModel) {}
}
// 登陆失败
export class ExampleUserLoginFailAction implements Action {
  readonly type = ExampleUserActionTypes.LOGIN_FAIL;
  constructor(public payload = null) {}
}

export type ExampleUserActionsUnion =
  ExampleUserLoginAction             |
  ExampleUserLoginSuccessAction      |
  ExampleUserLoginFailAction;
```

## Reducer
```angular
import * as exampleActions from '../actions/example.action';
import { ExampleUserModel } from '@models/data-models/example/example.model';

export interface State {
  user: ExampleUserModel;
  authLoading: boolean;
}

export const initialState: State = {
  user: null,
  authLoading: false
};

export function reducer(state = initialState, action: exampleActions.ExampleUserActionsUnion): State {
  switch (action.type) {
    // 登录
    case exampleActions.ExampleUserActionTypes.LOGIN: {
      return {...state, authLoading: true};
    }
    // 登录成功
    case exampleActions.ExampleUserActionTypes.LOGIN_SUCCESS: {
      return {...state, authLoading: false, user: action.payload};
    }
    // 登录失败
    case exampleActions.ExampleUserActionTypes.LOGIN_FAIL: {
      return {...state, authLoading: false};
    }

    default: {
      return state;
    }
  }
}

export const getExampleUser = (state: State) => state.user;
```

## Effect
```angular
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as exampleActions from '../actions/example.action';
import { exhaustMap, map } from 'rxjs/operators';
import { ExampleRequest } from '@requests/example/example.request';
import { Router } from '@angular/router';

@Injectable()
export class ExampleEffect {
  constructor(
    private actions$: Actions,
    private exampleRequest: ExampleRequest,
    private router: Router
  ) {}

  /**
   * 登录
   */
  @Effect()
  login$ = this.actions$.pipe(
    ofType<exampleActions.ExampleUserLoginAction>(exampleActions.ExampleUserActionTypes.LOGIN),
    map(action => action.payload),
    exhaustMap(payload => {
      return this.exampleRequest.login(payload['username'], payload['password']).pipe(
        map(user => {
          if (user) {
            // 请求用户信息
            return new exampleActions.ExampleUserLoginSuccessAction(user);
          }
          return new exampleActions.ExampleUserLoginFailAction();
        })
      )
    })
  );

  // /**
  //  * 登录或者注册成功，进入主页
  //  */
  // @Effect({ dispatch: false })
  // loginOrRegistSuccess = this.actions$.pipe(
  //   ofType(exampleActions.ExampleUserActionTypes.LOGIN_SUCCESS),
  //   map(() => this.router.navigate(['/']))
  // );
}
```

## 使用
#### .html
```angular
<label *ngIf="user$ | async">用户名：{{(user$ | async)?.username}}</label>
```

#### .ts
```angular
@Component({
  templateUrl: './ngrx.component.html',
})
export class ExampleNgrxComponent extends BaseComponent implements OnInit {
  user$: Observable<ExampleUserModel>;

  constructor(
    protected injector: Injector,
    private store: Store<fromRoot.State>,
  ) {
    super(injector);
  }

  ngOnInit() {
    // 模拟数据
    // this.store.dispatch({ type: LOGIN_SUCCESS, payload: {id: 1, username: '小明'} });
    this.store.dispatch(new ExampleUserLoginSuccessAction({id: 1, username: '小明'}));

    this.user$ = this.store.pipe(select(fromRoot.getExampleUser));

    setTimeout(() => {
      this.store.dispatch(new ExampleUserLoginSuccessAction({id: 1, username: '小王'}));
    }, 3000);
  }
}
```
