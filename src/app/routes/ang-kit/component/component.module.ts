import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AngKitComponentRoutingModule } from './component-routing.module';

import { MarkdownModule } from 'ngx-markdown';

import { AppADStComponent } from './ad-st/ad-st.component';

const COMPONENTS_NOROUNT = [

];

@NgModule({
  imports: [
    SharedModule,
    AngKitComponentRoutingModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    AppADStComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AngKitComponentModule {}
