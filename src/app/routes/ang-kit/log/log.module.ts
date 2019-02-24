import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AngKitLogRoutingModule } from './log-routing.module';

import { MarkdownModule } from 'ngx-markdown';
import { LogCliComponent } from './cli/log-cli.component';
import { LogKitComponent } from './kit/log-kit.component';

const COMPONENTS_NOROUNT = [

];

@NgModule({
  imports: [
    SharedModule,
    AngKitLogRoutingModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    LogKitComponent,
    LogCliComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AngKitLogModule {}
