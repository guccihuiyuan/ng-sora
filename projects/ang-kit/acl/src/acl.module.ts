import {NgModule} from '@angular/core';
import {ACLDirective} from './acl.directive';
import {ACLService} from './acl.service';

@NgModule({
  declarations: [
    ACLDirective
  ],
  exports: [
    ACLDirective
  ],
  providers: [
    ACLService
  ]
})
export class AngKitACLModule { }
