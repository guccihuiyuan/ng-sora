import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AngKitHttpRoutingModule } from './http-routing.module';

import { MarkdownModule } from 'ngx-markdown';
import { ServiceComponent } from './service/service.component';
import { InterceptorComponent } from './interceptor/interceptor.component';

const COMPONENTS_NOROUNT = [

];

@NgModule({
  imports: [
    SharedModule,
    AngKitHttpRoutingModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    ServiceComponent,
    InterceptorComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AngKitHttpModule {}
