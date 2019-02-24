import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterceptorComponent } from './interceptor/interceptor.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  { path: 'http-service', component: ServiceComponent},
  { path: 'http-interceptor', component: InterceptorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngKitHttpRoutingModule {}
