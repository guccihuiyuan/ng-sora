import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AngKitUtilRoutingModule } from './util-routing.module';

import { MarkdownModule } from 'ngx-markdown';
import { TreeComponent } from './tree/tree.component';

const COMPONENTS_NOROUNT = [

];

@NgModule({
  imports: [
    SharedModule,
    AngKitUtilRoutingModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    TreeComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AngKitUtilModule {}
