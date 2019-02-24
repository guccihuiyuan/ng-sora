import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogCliComponent } from './cli/log-cli.component';
import { LogKitComponent } from './kit/log-kit.component';

const routes: Routes = [
  { path: 'log-kit', component: LogKitComponent},
  { path: 'log-cli', component: LogCliComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngKitLogRoutingModule {}
