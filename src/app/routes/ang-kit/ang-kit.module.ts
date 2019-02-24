import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AngKitRoutingModule } from './ang-kit-routing.module';
import { AngKitComponent } from './ang-kit.component';

import { MarkdownModule } from 'ngx-markdown';

const COMPONENTS_NOROUNT = [

];

@NgModule({
  imports: [
    SharedModule,
    AngKitRoutingModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    AngKitComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AngKitModule {}
