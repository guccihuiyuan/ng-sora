import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenInterceptorComponent } from './token-interceptor/token-interceptor.component';
import { TokenServiceComponent } from './token-service/token-service.component';

const routes: Routes = [
  { path: 'token-service', component: TokenServiceComponent},
  { path: 'token-interceptor', component: TokenInterceptorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngKitAuthRoutingModule {}
