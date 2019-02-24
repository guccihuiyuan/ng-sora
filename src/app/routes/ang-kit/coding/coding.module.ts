import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AngKitCodingRoutingModule } from './coding-routing.module';

import { MarkdownModule } from 'ngx-markdown';

import { CodingConfigComponent } from './config/coding-config.component';
import { CodingModelComponent } from './model/coding-model.component';
import { CodingRequestComponent } from './request/coding-request.component';
import { CodingNgrxComponent } from './ngrx/coding-ngrx.component';

const COMPONENTS_NOROUNT = [

];

@NgModule({
  imports: [
    SharedModule,
    AngKitCodingRoutingModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    CodingConfigComponent,
    CodingModelComponent,
    CodingRequestComponent,
    CodingNgrxComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AngKitCodingModule {}
