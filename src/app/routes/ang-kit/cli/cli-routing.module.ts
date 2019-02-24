import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CliIndexComponent } from './index.component';

const routes: Routes = [
  { path: '', component: CliIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngKitCliRoutingModule {}
