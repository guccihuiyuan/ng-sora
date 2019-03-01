import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

// @Injectable({
//   providedIn: AngKitHttpModule
// })
@Injectable()
export class DefaultHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 主要处理FORM表单提交形式的参数
    let body = req.body;
    if (
      req.headers.get('Content-Type') &&
      req.headers.get('Content-Type').indexOf('application/x-www-form-urlencoded') !== -1
    ) {// 以FORM表单的形式提交
    // if (req.headers.get('Content-Type') === 'application/x-www-form-urlencoded') {// 以FORM表单的形式提交
      // 序列化请求参数
      if (req.method === 'POST' || req.method === 'PUT') {
        if (!body.hasOwnProperty('ANGKIT_NO_PARSE_FORM_BODY')) {// 如果提交的POST请求中没有这个字段则FORM形式提交的参数要解析
          if (body.hasOwnProperty('NO_ENCODE')) {// 不需要编码
            // 删除 NO_ENCODE
            delete body['NO_ENCODE'];
            body = this.parseParam(body);
          } else {// 编码
            body = this.parseParam(body, null, true);
          }
        } else {
          // 删除 ANGKIT_NO_PARSE_FORM_BODY
          delete body['ANGKIT_NO_PARSE_FORM_BODY'];
        }
      }
    }

    const newReq = req.clone({
      body: body
    });

    return next.handle(newReq);
  }

  /**
   * 将对象转化为URL参数字符串
   * @param param  将要转为URL参数字符串的对象
   * @param key    URL参数字符串的前缀
   * @param encode 是否进行URL编码，默认为true
   */
  private parseParam(param, key = null, encode: boolean = true): string {
    if (param === null) {
      return '';
    }

    let paramStr = '';

    const type = typeof (param);

    if (type === 'string' || type === 'number' || type === 'boolean') {
      paramStr += '&' + key + '=' + (encode ? encodeURIComponent(param.toString()) : param);
    } else {// 对象或者数组
      for (const i in param) {
        if (param.hasOwnProperty(i)) {
          const k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
          paramStr += '&' + this.parseParam(param[i], k, encode);
        }
      }
    }

    return paramStr.substr(1);
  }
}
