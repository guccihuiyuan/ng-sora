import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodingConfigComponent } from './config/coding-config.component';
import { CodingModelComponent } from './model/coding-model.component';
import { CodingRequestComponent } from './request/coding-request.component';
import { CodingNgrxComponent } from './ngrx/coding-ngrx.component';

const routes: Routes = [
  { path: 'coding-config', component: CodingConfigComponent },
  { path: 'coding-model', component: CodingModelComponent},
  { path: 'coding-request', component: CodingRequestComponent},
  { path: 'coding-ngrx', component: CodingNgrxComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngKitCodingRoutingModule {}
