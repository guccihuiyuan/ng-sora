import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';

// 主页
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', component: MainComponent, data: { title: '主页' } },

      // @ang-kit
      { path: 'ang-kit', loadChildren: './ang-kit/ang-kit.module#AngKitModule' },
    ]
  },
  // 单页不包裹Layout
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
