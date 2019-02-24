import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AngKitCliRoutingModule } from './cli-routing.module';

import { MarkdownModule } from 'ngx-markdown';
import { CliIndexComponent } from './index.component';

const COMPONENTS_NOROUNT = [

];

@NgModule({
  imports: [
    SharedModule,
    AngKitCliRoutingModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    CliIndexComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AngKitCliModule {}
