import { Inject, Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from './token.service';
import { TokenConfig, TokenConfigService } from './token.config';

@Injectable()
export class SimpleTokenInterceptor implements HttpInterceptor {
  private defaultTokenConfig: TokenConfig = {
    token_login_url: '',
    token_ignores: [
      // '/man/oauth/token',
      // // 资源文件
      // 'assets/app-data.json',
      // 'assets/i18n/en.json',
      // 'assets/i18n/zh-CN.json'
    ],
    token_send_key_header: 'Authorization',
    token_send_template_header: 'Bearer ${token}',
    token_store_key: 'token'
  };

  constructor(
    private injector: Injector,
    @Inject(TokenConfigService) private tokenConfig: TokenConfig
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 获取TokenService
    const tokenService = this.injector.get(TokenService);
    // 获取config
    let config = this.tokenConfig;

    if (!config) {
      config = this.defaultTokenConfig;
    } else {
      config = Object.assign({}, this.defaultTokenConfig, config);
    }

    const {token_send_key_header, token_send_template_header, token_ignores} = config;

    // 对不需要处理Token验证的请求放行
    if (token_ignores && token_ignores.length > 0) {
      for (const item of token_ignores as RegExp[]) {
        if (item.test(req.url)) {
          return next.handle(req);
        }
      }
    }
    // if (token_ignores.length > 0) {
    //   for (let i = 0; i < token_ignores.length; i++) {
    //     if (req.url.includes(token_ignores[i])) {
    //       return next.handle(req);
    //     }
    //   }
    // }

    // 处理剩下需要Token验证的请求
    if (tokenService.get().token) {
      // 获取token值
      const token = token_send_template_header.replace(/\$\{([\w]+)\}/g, tokenService.get().token);

      // 默认将参数放入头部
      const tokenSendPlace = 'header';

      switch (tokenSendPlace) {
        case 'header':
          const obj = {};
          obj[token_send_key_header] = token;
          req = req.clone({
            setHeaders: obj
          });
          break;
      }

      return next.handle(req);
    } else { // 没有token信息
      return next.handle(req);

      // this.injector.get(Router).navigate([token_login_url]);
      // // 返回错误信息
      // return throwError({error: null, data-dict: 401, statusText: '未认证，请重新登陆'});
    }
  }
}
