import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';

import {AngKitTokenModule} from '../../projects/ang-kit/auth/src/token/token.module';
import {AngKitHttpModule} from '../../projects/ang-kit/http/src/http/http.module';
import {AngKitUtilModule} from '../../projects/ang-kit/util/src/util.module';

import {SimpleTokenInterceptor} from '../../projects/ang-kit/auth/src/token/token.interceptor';
import {DefaultHttpInterceptor} from '../../projects/ang-kit/http/src/http/http.interceptor';

import {SharedModule} from '@shared/shared.module';
import {RoutesModule} from './routes/routes.module';
import {LayoutModule} from './layout/layout.module';

import {MarkdownModule} from 'ngx-markdown';

// 配置
import {ADSTConfig} from '../../projects/ang-kit/component/src/ad-st/ad-st.config';
export function fnSTConfig(): ADSTConfig {
  return {
    ...new ADSTConfig(),
    ...{
      dataKey: 'id',
    } as ADSTConfig
  };
}


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    LayoutModule,
    RoutesModule,

    AngKitTokenModule.forRoot(),
    AngKitHttpModule,
    AngKitUtilModule,

    MarkdownModule.forRoot()
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultHttpInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: SimpleTokenInterceptor, multi: true},
    { provide: ADSTConfig, useFactory: fnSTConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
