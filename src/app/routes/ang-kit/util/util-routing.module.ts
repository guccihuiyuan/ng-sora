import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreeComponent } from './tree/tree.component';


const routes: Routes = [
  { path: 'util-tree', component: TreeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngKitUtilRoutingModule {}
