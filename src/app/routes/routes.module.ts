import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { RouteRoutingModule } from './routes-routing.module';

import { MainComponent } from './main/main.component';


const COMPONENTS = [
  MainComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [ SharedModule, RouteRoutingModule ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule {}
