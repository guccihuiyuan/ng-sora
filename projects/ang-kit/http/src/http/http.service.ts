import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';

import { HttpRequestType, HttpResponse } from './http.model';

const HttpContentType = {
  FORM: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
  JSON: {headers: {'Content-Type': 'application/json'}}
};

// @Injectable({
//   providedIn: AngKitHttpModule
// })
@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }
  /**
   * 转换不同的请求方式
   */
  request(type: HttpRequestType, url: string, params: any = {}, options: any = HttpContentType.FORM): Observable<HttpResponse> {
    switch (type) {
      case HttpRequestType.GET:
        return this.get(url, params, options);
      case HttpRequestType.POST:
        return this.post(url, params, options);
      case HttpRequestType.PUT:
        break;
      case HttpRequestType.DELETE:
        return this.delete(url, params, options);
    }
  }

  /**
   * POST请求
   */
  post(url: string, params: any = {}, options: any = HttpContentType.FORM): Observable<HttpResponse> {
    // 去掉GET请求的查询参数
    options = Object.assign(options, {params: {}});

    // 去空
    const keys = Object.keys(params);
    keys.forEach((key) => {
      if (
        params[key] === null || params[key] === 'null' || params[key] === '' || (params[key] instanceof Array && params[key].length === 0)
      ) {
        delete params[key];
      }
    });

    return this.http.post<HttpResponse>(url, params, options).pipe(
      map(res => this.handleResponseSuccess(res)),
      catchError(error => of(this.handleResponseError(error)))
    );
  }

  /**
   * GET请求
   */
  get(url: string, params: any = {}, options: any = HttpContentType.FORM): Observable<HttpResponse> {
    // 去空
    const keys = Object.keys(params);
    keys.forEach((key) => {
      if (params[key] === null || params[key] === '' || (params[key] instanceof Array && params[key].length === 0)) {
        delete params[key];
      }
    });

    options = Object.assign(options, {params: params});

    return this.http.get<HttpResponse>(url, options).pipe(
      map(res => this.handleResponseSuccess(res)),
      catchError(error => of(this.handleResponseError(error)))
    );
  }

  /**
   * DELETE请求
   */
  delete(url: string, params: any = {}, options: any = HttpContentType.FORM): Observable<HttpResponse> {
    // 去空
    const keys = Object.keys(params);
    keys.forEach((key) => {
      if (params[key] === null || params[key] === '' || (params[key] instanceof Array && params[key].length === 0)) {
        delete params[key];
      }
    });

    options = Object.assign(options, {params: params});

    return this.http.delete<HttpResponse>(url, options).pipe(
      map(res => this.handleResponseSuccess(res)),
      catchError(error => of(this.handleResponseError(error)))
    );
  }

  /**
   * 处理成功
   */
  private handleResponseSuccess(res): HttpResponse {
    const httpResponse = this.getHttpResponseObj();

    httpResponse.flag = true;
    httpResponse.message = '';
    httpResponse.data = res;

    return httpResponse;
  }

  /**
   * 处理失败
   */
  private handleResponseError(error): HttpResponse {
    const httpResponse = this.getHttpResponseObj();

    httpResponse.flag = false;
    httpResponse.error = error;
    if (error.error instanceof Error) {// 客户端抛出的错误
      httpResponse.message = error.error.message;
    } else if (error instanceof HttpErrorResponse || error.status) {// 服务端返回的失败的状态码
      httpResponse.message = error.statusText;
    }

    return httpResponse;
  }

  /**
   * 生成HttpResponse对象
   */
  private getHttpResponseObj(): HttpResponse {
    return {
      flag: false,
      message: null,
      data: null,
      error: null
    };
  }
}
