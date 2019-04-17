import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AngKitACLRoutingModule } from './acl-routing.module';
import { MarkdownModule } from 'ngx-markdown';
import { ACLServiceComponent } from './acl-service/acl-service.component';
import { ACLDirectiveComponent } from './acl-directive/acl-directive.component';



const COMPONENTS_NOROUNT = [

];

@NgModule({
  imports: [
    SharedModule,
    AngKitACLRoutingModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    ACLServiceComponent,
    ACLDirectiveComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AngKitACLModule {}
