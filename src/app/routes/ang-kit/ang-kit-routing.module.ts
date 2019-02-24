import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngKitComponent } from './ang-kit.component';

const routes: Routes = [
  {
    path: '',
    component: AngKitComponent ,
    children: [
      // 组件
      { path: 'component', loadChildren: './component/component.module#AngKitComponentModule' },
      // 网络请求
      { path: 'http', loadChildren: './http/http.module#AngKitHttpModule' },
      // 认证
      { path: 'auth', loadChildren: './auth/auth.module#AngKitAuthModule' },
      // 工具类
      { path: 'util', loadChildren: './util/util.module#AngKitUtilModule' },
      // 编码规范
      { path: 'coding', loadChildren: './coding/coding.module#AngKitCodingModule' },
      // 编码规范
      { path: 'log', loadChildren: './log/log.module#AngKitLogModule' },
      // Cli
      { path: 'cli', loadChildren: './cli/cli.module#AngKitCliModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngKitRoutingModule {}
