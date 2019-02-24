import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AngKitAuthRoutingModule } from './auth-routing.module';

import { MarkdownModule } from 'ngx-markdown';
import { TokenInterceptorComponent } from './token-interceptor/token-interceptor.component';
import { TokenServiceComponent } from './token-service/token-service.component';


const COMPONENTS_NOROUNT = [

];

@NgModule({
  imports: [
    SharedModule,
    AngKitAuthRoutingModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    TokenServiceComponent,
    TokenInterceptorComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AngKitAuthModule {}
