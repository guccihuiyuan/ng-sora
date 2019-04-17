import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ACLServiceComponent} from './acl-service/acl-service.component';
import {ACLDirectiveComponent} from './acl-directive/acl-directive.component';

const routes: Routes = [
  { path: 'acl-service', component: ACLServiceComponent},
  { path: 'acl-directive', component: ACLDirectiveComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngKitACLRoutingModule {}
