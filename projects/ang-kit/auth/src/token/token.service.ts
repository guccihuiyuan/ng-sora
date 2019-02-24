import { Injectable, Injector } from '@angular/core';

import { TokenModel } from './token.model';
import { TokenConfigService, TokenConfig, TokenStoreType } from './token.config';

@Injectable()
export class TokenService {
  constructor(private injector: Injector) {}

  private tokenConfig: TokenConfig = this.injector.get(TokenConfigService);

  /**
   * 设置数据（会清空之前所有存储的）
   */
  public set(data: TokenModel) {
    let token_store_type = TokenStoreType.LocalStorage;
    if (this.tokenConfig && this.tokenConfig.token_store_type) {
      token_store_type = this.tokenConfig.token_store_type;
    }
    switch (token_store_type) {
      case TokenStoreType.LocalStorage:
        localStorage.setItem(this.getTokenStoreKey(), JSON.stringify(data));
        break;
      case TokenStoreType.SessionStorage:
        sessionStorage.setItem(this.getTokenStoreKey(), JSON.stringify(data));
        break;
      default:
        localStorage.setItem(this.getTokenStoreKey(), JSON.stringify(data));
    }
  }

  /**
   * 获取数据
   */
  public get(): TokenModel {
    let token_store_type = TokenStoreType.LocalStorage;
    if (this.tokenConfig && this.tokenConfig.token_store_type) {
      token_store_type = this.tokenConfig.token_store_type;
    }
    switch (token_store_type) {
      case TokenStoreType.LocalStorage:
        return (JSON.parse(localStorage.getItem(this.getTokenStoreKey()) || '{}') || {}) as TokenModel;
      case TokenStoreType.SessionStorage:
        return (JSON.parse(sessionStorage.getItem(this.getTokenStoreKey()) || '{}') || {}) as TokenModel;
      default:
        return (JSON.parse(localStorage.getItem(this.getTokenStoreKey()) || '{}') || {}) as TokenModel;
    }
  }

  /**
   * 清空数据
   */
  public clear() {
    let token_store_type = TokenStoreType.LocalStorage;
    if (this.tokenConfig && this.tokenConfig.token_store_type) {
      token_store_type = this.tokenConfig.token_store_type;
    }
    switch (token_store_type) {
      case TokenStoreType.LocalStorage:
        localStorage.removeItem(this.getTokenStoreKey());
        break;
      case TokenStoreType.SessionStorage:
        sessionStorage.removeItem(this.getTokenStoreKey());
        break;
      default:
        localStorage.removeItem(this.getTokenStoreKey());
    }
  }

  /**
   * 获取token_store_key
   */
  private getTokenStoreKey() {
    let key = 'token';

    if (this.tokenConfig && this.tokenConfig.token_store_key) {
      key = this.tokenConfig.token_store_key;
    }

    return key;
  }
}
